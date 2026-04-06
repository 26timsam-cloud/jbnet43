"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError("Email ou mot de passe incorrect.")
      setIsLoading(false)
      return
    }

    if (data?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      router.refresh()
      router.push(profile?.role === "admin" ? "/admin" : "/dashboard")
    }
  }

  /* ── Animation de connexion (remplace le formulaire) ── */
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-16 gap-6">
          {/* Spinner + reflet vitre */}
          <div className="relative h-20 w-20">
            {/* Cercle extérieur tournant */}
            <div
              className="absolute inset-0 rounded-full border-4 border-primary/20"
              style={{ borderTopColor: "oklch(0.35 0.12 255)", animation: "spin-smooth 1s linear infinite" }}
            />
            {/* Cercle intérieur tournant inverse */}
            <div
              className="absolute inset-3 rounded-full border-2 border-accent/30"
              style={{ borderBottomColor: "oklch(0.55 0.18 145)", animation: "spin-smooth 0.7s linear infinite reverse" }}
            />
            {/* Lettre centrale */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">J</span>
            </div>
          </div>

          {/* Texte animé */}
          <div className="text-center space-y-1">
            <p className="font-semibold text-foreground">Connexion en cours</p>
            <p className="text-sm text-muted-foreground">Préparation de votre espace…</p>
          </div>

          {/* Barre de progression */}
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ animation: "glass-shine 1.5s ease-in-out infinite", width: "100%" }}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  /* ── Formulaire normal ── */
  return (
    <Card className="w-full shadow-lg animate-fade-up delay-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Connectez-vous à votre compte JBNet43
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full card-shine">
            Se connecter
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Pas encore de compte ?</span>{" "}
          <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
            Créer un compte
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Retour à l&apos;accueil
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
