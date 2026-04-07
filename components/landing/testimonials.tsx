import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Marie L.",
    role: "Particulier — Yssingeaux",
    content: "Équipe très sérieuse et ponctuelle. Mon appartement n'a jamais été aussi propre. Je recommande sans hésiter !",
    rating: 5,
    initials: "ML",
  },
  {
    name: "Thomas R.",
    role: "Gérant de bureau — Le Puy",
    content: "Nous faisons appel à JBNet43 chaque semaine pour nos locaux. Travail irréprochable, toujours discrets et efficaces.",
    rating: 5,
    initials: "TR",
  },
  {
    name: "Sophie B.",
    role: "Particulier — Monistrol",
    content: "Excellent service pour notre fin de chantier. Résultat parfait, dans les délais. Prix tout à fait raisonnable.",
    rating: 5,
    initials: "SB",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "oklch(0.97 0.01 255)" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.55 0.18 145)" }}>
            Avis clients
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ils nous font confiance
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
            <span className="ml-2 text-muted-foreground text-sm">5/5 · Clients satisfaits</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="relative border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-8 pb-6">
                {/* Guillemet décoratif */}
                <Quote className="absolute top-4 right-4 h-8 w-8 opacity-8" style={{ color: "oklch(0.85 0.05 255)", opacity: 0.15 }} />

                {/* Étoiles */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Texte */}
                <p className="text-foreground leading-relaxed mb-6 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Auteur */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, oklch(0.35 0.12 255) 0%, oklch(0.45 0.14 255) 100%)", color: "white" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
