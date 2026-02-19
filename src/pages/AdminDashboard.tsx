import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  isAdminLoggedIn, adminLogout, getCampers, getBookings,
  updateBookingStatus, deleteBooking, deleteCamper, addCamper,
  updateCamper, addBooking, type Camper, type Booking,
} from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Pencil, Trash2, Truck, CalendarDays, ClipboardList, Home, Calendar, Download } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};
const statusLabels: Record<string, string> = {
  pending: "In Attesa",
  confirmed: "Confermata",
  cancelled: "Annullata",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [campers, setCampers] = useState<Camper[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCamper, setFilterCamper] = useState<string>("all");
  const [camperDialogOpen, setCamperDialogOpen] = useState(false);
  const [editingCamper, setEditingCamper] = useState<Camper | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const [camperForm, setCamperForm] = useState({ name: "", description: "", daily_price: 0, high_season_price: 0, deposit: 0, status: "active" as Camper["status"] });
  const [bookingForm, setBookingForm] = useState({ camper_id: "", customer_name: "", customer_email: "", start_date: "", end_date: "", total_price: 0 });

  const refresh = useCallback(async () => {
    const [c, b] = await Promise.all([getCampers(), getBookings()]);
    setCampers(c);
    setBookings(b);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await isAdminLoggedIn();
      if (!loggedIn) { navigate("/admin/login"); return; }
      await refresh();
      setLoading(false);
    };
    checkAuth();
  }, [navigate, refresh]);

  const handleLogout = async () => { await adminLogout(); navigate("/admin/login"); };

  // Camper actions
  const openNewCamper = () => { setEditingCamper(null); setCamperForm({ name: "", description: "", daily_price: 0, high_season_price: 0, deposit: 0, status: "active" }); setCamperDialogOpen(true); };
  const openEditCamper = (c: Camper) => { setEditingCamper(c); setCamperForm({ name: c.name, description: c.description, daily_price: c.daily_price, high_season_price: c.high_season_price, deposit: c.deposit, status: c.status }); setCamperDialogOpen(true); };
  const saveCamper = async () => {
    if (editingCamper) { await updateCamper(editingCamper.id, camperForm); toast({ title: "Camper aggiornato" }); }
    else { await addCamper(camperForm); toast({ title: "Camper aggiunto" }); }
    setCamperDialogOpen(false); await refresh();
  };
  const handleDeleteCamper = async (id: string) => { await deleteCamper(id); toast({ title: "Camper eliminato" }); await refresh(); };

  // Booking actions
  const handleStatusChange = async (id: string, status: Booking["status"]) => { await updateBookingStatus(id, status); toast({ title: `Prenotazione ${statusLabels[status]?.toLowerCase()}` }); await refresh(); };
  const handleDeleteBooking = async (id: string) => { await deleteBooking(id); toast({ title: "Prenotazione eliminata" }); await refresh(); };
  const openNewBooking = () => { setBookingForm({ camper_id: campers[0]?.id || "", customer_name: "", customer_email: "", start_date: "", end_date: "", total_price: 0 }); setBookingDialogOpen(true); };
  const saveBooking = async () => {
    const result = await addBooking(bookingForm);
    if ("error" in result) { toast({ title: "Errore", description: result.error, variant: "destructive" }); return; }
    toast({ title: "Prenotazione creata" }); setBookingDialogOpen(false); await refresh();
  };

  const exportCSV = () => {
    const headers = ["Cliente", "Email", "Camper", "Check-in", "Check-out", "Totale", "Stato"];
    const rows = filteredBookings.map(b => [
      b.customer_name,
      b.customer_email,
      campers.find(c => c.id === b.camper_id)?.name || b.camper_id,
      b.start_date,
      b.end_date,
      b.total_price,
      statusLabels[b.status] || b.status,
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prenotazioni_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV esportato" });
  };

  const filteredBookings = bookings.filter(b => {
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterCamper !== "all" && b.camper_id !== filterCamper) return false;
    return true;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    revenue: bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.total_price, 0),
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Caricamento...</p></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">🚐 CamperOK Admin</h1>
          <div className="flex items-center gap-2">
            <Link to="/"><Button variant="ghost" size="sm"><Home className="h-4 w-4 mr-1" /> Sito</Button></Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Esci</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Prenotazioni", value: stats.total, icon: ClipboardList },
            { label: "In Attesa", value: stats.pending, icon: CalendarDays },
            { label: "Confermate", value: stats.confirmed, icon: CalendarDays },
            { label: "Ricavo Totale", value: `€${stats.revenue}`, icon: Truck },
          ].map(s => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings"><ClipboardList className="h-4 w-4 mr-1" /> Prenotazioni</TabsTrigger>
            <TabsTrigger value="calendar"><Calendar className="h-4 w-4 mr-1" /> Calendario</TabsTrigger>
            <TabsTrigger value="campers"><Truck className="h-4 w-4 mr-1" /> Camper</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Stato" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="pending">In Attesa</SelectItem>
                  <SelectItem value="confirmed">Confermata</SelectItem>
                  <SelectItem value="cancelled">Annullata</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCamper} onValueChange={setFilterCamper}>
                <SelectTrigger className="w-[200px]"><SelectValue placeholder="Camper" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i camper</SelectItem>
                  {campers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-4 w-4 mr-1" /> CSV</Button>
              <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                <DialogTrigger asChild><Button size="sm" onClick={openNewBooking}><Plus className="h-4 w-4 mr-1" /> Nuova</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Nuova Prenotazione</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label>Camper</Label>
                      <Select value={bookingForm.camper_id} onValueChange={v => setBookingForm(p => ({ ...p, camper_id: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{campers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label>Nome Cliente</Label><Input value={bookingForm.customer_name} onChange={e => setBookingForm(p => ({ ...p, customer_name: e.target.value }))} /></div>
                    <div><Label>Email Cliente</Label><Input type="email" value={bookingForm.customer_email} onChange={e => setBookingForm(p => ({ ...p, customer_email: e.target.value }))} /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Check-in</Label><Input type="date" value={bookingForm.start_date} onChange={e => setBookingForm(p => ({ ...p, start_date: e.target.value }))} /></div>
                      <div><Label>Check-out</Label><Input type="date" value={bookingForm.end_date} onChange={e => setBookingForm(p => ({ ...p, end_date: e.target.value }))} /></div>
                    </div>
                    <div><Label>Prezzo Totale (€)</Label><Input type="number" value={bookingForm.total_price} onChange={e => setBookingForm(p => ({ ...p, total_price: Number(e.target.value) }))} /></div>
                    <Button onClick={saveBooking} className="w-full">Salva Prenotazione</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {filteredBookings.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">Nessuna prenotazione trovata.</CardContent></Card>
            ) : (
              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Camper</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Totale</TableHead>
                      <TableHead>Stato</TableHead>
                      <TableHead>Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map(b => {
                      const camperName = campers.find(c => c.id === b.camper_id)?.name || b.camper_id;
                      return (
                        <TableRow key={b.id}>
                          <TableCell>
                            <div><p className="font-medium text-foreground">{b.customer_name}</p><p className="text-xs text-muted-foreground">{b.customer_email}</p></div>
                          </TableCell>
                          <TableCell className="text-foreground">{camperName}</TableCell>
                          <TableCell className="text-foreground text-sm">{b.start_date} → {b.end_date}</TableCell>
                          <TableCell className="font-medium text-foreground">€{b.total_price}</TableCell>
                          <TableCell>
                            <Select value={b.status} onValueChange={(v) => handleStatusChange(b.id, v as Booking["status"])}>
                              <SelectTrigger className={`w-[130px] text-xs border ${statusColors[b.status]}`}><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">In Attesa</SelectItem>
                                <SelectItem value="confirmed">Confermata</SelectItem>
                                <SelectItem value="cancelled">Annullata</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteBooking(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <BookingCalendar campers={campers} bookings={bookings} />
          </TabsContent>

          {/* Campers Tab */}
          <TabsContent value="campers" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={camperDialogOpen} onOpenChange={setCamperDialogOpen}>
                <DialogTrigger asChild><Button size="sm" onClick={openNewCamper}><Plus className="h-4 w-4 mr-1" /> Aggiungi Camper</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{editingCamper ? "Modifica Camper" : "Nuovo Camper"}</DialogTitle></DialogHeader>
                  <div className="space-y-3">
                    <div><Label>Nome</Label><Input value={camperForm.name} onChange={e => setCamperForm(p => ({ ...p, name: e.target.value }))} /></div>
                    <div><Label>Descrizione</Label><Input value={camperForm.description} onChange={e => setCamperForm(p => ({ ...p, description: e.target.value }))} /></div>
                    <div className="grid grid-cols-3 gap-3">
                      <div><Label>Prezzo/giorno (€)</Label><Input type="number" value={camperForm.daily_price} onChange={e => setCamperForm(p => ({ ...p, daily_price: Number(e.target.value) }))} /></div>
                      <div><Label>Alta Stagione (€)</Label><Input type="number" value={camperForm.high_season_price} onChange={e => setCamperForm(p => ({ ...p, high_season_price: Number(e.target.value) }))} /></div>
                      <div><Label>Deposito (€)</Label><Input type="number" value={camperForm.deposit} onChange={e => setCamperForm(p => ({ ...p, deposit: Number(e.target.value) }))} /></div>
                    </div>
                    <div>
                      <Label>Stato</Label>
                      <Select value={camperForm.status} onValueChange={v => setCamperForm(p => ({ ...p, status: v as Camper["status"] }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Attivo</SelectItem>
                          <SelectItem value="inactive">Inattivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={saveCamper} className="w-full">Salva</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campers.map(c => (
                <Card key={c.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{c.name}</CardTitle>
                      <Badge variant={c.status === "active" ? "default" : "secondary"}>{c.status === "active" ? "Attivo" : "Inattivo"}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-foreground font-medium">€{c.daily_price}/g</span>
                      <span className="text-muted-foreground">Alta: €{c.high_season_price}</span>
                      <span className="text-muted-foreground">Dep: €{c.deposit}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => openEditCamper(c)}><Pencil className="h-3 w-3 mr-1" /> Modifica</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteCamper(c.id)}><Trash2 className="h-3 w-3 mr-1 text-destructive" /> Elimina</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
