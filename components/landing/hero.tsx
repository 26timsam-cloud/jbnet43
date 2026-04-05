import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle } from "lucide-react"

const features = [
  "Devis gratuit sous 24h",
  "Équipe professionnelle",
  "Matériel écologique",
  "Satisfaction garantie",
]

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Services de nettoyage professionnel
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Votre partenaire propreté à{" "}
            <span className="text-primary">Yssingeaux</span>
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            JBNet43 vous accompagne dans tous vos besoins de nettoyage : bureaux, vitres, 
            domiciles et fins de chantier. Une équipe professionnelle à votre service 
            en Haute-Loire.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-foreground"
              >
                <CheckCircle className="h-4 w-4 text-accent" />
                {feature}
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#devis">
              <Button size="lg" className="min-w-[200px]">
                Demander un devis gratuit
              </Button>
            </a>
            <Link href="/auth/sign-up">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Créer un compte client
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
