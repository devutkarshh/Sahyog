"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, MapPin, Stethoscope, Phone, Clock, Shield, Activity, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/contexts/theme-context"
import { PremiumButton } from "@/components/premium-button"
import AnimatedCounter from "@/components/animated-counter"
import DataVisualization from "@/components/data-visualization"
import OptimizedMedical3D from "@/components/optimized-medical-3d"
import OptimizedCaduceus from "@/components/optimized-caduceus"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    setIsVisible(true)

    // Handle scroll for parallax effect
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized 3D Medical Animation */}
      <OptimizedCaduceus theme={theme} />
      
      {/* Overlay for better text readability */}
      <div 
        className={`fixed inset-0 transition-all duration-1000 homepage-overlay-base ${
          theme === "dark"
            ? "bg-slate-900/85"
            : "bg-white/75"
        }`}
      />
      
      {/* Animated gradient orbs for additional visual interest */}
      <div className="absolute inset-0 overflow-hidden homepage-orbs-layer">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
            theme === "dark"
              ? "bg-gradient-to-br from-emerald-600/15 to-teal-600/15"
              : "bg-gradient-to-br from-emerald-400/10 to-teal-400/10"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
            theme === "dark"
              ? "bg-gradient-to-br from-cyan-600/15 to-blue-600/15"
              : "bg-gradient-to-br from-cyan-400/10 to-blue-400/10"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse delay-500 ${
            theme === "dark"
              ? "bg-gradient-to-br from-teal-500/10 to-emerald-500/10"
              : "bg-gradient-to-br from-teal-300/8 to-emerald-300/8"
          }`}
        ></div>
      </div>

      <header
        className={`relative backdrop-blur-md border-b transition-all duration-300 homepage-header-layer ${
          theme === "dark" ? "bg-slate-900/10 border-slate-700/20" : "bg-white/10 border-white/20"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                NabhaHealth
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className={`transition-colors cursor-pointer ${
                  theme === "dark" ? "text-slate-300 hover:text-emerald-400" : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => router.push("/contact")}
                className={`transition-colors cursor-pointer ${
                  theme === "dark" ? "text-slate-300 hover:text-emerald-400" : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                Contact
              </button>
              <ThemeToggle />
              <PremiumButton onClick={() => router.push("/patient/dashboard")}>Get Started</PremiumButton>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative container mx-auto px-6 py-20 homepage-content-layer">
        <div
          className={`text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-700/50"
                : "bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200/50"
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className={`font-medium ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>
              Serving 173+ villages in Punjab
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight ${
              theme === "dark" ? "text-slate-100" : "text-slate-800"
            }`}
          >
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Sahyog
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 font-semibold">
              Affordable Telemedicine for Rural Punjab
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl mb-8 sm:mb-12 max-w-4xl mx-auto text-pretty px-4 sm:px-0 ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Quality Healthcare Anytime, Anywhere. Connecting rural communities with certified doctors through 
            multilingual video consultations, AI-powered diagnosis, and offline health records.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0">
            <PremiumButton 
              size="lg" 
              onClick={() => router.push("/consultation/new")} 
              className="px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Consultation
            </PremiumButton>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className={`border-2 px-6 sm:px-8 py-4 text-base sm:text-lg bg-transparent transition-all duration-300 w-full sm:w-auto font-medium ${
                theme === "dark"
                  ? "border-orange-400 text-orange-400 hover:bg-orange-400/10 hover:border-orange-300"
                  : "border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600"
              }`}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16 sm:mt-20 px-4 sm:px-0">
          <Card
            className={`backdrop-blur-md border p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/30"
                : "bg-white/20 border-white/30 hover:bg-white/30"
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                  <AnimatedCounter end={173} suffix="+" />
                </p>
                <p className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Villages Served</p>
              </div>
            </div>
          </Card>

          <Card
            className={`backdrop-blur-md border p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/30"
                : "bg-white/20 border-white/30 hover:bg-white/30"
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                  <AnimatedCounter end={50000} suffix="+" />
                </p>
                <p className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Patients Impacted</p>
              </div>
            </div>
          </Card>

          <Card
            className={`backdrop-blur-md border p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl sm:col-span-2 lg:col-span-1 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/30"
                : "bg-white/20 border-white/30 hover:bg-white/30"
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                  <AnimatedCounter end={25000} suffix="+" />
                </p>
                <p className={`text-xs sm:text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Consultations Completed</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`relative py-20 backdrop-blur-sm homepage-features-layer ${
          theme === "dark"
            ? "bg-gradient-to-r from-slate-800/40 to-slate-700/20"
            : "bg-gradient-to-r from-white/40 to-white/20"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              Revolutionary Healthcare Features
            </h2>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              Designed specifically for rural areas with limited connectivity and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              onClick={() => router.push("/consultation/new")}
              className={`backdrop-blur-md border p-6 transition-all duration-300 hover:scale-105 group cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/40"
                  : "bg-white/30 border-white/40 hover:bg-white/40"
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                Rural Video Consultations
              </h3>
              <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                Connect farmers and rural families with certified doctors through Punjabi, Hindi, and English video calls
              </p>
            </Card>

            <Card
              onClick={() => router.push("/health-records")}
              className={`backdrop-blur-md border p-6 transition-all duration-300 hover:scale-105 group cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/40"
                  : "bg-white/30 border-white/40 hover:bg-white/40"
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                Offline Health Records
              </h3>
              <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                Access medical history and prescriptions on mobile devices, even without internet connectivity
              </p>
            </Card>

            <Card
              onClick={() => router.push("/symptom-checker")}
              className={`backdrop-blur-md border p-6 transition-all duration-300 hover:scale-105 group cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/40"
                  : "bg-white/30 border-white/40 hover:bg-white/40"
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                AI Health Assistant
              </h3>
              <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                Smart symptom analysis via SMS and WhatsApp for remote villages with limited smartphone access
              </p>
            </Card>

            <Card
              onClick={() => router.push("/pharmacy")}
              className={`backdrop-blur-md border p-6 transition-all duration-300 hover:scale-105 group cursor-pointer ${
                theme === "dark"
                  ? "bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/40"
                  : "bg-white/30 border-white/40 hover:bg-white/40"
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                Village Pharmacy Network
              </h3>
              <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
                Real-time medicine availability tracking across rural pharmacies and local health centers
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`relative z-10 py-20 backdrop-blur-sm ${
          theme === "dark"
            ? "bg-gradient-to-r from-slate-700/20 to-slate-800/40"
            : "bg-gradient-to-r from-white/20 to-white/40"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              Sahyog's Mission
            </h2>
            <p className={`text-xl max-w-4xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              Transforming rural healthcare in Punjab, one village at a time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card
              className={`backdrop-blur-md border p-8 transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                  🌍 Remote Villages
                </h3>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  Serving remote villages with limited access to doctors and medical facilities across rural Punjab
                </p>
              </div>
            </Card>

            <Card
              className={`backdrop-blur-md border p-8 transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                  📶 Multilingual Support
                </h3>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  Low-bandwidth video consultations in Punjabi, Hindi, and English for better patient communication
                </p>
              </div>
            </Card>

            <Card
              className={`backdrop-blur-md border p-8 transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                  💊 Offline Support
                </h3>
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                  Offline pharmacy network and AI diagnosis support for areas with unreliable internet connectivity
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Card
              className={`backdrop-blur-md border p-8 max-w-4xl mx-auto ${
                theme === "dark"
                  ? "bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border-slate-700/40"
                  : "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-white/40"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    Cost Savings Impact
                  </h3>
                  <p className={`text-lg mb-4 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Average savings per consultation:
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-4xl font-bold text-emerald-600">₹500</span>
                    <div className="text-left">
                      <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                        Travel + Time
                      </p>
                      <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                        Saved per family
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    "No more day-long trips to the city. Sahyog brings doctors to our village."
                  </p>
                  <p className={`text-xs mt-2 font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    - Harpreet Singh, Farmer from Village Mehal Kalan
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <DataVisualization />

      {/* Testimonials & Trust Section */}
      <section
        className={`relative z-10 py-20 backdrop-blur-sm ${
          theme === "dark"
            ? "bg-gradient-to-r from-slate-700/20 to-slate-800/30"
            : "bg-gradient-to-r from-white/20 to-white/30"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              Trusted by Communities & Healthcare Providers
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              Real stories from doctors, patients, and community leaders using Sahyog
            </p>
          </div>

          {/* Doctor Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card
              className={`backdrop-blur-md border p-8 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className={`text-lg mb-4 italic ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    "Sahyog has revolutionized how I serve rural patients. The multilingual interface and offline capabilities ensure I can help families even in remote areas with poor connectivity."
                  </p>
                  <div>
                    <p className={`font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                      Dr. Amarjeet Singh
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      Senior Physician, Civil Hospital Patiala
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className={`backdrop-blur-md border p-8 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className={`text-lg mb-4 italic ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    "As a pediatrician, Sahyog helps me reach children in villages where specialized care was previously impossible. The AI symptom checker is remarkably accurate."
                  </p>
                  <div>
                    <p className={`font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                      Dr. Manpreet Kaur
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      Pediatric Specialist, Nabha Medical Center
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Community Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card
              className={`backdrop-blur-md border p-6 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <p className={`text-base mb-4 italic ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                "No more traveling 50km to see a doctor. Sahyog saved my mother's life during her diabetes emergency."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    Kuldeep Singh
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    Farmer, Village Raikot
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className={`backdrop-blur-md border p-6 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <p className={`text-base mb-4 italic ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                "The Punjabi language support makes all the difference. My grandmother can finally talk to doctors comfortably."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    Simran Kaur
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    Teacher, Village Ghanaur
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className={`backdrop-blur-md border p-6 ${
                theme === "dark"
                  ? "bg-slate-800/20 border-slate-700/30"
                  : "bg-white/20 border-white/30"
              }`}
            >
              <p className={`text-base mb-4 italic ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                "Our village pharmacy is now connected. Patients know medicine availability instantly through Sahyog."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    Rajesh Sharma
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                    Pharmacist, Village Samana
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Partner Logos */}
          <Card
            className={`backdrop-blur-md border p-8 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}
          >
            <h3 className={`text-2xl font-semibold text-center mb-8 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              Trusted Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-700/30" : "bg-white/30"}`}>
                  <Shield className="w-12 h-12 mx-auto mb-2 text-emerald-600" />
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Punjab Health Dept.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-700/30" : "bg-white/30"}`}>
                  <Heart className="w-12 h-12 mx-auto mb-2 text-red-500" />
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Healthway NGO
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-700/30" : "bg-white/30"}`}>
                  <Activity className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Rural Pharmacies
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-700/30" : "bg-white/30"}`}>
                  <Users className="w-12 h-12 mx-auto mb-2 text-purple-500" />
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Panchayat Network
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <Card
            className={`backdrop-blur-md border p-12 max-w-4xl mx-auto ${
              theme === "dark"
                ? "bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border-slate-700/30"
                : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-white/30"
            }`}
          >
            <h2 className={`text-4xl font-bold mb-6 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              Join Sahyog in Transforming Rural Healthcare
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              Whether you're a patient seeking care or a healthcare provider wanting to serve rural communities, 
              Sahyog connects you to the future of accessible healthcare.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card
                className={`p-8 transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-700/50"
                    : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    For Patients & Families
                  </h3>
                  <p className={`text-sm mb-6 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Get instant access to quality healthcare from the comfort of your home
                  </p>
                  <PremiumButton 
                    size="lg" 
                    onClick={() => router.push("/consultation/new")} 
                    className="w-full px-6 py-3 text-base font-semibold"
                  >
                    Start Your Journey
                  </PremiumButton>
                </div>
              </Card>

              <Card
                className={`p-8 transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-700/50"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    For Healthcare Providers
                  </h3>
                  <p className={`text-sm mb-6 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    Expand your reach and serve rural communities with cutting-edge telemedicine tools
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => router.push("/contact")}
                    className={`w-full border-2 px-6 py-3 text-base font-semibold bg-transparent transition-all duration-300 ${
                      theme === "dark"
                        ? "border-blue-400 text-blue-400 hover:bg-blue-400/10"
                        : "border-blue-500 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    Join as a Healthcare Provider
                  </Button>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
