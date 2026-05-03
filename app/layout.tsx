import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "@/styles/performance.css"
import "@/styles/instant-medical-3d.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { LoadingProvider } from "@/contexts/loading-context"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "NabhaHealth - Digital Healthcare Platform",
  description: "Comprehensive healthcare platform for Nabha community with AI-powered symptom checking, telemedicine, and health records management",
  generator: "Next.js",
  keywords: ["healthcare", "telemedicine", "symptom checker", "AI health", "digital health", "Nabha"],
  authors: [{ name: "NabhaHealth Team" }],
  robots: "index, follow",
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d9488',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <head>
        {/* DNS prefetch and preconnect for Sketchfab 3D model */}
        <link rel="dns-prefetch" href="//sketchfab.com" />
        <link rel="preconnect" href="https://sketchfab.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://media.sketchfab.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//media.sketchfab.com" />
        
        {/* Prefetch the 3D model resource */}
        <link rel="prefetch" href="https://sketchfab.com/models/25e4fd28387a494a875babd7a4271c0f/embed" />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider defaultTheme="light" storageKey="nabha-health-theme">
            <LoadingProvider>
              {children}
            </LoadingProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
