// Focustime Partner Contact Form - Edge Function
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  partner_type: string;
  message: string;
  language?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get form data from the request
    const formData: ContactFormData = await req.json();
    
    // Validate the required fields
    if (!formData.name || !formData.email || !formData.partner_type || !formData.message) {
      throw new Error("Missing required fields");
    }
    
    // Get the current language
    const language = formData.language || 'en';
    
    // Format the partner type for display
    let partnerTypeDisplay = '';
    switch (formData.partner_type) {
      case 'property':
        partnerTypeDisplay = language === 'es' ? 'Propietario' : 'Property Owner';
        break;
      case 'culinary':
        partnerTypeDisplay = language === 'es' ? 'Servicio Culinario' : 'Culinary Service';
        break;
      case 'activity':
        partnerTypeDisplay = language === 'es' ? 'Proveedor de Actividades' : 'Activity Provider';
        break;
      case 'other':
        partnerTypeDisplay = language === 'es' ? 'Otro' : 'Other';
        break;
      default:
        partnerTypeDisplay = formData.partner_type;
    }

    // Send the email notification using Resend
    const emailResponse = await resend.emails.send({
      from: "Focustime <notifications@focustime.io>",
      to: 'tjaco@focustime.io',
      subject: `Focustime: New Partner Inquiry - ${formData.name} (${partnerTypeDisplay})`,
      html: `
        <h2>Focustime Partner Inquiry</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Partner Type:</strong> ${partnerTypeDisplay}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Language:</strong> ${language === 'es' ? 'Spanish' : 'English'}</p>
        <hr>
        <p style="color: #888; font-size: 12px;">This message was sent from the Focustime website partner form.</p>
      `,
    });

    console.log("Partner form notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error processing partner form submission:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);