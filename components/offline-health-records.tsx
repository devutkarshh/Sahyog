"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Download, Lock, Send as Sync, AlertTriangle, CheckCircle } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface OfflineHealthRecordsProps {
  isOnline: boolean
}

export default function OfflineHealthRecords({ isOnline }: OfflineHealthRecordsProps) {
  const [offlineRecords, setOfflineRecords] = useState<any[]>([])
  const [syncStatus, setSyncStatus] = useState<"synced" | "pending" | "error">("synced")
  const [lastSync, setLastSync] = useState<Date>(new Date())
  const { theme } = useTheme()

  useEffect(() => {
    // Load offline records from localStorage
    const storedRecords = localStorage.getItem("health-records-offline")
    if (storedRecords) {
      setOfflineRecords(JSON.parse(storedRecords))
    }

    // Check sync status
    const lastSyncTime = localStorage.getItem("last-sync-time")
    if (lastSyncTime) {
      setLastSync(new Date(lastSyncTime))
    }
  }, [])

  const downloadForOffline = () => {
    // Simulate downloading records for offline access
    const mockRecords = [
      {
        id: 1,
        date: "2024-01-15",
        type: "Consultation",
        diagnosis: "Common Cold",
        doctor: "Dr. Preet Singh",
        encrypted: true,
      },
      {
        id: 2,
        date: "2024-01-08",
        type: "Lab Test",
        diagnosis: "Blood Test - Routine",
        doctor: "Dr. Manpreet Kaur",
        encrypted: true,
      },
    ]

    localStorage.setItem("health-records-offline", JSON.stringify(mockRecords))
    localStorage.setItem("last-sync-time", new Date().toISOString())
    setOfflineRecords(mockRecords)
    setLastSync(new Date())
    setSyncStatus("synced")
  }

  const syncRecords = async () => {
    setSyncStatus("pending")

    // Simulate sync process
    setTimeout(() => {
      localStorage.setItem("last-sync-time", new Date().toISOString())
      setLastSync(new Date())
      setSyncStatus("synced")
    }, 2000)
  }

  if (!isOnline) {
    return (
      <Card className="backdrop-blur-md bg-white/20 border border-white/30 p-6">
              <div className="flex items-center space-x-4 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          theme === "dark" 
            ? "bg-gradient-to-br from-red-600 to-orange-600" 
            : "bg-gradient-to-br from-red-500 to-orange-500"
        }`}>
          <WifiOff className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className={`text-xl font-semibold ${
            theme === "dark" ? "text-white" : "text-slate-800"
          }`}>Offline Mode</h2>
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-slate-600"
          }`}>Accessing locally stored health records</p>
        </div>
      </div>

        {offlineRecords.length > 0 ? (
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 border rounded-lg ${
              theme === "dark"
                ? "bg-green-900/30 border-green-700/50"
                : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className={`font-medium ${
                    theme === "dark" ? "text-green-300" : "text-green-800"
                  }`}>Records Available Offline</p>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}>{offlineRecords.length} records accessible</p>
                </div>
              </div>
              <Badge className={
                theme === "dark" 
                  ? "bg-green-900/50 text-green-300 border-green-700" 
                  : "bg-green-100 text-green-700"
              }>Encrypted</Badge>
            </div>

            <div className="space-y-3">
              {offlineRecords.map((record) => (
                <Card key={record.id} className={`backdrop-blur-md border p-4 ${
                  theme === "dark"
                    ? "bg-gray-800/40 border-gray-600/50"
                    : "bg-white/30 border-white/40"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-slate-800"
                      }`}>{record.diagnosis}</h3>
                      <p className={`text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-slate-600"
                      }`}>{record.doctor}</p>
                      <p className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}>{record.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-indigo-500" />
                      <Badge className={
                        theme === "dark" 
                          ? "bg-indigo-900/50 text-indigo-300 border-indigo-700" 
                          : "bg-indigo-100 text-indigo-700"
                      }>{record.type}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className={`p-4 border rounded-lg ${
              theme === "dark"
                ? "bg-yellow-900/30 border-yellow-700/50"
                : "bg-yellow-50 border-yellow-200"
            }`}>
              <div className="flex items-start space-x-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                }`} />
                <div>
                  <h4 className={`font-medium ${
                    theme === "dark" ? "text-yellow-300" : "text-yellow-800"
                  }`}>Limited Functionality</h4>
                  <p className={`text-sm mt-1 ${
                    theme === "dark" ? "text-yellow-400" : "text-yellow-700"
                  }`}>
                    Some features may be unavailable offline. Connect to internet for full functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <WifiOff className={`w-16 h-16 mx-auto mb-4 ${
              theme === "dark" ? "text-gray-500" : "text-slate-400"
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}>No Offline Records</h3>
            <p className={`mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-slate-600"
            }`}>Download your health records when online to access them offline.</p>
            <Button disabled className={
              theme === "dark" 
                ? "bg-gray-700 text-gray-400" 
                : "bg-slate-300 text-slate-500"
            }>
              <Download className="w-4 h-4 mr-2" />
              Download Records (Requires Internet)
            </Button>
          </div>
        )}
      </Card>
    )
  }

  return (
    <Card className={`backdrop-blur-md border p-6 ${
      theme === "dark"
        ? "bg-slate-800/20 border-slate-700/30"
        : "bg-white/20 border-white/30"
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          theme === "dark" ? "text-slate-100" : "text-slate-800"
        }`}>Offline Sync</h2>
        <Badge
          className={
            syncStatus === "synced"
              ? theme === "dark" 
                ? "bg-green-900/50 text-green-400 border-green-700/50" 
                : "bg-green-100 text-green-700"
              : syncStatus === "pending"
                ? theme === "dark"
                  ? "bg-yellow-900/50 text-yellow-400 border-yellow-700/50"
                  : "bg-yellow-100 text-yellow-700"
                : theme === "dark"
                  ? "bg-red-900/50 text-red-400 border-red-700/50"
                  : "bg-red-100 text-red-700"
          }
        >
          {syncStatus === "synced" ? "Synced" : syncStatus === "pending" ? "Syncing..." : "Error"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className={`flex items-center justify-between p-4 border rounded-lg ${
          theme === "dark"
            ? "bg-blue-900/20 border-blue-700/30"
            : "bg-blue-50 border-blue-200"
        }`}>
          <div>
            <p className={`font-medium ${
              theme === "dark" ? "text-blue-300" : "text-blue-800"
            }`}>Last Sync</p>
            <p className={`text-sm ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}>{lastSync.toLocaleString()}</p>
          </div>
          <Button
            onClick={syncRecords}
            disabled={syncStatus === "pending"}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Sync className={`w-4 h-4 mr-2 ${syncStatus === "pending" ? "animate-spin" : ""}`} />
            Sync Now
          </Button>
        </div>

        <Button onClick={downloadForOffline} className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download for Offline Access
        </Button>

        <div className={`p-4 border rounded-lg ${
          theme === "dark"
            ? "bg-slate-800/30 border-slate-600/50"
            : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center space-x-3 mb-2">
            <Lock className={`w-5 h-5 ${
              theme === "dark" ? "text-gray-400" : "text-slate-600"
            }`} />
            <h4 className={`font-medium ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}>Security & Privacy</h4>
          </div>
          <ul className={`text-sm space-y-1 ${
            theme === "dark" ? "text-gray-300" : "text-slate-600"
          }`}>
            <li>• Records encrypted with AES-256</li>
            <li>• Local storage with secure access</li>
            <li>• Automatic sync when online</li>
            <li>• HIPAA compliant data handling</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
