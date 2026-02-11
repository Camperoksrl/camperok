import knaus1 from "@/assets/knaus-sun-traveller-1.jpg";
import knaus2 from "@/assets/knaus-sun-traveller-2.jpg";
import knaus3 from "@/assets/knaus-sun-traveller-3.jpg";
import knaus4 from "@/assets/knaus-sun-traveller-4.jpg";
import knaus5 from "@/assets/knaus-sun-traveller-5.jpg";
import rimor1 from "@/assets/rimor-europeo-1.jpg";
import rimor2 from "@/assets/rimor-europeo-2.jpg";
import rimor3 from "@/assets/rimor-europeo-3.jpg";
import rimor4 from "@/assets/rimor-europeo-4.jpg";
import rimor5 from "@/assets/rimor-europeo-5.jpg";
import rimor6 from "@/assets/rimor-europeo-6.jpg";
import rimor7 from "@/assets/rimor-europeo-7.jpg";
import rimor8 from "@/assets/rimor-europeo-8.jpg";
import roller1 from "@/assets/roller-team-autoroller-1.jpg";
import roller2 from "@/assets/roller-team-autoroller-2.jpg";
import roller3 from "@/assets/roller-team-autoroller-3.jpg";
import roller4 from "@/assets/roller-team-autoroller-4.jpg";
import roller5 from "@/assets/roller-team-autoroller-5.jpg";
import roller6 from "@/assets/roller-team-autoroller-6.jpg";
import roller7 from "@/assets/roller-team-autoroller-7.jpg";
import roller8 from "@/assets/roller-team-autoroller-8.jpg";
import roller9 from "@/assets/roller-team-autoroller-9.jpg";

export interface PricingPeriod {
  label: string;
  startDate: string;
  endDate: string;
  pricePerDay: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: "van" | "motorhome" | "compact" | "premium";
  typeLabel: string;
  image: string;
  images?: string[];
  pricePerDay: number;
  pricingPeriods?: PricingPeriod[];
  capacity: number;
  beds: number;
  length: string;
  features: string[];
  description: string;
  shortDescription: string;
  location: string;
  available: boolean;
}

export const getPriceForDate = (vehicle: Vehicle, date: Date): number => {
  if (!vehicle.pricingPeriods?.length) return vehicle.pricePerDay;
  const period = vehicle.pricingPeriods.find((p) => {
    const start = new Date(p.startDate);
    const end = new Date(p.endDate);
    return date >= start && date <= end;
  });
  return period ? period.pricePerDay : vehicle.pricePerDay;
};

export const getMinPrice = (vehicle: Vehicle): number => {
  if (!vehicle.pricingPeriods?.length) return vehicle.pricePerDay;
  const prices = [vehicle.pricePerDay, ...vehicle.pricingPeriods.map((p) => p.pricePerDay)];
  return Math.min(...prices);
};

export const calculateTotalPrice = (vehicle: Vehicle, startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let total = 0;
  const current = new Date(start);
  while (current < end) {
    total += getPriceForDate(vehicle, current);
    current.setDate(current.getDate() + 1);
  }
  return total;
};

