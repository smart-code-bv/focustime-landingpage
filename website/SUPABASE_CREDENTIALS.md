# Managing Supabase Credentials Securely

This document outlines the secure methods for handling Supabase credentials in your Focustime application.

## Development Environment

### 1. Update the Configuration File

During development, you can directly update the values in `js/supabase-config.js`:

```javascript
const supabaseConfig = {
  url: 'https://your-project-ref.supabase.co',
  anonKey: 'your-anon-key'
};
```

**Important:** Only commit this file with placeholder values, never with actual credentials.

### 2. Use Environment Variables (Recommended)

For a more secure approach, use environment variables:

1. Create a `.env` file in the project root (and add it to `.gitignore`):
```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

2. Use a build tool like Vite or Webpack to inject these values.

## Production Environment

### Deployment with Environment Variables

1. **Set environment variables in your hosting platform:**
   - Netlify, Vercel, GitHub Pages, etc. all support environment variables
   - Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in your hosting settings

2. **Create a build script** to replace placeholders:

```bash
#!/bin/bash
# deploy.sh
sed -i "s|YOUR_SUPABASE_URL|$SUPABASE_URL|g" website/js/supabase-config.js
sed -i "s|YOUR_SUPABASE_ANON_KEY|$SUPABASE_ANON_KEY|g" website/js/supabase-config.js
# Continue with your normal deployment process
```

## Security Best Practices

1. **Only use the anon key on the client side** 
   - Never use the `service_role` key in client-side code
   - The anon key is designed to be public and has limited permissions

2. **Implement Row-Level Security (RLS)**
   - Properly configure RLS policies as described in SUPABASE_SETUP.md
   - This limits what anonymous users can do, even with your anon key

3. **Limit API access**
   - Configure CORS settings in your Supabase dashboard
   - Only allow requests from your domain

4. **Keep environment variables separate**
   - Use different projects/credentials for development and production

## Finding Your Credentials

1. Go to your Supabase dashboard
2. Select your project
3. Go to Project Settings → API
4. Find the "Project URL" and "anon public" key
5. Copy these values to use in your application

## Troubleshooting

If your form submissions aren't working:

1. Check browser console for errors
2. Verify that the URL and anon key are correct
3. Test the API endpoint directly using tools like Postman
4. Check Supabase logs for any errors
5. Verify that your RLS policies allow anonymous inserts
