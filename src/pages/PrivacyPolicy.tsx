import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground text-display mb-8">Informativa sulla Privacy</h1>
          <p className="text-muted-foreground mb-6 text-sm">Ultimo aggiornamento: 12 febbraio 2026</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Titolare del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il Titolare del trattamento dei dati personali è <strong className="text-foreground">Camperok S.r.l.</strong>, con sede legale in Via Ardeatina 802, Roma, Italia.
                Per qualsiasi richiesta relativa alla privacy è possibile contattarci all'indirizzo e-mail: <a href="mailto:privacy@camperok.it" className="text-primary hover:underline">privacy@camperok.it</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Dati Raccolti</h2>
              <p className="text-muted-foreground leading-relaxed">Raccogliamo le seguenti categorie di dati personali:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Dati identificativi:</strong> nome, cognome, indirizzo e-mail</li>
                <li><strong className="text-foreground">Dati di prenotazione:</strong> date di noleggio, veicolo selezionato, importo totale</li>
                <li><strong className="text-foreground">Dati tecnici:</strong> indirizzo IP, tipo di browser, sistema operativo, dati di navigazione</li>
                <li><strong className="text-foreground">Dati di comunicazione:</strong> messaggi inviati tramite il modulo di contatto</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Finalità del Trattamento</h2>
              <p className="text-muted-foreground leading-relaxed">I dati personali vengono trattati per le seguenti finalità:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Gestione delle prenotazioni:</strong> elaborazione e conferma dei noleggi</li>
                <li><strong className="text-foreground">Comunicazione con il cliente:</strong> invio di conferme, aggiornamenti e assistenza</li>
                <li><strong className="text-foreground">Obblighi legali:</strong> adempimenti fiscali e normativi</li>
                <li><strong className="text-foreground">Miglioramento del servizio:</strong> analisi aggregate e anonime per migliorare l'esperienza utente</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Base Giuridica</h2>
              <p className="text-muted-foreground leading-relaxed">Il trattamento dei dati si basa su:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Esecuzione del contratto</strong> (Art. 6(1)(b) GDPR): necessario per gestire le prenotazioni</li>
                <li><strong className="text-foreground">Legittimo interesse</strong> (Art. 6(1)(f) GDPR): miglioramento del servizio e sicurezza della piattaforma</li>
                <li><strong className="text-foreground">Consenso</strong> (Art. 6(1)(a) GDPR): per cookie non essenziali e comunicazioni di marketing</li>
                <li><strong className="text-foreground">Obbligo legale</strong> (Art. 6(1)(c) GDPR): adempimenti fiscali e normativi</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Periodo di Conservazione</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati personali vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Dati di prenotazione:</strong> 10 anni dalla data del noleggio (obblighi fiscali)</li>
                <li><strong className="text-foreground">Dati di contatto:</strong> 24 mesi dall'ultima interazione</li>
                <li><strong className="text-foreground">Dati tecnici (log):</strong> 12 mesi</li>
                <li><strong className="text-foreground">Dati di consenso cookie:</strong> 12 mesi dalla raccolta del consenso</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Diritti dell'Interessato</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ai sensi degli articoli 15-22 del GDPR, l'interessato ha il diritto di:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Accesso:</strong> ottenere conferma dell'esistenza di un trattamento e accedere ai propri dati</li>
                <li><strong className="text-foreground">Rettifica:</strong> ottenere la correzione dei dati inesatti</li>
                <li><strong className="text-foreground">Cancellazione:</strong> ottenere la cancellazione dei propri dati ("diritto all'oblio")</li>
                <li><strong className="text-foreground">Portabilità:</strong> ricevere i propri dati in formato strutturato e leggibile da dispositivo automatico</li>
                <li><strong className="text-foreground">Opposizione:</strong> opporsi al trattamento per motivi legittimi</li>
                <li><strong className="text-foreground">Limitazione:</strong> ottenere la limitazione del trattamento</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Per esercitare i propri diritti, scrivere a: <a href="mailto:privacy@camperok.it" className="text-primary hover:underline">privacy@camperok.it</a>.
                L'interessato ha inoltre il diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Trasferimento dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati possono essere trasferiti verso paesi al di fuori dell'UE/SEE solo in presenza di garanzie adeguate (decisioni di adeguatezza della Commissione Europea o clausole contrattuali standard).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. Sicurezza dei Dati</h2>
              <p className="text-muted-foreground leading-relaxed">
                Adottiamo misure tecniche e organizzative appropriate per proteggere i dati personali da accessi non autorizzati, perdita, distruzione o alterazione, inclusa la crittografia dei dati in transito e a riposo.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
