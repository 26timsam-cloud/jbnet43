"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Clock, Users, Leaf } from "lucide-react"

const stats = [
  { name: "Années d'expérience", value: 4,    suffix: "+", icon: Clock },
  { name: "Clients satisfaits",   value: 120,  suffix: "+", icon: Users },
  { name: "Interventions/an",     value: 500,  suffix: "+", icon: Award },
  { name: "Produits écologiques", value: 100,  suffix: "%", icon: Leaf },
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
    <section id="apropos" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Texte */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.55 0.18 145)" }}>
              Notre histoire
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              À Propos de JBNet43
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
              {["Certifié professionnel", "Produits éco", "Assurance RC Pro"].map((badge) => (
                <span key={badge} className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium border border-border text-muted-foreground">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Stats animées */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="rounded-2xl p-6 text-center border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ background: "oklch(0.98 0.005 255)" }}
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "oklch(0.35 0.12 255 / 0.10)" }}>
                  <stat.icon className="h-6 w-6" style={{ color: "oklch(0.35 0.12 255)" }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: "oklch(0.35 0.12 255)" }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.name}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