export const vehicles: Vehicle[] = [
  {
    id: "knaus-sun-traveller",
    name: "Knaus Sun Traveller",
    type: "motorhome",
    typeLabel: "Motorhome",
    image: knaus1,
    images: [knaus1, knaus2, knaus3, knaus4, knaus5],
    pricePerDay: 119,
    pricingPeriods: [
      { label: "Bassa Stagione", startDate: "2026-02-27", endDate: "2026-03-26", pricePerDay: 65 },
      { label: "Media Stagione", startDate: "2026-03-27", endDate: "2026-04-09", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-10", endDate: "2026-04-12", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-13", endDate: "2026-04-16", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-17", endDate: "2026-04-19", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-20", endDate: "2026-04-23", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-24", endDate: "2026-04-26", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-27", endDate: "2026-04-30", pricePerDay: 70 },
      { label: "Pre-Stagione", startDate: "2026-05-01", endDate: "2026-05-14", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-15", endDate: "2026-05-17", pricePerDay: 80 },
      { label: "Pre-Stagione", startDate: "2026-05-18", endDate: "2026-05-21", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-22", endDate: "2026-05-24", pricePerDay: 80 },
      { label: "Pre-Stagione", startDate: "2026-05-25", endDate: "2026-05-28", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-29", endDate: "2026-05-31", pricePerDay: 80 },
    ],
    capacity: 5,
    beds: 6,
    length: "6.5m",
    features: ["Aria condizionata", "Pannello solare", "Doppio serbatoio acqua", "Porta bici/scooter", "Vetri elettrici", "Specchietti elettrici", "Telecamera retromarcia", "Cucina", "Bagno"],
    description: "Il Knaus Sun Traveller è un camper perfetto per una famiglia con bambini piccoli, molto comodo da guidare, con aria condizionata in cabina, vetri e specchietti elettrici. Ha due serbatoi di acqua e il pannello solare, per un'autonomia maggiore in sosta libera. Completo di porta bici o scooter e telecamera per la retromarcia, sarà un ottimo compagno di viaggio.",
    shortDescription: "Perfetto per famiglie con bambini. Comodo, autonomo e ben accessoriato.",
    location: "Roma",
    available: true,
  },
  {
    id: "rimor-europeo-ng6",
    name: "Rimor Europeo NG6",
    type: "motorhome",
    typeLabel: "Motorhome",
    image: rimor1,
    images: [rimor1, rimor2, rimor3, rimor4, rimor5, rimor6, rimor7, rimor8],
    pricePerDay: 99,
    pricingPeriods: [
      { label: "Bassa Stagione", startDate: "2026-02-27", endDate: "2026-03-26", pricePerDay: 65 },
      { label: "Media Stagione", startDate: "2026-03-27", endDate: "2026-04-09", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-10", endDate: "2026-04-12", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-13", endDate: "2026-04-16", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-17", endDate: "2026-04-19", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-20", endDate: "2026-04-23", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-24", endDate: "2026-04-26", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-27", endDate: "2026-04-30", pricePerDay: 70 },
      { label: "Pre-Stagione", startDate: "2026-05-01", endDate: "2026-05-14", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-15", endDate: "2026-05-17", pricePerDay: 80 },
      { label: "Pre-Stagione", startDate: "2026-05-18", endDate: "2026-05-21", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-22", endDate: "2026-05-24", pricePerDay: 80 },
      { label: "Pre-Stagione", startDate: "2026-05-25", endDate: "2026-05-28", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-29", endDate: "2026-05-31", pricePerDay: 80 },
    ],
    capacity: 6,
    beds: 6,
    length: "6.7m",
    features: ["Aria condizionata", "Pannello solare", "Doppio serbatoio acqua", "Porta bici", "Telecamera retromarcia", "Cucina", "Bagno con doccia", "Letti a castello", "Letto mansarda", "Dinette"],
    description: "Il Rimor Europeo NG6 è un camper 6 posti molto spazioso. È provvisto di aria condizionata in cabina, doppio serbatoio di acqua, porta bici, telecamera per la retromarcia e pannello solare. Comodo da guidare e spazioso per tutta la famiglia, saprà condurti ovunque in piena sicurezza.",
    shortDescription: "6 posti, spazioso e sicuro. Ideale per tutta la famiglia.",
    location: "Roma",
    available: true,
  },
  {
    id: "roller-team-autoroller-2",
    name: "Roller Team Autoroller 2",
    type: "motorhome",
    typeLabel: "Motorhome",
    image: roller1,
    images: [roller1, roller2, roller3, roller4, roller5, roller6, roller7, roller8, roller9],
    pricePerDay: 89,
    pricingPeriods: [
      { label: "Bassa Stagione", startDate: "2026-02-27", endDate: "2026-03-26", pricePerDay: 65 },
      { label: "Media Stagione", startDate: "2026-03-27", endDate: "2026-04-09", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-10", endDate: "2026-04-12", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-13", endDate: "2026-04-16", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-17", endDate: "2026-04-19", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-20", endDate: "2026-04-23", pricePerDay: 70 },
      { label: "Weekend Pasqua", startDate: "2026-04-24", endDate: "2026-04-26", pricePerDay: 75 },
      { label: "Media Stagione", startDate: "2026-04-27", endDate: "2026-04-30", pricePerDay: 70 },
      { label: "Pre-Stagione", startDate: "2026-05-01", endDate: "2026-05-14", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-15", endDate: "2026-05-17", pricePerDay: 80 },
      { label: "Pre-Stagione", startDate: "2026-05-18", endDate: "2026-05-21", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-22", endDate: "2026-05-24", pricePerDay: 80 },
      { label: "Pre-Stagione", startDate: "2026-05-25", endDate: "2026-05-28", pricePerDay: 75 },
      { label: "Weekend Maggio", startDate: "2026-05-29", endDate: "2026-05-31", pricePerDay: 80 },
    ],
    capacity: 6,
    beds: 6,
    length: "6.8m",
    features: ["Aria condizionata", "Pannello solare", "Porta bici", "Garage posteriore", "Telecamera retromarcia", "Cucina", "Letti a castello", "Letto mansarda", "Dinette"],
    description: "Il Roller Team Autoroller 2 ha l'aria condizionata in cabina, il pannello solare, 6 posti letto e il portabici. Un ampio garage in coda ti aiuterà a stivare tutto quello che vuoi portare con te in vacanza. È lungo 6,8 metri ed è provvisto di telecamera di retromarcia.",
    shortDescription: "6 posti con garage posteriore, pannello solare e telecamera.",
    location: "Roma",
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
