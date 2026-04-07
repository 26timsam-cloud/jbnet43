import { ClipboardList, Phone, Sparkles } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Demandez un devis",
    description: "Remplissez notre formulaire en ligne ou appelez-nous. Réponse garantie sous 24h, gratuitement.",
  },
  {
    icon: Phone,
    number: "02",
    title: "On confirme ensemble",
    description: "Nous vous contactons pour valider les détails : date, heure, accès. Tout est planifié selon vous.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "On s'occupe de tout",
    description: "Notre équipe intervient avec son matériel. Vous récupérez un espace impeccable, sans stress.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.55 0.18 145)" }}>
            Simple &amp; efficace
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            En 3 étapes, votre espace est propre et vous avez l'esprit tranquille.
          </p>
        </div>

        <div className="relative">
          {/* Ligne de connexion (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[calc(16.6%+2rem)] right-[calc(16.6%+2rem)] h-px" style={{ background: "linear-gradient(to right, transparent, oklch(0.88 0.01 255), oklch(0.88 0.01 255), transparent)" }} />

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center group" style={{ animationDelay: `${i * 150}ms` }}>
                {/* Icône */}
                <div className="relative mb-6">
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg, oklch(0.35 0.12 255) 0%, oklch(0.28 0.10 260) 100%)" }}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  {/* Numéro */}
                  <span
                    className="absolute -top-3 -right-3 h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ background: "oklch(0.55 0.18 145)", color: "white" }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
