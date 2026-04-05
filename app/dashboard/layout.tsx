import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Vérification de l'authentification
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // 2. Récupération du profil pour connaître le rôle
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // 3. Logique de redirection automatique
  // Si tu es admin et que tu n'es pas déjà dans la section /admin, on t'y envoie
  if (profile?.role === "admin") {
    // Cette redirection est correcte, mais assure-toi que tes pages admin 
    // n'utilisent PAS ce layout. Les pages admin doivent être dans /app/admin/
    redirect("/admin")
  }

  // 4. Affichage pour les CLIENTS uniquement
  return (
    <div className="flex min-h-screen">
      {/* On passe le profil au Sidebar pour qu'il affiche "Bonjour, [Nom]" */}
      <DashboardSidebar user={user} profile={profile} />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  )
}