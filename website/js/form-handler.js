// Form submission handler for Focustime contact form
import supabaseConfig from './supabase-config.js';

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitButtons = contactForm.querySelectorAll('button[type="submit"]');
  
  if (!contactForm) return;
  
  // Get current language
  function getCurrentLanguage() {
    // Check which language buttons are visible
    const isSpanish = document.querySelector('.lang-es').style.display !== 'none';
    return isSpanish ? 'es' : 'en';
  }
  
  // Create loading indicator
  function createLoadingIndicator() {
    const loading = document.createElement('div');
    loading.classList.add('form-loading');
    loading.innerHTML = `
      <div class="loading-spinner"></div>
      <p class="lang-en">Sending your information...</p>
      <p class="lang-es">Enviando su información...</p>
    `;
    return loading;
  }
  
  // Show thank you message
  function showThankYouMessage(formContainer) {
    const thankYou = document.createElement('div');
    thankYou.classList.add('form-thank-you');
    thankYou.innerHTML = `
      <h3 class="lang-en">Thank You!</h3>
      <h3 class="lang-es">¡Gracias!</h3>
      <p class="lang-en">Your message has been sent. We'll be in touch soon!</p>
      <p class="lang-es">Su mensaje ha sido enviado. ¡Nos pondremos en contacto pronto!</p>
    `;
    
    // Apply current language
    const currentLang = getCurrentLanguage();
    thankYou.querySelectorAll(`.lang-${currentLang === 'es' ? 'en' : 'es'}`).forEach(el => {
      el.style.display = 'none';
    });
    
    formContainer.innerHTML = '';
    formContainer.appendChild(thankYou);
  }
  
  // Show error message
  function showErrorMessage(formContainer, error) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('form-error');
    errorElement.innerHTML = `
      <h3 class="lang-en">Something went wrong</h3>
      <h3 class="lang-es">Algo salió mal</h3>
      <p class="lang-en">We couldn't send your message. Please try again later.</p>
      <p class="lang-es">No pudimos enviar su mensaje. Por favor, inténtelo de nuevo más tarde.</p>
      <p class="error-details">${error}</p>
      <button class="contact-submit-btn try-again-btn lang-en">Try Again</button>
      <button class="contact-submit-btn try-again-btn lang-es">Intentar de nuevo</button>
    `;
    
    // Apply current language
    const currentLang = getCurrentLanguage();
    errorElement.querySelectorAll(`.lang-${currentLang === 'es' ? 'en' : 'es'}`).forEach(el => {
      el.style.display = 'none';
    });
    
    // Add try again button handler
    errorElement.querySelector('.try-again-btn').addEventListener('click', function() {
      window.location.reload();
    });
    
    formContainer.innerHTML = '';
    formContainer.appendChild(errorElement);
  }
  
  // Handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formContainer = contactForm.closest('.contact-form-container');
    const loadingIndicator = createLoadingIndicator();
    
    // Apply current language to loading indicator
    const currentLang = getCurrentLanguage();
    loadingIndicator.querySelectorAll(`.lang-${currentLang === 'es' ? 'en' : 'es'}`).forEach(el => {
      el.style.display = 'none';
    });
    
    // Show loading indicator
    formContainer.appendChild(loadingIndicator);
    
    // Disable submit buttons
    submitButtons.forEach(btn => {
      btn.disabled = true;
    });
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      partner_type: formData.get('partner-type'),
      message: formData.get('message'),
      language: currentLang
    };
    
    try {
      // First, store in Supabase database
      const supabaseUrl = supabaseConfig.url;
      const supabaseAnonKey = supabaseConfig.anonKey;
      
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(formObject)
      });
      
      if (!dbRes.ok) {
        throw new Error('Failed to store submission in database');
      }
      
      // Show success message
      showThankYouMessage(formContainer);
      
    } catch (error) {
      console.error('Form submission error:', error);
      showErrorMessage(formContainer, error.message);
    }
  }
  
  // Add event listeners to both EN and ES submit buttons
  submitButtons.forEach(button => {
    button.addEventListener('click', handleFormSubmit);
  });
});

// Add CSS for loading, thank you, and error states
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .form-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: 12px;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: var(--primary-color);
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 20px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .form-thank-you, .form-error {
      text-align: center;
      padding: 40px 20px;
    }
    
    .form-thank-you h3, .form-error h3 {
      font-size: 1.8rem;
      color: var(--primary-color);
      margin-bottom: 20px;
    }
    
    .form-error h3 {
      color: #e74c3c;
    }
    
    .error-details {
      font-size: 0.8rem;
      color: #777;
      margin: 20px 0;
      padding: 10px;
      background: #f8f8f8;
      border-radius: 4px;
    }
    
    .try-again-btn {
      margin-top: 20px;
    }
  `;
  
  document.head.appendChild(style);
});
