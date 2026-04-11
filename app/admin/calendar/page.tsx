"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import frLocale from "@fullcalendar/core/locales/fr"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Euro, FileText, Trash2, User, CheckCircle, XCircle, PlayCircle, RefreshCw } from "lucide-react"

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
  profiles: {
    full_name: string | null
    email: string
    phone: string | null
  } | null
}

const statusConfig: Record<string, { label: string; color: string; bg: string; text: string }> = {
  pending:     { label: "En attente",  color: "#eab308", bg: "bg-yellow-100",  text: "text-yellow-800" },
  confirmed:   { label: "Confirmé",    color: "#22c55e", bg: "bg-green-100",   text: "text-green-800"  },
  in_progress: { label: "En cours",    color: "#3b82f6", bg: "bg-blue-100",    text: "text-blue-800"   },
  completed:   { label: "Terminé",     color: "#6b7280", bg: "bg-gray-100",    text: "text-gray-700"   },
  cancelled:   { label: "Annulé",      color: "#ef4444", bg: "bg-red-100",     text: "text-red-800"    },
}

const quickActions: Record<string, { next: string; label: string; icon: React.ElementType; variant: "default" | "outline" | "destructive" }[]> = {
  pending:     [
    { next: "confirmed",   label: "Confirmer",  icon: CheckCircle,  variant: "default"     },
    { next: "cancelled",   label: "Annuler",    icon: XCircle,      variant: "destructive" },
  ],
  confirmed:   [
    { next: "in_progress", label: "Démarrer",   icon: PlayCircle,   variant: "default"     },
    { next: "cancelled",   label: "Annuler",    icon: XCircle,      variant: "destructive" },
  ],
  in_progress: [
    { next: "completed",   label: "Terminer",   icon: CheckCircle,  variant: "default"     },
  ],
  completed:   [
    { next: "confirmed",   label: "Ré-ouvrir",  icon: RefreshCw,    variant: "outline"     },
  ],
  cancelled:   [
    { next: "pending",     label: "Ré-ouvrir",  icon: RefreshCw,    variant: "outline"     },
  ],
}

export default function AdminCalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selected, setSelected] = useState<Appointment | null>(null)
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

  const events = appointments
    .filter(apt => apt.scheduled_date)
    .map(apt => {
      const config = statusConfig[apt.status] || statusConfig.pending
      const startStr = apt.scheduled_time
        ? `${apt.scheduled_date}T${apt.scheduled_time}`
        : apt.scheduled_date
      const start = new Date(startStr)
      const end = new Date(start.getTime() + (apt.duration_hours || 1) * 3600000)
      return {
        id: apt.id,
        title: `${apt.profiles?.full_name || apt.profiles?.email || "Client"} — ${apt.services?.name || ""}`,
        start,
        end,
        backgroundColor: config.color,
        borderColor: config.color,
        textColor: "#fff",
        extendedProps: { appointment: apt },
      }
    })

  async function handleEventDrop(info: { event: { id: string; start: Date | null } }) {
    if (!info.event.start) return
    const supabase = createClient()
    await supabase
      .from("appointments")
      .update({
        scheduled_date: info.event.start.toISOString().split("T")[0],
        scheduled_time: info.event.start.toTimeString().slice(0, 5),
        updated_at: new Date().toISOString(),
      })
      .eq("id", info.event.id)
    fetchAppointments()
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setUpdating(true)
    const supabase = createClient()
    await supabase
      .from("appointments")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id)
    setSelected(prev => prev ? { ...prev, status: newStatus } : prev)
    await fetchAppointments()
    setUpdating(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce rendez-vous ?")) return
    const supabase = createClient()
    await supabase.from("appointments").delete().eq("id", id)
    setSelected(null)
    fetchAppointments()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground animate-pulse">Chargement du calendrier...</div>
      </div>
    )
  }

  const selectedStatus = selected ? statusConfig[selected.status] : null
  const actions = selected ? (quickActions[selected.status] || []) : []

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendrier</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cliquez sur un RDV pour le gérer · Glissez pour le déplacer
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {appointments.filter(a => a.status === "confirmed").length} confirmé(s) ·{" "}
          {appointments.filter(a => a.status === "pending").length} en attente
        </div>
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(statusConfig).map(([, { label, color }]) => (
          <div key={label} className="flex items-center gap-1.5 text-sm">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          locale={frLocale}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          events={events}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
          eventClick={(info) => {
            setSelected(info.event.extendedProps.appointment as Appointment)
          }}
          height="auto"
          aspectRatio={2}
          eventDisplay="block"
          displayEventTime={true}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          nowIndicator={true}
          eventTimeFormat={{ hour: "2-digit", minute: "2-digit", meridiem: false }}
        />
      </div>

      {/* Dialog détail RDV */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {selected?.profiles?.full_name || selected?.profiles?.email || "Client"}
              </span>
              {selectedStatus && (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedStatus.bg} ${selectedStatus.text}`}
                >
                  {selectedStatus.label}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              {/* Info grid */}
              <div className="rounded-xl border border-border divide-y divide-border">
                {/* Service */}
                <div className="flex items-center gap-3 p-3">
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{selected.services?.name || "—"}</p>
                    <p className="text-xs text-muted-foreground">Service</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 p-3">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">
                      {new Date(selected.scheduled_date).toLocaleDateString("fr-FR", {
                        weekday: "long", day: "numeric", month: "long", year: "numeric",
                      })}
                      {selected.scheduled_time && ` · ${selected.scheduled_time.slice(0, 5)}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Durée : {selected.duration_hours}h</p>
                  </div>
                </div>

                {/* Adresse */}
                <div className="flex items-center gap-3 p-3">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <p className="text-sm">{selected.address}</p>
                </div>

                {/* Email */}
                {selected.profiles?.email && (
                  <div className="flex items-center gap-3 p-3">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a href={`mailto:${selected.profiles.email}`} className="text-sm text-primary hover:underline">
                      {selected.profiles.email}
                    </a>
                  </div>
                )}

                {/* Téléphone */}
                {selected.profiles?.phone && (
                  <div className="flex items-center gap-3 p-3">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <a href={`tel:${selected.profiles.phone}`} className="text-sm text-primary hover:underline">
                      {selected.profiles.phone}
                    </a>
                  </div>
                )}

                {/* Prix */}
                {selected.total_price != null && (
                  <div className="flex items-center gap-3 p-3">
                    <Euro className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm font-bold text-primary">
                      {Number(selected.total_price).toFixed(2)} €
                    </p>
                  </div>
                )}

                {/* Notes */}
                {selected.notes && (
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm bg-muted rounded p-2">{selected.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions rapides statut */}
              {actions.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-semibold">Changer le statut</p>
                  <div className="flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <Button
                        key={action.next}
                        size="sm"
                        variant={action.variant}
                        disabled={updating}
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

              {/* Supprimer */}
              <div className="flex justify-between pt-1 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
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
