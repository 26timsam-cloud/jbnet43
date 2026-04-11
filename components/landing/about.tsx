"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Clock, Users, Leaf, ShieldCheck } from "lucide-react"

const stats = [
  { name: "Années d'expérience", value: 4,    suffix: "+", icon: Clock,  color: "oklch(0.35 0.12 255)" },
  { name: "Clients satisfaits",   value: 120,  suffix: "+", icon: Users,  color: "oklch(0.55 0.18 145)" },
  { name: "Interventions/an",     value: 500,  suffix: "+", icon: Award,  color: "oklch(0.45 0.15 210)" },
  { name: "Produits écologiques", value: 100,  suffix: "%", icon: Leaf,   color: "oklch(0.52 0.16 145)" },
]

const badges = [
  { label: "Certifié professionnel", icon: ShieldCheck },
  { label: "Produits éco", icon: Leaf },
  { label: "Assurance RC Pro", icon: Award },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 50
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function About() {
  return (
    <section id="apropos" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Texte */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.55 0.18 145)" }}>
              Notre histoire
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ color: "oklch(0.20 0.05 255)" }}>
              À Propos de{" "}
              <span style={{
                background: "linear-gradient(135deg, oklch(0.35 0.12 255) 0%, oklch(0.55 0.18 145) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                JBNet43
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Basée à Yssingeaux en Haute-Loire, JBNet43 est une entreprise spécialisée
              dans les services de nettoyage professionnel avec plus de 4 ans d&apos;expérience
              dans le secteur.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Notre équipe qualifiée intervient auprès des entreprises et des particuliers
              pour garantir des espaces propres et sains. Nous utilisons exclusivement des
              produits respectueux de l&apos;environnement.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Notre engagement : qualité, fiabilité et respect de vos espaces. Chaque
              intervention est réalisée avec soin et professionnalisme.
            </p>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    background: "oklch(0.35 0.12 255 / 0.07)",
                    color: "oklch(0.35 0.12 255)",
                    border: "1px solid oklch(0.35 0.12 255 / 0.20)",
                  }}
                >
                  <badge.icon className="h-3.5 w-3.5" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="group rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "oklch(0.985 0.005 255)",
                  border: "1px solid oklch(0.90 0.01 255)",
                  boxShadow: "0 2px 16px oklch(0 0 0 / 0.05)",
                }}
              >
                <div
                  className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${stat.color}18` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div className="text-4xl font-black" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.name}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
