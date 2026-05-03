"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Calendar, Users, FileText, Video, Activity, Settings, Menu, X, Stethoscope } from "lucide-react"

export default function DoctorNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/doctor/dashboard", icon: Home, label: "Dashboard" },
    { href: "/doctor/appointments", icon: Calendar, label: "Appointments" },
    { href: "/doctor/patients", icon: Users, label: "Patients" },
    { href: "/doctor/consultations", icon: Video, label: "Consultations" },
    { href: "/doctor/prescriptions", icon: FileText, label: "Prescriptions" },
    { href: "/doctor/analytics", icon: Activity, label: "Analytics" },
    { href: "/doctor/settings", icon: Settings, label: "Settings" },
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-800">Doctor Portal</span>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-white/20 hover:text-blue-600 transition-all duration-200 group"
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
