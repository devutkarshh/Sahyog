"use client"

import { useTheme } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { Heart } from "lucide-react"
import Link from "next/link"

interface ThemedPageWrapperProps {
  children: React.ReactNode
  showHeader?: boolean
  headerTitle?: string
  headerBadge?: string
  backLink?: string
}

export function ThemedPageWrapper({
  children,
  showHeader = true,
  headerTitle = "NabhaHealth",
  headerBadge,
  backLink = "/"
}: ThemedPageWrapperProps) {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
      theme === "dark"
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          theme === "dark"
            ? "bg-gradient-to-br from-emerald-600/30 to-teal-600/30"
            : "bg-gradient-to-br from-emerald-400/20 to-teal-400/20"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
          theme === "dark"
            ? "bg-gradient-to-br from-cyan-600/30 to-blue-600/30"
            : "bg-gradient-to-br from-cyan-400/20 to-blue-400/20"
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse delay-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-teal-500/20 to-emerald-500/20"
            : "bg-gradient-to-br from-teal-300/10 to-emerald-300/10"
        }`}></div>
      </div>

      {showHeader && (
        <header className={`relative z-10 backdrop-blur-md border-b transition-all duration-300 ${
          theme === "dark" ? "bg-slate-900/10 border-slate-700/20" : "bg-white/10 border-white/20"
        }`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {headerTitle}
                  </span>
                </Link>
                {headerBadge && (
                  <div className={`px-3 py-1 rounded-full text-sm border ${
                    theme === "dark" 
                      ? "bg-emerald-900/50 text-emerald-400 border-emerald-700/50" 
                      : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}>
                    {headerBadge}
                  </div>
                )}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}