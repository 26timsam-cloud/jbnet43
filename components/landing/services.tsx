import { Building2, Home, Layers, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Nettoyage de Bureaux",
    description: "Entretien complet de vos espaces professionnels : sols, surfaces, sanitaires et espaces communs. Service régulier ou ponctuel.",
    icon: Building2,
    features: ["Entretien quotidien ou hebdomadaire", "Désinfection des surfaces", "Gestion des déchets"],
  },
  {
    title: "Nettoyage de Vitres",
    description: "Nettoyage professionnel de toutes vos surfaces vitrées, intérieures et extérieures, avec équipement adapté.",
    icon: Sparkles,
    features: ["Vitres intérieures et extérieures", "Vérandas et baies vitrées", "Hauteur accessible"],
  },
  {
    title: "Ménage Résidentiel",
    description: "Service de ménage complet pour particuliers. Grand ménage de printemps ou entretien régulier de votre domicile.",
    icon: Home,
    features: ["Ménage complet", "Grand nettoyage ponctuel", "Repassage sur demande"],
  },
  {
    title: "Fin de Chantier",
    description: "Nettoyage approfondi après travaux de construction ou rénovation. Remise en état complète des locaux.",
    icon: Layers,
    features: ["Débarras des déchets", "Nettoyage poussière fine", "Sols et surfaces"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nos Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des solutions de nettoyage adaptées à tous vos besoins professionnels et particuliers.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-lg transition-shadow duration-300 border-border">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
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
