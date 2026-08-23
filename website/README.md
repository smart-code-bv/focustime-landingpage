# Focustime website

Static site, no build step. See the [repository README](../README.md) for the
project overview and deployment.

## Running it

```bash
npm install
npm start          # http://localhost:8080
```

## Design notes

The product is calm and specific, so the page is too.

- **Type**: Newsreader (serif) for prose and headings, Inter for the facts —
  the format block, the price, the checklists, the form. That split is the
  point: competitors are vague, Focustime is specific.
- **Palette**: granite, moss, warm paper, and a little pimentón for the price.
  Tokens live at the top of `css/styles.css`.
- **No entrance animations.** Nothing fades in on scroll. Content must never
  depend on JavaScript to become visible.
- **Mobile first.** A manager reads this between meetings on a phone.
- One primary conversion: the team enquiry form at `#plan`.

## What must stay true

The brief for this page has some hard constraints. Please keep them:

- No claims about specific houses or pazos that have not been secured.
- No testimonials, client logos, "trusted by", or counts of weeks run — none of
  it would be true yet.
- The 2027 first-weeks status stays visible and stays honest.
- The word "retreat" appears exactly once, in the line saying it is not one.
- Price stays visible. Competitors hide theirs; being open is the differentiator
  and it filters out the wrong conversations early.
- The partner call to action stays secondary to the team one.
- The team page stays English only. The partner page stays available in Spanish.

## Files

| Path | What it is |
|---|---|
| `index.html` | The landing page |
| `partners.html` | Houses, cooks and guides in Galicia |
| `socios.html` | The same page in Spanish — keep the two in sync |
| `css/styles.css` | Tokens, layout and components — the whole design system |
| `js/main.js` | Sticky-header behaviour, nothing else |
| `js/form-handler.js` | Both forms, layered delivery, honeypot |
| `js/analytics.js` | Cookie-free events, honours Do Not Track |
| `js/supabase-lib.js` | Minimal REST insert client |
| `js/supabase-config.js` | Project URL and anon key |
| `favicon.svg` | Wordmark mark |
| `supabase/` | Table SQL and the notification edge function |

## Docs

- `SUPABASE_SETUP.md` — database, policies, email notifications
- `SUPABASE_CREDENTIALS.md` — where the keys live
- `ANALYTICS.md` — what is tracked and how to query it
- `IMAGE_RECOMMENDATIONS.md` — the current photography and how to replace it
- `NETLIFY_DEPLOYMENT.md` — hosting
