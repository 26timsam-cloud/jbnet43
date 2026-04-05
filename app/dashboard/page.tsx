import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, services(*)")
    .eq("client_id", user?.id)
    .order("scheduled_date", { ascending: true })
    .limit(5)

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", user?.id)
    .eq("status", "pending")
    .limit(5)

  const { count: totalAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user?.id)

  const { count: completedAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user?.id)
    .eq("status", "completed")

  const { count: pendingInvoices } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user?.id)
    .eq("status", "pending")

  const stats = [
    {
      name: "Rendez-vous total",
      value: totalAppointments || 0,
      icon: Calendar,
    },
    {
      name: "Interventions terminées",
      value: completedAppointments || 0,
      icon: CheckCircle,
    },
    {
      name: "Factures en attente",
      value: pendingInvoices || 0,
      icon: FileText,
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Bonjour, {profile?.full_name || "Client"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Bienvenue sur votre espace client JBNet43
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Prochains rendez-vous</CardTitle>
              <CardDescription>Vos interventions planifiées</CardDescription>
            </div>
            <Link href="/dashboard/appointments">
              <Button variant="outline" size="sm">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {appointments && appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apt.services?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(apt.scheduled_date).toLocaleDateString("fr-FR")} à {apt.scheduled_time}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      apt.status === "confirmed" ? "bg-accent/10 text-accent" :
                      apt.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      apt.status === "completed" ? "bg-green-100 text-green-800" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {apt.status === "confirmed" ? "Confirmé" :
                       apt.status === "pending" ? "En attente" :
                       apt.status === "completed" ? "Terminé" :
                       apt.status === "cancelled" ? "Annulé" : apt.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Aucun rendez-vous planifié
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Factures en attente</CardTitle>
              <CardDescription>Factures à régler</CardDescription>
            </div>
            <Link href="/dashboard/invoices">
              <Button variant="outline" size="sm">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {invoices && invoices.length > 0 ? (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{invoice.invoice_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Échéance : {new Date(invoice.due_date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-foreground">
                      {Number(invoice.total_amount).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Aucune facture en attente
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
