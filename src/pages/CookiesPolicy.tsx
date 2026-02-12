import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground text-display mb-8">Politica sui Cookie</h1>
          <p className="text-muted-foreground mb-6 text-sm">Ultimo aggiornamento: 12 febbraio 2026</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Cosa Sono i Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web.
                Vengono utilizzati per far funzionare il sito, migliorare l'esperienza utente e fornire informazioni ai proprietari del sito.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Tipologie di Cookie Utilizzati</h2>

              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cookie Tecnici (Necessari)</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Essenziali per il funzionamento del sito. Non possono essere disattivati.
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                    <li><strong className="text-foreground">Sessione di autenticazione:</strong> gestione del login utente — Durata: sessione</li>
                    <li><strong className="text-foreground">Preferenze tema:</strong> salvataggio della preferenza chiaro/scuro — Durata: 12 mesi</li>
                    <li><strong className="text-foreground">Consenso cookie:</strong> memorizzazione delle tue preferenze sui cookie — Durata: 12 mesi</li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cookie Analitici</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Ci aiutano a capire come i visitatori interagiscono con il sito, raccogliendo informazioni in forma anonima e aggregata.
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                    <li><strong className="text-foreground">Analisi del traffico:</strong> pagine visitate, durata della visita — Durata: 12 mesi</li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cookie di Marketing</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Attualmente non utilizziamo cookie di marketing. Qualora venissero introdotti in futuro, sarà richiesto un nuovo consenso.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Servizi di Terze Parti</h2>
              <p className="text-muted-foreground leading-relaxed">Il nostro sito utilizza i seguenti servizi di terze parti che possono impostare cookie:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Infrastruttura backend:</strong> per autenticazione e gestione dei dati (cookie tecnici)</li>
                <li><strong className="text-foreground">Servizi di pagamento:</strong> potranno essere integrati in futuro (es. Stripe) per l'elaborazione sicura dei pagamenti</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Durata dei Cookie</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><strong className="text-foreground">Cookie di sessione:</strong> cancellati alla chiusura del browser</li>
                <li><strong className="text-foreground">Cookie persistenti:</strong> conservati per un massimo di 12 mesi dalla data di impostazione</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Come Gestire i Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Puoi modificare le tue preferenze sui cookie in qualsiasi momento cliccando sul pulsante "Gestisci Cookie" presente nel footer del sito.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Inoltre, puoi configurare il tuo browser per bloccare o eliminare i cookie. Di seguito i link alle guide dei principali browser:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Revoca del Consenso</h2>
              <p className="text-muted-foreground leading-relaxed">
                Puoi revocare il consenso ai cookie non essenziali in qualsiasi momento tramite il banner di gestione cookie accessibile dal footer.
                La revoca del consenso non pregiudica la liceità del trattamento basato sul consenso prestato prima della revoca.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Contatti</h2>
              <p className="text-muted-foreground leading-relaxed">
                Per domande sulla nostra politica sui cookie, contattaci a: <a href="mailto:camperokroma@gmail.com" className="text-primary hover:underline">camperokroma@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;
