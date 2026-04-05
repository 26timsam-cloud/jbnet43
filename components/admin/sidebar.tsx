"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Briefcase,
} from "lucide-react"

interface Profile {
  id: string
  full_name: string | null
  email: string
  role: string
}

interface AdminSidebarProps {
  user: User
  profile: Profile | null
}

const navigation = [
  { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { name: "Rendez-vous", href: "/admin/appointments", icon: Calendar },
  { name: "Demandes de devis", href: "/admin/quotes", icon: MessageSquare },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Factures", href: "/admin/invoices", icon: FileText },
  { name: "Services", href: "/admin/services", icon: Briefcase },
]

export function AdminSidebar({ user, profile }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 flex h-16 w-full items-center gap-4 border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <button
          type="button"
          className="text-sidebar-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="text-xl font-bold text-sidebar-foreground">JBNet43 Admin</span>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-sidebar">
            <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
              <span className="text-xl font-bold text-sidebar-foreground">JBNet43</span>
              <button
                type="button"
                className="text-sidebar-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
              <div className="mb-4 px-3">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {profile?.full_name || user.email}
                </p>
                <p className="text-xs text-sidebar-foreground/60">Administrateur</p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <Link href="/admin" className="text-xl font-bold text-sidebar-foreground">
            JBNet43 Admin
          </Link>
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="mb-4 px-3">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {profile?.full_name || user.email}
            </p>
            <p className="text-xs text-sidebar-foreground/60">Administrateur</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden lg:block lg:w-72 lg:flex-shrink-0" />
      {/* Spacer for mobile */}
      <div className="h-16 lg:hidden" />
    </>
  )
}
