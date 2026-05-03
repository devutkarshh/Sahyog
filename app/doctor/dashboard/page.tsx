"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  FileText,
  Users,
  Clock,
  User,
  MapPin,
  Stethoscope,
  AlertCircle,
  Bell,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"

export default function DoctorDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { theme } = useTheme()

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const todayAppointments = [
    {
      id: 1,
      patient: "Rajinder Singh",
      age: 45,
      village: "Bhadson",
      time: "2:30 PM",
      type: "Video Call",
      status: "upcoming",
      symptoms: "Fever, headache",
      priority: "medium",
    },
    {
      id: 2,
      patient: "Gurpreet Kaur",
      age: 32,
      village: "Ghanaur",
      time: "3:00 PM",
      type: "Video Call",
      status: "upcoming",
      symptoms: "Chest pain",
      priority: "high",
    },
    {
      id: 3,
      patient: "Harjeet Singh",
      age: 28,
      village: "Bhadson",
      time: "3:30 PM",
      type: "Follow-up",
      status: "completed",
      symptoms: "Diabetes check",
      priority: "low",
    },
  ]

  const patientQueue = [
    {
      id: 1,
      patient: "Simran Kaur",
      waitTime: "5 min",
      symptoms: "Stomach pain",
      priority: "medium",
    },
    {
      id: 2,
      patient: "Jasbir Singh",
      waitTime: "12 min",
      symptoms: "High BP",
      priority: "high",
    },
    {
      id: 3,
      patient: "Manpreet Kaur",
      waitTime: "8 min",
      symptoms: "Skin rash",
      priority: "low",
    },
  ]

  const dailyStats = [
    { label: "Patients Seen", value: "12", change: "+3", icon: Users },
    { label: "Consultations", value: "8", change: "+2", icon: Video },
    { label: "Prescriptions", value: "15", change: "+5", icon: FileText },
    { label: "Avg. Wait Time", value: "8 min", change: "-2", icon: Clock },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Kuldeep Singh",
      age: 38,
      village: "Nabha",
      lastVisit: "2 hours ago",
      condition: "Hypertension",
      status: "stable",
    },
    {
      id: 2,
      name: "Amarjeet Kaur",
      age: 52,
      village: "Ghanaur",
      lastVisit: "1 day ago",
      condition: "Diabetes",
      status: "monitoring",
    },
  ]

  return (
    <ThemedPageWrapper 
      headerBadge="Doctor Portal"
      backLink="/"
    >
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Good afternoon, Dr. Preet Singh</h1>
          <p className="text-slate-600 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Nabha Civil Hospital - General Medicine
          </p>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {dailyStats.map((stat, index) => {
            const Icon = stat.icon
            const isPositive = stat.change.startsWith("+")
            return (
              <Card
                key={index}
                className="backdrop-blur-md bg-white/20 border border-white/30 p-6 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`w-3 h-3 mr-1 ${isPositive ? "text-green-500" : "text-red-500"}`} />
                      <span className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} today
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Appointments */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Today's Appointments</h2>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  View Schedule
                </Button>
              </div>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="backdrop-blur-md bg-white/30 border border-white/40 p-4 hover:bg-white/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{appointment.patient}</h3>
                          <p className="text-sm text-slate-600">
                            Age {appointment.age} • {appointment.village}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-slate-600 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {appointment.time}
                            </span>
                            <span className="text-sm text-slate-600 flex items-center">
                              <Video className="w-3 h-3 mr-1" />
                              {appointment.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Symptoms: {appointment.symptoms}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            appointment.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : appointment.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {appointment.priority}
                        </Badge>
                        <Badge
                          className={
                            appointment.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        {appointment.status === "upcoming" && (
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            Start Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Recent Patients */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Patients</h2>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <Card key={patient.id} className="backdrop-blur-md bg-white/30 border border-white/40 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{patient.name}</h3>
                          <p className="text-sm text-slate-600">
                            Age {patient.age} • {patient.village}
                          </p>
                          <p className="text-xs text-slate-500">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{patient.lastVisit}</p>
                        <Badge
                          className={
                            patient.status === "stable"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Patient Queue */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Patient Queue</h2>
              <div className="space-y-4">
                {patientQueue.map((patient, index) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/20 border border-white/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{patient.patient}</p>
                        <p className="text-xs text-slate-600">{patient.symptoms}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-800">{patient.waitTime}</p>
                      <Badge
                        className={
                          patient.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : patient.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }
                      >
                        {patient.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                Call Next Patient
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Start Emergency Call
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create Prescription
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Patient Records
                </Button>
              </div>
            </Card>

            {/* Hospital Status */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Hospital Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Available Doctors</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">11/23</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Medicine Stock</span>
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Bed Availability</span>
                  <div className="flex items-center space-x-1">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">2/50</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ThemedPageWrapper>
  )
}
