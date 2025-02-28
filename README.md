# Focustime - Corporate Retreat Platform

A professional website for Focustime, a corporate retreat platform for IT teams in Galicia, Spain. The site showcases locations, experiences, and features a contact form for potential partners.

## Features

- **Bilingual Support**: Full English and Spanish language support
- **Responsive Design**: Optimized for all devices
- **Contact Form**: Integrated with Supabase backend
- **Modern UI**: Clean, professional design with animations
- **Performance Optimized**: Lazy loading and optimized assets

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm start
   ```
4. Visit http://localhost:8080 in your browser

### Deployment

The site is configured for deployment with Netlify:

1. Log in to Netlify:
   ```bash
   npx netlify login
   ```

2. Initialize Netlify for the project:
   ```bash
   npx netlify init
   ```

3. Deploy a preview:
   ```bash
   npx netlify deploy
   ```

4. Deploy to production:
   ```bash
   npx netlify deploy --prod
   ```

## Project Structure

- **`/website`**: The main website files
  - **`/css`**: Stylesheets
  - **`/js`**: JavaScript files
  - **`/images`**: Image assets
  - **`index.html`**: Main HTML file
- **`/supabase`**: Supabase edge functions
- **`netlify.toml`**: Netlify configuration
- **`package.json`**: Project dependencies and scripts

## Backend Integration

The contact form is integrated with Supabase for data storage and email notifications:

1. Form submissions are stored in a Supabase database
2. An edge function sends email notifications via Resend
3. Netlify Forms provides a backup submission method

See `SUPABASE_SETUP.md` and `SUPABASE_CREDENTIALS.md` for detailed backend configuration.

## Maintenance

To update the website:

1. Edit files in the `/website` directory
2. Test locally with `npm start`
3. Deploy changes with `npm run deploy:prod`

## Contact

For questions or support, contact tjaco@focustime.io
