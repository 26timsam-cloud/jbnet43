import Link from "next/link"

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
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              JBNet43
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Services de nettoyage professionnel à Yssingeaux et ses environs. 
              Qualité, fiabilité et respect de l&apos;environnement.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Nos Services
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Entreprise
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Informations légales
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} JBNet43. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
