// Minimal Supabase REST client — just the insert we need, no dependency.
// See https://github.com/supabase/supabase-js for the real thing.

class SupabaseClient {
  constructor(supabaseUrl, supabaseKey) {
    if (!supabaseUrl) throw new Error('supabaseUrl is required');
    if (!supabaseKey) throw new Error('supabaseKey is required');
    this.url = supabaseUrl.replace(/\/$/, '');
    this.key = supabaseKey;
  }

  // NOTE: not async. `client.from(t).insert(...)` has to chain, so this must
  // return the object itself rather than a promise of one.
  from(table) {
    const { url, key } = this;

    return {
      async insert(data, options = {}) {
        const rows = Array.isArray(data) ? data : [data];

        const response = await fetch(`${url}/rest/v1/${table}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: key,
            Authorization: `Bearer ${key}`,
            Prefer: options.returning ? 'return=representation' : 'return=minimal',
          },
          body: JSON.stringify(rows),
        });

        if (!response.ok) {
          const detail = await response.text().catch(() => '');
          throw new Error(`Insert into ${table} failed (${response.status}): ${detail}`);
        }

        return options.returning ? response.json() : { status: 'success' };
      },
    };
  }
}

export function createClient(supabaseUrl, supabaseKey) {
  return new SupabaseClient(supabaseUrl, supabaseKey);
}
