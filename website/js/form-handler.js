// Contact form handling for both the team enquiry (index) and the partner
// enquiry (partners.html).
//
// Delivery is layered so a submission is never lost to one backend being
// unavailable:
//   1. Supabase, into the table for this form
//   2. Supabase, into the legacy contact_submissions table (team form only)
//   3. Netlify Forms, posted over fetch
//   4. Give up loudly and show the email address
import supabaseConfig from './supabase-config.js';
import { createClient } from './supabase-lib.js';

const CONTACT_EMAIL = 'tjaco@focustime.io';

// The Spanish partner page (socios.html) reuses the same form config and marks
// itself with a hidden `language` field.
const COPY = {
  en: {
    sending: 'Sending…',
    errorBefore: 'That didn’t send — something on our end. Please email ',
    errorAfter: ' and we’ll pick it up from there.',
  },
  es: {
    sending: 'Enviando…',
    errorBefore: 'No se ha podido enviar; el fallo es nuestro. Escribe a ',
    errorAfter: ' y seguimos por ahí.',
  },
};

const languageOf = (formData) => (formData.get('language') === 'es' ? 'es' : 'en');

/** Per-form config: which table, and how to shape the row. */
const FORMS = {
  'team-form': {
    table: 'team_enquiries',
    row: (f) => ({
      name: f.get('name'),
      email: f.get('email'),
      company: f.get('company'),
      team_size: f.get('team_size'),
      topic: f.get('topic'),
      timing: f.get('timing') || null,
    }),
    // The original table predates this form; used only if team_enquiries is missing.
    legacy: (f) => ({
      name: f.get('name'),
      email: f.get('email'),
      phone: null,
      partner_type: 'team-enquiry',
      message: [
        `Company: ${f.get('company')}`,
        `Team size: ${f.get('team_size')}`,
        `Timing: ${f.get('timing') || 'not given'}`,
        '',
        f.get('topic'),
      ].join('\n'),
      language: 'en',
    }),
    done: () => ({
      title: 'Thanks — that landed.',
      body: `I’ll come back to you personally, usually within a couple of days. If it’s urgent, email ${CONTACT_EMAIL}.`,
    }),
  },

  'partner-form': {
    table: 'contact_submissions',
    row: (f) => ({
      name: f.get('name'),
      email: f.get('email'),
      phone: f.get('phone') || null,
      partner_type: f.get('partner-type'),
      message: f.get('message'),
      // Set by a hidden field, so partners.html and socios.html share this config.
      language: f.get('language') || 'en',
    }),
    done: (f) =>
      f.get('language') === 'es'
        ? {
            title: 'Gracias — nos ha llegado.',
            body: `Te contestamos personalmente. Si es urgente, escribe a ${CONTACT_EMAIL}.`,
          }
        : {
            title: 'Thanks — that landed.',
            body: `We’ll be in touch. If it’s urgent, email ${CONTACT_EMAIL}.`,
          },
  },
};

let supabase = null;
try {
  if (supabaseConfig.url && supabaseConfig.anonKey) {
    supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
  }
} catch (error) {
  console.error('Supabase client unavailable:', error);
}

/** Post the raw form to Netlify Forms without navigating away. */
async function submitToNetlify(form, formData) {
  if (!form.hasAttribute('data-netlify')) throw new Error('Netlify Forms not configured');

  const body = new URLSearchParams();
  formData.forEach((value, key) => {
    if (typeof value === 'string') body.append(key, value);
  });

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) throw new Error(`Netlify Forms returned ${response.status}`);
}

async function deliver(config, form, formData) {
  const attempts = [];

  if (supabase) {
    attempts.push(() => supabase.from(config.table).insert(config.row(formData)));
    if (config.legacy) {
      attempts.push(() => supabase.from('contact_submissions').insert(config.legacy(formData)));
    }
  }
  attempts.push(() => submitToNetlify(form, formData));

  let lastError = new Error('No delivery method available');
  for (const attempt of attempts) {
    try {
      await attempt();
      return;
    } catch (error) {
      console.warn('Submission attempt failed:', error);
      lastError = error;
    }
  }
  throw lastError;
}

function showDone(form, done) {
  const region = form.parentElement;
  const panel = document.createElement('div');
  panel.className = 'form-done';
  panel.setAttribute('role', 'status');

  const heading = document.createElement('h3');
  heading.textContent = done.title;

  const body = document.createElement('p');
  body.textContent = done.body;

  panel.append(heading, body);
  region.replaceChildren(panel);
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showError(statusEl, lang) {
  const copy = COPY[lang];
  statusEl.className = 'form__status form__status--error';
  statusEl.replaceChildren(document.createTextNode(copy.errorBefore));
  const link = document.createElement('a');
  link.className = 'link';
  link.href = `mailto:${CONTACT_EMAIL}`;
  link.textContent = CONTACT_EMAIL;
  statusEl.append(link, document.createTextNode(copy.errorAfter));
  statusEl.hidden = false;
}

function initForm(form) {
  const config = FORMS[form.id];
  if (!config) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector('.form__status');
  const originalLabel = submitButton ? submitButton.innerHTML : '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    if (formData.get('bot-field')) return; // honeypot tripped; pretend nothing happened

    const lang = languageOf(formData);

    statusEl.hidden = true;
    if (submitButton) {
      submitButton.setAttribute('aria-busy', 'true');
      submitButton.textContent = COPY[lang].sending;
    }

    try {
      await deliver(config, form, formData);
      showDone(form, config.done(formData));
    } catch (error) {
      console.error('Form submission failed:', error);
      showError(statusEl, lang);
      if (submitButton) {
        submitButton.removeAttribute('aria-busy');
        submitButton.innerHTML = originalLabel;
      }
    }
  });
}

document.querySelectorAll('form[id]').forEach(initForm);
