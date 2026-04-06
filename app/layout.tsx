import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: 'JBNet43 - Services de Nettoyage Professionnel | Yssingeaux',
  description: 'JBNet43 propose des services de nettoyage professionnel pour bureaux, vitres, domiciles et chantiers à Yssingeaux et ses environs en Haute-Loire.',
  keywords: 'nettoyage, entreprise de nettoyage, Yssingeaux, Haute-Loire, nettoyage bureaux, nettoyage vitres, ménage, fin de chantier',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${geist.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
