"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Phone, Heart, User, Clock, Wifi } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"
import { useComponentLoading } from "@/contexts/loading-context"
import { ConsultationSkeleton } from "@/components/ui/medical-skeleton"

export default function NewConsultation() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [consultationType, setConsultationType] = useState("video")
  const router = useRouter()
  const { theme } = useTheme()
  const { loading: isLoading, startLoading, stopLoading } = useComponentLoading('consultation-new')

  useEffect(() => {
    startLoading()
    
    // Preload critical resources
    if (typeof window !== 'undefined') {
      const preloadLinks = [
        '/api/appointments',
        '/api/video-consultation'
      ]
      
      preloadLinks.forEach(href => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = href
        document.head.appendChild(link)
      })
    }
    
    // Stop loading immediately - no artificial delay
    stopLoading()
  }, [startLoading, stopLoading])

  // Memoized doctor data to prevent re-renders
  const [availableDoctors] = useState(() => [
    {
      id: 1,
      name: "Dr. Preet Singh",
      specialty: "General Medicine",
      status: "online",
      waitTime: "2 mins",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Manpreet Kaur",
      specialty: "Pediatrics",
      status: "online",
      waitTime: "5 mins",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiology",
      status: "online",
      waitTime: "3 mins",
      rating: 4.7,
    },
  ])

  const startConsultation = async (doctorId: number) => {
    setIsConnecting(true)

    try {
      // First create an appointment
      const appointmentResponse = await fetch("/api/appointments", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || "dummy-token"}`
        },
        body: JSON.stringify({
          doctorId: doctorId.toString(),
          doctorName: availableDoctors.find(d => d.id === doctorId)?.name || "Doctor",
          patientId: "1", // This should come from auth context
          patientName: "Patient", // This should come from auth context
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: consultationType === "video" ? "Video Consultation" : "Phone Consultation",
          symptoms: "General consultation",
          notes: "Immediate consultation request"
        }),
      })

      if (!appointmentResponse.ok) {
        throw new Error("Failed to create appointment")
      }

      const { appointment } = await appointmentResponse.json()

      // Then start the video consultation
      const consultationResponse = await fetch("/api/video-consultation", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || "dummy-token"}`
        },
        body: JSON.stringify({
          appointmentId: appointment.id,
          action: "start"
        }),
      })

      if (consultationResponse.ok) {
        const { sessionId } = await consultationResponse.json()
        // Redirect to consultation room
        router.push(`/consultation/${sessionId}`)
      } else {
        throw new Error("Failed to start consultation")
      }
    } catch (error) {
      console.error("Consultation error:", error)
      alert("Error starting consultation. Please try again.")
      setIsConnecting(false)
    }
  }

  return (
    <ThemedPageWrapper 
      headerBadge="Start Consultation"
      backLink="/patient/dashboard"
    >
      <div className="container mx-auto px-6 py-8">
        <h1 className={`text-3xl font-bold mb-8 ${
          theme === "dark" ? "text-slate-100" : "text-slate-800"
        }`}>Start New Consultation</h1>

        {isLoading ? (
          <ConsultationSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Consultation Type */}
          <div className="lg:col-span-2">
            <Card className={`backdrop-blur-md border p-6 mb-6 transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}>
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Choose Consultation Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className={`backdrop-blur-md border p-6 cursor-pointer transition-all duration-300 ${
                    consultationType === "video"
                      ? theme === "dark"
                        ? "bg-emerald-900/50 border-emerald-600/50"
                        : "bg-emerald-100/50 border-emerald-300"
                      : theme === "dark"
                        ? "bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/40"
                        : "bg-white/30 border-white/40 hover:bg-white/40"
                  }`}
                  onClick={() => setConsultationType("video")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-semibold mb-2 ${
                      theme === "dark" ? "text-slate-100" : "text-slate-800"
                    }`}>Video Call</h3>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}>Face-to-face consultation with doctor</p>
                    <Badge className={`mt-2 ${
                      theme === "dark" 
                        ? "bg-green-900/50 text-green-400 border-green-700/50" 
                        : "bg-green-100 text-green-700"
                    }`}>Recommended</Badge>
                  </div>
                </Card>

                <Card
                  className={`backdrop-blur-md border p-6 cursor-pointer transition-all duration-300 ${
                    consultationType === "audio"
                      ? theme === "dark"
                        ? "bg-blue-900/50 border-blue-600/50"
                        : "bg-blue-100/50 border-blue-300"
                      : theme === "dark"
                        ? "bg-slate-800/30 border-slate-700/40 hover:bg-slate-800/40"
                        : "bg-white/30 border-white/40 hover:bg-white/40"
                  }`}
                  onClick={() => setConsultationType("audio")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-semibold mb-2 ${
                      theme === "dark" ? "text-slate-100" : "text-slate-800"
                    }`}>Audio Call</h3>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}>Voice-only consultation for low bandwidth</p>
                    <Badge className={`mt-2 ${
                      theme === "dark" 
                        ? "bg-blue-900/50 text-blue-400 border-blue-700/50" 
                        : "bg-blue-100 text-blue-700"
                    }`}>Low Bandwidth</Badge>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Available Doctors */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className={`text-xl font-semibold mb-6 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Available Doctors</h2>
              <div className="space-y-4">
                {availableDoctors.map((doctor) => (
                  <Card key={doctor.id} className="backdrop-blur-md bg-white/30 border border-white/40 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            theme === "dark" ? "text-slate-100" : "text-slate-800"
                          }`}>{doctor.name}</h3>
                          <p className={`text-sm ${
                            theme === "dark" ? "text-slate-300" : "text-slate-600"
                          }`}>{doctor.specialty}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-600">{doctor.status}</span>
                            </div>
                            <span className={`text-xs flex items-center ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {doctor.waitTime} wait
                            </span>
                            <span className={`text-xs ${
                              theme === "dark" ? "text-slate-400" : "text-slate-600"
                            }`}>⭐ {doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => startConsultation(doctor.id)}
                        disabled={isConnecting}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                      >
                        {isConnecting ? "Connecting..." : "Start Call"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Connection Info */}
          <div>
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Connection Status</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Wifi className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-slate-800">Internet Connection</p>
                    <p className="text-sm text-green-600">Good</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-slate-800">Camera & Microphone</p>
                    <p className="text-sm text-green-600">Ready</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className={`backdrop-blur-md border p-6 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Before You Start</h2>
              <ul className={`space-y-2 text-sm ${
                theme === "dark" ? "text-slate-300" : "text-slate-700"
              }`}>
                <li>• Ensure you're in a quiet, well-lit area</li>
                <li>• Have your symptoms and medical history ready</li>
                <li>• Keep any current medications nearby</li>
                <li>• Test your camera and microphone</li>
              </ul>
            </Card>
          </div>
        </div>
        )}
      </div>
    </ThemedPageWrapper>
  )
}
