"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Accueil", href: "#accueil" },
  { name: "Services", href: "#services" },
  { name: "À Propos", href: "#apropos" },
  { name: "Devis", href: "#devis" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-primary">JBNet43</span>
          </Link>
        </div>

        {/* Boutons auth directement visibles sur mobile */}
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

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a href="tel:+33788429319" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4" />
            07 88 42 93 19
          </a>
          <Link href="/auth/login">
            <Button variant="outline" size="sm">
              Connexion
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm">
              Inscription
            </Button>
          </Link>
        </div>
      </nav>
      
    </header>
  )
}
