"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

const features = ["Devis gratuit sous 24h", "Équipe professionnelle", "Matériel écologique", "Satisfaction garantie"]

const serviceImages = [
  { src: "/net_bureau.jpg", label: "Bureaux" },
  { src: "/net_vitre.jpg",  label: "Vitres" },
  { src: "/net_home.jpg",   label: "Domicile" },
  { src: "/net_chant.jpg",  label: "Chantier" },
]

const bubbles = [
  { size: 46,  left: "3%",  riseDuration: "7.5s",  wobbleDuration: "2.9s", delay: "0s",   opacity: 0.75 },
  { size: 22,  left: "10%", riseDuration: "5.2s",  wobbleDuration: "2.1s", delay: "1.5s", opacity: 0.65 },
  { size: 70,  left: "18%", riseDuration: "10.5s", wobbleDuration: "3.6s", delay: "0.4s", opacity: 0.60 },
  { size: 17,  left: "35%", riseDuration: "5.0s",  wobbleDuration: "1.9s", delay: "1.0s", opacity: 0.60 },
  { size: 30,  left: "50%", riseDuration: "6.8s",  wobbleDuration: "2.5s", delay: "2.9s", opacity: 0.55 },
  { size: 82,  left: "65%", riseDuration: "12.0s", wobbleDuration: "4.1s", delay: "3.2s", opacity: 0.45 },
  { size: 40,  left: "75%", riseDuration: "8.2s",  wobbleDuration: "3.0s", delay: "1.3s", opacity: 0.60 },
  { size: 19,  left: "85%", riseDuration: "4.8s",  wobbleDuration: "2.0s", delay: "0.2s", opacity: 0.60 },
  { size: 52,  left: "92%", riseDuration: "8.7s",  wobbleDuration: "3.4s", delay: "2.1s", opacity: 0.55 },
]

