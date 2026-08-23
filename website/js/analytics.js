// Lightweight, cookie-free analytics into our own Supabase instance.
// Honours Do Not Track / Global Privacy Control and collects nothing that
// identifies a visitor.
import supabaseConfig from './supabase-config.js';
import { createClient } from './supabase-lib.js';

const optedOut =
  navigator.doNotTrack === '1' ||
  navigator.doNotTrack === 'yes' ||
  window.doNotTrack === '1' ||
  navigator.globalPrivacyControl === true;

let supabase = null;
if (!optedOut) {
  try {
    if (supabaseConfig.url && supabaseConfig.anonKey) {
      supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
    }
  } catch (error) {
    console.error('Analytics: Supabase client unavailable:', error);
  }
}

export async function trackEvent(name, data = {}) {
  if (!supabase) return;
  try {
    await supabase.from('analytics_events').insert({
      event_name: name,
      event_data: { ...data, page: window.location.pathname },
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.warn(`Analytics: could not record "${name}"`, error);
  }
}

export function trackPageView() {
  trackEvent('page_view', {
    referrer: document.referrer || null,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    // Coarse device class only — no user agent string, no fingerprinting.
    device: window.matchMedia('(min-width: 62em)').matches ? 'desktop' : 'mobile',
  });
}

// Which sections a visitor actually reaches — the cheapest read on whether the
// page holds attention all the way to the form.
function trackSectionViews() {
  if (!('IntersectionObserver' in window)) return;

  const seen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target.id)) return;
        seen.add(entry.target.id);
        trackEvent('section_view', { section: entry.target.id });
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
}

// Which call to action does the work: header, hero, or scrolling to the form.
function trackCtaClicks() {
  document.querySelectorAll('[data-cta]').forEach((el) => {
    el.addEventListener('click', () => trackEvent('cta_click', { placement: el.dataset.cta }));
  });
}

function trackForms() {
  document.querySelectorAll('form[id]').forEach((form) => {
    let started = false;
    form.addEventListener(
      'input',
      () => {
        if (started) return;
        started = true;
        trackEvent('form_start', { form: form.id });
      },
      { once: false }
    );

    form.addEventListener('submit', () => {
      const size = form.querySelector('[name="team_size"]');
      const type = form.querySelector('[name="partner-type"]');
      trackEvent('form_submit', {
        form: form.id,
        team_size: size ? size.value : undefined,
        partner_type: type ? type.value : undefined,
      });
    });
  });
}

function trackOutboundLinks() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (link.hostname === window.location.hostname) return;
    link.addEventListener('click', () => {
      trackEvent('outbound_link_click', { destination: link.hostname });
    });
  });
}

if (supabase) {
  trackPageView();
  trackSectionViews();
  trackCtaClicks();
  trackForms();
  trackOutboundLinks();
}
