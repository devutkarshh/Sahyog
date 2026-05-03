"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Pill, MapPin } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface Medicine {
  name: string
  dosage: string
  frequency: string
  stock: number
  lastTaken: string
  nextDue: string
  pharmacy: string
  availability: "available" | "low" | "out"
}

interface MedicineTrackerProps {
  medicines: Medicine[]
}

export default function MedicineTracker({ medicines }: MedicineTrackerProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "available":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "low":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "out":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getAvailabilityColor = (availability: string) => {
    const baseClasses = theme === 'dark' ? {
      available: "bg-green-900/50 text-green-300 border-green-700",
      low: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
      out: "bg-red-900/50 text-red-300 border-red-700"
    } : {
      available: "bg-green-100 text-green-700 border-green-200",
      low: "bg-yellow-100 text-yellow-700 border-yellow-200",
      out: "bg-red-100 text-red-700 border-red-200"
    }
    
    switch (availability) {
      case "available":
        return baseClasses.available
      case "low":
        return baseClasses.low
      case "out":
        return baseClasses.out
      default:
        return baseClasses.available
    }
  }

  const isOverdue = (nextDue: string) => {
    const dueTime = new Date(nextDue)
    return currentTime > dueTime
  }

  return (
    <Card className={`backdrop-blur-md border p-6 ${
      theme === 'dark' 
        ? 'bg-gray-900/20 border-gray-700/30' 
        : 'bg-white/20 border-white/30'
    }`}>
      <h2 className={`text-xl font-semibold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-slate-800'
      }`}>Medicine Tracker</h2>
      <div className="space-y-4">
        {medicines.map((medicine, index) => (
          <Card key={index} className={`backdrop-blur-md border p-4 ${
            theme === 'dark' 
              ? 'bg-gray-800/30 border-gray-600/40' 
              : 'bg-white/30 border-white/40'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>{medicine.name}</h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                  }`}>
                    {medicine.dosage} • {medicine.frequency}
                  </p>
                  <p className={`text-xs flex items-center mt-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    <MapPin className="w-3 h-3 mr-1" />
                    {medicine.pharmacy}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getAvailabilityIcon(medicine.availability)}
                <Badge className={getAvailabilityColor(medicine.availability)}>
                  {medicine.availability === "available"
                    ? `${medicine.stock} left`
                    : medicine.availability === "low"
                      ? "Low stock"
                      : "Out of stock"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>Last taken:</p>
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{medicine.lastTaken}</p>
              </div>
              <div>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}>Next due:</p>
                <p className={`font-medium ${
                  isOverdue(medicine.nextDue) 
                    ? "text-red-500" 
                    : theme === 'dark' ? "text-white" : "text-slate-800"
                }`}>
                  {medicine.nextDue}
                  {isOverdue(medicine.nextDue) && (
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-red-900/50 text-red-300 border border-red-700' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>Overdue</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Mark as Taken
              </Button>
              {medicine.availability === "low" || medicine.availability === "out" ? (
                <Button size="sm" variant="outline" className={`border ${
                  theme === 'dark' 
                    ? 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50' 
                    : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Find Alternative
                </Button>
              ) : (
                <Button size="sm" variant="outline" className={`border ${
                  theme === 'dark' 
                    ? 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50' 
                    : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Set Reminder
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
