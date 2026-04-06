import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const features = [
  "Devis gratuit sous 24h",
  "Équipe professionnelle",
  "Matériel écologique",
  "Satisfaction garantie",
]

const bubbles = [
  { size: 46,  left: "4%",  riseDuration: "7.5s",  wobbleDuration: "2.9s", delay: "0s",   opacity: 0.82 },
  { size: 22,  left: "11%", riseDuration: "5.2s",  wobbleDuration: "2.1s", delay: "1.5s", opacity: 0.75 },
  { size: 70,  left: "19%", riseDuration: "10.5s", wobbleDuration: "3.6s", delay: "0.4s", opacity: 0.70 },
  { size: 32,  left: "28%", riseDuration: "6.8s",  wobbleDuration: "2.5s", delay: "2.9s", opacity: 0.78 },
  { size: 17,  left: "38%", riseDuration: "5.0s",  wobbleDuration: "1.9s", delay: "1.0s", opacity: 0.70 },
  { size: 58,  left: "47%", riseDuration: "9.0s",  wobbleDuration: "3.2s", delay: "1.9s", opacity: 0.65 },
  { size: 26,  left: "57%", riseDuration: "6.2s",  wobbleDuration: "2.3s", delay: "0.6s", opacity: 0.72 },
  { size: 82,  left: "66%", riseDuration: "12.0s", wobbleDuration: "4.1s", delay: "3.2s", opacity: 0.60 },
  { size: 40,  left: "74%", riseDuration: "8.2s",  wobbleDuration: "3.0s", delay: "1.3s", opacity: 0.78 },
  { size: 19,  left: "82%", riseDuration: "4.8s",  wobbleDuration: "2.0s", delay: "0.2s", opacity: 0.70 },
  { size: 52,  left: "89%", riseDuration: "8.7s",  wobbleDuration: "3.4s", delay: "2.1s", opacity: 0.65 },
  { size: 14,  left: "95%", riseDuration: "4.4s",  wobbleDuration: "1.7s", delay: "1.7s", opacity: 0.68 },
]

/* SVG bulle réaliste avec dégradés radiaux précis — unique gradient IDs par bulle */
function BubbleSVG({ uid }: { uid: number }) {
  const p = `bbl${uid}`
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        {/* Corps quasi-transparent avec très légère teinte bleue */}
        <radialGradient id={`${p}-body`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgb(230,240,255)" stopOpacity="0.04" />
          <stop offset="75%"  stopColor="rgb(210,225,255)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="rgb(190,210,255)" stopOpacity="0.10" />
        </radialGradient>

        {/* Grand reflet blanc principal — haut gauche */}
        <radialGradient id={`${p}-hl1`} cx="31%" cy="26%" r="33%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.96" />
          <stop offset="30%"  stopColor="white" stopOpacity="0.75" />
          <stop offset="60%"  stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Reflet secondaire — bas droite */}
        <radialGradient id={`${p}-hl2`} cx="67%" cy="70%" r="16%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.58" />
          <stop offset="50%"  stopColor="white" stopOpacity="0.20" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Iridescence rose/rose-vif — haut droite */}
        <radialGradient id={`${p}-pink`} cx="78%" cy="20%" r="50%">
          <stop offset="0%"   stopColor="rgb(255,148,200)" stopOpacity="0.58" />
          <stop offset="50%"  stopColor="rgb(255,175,218)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent"       stopOpacity="0" />
        </radialGradient>

        {/* Iridescence violette — gauche */}
        <radialGradient id={`${p}-purple`} cx="13%" cy="50%" r="44%">
          <stop offset="0%"   stopColor="rgb(195,145,255)" stopOpacity="0.52" />
          <stop offset="50%"  stopColor="rgb(212,168,255)" stopOpacity="0.20" />
          <stop offset="100%" stopColor="transparent"       stopOpacity="0" />
        </radialGradient>

        {/* Iridescence cyan/bleu-vert — bas */}
        <radialGradient id={`${p}-cyan`} cx="50%" cy="94%" r="50%">
          <stop offset="0%"   stopColor="rgb(100,215,255)" stopOpacity="0.50" />
          <stop offset="40%"  stopColor="rgb(140,255,210)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="transparent"       stopOpacity="0" />
        </radialGradient>

        {/* Bordure irisée linéaire rose → violet → cyan */}
        <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgb(255,168,215)" stopOpacity="0.80" />
          <stop offset="35%"  stopColor="rgb(195,145,255)" stopOpacity="0.68" />
          <stop offset="65%"  stopColor="rgb(108,192,255)" stopOpacity="0.62" />
          <stop offset="100%" stopColor="rgb(138,255,200)" stopOpacity="0.48" />
        </linearGradient>

        <clipPath id={`${p}-clip`}>
          <circle cx="50" cy="50" r="48.5" />
        </clipPath>
      </defs>

      {/* Corps principal avec bordure irisée */}
      <circle
        cx="50" cy="50" r="48.5"
        fill={`url(#${p}-body)`}
        stroke={`url(#${p}-rim)`}
        strokeWidth="1.8"
      />

      {/* Couches irisées + reflets à l'intérieur */}
      <g clipPath={`url(#${p}-clip)`}>
        <circle cx="50" cy="50" r="48.5" fill={`url(#${p}-pink)`} />
        <circle cx="50" cy="50" r="48.5" fill={`url(#${p}-purple)`} />
        <circle cx="50" cy="50" r="48.5" fill={`url(#${p}-cyan)`} />
        <circle cx="50" cy="50" r="48.5" fill={`url(#${p}-hl1)`} />
        <circle cx="50" cy="50" r="48.5" fill={`url(#${p}-hl2)`} />
      </g>
    </svg>
  )
}

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ background: "linear-gradient(135deg, oklch(0.25 0.14 255) 0%, oklch(0.30 0.12 255) 55%, oklch(0.22 0.10 255) 100%)" }}
    >
      {/* Lueurs d'ambiance */}
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(1 0 0 / 0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.12) 0%, transparent 70%)" }}
      />

      {/* Bulles savonneuses SVG — riser (Y) + wobble (X+scale) séparés */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {bubbles.map((b, i) => (
          <div
            key={i}
            className="bubble-riser"
            style={{
              left: b.left,
              animation: `bubble-rise ${b.riseDuration} cubic-bezier(0.45,0,0.55,1) ${b.delay} infinite`,
            }}
          >
            <div
              style={{
                width:  b.size,
                height: b.size,
                opacity: b.opacity,
                filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.12)) drop-shadow(0 0 6px rgba(200,150,255,0.14))",
                animation: `bubble-wobble ${b.wobbleDuration} ease-in-out ${b.delay} infinite`,
              }}
            >
              <BubbleSVG uid={i} />
            </div>
          </div>
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
          <h1
            className="animate-fade-up delay-100 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance"
            style={{ color: "oklch(0.98 0 0)" }}
          >
            Votre partenaire propreté à{" "}
            <span style={{ color: "oklch(0.82 0.15 145)" }}>Yssingeaux</span>
          </h1>

          {/* Description */}
          <p
            className="animate-fade-up delay-200 mt-6 text-lg leading-relaxed text-pretty"
            style={{ color: "oklch(0.85 0.02 255)" }}
          >
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

      {/* Vague SVG de transition */}
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
