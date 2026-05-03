"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Video,
  FileText,
  Heart,
  Clock,
  User,
  Phone,
  MapPin,
  Pill,
  AlertCircle,
  Star,
  Bell,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"
import { useAuthState } from "@/hooks/use-auth"
import { useTheme } from "@/contexts/theme-context"
import { useComponentLoading } from "@/contexts/loading-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"
import { DashboardSkeleton } from "@/components/ui/medical-skeleton"

export default function PatientDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [healthRecords, setHealthRecords] = useState([])
  const { user } = useAuthState()
  const { theme } = useTheme()
  const { loading, startLoading, stopLoading } = useComponentLoading('dashboard')

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        startLoading()
        console.log("[v0] Fetching dashboard data for user:", user.id)

        const [appointmentsRes, recordsRes] = await Promise.all([
          apiClient.getAppointments(user.id, user.role),
          apiClient.getHealthRecords(user.id),
        ])

        console.log("[v0] Appointments response:", appointmentsRes)
        console.log("[v0] Health records response:", recordsRes)

        setAppointments(appointmentsRes.appointments || [])
        setHealthRecords(recordsRes.records || [])
      } catch (error) {
        console.error("[v0] Failed to fetch dashboard data:", error)
        // Set fallback data if API fails
        setAppointments([])
        setHealthRecords([])
      } finally {
        stopLoading()
      }
    }

    fetchData()
  }, [user])

  // Mock health metrics for display
  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "normal", icon: Heart },
    { label: "Heart Rate", value: "72 bpm", status: "normal", icon: Activity },
    { label: "Temperature", value: "98.6°F", status: "normal", icon: AlertCircle },
    { label: "Weight", value: "65 kg", status: "stable", icon: User },
  ]

  const upcomingAppointments = appointments.filter((apt: any) => apt.status === "scheduled").slice(0, 2)
  const recentConsultations = appointments.filter((apt: any) => apt.status === "completed").slice(0, 2)

  if (loading) {
    return (
      <ThemedPageWrapper 
        headerBadge="Patient Portal"
        backLink="/"
      >
        <div className="container mx-auto px-6 py-8">
          <DashboardSkeleton />
        </div>
      </ThemedPageWrapper>
    )
  }

  return (
    <ThemedPageWrapper 
      headerBadge="Patient Portal"
      backLink="/"
    >
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === "dark" ? "text-slate-100" : "text-slate-800"
          }`}>Welcome back, {user?.name || "Patient"}</h1>
          <p className={`flex items-center ${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }`}>
            <MapPin className="w-4 h-4 mr-2" />
            Village Bhadson, Nabha - Punjab
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link href="/consultation/new">
            <Card className={`backdrop-blur-md border p-6 transition-all duration-300 hover:scale-105 cursor-pointer group ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/30"
                : "bg-white/20 border-white/30 hover:bg-white/30"
            }`}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    theme === "dark" ? "text-slate-100" : "text-slate-800"
                  }`}>Start Consultation</h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>Video call with doctor</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/appointments/book">
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    theme === "dark" ? "text-slate-100" : "text-slate-800"
                  }`}>Book Appointment</h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>Schedule with specialist</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/health-records">
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    theme === "dark" ? "text-slate-100" : "text-slate-800"
                  }`}>Health Records</h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>View medical history</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/pharmacy">
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    theme === "dark" ? "text-slate-100" : "text-slate-800"
                  }`}>Medicine Tracker</h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>Check availability</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${
                  theme === "dark" ? "text-slate-100" : "text-slate-800"
                }`}>Upcoming Appointments</h2>
                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  View All
                </Button>
              </div>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                  <p className={`mt-2 ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>Loading appointments...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment: any) => (
                      <Card
                        key={appointment.id}
                        className="backdrop-blur-md bg-white/30 border border-white/40 p-4 hover:bg-white/40 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className={`font-semibold ${
                                theme === "dark" ? "text-slate-100" : "text-slate-800"
                              }`}>{appointment.doctorName}</h3>
                              <p className={`text-sm ${
                                theme === "dark" ? "text-slate-300" : "text-slate-600"
                              }`}>{appointment.type}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-slate-600 flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {appointment.date}
                                </span>
                                <span className="text-sm text-slate-600 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {appointment.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-700">{appointment.status}</Badge>
                            <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                              Join Call
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No Upcoming Appointments</h3>
                      <p className="text-slate-600">Schedule your next consultation with a doctor.</p>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Recent Consultations */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Consultations</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                  <p className="text-slate-600 mt-2">Loading consultations...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentConsultations.length > 0 ? (
                    recentConsultations.map((consultation: any) => (
                      <Card key={consultation.id} className="backdrop-blur-md bg-white/30 border border-white/40 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-800">{consultation.doctorName}</h3>
                            <p className="text-sm text-slate-600">{consultation.symptoms}</p>
                            <p className="text-xs text-slate-500 mt-1">{consultation.date}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <p className="text-xs text-slate-600">{consultation.notes}</p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No Recent Consultations</h3>
                      <p className="text-slate-600">Your consultation history will appear here.</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Health Metrics */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Health Metrics</h2>
              <div className="space-y-4">
                {healthMetrics.map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/20 border border-white/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">{metric.value}</p>
                        <Badge
                          className={
                            metric.status === "normal" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="backdrop-blur-md bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Emergency Contact</h2>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency: 108
                </Button>
                <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report Emergency
                </Button>
              </div>
            </Card>

            {/* Quick Health Check */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Health Check</h2>
              <p className="text-sm text-slate-600 mb-4">
                Use our AI-powered symptom checker for instant health guidance
              </p>
              <Link href="/symptom-checker">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Start Health Check
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </ThemedPageWrapper>
  )
}
