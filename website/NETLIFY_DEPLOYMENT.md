# Netlify Deployment Guide for Focustime

This guide explains how to deploy the Focustime website using Netlify. The deployment is configured to deploy directly from the `website` folder.

## Prerequisites

1. You need a Netlify account
2. You need Node.js installed on your computer

## Installation

First, install the required dependencies from the `website` folder:

```bash
cd /Users/tjaco/code/lovable/focustime/website
npm install
```

## Deployment Steps

### 1. Log in to Netlify

```bash
npx netlify login
```

This will open a browser window where you can authenticate with Netlify.

### 2. Initialize Netlify for Your Project

```bash
npx netlify init
```

Follow the prompts:
- Choose "Create & configure a new site"
- Select your team
- Choose a site name (e.g., "focustime-retreats")
- When asked about the build command, just press Enter (we use the setting from netlify.toml)
- For the publish directory, press Enter (we use the setting from netlify.toml)

### 3. Set Environment Variables

Set your Supabase credentials as environment variables:

```bash
npx netlify env:set SUPABASE_URL "https://yhtfvmrcxcegcepcobbt.supabase.co"
npx netlify env:set SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodGZ2bXJjeGNlZ2NlcGNvYmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzU3OTEsImV4cCI6MjA1NjM1MTc5MX0.onXn50uCyOJl8oXju-drapCrsd1bhVl-Z_-dF-gmHkA"
```

You can also set these in the Netlify UI:
1. Go to Site settings → Build & deploy → Environment
2. Add the environment variables there

### 4. Deploy a Preview

Before deploying to production, create a preview deployment:

```bash
npx netlify deploy
```

This will generate a unique preview URL. Visit this URL to verify that everything works correctly.

### 5. Deploy to Production

When you're satisfied with the preview, deploy to production:

```bash
npx netlify deploy --prod
```

Your site is now live at the Netlify URL (e.g., https://focustime-retreats.netlify.app).

## Setting Up a Custom Domain

To use your own domain (e.g., focustime.io):

1. Go to the Netlify UI
2. Navigate to your site dashboard
3. Go to Site settings → Domain management → Add custom domain
4. Follow the instructions to configure your DNS

## Automating Deployments (Optional)

For continuous deployment, connect your Git repository:

1. Go to the Netlify UI
2. Navigate to your site dashboard
3. Go to Site settings → Build & deploy → Continuous deployment
4. Connect to your Git provider (GitHub, GitLab, etc.)
5. Select your repository and branch

Now, whenever you push changes to the connected repository, Netlify will automatically deploy your site.

## Troubleshooting

### Form Submissions

If form submissions aren't working:

1. Verify that the form has the `netlify` and `data-netlify="true"` attributes
2. Check that the form has a name attribute (`name="partner-inquiry"`)
3. Verify the hidden input field is present: `<input type="hidden" name="form-name" value="partner-inquiry">`

### Deployment Issues

If deployment fails:

1. Check the Netlify deployment logs
2. Verify that all files are in the correct location
3. Ensure that the publish directory in netlify.toml is correctly set to `./`

For further assistance, contact Netlify support or refer to their documentation at https://docs.netlify.com/
