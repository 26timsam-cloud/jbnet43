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
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, oklch(0.20 0.12 255) 0%, oklch(0.26 0.10 260) 50%, oklch(0.18 0.08 265) 100%)" }}
    >
      {/* Glow spots */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.45 0.16 255 / 0.10) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">

        <div className="text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.18 145)" }}>
            Simple &amp; efficace
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ color: "oklch(0.98 0 0)" }}>
            Comment ça marche ?
          </h2>
          <p className="mt-5 text-lg max-w-xl mx-auto" style={{ color: "oklch(0.80 0.03 255)" }}>
            En 3 étapes, votre espace est propre et vous avez l&apos;esprit tranquille.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 relative">
          {/* Connector line desktop */}
          <div
            className="hidden lg:block absolute top-12 left-[calc(16.6%+3rem)] right-[calc(16.6%+3rem)] h-px"
            style={{ background: "linear-gradient(to right, transparent, oklch(1 0 0 / 0.12), oklch(1 0 0 / 0.12), transparent)" }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-3xl p-8 text-center group transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "oklch(1 0 0 / 0.05)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Large faded number */}
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-7xl font-black pointer-events-none select-none leading-none"
                style={{ color: "oklch(1 0 0 / 0.04)" }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                className="relative mx-auto mb-6 h-16 w-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, oklch(0.55 0.18 145 / 0.25) 0%, oklch(0.35 0.12 255 / 0.25) 100%)",
                  border: "1px solid oklch(0.55 0.18 145 / 0.30)",
                }}
              >
                <step.icon className="h-7 w-7" style={{ color: "oklch(0.75 0.18 145)" }} />
                <span
                  className="absolute -top-2.5 -right-2.5 h-6 w-6 rounded-full text-xs font-black flex items-center justify-center text-white"
                  style={{ background: "oklch(0.55 0.18 145)" }}
                >
                  {i + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3" style={{ color: "oklch(0.98 0 0)" }}>
                {step.title}
              </h3>
              <p className="leading-relaxed text-sm" style={{ color: "oklch(0.78 0.03 255)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
