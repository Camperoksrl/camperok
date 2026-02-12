import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    // Support both direct call and webhook trigger format
    const booking = payload.record || payload;

    const {
      customer_name,
      customer_email,
      start_date,
      end_date,
      total_price,
      camper_id,
    } = booking;

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

    const res = await fetch("https://api.resend.com/emails", {
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

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Email send failed", details: data }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Notification email sent successfully:", data.id);
    return new Response(JSON.stringify({ success: true, emailId: data.id }), {
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
