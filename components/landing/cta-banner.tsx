import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Star } from "lucide-react"

export function CtaBanner() {
  return (
    <section
      className="py-24 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, oklch(0.22 0.14 255) 0%, oklch(0.28 0.11 255) 50%, oklch(0.20 0.09 262) 100%)" }}
    >
      {/* Decorative glows */}
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.12) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.45 0.16 255 / 0.10) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(1 0 0 / 0.03) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" style={{ color: "oklch(0.82 0.18 80)" }} />
          ))}
          <span className="ml-2 text-sm font-medium" style={{ color: "oklch(0.80 0.03 255)" }}>
            Clients satisfaits à 100%
          </span>
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.72 0.18 145)" }}>
          Prêt à commencer ?
        </p>
        <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl mb-6 leading-tight" style={{ color: "oklch(0.98 0 0)" }}>
          Un espace propre{" "}
          <span style={{
            background: "linear-gradient(135deg, oklch(0.72 0.18 145) 0%, oklch(0.82 0.15 145) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            dès cette semaine
          </span>
        </h2>
        <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "oklch(0.78 0.03 255)" }}>
          Contactez-nous aujourd&apos;hui pour un devis gratuit et sans engagement.
          Réponse garantie sous 24h.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#devis">
            <Button
              size="lg"
              className="card-shine font-bold text-base px-10 h-14 rounded-2xl shadow-xl"
              style={{ background: "linear-gradient(135deg, oklch(0.55 0.20 145) 0%, oklch(0.48 0.18 150) 100%)", color: "white", border: "none" }}
            >
              Demander un devis gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="tel:+33788429319">
            <Button
              size="lg"
              variant="outline"
              className="font-bold text-base px-10 h-14 rounded-2xl"
              style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.98 0 0)", borderColor: "oklch(1 0 0 / 0.25)" }}
            >
              <Phone className="mr-2 h-5 w-5" />
              07 88 42 93 19
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
