import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { vehicles, vehicleTypes } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import SEO from "../SEO";

const Vehicles = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [maxPrice, setMaxPrice] = useState(250);
  const [minCapacity, setMinCapacity] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedType !== "all" && v.type !== selectedType) return false;
      if (v.pricePerDay > maxPrice) return false;
      if (v.capacity < minCapacity) return false;
      return true;
    });
  }, [selectedType, maxPrice, minCapacity]);

 return (
  <>
    <SEO
      title="Noleggio Camper Roma | CamperOK"
      canonical="https://www.camperok.it/noleggio-camper-roma"
    />

    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="text-minimal text-primary mb-3">La Nostra Flotta</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-display mb-4">
              Trova il Tuo Camper
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Esplora la nostra flotta e trova il veicolo perfetto per il tuo viaggio.
            </p>
          </div>

          {/* Filter Toggle (Mobile) */}
          <Button
            variant="outline"
            className="md:hidden mb-6 rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtri
          </Button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`w-full md:w-64 shrink-0 space-y-8 ${showFilters ? "block" : "hidden md:block"}`}>
              {/* Type Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">Tipo di Veicolo</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicleTypes.map((type) => (
                    <Button
                      key={type.value}
                      size="sm"
                      variant={selectedType === type.value ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => setSelectedType(type.value)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">
                  Prezzo Max: <span className="text-primary">€{maxPrice}/giorno</span>
                </h3>
                <Slider
                  value={[maxPrice]}
                  onValueChange={(v) => setMaxPrice(v[0])}
                  min={50}
                  max={300}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Capacity Filter */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-sm">
                  Posti Minimi: <span className="text-primary">{minCapacity}</span>
                </h3>
                <Slider
                  value={[minCapacity]}
                  onValueChange={(v) => setMinCapacity(v[0])}
                  min={1}
                  max={6}
                  step={1}
                  className="mt-2"
                />
              </div>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">Nessun veicolo trovato con i filtri selezionati.</p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-full"
                    onClick={() => {
                      setSelectedType("all");
                      setMaxPrice(250);
                      setMinCapacity(1);
                    }}
                  >
                    Resetta Filtri
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     <Footer />
     </div>
     </>
     );
};

export default Vehicles;
