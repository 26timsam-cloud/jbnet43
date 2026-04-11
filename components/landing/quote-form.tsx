"use client"

import { useState } from "react"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Send, Clock, ShieldCheck, Leaf } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const serviceCategories = [
  { value: "office", label: "Nettoyage de Bureaux" },
  { value: "windows", label: "Nettoyage de Vitres" },
  { value: "home", label: "Ménage Résidentiel" },
  { value: "post_construction", label: "Fin de Chantier" },
]

const perks = [
  { icon: Clock, text: "Réponse sous 24h garantie" },
  { icon: ShieldCheck, text: "Devis 100% gratuit et sans engagement" },
  { icon: Leaf, text: "Produits écologiques uniquement" },
  { icon: CheckCircle, text: "Équipe certifiée et assurée RC Pro" },
]

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || null,
      service_category: formData.get("service_category") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string || null,
      preferred_date: formData.get("preferred_date") as string || null,
      status: "new",
    }

    const supabase = createClient()
    const { error: submitError } = await supabase.from("quote_requests").insert(data)

    setIsSubmitting(false)

    if (submitError) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      return
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="devis" className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.005 255)" }}>
        <div className="mx-auto max-w-xl px-4">
          <div
            className="rounded-3xl p-12 text-center"
            style={{
              background: "white",
              border: "1px solid oklch(0.90 0.01 255)",
              boxShadow: "0 8px 40px oklch(0 0 0 / 0.08)",
            }}
          >
            <div
              className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full animate-scale-in"
              style={{ background: "oklch(0.55 0.18 145 / 0.12)" }}
            >
              <CheckCircle className="h-10 w-10" style={{ color: "oklch(0.55 0.18 145)" }} />
            </div>
            <h3 className="text-2xl font-black" style={{ color: "oklch(0.20 0.05 255)" }}>
              Demande envoyée !
            </h3>
            <p className="mt-4 text-muted-foreground">
              Merci pour votre demande de devis. Notre équipe vous contactera sous 24h.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="devis" className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.005 255)" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <Reveal className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.55 0.18 145)" }}>
            Gratuit &amp; sans engagement
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ color: "oklch(0.20 0.05 255)" }}>
            Demandez un Devis
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Remplissez le formulaire et recevez votre devis sous 24h.
          </p>
        </Reveal>

        <Reveal delay={100}>
        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* Left panel */}
          <div
            className="lg:col-span-2 rounded-3xl p-8 flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, oklch(0.22 0.14 255) 0%, oklch(0.28 0.11 260) 100%)",
            }}
          >
            <div>
              <h3 className="text-2xl font-black mb-2" style={{ color: "oklch(0.98 0 0)" }}>
                Pourquoi nous choisir ?
              </h3>
              <p className="text-sm mb-8" style={{ color: "oklch(0.75 0.04 255)" }}>
                Plus de 4 ans d&apos;expérience en Haute-Loire.
              </p>
              <ul className="space-y-5">
                {perks.map((perk) => (
                  <li key={perk.text} className="flex items-start gap-3">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "oklch(0.55 0.18 145 / 0.20)", border: "1px solid oklch(0.55 0.18 145 / 0.25)" }}
                    >
                      <perk.icon className="h-4 w-4" style={{ color: "oklch(0.75 0.18 145)" }} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: "oklch(0.82 0.03 255)" }}>
                      {perk.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="mt-10 rounded-2xl p-5"
              style={{ background: "oklch(1 0 0 / 0.06)", border: "1px solid oklch(1 0 0 / 0.10)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "oklch(0.72 0.18 145)" }}>
                Appel direct
              </p>
              <a href="tel:+33788429319" className="text-xl font-black" style={{ color: "oklch(0.98 0 0)" }}>
                07 88 42 93 19
              </a>
              <p className="text-xs mt-1" style={{ color: "oklch(0.65 0.04 255)" }}>
                Lun–Ven 8h–18h · Sam sur RDV
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="lg:col-span-3 rounded-3xl p-8"
            style={{
              background: "white",
              border: "1px solid oklch(0.90 0.01 255)",
              boxShadow: "0 4px 32px oklch(0 0 0 / 0.06)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Nom complet *</Label>
                  <Input id="name" name="name" placeholder="Jean Dupont" required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="jean@exemple.fr" required className="rounded-xl" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">Téléphone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="07 00 00 00 00" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_category" className="text-sm font-semibold">Type de service *</Label>
                  <Select name="service_category" required>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold">Adresse d&apos;intervention</Label>
                <Input id="address" name="address" placeholder="123 Rue de la Paix, 43200 Yssingeaux" className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_date" className="text-sm font-semibold">Date souhaitée</Label>
                <Input id="preferred_date" name="preferred_date" type="date" className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">Description de votre besoin *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez vos besoins : surface, fréquence souhaitée, particularités..."
                  rows={4}
                  required
                  className="rounded-xl resize-none"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-base card-shine"
                disabled={isSubmitting}
                style={{ background: "linear-gradient(135deg, oklch(0.35 0.12 255) 0%, oklch(0.48 0.15 255) 100%)", color: "white", border: "none" }}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer ma demande
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
