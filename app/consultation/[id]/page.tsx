"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  FileText,
  Camera,
  Users,
  Clock,
  Heart,
  User,
  Send,
  Maximize,
  Minimize,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useComponentLoading } from "@/contexts/loading-context"
import { ConsultationSkeleton } from "@/components/ui/medical-skeleton"
import dynamic from 'next/dynamic'

// Dynamic import for video call interface
const VideoCallInterface = dynamic(() => import('@/components/video-call-interface'), {
  loading: () => <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center"><div className="text-white">Loading Video Interface...</div></div>,
  ssr: false
})

export default function VideoConsultation() {
  const params = useParams()
  const router = useRouter()
  const { loading: isLoading, startLoading, stopLoading } = useComponentLoading('consultation-session')
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [connectionStatus, setConnectionStatus] = useState("connecting")
  const [callDuration, setCallDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Dr. Preet Singh",
      message: "Hello! I can see you're joining the call. How are you feeling today?",
      time: "2:28 PM",
      isDoctor: true,
    },
    {
      id: 2,
      sender: "Rajinder Singh",
      message: "Hello Doctor, I've been having fever and headache for 2 days.",
      time: "2:29 PM",
      isDoctor: false,
    },
  ])

  const patientInfo = {
    name: "Rajinder Singh",
    age: 45,
    village: "Bhadson",
    symptoms: "Fever, headache",
    vitals: {
      temperature: "101.2°F",
      bloodPressure: "130/85",
      heartRate: "88 bpm",
    },
  }

  const doctorInfo = {
    name: "Dr. Preet Singh",
    specialty: "General Medicine",
    hospital: "Nabha Civil Hospital",
    experience: "12 years",
  }

  useEffect(() => {
    startLoading()
    // Simulate loading consultation session
    setTimeout(() => {
      stopLoading()
      setConnectionStatus("connected")
    }, 2000)
    setTimeout(() => setIsCallActive(true), 3000)
  }, [])

  useEffect(() => {
    // Start call timer
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCallActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "Rajinder Singh",
          message: chatMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isDoctor: false,
        },
      ])
      setChatMessage("")
    }
  }

  const handleEndCall = async () => {
    try {
      setIsCallActive(false)

      // Call API to end consultation
      const response = await fetch(`/api/video-consultation/${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Redirect back to patient dashboard
        router.push("/patient/dashboard")
      } else {
        console.error("Failed to end consultation")
        // Still redirect even if API fails
        router.push("/patient/dashboard")
      }
    } catch (error) {
      console.error("Error ending consultation:", error)
      // Redirect anyway
      router.push("/patient/dashboard")
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  NabhaHealth
                </span>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Video Consultation</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${connectionStatus === "connected" ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}
                ></div>
                <span className="text-sm text-slate-600 capitalize">{connectionStatus}</span>
              </div>
              {isCallActive && (
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatDuration(callDuration)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-6">
        {isLoading ? (
          <ConsultationSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Video Area */}
          <div className="lg:col-span-3">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 h-full relative overflow-hidden">
              {/* Main Video (Doctor) */}
              <div className="relative h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
                <video
                  ref={remoteVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  poster="/doctor-video-call-placeholder.jpg"
                />

                {/* Doctor Info Overlay */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{doctorInfo.name}</h3>
                      <p className="text-xs text-white/80">{doctorInfo.specialty}</p>
                    </div>
                  </div>
                </div>

                {/* Connection Status */}
                {connectionStatus !== "connected" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-lg font-semibold">Connecting to doctor...</p>
                      <p className="text-sm text-white/80">Please wait while we establish the connection</p>
                    </div>
                  </div>
                )}

                {/* Patient Video (Picture-in-Picture) */}
                <div className="absolute bottom-4 right-4 w-48 h-36 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                    poster="/patient-video-call-placeholder.jpg"
                  />
                  <div className="absolute top-2 left-2 backdrop-blur-md bg-white/20 rounded px-2 py-1">
                    <span className="text-xs text-white font-medium">You</span>
                  </div>
                  {!isVideoOn && (
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <VideoOff className="w-8 h-8 text-white/60" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-4 backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-6 py-3">
                    <Button
                      size="sm"
                      variant={isVideoOn ? "default" : "destructive"}
                      className="rounded-full w-12 h-12 p-0"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isAudioOn ? "default" : "destructive"}
                      className="rounded-full w-12 h-12 p-0"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-full w-12 h-12 p-0 bg-red-500 hover:bg-red-600"
                      onClick={handleEndCall}
                    >
                      <PhoneOff className="w-5 h-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0 bg-transparent"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full w-12 h-12 p-0 bg-transparent"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Patient Information */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-4">
              <h3 className="font-semibold text-slate-800 mb-4">Patient Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{patientInfo.name}</p>
                    <p className="text-sm text-slate-600">
                      Age {patientInfo.age} • {patientInfo.village}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-sm text-slate-600 mb-2">Current Symptoms:</p>
                  <Badge className="bg-red-100 text-red-700">{patientInfo.symptoms}</Badge>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-sm text-slate-600 mb-2">Vitals:</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="font-medium">{patientInfo.vitals.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blood Pressure:</span>
                      <span className="font-medium">{patientInfo.vitals.bloodPressure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heart Rate:</span>
                      <span className="font-medium">{patientInfo.vitals.heartRate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chat */}
            {showChat && (
              <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-4 h-80 flex flex-col">
                <h3 className="font-semibold text-slate-800 mb-4">Chat</h3>
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isDoctor ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.isDoctor ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-white/50 border border-white/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button size="sm" onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-4">
              <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Prescription
                </Button>
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Screenshot
                </Button>
                <Button variant="outline" className="w-full bg-transparent justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Add Specialist
                </Button>
              </div>
            </Card>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
