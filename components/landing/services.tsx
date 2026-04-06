import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Nettoyage de Bureaux",
    description: "Entretien complet de vos espaces professionnels : sols, surfaces, sanitaires et espaces communs. Service régulier ou ponctuel.",
    image: "/net_bureau.jpg",
    features: ["Entretien quotidien ou hebdomadaire", "Désinfection des surfaces", "Gestion des déchets"],
    delay: "delay-0",
  },
  {
    title: "Nettoyage de Vitres",
    description: "Nettoyage professionnel de toutes vos surfaces vitrées, intérieures et extérieures, avec équipement adapté.",
    image: "/net_vitre.jpg",
    features: ["Vitres intérieures et extérieures", "Vérandas et baies vitrées", "Hauteur accessible"],
    delay: "delay-100",
  },
  {
    title: "Ménage Résidentiel",
    description: "Service de ménage complet pour particuliers. Grand ménage de printemps ou entretien régulier de votre domicile.",
    image: "/net_home.jpg",
    features: ["Ménage complet", "Grand nettoyage ponctuel", "Repassage sur demande"],
    delay: "delay-200",
  },
  {
    title: "Fin de Chantier",
    description: "Nettoyage approfondi après travaux de construction ou rénovation. Remise en état complète des locaux.",
    image: "/net_chant.jpg",
    features: ["Débarras des déchets", "Nettoyage poussière fine", "Sols et surfaces"],
    delay: "delay-300",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-up delay-0">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nos Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des solutions de nettoyage adaptées à tous vos besoins professionnels et particuliers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className={`card-shine group hover:shadow-xl transition-all duration-300 border-border hover:-translate-y-1 animate-fade-up overflow-hidden ${service.delay}`}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Dégradé bas pour transition douce vers la carte */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
              </div>

              <CardHeader className="pt-4">
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
