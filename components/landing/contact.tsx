import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    details: ["13 Avenue du huit mai 1945", "Yssingeaux 43200"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    details: ["07 88 42 93 19"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@jbnet43.fr"],
  },
  {
    icon: Clock,
    title: "Horaires",
    details: ["Lun - Ven : 8h - 18h", "Sam : Sur RDV"],
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nous Contacter
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Une question ? N&apos;hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => (
            <Card key={item.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                {item.details.map((detail) => (
                  <p key={detail} className="mt-1 text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Card className="overflow-hidden">
            <iframe
              title="Zone d'intervention JBNet43"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.8%2C45.0%2C4.3%2C45.4&layer=mapnik&marker=45.1436%2C4.1197"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              loading="lazy"
            />
            <div className="px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground border-t">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Zone d&apos;intervention
              </span>
              <span>Yssingeaux · Le Puy-en-Velay · Monistrol-sur-Loire · Sainte-Sigolène · Retournac</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
