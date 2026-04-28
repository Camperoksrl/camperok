import { Link } from "react-router-dom";

export default function PrenotazioneConfermata() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          Prenotazione confermata
        </h1>

        <p className="text-lg mb-6">
          Grazie! Il pagamento è stato ricevuto correttamente.
          Ti invieremo a breve una conferma via email.
        </p>

        <Link
          to="/"
          className="inline-block rounded-lg px-6 py-3 bg-black text-white"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
