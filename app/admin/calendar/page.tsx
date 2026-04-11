"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  MapPin, Phone, Mail, Clock, Euro, FileText,
  Trash2, User, CheckCircle, XCircle, PlayCircle,
  RefreshCw, ChevronLeft, ChevronRight, List, CalendarDays,
} from "lucide-react"

interface Appointment {
  id: string
  scheduled_date: string
  scheduled_time: string
  duration_hours: number
  status: string
  address: string
  notes: string | null
  total_price: number | null
  services: { name: string } | null
  profiles: { full_name: string | null; email: string; phone: string | null } | null
}

const STATUS = {
  pending:     { label: "En attente",  color: "#eab308", bg: "bg-yellow-100",  text: "text-yellow-800" },
  confirmed:   { label: "Confirmé",    color: "#22c55e", bg: "bg-green-100",   text: "text-green-800"  },
  in_progress: { label: "En cours",    color: "#3b82f6", bg: "bg-blue-100",    text: "text-blue-800"   },
  completed:   { label: "Terminé",     color: "#6b7280", bg: "bg-gray-100",    text: "text-gray-700"   },
  cancelled:   { label: "Annulé",      color: "#ef4444", bg: "bg-red-100",     text: "text-red-800"    },
} as const

const QUICK_ACTIONS: Record<string, { next: string; label: string; icon: React.ElementType; variant: "default" | "outline" | "destructive" }[]> = {
  pending:     [{ next: "confirmed",   label: "Confirmer", icon: CheckCircle, variant: "default"     }, { next: "cancelled", label: "Annuler", icon: XCircle, variant: "destructive" }],
  confirmed:   [{ next: "in_progress", label: "Démarrer",  icon: PlayCircle,  variant: "default"     }, { next: "cancelled", label: "Annuler", icon: XCircle, variant: "destructive" }],
  in_progress: [{ next: "completed",   label: "Terminer",  icon: CheckCircle, variant: "default"     }],
  completed:   [{ next: "confirmed",   label: "Ré-ouvrir", icon: RefreshCw,   variant: "outline"     }],
  cancelled:   [{ next: "pending",     label: "Ré-ouvrir", icon: RefreshCw,   variant: "outline"     }],
}

const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
const DAYS_FR   = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  // Monday=0
  return (new Date(year, month, 1).getDay() + 6) % 7
}
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

