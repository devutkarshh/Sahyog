"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Settings,
  Wifi,
  WifiOff,
  Signal,
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface VideoCallInterfaceProps {
  patientName: string
  doctorName: string
  onEndCall: () => void
  isLowBandwidth?: boolean
}

export default function VideoCallInterface({
  patientName,
  doctorName,
  onEndCall,
  isLowBandwidth = false,
}: VideoCallInterfaceProps) {
  const [isVideoOn, setIsVideoOn] = useState(!isLowBandwidth)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [connectionQuality, setConnectionQuality] = useState<"good" | "fair" | "poor">("good")
  const [callDuration, setCallDuration] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    // Simulate connection quality changes
    const qualityInterval = setInterval(() => {
      const qualities: ("good" | "fair" | "poor")[] = ["good", "fair", "poor"]
      setConnectionQuality(qualities[Math.floor(Math.random() * qualities.length)])
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(qualityInterval)
    }
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getConnectionIcon = () => {
    switch (connectionQuality) {
      case "good":
        return <Wifi className="w-4 h-4 text-green-500" />
      case "fair":
        return <Signal className="w-4 h-4 text-yellow-500" />
      case "poor":
        return <WifiOff className="w-4 h-4 text-red-500" />
    }
  }

  return (
    <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
      {/* Call Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-xl font-semibold ${
            theme === "dark" ? "text-slate-100" : "text-slate-800"
          }`}>Video Consultation</h2>
          <p className={`text-sm ${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }`}>
            {patientName} ↔ {doctorName}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {getConnectionIcon()}
            <span className={`text-sm capitalize ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}>{connectionQuality}</span>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700">{formatDuration(callDuration)}</Badge>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden mb-6 h-64">
        {isLowBandwidth && (
          <div className="absolute top-4 left-4 backdrop-blur-md bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-2">
            <p className="text-xs text-yellow-700 font-medium">Low Bandwidth Mode</p>
          </div>
        )}

        {!isVideoOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <VideoOff className="w-16 h-16 mx-auto mb-2 opacity-60" />
              <p className="text-sm">Video is off</p>
            </div>
          </div>
        )}

        {/* Audio-only indicator */}
        {isLowBandwidth && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-10 h-10" />
              </div>
              <p className="text-lg font-semibold">Audio Call</p>
              <p className={`text-sm ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`}>Optimized for low bandwidth</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          size="sm"
          variant={isVideoOn ? "default" : "destructive"}
          className="rounded-full w-12 h-12 p-0"
          onClick={() => setIsVideoOn(!isVideoOn)}
          disabled={isLowBandwidth}
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
          onClick={onEndCall}
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
        <Button size="sm" variant="outline" className="rounded-full w-12 h-12 p-0 bg-transparent">
          <MessageSquare className="w-5 h-5" />
        </Button>
        <Button size="sm" variant="outline" className="rounded-full w-12 h-12 p-0 bg-transparent">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Low Bandwidth Tips */}
      {isLowBandwidth && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Low Bandwidth Tips:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Audio-only mode for better connection</li>
            <li>• Move closer to your router if possible</li>
            <li>• Close other apps using internet</li>
          </ul>
        </div>
      )}
    </Card>
  )
}
