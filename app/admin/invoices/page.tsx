"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Calendar, Plus, User } from "lucide-react"

interface Invoice {
  id: string
  invoice_number: string
  amount: number
  tax_amount: number
  total_amount: number
  status: string
  due_date: string
  paid_date: string | null
  notes: string | null
  created_at: string
  profiles: { full_name: string | null; email: string } | null
}

interface Client {
  id: string
  full_name: string | null
  email: string
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // New invoice form
  const [selectedClient, setSelectedClient] = useState("")
  const [amount, setAmount] = useState("")
  const [taxRate, setTaxRate] = useState("20")
  const [dueDate, setDueDate] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchInvoices()
    fetchClients()
  }, [filter])

  async function fetchInvoices() {
    setIsLoading(true)
    const supabase = createClient()
    let query = supabase
      .from("invoices")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })

    if (filter !== "all") {
      query = query.eq("status", filter)
    }

    const { data } = await query
    setInvoices(data || [])
    setIsLoading(false)
  }

  async function fetchClients() {
    const supabase = createClient()
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("role", "client")
      .order("full_name")
    setClients(data || [])
  }

  async function updateStatus(id: string, newStatus: string) {
    const supabase = createClient()
    const updates: Record<string, string | null> = {
      status: newStatus,
      updated_at: new Date().toISOString(),
    }
    if (newStatus === "paid") {
      updates.paid_date = new Date().toISOString().split("T")[0]
    }
    await supabase.from("invoices").update(updates).eq("id", id)
    fetchInvoices()
  }

  async function createInvoice(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const amountNum = parseFloat(amount)
    const taxAmount = amountNum * (parseFloat(taxRate) / 100)
    const totalAmount = amountNum + taxAmount

    // Generate invoice number
    const invoiceNumber = `JBN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    const supabase = createClient()
    await supabase.from("invoices").insert({
      client_id: selectedClient,
      invoice_number: invoiceNumber,
      amount: amountNum,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      due_date: dueDate,
      notes: notes || null,
      status: "pending",
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
    resetForm()
    fetchInvoices()
  }

  function resetForm() {
    setSelectedClient("")
    setAmount("")
    setTaxRate("20")
    setDueDate("")
    setNotes("")
  }

  const statusLabels: Record<string, { label: string; className: string }> = {
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800" },
    paid: { label: "Payée", className: "bg-green-100 text-green-800" },
    overdue: { label: "En retard", className: "bg-red-100 text-red-800" },
    cancelled: { label: "Annulée", className: "bg-muted text-muted-foreground" },
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Factures</h1>
          <p className="mt-2 text-muted-foreground">
            Gérez les factures clients
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="paid">Payée</SelectItem>
              <SelectItem value="overdue">En retard</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle facture
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une facture</DialogTitle>
                <DialogDescription>
                  Créez une nouvelle facture pour un client
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={createInvoice} className="space-y-4">
                <div className="space-y-2">
                  <Label>Client *</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.full_name || client.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Montant HT (€) *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>TVA (%)</Label>
                    <Select value={taxRate} onValueChange={setTaxRate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="5.5">5.5%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date d&apos;échéance *</Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes optionnelles..."
                  />
                </div>
                {amount && (
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    <div className="flex justify-between">
                      <span>HT:</span>
                      <span>{parseFloat(amount || "0").toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA ({taxRate}%):</span>
                      <span>{(parseFloat(amount || "0") * parseFloat(taxRate) / 100).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between font-medium border-t border-border pt-2 mt-2">
                      <span>Total TTC:</span>
                      <span>{(parseFloat(amount || "0") * (1 + parseFloat(taxRate) / 100)).toFixed(2)} €</span>
                    </div>
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Création..." : "Créer la facture"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : invoices.length > 0 ? (
        <div className="grid gap-4">
          {invoices.map((invoice) => {
            const status = statusLabels[invoice.status] || { label: invoice.status, className: "bg-muted text-muted-foreground" }
            return (
              <Card key={invoice.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{invoice.invoice_number}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.className}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {invoice.profiles?.full_name || invoice.profiles?.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Échéance : {new Date(invoice.due_date).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                        {invoice.notes && (
                          <p className="mt-2 text-sm text-muted-foreground">{invoice.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          HT : {Number(invoice.amount).toFixed(2)} € | TVA : {Number(invoice.tax_amount).toFixed(2)} €
                        </p>
                        <p className="text-xl font-bold text-foreground">
                          {Number(invoice.total_amount).toFixed(2)} €
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {invoice.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => updateStatus(invoice.id, "paid")}>
                              Marquer payée
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(invoice.id, "overdue")}>
                              En retard
                            </Button>
                          </>
                        )}
                        {invoice.status === "overdue" && (
                          <Button size="sm" onClick={() => updateStatus(invoice.id, "paid")}>
                            Marquer payée
                          </Button>
                        )}
                      </div>
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
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">Aucune facture</h3>
            <p className="mt-2 text-muted-foreground">
              Aucune facture ne correspond à vos critères.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
