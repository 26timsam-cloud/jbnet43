"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Mail, Phone, MapPin, Calendar } from "lucide-react"

interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string | null
  service_category: string
  description: string
  preferred_date: string | null
  address: string | null
  status: string
  admin_notes: string | null
  created_at: string
}

const categoryLabels: Record<string, string> = {
  office: "Nettoyage de Bureaux",
  windows: "Nettoyage de Vitres",
  home: "Ménage Résidentiel",
  post_construction: "Fin de Chantier",
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue] = useState("")

  useEffect(() => {
    fetchQuotes()
  }, [filter])

  async function fetchQuotes() {
    setIsLoading(true)
    const supabase = createClient()
    let query = supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (filter !== "all") {
      query = query.eq("status", filter)
    }

    const { data } = await query
    setQuotes(data || [])
    setIsLoading(false)
  }

  async function updateStatus(id: string, newStatus: string) {
    const supabase = createClient()
    await supabase
      .from("quote_requests")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id)
    
    fetchQuotes()
  }

  async function saveNotes(id: string) {
    const supabase = createClient()
    await supabase
      .from("quote_requests")
      .update({ admin_notes: notesValue, updated_at: new Date().toISOString() })
      .eq("id", id)
    
    setEditingNotes(null)
    fetchQuotes()
  }

  const statusLabels: Record<string, { label: string; className: string }> = {
    new: { label: "Nouveau", className: "bg-blue-100 text-blue-800" },
    contacted: { label: "Contacté", className: "bg-yellow-100 text-yellow-800" },
    quoted: { label: "Devisé", className: "bg-purple-100 text-purple-800" },
    accepted: { label: "Accepté", className: "bg-green-100 text-green-800" },
    rejected: { label: "Refusé", className: "bg-red-100 text-red-800" },
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Demandes de devis</h1>
          <p className="mt-2 text-muted-foreground">
            Gérez les demandes de devis reçues
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="new">Nouveau</SelectItem>
            <SelectItem value="contacted">Contacté</SelectItem>
            <SelectItem value="quoted">Devisé</SelectItem>
            <SelectItem value="accepted">Accepté</SelectItem>
            <SelectItem value="rejected">Refusé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : quotes.length > 0 ? (
        <div className="grid gap-4">
          {quotes.map((quote) => {
            const status = statusLabels[quote.status] || { label: quote.status, className: "bg-muted text-muted-foreground" }
            return (
              <Card key={quote.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{quote.name}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.className}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-primary mb-2">
                            {categoryLabels[quote.service_category]}
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <a href={`mailto:${quote.email}`} className="hover:text-primary">
                                {quote.email}
                              </a>
                            </div>
                            {quote.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a href={`tel:${quote.phone}`} className="hover:text-primary">
                                  {quote.phone}
                                </a>
                              </div>
                            )}
                            {quote.address && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {quote.address}
                              </div>
                            )}
                            {quote.preferred_date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Souhaité : {new Date(quote.preferred_date).toLocaleDateString("fr-FR")}
                              </div>
                            )}
                          </div>
                          <div className="bg-muted p-3 rounded-lg mb-3">
                            <p className="text-sm text-foreground">{quote.description}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Reçu le {new Date(quote.created_at).toLocaleDateString("fr-FR")} à{" "}
                            {new Date(quote.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          
                          {editingNotes === quote.id ? (
                            <div className="mt-4 space-y-2">
                              <Textarea
                                value={notesValue}
                                onChange={(e) => setNotesValue(e.target.value)}
                                placeholder="Notes internes..."
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => saveNotes(quote.id)}>
                                  Enregistrer
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingNotes(null)}>
                                  Annuler
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4">
                              {quote.admin_notes ? (
                                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                  <p className="text-sm text-yellow-800">{quote.admin_notes}</p>
                                </div>
                              ) : null}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="mt-2"
                                onClick={() => {
                                  setEditingNotes(quote.id)
                                  setNotesValue(quote.admin_notes || "")
                                }}
                              >
                                {quote.admin_notes ? "Modifier les notes" : "Ajouter des notes"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quote.status === "new" && (
                        <Button size="sm" onClick={() => updateStatus(quote.id, "contacted")}>
                          Marquer contacté
                        </Button>
                      )}
                      {quote.status === "contacted" && (
                        <Button size="sm" onClick={() => updateStatus(quote.id, "quoted")}>
                          Devis envoyé
                        </Button>
                      )}
                      {quote.status === "quoted" && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(quote.id, "accepted")}>
                            Accepté
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(quote.id, "rejected")}>
                            Refusé
                          </Button>
                        </>
                      )}
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
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">Aucune demande</h3>
            <p className="mt-2 text-muted-foreground">
              Aucune demande de devis ne correspond à vos critères.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
