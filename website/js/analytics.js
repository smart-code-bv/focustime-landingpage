// Analytics for Focustime website
// This script tracks user interactions and page views

// Initialize analytics
function initAnalytics() {
  // Check if we should respect Do Not Track
  if (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes') {
    console.log('Respecting Do Not Track setting');
    return;
  }
  
  // Set up basic page view tracking
  trackPageView();
  
  // Set up event listeners for important user interactions
  setupEventTracking();
}

// Track page views
function trackPageView() {
  const pageData = {
    page: window.location.pathname,
    referrer: document.referrer,
    language: document.documentElement.lang || 'en',
    timestamp: new Date().toISOString(),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    userAgent: navigator.userAgent
  };
  
  // In a production environment, we would send this to our analytics endpoint
  console.log('Page view:', pageData);
  
  // If Supabase is available, we can log the page view there
  if (typeof supabase !== 'undefined') {
    logEventToSupabase('page_view', pageData);
  }
}

// Track user interactions
function setupEventTracking() {
  // Track language switcher usage
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.addEventListener('click', function() {
      trackEvent('language_switch', { 
        from: document.documentElement.lang || 'en',
        to: document.documentElement.lang === 'es' ? 'en' : 'es'
      });
    });
  }
  
  // Track section visibility
  setupIntersectionObserver();
  
  // Track contact form interactions
  trackFormInteractions();
  
  // Track outbound links
  trackOutboundLinks();
}

// Use Intersection Observer to track which sections are viewed
function setupIntersectionObserver() {
  if (!('IntersectionObserver' in window)) return;
  
  const sections = document.querySelectorAll('section[id]');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trackEvent('section_view', { 
          section: entry.target.id,
          visible_percent: Math.round(entry.intersectionRatio * 100)
        });
      }
    });
  }, { threshold: [0.25, 0.5, 0.75, 1] });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Track form interactions
function trackFormInteractions() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    // Track form focus
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        trackEvent('form_field_focus', { 
          field: this.name,
          field_type: this.type
        });
      });
    });
    
    // Track form submissions
    contactForm.addEventListener('submit', function() {
      trackEvent('form_submit', { 
        form: 'contact',
        partner_type: document.getElementById('partner-type').value
      });
    });
  }
}

// Track outbound links
function trackOutboundLinks() {
  const links = document.querySelectorAll('a[href^="http"]');
  
  links.forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.addEventListener('click', function(e) {
        const linkData = {
          url: this.href,
          text: this.textContent.trim(),
          destination: this.hostname
        };
        
        trackEvent('outbound_link_click', linkData);
      });
    }
  });
}

// Generic event tracking function
function trackEvent(eventName, eventData) {
  const completeEventData = {
    ...eventData,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    language: document.documentElement.lang || 'en'
  };
  
  // In a production environment, we would send this to our analytics endpoint
  console.log(`Event: ${eventName}`, completeEventData);
  
  // If Supabase is available, we can log the event there
  if (typeof supabase !== 'undefined') {
    logEventToSupabase(eventName, completeEventData);
  }
}

// Log events to Supabase if available
function logEventToSupabase(eventName, eventData) {
  if (typeof supabase === 'undefined') return;
  
  supabase
    .from('analytics_events')
    .insert([{
      event_name: eventName,
      event_data: eventData,
      created_at: new Date().toISOString()
    }])
    .then(response => {
      if (response.error) {
        console.error('Analytics error:', response.error);
      }
    })
    .catch(error => {
      console.error('Analytics error:', error);
    });
}

// Initialize analytics when the page is loaded
document.addEventListener('DOMContentLoaded', initAnalytics);
