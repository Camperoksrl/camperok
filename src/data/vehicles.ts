import rvVan from "@/assets/rv-van.jpg";
import rvMotorhome from "@/assets/rv-motorhome.jpg";
import rvCompact from "@/assets/rv-compact.jpg";
import rvFamily from "@/assets/rv-family.jpg";
import rvPremium from "@/assets/rv-premium.jpg";
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
    id: "fiat-ducato-van",
    name: "Fiat Ducato Camper Van",
    type: "van",
    typeLabel: "Van",
    image: rvVan,
    pricePerDay: 89,
    capacity: 2,
    beds: 2,
    length: "6.0m",
    features: ["Cucina", "Doccia", "Riscaldamento", "Pannelli solari", "Wi-Fi"],
    description: "Il nostro Fiat Ducato Camper Van è perfetto per coppie che cercano libertà e comfort. Dotato di cucina completa, bagno con doccia, riscaldamento autonomo e pannelli solari per la massima indipendenza. Guidabilità eccellente anche in città grazie alle dimensioni compatte.",
    shortDescription: "Perfetto per coppie avventurose. Compatto ma completo di tutto.",
    location: "Milano",
    available: true,
  },
  {
    id: "laika-ecovip",
    name: "Laika Ecovip Motorhome",
    type: "motorhome",
    typeLabel: "Motorhome",
    image: rvMotorhome,
    pricePerDay: 149,
    capacity: 4,
    beds: 4,
    length: "7.5m",
    features: ["Cucina XL", "Bagno separato", "TV", "Garage", "Aria condizionata", "Biciclette"],
    description: "Il Laika Ecovip è il motorhome ideale per famiglie e gruppi. Spazioso e confortevole, offre una zona giorno luminosa, cucina completa, bagno separato e un garage posteriore per biciclette e attrezzatura. Aria condizionata e TV per il massimo comfort.",
    shortDescription: "Spazioso motorhome per famiglie. Comfort di casa su ruote.",
    location: "Roma",
    available: true,
  },
  {
    id: "westfalia-columbus",
    name: "Westfalia Columbus Compact",
    type: "compact",
    typeLabel: "Compatto",
    image: rvCompact,
    pricePerDay: 69,
    capacity: 2,
    beds: 2,
    length: "5.4m",
    features: ["Tetto a soffietto", "Cucina", "Riscaldamento", "Parcheggio facile"],
    description: "Il Westfalia Columbus è il compagno ideale per chi ama l'avventura senza rinunciare alla praticità. Il tetto a soffietto offre spazio extra per dormire, mentre le dimensioni compatte permettono di parcheggiare ovunque. Perfetto per esplorare borghi e strade secondarie.",
    shortDescription: "Compatto e agile. Ideale per esplorare borghi italiani.",
    location: "Firenze",
    available: true,
  },
  {
    id: "elnagh-baron-family",
    name: "Elnagh Baron Family",
    type: "motorhome",
    typeLabel: "Motorhome",
    image: rvFamily,
    pricePerDay: 139,
    capacity: 6,
    beds: 6,
    length: "7.0m",
    features: ["Letto matrimoniale", "Letti a castello", "Cucina", "Bagno", "TV", "Tenda esterna"],
    description: "L'Elnagh Baron è progettato per le famiglie numerose. Con letto matrimoniale, letti a castello per i bambini, cucina completa e bagno, offre tutto il comfort necessario per vacanze indimenticabili. La tenda esterna crea un piacevole spazio all'aperto.",
    shortDescription: "Per famiglie numerose. 6 posti letto e ogni comfort.",
    location: "Napoli",
    available: true,
  },
  {
    id: "carthago-liner-premium",
    name: "Carthago Liner Premium",
    type: "premium",
    typeLabel: "Premium",
    image: rvPremium,
    pricePerDay: 229,
    capacity: 4,
    beds: 3,
    length: "8.5m",
    features: ["Riscaldamento a pavimento", "Cucina premium", "Bagno luxury", "TV 32\"", "Sistema audio", "Garage XL", "Pannelli solari"],
    description: "Il Carthago Liner è il massimo del lusso su ruote. Rifiniture di pregio, riscaldamento a pavimento, cucina gourmet e bagno spa. Ideale per chi non vuole rinunciare a nulla. Dotato di ogni tecnologia moderna per un'esperienza di viaggio senza pari.",
    shortDescription: "Lusso senza compromessi. L'esperienza premium su ruote.",
    location: "Milano",
    available: true,
  },
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