export default function AdminCalendarPage() {
  const today = new Date()
  const [view, setView] = useState<"month" | "list">("month")
  const [year, setYear]   = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [activeDayApts, setActiveDayApts] = useState<Appointment[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const fetchAppointments = useCallback(async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("appointments")
      .select("*, services(name), profiles(full_name, email, phone)")
      .order("scheduled_date")
    setAppointments(data || [])
    setIsLoading(false)
  }, [])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  // Group by date string
  const byDate: Record<string, Appointment[]> = {}
  appointments.forEach(apt => {
    const d = apt.scheduled_date?.slice(0, 10)
    if (d) { byDate[d] = byDate[d] ? [...byDate[d], apt] : [apt] }
  })

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdating(true)
    const supabase = createClient()
    await supabase.from("appointments").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", id)
    setSelected(prev => prev ? { ...prev, status: newStatus } : prev)
    await fetchAppointments()
    setUpdating(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce rendez-vous ?")) return
    const supabase = createClient()
    await supabase.from("appointments").delete().eq("id", id)
    setSelected(null)
    setActiveDayApts(null)
    fetchAppointments()
  }

  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  function nextMonth() { if (month === 11) { setMonth(0);  setYear(y => y + 1) } else setMonth(m => m + 1) }

  // Calendar grid
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay    = getFirstDayOfMonth(year, month)
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate())

  const selectedStatus = selected ? STATUS[selected.status as keyof typeof STATUS] : null
  const actions        = selected ? (QUICK_ACTIONS[selected.status] || []) : []

  // List view: current month appointments sorted
  const monthApts = appointments
    .filter(a => a.scheduled_date?.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .sort((a, b) => (a.scheduled_date + (a.scheduled_time || "")).localeCompare(b.scheduled_date + (b.scheduled_time || "")))

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground animate-pulse">Chargement...</div>
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendrier</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {appointments.filter(a => a.status === "confirmed").length} confirmé(s) ·{" "}
            {appointments.filter(a => a.status === "pending").length} en attente
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("month")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === "month" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            <CalendarDays className="h-4 w-4" /> Mois
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${view === "list" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            <List className="h-4 w-4" /> Liste
          </button>
        </div>
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-4 mb-5">
        {Object.entries(STATUS).map(([, { label, color }]) => (
          <div key={label} className="flex items-center gap-1.5 text-xs">
            <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Navigation mois */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <h2 className="text-xl font-bold text-foreground">
          {MONTHS_FR[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {view === "month" ? (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS_FR.map(d => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Grille jours */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              const dateStr = day ? toDateStr(year, month, day) : ""
              const dayApts = day ? (byDate[dateStr] || []) : []
              const isToday = dateStr === todayStr
              const isPast  = day ? new Date(dateStr) < new Date(todayStr) : false

              return (
                <div
                  key={idx}
                  onClick={() => { if (day && dayApts.length > 0) { setActiveDayApts(dayApts) } }}
                  className={`min-h-[80px] p-2 border-b border-r border-border/50 transition-colors
                    ${day ? "cursor-pointer hover:bg-muted/40" : "bg-muted/20"}
                    ${isToday ? "bg-primary/5" : ""}
                    ${isPast && day ? "opacity-60" : ""}
                  `}
                >
                  {day && (
                    <>
                      <span
                        className={`text-sm font-semibold mb-1 inline-flex h-7 w-7 items-center justify-center rounded-full
                          ${isToday ? "bg-primary text-white" : "text-foreground"}
                        `}
                      >
                        {day}
                      </span>
                      <div className="space-y-0.5">
                        {dayApts.slice(0, 3).map(apt => {
                          const s = STATUS[apt.status as keyof typeof STATUS] || STATUS.pending
                          return (
                            <div
                              key={apt.id}
                              onClick={(e) => { e.stopPropagation(); setSelected(apt) }}
                              className="text-[10px] font-medium px-1.5 py-0.5 rounded text-white truncate cursor-pointer hover:opacity-80 transition-opacity"
                              style={{ backgroundColor: s.color }}
                            >
                              {apt.scheduled_time?.slice(0, 5)} {apt.profiles?.full_name?.split(" ")[0] || "Client"}
                            </div>
                          )
                        })}
                        {dayApts.length > 3 && (
                          <div className="text-[10px] text-muted-foreground pl-1">+{dayApts.length - 3} autre(s)</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* List view */
        <div className="space-y-3">
          {monthApts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              Aucun rendez-vous ce mois-ci.
            </div>
          ) : monthApts.map(apt => {
            const s = STATUS[apt.status as keyof typeof STATUS] || STATUS.pending
            return (
              <div
                key={apt.id}
                onClick={() => setSelected(apt)}
                className="rounded-xl border border-border bg-card p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-4"
              >
                {/* Color bar */}
                <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />

                {/* Date */}
                <div className="text-center flex-shrink-0 w-12">
                  <div className="text-xl font-black text-foreground leading-none">
                    {parseInt(apt.scheduled_date?.slice(8, 10) || "0")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {MONTHS_FR[parseInt(apt.scheduled_date?.slice(5, 7) || "1") - 1]?.slice(0, 3)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">
                      {apt.profiles?.full_name || apt.profiles?.email || "Client"}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.text}`}>
                      {s.label}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-3">
                    <span>{apt.services?.name}</span>
                    {apt.scheduled_time && <span>· {apt.scheduled_time.slice(0, 5)}</span>}
                    {apt.duration_hours && <span>· {apt.duration_hours}h</span>}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{apt.address}</div>
                </div>

                {/* Prix */}
                {apt.total_price != null && (
                  <div className="text-sm font-bold text-primary flex-shrink-0">
                    {Number(apt.total_price).toFixed(2)} €
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Dialog: liste des RDV d'un jour */}
      <Dialog open={!!activeDayApts && !selected} onOpenChange={(open) => { if (!open) setActiveDayApts(null) }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rendez-vous du jour</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {activeDayApts?.map(apt => {
              const s = STATUS[apt.status as keyof typeof STATUS] || STATUS.pending
              return (
                <div
                  key={apt.id}
                  onClick={() => { setSelected(apt); setActiveDayApts(null) }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{apt.profiles?.full_name || apt.profiles?.email}</p>
                    <p className="text-xs text-muted-foreground">{apt.services?.name} · {apt.scheduled_time?.slice(0, 5)}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: détail RDV */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {selected?.profiles?.full_name || selected?.profiles?.email || "Client"}
              </span>
              {selectedStatus && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedStatus.bg} ${selectedStatus.text}`}>
                  {selectedStatus.label}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border divide-y divide-border">
                <div className="flex items-center gap-3 p-3">
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{selected.services?.name || "—"}</p>
                    <p className="text-xs text-muted-foreground">Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">
                      {new Date(selected.scheduled_date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      {selected.scheduled_time && ` · ${selected.scheduled_time.slice(0, 5)}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Durée : {selected.duration_hours}h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <p className="text-sm">{selected.address}</p>
                </div>
                {selected.profiles?.email && (
                  <div className="flex items-center gap-3 p-3">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a href={`mailto:${selected.profiles.email}`} className="text-sm text-primary hover:underline">{selected.profiles.email}</a>
                  </div>
                )}
                {selected.profiles?.phone && (
                  <div className="flex items-center gap-3 p-3">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a href={`tel:${selected.profiles.phone}`} className="text-sm text-primary hover:underline">{selected.profiles.phone}</a>
                  </div>
                )}
                {selected.total_price != null && (
                  <div className="flex items-center gap-3 p-3">
                    <Euro className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm font-bold text-primary">{Number(selected.total_price).toFixed(2)} €</p>
                  </div>
                )}
                {selected.notes && (
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm bg-muted rounded p-2">{selected.notes}</p>
                  </div>
                )}
              </div>

              {actions.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-semibold">Changer le statut</p>
                  <div className="flex flex-wrap gap-2">
                    {actions.map(action => (
                      <Button key={action.next} size="sm" variant={action.variant} disabled={updating}
                        onClick={() => handleStatusChange(selected.id, action.next)}
                        className="flex items-center gap-1.5"
                      >
                        <action.icon className="h-4 w-4" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-1 border-t border-border">
                <Button variant="ghost" size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(selected.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  Supprimer
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
