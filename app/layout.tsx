import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PWARegister } from '@/components/pwa-register'
import { OrganizationSchema, WebsiteSchema } from '@/components/structured-data'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { ScrollToTop } from '@/components/scroll-to-top'
import './globals.css'

const _inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const _playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Africa AI | Your AI Guide to the Motherland',
  description: 'Discover, relocate, and thrive across Africa\'s 54 nations. AI-powered travel planning, visa guidance, and relocation support for the African diaspora, expats, and tourists.',
  keywords: ['Africa travel', 'relocation Africa', 'African diaspora', 'visa Africa', 'expat Africa', 'Year of Return', 'digital nomad Africa'],
  authors: [{ name: 'Kheper LLC' }],
  creator: 'Kheper LLC',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Africa AI',
  },
  openGraph: {
    title: 'Africa AI | Your AI Guide to the Motherland',
    description: 'Discover, relocate, and thrive across Africa\'s 54 nations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Africa AI | Your AI Guide to the Motherland',
    description: 'Discover, relocate, and thrive across Africa\'s 54 nations.',
  },
  icons: {
    icon: [
      {
        url: '/icons/icon-192x192.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        url: '/icons/icon-512x512.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
    apple: '/icons/icon-192x192.jpg',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#D4A853',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased scroll-smooth">
        <ScrollToTop />
        <OrganizationSchema />
        <WebsiteSchema />
        <PWARegister />
        {children}
        <AIChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
