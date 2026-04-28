import { useEffect, useState } from "react";

export default function CancellaPrenotazione() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    fetch("https://gnyzijlfkobjblrvimoi.supabase.co/functions/v1/cancel-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Caricamento...</p>;

  if (status === "refunded") {
    return <h2>Caparra rimborsata correttamente ✅</h2>;
  }

  if (status === "no_refund") {
    return <h2>Cancellazione registrata. La caparra non è rimborsabile.</h2>;
  }

  return <h2>Errore nella richiesta</h2>;
}
