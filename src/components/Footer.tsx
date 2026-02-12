import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoCamperok from "@/assets/logo-camperok.png";
import { reopenCookieBanner } from "@/components/CookieBanner";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoCamperok} alt="Camperok" className="h-10 w-10 rounded-full" />
              <span className="text-xl font-bold text-display">Camperok</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              La tua avventura su ruote inizia qui. Noleggia il camper perfetto per esplorare l'Italia.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Link Utili</h4>
            <div className="space-y-2">
              <Link to="/veicoli" className="block text-background/60 hover:text-background text-sm transition-colors">Veicoli</Link>
              <Link to="/come-funziona" className="block text-background/60 hover:text-background text-sm transition-colors">Come Funziona</Link>
              <Link to="/contatti" className="block text-background/60 hover:text-background text-sm transition-colors">Contatti</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Legale</h4>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-background/60 hover:text-background text-sm transition-colors">Privacy Policy</Link>
              <Link to="/cookie-policy" className="block text-background/60 hover:text-background text-sm transition-colors">Cookie Policy</Link>
              <button onClick={reopenCookieBanner} className="block text-background/60 hover:text-background text-sm transition-colors text-left">
                Gestisci Cookie
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Veicoli</h4>
            <div className="space-y-2">
              <Link to="/veicoli?type=van" className="block text-background/60 hover:text-background text-sm transition-colors">Van</Link>
              <Link to="/veicoli?type=motorhome" className="block text-background/60 hover:text-background text-sm transition-colors">Motorhome</Link>
              <Link to="/veicoli?type=compact" className="block text-background/60 hover:text-background text-sm transition-colors">Compatti</Link>
              <Link to="/veicoli?type=premium" className="block text-background/60 hover:text-background text-sm transition-colors">Premium</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <Phone className="h-4 w-4" />
                <span>339-2715067</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@camperok.it</span>
              </div>
              <div className="flex items-center gap-2 text-background/60 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Roma, Italia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/40 text-sm">
          © {new Date().getFullYear()} Camperok. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
