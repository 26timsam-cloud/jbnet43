"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, User } from "lucide-react"

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

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [filter])

  async function fetchAppointments() {
    setIsLoading(true)
    const supabase = createClient()
    let query = supabase
      .from("appointments")
      .select("*, services(*), profiles(*)")
      .order("scheduled_date", { ascending: true })

    if (filter !== "all") {
      query = query.eq("status", filter)
    }

    const { data } = await query
    setAppointments(data || [])
    setIsLoading(false)
  }

  async function updateStatus(id: string, newStatus: string) {
    const supabase = createClient()
    await supabase
      .from("appointments")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id)
    
    fetchAppointments()
  }

  const statusLabels: Record<string, { label: string; className: string }> = {
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmé", className: "bg-accent/10 text-accent" },
    in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
    completed: { label: "Terminé", className: "bg-green-100 text-green-800" },
    cancelled: { label: "Annulé", className: "bg-red-100 text-red-800" },
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rendez-vous</h1>
          <p className="mt-2 text-muted-foreground">
            Gérez les rendez-vous des clients
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmé</SelectItem>
            <SelectItem value="in_progress">En cours</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="grid gap-4">
          {appointments.map((apt) => {
            const status = statusLabels[apt.status] || { label: apt.status, className: "bg-muted text-muted-foreground" }
            return (
              <Card key={apt.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{apt.services?.name}</h3>
                          <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              {apt.profiles?.full_name || apt.profiles?.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {new Date(apt.scheduled_date).toLocaleDateString("fr-FR")} à {apt.scheduled_time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {apt.address}
                            </div>
                            {apt.profiles?.phone && (
                              <div className="text-sm text-muted-foreground">
                                Tél: {apt.profiles.phone}
                              </div>
                            )}
                          </div>
                          {apt.notes && (
                            <p className="mt-2 text-sm text-muted-foreground bg-muted p-2 rounded">
                              {apt.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${status.className}`}>
                        {status.label}
                      </span>
                      {apt.total_price && (
                        <span className="text-lg font-semibold text-foreground">
                          {Number(apt.total_price).toFixed(2)} €
                        </span>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {apt.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => updateStatus(apt.id, "confirmed")}>
                              Confirmer
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => updateStatus(apt.id, "cancelled")}>
                              Annuler
                            </Button>
                          </>
                        )}
                        {apt.status === "confirmed" && (
                          <Button size="sm" onClick={() => updateStatus(apt.id, "in_progress")}>
                            Démarrer
                          </Button>
                        )}
                        {apt.status === "in_progress" && (
                          <Button size="sm" onClick={() => updateStatus(apt.id, "completed")}>
                            Terminer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">Aucun rendez-vous</h3>
            <p className="mt-2 text-muted-foreground">
              Aucun rendez-vous ne correspond à vos critères.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
