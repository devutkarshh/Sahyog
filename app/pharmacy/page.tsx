"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, Search, MapPin, Clock, CheckCircle, XCircle, Phone, Navigation, ShoppingCart, Star } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"
import { useComponentLoading } from "@/contexts/loading-context"
import { MedicalSkeleton } from "@/components/ui/medical-skeleton"

export default function PharmacyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const { loading: isLoading, startLoading, stopLoading } = useComponentLoading('pharmacy')

  useEffect(() => {
    startLoading()
    // Simulate loading pharmacy data and medicines
    setTimeout(() => {
      stopLoading()
      setIsVisible(true)
    }, 2000)
  }, [])

  const pharmacies = [
    {
      id: 1,
      name: "Nabha Medical Store",
      address: "Main Market, Nabha",
      distance: "0.5 km",
      rating: 4.8,
      isOpen: true,
      phone: "+91 98765 43210",
      medicines: [
        { name: "Paracetamol 500mg", available: true, price: "₹25", stock: 50 },
        { name: "Amoxicillin 250mg", available: true, price: "₹85", stock: 12 },
        { name: "Crocin Advance", available: false, price: "₹30", stock: 0 },
      ],
    },
    {
      id: 2,
      name: "Bhadson Pharmacy",
      address: "Village Bhadson",
      distance: "2.1 km",
      rating: 4.5,
      isOpen: true,
      phone: "+91 98765 43211",
      medicines: [
        { name: "Paracetamol 500mg", available: true, price: "₹28", stock: 25 },
        { name: "Amoxicillin 250mg", available: false, price: "₹85", stock: 0 },
        { name: "Crocin Advance", available: true, price: "₹32", stock: 8 },
      ],
    },
    {
      id: 3,
      name: "Ghanaur Medical Hall",
      address: "Ghanaur Market",
      distance: "3.8 km",
      rating: 4.2,
      isOpen: false,
      phone: "+91 98765 43212",
      medicines: [
        { name: "Paracetamol 500mg", available: true, price: "₹24", stock: 100 },
        { name: "Amoxicillin 250mg", available: true, price: "₹80", stock: 30 },
        { name: "Crocin Advance", available: true, price: "₹29", stock: 15 },
      ],
    },
  ]

  const commonMedicines = [
    {
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      description: "For fever and pain relief",
      image: "/medicine-paracetamol.jpg",
      avgPrice: "₹25-28",
      availability: "Available in 2/3 pharmacies",
    },
    {
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      description: "Bacterial infection treatment",
      image: "/medicine-amoxicillin.jpg",
      avgPrice: "₹80-85",
      availability: "Available in 2/3 pharmacies",
    },
    {
      name: "Crocin Advance",
      category: "Pain Relief",
      description: "Fast acting pain relief",
      image: "/medicine-crocin.jpg",
      avgPrice: "₹29-32",
      availability: "Available in 2/3 pharmacies",
    },
    {
      name: "Azithromycin 500mg",
      category: "Antibiotic",
      description: "Respiratory infection treatment",
      image: "/medicine-azithromycin.jpg",
      avgPrice: "₹120-150",
      availability: "Limited availability",
    },
  ]

  const prescriptionMedicines = [
    {
      name: "Paracetamol 500mg",
      dosage: "1 tablet twice daily",
      duration: "5 days",
      prescribed: "Dr. Preet Singh",
      status: "available",
    },
    {
      name: "Amoxicillin 250mg",
      dosage: "1 capsule thrice daily",
      duration: "7 days",
      prescribed: "Dr. Preet Singh",
      status: "limited",
    },
  ]

  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (selectedFilter === "open") return pharmacy.isOpen
    if (selectedFilter === "nearby") return Number.parseFloat(pharmacy.distance) <= 2
    return true
  })

  return (
    <ThemedPageWrapper 
      headerBadge="Pharmacy Locator"
      backLink="/patient/dashboard"
    >
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}>Find Medicines Near You</h1>
          <p className={`flex items-center text-lg font-medium ${
            theme === "dark" ? "text-gray-200" : "text-slate-700"
          }`}>
            <MapPin className="w-4 h-4 mr-2" />
            Real-time availability across Nabha region pharmacies
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <MedicalSkeleton className="h-20" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <MedicalSkeleton className="h-32" />
                <MedicalSkeleton className="h-40" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MedicalSkeleton className="h-24" />
                  <MedicalSkeleton className="h-24" />
                  <MedicalSkeleton className="h-24" />
                  <MedicalSkeleton className="h-24" />
                </div>
              </div>
              <div className="space-y-6">
                <MedicalSkeleton className="h-48" />
                <MedicalSkeleton className="h-32" />
              </div>
            </div>
          </div>
        ) : (
          <>
          {/* Search and Filters */}
          <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === "dark" ? "text-slate-500" : "text-slate-400"
              }`} />
              <input
                type="text"
                placeholder="Search for medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className={selectedFilter === "all" ? "bg-orange-500 text-white" : "bg-transparent"}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "open" ? "default" : "outline"}
                onClick={() => setSelectedFilter("open")}
                className={selectedFilter === "open" ? "bg-orange-500 text-white" : "bg-transparent"}
              >
                Open Now
              </Button>
              <Button
                variant={selectedFilter === "nearby" ? "default" : "outline"}
                onClick={() => setSelectedFilter("nearby")}
                className={selectedFilter === "nearby" ? "bg-orange-500 text-white" : "bg-transparent"}
              >
                Nearby
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Pharmacies */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Prescription */}
            <Card className={`backdrop-blur-md border p-6 ${
              theme === "dark" 
                ? "bg-gray-800/30 border-gray-600/40" 
                : "bg-white/20 border-white/30"
            }`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}>My Prescription Medicines</h2>
              <div className="space-y-4">
                {prescriptionMedicines.map((medicine, index) => (
                  <Card key={index} className="backdrop-blur-md bg-white/30 border border-white/40 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-semibold ${
                          theme === "dark" ? "text-slate-100" : "text-slate-800"
                        }`}>{medicine.name}</h3>
                        <p className={`text-sm ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}>{medicine.dosage}</p>
                        <p className={`text-xs ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {medicine.duration} • Prescribed by {medicine.prescribed}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            medicine.status === "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {medicine.status}
                        </Badge>
                        <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                          Find Nearby
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Nearby Pharmacies */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Nearby Pharmacies</h2>
              <div className="space-y-4">
                {filteredPharmacies.map((pharmacy) => (
                  <Card
                    key={pharmacy.id}
                    className="backdrop-blur-md bg-white/30 border border-white/40 p-6 hover:bg-white/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          theme === "dark" ? "text-slate-100" : "text-slate-800"
                        }`}>{pharmacy.name}</h3>
                        <p className={`text-sm flex items-center mt-1 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}>
                          <MapPin className="w-4 h-4 mr-1" />
                          {pharmacy.address} • {pharmacy.distance}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{pharmacy.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {pharmacy.isOpen ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600">Open</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-600">Closed</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Navigation className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>

                    {/* Medicine Availability */}
                    <div className="border-t border-white/20 pt-4">
                      <h4 className={`font-medium mb-3 ${
                        theme === "dark" ? "text-slate-100" : "text-slate-800"
                      }`}>Medicine Availability</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {pharmacy.medicines.map((medicine, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white/20 rounded-lg border border-white/30"
                          >
                            <div>
                              <p className={`font-medium text-sm ${
                                theme === "dark" ? "text-slate-100" : "text-slate-800"
                              }`}>{medicine.name}</p>
                              <p className={`text-xs ${
                                theme === "dark" ? "text-slate-400" : "text-slate-600"
                              }`}>{medicine.price}</p>
                            </div>
                            <div className="text-right">
                              {medicine.available ? (
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-xs text-green-600">{medicine.stock} left</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1">
                                  <XCircle className="w-4 h-4 text-red-500" />
                                  <span className="text-xs text-red-600">Out of stock</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Common Medicines */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Common Medicines</h2>
              <div className="space-y-4">
                {commonMedicines.map((medicine, index) => (
                  <Card key={index} className="backdrop-blur-md bg-white/30 border border-white/40 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          theme === "dark" ? "text-slate-100" : "text-slate-800"
                        }`}>{medicine.name}</h3>
                        <p className={`text-xs mb-1 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}>{medicine.category}</p>
                        <p className={`text-xs mb-2 ${
                          theme === "dark" ? "text-slate-400" : "text-slate-500"
                        }`}>{medicine.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            theme === "dark" ? "text-slate-100" : "text-slate-800"
                          }`}>{medicine.avgPrice}</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">{medicine.availability}</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="backdrop-blur-md bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-white/30 p-6">
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Emergency Medicine</h2>
              <p className="text-sm text-slate-600 mb-4">
                Need urgent medicines? Contact our 24/7 emergency pharmacy service.
              </p>
              <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Pharmacy: 108
              </Button>
            </Card>

            {/* Medicine Reminder */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Medicine Reminder</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Paracetamol</p>
                    <p className="text-xs text-slate-600">Next dose in 2 hours</p>
                  </div>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Amoxicillin</p>
                    <p className="text-xs text-slate-600">Next dose in 4 hours</p>
                  </div>
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">Set Reminder</Button>
            </Card>
          </div>
        </div>
        </>
        )}
      </div>
    </ThemedPageWrapper>
  )
}
