import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.28 0.13 255) 0%, oklch(0.22 0.11 260) 100%)" }}>
      {/* Cercles décoratifs */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(1 0 0 / 0.05) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 145 / 0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.75 0.18 145)" }}>
          Prêt à commencer ?
        </p>
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-6" style={{ color: "oklch(0.98 0 0)" }}>
          Un espace propre dès cette semaine
        </h2>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "oklch(0.80 0.03 255)" }}>
          Contactez-nous aujourd&apos;hui pour un devis gratuit et sans engagement.
          Réponse garantie sous 24h.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#devis">
            <Button size="lg" className="card-shine font-semibold text-base px-8 shadow-xl" style={{ background: "linear-gradient(135deg, oklch(0.55 0.20 145) 0%, oklch(0.48 0.18 150) 100%)", color: "white", border: "none" }}>
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="tel:+33788429319">
            <Button size="lg" variant="outline" className="font-semibold text-base px-8" style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.98 0 0)", borderColor: "oklch(1 0 0 / 0.28)" }}>
              <Phone className="mr-2 h-4 w-4" />
              07 88 42 93 19
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
