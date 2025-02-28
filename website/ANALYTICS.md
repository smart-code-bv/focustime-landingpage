# Focustime Analytics Setup

This document describes the analytics integration for the Focustime website using Supabase.

## Overview

The Focustime website includes lightweight analytics tracking that respects user privacy while providing valuable insights about user behavior. Unlike traditional analytics platforms, our implementation:

1. Respects the "Do Not Track" browser setting
2. Does not use cookies for tracking
3. Collects only necessary usage data
4. Stores data in your own Supabase instance (not third-party servers)
5. Provides useful reporting via SQL views

## Events Tracked

The following events are tracked:

- `page_view`: When a user loads a page
- `section_view`: When a user scrolls to view a specific section
- `form_field_focus`: When a user interacts with a form field
- `form_submit`: When a user submits the contact form
- `language_switch`: When a user switches the language
- `outbound_link_click`: When a user clicks a link to an external website

## Setup Instructions

### 1. Create Supabase Analytics Table

Run the SQL script in `supabase/analytics_setup.sql` using the Supabase SQL editor.

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Paste the contents of `supabase/analytics_setup.sql`
4. Run the SQL script
5. Verify that the `analytics_events` table and related views are created

### 2. Verify Analytics Integration

The frontend already includes the necessary code to track events and send them to Supabase.

To verify that analytics are working correctly:

1. Open the website in your browser
2. Open browser developer tools (F12 or right-click > Inspect)
3. Check the console for messages like "Analytics: Event page_view logged to Supabase"
4. Navigate to your Supabase dashboard and check that events are being recorded in the `analytics_events` table

## Using Analytics Data

### Available Views

The following SQL views are created to help you analyze the data:

- `analytics_daily_page_views`: Shows page views by day and page
- `analytics_form_submissions`: Shows form submissions by day and partner type
- `analytics_section_views`: Shows section visibility by day and section
- `analytics_language_usage`: Shows language preference by day
- `analytics_outbound_links`: Shows outbound link clicks by day and destination

### Sample Queries

#### Top Pages by Views

```sql
SELECT 
  page, 
  SUM(view_count) as total_views
FROM analytics_daily_page_views
WHERE day >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY page
ORDER BY total_views DESC
LIMIT 10;
```

#### Language Usage Over Time

```sql
SELECT 
  day, 
  language, 
  view_count,
  view_count * 100.0 / SUM(view_count) OVER (PARTITION BY day) as percentage
FROM analytics_language_usage
WHERE day >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY day DESC, view_count DESC;
```

#### Form Submission Trends

```sql
SELECT 
  day, 
  partner_type, 
  submission_count
FROM analytics_form_submissions
WHERE day >= CURRENT_DATE - INTERVAL '90 days'
ORDER BY day DESC, submission_count DESC;
```

#### Most Viewed Sections

```sql
SELECT 
  section, 
  SUM(view_count) as total_views,
  AVG(avg_visible_percent) as average_visibility
FROM analytics_section_views
GROUP BY section
ORDER BY total_views DESC;
```

## Privacy Considerations

- Analytics tracking respects the "Do Not Track" browser setting
- No personally identifiable information is collected
- Data is stored in your own Supabase instance, not shared with third parties
- Analytics can be disabled by removing the script from your site

## Extending Analytics

To track additional events, modify the `analytics.js` file and add event tracking calls:

```javascript
import { trackEvent } from './analytics.js';

// Track a custom event
trackEvent('custom_event', { 
  property1: 'value1',
  property2: 'value2'
});
```

## Troubleshooting

If analytics events are not being recorded:

1. Check browser console for any errors
2. Verify that Supabase connection is working
3. Check that the `analytics_events` table exists and has the correct permissions
4. Verify that Row Level Security policies are correctly configured
