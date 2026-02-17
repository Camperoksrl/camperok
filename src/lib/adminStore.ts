// Supabase-backed admin store for camper rental management
import { supabase } from "@/integrations/supabase/client";

export interface Camper {
  id: string;
  name: string;
  description: string;
  daily_price: number;
  high_season_price: number;
  deposit: number;
  status: "active" | "inactive";
  created_at: string;
}

export interface Booking {
  id: string;
  camper_id: string;
  customer_name: string;
  customer_email: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

// --- Auth ---
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
};

export const adminLogout = async () => {
  await supabase.auth.signOut();
};

export const isAdminLoggedIn = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return false;
  // Check admin role
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", data.session.user.id)
    .eq("role", "admin");
  return !!(roles && roles.length > 0);
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
};

// --- Campers CRUD ---
export const getCampers = async (): Promise<Camper[]> => {
  const { data, error } = await supabase.from("campers").select("*").order("created_at");
  if (error) { if (import.meta.env.DEV) console.error("getCampers error:", error); return []; }
  return data as Camper[];
};

export const getCamper = async (id: string): Promise<Camper | null> => {
  const { data, error } = await supabase.from("campers").select("*").eq("id", id).single();
  if (error) return null;
  return data as Camper;
};

export const addCamper = async (camper: Omit<Camper, "id" | "created_at">): Promise<Camper | null> => {
  const { data, error } = await supabase.from("campers").insert(camper).select().single();
  if (error) { if (import.meta.env.DEV) console.error("addCamper error:", error); return null; }
  return data as Camper;
};

export const updateCamper = async (id: string, updates: Partial<Omit<Camper, "id" | "created_at">>): Promise<Camper | null> => {
  const { data, error } = await supabase.from("campers").update(updates).eq("id", id).select().single();
  if (error) { if (import.meta.env.DEV) console.error("updateCamper error:", error); return null; }
  return data as Camper;
};

export const deleteCamper = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("campers").delete().eq("id", id);
  return !error;
};

// --- Bookings CRUD ---
export const getBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase.from("bookings").select("*").order("start_date", { ascending: true });
  if (error) { if (import.meta.env.DEV) console.error("getBookings error:", error); return []; }
  return data as Booking[];
};

export const addBooking = async (booking: Omit<Booking, "id" | "created_at" | "status"> & { phone?: string | null; terms_accepted_at?: string; payment_type?: string }): Promise<{ success: true; booking_id: string } | { error: string }> => {
  const { phone, terms_accepted_at, payment_type, ...bookingData } = booking;
  const insertData: Record<string, unknown> = { ...bookingData, status: "pending" };
  if (phone) insertData.phone = phone;
  if (terms_accepted_at) insertData.terms_accepted_at = terms_accepted_at;
  if (payment_type) insertData.payment_type = payment_type;

  const { data, error } = await supabase.from("bookings").insert(insertData as any).select("id").single();
  if (error) return { error: error.message };

  // Fire-and-forget email notification
  supabase.functions.invoke("notify-booking", {
    body: { ...booking, id: data.id },
  }).catch((err) => {
    if (import.meta.env.DEV) console.error("Notification error:", err);
  });

  return { success: true, booking_id: data.id };
};

export const updateBookingStatus = async (id: string, status: Booking["status"]): Promise<Booking | null> => {
  const { data, error } = await supabase.from("bookings").update({ status }).eq("id", id).select().single();
  if (error) { if (import.meta.env.DEV) console.error("updateBookingStatus error:", error); return null; }
  return data as Booking;
};

export const deleteBooking = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  return !error;
};

export const getBookingsForCamper = async (camperId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("camper_id", camperId)
    .neq("status", "cancelled");
  if (error) return [];
  return data as Booking[];
};

export const getBookedDatesForCamper = async (camperId: string): Promise<Date[]> => {
  const bookings = await getBookingsForCamper(camperId);
  const dates: Date[] = [];
  for (const b of bookings) {
    const current = new Date(b.start_date);
    const end = new Date(b.end_date);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  }
  return dates;
};
