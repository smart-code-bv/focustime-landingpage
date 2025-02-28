// Image handling for Focustime website

// Initialize lazy loading for images
function initLazyLoading() {
  // If browser supports Intersection Observer
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          img.setAttribute('src', src);
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    lazyImages.forEach(img => {
      const src = img.getAttribute('data-src');
      img.setAttribute('src', src);
      img.classList.add('loaded');
    });
  }
}

// Create location cards programmatically
function createLocationCards(locations, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create and append location cards
  locations.forEach(location => {
    const card = document.createElement('div');
    card.className = 'location-card';
    
    card.innerHTML = `
      <img src="${location.image}" alt="${location.title}" class="lazy-load" data-src="${location.image}">
      <div class="location-info">
        <h3>${location.title}</h3>
        <p>${location.description}</p>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// Example location data (to be replaced with real data)
// Only define if it doesn't already exist
if (typeof window.sampleLocations === 'undefined') {
  window.sampleLocations = [
    {
      title: 'Villa Zuniga',
      description: 'Traditional villa with modern amenities in a secluded setting',
      image: 'images/villa-zuniga.jpg'
    },
    {
      title: 'Pazo de la Parda',
      description: 'Historic manor house surrounded by lush gardens',
      image: 'images/pazo-parda.jpg'
    },
    {
      title: 'Pazo de Cea',
      description: 'Elegant countryside retreat with panoramic views',
      image: 'images/pazo-cea.jpg'
    }
  ];
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize lazy loading
  initLazyLoading();
  
  // Create location cards only if the container exists
  // const locationContainer = document.getElementById('location-container');
  // if (locationContainer) {
  //   createLocationCards(window.sampleLocations, 'location-container');
  // }
});

// Update images when language changes
document.addEventListener('languageChanged', function(e) {
  // You can have language-specific images if needed
  const language = e.detail.language;
  
  // Example of language-specific image paths
  /* if (language === 'es') {
    setHeroBackground('images/hero-galician-coast-es.jpg');
  } else {
    setHeroBackground('images/hero-galician-coast.jpg');
  } */
});
