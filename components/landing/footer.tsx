import Link from "next/link"
import { Phone, MapPin, Mail } from "lucide-react"

const navigation = {
  services: [
    { name: "Nettoyage Bureaux", href: "#services" },
    { name: "Nettoyage Vitres", href: "#services" },
    { name: "Ménage Résidentiel", href: "#services" },
    { name: "Fin de Chantier", href: "#services" },
  ],
  company: [
    { name: "À Propos", href: "#apropos" },
    { name: "Contact", href: "#contact" },
    { name: "Devis Gratuit", href: "#devis" },
  ],
  legal: [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: "oklch(0.16 0.08 255)" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <span
              className="text-3xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, oklch(0.75 0.10 255) 0%, oklch(0.72 0.18 145) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              JBNet43
            </span>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "oklch(0.65 0.04 255)" }}>
              Services de nettoyage professionnel à Yssingeaux et ses environs.
              Qualité, fiabilité et respect de l&apos;environnement.
            </p>
            <div className="mt-6 space-y-2">
              <a href="tel:+33788429319" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "oklch(0.65 0.04 255)" }}>
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "oklch(0.65 0.18 145)" }} />
                07 88 42 93 19
              </a>
              <a href="mailto:contact@jbnet43.fr" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: "oklch(0.65 0.04 255)" }}>
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "oklch(0.65 0.18 145)" }} />
                contact@jbnet43.fr
              </a>
              <p className="flex items-start gap-2 text-sm" style={{ color: "oklch(0.65 0.04 255)" }}>
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.18 145)" }} />
                13 Avenue du huit mai 1945, Yssingeaux 43200
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "oklch(0.70 0.18 145)" }}>
              Nos Services
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "oklch(0.65 0.04 255)" }}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "oklch(0.70 0.18 145)" }}>
              Entreprise
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "oklch(0.65 0.04 255)" }}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "oklch(0.70 0.18 145)" }}>
              Informations légales
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white" style={{ color: "oklch(0.65 0.04 255)" }}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
        >
          <p className="text-sm" style={{ color: "oklch(0.50 0.04 255)" }}>
            &copy; {new Date().getFullYear()} JBNet43. Tous droits réservés.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.45 0.03 255)" }}>
            Nettoyage professionnel · Haute-Loire · Yssingeaux
          </p>
        </div>
      </div>
    </footer>
  )
}
