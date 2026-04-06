import { createClient, createServiceClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Users, MessageSquare, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // 1. Vérification de sécurité pour s'assurer que l'utilisateur est bien ADMIN
  const { data: { user } } = await supabase.auth.getUser()

  // Lecture du profil sans restriction RLS pour garantir la vérification du rôle
  const serviceClient = createServiceClient()
  const { data: profile } = await serviceClient
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single()

  // Si l'utilisateur n'est pas admin, on le redirige (protection côté serveur)
  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  // 2. RÉCUPÉRATION DES STATISTIQUES RÉELLES
  const { count: totalClients } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "client")

  const { count: pendingAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: newQuotes } = await supabase
    .from("quote_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: pendingInvoices } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  // 3. RÉCUPÉRATION DES DONNÉES AVEC JOINTURES (Relations SQL)
  // On récupère le nom du service et les infos du profil client en une seule requête
  const { data: recentAppointments } = await supabase
    .from("appointments")
    .select(`
      *,
      services (name),
      profiles (first_name, last_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: recentQuotes } = await supabase
    .from("quote_requests")
    .select(`
      *,
      services (name),
      profiles (first_name, last_name)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    { name: "Clients", value: totalClients || 0, icon: Users, href: "/admin/clients" },
    { name: "RDV en attente", value: pendingAppointments || 0, icon: Calendar, href: "/admin/appointments" },
    { name: "Nouveaux devis", value: newQuotes || 0, icon: MessageSquare, href: "/admin/quotes" },
    { name: "Factures à traiter", value: pendingInvoices || 0, icon: FileText, href: "/admin/invoices" },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER AVEC ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord Admin</h1>
          <p className="text-muted-foreground">Bienvenue Jules, voici l&apos;état de JBNet43</p>
        </div>
        <Link href="/admin/appointments/new">
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" /> Créer un RDV manuel
          </Button>
        </Link>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
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
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SECTION RENDEZ-VOUS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Prochaines interventions</CardTitle>
              <CardDescription>Planification des jours à venir</CardDescription>
            </div>
            <Link href="/admin/appointments">
              <Button variant="outline" size="sm">Voir tout</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentAppointments && recentAppointments.length > 0 ? (
              <div className="space-y-4">
                {recentAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <div>
                      <p className="font-semibold text-foreground">
                        {apt.profiles?.first_name} {apt.profiles?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {apt.services?.name} — {new Date(apt.scheduled_date).toLocaleDateString("fr-FR")} à {apt.scheduled_time}
                      </p>
                      <p className="text-xs text-primary font-medium">{apt.address}</p>
                    </div>
                    <Link href={`/admin/appointments/${apt.id}`}>
                      <Button variant="ghost" size="sm">Détails</Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Aucun RDV prévu.</p>
            )}
          </CardContent>
        </Card>

        {/* SECTION DEVIS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Demandes de devis</CardTitle>
              <CardDescription>Nouveaux messages clients</CardDescription>
            </div>
            <Link href="/admin/quotes">
              <Button variant="outline" size="sm">Gérer</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentQuotes && recentQuotes.length > 0 ? (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-foreground">
                        {quote.profiles?.first_name} {quote.profiles?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Service : {quote.services?.name}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${quote.status === "pending" ? "bg-blue-100 text-blue-800" :
                        quote.status === "accepted" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                      }`}>
                      {quote.status === "pending" ? "Nouveau" : quote.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Aucune demande.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
