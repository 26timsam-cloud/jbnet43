import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle } from "lucide-react"

const features = [
  "Devis gratuit sous 24h",
  "Équipe professionnelle",
  "Matériel écologique",
  "Satisfaction garantie",
]

// Bulles savonneuses — tailles, positions et vitesses variées
const bubbles = [
  { size: 18, left: "8%",  duration: "5.5s", delay: "0s",   opacity: 0.7 },
  { size: 11, left: "18%", duration: "4.2s", delay: "1.3s", opacity: 0.5 },
  { size: 24, left: "30%", duration: "6.8s", delay: "0.5s", opacity: 0.6 },
  { size: 9,  left: "44%", duration: "3.9s", delay: "2.1s", opacity: 0.5 },
  { size: 16, left: "57%", duration: "5.1s", delay: "0.8s", opacity: 0.65 },
  { size: 13, left: "68%", duration: "4.7s", delay: "1.8s", opacity: 0.5 },
  { size: 20, left: "78%", duration: "6.2s", delay: "0.3s", opacity: 0.6 },
  { size: 8,  left: "88%", duration: "3.6s", delay: "2.5s", opacity: 0.45 },
  { size: 14, left: "93%", duration: "5.8s", delay: "1.0s", opacity: 0.55 },
]

export function Hero() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      {/* Fond gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Bulles savonneuses flottantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="soap-bubble"
            style={{
              width:  b.size,
              height: b.size,
              left:   b.left,
              animationDuration: b.duration,
              animationDelay:    b.delay,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="animate-fade-up delay-0 mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
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
