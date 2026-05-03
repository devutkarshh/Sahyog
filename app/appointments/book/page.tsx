"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useComponentLoading } from "@/contexts/loading-context"
import { AppointmentsSkeleton } from "@/components/ui/medical-skeleton"

export default function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("consultation")
  const { loading: isLoading, startLoading, stopLoading } = useComponentLoading('appointments-booking')

  useEffect(() => {
    startLoading()
    // Simulate loading doctors data
    setTimeout(() => {
      stopLoading()
    }, 1500)
  }, [])

  const doctors = [
    {
      id: 1,
      name: "Dr. Preet Singh",
      specialty: "General Medicine",
      hospital: "Nabha Civil Hospital",
      experience: "12 years",
      rating: 4.8,
      nextAvailable: "Today 2:00 PM",
      consultationFee: "₹200",
    },
    {
      id: 2,
      name: "Dr. Manpreet Kaur",
      specialty: "Pediatrics",
      hospital: "Nabha Civil Hospital",
      experience: "8 years",
      rating: 4.9,
      nextAvailable: "Tomorrow 10:00 AM",
      consultationFee: "₹250",
    },
  ]

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please select doctor, date and time")
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          date: selectedDate,
          time: selectedTime,
          type: appointmentType,
        }),
      })

      if (response.ok) {
        alert("Appointment booked successfully!")
        // Redirect to patient dashboard
        window.location.href = "/patient/dashboard"
      } else {
        alert("Failed to book appointment")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("Error booking appointment")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/patient/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  NabhaHealth
                </span>
              </Link>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Book Appointment</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Book an Appointment</h1>

        {isLoading ? (
          <AppointmentsSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Selection */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Select Doctor</h2>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className={`backdrop-blur-md border p-4 cursor-pointer transition-all duration-300 ${
                      selectedDoctor?.id === doctor.id
                        ? "bg-emerald-100/50 border-emerald-300"
                        : "bg-white/30 border-white/40 hover:bg-white/40"
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
                          <p className="text-sm text-slate-600">{doctor.specialty}</p>
                          <p className="text-xs text-slate-500">{doctor.hospital}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-slate-600">⭐ {doctor.rating}</span>
                            <span className="text-xs text-slate-600">{doctor.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-600">{doctor.consultationFee}</p>
                        <p className="text-sm text-slate-600">{doctor.nextAvailable}</p>
                        {selectedDoctor?.id === doctor.id && <CheckCircle className="w-5 h-5 text-emerald-500 mt-2" />}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Date and Time Selection */}
            {selectedDoctor && (
              <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Select Date & Time</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time ? "bg-emerald-500 text-white" : "bg-transparent"}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Booking Summary</h2>

              {selectedDoctor ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">Doctor</p>
                    <p className="font-semibold text-slate-800">{selectedDoctor.name}</p>
                    <p className="text-sm text-slate-600">{selectedDoctor.specialty}</p>
                  </div>

                  {selectedDate && (
                    <div>
                      <p className="text-sm text-slate-600">Date</p>
                      <p className="font-semibold text-slate-800">{selectedDate}</p>
                    </div>
                  )}

                  {selectedTime && (
                    <div>
                      <p className="text-sm text-slate-600">Time</p>
                      <p className="font-semibold text-slate-800">{selectedTime}</p>
                    </div>
                  )}

                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Consultation Fee</span>
                      <span className="font-semibold text-slate-800">{selectedDoctor.consultationFee}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  >
                    Book Appointment
                  </Button>
                </div>
              ) : (
                <p className="text-slate-600 text-center py-8">Select a doctor to continue</p>
              )}
            </Card>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
