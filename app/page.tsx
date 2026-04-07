import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { HowItWorks } from "@/components/landing/how-it-works"
import { About } from "@/components/landing/about"
import { Testimonials } from "@/components/landing/testimonials"
import { QuoteForm } from "@/components/landing/quote-form"
import { CtaBanner } from "@/components/landing/cta-banner"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <Testimonials />
        <QuoteForm />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
