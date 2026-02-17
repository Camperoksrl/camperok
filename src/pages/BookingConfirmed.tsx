import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BookingConfirmed = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center max-w-lg">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground text-display mb-4">
            Prenotazione Confermata!
          </h1>
          <p className="text-muted-foreground mb-2">
            Il pagamento è stato ricevuto con successo. Riceverai un'email di conferma a breve.
          </p>
          <p className="text-muted-foreground mb-8">
            Ti contatteremo per organizzare i dettagli del ritiro del veicolo.
          </p>
          <Link to="/">
            <Button className="rounded-full px-8">Torna alla Home</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmed;
