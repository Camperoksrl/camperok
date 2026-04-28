import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Admin() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    setBookings(data || []);
  }

  async function cancelBooking(id: string) {
    if (!confirm("Vuoi cancellare e rimborsare?")) return;

    await fetch(
      "https://gnyzijlfkobjblrvimoi.supabase.co/functions/v1/admin-cancel-booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking_id: id }),
      }
    );

    alert("Cancellata!");
    loadBookings();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Prenotazioni</h1>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p><b>{b.customer_name}</b> ({b.customer_email})</p>
          <p>{b.start_date} → {b.end_date}</p>
          <p>€ {b.total_price}</p>
          <p>Status: {b.status}</p>

          {b.status !== "cancelled" && (
            <button onClick={() => cancelBooking(b.id)}>
              Cancella + rimborsa
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
