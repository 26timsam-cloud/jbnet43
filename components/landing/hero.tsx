import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const features = [
  "Devis gratuit sous 24h",
  "Équipe professionnelle",
  "Matériel écologique",
  "Satisfaction garantie",
]

// Bulles savonneuses — tailles et positions variées pour remplir tout le fond
const bubbles = [
  { size: 42, left: "5%",  duration: "7.2s", delay: "0s",   opacity: 0.55 },
  { size: 18, left: "12%", duration: "5.1s", delay: "1.4s", opacity: 0.40 },
  { size: 65, left: "20%", duration: "9.5s", delay: "0.3s", opacity: 0.45 },
  { size: 28, left: "32%", duration: "6.3s", delay: "2.7s", opacity: 0.50 },
  { size: 14, left: "41%", duration: "4.8s", delay: "0.9s", opacity: 0.35 },
  { size: 55, left: "50%", duration: "8.4s", delay: "1.8s", opacity: 0.40 },
  { size: 22, left: "60%", duration: "5.9s", delay: "0.5s", opacity: 0.45 },
  { size: 78, left: "68%", duration: "11s",  delay: "3.1s", opacity: 0.30 },
  { size: 35, left: "76%", duration: "7.7s", delay: "1.2s", opacity: 0.50 },
  { size: 16, left: "83%", duration: "4.5s", delay: "0s",   opacity: 0.40 },
  { size: 48, left: "90%", duration: "8.1s", delay: "2.0s", opacity: 0.45 },
  { size: 12, left: "96%", duration: "4.2s", delay: "1.6s", opacity: 0.35 },
]

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ background: "linear-gradient(135deg, oklch(0.25 0.14 255) 0%, oklch(0.30 0.12 255) 55%, oklch(0.22 0.10 255) 100%)" }}
    >
      {/* Reflet lumineux en haut à droite */}
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(1 0 0 / 0.08) 0%, transparent 70%)" }}
      />
      {/* Reflet en bas à gauche */}
      <div
        className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.15) 0%, transparent 70%)" }}
      />

      {/* Bulles savonneuses */}
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

      {/* Contenu */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div
            className="animate-fade-up delay-0 mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
            style={{ background: "oklch(1 0 0 / 0.12)", color: "oklch(0.92 0.02 255)", border: "1px solid oklch(1 0 0 / 0.20)" }}
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Services de nettoyage professionnel — Haute-Loire
          </div>

          {/* Titre */}
          <h1 className="animate-fade-up delay-100 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance" style={{ color: "oklch(0.98 0 0)" }}>
            Votre partenaire propreté à{" "}
            <span style={{ color: "oklch(0.82 0.15 145)" }}>Yssingeaux</span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up delay-200 mt-6 text-lg leading-relaxed text-pretty" style={{ color: "oklch(0.85 0.02 255)" }}>
            JBNet43 vous accompagne dans tous vos besoins de nettoyage : bureaux, vitres,
            domiciles et fins de chantier. Une équipe professionnelle à votre service
            en Haute-Loire.
          </p>

          {/* Badges features */}
          <div className="animate-fade-up delay-300 mt-8 flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{ background: "oklch(1 0 0 / 0.10)", color: "oklch(0.95 0 0)", border: "1px solid oklch(1 0 0 / 0.18)" }}
              >
                <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "oklch(0.72 0.18 145)" }} />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-400 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#devis" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:min-w-[220px] card-shine font-semibold shadow-lg"
                style={{ background: "oklch(0.55 0.18 145)", color: "oklch(1 0 0)", border: "none" }}
              >
                Demander un devis gratuit
              </Button>
            </a>
            <Link href="/auth/sign-up" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:min-w-[220px] card-shine font-semibold"
                style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.98 0 0)", borderColor: "oklch(1 0 0 / 0.35)" }}
              >
                Créer un compte client
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* Vague SVG de transition vers le blanc */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="oklch(0.985 0 0)"
          />
        </svg>
      </div>
    </section>
  )
}
