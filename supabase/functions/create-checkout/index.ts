import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id, payment_type } = await req.json();

    if (!booking_id || !payment_type || !["deposit", "full"].includes(payment_type)) {
      return new Response(JSON.stringify({ error: "Invalid parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch the booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", booking_id)
      .single();

    if (bookingError || !booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (booking.payment_status === "paid") {
      return new Response(JSON.stringify({ error: "Booking already paid" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const totalPrice = Number(booking.total_price);
    const amountToPay = payment_type === "deposit" 
      ? Math.round(totalPrice * 0.3 * 100)  // 30% in cents
      : Math.round(totalPrice * 100);         // full in cents

    const description = payment_type === "deposit"
      ? `Caparra (30%) - Prenotazione camper dal ${booking.start_date} al ${booking.end_date}`
      : `Pagamento completo - Prenotazione camper dal ${booking.start_date} al ${booking.end_date}`;

    const session = await stripe.checkout.sessions.create({
      customer_email: booking.customer_email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: description,
            },
            unit_amount: amountToPay,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        booking_id: booking.id,
        payment_type,
      },
      success_url: `${req.headers.get("origin")}/prenotazione-confermata?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/veicoli`,
    });

    // Save stripe session id on booking
    await supabase
      .from("bookings")
      .update({ stripe_session_id: session.id, payment_type })
      .eq("id", booking_id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
