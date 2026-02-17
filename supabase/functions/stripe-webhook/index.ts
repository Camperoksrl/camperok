import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response(JSON.stringify({ error: "Missing signature or webhook secret" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;
    const paymentType = session.metadata?.payment_type;

    if (bookingId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const amountPaid = (session.amount_total || 0) / 100;
      const paymentStatus = paymentType === "full" ? "paid" : "partial";

      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          payment_status: paymentStatus,
          amount_paid: amountPaid,
        })
        .eq("id", bookingId);

      // Fetch booking for email notification
      const { data: booking } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (booking) {
        // Send payment confirmation emails
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (RESEND_API_KEY) {
          // Email to customer
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "CamperOK <noreply@camperok.it>",
              to: [booking.customer_email],
              subject: "Pagamento ricevuto – Conferma prenotazione CamperOK",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #16a34a;">✅ Pagamento ricevuto!</h2>
                  <p>Gentile ${booking.customer_name},</p>
                  <p>Abbiamo ricevuto il tuo pagamento di <strong>€${amountPaid.toFixed(2)}</strong> (${paymentType === "full" ? "pagamento completo" : "caparra 30%"}).</p>
                  <p>La tua prenotazione è ora <strong>confermata</strong>.</p>
                  <table style="width:100%;border-collapse:collapse;margin:16px 0;">
                    <tr><td style="padding:8px;border:1px solid #ddd;">Periodo</td><td style="padding:8px;border:1px solid #ddd;">${booking.start_date} — ${booking.end_date}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;">Totale noleggio</td><td style="padding:8px;border:1px solid #ddd;">€${Number(booking.total_price).toFixed(2)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;">Importo pagato</td><td style="padding:8px;border:1px solid #ddd;">€${amountPaid.toFixed(2)}</td></tr>
                  </table>
                  <p>Ti contatteremo per i dettagli del ritiro. Per qualsiasi domanda scrivi a <a href="mailto:camperokroma@gmail.com">camperokroma@gmail.com</a>.</p>
                  <p>Buon viaggio!<br/>Il Team CamperOK</p>
                </div>
              `,
            }),
          });

          // Email to admin
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "CamperOK <noreply@camperok.it>",
              to: ["camperokroma@gmail.com"],
              subject: `💳 Pagamento ricevuto – ${booking.customer_name}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2>Pagamento ricevuto</h2>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Cliente</strong></td><td style="padding:8px;border:1px solid #ddd;">${booking.customer_name}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${booking.customer_email}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Periodo</strong></td><td style="padding:8px;border:1px solid #ddd;">${booking.start_date} — ${booking.end_date}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Totale</strong></td><td style="padding:8px;border:1px solid #ddd;">€${Number(booking.total_price).toFixed(2)}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Pagato</strong></td><td style="padding:8px;border:1px solid #ddd;">€${amountPaid.toFixed(2)} (${paymentType === "full" ? "completo" : "caparra 30%"})</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Stato</strong></td><td style="padding:8px;border:1px solid #ddd;">Confermata</td></tr>
                  </table>
                </div>
              `,
            }),
          });
        }
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
