import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default async function AppointmentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, services(*)")
    .eq("client_id", user?.id)
    .order("scheduled_date", { ascending: false })

  const statusLabels: Record<string, { label: string; className: string }> = {
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
    confirmed: { label: "Confirmé", className: "bg-accent/10 text-accent" },
    in_progress: { label: "En cours", className: "bg-blue-100 text-blue-800" },
    completed: { label: "Terminé", className: "bg-green-100 text-green-800" },
    cancelled: { label: "Annulé", className: "bg-red-100 text-red-800" },
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes rendez-vous</h1>
          <p className="mt-2 text-muted-foreground">
            Historique de vos interventions
          </p>
        </div>
        <Link href="/dashboard/book">
          <Button>Nouvelle réservation</Button>
        </Link>
      </div>

      {appointments && appointments.length > 0 ? (
        <div className="grid gap-4">
          {appointments.map((apt) => {
            const status = statusLabels[apt.status] || { label: apt.status, className: "bg-muted text-muted-foreground" }
            return (
              <Card key={apt.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{apt.services?.name}</h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {new Date(apt.scheduled_date).toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })} à {apt.scheduled_time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {apt.address}
                          </div>
                        </div>
                        {apt.notes && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            Note : {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${status.className}`}>
                        {status.label}
                      </span>
                      {apt.total_price && (
                        <span className="text-lg font-semibold text-foreground">
                          {Number(apt.total_price).toFixed(2)} €
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {apt.duration_hours}h estimée{Number(apt.duration_hours) > 1 ? "s" : ""}
                      </span>
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
              Vous n&apos;avez pas encore de rendez-vous planifié.
            </p>
            <Link href="/dashboard/book" className="mt-6 inline-block">
              <Button>Réserver maintenant</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
