"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  price_per_hour: number
  category: string
}

export default function BookingPage() {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("2")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("services")
        .select("id, name, description, price_per_hour, category")
        .eq("is_active", true)
        .order("name")
      if (error) console.error("Services fetch error:", error)
      if (data) setServices(data)
    }
    fetchServices()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError("Vous devez être connecté pour réserver.")
      setIsLoading(false)
      return
    }

    const selectedServiceData = services.find(s => s.id === selectedService)
    const totalPrice = selectedServiceData 
      ? selectedServiceData.price_per_hour * parseFloat(duration)
      : 0

    const { error: insertError } = await supabase
      .from("appointments")
      .insert({
        client_id: user.id,
        service_id: selectedService,
        scheduled_date: date,
        scheduled_time: time,
        duration_hours: parseFloat(duration),
        address: address,
        notes: notes,
        total_price: totalPrice,
        status: "pending",
      })

    setIsLoading(false)

    if (insertError) {
      setError("Une erreur est survenue. Veuillez réessayer.")
      return
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Réservation envoyée !</h3>
            <p className="mt-4 text-muted-foreground">
              Votre demande de réservation a été enregistrée. 
              Nous vous contacterons pour confirmer le rendez-vous.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push("/dashboard/appointments")}>
                Voir mes rendez-vous
              </Button>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Nouvelle réservation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedServiceData = services.find(s => s.id === selectedService)
  const estimatedPrice = selectedServiceData 
    ? (selectedServiceData.price_per_hour * parseFloat(duration || "0")).toFixed(2)
    : "0.00"

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Réserver une intervention</h1>
        <p className="mt-2 text-muted-foreground">
          Planifiez votre prochaine intervention de nettoyage
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouvelle réservation</CardTitle>
          <CardDescription>
            Remplissez les informations ci-dessous pour réserver
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Select value={selectedService} onValueChange={setSelectedService} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {service.price_per_hour}€/h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedServiceData && (
                <p className="text-sm text-muted-foreground">
                  {selectedServiceData.description}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Heure *</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée estimée (heures) *</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 heure</SelectItem>
                  <SelectItem value="2">2 heures</SelectItem>
                  <SelectItem value="3">3 heures</SelectItem>
                  <SelectItem value="4">4 heures</SelectItem>
                  <SelectItem value="5">5 heures</SelectItem>
                  <SelectItem value="6">6 heures</SelectItem>
                  <SelectItem value="8">8 heures (journée)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse d&apos;intervention *</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Rue de la Paix, 43200 Yssingeaux"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes ou instructions</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Informations complémentaires, accès, code d'entrée..."
                rows={3}
              />
            </div>

            {selectedService && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Prix estimé :</span>
                  <span className="text-xl font-bold text-primary">{estimatedPrice} €</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Le prix final sera confirmé après validation du rendez-vous
                </p>
              </div>
            )}

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Confirmer la réservation"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
