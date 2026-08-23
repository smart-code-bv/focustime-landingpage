# Focustime — landing page

Marketing site for **Focustime**: five-day focus weeks for software teams in rural
Galicia. Monday morning to Friday evening, 8–14 people, €1,100 per person
excluding flights.

The site has one job: get an engineering manager or tech lead to fill in the team
enquiry form. Everything else is secondary, including the partner page.

## Structure

```
website/
  index.html          The landing page (teams — the primary conversion)
  partners.html       Houses, cooks and guides in Galicia (secondary)
  socios.html         The same partner page in Spanish
  css/styles.css      The whole design system, one file
  js/
    main.js           Sticky-header behaviour. The page works without it.
    form-handler.js   Both contact forms, with layered delivery
    analytics.js      Cookie-free event tracking into our own Supabase
    supabase-lib.js   Minimal REST insert client
    supabase-config.js  Project URL + anon key
  images/             Photography (see "Images" below)
  supabase/           SQL setup and the notification edge function
netlify.toml          Build, redirects, headers, CSP
```

There is no build step. Everything is plain HTML, CSS and ES modules.

## Local development

```bash
cd website
npm install       # only needed for the Netlify CLI
npm start         # http://localhost:8080
```

Or without npm: `python3 -m http.server 8080` from inside `website/`.

## Deploying

Netlify builds from the repo root and publishes `website/`.

```bash
npx netlify deploy          # preview
npx netlify deploy --prod   # production
```

## Forms

Two forms, both handled by `js/form-handler.js`:

| Form | Page | Supabase table |
|---|---|---|
| `team-form` | `index.html` | `team_enquiries` |
| `partner-form` | `partners.html`, `socios.html` | `contact_submissions` |

The two partner pages share one form config and one Netlify form name; a hidden
`language` field tells them apart, is stored on the row, and makes the
notification email say which language to reply in.

## Languages

English for teams, Spanish for partners.

The buyers are engineering managers in the Netherlands, Belgium and remote-first
companies, and they read English. The partners are property owners, cooks and
drivers in inland Galicia, and many of them do not. So `index.html` is English
only and the partner page exists twice, as two real pages with `hreflang`
alternates rather than a JavaScript language toggle — a separate page can rank
on its own for Spanish searches, and there is no duplicated markup to keep in
sync.

If you edit one partner page, edit the other.

Delivery is layered, so a submission is not lost if one backend is down:

1. Supabase, into the table for that form
2. Supabase, into the legacy `contact_submissions` table (team form only)
3. Netlify Forms, posted over `fetch`
4. Failing everything, an error with a `mailto:` fallback

**Before the team form can use its own table, run
`website/supabase/team_enquiries_setup.sql` in the Supabase SQL editor** and add
a Database Webhook on INSERT pointing at the `send-form-notification` edge
function. Until then step 2 quietly catches everything, so nothing is lost.

See `website/SUPABASE_SETUP.md` for the full backend setup.

## Images

The photography is Creative Commons / public domain material of actual Galicia
from Wikimedia Commons, credited in the page footer. It is deliberately **not**
stock imagery of people in meetings, and deliberately **not** interiors of
properties that have not been booked — the site must not show a house it cannot
deliver.

Replace these with own photographs when there are some (a shoot is planned for
July 2027). Each image is referenced with `srcset` at two widths; see
`website/IMAGE_RECOMMENDATIONS.md` for the sizes and the swap procedure.

There is a commented-out portrait slot in the "Who's behind this" section of
`index.html`, waiting on a photo of Tjaco.

## Contact

tjaco@focustime.io
