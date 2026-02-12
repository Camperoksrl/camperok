import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const CONSENT_KEY = "camperok-cookie-consent";

const getStoredConsent = (): CookieConsent | null => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveConsent = (consent: CookieConsent) => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
};

/** Block or unblock non-essential scripts based on consent */
const applyConsent = (consent: CookieConsent) => {
  // Analytics scripts would be loaded/blocked here
  if (!consent.analytics) {
    // Remove analytics cookies if consent revoked
    document.cookie.split(";").forEach((c) => {
      const name = c.trim().split("=")[0];
      if (name.startsWith("_ga") || name.startsWith("_gid")) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      setVisible(true);
    } else {
      applyConsent(consent);
    }

    const handleReset = () => {
      setVisible(true);
      setShowCustomize(false);
      setAnalytics(false);
      setMarketing(false);
    };
    window.addEventListener("cookie-consent-reset", handleReset);
    return () => window.removeEventListener("cookie-consent-reset", handleReset);
  }, []);

  const accept = (consent: CookieConsent) => {
    saveConsent(consent);
    applyConsent(consent);
    setVisible(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    accept({ necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() });
  };

  const handleRejectNonEssential = () => {
    accept({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() });
  };

  const handleSavePreferences = () => {
    accept({ necessary: true, analytics, marketing, timestamp: new Date().toISOString() });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="container mx-auto max-w-2xl bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-foreground text-lg">Utilizziamo i Cookie 🍪</h3>
            <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
              Utilizziamo cookie tecnici necessari al funzionamento del sito. Puoi scegliere se accettare anche cookie analitici per migliorare la tua esperienza.{" "}
              <Link to="/cookie-policy" className="text-primary hover:underline" onClick={() => setVisible(false)}>
                Leggi la nostra Politica sui Cookie
              </Link>.
            </p>
          </div>
          <button onClick={handleRejectNonEssential} className="text-muted-foreground hover:text-foreground shrink-0" aria-label="Chiudi">
            <X className="h-5 w-5" />
          </button>
        </div>

        {showCustomize && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Cookie Tecnici</p>
                <p className="text-xs text-muted-foreground">Sempre attivi, necessari al funzionamento</p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Cookie Analitici</p>
                <p className="text-xs text-muted-foreground">Analisi anonima del traffico</p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Cookie di Marketing</p>
                <p className="text-xs text-muted-foreground">Attualmente non in uso</p>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {showCustomize ? (
            <Button onClick={handleSavePreferences} className="rounded-full px-6">
              Salva Preferenze
            </Button>
          ) : (
            <>
              <Button onClick={handleAcceptAll} className="rounded-full px-6">
                Accetta Tutti
              </Button>
              <Button variant="outline" onClick={handleRejectNonEssential} className="rounded-full px-6">
                Rifiuta Non Essenziali
              </Button>
              <Button variant="ghost" onClick={() => setShowCustomize(true)} className="rounded-full px-6">
                Personalizza
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

/** Re-open cookie banner (used from footer) */
export const reopenCookieBanner = () => {
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event("cookie-consent-reset"));
};
