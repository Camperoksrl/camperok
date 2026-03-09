import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import HowItWorks from "./pages/HowItWorks";
import Contatti from "./pages/Contatti";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import RentalTerms from "./pages/RentalTerms";
import BookingConfirmed from "./pages/BookingConfirmed";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/it" element={<Navigate to="/" replace />} />
<Route path="/it/" element={<Navigate to="/" replace />} />
<Route path="/it/home" element={<Navigate to="/" replace />} />
<Route path="/it/chi-siamo" element={<Navigate to="/" replace />} />

<Route path="/en" element={<Navigate to="/" replace />} />
<Route path="/en/" element={<Navigate to="/" replace />} />
<Route path="/en/noleggio-camper" element={<Navigate to="/veicoli" replace />} />
<Route path="/en/servizi" element={<Navigate to="/come-funziona" replace />} />
<Route path="/en/contatti" element={<Navigate to="/contatti" replace />} />

<Route path="/product-detail" element={<Navigate to="/" replace />} />
<Route path="/en/product-detail" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Index />} />
          <Route path="/noleggio-camper-roma" element={<Vehicles />} />
          <Route path="/veicoli" element={<Navigate to="/noleggio-camper-roma" replace />} /> 
          <Route path="/veicoli/:id" element={<VehicleDetail />} />
          <Route path="/come-funziona" element={<HowItWorks />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiesPolicy />} />
          <Route path="/condizioni-noleggio" element={<RentalTerms />} />
          <Route path="/prenotazione-confermata" element={<BookingConfirmed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
