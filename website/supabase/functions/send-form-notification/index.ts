// Focustime — email notification for new form submissions.
//
// Fires from a Supabase Database Webhook on INSERT into either
// `team_enquiries` (a software team wanting to book a week) or
// `contact_submissions` (a property owner, cook or guide in Galicia).
//
// Accepts both the webhook envelope ({ type, table, record }) and a flat row,
// so it can also be called directly with curl for testing.
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const NOTIFY = 'tjaco@focustime.io';
const FROM = 'Focustime <notifications@focustime.io>';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PARTNER_TYPES: Record<string, string> = {
  property: 'Property owner',
  culinary: 'Cook',
  activity: 'Activities, wine or guiding',
  transport: 'Transport',
  other: 'Other',
  'team-enquiry': 'Team enquiry (legacy table)',
};

const TEAM_SIZES: Record<string, string> = {
  '8-10': '8–10 people',
  '11-14': '11–14 people',
  'under-8': 'Fewer than 8',
  'over-14': 'More than 14',
  unsure: 'Not sure yet',
};

const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const paragraph = (value: unknown): string => escapeHtml(value).replace(/\n/g, '<br>');

const rows = (pairs: Array<[string, unknown]>): string =>
  pairs
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `<p><strong>${key}:</strong> ${escapeHtml(value)}</p>`)
    .join('\n');

interface Payload {
  table?: string;
  record?: Record<string, unknown>;
  [key: string]: unknown;
}

function buildEmail(table: string, record: Record<string, unknown>) {
  const isTeam = table === 'team_enquiries' || 'team_size' in record;

  if (isTeam) {
    const size = TEAM_SIZES[String(record.team_size)] ?? String(record.team_size ?? '—');
    return {
      subject: `Focustime: team enquiry — ${record.company} (${size})`,
      html: `
        <h2>New team enquiry</h2>
        ${rows([
          ['Name', record.name],
          ['Email', record.email],
          ['Company', record.company],
          ['Team size', size],
          ['Timing', record.timing || 'Not given'],
        ])}
        <p><strong>What the week is about:</strong></p>
        <p>${paragraph(record.topic)}</p>
        <hr>
        <p style="color:#888;font-size:12px;">Sent from the Focustime landing page.</p>
      `,
    };
  }

  const type = PARTNER_TYPES[String(record.partner_type)] ?? String(record.partner_type ?? '—');
  const spanish = record.language === 'es';
  return {
    subject: `Focustime: partner enquiry — ${record.name} (${type})${spanish ? ' [ES]' : ''}`,
    html: `
      <h2>New partner enquiry</h2>
      ${spanish ? '<p><strong>Came in through socios.html — reply in Spanish.</strong></p>' : ''}
      ${rows([
        ['Name', record.name],
        ['Email', record.email],
        ['Phone', record.phone || 'Not provided'],
        ['Offering', type],
      ])}
      <p><strong>Message:</strong></p>
      <p>${paragraph(record.message)}</p>
      <hr>
      <p style="color:#888;font-size:12px;">Sent from the Focustime partners page (${spanish ? 'socios.html' : 'partners.html'}).</p>
    `,
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: Payload = await req.json();
    const record = (payload.record ?? payload) as Record<string, unknown>;
    const table = String(payload.table ?? (('team_size' in record) ? 'team_enquiries' : 'contact_submissions'));

    if (!record.name || !record.email) {
      throw new Error('Missing required fields: name and email');
    }

    const { subject, html } = buildEmail(table, record);
    const emailResponse = await resend.emails.send({ from: FROM, to: NOTIFY, subject, html });

    console.log(`Notification sent for ${table}:`, emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error processing form submission:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
