# Focustime Website

This is the landing page for Focustime, a corporate retreat service in Galicia, Spain, designed to provide distraction-free environments for team productivity.

## Structure

- `index.html`: Main HTML file with bilingual content (English/Spanish)
- `css/styles.css`: Stylesheet for the website
- `js/main.js`: JavaScript functionality including language switching
- `js/form-handler.js`: Supabase integration for the contact form
- `js/supabase-config.js`: Configuration for Supabase connection
- `js/supabase-lib.js`: Lightweight Supabase client for API interactions
- `js/analytics.js`: Supabase analytics integration for tracking user interactions
- `images/`: Directory for website images (placeholders currently)
- `index-es.txt`: Spanish translations reference document
- `supabase/`: Directory containing Supabase edge functions and SQL scripts
- `netlify.toml`: Netlify deployment configuration

## Image Placeholders

The website uses placeholder references for images. Before deploying, add real images to the `images/` directory with the following names:

- `placeholder-hero.jpg` - Hero banner (suggested dimensions: 1920x1080px)
- `placeholder-workspace.jpg` - Workspace image (suggested dimensions: 600x400px) 
- `placeholder-accommodation.jpg` - Accommodation image (suggested dimensions: 600x400px)
- `placeholder-cuisine.jpg` - Galician cuisine image (suggested dimensions: 600x400px)
- `placeholder-activities.jpg` - Activities image (suggested dimensions: 600x400px)
- `placeholder-pazo.jpg` - Pazo image (suggested dimensions: 800x600px)
- `placeholder-coastal.jpg` - Coastal property image (suggested dimensions: 800x600px)
- `placeholder-rural.jpg` - Rural property image (suggested dimensions: 800x600px)

## Features

- Fully responsive design for all device sizes
- Bilingual support (English/Spanish) with easy language switching
- Contact form for potential partners with Supabase backend integration
- Modern, clean aesthetic emphasizing the Galician experience
- Email notifications for form submissions using Resend

## Analytics

The website includes built-in privacy-focused analytics tracking through Supabase. For setup and usage instructions, see [ANALYTICS.md](ANALYTICS.md).

Features:
- Privacy-friendly tracking (respects "Do Not Track")
- Page views, section visibility, and form interaction tracking
- Language preference monitoring
- Custom SQL views for reporting
- No cookies or third-party tracking

To set up analytics:
1. Run the SQL script in `supabase/analytics_setup.sql` in your Supabase project
2. Analytics data will automatically be collected in the `analytics_events` table

## Form Handling

The contact form is integrated with Supabase:

1. Form submissions are stored in a Supabase database table
2. A Supabase edge function sends email notifications using Resend
3. Fallback support with Netlify Forms integration

See `SUPABASE_SETUP.md` for detailed configuration instructions and `SUPABASE_CREDENTIALS.md` for credential management.

## Deployment

The website is configured for deployment with Netlify:

1. Install dependencies: `npm install`
2. Login to Netlify: `npx netlify login`
3. Initialize Netlify: `npx netlify init`
4. Deploy a preview: `npx netlify deploy`
5. Deploy to production: `npx netlify deploy --prod`

See `NETLIFY_DEPLOYMENT.md` for detailed deployment instructions.

## Local Development

To run the site locally:

```bash
npm install
npm start
```

Visit http://localhost:8080 in your browser.

## Further Development

Future enhancements could include:

- Blog section for sharing retreat experiences
- Interactive map of Galicia with property locations
- Virtual tour functionality for featured properties
- Integration with booking/calendar system
- User accounts for property partners
