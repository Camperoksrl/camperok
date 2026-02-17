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
    } = booking;

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
      .select("id")
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
        <h2 style="color: #2d5016; border-bottom: 2px solid #2d5016; padding-bottom: 10px;">
          🚐 Nuova Richiesta di Prenotazione
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; background: #f5f5f5; border: 1px solid #ddd;">Cliente</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${customer_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; background: #f5f5f5; border: 1px solid #ddd;">Email</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">
              <a href="mailto:${customer_email}">${customer_email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; background: #f5f5f5; border: 1px solid #ddd;">Data Ritiro</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${start_date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; background: #f5f5f5; border: 1px solid #ddd;">Data Riconsegna</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd;">${end_date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; background: #f5f5f5; border: 1px solid #ddd;">Totale</td>
            <td style="padding: 8px 12px; border: 1px solid #ddd; font-weight: bold; color: #2d5016;">€${total_price}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 14px;">
          Accedi al pannello admin per gestire questa prenotazione.
        </p>
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
        from: "CamperOK <noreply@camperok.it>",
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
        <h2 style="color: #2d5016;">🚐 Prenotazione Ricevuta</h2>
        <p>Gentile ${customer_name},</p>
        <p>Abbiamo ricevuto la tua richiesta di prenotazione. Ecco il riepilogo:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Periodo</td><td style="padding:8px;border:1px solid #ddd;">${start_date} — ${end_date}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Importo totale</td><td style="padding:8px;border:1px solid #ddd;">€${total_price}</td></tr>
        </table>
        <p>Procedi al pagamento tramite il link che hai ricevuto. Dopo il pagamento, riceverai la conferma definitiva.</p>
        <p>Per qualsiasi domanda, contattaci a <a href="mailto:camperokroma@gmail.com">camperokroma@gmail.com</a> o al 339-2715067.</p>
        <p>Grazie e buon viaggio!<br/>Il Team CamperOK</p>
      </div>
    `;

    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CamperOK <noreply@camperok.it>",
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
