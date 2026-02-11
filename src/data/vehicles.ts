import knaus1 from "@/assets/knaus-sun-traveller-1.jpg";
import knaus2 from "@/assets/knaus-sun-traveller-2.jpg";
import knaus3 from "@/assets/knaus-sun-traveller-3.jpg";
import knaus4 from "@/assets/knaus-sun-traveller-4.jpg";
import knaus5 from "@/assets/knaus-sun-traveller-5.jpg";

export interface Vehicle {
  id: string;
  name: string;
  type: "van" | "motorhome" | "compact" | "premium";
  typeLabel: string;
  image: string;
  images?: string[];
  pricePerDay: number;
  capacity: number;
  beds: number;
  length: string;
  features: string[];
  description: string;
  shortDescription: string;
  location: string;
  available: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "knaus-sun-traveller",
    name: "Knaus Sun Traveller",
    type: "motorhome",
    typeLabel: "Motorhome",
    image: knaus1,
    images: [knaus1, knaus2, knaus3, knaus4, knaus5],
    pricePerDay: 119,
    capacity: 5,
    beds: 4,
    length: "6.5m",
    features: ["Aria condizionata", "Pannello solare", "Doppio serbatoio acqua", "Porta bici/scooter", "Vetri elettrici", "Specchietti elettrici", "Cucina", "Bagno"],
    description: "Il Knaus Sun Traveller è un camper perfetto per una famiglia con bambini piccoli, molto comodo da guidare, con aria condizionata in cabina, vetri e specchietti elettrici. Ha due serbatoi di acqua e il pannello solare, per un'autonomia maggiore in sosta libera. Completo di porta bici o scooter, sarà un ottimo compagno di viaggio.",
    shortDescription: "Perfetto per famiglie con bambini. Comodo, autonomo e ben accessoriato.",
    location: "Milano",
    available: true,
  },
];

export const vehicleTypes = [
  { value: "all", label: "Tutti" },
  { value: "van", label: "Van" },
  { value: "motorhome", label: "Motorhome" },
  { value: "compact", label: "Compatto" },
  { value: "premium", label: "Premium" },
];
