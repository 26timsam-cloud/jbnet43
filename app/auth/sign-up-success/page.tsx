import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <Card className="w-full shadow-lg text-center">
        <CardHeader>
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <CheckCircle className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Inscription réussie !</CardTitle>
          <CardDescription>
            Votre compte a été créé avec succès
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Mail className="h-5 w-5" />
              <span className="font-medium">Vérifiez votre email</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Un email de confirmation vous a été envoyé. Veuillez cliquer sur le lien 
              dans l&apos;email pour activer votre compte.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full">
                Se connecter
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </CardContent>
    </Card>
  )
}
