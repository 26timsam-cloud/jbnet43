import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, AlertCircle, CheckCircle } from "lucide-react"

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", user?.id)
    .order("created_at", { ascending: false })

  const statusLabels: Record<string, { label: string; className: string; icon: typeof CheckCircle }> = {
    pending: { label: "En attente", className: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
    paid: { label: "Payée", className: "bg-green-100 text-green-800", icon: CheckCircle },
    overdue: { label: "En retard", className: "bg-red-100 text-red-800", icon: AlertCircle },
    cancelled: { label: "Annulée", className: "bg-muted text-muted-foreground", icon: AlertCircle },
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Mes factures</h1>
        <p className="mt-2 text-muted-foreground">
          Historique de vos factures
        </p>
      </div>

      {invoices && invoices.length > 0 ? (
        <div className="grid gap-4">
          {invoices.map((invoice) => {
            const status = statusLabels[invoice.status] || { label: invoice.status, className: "bg-muted text-muted-foreground", icon: AlertCircle }
            const StatusIcon = status.icon
            return (
              <Card key={invoice.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{invoice.invoice_number}</h3>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Créée le {new Date(invoice.created_at).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4" />
                            Échéance : {new Date(invoice.due_date).toLocaleDateString("fr-FR")}
                          </div>
                          {invoice.paid_date && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              Payée le {new Date(invoice.paid_date).toLocaleDateString("fr-FR")}
                            </div>
                          )}
                        </div>
                        {invoice.notes && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {invoice.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${status.className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          HT : {Number(invoice.amount).toFixed(2)} €
                        </p>
                        <p className="text-sm text-muted-foreground">
                          TVA : {Number(invoice.tax_amount).toFixed(2)} €
                        </p>
                        <p className="text-xl font-bold text-foreground">
                          {Number(invoice.total_amount).toFixed(2)} €
                        </p>
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
              Vous n&apos;avez pas encore de facture.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
