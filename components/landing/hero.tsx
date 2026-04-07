"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

const features = ["Devis gratuit sous 24h", "Équipe professionnelle", "Matériel écologique", "Satisfaction garantie"]

const bubbles = [
  { size: 46,  left: "4%",  riseDuration: "7.5s",  wobbleDuration: "2.9s", delay: "0s",   opacity: 0.78 },
  { size: 22,  left: "11%", riseDuration: "5.2s",  wobbleDuration: "2.1s", delay: "1.5s", opacity: 0.68 },
  { size: 70,  left: "19%", riseDuration: "10.5s", wobbleDuration: "3.6s", delay: "0.4s", opacity: 0.62 },
  { size: 32,  left: "28%", riseDuration: "6.8s",  wobbleDuration: "2.5s", delay: "2.9s", opacity: 0.70 },
  { size: 17,  left: "38%", riseDuration: "5.0s",  wobbleDuration: "1.9s", delay: "1.0s", opacity: 0.65 },
  { size: 58,  left: "47%", riseDuration: "9.0s",  wobbleDuration: "3.2s", delay: "1.9s", opacity: 0.58 },
  { size: 26,  left: "57%", riseDuration: "6.2s",  wobbleDuration: "2.3s", delay: "0.6s", opacity: 0.68 },
  { size: 82,  left: "66%", riseDuration: "12.0s", wobbleDuration: "4.1s", delay: "3.2s", opacity: 0.52 },
  { size: 40,  left: "74%", riseDuration: "8.2s",  wobbleDuration: "3.0s", delay: "1.3s", opacity: 0.72 },
  { size: 19,  left: "82%", riseDuration: "4.8s",  wobbleDuration: "2.0s", delay: "0.2s", opacity: 0.65 },
  { size: 52,  left: "89%", riseDuration: "8.7s",  wobbleDuration: "3.4s", delay: "2.1s", opacity: 0.60 },
  { size: 14,  left: "95%", riseDuration: "4.4s",  wobbleDuration: "1.7s", delay: "1.7s", opacity: 0.62 },
]

function BubbleSVG({ uid }: { uid: number }) {
  const p = `bbl${uid}`
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        {/* Corps quasi-invisible */}
        <radialGradient id={`${p}-body`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgb(240,245,255)" stopOpacity="0.01" />
          <stop offset="60%"  stopColor="rgb(220,230,255)" stopOpacity="0.03" />
          <stop offset="100%" stopColor="rgb(200,215,255)" stopOpacity="0.06" />
        </radialGradient>

        {/* Anneau irisé — couche rose/magenta (haut-gauche) */}
        <radialGradient id={`${p}-r1`} cx="25%" cy="18%" r="55%">
          <stop offset="0%"  stopColor="rgb(255,80,180)"  stopOpacity="0.75" />
          <stop offset="40%" stopColor="rgb(255,120,210)" stopOpacity="0.35" />
          <stop offset="70%" stopColor="transparent"      stopOpacity="0" />
        </radialGradient>

        {/* Anneau irisé — couche violet (gauche) */}
        <radialGradient id={`${p}-r2`} cx="8%" cy="50%" r="52%">
          <stop offset="0%"  stopColor="rgb(160,80,255)"  stopOpacity="0.70" />
          <stop offset="40%" stopColor="rgb(190,130,255)" stopOpacity="0.30" />
          <stop offset="70%" stopColor="transparent"      stopOpacity="0" />
        </radialGradient>

        {/* Anneau irisé — couche cyan/bleu (droite) */}
        <radialGradient id={`${p}-r3`} cx="92%" cy="45%" r="55%">
          <stop offset="0%"  stopColor="rgb(60,200,255)"  stopOpacity="0.65" />
          <stop offset="40%" stopColor="rgb(100,220,255)" stopOpacity="0.28" />
          <stop offset="70%" stopColor="transparent"      stopOpacity="0" />
        </radialGradient>

        {/* Anneau irisé — couche vert/cyan (bas) */}
        <radialGradient id={`${p}-r4`} cx="55%" cy="95%" r="50%">
          <stop offset="0%"  stopColor="rgb(80,255,200)"  stopOpacity="0.60" />
          <stop offset="35%" stopColor="rgb(120,255,180)" stopOpacity="0.25" />
          <stop offset="65%" stopColor="transparent"      stopOpacity="0" />
        </radialGradient>

        {/* Anneau irisé — couche jaune/or (bas-droite) */}
        <radialGradient id={`${p}-r5`} cx="85%" cy="85%" r="45%">
          <stop offset="0%"  stopColor="rgb(255,220,80)"  stopOpacity="0.50" />
          <stop offset="40%" stopColor="rgb(255,200,100)" stopOpacity="0.20" />
          <stop offset="65%" stopColor="transparent"      stopOpacity="0" />
        </radialGradient>

        {/* Grand reflet blanc — occupe tout le quart supérieur gauche */}
        <radialGradient id={`${p}-hl`} cx="34%" cy="30%" r="42%">
          <stop offset="0%"  stopColor="white" stopOpacity="0.96" />
          <stop offset="30%" stopColor="white" stopOpacity="0.78" />
          <stop offset="60%" stopColor="white" stopOpacity="0.22" />
          <stop offset="85%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%"stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Reflet secondaire petit — bas droite */}
        <radialGradient id={`${p}-hl2`} cx="70%" cy="74%" r="12%">
          <stop offset="0%"  stopColor="white" stopOpacity="0.75" />
          <stop offset="60%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%"stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Petites bulles internes */}
        <radialGradient id={`${p}-sb`} cx="35%" cy="30%" r="50%">
          <stop offset="0%"  stopColor="white" stopOpacity="0.90" />
          <stop offset="50%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%"stopColor="white" stopOpacity="0.05" />
        </radialGradient>

        {/* Bordure irisée fine */}
        <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgb(255,100,200)" stopOpacity="0.90" />
          <stop offset="20%"  stopColor="rgb(160,80,255)"  stopOpacity="0.80" />
          <stop offset="45%"  stopColor="rgb(60,180,255)"  stopOpacity="0.75" />
          <stop offset="70%"  stopColor="rgb(80,255,200)"  stopOpacity="0.70" />
          <stop offset="100%" stopColor="rgb(255,220,80)"  stopOpacity="0.65" />
        </linearGradient>

        <clipPath id={`${p}-clip`}><circle cx="50" cy="50" r="48" /></clipPath>
      </defs>

      {/* Corps avec bordure irisée */}
      <circle cx="50" cy="50" r="48" fill={`url(#${p}-body)`} stroke={`url(#${p}-rim)`} strokeWidth="2.5" />

      <g clipPath={`url(#${p}-clip)`}>
        {/* Couches irisées sur le bord */}
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-r1)`} />
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-r2)`} />
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-r3)`} />
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-r4)`} />
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-r5)`} />

        {/* Grand reflet blanc */}
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-hl)`} />

        {/* Reflet secondaire */}
        <circle cx="50" cy="50" r="48" fill={`url(#${p}-hl2)`} />

        {/* Petites bulles secondaires groupées (comme sur la photo) */}
        <circle cx="36" cy="28" r="4.5" fill={`url(#${p}-sb)`} stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
        <circle cx="43" cy="24" r="3.0" fill={`url(#${p}-sb)`} stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
        <circle cx="30" cy="33" r="2.5" fill={`url(#${p}-sb)`} stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
        <circle cx="40" cy="32" r="1.8" fill={`url(#${p}-sb)`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" />
        <circle cx="47" cy="29" r="1.4" fill={`url(#${p}-sb)`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" />
      </g>
    </svg>
  )
}

