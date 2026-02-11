import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Users, BedDouble, Ruler, MapPin, Check, ArrowLeft, Calendar, ChevronRight,
} from "lucide-react";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);
  const { toast } = useToast();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!vehicle) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 text-center container mx-auto px-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">Veicolo non trovato</h1>
          <Link to="/veicoli">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Torna ai Veicoli
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const getDayCount = () => {
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const days = getDayCount();
  const totalPrice = days * vehicle.pricePerDay;

  const handleBooking = () => {
    if (!startDate || !endDate || days < 1) {
      toast({
        title: "Date non valide",
        description: "Seleziona le date di ritiro e riconsegna.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Richiesta Inviata! ✅",
      description: `Prenotazione per ${vehicle.name} dal ${startDate} al ${endDate} (${days} giorni, €${totalPrice}). Ti contatteremo a breve.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/veicoli" className="hover:text-foreground transition-colors">Veicoli</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{vehicle.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={vehicle.images?.[selectedImage] ?? vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {vehicle.images && vehicle.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${vehicle.name} ${idx + 1}`} className="w-20 h-16 object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-primary text-primary-foreground">{vehicle.typeLabel}</Badge>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    {vehicle.location}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground text-display mb-4">
                  {vehicle.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed text-lg">{vehicle.description}</p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Users, label: "Posti", value: vehicle.capacity },
                  { icon: BedDouble, label: "Letti", value: vehicle.beds },
                  { icon: Ruler, label: "Lunghezza", value: vehicle.length },
                ].map((spec) => (
                  <div key={spec.label} className="bg-secondary rounded-xl p-4 text-center">
                    <spec.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{spec.value}</p>
                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Dotazioni</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">
                    €{vehicle.pricePerDay}
                    <span className="text-base font-normal text-muted-foreground">/giorno</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Data Ritiro</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        className="pl-10 rounded-xl"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">Data Riconsegna</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        className="pl-10 rounded-xl"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {days > 0 && (
                  <div className="bg-secondary rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">€{vehicle.pricePerDay} × {days} giorni</span>
                      <span className="text-foreground font-medium">€{totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                      <span className="text-foreground">Totale</span>
                      <span className="text-primary">€{totalPrice}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-base py-6"
                  onClick={handleBooking}
                >
                  Richiedi Prenotazione
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Nessun addebito immediato. Ti contatteremo per confermare la disponibilità.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
