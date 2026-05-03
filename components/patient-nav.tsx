"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Calendar, FileText, Video, Pill, User, Settings, Menu, X } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function PatientNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const navItems = [
    { href: "/patient/dashboard", icon: Home, label: "Dashboard" },
    { href: "/appointments/book", icon: Calendar, label: "Appointments" }, // Fixed route
    { href: "/consultation/new", icon: Video, label: "Consultations" }, // Fixed route
    { href: "/health-records", icon: FileText, label: "Health Records" }, // Fixed route
    { href: "/pharmacy", icon: Pill, label: "Medicines" }, // Fixed route
    { href: "/patient/profile", icon: User, label: "Profile" },
    { href: "/patient/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50 backdrop-blur-md bg-white/20 border-white/30"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Navigation Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-full w-64 backdrop-blur-md bg-white/10 border-r border-white/20 z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className={`font-semibold ${
              theme === "dark" ? "text-slate-100" : "text-slate-800"
            }`}>Patient Portal</span>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    theme === "dark"
                      ? "text-slate-300 hover:bg-slate-800/40 hover:text-emerald-400"
                      : "text-slate-700 hover:bg-white/20 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
