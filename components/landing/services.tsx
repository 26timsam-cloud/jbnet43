import Image from "next/image"
import { Building2, WindowIcon, Home, HardHat, ArrowRight } from "lucide-react"

const services = [
  {
    title: "Nettoyage de Bureaux",
    description: "Entretien complet de vos espaces professionnels : sols, surfaces, sanitaires et espaces communs.",
    image: "/net_bureau.jpg",
    icon: Building2,
    tag: "Professionnel",
    features: ["Entretien quotidien ou hebdomadaire", "Désinfection des surfaces", "Gestion des déchets"],
    color: "oklch(0.35 0.12 255)",
    delay: "delay-0",
  },
  {
    title: "Nettoyage de Vitres",
    description: "Nettoyage professionnel de toutes vos surfaces vitrées, intérieures et extérieures.",
    image: "/net_vitre.jpg",
    icon: WindowIcon,
    tag: "Vitres & Baies",
    features: ["Vitres intérieures et extérieures", "Vérandas et baies vitrées", "Hauteur accessible"],
    color: "oklch(0.45 0.15 210)",
    delay: "delay-100",
  },
  {
    title: "Ménage Résidentiel",
    description: "Service de ménage complet pour particuliers. Grand ménage ou entretien régulier.",
    image: "/net_home.jpg",
    icon: Home,
    tag: "Particuliers",
    features: ["Ménage complet", "Grand nettoyage ponctuel", "Repassage sur demande"],
    color: "oklch(0.55 0.18 145)",
    delay: "delay-200",
  },
  {
    title: "Fin de Chantier",
    description: "Nettoyage approfondi après travaux de construction ou rénovation. Remise en état complète.",
    image: "/net_chant.jpg",
    icon: HardHat,
    tag: "Post-travaux",
    features: ["Débarras des déchets", "Nettoyage poussière fine", "Sols et surfaces"],
    color: "oklch(0.55 0.18 50)",
    delay: "delay-300",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.005 255)" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-20 animate-fade-up delay-0">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.55 0.18 145)" }}>
            Ce que nous faisons
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ color: "oklch(0.20 0.05 255)" }}>
            Nos Services
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Des solutions sur-mesure pour vos espaces professionnels et personnels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative rounded-3xl overflow-hidden animate-fade-up ${service.delay} cursor-pointer`}
              style={{ boxShadow: "0 2px 20px oklch(0 0 0 / 0.08)" }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Dark gradient over image */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, oklch(0 0 0 / 0.1) 0%, oklch(0 0 0 / 0.55) 100%)" }}
                />
                {/* Tag */}
                <div
                  className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: service.color }}
                >
                  {service.tag}
                </div>
                {/* Icon */}
                <div
                  className="absolute bottom-4 right-4 h-10 w-10 rounded-2xl flex items-center justify-center text-white opacity-90"
                  style={{ background: service.color }}
                >
                  <service.icon className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="bg-white p-5">
                <h3 className="text-lg font-bold mb-2" style={{ color: "oklch(0.20 0.05 255)" }}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1.5 mb-5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-foreground/70">
                      <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#devis"
                  className="flex items-center gap-1.5 text-sm font-semibold transition-colors group/link"
                  style={{ color: service.color }}
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
