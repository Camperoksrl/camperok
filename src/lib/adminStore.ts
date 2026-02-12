// localStorage-based backend simulation for camper rental admin

export interface Camper {
  id: string;
  name: string;
  description: string;
  dailyPrice: number;
  highSeasonPrice: number;
  deposit: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Booking {
  id: string;
  camperId: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

const CAMPERS_KEY = "camperok_campers";
const BOOKINGS_KEY = "camperok_bookings";
const AUTH_KEY = "camperok_admin_auth";

// Default admin credentials
const ADMIN_EMAIL = "admin@camperok.it";
const ADMIN_PASSWORD = "admin123";

// --- Auth ---
export const adminLogin = (email: string, password: string): boolean => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedIn: true, loginAt: new Date().toISOString() }));
    return true;
  }
  return false;
};

export const adminLogout = () => localStorage.removeItem(AUTH_KEY);

export const isAdminLoggedIn = (): boolean => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data).loggedIn === true : false;
};

// --- Campers CRUD ---
const getStoredCampers = (): Camper[] => {
  const data = localStorage.getItem(CAMPERS_KEY);
  if (data) return JSON.parse(data);
  // Seed from existing vehicles
  const seed: Camper[] = [
    { id: "knaus-sun-traveller", name: "Knaus Sun Traveller", description: "Camper mansardato 6 posti", dailyPrice: 119, highSeasonPrice: 110, deposit: 1500, status: "active", createdAt: "2026-01-01T00:00:00Z" },
    { id: "rimor-europeo-ng6", name: "Rimor Europeo NG6", description: "Camper mansardato 6 posti spazioso", dailyPrice: 99, highSeasonPrice: 110, deposit: 1500, status: "active", createdAt: "2026-01-01T00:00:00Z" },
    { id: "roller-team-autoroller-2", name: "Roller Team Autoroller 2", description: "Camper mansardato con garage", dailyPrice: 89, highSeasonPrice: 110, deposit: 1500, status: "active", createdAt: "2026-01-01T00:00:00Z" },
  ];
  localStorage.setItem(CAMPERS_KEY, JSON.stringify(seed));
  return seed;
};

export const getCampers = (): Camper[] => getStoredCampers();

export const getCamper = (id: string): Camper | undefined => getStoredCampers().find(c => c.id === id);

export const addCamper = (camper: Omit<Camper, "id" | "createdAt">): Camper => {
  const campers = getStoredCampers();
  const newCamper: Camper = {
    ...camper,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  campers.push(newCamper);
  localStorage.setItem(CAMPERS_KEY, JSON.stringify(campers));
  return newCamper;
};

export const updateCamper = (id: string, updates: Partial<Omit<Camper, "id" | "createdAt">>): Camper | null => {
  const campers = getStoredCampers();
  const idx = campers.findIndex(c => c.id === id);
  if (idx === -1) return null;
  campers[idx] = { ...campers[idx], ...updates };
  localStorage.setItem(CAMPERS_KEY, JSON.stringify(campers));
  return campers[idx];
};

export const deleteCamper = (id: string): boolean => {
  const campers = getStoredCampers();
  const filtered = campers.filter(c => c.id !== id);
  if (filtered.length === campers.length) return false;
  localStorage.setItem(CAMPERS_KEY, JSON.stringify(filtered));
  return true;
};

// --- Bookings CRUD ---
const getStoredBookings = (): Booking[] => {
  const data = localStorage.getItem(BOOKINGS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getBookings = (): Booking[] => getStoredBookings();

export const addBooking = (booking: Omit<Booking, "id" | "createdAt" | "status">): Booking | { error: string } => {
  const bookings = getStoredBookings();
  // Check for conflicts
  const conflict = bookings.find(b =>
    b.camperId === booking.camperId &&
    b.status !== "cancelled" &&
    new Date(booking.startDate) <= new Date(b.endDate) &&
    new Date(booking.endDate) >= new Date(b.startDate)
  );
  if (conflict) return { error: "Date già prenotate per questo camper." };

  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (id: string, status: Booking["status"]): Booking | null => {
  const bookings = getStoredBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) return null;
  bookings[idx].status = status;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return bookings[idx];
};

export const deleteBooking = (id: string): boolean => {
  const bookings = getStoredBookings();
  const filtered = bookings.filter(b => b.id !== id);
  if (filtered.length === bookings.length) return false;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
  return true;
};

export const getBookingsForCamper = (camperId: string): Booking[] =>
  getStoredBookings().filter(b => b.camperId === camperId && b.status !== "cancelled");

export const getBookedDatesForCamper = (camperId: string): Date[] => {
  const bookings = getBookingsForCamper(camperId);
  const dates: Date[] = [];
  for (const b of bookings) {
    const current = new Date(b.startDate);
    const end = new Date(b.endDate);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }
  return dates;
};
