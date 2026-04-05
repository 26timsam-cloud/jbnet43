"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const serviceCategories = [
  { value: "office", label: "Nettoyage de Bureaux" },
  { value: "windows", label: "Nettoyage de Vitres" },
  { value: "home", label: "Ménage Résidentiel" },
  { value: "post_construction", label: "Fin de Chantier" },
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
      phone: formData.get("phone") as string,
      service_category: formData.get("service_category") as string,
      description: formData.get("description") as string,
      address: formData.get("address") as string,
      preferred_date: formData.get("preferred_date") as string || null,
    }

    const supabase = createClient()
    const { error: submitError } = await supabase
      .from("quote_requests")
      .insert(data)

    setIsSubmitting(false)

    if (submitError) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      return
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="devis" className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <Card className="border-accent/50">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Demande envoyée !</h3>
              <p className="mt-4 text-muted-foreground">
                Merci pour votre demande de devis. Notre équipe vous contactera sous 24h.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="devis" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Demandez un Devis Gratuit
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Remplissez le formulaire ci-dessous et recevez votre devis sous 24h.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulaire de devis</CardTitle>
            <CardDescription>
              Tous les champs marqués d&apos;un * sont obligatoires.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean@exemple.fr"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="04 00 00 00 00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service_category">Type de service *</Label>
                  <Select name="service_category" required>
                    <SelectTrigger>
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
                <Label htmlFor="address">Adresse d&apos;intervention</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Rue de la Paix, 43200 Yssingeaux"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_date">Date souhaitée</Label>
                <Input
                  id="preferred_date"
                  name="preferred_date"
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description de votre besoin *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez vos besoins en détail : surface, fréquence souhaitée, particularités..."
                  rows={4}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
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
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
