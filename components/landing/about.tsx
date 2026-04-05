import { Award, Clock, Users, Leaf } from "lucide-react"

const stats = [
  { name: "Années d'expérience", value: "10+", icon: Clock },
  { name: "Clients satisfaits", value: "500+", icon: Users },
  { name: "Interventions/an", value: "2000+", icon: Award },
  { name: "Produits écologiques", value: "100%", icon: Leaf },
]

export function About() {
  return (
    <section id="apropos" className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              À Propos de JBNet43
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Basée à Yssingeaux en Haute-Loire, JBNet43 est une entreprise familiale 
              spécialisée dans les services de nettoyage professionnel depuis plus de 10 ans.
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
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="rounded-2xl bg-card p-6 text-center shadow-sm border border-border"
              >
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
