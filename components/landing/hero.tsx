import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle } from "lucide-react"

const features = [
  "Devis gratuit sous 24h",
  "Équipe professionnelle",
  "Matériel écologique",
  "Satisfaction garantie",
]

// Positions fixes pour les étincelles décoratives (évite l'hydration mismatch)
const sparkles = [
  { top: "15%", left: "8%",  size: "h-4 w-4", delay: "delay-0",   opacity: "text-primary/25" },
  { top: "30%", right: "6%", size: "h-3 w-3", delay: "delay-300", opacity: "text-accent/30" },
  { top: "60%", left: "5%",  size: "h-3 w-3", delay: "delay-500", opacity: "text-primary/20" },
  { top: "20%", right: "12%",size: "h-5 w-5", delay: "delay-200", opacity: "text-accent/20" },
  { top: "70%", right: "8%", size: "h-3 w-3", delay: "delay-400", opacity: "text-primary/15" },
]

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      {/* Fond gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Étincelles flottantes décoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {sparkles.map((s, i) => (
          <div
            key={i}
            className={`absolute animate-float ${s.delay}`}
            style={{ top: s.top, left: s.left, right: s.right }}
          >
            <Sparkles className={`${s.size} ${s.opacity} animate-sparkle-spin ${s.delay}`} />
          </div>
        ))}
        {/* Bulles légères */}
        <div className="absolute bottom-12 left-[20%] h-24 w-24 rounded-full bg-primary/5 animate-float delay-200" />
        <div className="absolute top-16 right-[25%] h-16 w-16 rounded-full bg-accent/5 animate-float delay-500" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="animate-fade-up delay-0 mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4 animate-sparkle-spin" />
            Services de nettoyage professionnel
          </div>

          {/* Titre */}
          <h1 className="animate-fade-up delay-100 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Votre partenaire propreté à{" "}
            <span className="text-primary">Yssingeaux</span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up delay-200 mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
            JBNet43 vous accompagne dans tous vos besoins de nettoyage : bureaux, vitres,
            domiciles et fins de chantier. Une équipe professionnelle à votre service
            en Haute-Loire.
          </p>

          {/* Badges features */}
          <div className="animate-fade-up delay-300 mt-8 flex flex-wrap justify-center gap-3">
            {features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-foreground"
              >
                <CheckCircle className="h-4 w-4 text-accent" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-400 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#devis" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:min-w-[200px] card-shine shadow-md hover:shadow-lg transition-shadow">
                Demander un devis gratuit
              </Button>
            </a>
            <Link href="/auth/sign-up" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:min-w-[200px] card-shine hover:shadow-md transition-shadow">
                Créer un compte client
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
