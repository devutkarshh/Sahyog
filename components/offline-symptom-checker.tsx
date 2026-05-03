"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, Brain, AlertTriangle, Download } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface OfflineSymptomCheckerProps {
  isOnline: boolean
}

export default function OfflineSymptomChecker({ isOnline }: OfflineSymptomCheckerProps) {
  const [offlineData, setOfflineData] = useState<any>(null)
  const [isDataDownloaded, setIsDataDownloaded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Check if offline data is available
    const storedData = localStorage.getItem("symptom-checker-offline-data")
    if (storedData) {
      setOfflineData(JSON.parse(storedData))
      setIsDataDownloaded(true)
    }
  }, [])

  const downloadOfflineData = () => {
    // Simulate downloading offline symptom checker data
    const mockOfflineData = {
      symptoms: [
        { id: "fever", name: "Fever", category: "General" },
        { id: "headache", name: "Headache", category: "Neurological" },
        { id: "cough", name: "Cough", category: "Respiratory" },
      ],
      conditions: [
        {
          name: "Common Cold",
          symptoms: ["fever", "headache", "cough"],
          severity: "Mild",
          recommendations: ["Rest", "Hydration", "Monitor symptoms"],
        },
      ],
      emergencySymptoms: ["Severe chest pain", "Difficulty breathing", "Loss of consciousness", "Severe bleeding"],
    }

    localStorage.setItem("symptom-checker-offline-data", JSON.stringify(mockOfflineData))
    setOfflineData(mockOfflineData)
    setIsDataDownloaded(true)
  }

  if (!isOnline && !isDataDownloaded) {
    return (
      <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-8 text-center">
        <WifiOff className={`w-16 h-16 mx-auto mb-4 ${
          theme === "dark" ? "text-slate-400" : "text-slate-400"
        }`} />
        <h2 className={`text-xl font-semibold mb-2 ${
          theme === "dark" ? "text-slate-100" : "text-slate-800"
        }`}>Offline Mode</h2>
        <p className={`mb-6 ${
          theme === "dark" ? "text-slate-300" : "text-slate-600"
        }`}>
          You're currently offline. Download the basic symptom checker to use without internet.
        </p>
        <Button onClick={downloadOfflineData} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download Offline Data
        </Button>
      </Card>
    )
  }

  if (!isOnline && isDataDownloaded) {
    return (
      <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <WifiOff className={`w-6 h-6 ${
            theme === "dark" ? "text-slate-400" : "text-slate-600"
          }`} />
          <div>
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-slate-100" : "text-slate-800"
            }`}>Offline Symptom Checker</h2>
            <p className={`text-sm ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}>Basic symptom analysis available</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Limited Functionality</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Offline mode provides basic symptom matching. For comprehensive AI analysis, connect to the internet.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Emergency Symptoms - Seek Immediate Help:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {offlineData?.emergencySymptoms?.map((symptom: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Brain className="w-4 h-4 mr-2" />
            Start Basic Symptom Check
          </Button>
        </div>
      </Card>
    )
  }

  return null
}
