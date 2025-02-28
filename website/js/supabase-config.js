/**
 * Supabase Configuration
 * 
 * This file contains your Supabase project credentials.
 * Important: Only the anon key should be used on the client side.
 * 
 * How to use:
 * 1. During development, replace the placeholders with your actual values
 * 2. For production, use environment variables and a build script to inject values
 */

const supabaseConfig = {
  /**
   * Your Supabase project URL
   * Format: https://your-project-ref.supabase.co
   */
  url: 'https://yhtfvmrcxcegcepcobbt.supabase.co',
  
  /**
   * Your Supabase anonymous key (safe for public use)
   * NEVER put your service_role key here!
   */
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodGZ2bXJjeGNlZ2NlcGNvYmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzU3OTEsImV4cCI6MjA1NjM1MTc5MX0.onXn50uCyOJl8oXju-drapCrsd1bhVl-Z_-dF-gmHkA'
};

export default supabaseConfig;
