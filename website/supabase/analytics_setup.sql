-- Create table for storing analytics events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id TEXT,
  user_id UUID
);

-- Create index for faster queries on event_name
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events (event_name);

-- Create index for faster time-based queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events (created_at);

-- Row level security policies
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for frontend tracking)
CREATE POLICY "Allow anonymous inserts" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Only allow admins to select, update, delete
CREATE POLICY "Allow admin access" ON public.analytics_events
  USING (auth.role() = 'authenticated' AND auth.email() IN (
    SELECT email FROM public.admin_users
  ));

-- Create admin users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert initial admin user (replace with your admin email)
INSERT INTO public.admin_users (email)
VALUES ('tjaco@focustime.io')
ON CONFLICT (email) DO NOTHING;

-- Create some useful views for analytics reporting
-- Daily page views
CREATE OR REPLACE VIEW analytics_daily_page_views AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  (event_data->>'page')::TEXT AS page,
  COUNT(*) AS view_count
FROM public.analytics_events
WHERE event_name = 'page_view'
GROUP BY DATE_TRUNC('day', created_at), (event_data->>'page')::TEXT
ORDER BY day DESC, view_count DESC;

-- Form submission stats
CREATE OR REPLACE VIEW analytics_form_submissions AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  (event_data->>'form')::TEXT AS form,
  (event_data->>'partner_type')::TEXT AS partner_type,
  COUNT(*) AS submission_count
FROM public.analytics_events
WHERE event_name = 'form_submit'
GROUP BY DATE_TRUNC('day', created_at), (event_data->>'form')::TEXT, (event_data->>'partner_type')::TEXT
ORDER BY day DESC, submission_count DESC;

-- Section visibility stats
CREATE OR REPLACE VIEW analytics_section_views AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  (event_data->>'section')::TEXT AS section,
  AVG((event_data->>'visible_percent')::INT) AS avg_visible_percent,
  COUNT(*) AS view_count
FROM public.analytics_events
WHERE event_name = 'section_view'
GROUP BY DATE_TRUNC('day', created_at), (event_data->>'section')::TEXT
ORDER BY day DESC, view_count DESC;

-- Language usage stats
CREATE OR REPLACE VIEW analytics_language_usage AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  (event_data->>'language')::TEXT AS language,
  COUNT(*) AS view_count
FROM public.analytics_events
WHERE event_name = 'page_view'
GROUP BY DATE_TRUNC('day', created_at), (event_data->>'language')::TEXT
ORDER BY day DESC, view_count DESC;

-- Outbound link clicks
CREATE OR REPLACE VIEW analytics_outbound_links AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  (event_data->>'destination')::TEXT AS destination,
  (event_data->>'url')::TEXT AS url,
  COUNT(*) AS click_count
FROM public.analytics_events
WHERE event_name = 'outbound_link_click'
GROUP BY DATE_TRUNC('day', created_at), (event_data->>'destination')::TEXT, (event_data->>'url')::TEXT
ORDER BY day DESC, click_count DESC;
