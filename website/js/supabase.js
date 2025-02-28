// Supabase Integration for Focustime Contact Form

// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to submit form data to Supabase
async function submitContactForm(formData) {
    try {
        // Get current timestamp
        const timestamp = new Date().toISOString();
        
        // Prepare data object from form data
        const contactData = {
            created_at: timestamp,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || null,
            partner_type: formData.get('partner-type'),
            message: formData.get('message'),
            language: document.documentElement.lang // Track which language the user submitted in
        };
        
        // Submit data to Supabase
        const { data, error } = await supabaseClient
            .from('contact_submissions')
            .insert([contactData]);
            
        if (error) {
            console.error('Error submitting form:', error);
            return {
                success: false,
                message: {
                    en: 'There was an error submitting your form. Please try again later.',
                    es: 'Hubo un error al enviar su formulario. Por favor, inténtelo de nuevo más tarde.'
                }
            };
        }
        
        console.log('Form submitted successfully:', data);
        return {
            success: true,
            message: {
                en: 'Thank you for your interest! We will contact you soon.',
                es: '¡Gracias por su interés! Nos pondremos en contacto con usted pronto.'
            }
        };
    } catch (err) {
        console.error('Exception submitting form:', err);
        return {
            success: false,
            message: {
                en: 'There was an error submitting your form. Please try again later.',
                es: 'Hubo un error al enviar su formulario. Por favor, inténtelo de nuevo más tarde.'
            }
        };
    }
}

// Function to setup notification email
async function setupNotificationEmail(formData) {
    try {
        // This would typically be handled by a server-side function or webhook
        // For Supabase, you would use Edge Functions or PostgreSQL triggers
        
        // Example implementation using a hypothetical Supabase Edge Function:
        /*
        const { data, error } = await supabaseClient
            .functions
            .invoke('send-notification-email', {
                body: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    partner_type: formData.get('partner-type'),
                    message: formData.get('message')
                }
            });
        */
        
        // In practice, you would typically handle this via database triggers
        // that automatically send notifications when new entries are created
        
        return { success: true };
    } catch (err) {
        console.error('Error setting up notification:', err);
        return { success: false };
    }
}
