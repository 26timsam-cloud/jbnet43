import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: ["13 Avenue du huit mai 1945", "Yssingeaux 43200"],
    href: "https://maps.google.com/?q=13+Avenue+du+huit+mai+1945+Yssingeaux",
    color: "oklch(0.35 0.12 255)",
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: ["07 88 42 93 19"],
    href: "tel:+33788429319",
    color: "oklch(0.55 0.18 145)",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@jbnet43.fr"],
    href: "mailto:contact@jbnet43.fr",
    color: "oklch(0.45 0.15 210)",
  },
  {
    icon: Clock,
    title: "Horaires",
    details: ["Lun – Ven : 8h – 18h", "Sam : Sur RDV"],
    href: null,
    color: "oklch(0.52 0.16 145)",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.005 255)" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.55 0.18 145)" }}>
            Parlons-en
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ color: "oklch(0.20 0.05 255)" }}>
            Nous Contacter
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Une question ? N&apos;hésitez pas à nous joindre.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {contactInfo.map((item) => {
            const inner = (
              <div
                className="group rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 h-full"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.90 0.01 255)",
                  boxShadow: "0 2px 16px oklch(0 0 0 / 0.05)",
                }}
              >
                <div
                  className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `${item.color}15` }}
                >
                  <item.icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                {item.details.map((detail) => (
                  <p key={detail} className="text-sm text-muted-foreground">{detail}</p>
                ))}
                {item.href && (
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                    style={{ color: item.color }}
                  >
                    Contacter <ArrowRight className="h-3 w-3" />
                  </span>
                )}
              </div>
            )

            return item.href ? (
              <a key={item.title} href={item.href} className="block">
                {inner}
              </a>
            ) : (
              <div key={item.title}>{inner}</div>
            )
          })}
        </div>

        {/* Map */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            border: "1px solid oklch(0.90 0.01 255)",
            boxShadow: "0 4px 24px oklch(0 0 0 / 0.08)",
          }}
        >
          <iframe
            title="Zone d'intervention JBNet43"
            src="https://www.openstreetmap.org/export/embed.html?bbox=3.8%2C45.0%2C4.3%2C45.4&layer=mapnik&marker=45.1436%2C4.1197"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
          />
          <div
            className="px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm"
            style={{ background: "white", borderTop: "1px solid oklch(0.90 0.01 255)" }}
          >
            <span className="flex items-center gap-1.5 font-bold" style={{ color: "oklch(0.35 0.12 255)" }}>
              <MapPin className="h-4 w-4" />
              Zone d&apos;intervention
            </span>
            <span className="text-muted-foreground">
              Yssingeaux · Le Puy-en-Velay · Monistrol-sur-Loire · Sainte-Sigolène · Retournac
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
