import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RentalTerms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-display mb-10">
            Condizioni Generali di Noleggio
          </h1>

          <div className="prose prose-sm md:prose-base max-w-none text-foreground/90 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 1 – Oggetto del contratto</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  Il noleggio dei veicoli effettuato dalla S.r.l. Camperok ("Società") è regolato:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>dalle presenti condizioni generali di noleggio ("Condizioni Generali di Noleggio"), comprensive dell'Informativa sulla Privacy;</li>
                    <li>dalla richiesta di prenotazione (la "Richiesta di prenotazione") e dalla conferma della prenotazione (la "Conferma della prenotazione");</li>
                    <li>dalla lettera di noleggio (in seguito "Lettera di Noleggio") sottoscritta dal cliente ("Cliente") al momento del noleggio di un veicolo (di seguito, il "Veicolo") nella quale sono tra, l'altro, indicati i dati anagrafici del Cliente, la durata del noleggio (la data e ora di inizio noleggio e la data e ora di fine noleggio – il "Periodo di noleggio"), i soggetti autorizzati alla guida del Veicolo ("Soggetti autorizzati alla guida del Veicolo"), il riepilogo degli importi dovuti per il Noleggio del Veicolo, comprensivo degli oneri fiscali, gli oneri di viaggio, gli oneri assicurativi ed ogni altro costo, oltre il deposito cauzionale (il "Deposito cauzionale");</li>
                    <li>dalla scheda d'ispezione sottoscritta dal Cliente al momento del ritiro del Veicolo (la "Scheda di ispezione");</li>
                    <li>dal Tariffario vigente al momento della sottoscrizione della Lettera di Noleggio presente online sul sito della Società (https://camperok.it/).</li>
                  </ul>
                </li>
                <li>Il Cliente dichiara di aver visionato tutti i suddetti documenti (nel prosieguo la "Documentazione negoziale") e di averne avuto piena e completa conoscenza.</li>
                <li>
                  Il Cliente, sottoscrivendo la Lettera di Noleggio, dichiara di aver preso conoscenza e di accettare le presenti Condizioni Generali di Noleggio e di approvare specificamente i seguenti articoli:
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Art. 2 (Requisiti di accesso al noleggio e rifiuto alla conclusione del contratto)</li>
                    <li>Art. 2.3 (Clausola risolutiva espressa)</li>
                    <li>Art. 3 (Modalità di prenotazione del Veicolo e pagamento della Caparra)</li>
                    <li>Art. 3.4 (Termine di pagamento della caparra)</li>
                    <li>Art. 3.5 (Mancato versamento della Caparra entro il termine previsto)</li>
                    <li>Art. 3.5 (Versamento della Caparra dopo il termine previsto)</li>
                    <li>Art. 3.7 (Modalità di pagamento della Caparra)</li>
                    <li>Art. 4.1 (Recesso gratuito del Cliente)</li>
                    <li>Art. 4.2 (Recesso del Cliente con perdita della Caparra)</li>
                    <li>Art. 4.3 (Recesso del Cliente e pagamento dell'intero Costo del noleggio)</li>
                    <li>Art. 4.4 (Limiti alla richiesta di modifica della prenotazione)</li>
                    <li>Art. 5.1 (Modalità di pagamento del Costo del noleggio e del Deposito cauzionale)</li>
                    <li>Art. 5.2 (Termini di pagamento del Costo del noleggio e del Deposito Cauzionale)</li>
                    <li>Art. 5.3 (Tardivo od omesso pagamento del Costo del noleggio)</li>
                    <li>Art. 6.2 (Presentazione del Cliente oltre il termine previsto)</li>
                    <li>Art. 6.3 (Autorizzazione all'uso del Deposito cauzionale)</li>
                    <li>Art. 6.3 (Tempi e modalità di restituzione del Deposito cauzionale)</li>
                    <li>Art. 7.2 (Restituzione anticipata del Veicolo)</li>
                    <li>Art. 7.3 (Penale per ritardata restituzione del Veicolo)</li>
                    <li>Art. 7.7 (Addebito di danno per restituzione in luogo diverso)</li>
                    <li>Art. 7.8 (Penale in caso di mancato rifornimento)</li>
                    <li>Art. 7.9 (Penale per riconsegna non conforme)</li>
                    <li>Art. 7.10 (Esonero di responsabilità per oggetti lasciati nel Veicolo)</li>
                    <li>Art. 9 (Limitazioni di responsabilità della Società)</li>
                    <li>Art. 10 (Obblighi del Cliente)</li>
                    <li>Art. 11 (Danni, furto, incendio, sinistri stradali)</li>
                    <li>Art. 12 (Manutenzione e guasti meccanici)</li>
                    <li>Art. 13 (Fermo del Veicolo – Penale)</li>
                    <li>Art. 14 (Esonero di Responsabilità della Società)</li>
                    <li>Art. 15 (Risoluzione del contratto)</li>
                    <li>Art. 16 (Legge applicabile e Foro esclusivo)</li>
                    <li>Art. 18 (Modifiche contrattuali)</li>
                    <li>Art. 19 (Traduzione)</li>
                    <li>Art. 20 (Domicilio e comunicazioni)</li>
                  </ul>
                </li>
                <li>Il presente noleggio non ha natura turistica, non ha ad oggetto pacchetti o servizi turistici, né ha ad oggetto la realizzazione di un viaggio o di una vacanza, con la conseguenza che la Società declina ogni responsabilità derivante dalla mancata realizzazione di un viaggio o di una vacanza.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 2 – Requisiti di accesso al noleggio</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Sia il Cliente che ogni Soggetto autorizzato alla guida del Veicolo individuato nella Lettera di Noleggio, devono identificarsi fornendo alla Società la copia di un documento d'identità (carta di identità o passaporto) non scaduto avente una validità residua tale da coprire tutta la durata del noleggio, maggiorata di 30 giorni. A tal fine, il Cliente e ogni soggetto autorizzato alla guida del Veicolo si impegnano a non fornire informazioni false o errate relativamente alle proprie generalità, età, indirizzo di residenza ovvero di domicilio, numero di telefono ed indirizzo di posta elettronica, nonché circa il possesso di tutti i requisiti di Legge per l'abilitazione alla guida.</li>
                <li>
                  Per poter concludere un contratto di noleggio con la Società e per poter condurre il Veicolo il Cliente e ogni Soggetto autorizzato alla guida del Veicolo dovranno:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>avere al momento della conclusione del contratto un'età non inferiore a 26 anni e non superiore a 75 anni;</li>
                    <li>(per i cittadini residenti nella U.E.) fornire copia di una patente di guida, non revocata, sospesa o scaduta, rilasciata da un Paese UE/EFTA che lo abiliti a condurre il Veicolo, emessa da almeno 12 mesi e con validità residua tale da coprire tutta la durata del noleggio maggiorata di 30 giorni;</li>
                    <li>(per i cittadini residenti extra-UE) fornire copia della patente di guida conseguita nel proprio Paese di provenienza emessa da almeno 12 mesi nonché copia della patente per uso internazionale;</li>
                    <li>fornire copia di un documento d'identità come previsto al precedente art. 2.1;</li>
                    <li>disporre di un conto corrente bancario ai fini del versamento del Costo del noleggio, della Caparra e del Deposito cauzionale.</li>
                  </ul>
                </li>
                <li>La mancanza di uno solo dei requisiti indicati agli artt. 2.1 e 2.2 comporterà la facoltà della Società in ogni momento di rifiutare la conclusione del Contratto di noleggio ovvero qualora concluso la sua immediata risoluzione ai sensi e per gli effetti di cui all'art. 1456 codice civile ("Clausola risolutiva espressa").</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 3 – Modalità di prenotazione del Veicolo e pagamento della caparra</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Le prenotazioni del Veicolo dovranno essere effettuate dal Cliente mediante accesso al sito internet della Società https://camperok.it/ previa indicazione nell'apposito form delle proprie generalità, dell'indirizzo e-mail, del recapito telefonico, del numero di partecipanti e del Periodo di noleggio che, in nessun caso, e fatto salvo diverso accordo scritto con la Società, potrà essere superiore a 30 giorni.</li>
                <li>La Società riscontrerà la richiesta di prenotazione del Cliente ai recapiti forniti, precisando se nel Periodo di noleggio indicato esiste la disponibilità di un Veicolo e, contestualmente, indicherà il tipo di Veicolo, gli eventuali accessori, i servizi extra richiesti, gli importi dovuti per l'intero Periodo di noleggio (il "Costo del noleggio"), quelli dovuti a titolo di caparra confirmatoria (in seguito la "Caparra") e per il deposito cauzionale (il "Deposito cauzionale").</li>
                <li>La Richiesta di prenotazione per il Periodo di noleggio sarà confermata da parte della Società con l'invio della Conferma della prenotazione, solo a seguito del pagamento da parte del Cliente della Caparra entro il termine indicato dalla Società nella Richiesta di prenotazione ("Termine di pagamento della caparra") e dell'invio della documentazione prevista dall'art. 2.</li>
                <li>Il Termine di pagamento della caparra si intenderà rispettato da parte del Cliente allorquando le somme dovute saranno accreditate a favore della Società entro le ore 23.59 dell'ultimo giorno utile indicato nella Richiesta di prenotazione.</li>
                <li>Qualora il Cliente non effettui il versamento nel Termine di pagamento della caparra, la richiesta prenotazione si intenderà automaticamente decaduta senza necessità di invio di ulteriori comunicazioni da parte della Società che sarà libera di noleggiare a terzi il Veicolo indicato al Cliente in fase di Richiesta di prenotazione.</li>
                <li>Qualora il Cliente effettui il versamento dopo il Termine di pagamento della Caparra, la Società sarà comunque libera, a sua insindacabile scelta, di restituire al Cliente, nel termine di quindici (15) giorni, la somma tardivamente corrisposta a titolo di Caparra, al netto di eventuali oneri bancari, ovvero di inviare al Cliente, entro i tre (3) giorni successivi al tardivo versamento, la Conferma della prenotazione con incameramento della Caparra.</li>
                <li>Il pagamento della Caparra dovrà essere effettuato dal Cliente mediante bonifico bancario. Non sono accettati altri mezzi di pagamento quali ad esempio contanti o carte di credito o debito.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 4 – Termini, condizioni e modalità di recesso dalla prenotazione</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Il Cliente, a seguito della Conferma della prenotazione, potrà recedere dal contratto gratuitamente inviando alla Società una e-mail all'indirizzo info@camperok.it entro e non oltre le ore 23.59 del trentesimo giorno solare antecedente all'inizio del Periodo di noleggio. La Società, in tal caso, provvederà a restituire al Cliente, entro i quindici (15) giorni successivi, la somma ricevuta a titolo di Caparra, al netto di eventuali oneri bancari.</li>
                <li>Qualora il Cliente manifestasse la volontà di recedere dal contratto nel lasso di tempo intercorrente tra le ore 23.59 del ventinovesimo giorno solare antecedente all'inizio del Periodo di noleggio e le ore 23.59 del quindicesimo giorno solare antecedente all'inizio del Periodo di noleggio, la Società avrà unicamente diritto a trattenere la Caparra versata dal Cliente senza addebito di ulteriori costi.</li>
                <li>Nel caso in cui il Cliente manifestasse la volontà di recedere dal contratto successivamente alle ore 23.59 del quattordicesimo giorno solare antecedente all'inizio del Periodo di noleggio, fermo il diritto della Società di trattenere la Caparra, lo stesso sarà tenuto al pagamento dell'intero Costo del noleggio qualora non riuscisse per qualsiasi ragione a noleggiarlo a terzi.</li>
                <li>Eventuali richieste del Cliente volte ad ottenere una richiesta di modifica della prenotazione potranno essere valutate da parte della Società nei limiti delle effettive disponibilità dei propri Veicoli, senza che al Cliente sia riconosciuto alcun diritto al cambio di prenotazione. In nessun caso sono ammesse richieste di modifica del Periodo di noleggio che comportino la disponibilità del Veicolo per periodi superiori a 30 giorni.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 5 – Pagamento del noleggio e del deposito cauzionale</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Il Cliente dovrà effettuare il pagamento del Costo del noleggio e del Deposito cauzionale al più tardi entro le ore 23.59 del quattordicesimo giorno solare antecedente all'inizio del Periodo di noleggio mediante bonifico bancario alle coordinate IBAN indicate nella Conferma della prenotazione dalla Società.</li>
                <li>I Termini di pagamento del Costo del noleggio e del Deposito cauzionale si intenderanno rispettati da parte del Cliente allorquando le somme dovute saranno accreditate a favore della Società entro le ore 23.59 dell'ultimo giorno utile indicato.</li>
                <li>In caso di tardivo od omesso pagamento del Costo del noleggio e/o del Deposito cauzionale, il contratto si intenderà risolto e la Società avrà diritto a ritenere la Caparra versata e ad ottenere il pagamento del Costo dell'intero noleggio qualora non riuscisse per qualsiasi ragione a noleggiarlo a terzi.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 6 – Sottoscrizione della lettera di noleggio e della scheda d'ispezione – Consegna del veicolo</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Il Cliente dovrà presentarsi presso i locali della Società nel giorno e nell'orario indicato nella Conferma della prenotazione per il ritiro del Veicolo, con una tolleranza massima di due (2) ore.</li>
                <li>Qualora il Cliente si presenti oltre il suddetto orario o non si presenti affatto (no show), la Società non sarà più tenuta alla consegna del Veicolo e il contratto si intenderà risolto ai sensi e per gli effetti di cui all'art. 1457 codice civile.</li>
                <li>All'atto della consegna del Veicolo, il Cliente provvederà alla sottoscrizione della Lettera di Noleggio, autorizzando la Società ad utilizzare il Deposito Cauzionale nel caso in cui alla riconsegna venissero riscontrati danni. Il Deposito cauzionale sarà restituito al Cliente entro 15 giorni lavorativi dalla data di riconsegna, al netto delle somme eventualmente trattenute.</li>
                <li>Al momento del ritiro del Veicolo, il Cliente sottoscriverà la Scheda di ispezione, dichiarando di aver ispezionato il Veicolo, la dotazione di bordo e gli accessori, di aver riscontrato la conformità del Veicolo a quanto pattuito contrattualmente, e di aver verificato che il Veicolo è interamente rifornito di carburante.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 7 – Durata del noleggio e riconsegna del Veicolo – Penali</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>La durata del noleggio è quella pattuita tra le Parti al momento dell'invio della Conferma della prenotazione.</li>
                <li>Nessuna pretesa di riduzione del Costo del noleggio potrà essere avanzata dal Cliente in caso di riconsegna anticipata non concordata per iscritto.</li>
                <li>Salvo diverso accordo scritto, il Periodo di noleggio non potrà essere prolungato.</li>
                <li>In caso di ritardata riconsegna non concordata, la Società addebiterà al Cliente un importo pari al quadruplo della tariffa giornaliera applicata, per ciascun giorno di ritardo.</li>
                <li>Il Cliente dovrà riconsegnare il Veicolo nel luogo indicato nella Lettera di noleggio.</li>
                <li>Il Cliente sarà responsabile per i danni riscontrati all'atto della riconsegna e non risultanti dalla Scheda di ispezione.</li>
                <li>Qualora il Cliente non riconsegnasse il Veicolo nel luogo indicato, dovrà darne tempestivo avviso alla Società.</li>
                <li>
                  Qualora il Cliente dovesse riconsegnare il veicolo non integralmente rifornito di carburante saranno applicati i seguenti importi:
                  <div className="overflow-x-auto mt-2">
                    <table className="min-w-[300px] border border-border text-sm">
                      <thead>
                        <tr className="bg-secondary">
                          <th className="border border-border px-4 py-2 text-left">Serbatoio carburante</th>
                          <th className="border border-border px-4 py-2 text-right">€</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Capienza rilevata &gt;4/4</td><td className="border border-border px-4 py-2 text-right">50</td></tr>
                        <tr><td className="border border-border px-4 py-2">Capienza rilevata ≤3/4</td><td className="border border-border px-4 py-2 text-right">80</td></tr>
                        <tr><td className="border border-border px-4 py-2">Capienza rilevata ≤2/4</td><td className="border border-border px-4 py-2 text-right">120</td></tr>
                        <tr><td className="border border-border px-4 py-2">Capienza rilevata ≤1/4</td><td className="border border-border px-4 py-2 text-right">150</td></tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li>Qualora il Cliente non riconsegnasse il Veicolo in buone condizioni igieniche e di pulizia, la Società provvederà alle operazioni di pulizia e/o ripristino, addebitando le spese al Cliente.</li>
                <li>Tutti gli oggetti lasciati all'interno del Veicolo dopo la riconsegna si intendono abbandonati e la Società viene esonerata da ogni obbligo di custodia e restituzione.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 8 – Coperture assicurative</h2>
              <p>Tutti i Veicoli della Società sono coperti da idonea R.C.A. a norma delle vigenti leggi, la quale garantisce la copertura della Responsabilità Civile nei confronti di terzi con riferimento a persone (ivi inclusi i terzi trasportati), cose (escluse quelle trasportate) ed animali.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 9 – Obblighi della Società e limitazione di responsabilità</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>La Società si impegna a mettere a disposizione del Cliente il Veicolo alla data concordata. In caso di indisponibilità per fatti non imputabili alla Società, potrà proporre un altro periodo di noleggio di pari costo. Il Cliente potrà accettare o rifiutare, esigendo il rimborso della caparra.</li>
                <li>Non configura inadempienza un ritardo di massimo 48 ore nella consegna per cause di forza maggiore.</li>
                <li>
                  I servizi inclusi nel noleggio sono:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>noleggio con chilometraggio illimitato;</li>
                    <li>coperture assicurative;</li>
                    <li>servizio di assistenza stradale;</li>
                    <li>olio, manutenzione e riparazione di guasti meccanici non imputabili al Cliente.</li>
                  </ul>
                </li>
                <li>
                  Non sono inclusi:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>rifornimento di carburante;</li>
                    <li>pulizia finale con svuotamento serbatoi;</li>
                    <li>danni imputabili al Cliente;</li>
                    <li>coperture assicurative non specificate;</li>
                    <li>assistenza stradale fuori condizioni contrattuali.</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 10 – Obblighi del Cliente</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  Il Cliente si obbliga a:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>condurre il Veicolo diligentemente e nel rispetto delle norme di legge;</li>
                    <li>curare la manutenzione ordinaria e il controllo dei livelli;</li>
                    <li>rifornire il Veicolo con il carburante corretto;</li>
                    <li>informare immediatamente la Società di guasti o anomalie;</li>
                    <li>osservare le istruzioni del manuale operativo;</li>
                    <li>custodire il Veicolo con la massima diligenza;</li>
                    <li>pagare immediatamente qualsiasi multa o sanzione;</li>
                    <li>non fumare all'interno del Veicolo.</li>
                  </ul>
                </li>
                <li>Il Cliente sarà responsabile per i danni conseguenti alla violazione delle norme di condotta.</li>
                <li>Il Cliente dichiara di conoscere le norme assicurative e del codice della strada.</li>
                <li>Il Cliente si obbliga ad utilizzare il Veicolo nel rispetto del documento di circolazione.</li>
                <li>
                  Il Veicolo non potrà essere:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>destinato al trasporto per conto di terzi;</li>
                    <li>utilizzato in sovraccarico;</li>
                    <li>utilizzato per trasporto di animali o sostanze dannose;</li>
                    <li>utilizzato in aree vietate alla circolazione;</li>
                    <li>impiegato per traino non autorizzato;</li>
                    <li>condotto a velocità superiori a 90 Km/h;</li>
                    <li>condotto fuori strada;</li>
                    <li>utilizzato per gare sportive;</li>
                    <li>utilizzato per trasporti illegali;</li>
                    <li>sub-locato o dato in comodato;</li>
                    <li>guidato sotto l'influenza di droghe o alcolici;</li>
                    <li>guidato da persone non autorizzate.</li>
                  </ul>
                </li>
                <li>L'utilizzo in violazione delle disposizioni comporterà la piena responsabilità del Cliente.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 11 – Danni, furto, incendio, sinistri stradali</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>In caso di danni al Veicolo, la Società sarà legittimata a trattenere il Deposito cauzionale fino al risarcimento assicurativo.</li>
                <li>Le Parti convengono che, laddove durante il noleggio dovessero rendersi necessari interventi di manutenzione ordinaria, il Cliente potrà chiedere assistenza telefonica gratuita alla Società.</li>
                <li>La Società sarà autorizzata a trattenere gli importi dovuti dal Deposito cauzionale.</li>
                <li>In caso di furto o incendio, il Cliente si obbliga a comunicarlo entro 24 ore e a denunciare l'accaduto alle autorità competenti.</li>
                <li>
                  In caso di sinistro stradale, il Cliente si obbliga a:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>informare la Società immediatamente, e comunque non oltre 12 ore;</li>
                    <li>compilare il modello di Constatazione Amichevole;</li>
                    <li>non sottoscrivere documenti senza autorizzazione della Società;</li>
                    <li>informare l'autorità di polizia;</li>
                    <li>prendere nota dei dati delle parti coinvolte e dei testimoni;</li>
                    <li>seguire le istruzioni della Società.</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 12 – Manutenzione e guasti meccanici</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Per interventi di manutenzione ordinaria, il Cliente potrà chiedere assistenza telefonica gratuita alla Società. Se l'intervento è causato dal Cliente, l'importo sarà a suo carico.</li>
                <li>In caso di guasti, il Cliente dovrà immediatamente (entro 12 ore) avvisare la Società e rivolgersi alle officine autorizzate.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 13 – Fermo del Veicolo – Penale</h2>
              <p>Qualora durante il noleggio il Veicolo fosse sottoposto a fermo amministrativo o sequestro per fatto addebitabile al Cliente, questi dovrà corrispondere alla Società un importo pari al quadruplo della tariffa giornaliera per ciascun giorno fino al dissequestro, oltre alle spese necessarie.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 14 – Esonero di Responsabilità della Società</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>La Società sarà esonerata da responsabilità per eventuali carenze o guasti non rilevati nella Scheda di ispezione e non dovuti a colpa grave.</li>
                <li>La Società sarà esonerata da responsabilità per eventi verificatisi dopo la consegna che rendessero impossibile l'utilizzo del Veicolo (danni, guasti, calamità naturali, scioperi, furto, incendio, etc.).</li>
                <li>In tali ipotesi il Cliente, ove responsabile, sarà tenuto al pagamento dell'intero corrispettivo per i giorni di effettivo utilizzo.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 15 – Risoluzione del contratto</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>La violazione degli articoli 2, 5.3 e 6.2 comporterà l'immediata risoluzione del contratto, fermo il diritto della Società di ritenere la Caparra e ottenere il Costo dell'intero noleggio.</li>
                <li>La violazione degli articoli 2 e 11.4 legittima la Società alla risoluzione ai sensi dell'art. 1456 cod. civ.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 16 – Legge applicabile e foro competente</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Il presente contratto è disciplinato dalla Legge Italiana.</li>
                <li>Per qualunque controversia sarà esclusivamente competente il Foro di Roma, salvo il caso in cui il Cliente sia un consumatore.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 17 – Trattamento dati Cliente</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>Ai sensi del D.Lgs. n. 196/2003 e dell'art. 13 Reg. UE 679/2016, i dati personali saranno inseriti e conservati negli archivi della Società, utilizzati per l'adempimento degli obblighi contrattuali e per gli adempimenti di legge.</li>
                <li>Il trattamento avverrà con modalità idonee a garantire la riservatezza e la sicurezza.</li>
                <li>Il Cliente acconsente al trasferimento dei dati alle aziende fornitrici della Società.</li>
                <li>Il conferimento dei dati è necessario alla conclusione del contratto.</li>
                <li>Il Cliente potrà esercitare il diritto di conoscenza, cancellazione, rettifica e opposizione al trattamento.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 18 – Modifiche contrattuali</h2>
              <p>Nessuna modifica può essere apportata al Contratto di noleggio senza il consenso scritto della Società.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 19 – Traduzione</h2>
              <ol className="list-decimal pl-5 space-y-3">
                <li>La Società si riserva di pubblicare traduzioni in altre lingue delle presenti condizioni.</li>
                <li>In caso di differenze di interpretazione, la versione in lingua italiana prevale.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Art. 20 – Domicilio e comunicazioni</h2>
              <p>Il Cliente dichiara di eleggere il proprio domicilio all'indirizzo comunicato alla Società nella Lettera di noleggio. Le comunicazioni avverranno all'indirizzo di posta elettronica indicato dal Cliente.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RentalTerms;
