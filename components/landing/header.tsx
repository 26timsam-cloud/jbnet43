"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Accueil", href: "#accueil" },
  { name: "Services", href: "#services" },
  { name: "À Propos", href: "#apropos" },
  { name: "Devis", href: "#devis" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.985 0 0 / 0.85)"
          : "oklch(0.985 0 0 / 0)",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.90 0.01 255 / 0.5)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px oklch(0 0 0 / 0.06)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span
              className="text-2xl font-black tracking-tight transition-opacity"
              style={{
                background: "linear-gradient(135deg, oklch(0.35 0.12 255) 0%, oklch(0.55 0.18 145) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              JBNet43
            </span>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/auth/login">
            <Button variant="outline" size="sm" className="text-xs h-8 px-3">
              Connexion
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm" className="text-xs h-8 px-3">
              Inscription
            </Button>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: "oklch(0.55 0.18 145)" }} />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <a
            href="tel:+33788429319"
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "oklch(0.35 0.12 255)" }}
          >
            <Phone className="h-4 w-4" />
            07 88 42 93 19
          </a>
          <Link href="/auth/login">
            <Button variant="outline" size="sm">
              Connexion
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button
              size="sm"
              style={{ background: "linear-gradient(135deg, oklch(0.35 0.12 255) 0%, oklch(0.48 0.15 255) 100%)", color: "white", border: "none" }}
            >
              Inscription
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
