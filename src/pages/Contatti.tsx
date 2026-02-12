import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contatti = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Messaggio Inviato! ✅",
      description: "Grazie per averci contattato. Ti risponderemo entro 24 ore.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <p className="text-minimal text-primary mb-3">Parlaci</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-display mb-6">
            Contattaci
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Hai domande? Siamo qui per aiutarti a pianificare il viaggio perfetto.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground text-display">Dove Trovarci</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Indirizzo", text: "Via Ardeatina 802, Roma" },
                  { icon: Phone, title: "Telefono", text: "339-2715067" },
                  { icon: Mail, title: "Email", text: "camperokroma@gmail.com" },
                  { icon: Clock, title: "Orari", text: "Lun-Sab: 8:00-19:00 | Dom: 9:00-13:00" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-display">Scrivici</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome e Cognome</Label>
                  <Input id="name" className="rounded-xl mt-1" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" className="rounded-xl mt-1" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="rounded-xl mt-1" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="message">Messaggio</Label>
                <Textarea id="message" className="rounded-xl mt-1 min-h-[120px]" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base">
                Invia Messaggio
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contatti;
