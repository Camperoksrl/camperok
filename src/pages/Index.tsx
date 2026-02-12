import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/vehicles";
import { Shield, Clock, MapPin, Headphones, ArrowRight, Star } from "lucide-react";
import heroRv from "@/assets/hero-rv.jpg";

const Index = () => {
  const featuredVehicles = vehicles.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroRv} alt="Camper al lago in Italia" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative container mx-auto px-6 pt-20">
          <div className="max-w-2xl reveal">
            <p className="text-minimal text-primary-foreground/80 mb-4">Noleggio Camper in Italia</p>
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground text-display mb-6">
              La tua avventura su ruote inizia qui
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Scopri l'Italia a bordo dei nostri camper. Dalle Dolomiti alla Sicilia, ogni strada diventa un'esperienza indimenticabile.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/veicoli">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 text-base">
                  Esplora i Veicoli
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/come-funziona">
                <Button size="lg" className="rounded-full px-8 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Come Funziona
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Assicurazione Inclusa", desc: "Copertura completa per viaggiare sereni" },
              { icon: Clock, title: "Prenotazione Facile", desc: "Prenota online in pochi minuti" },
              { icon: MapPin, title: "Ritiro Flessibile", desc: "Diverse sedi in tutta Italia" },
              { icon: Headphones, title: "Assistenza 24/7", desc: "Sempre al tuo fianco, ovunque tu sia" },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-3">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-minimal text-primary mb-3">La Nostra Flotta</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-display mb-4">
              Veicoli in Evidenza
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Scegli il camper perfetto per la tua prossima avventura italiana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/veicoli">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Vedi Tutti i Veicoli
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-accent text-accent" />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl text-display font-medium leading-relaxed mb-8">
            "Esperienza fantastica! Il camper era perfetto e ci ha permesso di scoprire angoli meravigliosi della Toscana che non avremmo mai visto altrimenti."
          </blockquote>
          <div>
            <p className="font-semibold">Marco e Giulia R.</p>
            <p className="text-primary-foreground/60 text-sm">Viaggio in Toscana, Agosto 2025</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-display mb-6">
            Pronto a Partire?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">
            Scegli il tuo camper, seleziona le date e parti all'avventura. Il tuo viaggio da sogno ti aspetta.
          </p>
          <Link to="/veicoli">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 text-base">
              Prenota il Tuo Camper
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
