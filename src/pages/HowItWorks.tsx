import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, CalendarCheck, Key, Compass, ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Scegli il Camper",
    description: "Esplora la nostra flotta e trova il veicolo perfetto per le tue esigenze. Filtra per tipo, capacità e budget.",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Prenota le Date",
    description: "Seleziona le date di ritiro e riconsegna. Riceverai una conferma entro 24 ore con tutti i dettagli.",
  },
  {
    icon: Key,
    number: "03",
    title: "Ritira il Veicolo",
    description: "Vieni a ritirare il camper presso il rimessaggio in zona Ardeatina, a Roma. Ti forniremo un briefing completo sul veicolo.",
  },
  {
    icon: Compass,
    number: "04",
    title: "Parti all'Avventura",
    description: "Goditi il viaggio! Con assistenza e assicurazione completi, puoi concentrarti solo sul divertimento.",
  },
];

const faqs = [
  {
    question: "Che patente serve per guidare un camper?",
    answer: "Per i nostri veicoli fino a 3.5 tonnellate è sufficiente la patente B.",
  },
  {
    question: "L'assicurazione è inclusa nel prezzo?",
    answer: "Sì, tutti i nostri noleggi includono assicurazione RCA, kasko con franchigia e assistenza stradale 24/7.",
  },
  {
    question: "Qual è l'età minima per noleggiare?",
    answer: "L'età minima è 26 anni con almeno 2 anni di patente.",
  },
  {
    question: "Posso viaggiare all'estero?",
    answer: "Sì, puoi viaggiare in tutti i paesi dell'Unione Europea. Per viaggi extra-UE, contattaci in anticipo per verificare la copertura assicurativa.",
  },
  {
    question: "Come funziona la riconsegna?",
    answer: "Il veicolo deve essere riconsegnato con il serbatoio pieno e pulito internamente. La riconsegna avviene presso la stessa sede di ritiro.",
  },
  {
    question: "Cosa succede in caso di guasto?",
    answer: "Hai a disposizione l'assistenza fornita dalle nostre compagnie assicurative, attiva 24/7.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <p className="text-minimal text-primary mb-3">Semplice e Veloce</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-display mb-6">
            Come Funziona
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Noleggiare un camper con noi è semplice. Quattro passi e sei pronto a partire.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative space-y-4">
                <span className="text-6xl font-bold text-primary/10 text-display">{step.number}</span>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-display mb-4">
              Domande Frequenti
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-display mb-6">
            Pronto a Partire?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Esplora la nostra flotta e trova il camper perfetto per il tuo prossimo viaggio.
          </p>
          <Link to="/veicoli">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8">
              Esplora i Veicoli <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
