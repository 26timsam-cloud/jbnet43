import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Erreur d&apos;authentification</CardTitle>
          <CardDescription>
            Une erreur est survenue lors de la connexion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Le lien de confirmation a peut-être expiré ou a déjà été utilisé. 
            Veuillez réessayer de vous connecter ou créer un nouveau compte.
          </p>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full">
                Se connecter
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="outline" className="w-full">
                Créer un nouveau compte
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
