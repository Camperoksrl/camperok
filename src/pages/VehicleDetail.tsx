import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { vehicles, getMinPrice, calculateTotalPrice } from "@/data/vehicles";
import { addBooking, getBookingsForCamper, type Booking } from "@/lib/adminStore";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  BedDouble,
  Ruler,
  MapPin,
  Check,
  ArrowLeft,
  Calendar,
  ChevronRight,
  Phone,
  ChevronLeft,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === id);
  const { toast } = useToast();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentType, setPaymentType] = useState<"deposit" | "full">("deposit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [camperBookings, setCamperBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!vehicle) return;
    getBookingsForCamper(vehicle.dbId || vehicle.id).then(setCamperBookings);
  }, [vehicle]);

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
  const totalPrice = days > 0 ? calculateTotalPrice(vehicle, startDate, endDate) : 0;
  const avgPricePerDay = days > 0 ? Math.round(totalPrice / days) : 0;

  const unavailablePeriod =
    startDate && endDate && days > 0
      ? camperBookings.find((booking) => {
          if (booking.status === "cancelled") return false;
          return (
            new Date(startDate) <= new Date(booking.end_date) &&
            new Date(endDate) >= new Date(booking.start_date)
          );
        })
      : null;

  const depositAmount = Math.round(totalPrice * 0.3);

  const handleBooking = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      toast({
        title: "Dati mancanti",
        description: "Inserisci nome e email per procedere.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive",
      });
      return;
    }

    if (!startDate || !endDate || days < 1) {
      toast({
        title: "Date non valide",
        description: "Seleziona le date di ritiro e riconsegna.",
        variant: "destructive",
      });
      return;
    }

    if (unavailablePeriod) {
      toast({
        title: "Periodo non disponibile",
        description: `Il veicolo non è disponibile dal ${unavailablePeriod.start_date} al ${unavailablePeriod.end_date}.`,
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Condizioni non accettate",
        description: "Devi accettare le condizioni generali di noleggio.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addBooking({
        camper_id: vehicle.dbId || vehicle.id,
        camper_name: vehicle.name,
        customer_name: customerName.trim().slice(0, 200),
        customer_email: customerEmail.trim().slice(0, 255).toLowerCase(),
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        phone: customerPhone.trim() || null,
        terms_accepted_at: new Date().toISOString(),
        payment_type: paymentType,
      });

      if ("error" in result) {
        toast({
          title: "Errore",
          description: "Non è stato possibile inviare la prenotazione. Riprova.",
          variant: "destructive",
        });
      } else if ("booking_id" in result) {
        toast({
          title: "Prenotazione registrata ✅",
          description: "Reindirizzamento al pagamento...",
        });

        const { data, error } = await supabase.functions.invoke("create-checkout", {
          body: { booking_id: result.booking_id, payment_type: paymentType },
        });

        if (error || !data?.url) {
          toast({
            title: "Errore pagamento",
            description: "Non è stato possibile avviare il pagamento. Ti contatteremo.",
            variant: "destructive",
          });
        } else {
          window.location.href = data.url;
        }
      }
    } catch {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/veicoli" className="hover:text-foreground transition-colors">
              Veicoli
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{vehicle.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div
                className="rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={vehicle.images?.[selectedImage] ?? vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-[400px] md:h-[500px] object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {vehicle.images && vehicle.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${vehicle.name} ${idx + 1}`}
                        className="w-20 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {vehicle.typeLabel}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    {vehicle.location}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground text-display mb-4">
                  {vehicle.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {vehicle.description}
                </p>
              </div>

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

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Dotazioni</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-5">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">a partire da</p>
                  <p className="text-3xl font-bold text-foreground">
                    €{getMinPrice(vehicle)}
                    <span className="text-base font-normal text-muted-foreground">
                      /giorno
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Nome e Cognome
                    </Label>
                    <Input
                      type="text"
                      placeholder="Mario Rossi"
                      className="mt-1 rounded-xl"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                      type="email"
                      placeholder="mario@esempio.it"
                      className="mt-1 rounded-xl"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Telefono
                    </Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="+39 333 1234567"
                        className="pl-10 rounded-xl"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        maxLength={30}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Data Ritiro
                    </Label>
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
                    <Label className="text-sm font-medium text-foreground">
                      Data Riconsegna
                    </Label>
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
                      <span className="text-muted-foreground">
                        ~€{avgPricePerDay} × {days} giorni
                      </span>
                      <span className="text-foreground font-medium">€{totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                      <span className="text-foreground">Totale</span>
                      <span className="text-primary">€{totalPrice}</span>
                    </div>
                  </div>
                )}

                {unavailablePeriod && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-sm text-destructive">
                    <p className="font-medium">⚠️ Veicolo non disponibile</p>
                    <p>
                      Dal {unavailablePeriod.start_date} al {unavailablePeriod.end_date}
                    </p>
                  </div>
                )}

                {days > 0 && !unavailablePeriod && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Modalità di pagamento
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentType("deposit")}
                        className={`rounded-xl border p-3 text-center text-sm transition-all ${
                          paymentType === "deposit"
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold">Caparra 30%</p>
                        <p className="text-xs mt-1">€{depositAmount}</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentType("full")}
                        className={`rounded-xl border p-3 text-center text-sm transition-all ${
                          paymentType === "full"
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold">Totale</p>
                        <p className="text-xs mt-1">€{totalPrice}</p>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    className="mt-0.5"
                  />
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    Dichiaro di aver letto e accettato le{" "}
                    <Link
                      to="/condizioni-noleggio"
                      target="_blank"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Condizioni Generali di Noleggio
                    </Link>
                    .
                  </div>
                </div>
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full text-base py-6"
                  onClick={handleBooking}
                  disabled={!!unavailablePeriod || isSubmitting || !termsAccepted}
                >
                  {isSubmitting ? "Invio in corso..." : "Prenota e Paga"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Verrai reindirizzato a Stripe per il pagamento sicuro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-black/95 overflow-hidden">
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <img
              src={vehicle.images?.[selectedImage] ?? vehicle.image}
              alt={vehicle.name}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {vehicle.images && vehicle.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) => (prev - 1 + vehicle.images!.length) % vehicle.images!.length
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={() =>
                    setSelectedImage((prev) => (prev + 1) % vehicle.images!.length)
                  }
                  className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedImage + 1} / {vehicle.images?.length ?? 1}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
