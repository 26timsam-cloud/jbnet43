"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Briefcase, Plus, Euro } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string | null
  price_per_hour: number | null
  category: string
  is_active: boolean
}

const categoryLabels: Record<string, string> = {
  office: "Bureaux",
  windows: "Vitres",
  home: "Résidentiel",
  post_construction: "Fin de chantier",
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [pricePerHour, setPricePerHour] = useState("")
  const [category, setCategory] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    setIsLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("category")
      .order("name")
    setServices(data || [])
    setIsLoading(false)
  }

  function openEditDialog(service: Service) {
    setEditingService(service)
    setName(service.name)
    setDescription(service.description || "")
    setPricePerHour(service.price_per_hour?.toString() || "")
    setCategory(service.category)
    setIsActive(service.is_active)
    setIsDialogOpen(true)
  }

  function openNewDialog() {
    setEditingService(null)
    resetForm()
    setIsDialogOpen(true)
  }

  function resetForm() {
    setName("")
    setDescription("")
    setPricePerHour("")
    setCategory("")
    setIsActive(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const serviceData = {
      name,
      description: description || null,
      price_per_hour: pricePerHour ? parseFloat(pricePerHour) : null,
      category,
      is_active: isActive,
    }

    if (editingService) {
      await supabase
        .from("services")
        .update(serviceData)
        .eq("id", editingService.id)
    } else {
      await supabase.from("services").insert(serviceData)
    }

    setIsSubmitting(false)
    setIsDialogOpen(false)
    resetForm()
    fetchServices()
  }

  async function toggleActive(id: string, currentActive: boolean) {
    const supabase = createClient()
    await supabase
      .from("services")
      .update({ is_active: !currentActive })
      .eq("id", id)
    fetchServices()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services</h1>
          <p className="mt-2 text-muted-foreground">
            Gérez vos services et tarifs
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Modifier le service" : "Nouveau service"}
              </DialogTitle>
              <DialogDescription>
                {editingService ? "Modifiez les informations du service" : "Ajoutez un nouveau service à votre catalogue"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Nom du service *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nettoyage de bureaux"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description du service..."
                  rows={3}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Prix par heure (€)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={pricePerHour}
                    onChange={(e) => setPricePerHour(e.target.value)}
                    placeholder="35.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Catégorie *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Bureaux</SelectItem>
                      <SelectItem value="windows">Vitres</SelectItem>
                      <SelectItem value="home">Résidentiel</SelectItem>
                      <SelectItem value="post_construction">Fin de chantier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Service actif</Label>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : editingService ? "Modifier" : "Créer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : services.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className={!service.is_active ? "opacity-60" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {categoryLabels[service.category]}
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={service.is_active}
                    onCheckedChange={() => toggleActive(service.id, service.is_active)}
                  />
                </div>
                {service.description && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  {service.price_per_hour ? (
                    <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                      <Euro className="h-4 w-4" />
                      {Number(service.price_per_hour).toFixed(2)}/h
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Sur devis</span>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(service)}>
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">Aucun service</h3>
            <p className="mt-2 text-muted-foreground">
              Commencez par créer vos services.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
