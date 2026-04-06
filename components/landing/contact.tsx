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
            <div className="aspect-[21/9] w-full bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="text-lg font-medium text-foreground">Zone d&apos;intervention</p>
                <p className="mt-2 text-muted-foreground">
                  Yssingeaux et environs - Haute-Loire (43)
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Le Puy-en-Velay, Monistrol-sur-Loire, Sainte-Sigolène, Retournac...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