function BubbleSVG({ uid }: { uid: number }) {
  const p = `bbl${uid}`
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={`${p}-body`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgb(220,235,255)" stopOpacity="0.02" />
          <stop offset="70%"  stopColor="rgb(200,220,255)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="rgb(180,205,255)" stopOpacity="0.08" />
        </radialGradient>
        <radialGradient id={`${p}-hl1`} cx="30%" cy="24%" r="36%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.98" />
          <stop offset="25%"  stopColor="white" stopOpacity="0.82" />
          <stop offset="55%"  stopColor="white" stopOpacity="0.30" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${p}-hl2`} cx="68%" cy="72%" r="14%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.70" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${p}-rainbow`} cx="50%" cy="96%" r="42%">
          <stop offset="0%"   stopColor="rgb(255,120,180)" stopOpacity="0.30" />
          <stop offset="33%"  stopColor="rgb(130,210,255)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="transparent"       stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${p}-pink`} cx="80%" cy="18%" r="46%">
          <stop offset="0%"   stopColor="rgb(255,140,195)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="transparent"       stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${p}-purple`} cx="10%" cy="52%" r="42%">
          <stop offset="0%"   stopColor="rgb(185,135,255)" stopOpacity="0.38" />
          <stop offset="100%" stopColor="transparent"       stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-rim`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor="rgb(255,160,210)" stopOpacity="0.70" />
          <stop offset="35%"  stopColor="rgb(185,135,255)" stopOpacity="0.60" />
          <stop offset="65%"  stopColor="rgb(100,190,255)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(130,255,195)" stopOpacity="0.40" />
        </linearGradient>
        <clipPath id={`${p}-clip`}><circle cx="50" cy="50" r="48.2" /></clipPath>
      </defs>
      <circle cx="50" cy="50" r="48.2" fill={`url(#${p}-body)`} stroke={`url(#${p}-rim)`} strokeWidth="1.4" />
      <g clipPath={`url(#${p}-clip)`}>
        <circle cx="50" cy="50" r="48.2" fill={`url(#${p}-pink)`} />
        <circle cx="50" cy="50" r="48.2" fill={`url(#${p}-purple)`} />
        <circle cx="50" cy="50" r="48.2" fill={`url(#${p}-rainbow)`} />
        <circle cx="50" cy="50" r="48.2" fill={`url(#${p}-hl1)`} />
        <circle cx="50" cy="50" r="48.2" fill={`url(#${p}-hl2)`} />
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
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, oklch(0.22 0.14 255) 0%, oklch(0.28 0.13 255) 50%, oklch(0.20 0.11 260) 100%)", minHeight: "90vh", display: "flex", alignItems: "center" }}
    >
      {/* Lueurs d'ambiance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.45 0.16 255 / 0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.10) 0%, transparent 70%)" }} />

      {/* Bulles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {bubbles.map((b, i) => (
          <div key={i} className="bubble-riser" style={{ left: b.left, animation: `bubble-rise ${b.riseDuration} ease-in-out ${b.delay} infinite` }}>
            <div style={{ width: b.size, height: b.size, opacity: b.opacity, filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.10))", animation: `bubble-wobble ${b.wobbleDuration} ease-in-out ${b.delay} infinite` }}>
              <BubbleSVG uid={i} />
            </div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full mx-auto max-w-7xl px-4 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Colonne gauche — texte */}
          <div>
            {/* Badge */}
            <div className="animate-fade-up delay-0 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: "oklch(1 0 0 / 0.10)", color: "oklch(0.90 0.02 255)", border: "1px solid oklch(1 0 0 / 0.18)" }}>
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Nettoyage professionnel — Haute-Loire
            </div>

            {/* Titre */}
            <h1 className="animate-fade-up delay-100 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight" style={{ color: "oklch(0.98 0 0)" }}>
              Un espace{" "}
              <span style={{
                background: "linear-gradient(135deg, oklch(0.82 0.18 145) 0%, oklch(0.72 0.20 155) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                propre
              </span>
              ,<br />une vie{" "}
              <span style={{
                background: "linear-gradient(135deg, oklch(0.88 0.10 200) 0%, oklch(0.80 0.14 220) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                plus sereine
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-up delay-200 mt-6 text-lg leading-relaxed" style={{ color: "oklch(0.82 0.02 255)" }}>
              JBNet43 prend soin de vos espaces à Yssingeaux et en Haute-Loire.
              Bureaux, vitres, domiciles, fins de chantier — une équipe à votre service.
            </p>

            {/* Features */}
            <div className="animate-fade-up delay-300 mt-6 grid grid-cols-2 gap-2">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "oklch(0.88 0.02 255)" }}>
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "oklch(0.75 0.18 145)" }} />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="animate-fade-up delay-400 mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#devis" className="w-full sm:w-auto">
                <Button size="lg" className="w-full card-shine font-semibold shadow-xl text-base px-8" style={{ background: "linear-gradient(135deg, oklch(0.55 0.20 145) 0%, oklch(0.48 0.18 150) 100%)", color: "white", border: "none" }}>
                  Devis gratuit
                </Button>
              </a>
              <a href="tel:+33788429319" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full font-semibold text-base px-8" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.98 0 0)", borderColor: "oklch(1 0 0 / 0.30)" }}>
                  07 88 42 93 19
                </Button>
              </a>
            </div>

            {/* Trust bar */}
            <div className="animate-fade-up delay-500 mt-8 flex items-center gap-3">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm" style={{ color: "oklch(0.78 0.02 255)" }}>
                4+ ans d'expérience · Clients satisfaits
              </span>
            </div>
          </div>

          {/* Colonne droite — grille d'images */}
          <div className="animate-fade-up delay-300 hidden lg:grid grid-cols-2 gap-3">
            {serviceImages.map((img, i) => (
              <div
                key={img.label}
                className="relative overflow-hidden rounded-2xl group"
                style={{
                  height: i % 2 === 0 ? "220px" : "180px",
                  marginTop: i % 2 === 1 ? "40px" : "0",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                }}
              >
                <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="300px" />
                {/* Glassmorphism label */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl px-3 py-2 flex items-center justify-between"
                  style={{ background: "oklch(0.15 0.05 255 / 0.55)", backdropFilter: "blur(12px)", border: "1px solid oklch(1 0 0 / 0.15)" }}>
                  <span className="text-sm font-medium" style={{ color: "oklch(0.96 0 0)" }}>{img.label}</span>
                  <CheckCircle className="h-3.5 w-3.5" style={{ color: "oklch(0.75 0.18 145)" }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 0.6 }}
      >
        <span className="text-xs" style={{ color: "oklch(0.80 0.02 255)" }}>Découvrir</span>
        <ArrowDown className="h-4 w-4 animate-bounce" style={{ color: "oklch(0.80 0.02 255)" }} />
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
