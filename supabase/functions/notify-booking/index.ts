import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_EMAIL = "camperokroma@gmail.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await req.json();
    const booking = payload.record || payload;

    const {
      customer_name,
      customer_email,
      start_date,
      end_date,
      total_price,
      camper_id,
      camper_name,
    } = booking;
    
    const { data: camper } = await supabase
      .from("campers")
      .select("name")
      .eq("id", camper_id)
      .single();

const camperName = camper?.name || "Camper";

    // Validate required fields
    if (!customer_name || !customer_email || !start_date || !end_date || !camper_id) {
      return new Response(JSON.stringify({ error: "Missing required booking fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify booking exists in database to prevent spam
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: existingBooking, error: lookupError } = await supabase
      .from("bookings")
      .eq("camper_id", camper_id)
      .eq("customer_email", customer_email)
      .eq("start_date", start_date)
      .eq("end_date", end_date)
      .limit(1)
      .maybeSingle();

    if (lookupError || !existingBooking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2d5016;">🚐 Nuova Prenotazione</h2>

      <p><strong>Camper:</strong> ${camperName}</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Cliente</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${customer_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${customer_email}</td>
        </tr>
        <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Periodo</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${start_date} → ${end_date}</td>
        </tr>
        <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Totale</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">€${total_price}</td>
        </tr>
      </table>

      <p style="color: #666;">Controlla dal pannello admin per gestire la prenotazione.</p>
    </div>
    `;
    
    // Email to admin
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CamperOK <prenotazioni@camperok.it>",
        to: [NOTIFY_EMAIL],
        subject: `Nuova Prenotazione: ${customer_name} (${start_date} → ${end_date})`,
        html: emailHtml,
      }),
    });

    const adminData = await adminRes.json();
    if (!adminRes.ok) {
      console.error("Admin email error:", JSON.stringify(adminData));
    }

    // Email to customer
    const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2d5016;">🚐 Richiesta ricevuta!</h2>

      <p>Ciao ${customer_name},</p>

      <p>Abbiamo ricevuto la tua richiesta di prenotazione per il camper:</p>

      <p style="font-size: 18px; font-weight: bold; color: #2d5016;">
        ${camperName}
      </p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr>
          <td style="padding:8px;border:1px solid #ddd;"><strong>Periodo</strong></td>
          <td style="padding:8px;border:1px solid #ddd;">${start_date} — ${end_date}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;"><strong>Totale</strong></td>
          <td style="padding:8px;border:1px solid #ddd;">€${total_price}</td>
        </tr>
      </table>

      <p>👉 Per confermare la prenotazione, completa il pagamento tramite il link che hai ricevuto.</p>

      <p>Se hai bisogno di assistenza:</p>
      <p>
        📧 camperokroma@gmail.com<br/>
        📞 339 2715067
      </p>

      <p style="margin-top: 30px;">
        Grazie e buon viaggio! 🚐<br/>
        <strong>Il Team CamperOK</strong>
      </p>
    </div>
    `;

    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CamperOK <prenotazioni@camperok.it>",
        to: [customer_email],
        subject: `Prenotazione ricevuta – CamperOK`,
        html: customerHtml,
      }),
    });

    const customerData = await customerRes.json();
    if (!customerRes.ok) {
      console.error("Customer email error:", JSON.stringify(customerData));
    }

    console.log("Notification emails sent:", { admin: adminData.id, customer: customerData.id });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in notify-booking:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