export function Hero() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="accueil"
      className="relative overflow-hidden py-28 lg:py-40"
      style={{ background: "linear-gradient(135deg, oklch(0.22 0.14 255) 0%, oklch(0.28 0.13 255) 50%, oklch(0.20 0.11 260) 100%)" }}
    >
      {/* Lueurs d'ambiance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.45 0.16 255 / 0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.08) 0%, transparent 70%)" }} />

      {/* Bulles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {bubbles.map((b, i) => (
          <div key={i} className="bubble-riser" style={{ left: b.left, animation: `bubble-rise ${b.riseDuration} ease-in-out ${b.delay} infinite` }}>
            <div style={{ width: b.size, height: b.size, opacity: b.opacity, animation: `bubble-wobble ${b.wobbleDuration} ease-in-out ${b.delay} infinite, bubble-shimmer ${parseFloat(b.riseDuration) * 1.3}s ease-in-out ${b.delay} infinite` }}>
              <BubbleSVG uid={i} />
            </div>
          </div>
        ))}
      </div>

      {/* Contenu centré */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 lg:px-8 text-center">

        {/* Badge */}
        <div className="animate-fade-up delay-0 mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium" style={{ background: "oklch(1 0 0 / 0.10)", color: "oklch(0.90 0.02 255)", border: "1px solid oklch(1 0 0 / 0.18)" }}>
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
          domiciles et fins de chantier. Une équipe professionnelle à votre service en Haute-Loire.
        </p>

        {/* Features */}
        <div className="animate-fade-up delay-300 mt-8 flex flex-wrap justify-center gap-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: "oklch(1 0 0 / 0.10)", color: "oklch(0.95 0 0)", border: "1px solid oklch(1 0 0 / 0.18)" }}>
              <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "oklch(0.72 0.18 145)" }} />
              {feature}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-400 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#devis" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:min-w-[220px] card-shine font-semibold shadow-lg" style={{ background: "oklch(0.55 0.18 145)", color: "white", border: "none" }}>
              Demander un devis gratuit
            </Button>
          </a>
          <a href="tel:+33788429319" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:min-w-[220px] font-semibold" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.98 0 0)", borderColor: "oklch(1 0 0 / 0.35)" }}>
              07 88 42 93 19
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500" style={{ opacity: scrolled ? 0 : 0.55 }}>
        <ArrowDown className="h-5 w-5 animate-bounce" style={{ color: "oklch(0.80 0.02 255)" }} />
      </div>

      {/* Vague SVG */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "90px" }}>
          <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1380,30 1440,50 L1440,90 L0,90 Z" fill="oklch(0.985 0 0)" />
        </svg>
      </div>
    </section>
  )
}
