import Link from "next/link"
import { Sparkles, CheckCircle } from "lucide-react"

const features = [
  "Devis gratuit sous 24h",
  "Équipe professionnelle certifiée",
  "Produits 100% écologiques",
  "Satisfaction garantie",
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Panneau gauche — branding */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="h-6 w-6" />
          JBNet43
        </Link>

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Services de nettoyage professionnel à Yssingeaux
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Gérez vos interventions, suivez vos factures et réservez en ligne depuis votre espace client.
          </p>
          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary-foreground/70 flex-shrink-0" />
                <span className="text-primary-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} JBNet43 — Haute-Loire
        </p>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex flex-col items-center justify-center bg-secondary/20 px-4 py-12 min-h-screen lg:min-h-0">
        {/* Logo mobile uniquement */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-xl font-bold text-primary">JBNet43</span>
        </Link>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
