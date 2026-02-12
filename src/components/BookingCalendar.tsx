import { useState, useMemo } from "react";
import { type Booking, type Camper } from "@/lib/adminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  campers: Camper[];
  bookings: Booking[];
}

const MONTHS_IT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const DAYS_IT = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

const statusColorMap: Record<string, string> = {
  pending: "bg-yellow-400/80",
  confirmed: "bg-green-500/80",
  cancelled: "bg-red-400/50",
};

const statusLabel: Record<string, string> = {
  pending: "In Attesa",
  confirmed: "Confermata",
  cancelled: "Annullata",
};

const BookingCalendar = ({ campers, bookings }: Props) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedCamper, setSelectedCamper] = useState<string>("all");

  const filteredBookings = useMemo(() => {
    const active = bookings.filter(b => b.status !== "cancelled");
    return selectedCamper === "all" ? active : active.filter(b => b.camper_id === selectedCamper);
  }, [bookings, selectedCamper]);

  const dateMap = useMemo(() => {
    const map = new Map<string, { camperId: string; booking: Booking }[]>();
    for (const b of filteredBookings) {
      const start = new Date(b.start_date);
      const end = new Date(b.end_date);
      const current = new Date(start);
      while (current <= end) {
        const key = current.toISOString().slice(0, 10);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({ camperId: b.camper_id, booking: b });
        current.setDate(current.getDate() + 1);
      }
    }
    return map;
  }, [filteredBookings]);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Calendario Disponibilità</CardTitle>
          <Select value={selectedCamper} onValueChange={setSelectedCamper}>
            <SelectTrigger className="w-[220px]"><SelectValue placeholder="Filtra camper" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i camper</SelectItem>
              {campers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="h-5 w-5" /></Button>
          <h3 className="text-lg font-semibold text-foreground">{MONTHS_IT[month]} {year}</h3>
          <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="h-5 w-5" /></Button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
          {DAYS_IT.map(d => (
            <div key={d} className="bg-muted/30 py-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} className="bg-card min-h-[60px]" />;
            const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const entries = dateMap.get(dateKey) || [];
            const isToday = dateKey === todayKey;

            return (
              <div key={dateKey} className={`bg-card min-h-[60px] p-1 relative ${isToday ? "ring-2 ring-primary ring-inset" : ""}`}>
                <span className={`text-xs font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
                <div className="mt-0.5 space-y-0.5">
                  {entries.slice(0, 3).map((e, idx) => {
                    const camperName = campers.find(c => c.id === e.camperId)?.name || e.camperId;
                    return (
                      <Tooltip key={`${e.booking.id}-${idx}`}>
                        <TooltipTrigger asChild>
                          <div className={`${statusColorMap[e.booking.status]} rounded px-1 py-0.5 text-[10px] leading-tight text-foreground truncate cursor-default`}>
                            {selectedCamper === "all" ? camperName.split(" ")[0] : e.booking.customer_name.split(" ")[0]}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px]">
                          <p className="font-medium">{camperName}</p>
                          <p className="text-xs">{e.booking.customer_name}</p>
                          <p className="text-xs">{e.booking.start_date} → {e.booking.end_date}</p>
                          <p className="text-xs">€{e.booking.total_price} · {statusLabel[e.booking.status]}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                  {entries.length > 3 && (
                    <span className="text-[9px] text-muted-foreground">+{entries.length - 3}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          {(["confirmed", "pending", "cancelled"] as string[]).map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${statusColorMap[s]}`} />
              <span className="text-xs text-muted-foreground">{statusLabel[s]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
