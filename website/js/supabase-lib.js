// Supabase JavaScript library (https://github.com/supabase/supabase-js)
// This is a minimal version with only the functionality we need

class SupabaseClient {
  constructor(supabaseUrl, supabaseKey, options = {}) {
    this.url = supabaseUrl;
    this.key = supabaseKey;
    this.options = options;
    
    if (!this.url) throw new Error('supabaseUrl is required');
    if (!this.key) throw new Error('supabaseKey is required');
  }
  
  async from(table) {
    return {
      insert: async (data, options = {}) => {
        try {
          // Ensure data is always an array
          const dataArray = Array.isArray(data) ? data : [data];
          
          const response = await fetch(`${this.url}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': this.key,
              'Authorization': `Bearer ${this.key}`,
              'Prefer': options.returning ? 'return=representation' : 'return=minimal'
            },
            body: JSON.stringify(dataArray)
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error inserting into ${table}: ${errorText}`);
          }
          
          return options.returning ? await response.json() : { status: 'success' };
        } catch (error) {
          console.error('Supabase error:', error);
          throw error;
        }
      }
    };
  }
}

// Export the createClient function
export function createClient(supabaseUrl, supabaseKey, options = {}) {
  return new SupabaseClient(supabaseUrl, supabaseKey, options);
}
