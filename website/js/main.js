document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    document.documentElement.lang = 'en';
    
    // Language switcher
    const enBtn = document.getElementById('language-en');
    const esBtn = document.getElementById('language-es');
    
    if (enBtn && esBtn) {
        enBtn.addEventListener('click', function() {
            document.documentElement.lang = 'en';
            enBtn.classList.add('active');
            esBtn.classList.remove('active');
            
            // Show English content, hide Spanish content
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.lang-es').forEach(el => el.style.display = 'none');
        });
        
        esBtn.addEventListener('click', function() {
            document.documentElement.lang = 'es';
            esBtn.classList.add('active');
            enBtn.classList.remove('active');
            
            // Show Spanish content, hide English content
            document.querySelectorAll('.lang-es').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
        });
    }
    
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            let formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Form submitted with values:', formValues);
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            const lang = document.documentElement.lang;
            
            submitButton.disabled = true;
            submitButton.textContent = lang === 'en' ? 'Submitting...' : 'Enviando...';
            
            // Submit to Supabase
            try {
                const result = await submitContactForm(formData);
                
                if (result.success) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = result.message[lang];
                    
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    
                    // Style the success message
                    successMessage.style.textAlign = 'center';
                    successMessage.style.padding = '20px';
                    successMessage.style.fontSize = '1.2rem';
                    successMessage.style.color = '#28a745';
                    
                    // Optional: Setup email notification
                    await setupNotificationEmail(formData);
                } else {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = result.message[lang];
                    
                    // Insert error message before the submit button
                    const formControls = contactForm.querySelector('.form-group:last-child');
                    contactForm.insertBefore(errorMessage, formControls);
                    
                    // Style the error message
                    errorMessage.style.textAlign = 'center';
                    errorMessage.style.padding = '10px';
                    errorMessage.style.fontSize = '1rem';
                    errorMessage.style.color = '#dc3545';
                    errorMessage.style.marginBottom = '15px';
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Reset button and show generic error
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = lang === 'en' 
                    ? 'An error occurred. Please try again later.' 
                    : 'Se produjo un error. Por favor, inténtelo de nuevo más tarde.';
                
                // Insert error message before the submit button
                const formControls = contactForm.querySelector('.form-group:last-child');
                contactForm.insertBefore(errorMessage, formControls);
                
                // Style the error message
                errorMessage.style.textAlign = 'center';
                errorMessage.style.padding = '10px';
                errorMessage.style.fontSize = '1rem';
                errorMessage.style.color = '#dc3545';
                errorMessage.style.marginBottom = '15px';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .experience-card, .location-card, .partner-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.feature-card, .experience-card, .location-card, .partner-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Note: You need to implement the submitContactForm and setupNotificationEmail functions
// to interact with your Supabase instance and send email notifications.
