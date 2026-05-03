"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Upload,
  Search,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Activity,
  Heart,
  Eye,
  Share,
  Lock,
  Wifi,
  WifiOff,
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useComponentLoading } from "@/contexts/loading-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"
import { HealthRecordsSkeleton } from "@/components/ui/medical-skeleton"

export default function HealthRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const { theme } = useTheme()
  const { loading, startLoading, stopLoading } = useComponentLoading('healthRecords')

  useEffect(() => {
    setIsVisible(true)
    // Simulate offline detection
    setIsOffline(!navigator.onLine)
    
    // Simulate loading records
    startLoading()
    setTimeout(() => {
      stopLoading()
    }, 1500)
  }, [])

  const healthRecords = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Consultation",
      doctor: "Dr. Preet Singh",
      hospital: "Nabha Civil Hospital",
      diagnosis: "Common Cold",
      symptoms: ["Fever", "Headache", "Cough"],
      prescription: [
        { medicine: "Paracetamol 500mg", dosage: "1 tablet twice daily", duration: "5 days" },
        { medicine: "Crocin Advance", dosage: "1 tablet as needed", duration: "3 days" },
      ],
      vitals: {
        temperature: "101.2°F",
        bloodPressure: "120/80",
        heartRate: "88 bpm",
        weight: "65 kg",
      },
      notes: "Patient advised complete rest and increased fluid intake. Follow-up if symptoms persist.",
      attachments: ["prescription.pdf", "lab_report.pdf"],
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-08",
      type: "Lab Test",
      doctor: "Dr. Manpreet Kaur",
      hospital: "Nabha Civil Hospital",
      diagnosis: "Blood Test - Routine",
      testResults: {
        hemoglobin: "12.5 g/dL",
        wbc: "7,200/μL",
        platelets: "250,000/μL",
        glucose: "95 mg/dL",
      },
      notes: "All parameters within normal range. Continue healthy lifestyle.",
      attachments: ["blood_test_report.pdf"],
      status: "completed",
    },
    {
      id: 3,
      date: "2024-01-01",
      type: "Vaccination",
      doctor: "Dr. Rajesh Kumar",
      hospital: "Nabha Civil Hospital",
      diagnosis: "COVID-19 Booster",
      vaccine: {
        name: "Covishield",
        batch: "ABC123",
        manufacturer: "Serum Institute",
      },
      notes: "No adverse reactions observed. Next dose due in 6 months.",
      attachments: ["vaccination_certificate.pdf"],
      status: "completed",
    },
  ]

  const vitalHistory = [
    { date: "2024-01-15", temperature: "101.2°F", bp: "120/80", hr: "88", weight: "65" },
    { date: "2024-01-08", temperature: "98.6°F", bp: "118/78", hr: "72", weight: "65" },
    { date: "2024-01-01", temperature: "98.4°F", bp: "115/75", hr: "70", weight: "64" },
  ]

  const filteredRecords = healthRecords.filter((record) => {
    const matchesSearch =
      record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "consultation") return matchesSearch && record.type === "Consultation"
    if (selectedFilter === "lab") return matchesSearch && record.type === "Lab Test"
    if (selectedFilter === "vaccination") return matchesSearch && record.type === "Vaccination"

    return matchesSearch
  })

  const downloadRecord = (record: any) => {
    // Simulate downloading record
    console.log("Downloading record:", record.id)
  }

  const shareRecord = (record: any) => {
    // Simulate sharing record
    console.log("Sharing record:", record.id)
  }

  if (loading) {
    return (
      <div className={`min-h-screen relative overflow-hidden ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50"
      }`}>
        <div className="container mx-auto px-6 py-8">
          <HealthRecordsSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === "dark" 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
        : "bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50"
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-700/20 to-slate-600/20"
            : "bg-gradient-to-br from-indigo-400/20 to-blue-400/20"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-600/20 to-slate-700/20"
            : "bg-gradient-to-br from-cyan-400/20 to-indigo-400/20"
        }`}></div>
      </div>

      {/* Header */}
      <header className={`relative z-10 backdrop-blur-md border-b ${
        theme === "dark"
          ? "bg-slate-800/10 border-slate-700/20"
          : "bg-white/10 border-white/20"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className={`text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent ${
                  theme === "dark" ? "from-indigo-400 to-blue-400" : "from-indigo-600 to-blue-600"
                }`}>
                  NabhaHealth
                </span>
              </Link>
              <Badge className={
                theme === "dark" 
                  ? "bg-indigo-900/50 text-indigo-400 border-indigo-700/50" 
                  : "bg-indigo-100 text-indigo-700 border-indigo-200"
              }>Health Records</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isOffline ? (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <span className={`text-sm text-red-600 ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>Offline</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className={`text-sm text-green-600 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>Online</span>
                  </>
                )}
              </div>
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600">
                <Upload className="w-4 h-4 mr-2" />
                Upload Record
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className={`text-3xl font-bold mb-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Your Health Records</h1>
          <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
            Secure, offline-accessible digital health records for comprehensive healthcare management
          </p>
        </div>

        {/* Search and Filters */}
        <Card className={`backdrop-blur-md border p-6 mb-8 ${
          theme === "dark"
            ? "bg-slate-800/20 border-slate-700/30"
            : "bg-white/20 border-white/30"
        }`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === "dark" ? "text-slate-300" : "text-slate-600"
              }`} />
              <input
                type="text"
                placeholder="Search records, doctors, or diagnoses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === "dark"
                    ? "bg-slate-700/50 border-slate-600/30 text-slate-100 placeholder-slate-400"
                    : "bg-white/50 border-white/30 text-slate-800 placeholder-slate-500"
                }`}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className={selectedFilter === "all" 
                  ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                  : theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    : "bg-transparent border-white/30 text-slate-600 hover:bg-white/20"
                }
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "consultation" ? "default" : "outline"}
                onClick={() => setSelectedFilter("consultation")}
                className={selectedFilter === "consultation" 
                  ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                  : theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    : "bg-transparent border-white/30 text-slate-600 hover:bg-white/20"
                }
              >
                Consultations
              </Button>
              <Button
                variant={selectedFilter === "lab" ? "default" : "outline"}
                onClick={() => setSelectedFilter("lab")}
                className={selectedFilter === "lab" 
                  ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                  : theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    : "bg-transparent border-white/30 text-slate-600 hover:bg-white/20"
                }
              >
                Lab Tests
              </Button>
              <Button
                variant={selectedFilter === "vaccination" ? "default" : "outline"}
                onClick={() => setSelectedFilter("vaccination")}
                className={selectedFilter === "vaccination" 
                  ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                  : theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    : "bg-transparent border-white/30 text-slate-600 hover:bg-white/20"
                }
              >
                Vaccinations
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Records List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Records */}
            <Card className={`backdrop-blur-md border p-6 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Medical Records</h2>
                <Badge className={
                  theme === "dark" 
                    ? "bg-blue-900/50 text-blue-400 border-blue-700/50" 
                    : "bg-blue-100 text-blue-700"
                }>{filteredRecords.length} records</Badge>
              </div>
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <Card
                    key={record.id}
                    className={`backdrop-blur-md border p-6 transition-all duration-300 cursor-pointer ${
                      theme === "dark"
                        ? "bg-slate-700/30 border-slate-600/40 hover:bg-slate-700/40"
                        : "bg-white/30 border-white/40 hover:bg-white/40"
                    }`}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                          {record.type === "Consultation" && <Stethoscope className="w-6 h-6 text-white" />}
                          {record.type === "Lab Test" && <Activity className="w-6 h-6 text-white" />}
                          {record.type === "Vaccination" && <Heart className="w-6 h-6 text-white" />}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{record.diagnosis}</h3>
                          <p className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{record.doctor}</p>
                          <p className={`text-xs ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{record.hospital}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-sm flex items-center ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                              <Calendar className="w-3 h-3 mr-1" />
                              {record.date}
                            </span>
                            <Badge className={
                              theme === "dark" 
                                ? "bg-green-900/50 text-green-400 border-green-700/50" 
                                : "bg-green-100 text-green-700"
                            }>{record.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadRecord(record)}
                          className={`${
                            theme === "dark"
                              ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                              : "bg-transparent border-white/30 text-slate-600 hover:bg-white/20"
                          }`}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => shareRecord(record)}
                          className={`${
                            theme === "dark"
                              ? "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700/50"
                              : "bg-transparent border-white/30 text-slate-600 hover:bg-white/20"
                          }`}
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Quick Preview */}
                    <div className={`border-t pt-4 ${theme === "dark" ? "border-slate-600/20" : "border-white/20"}`}>
                      {record.symptoms && (
                        <div className="mb-2">
                          <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>Symptoms: </span>
                          <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{record.symptoms.join(", ")}</span>
                        </div>
                      )}
                      {record.testResults && (
                        <div className="mb-2">
                          <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>Key Results: </span>
                          <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                            Hemoglobin: {record.testResults.hemoglobin}, Glucose: {record.testResults.glucose}
                          </span>
                        </div>
                      )}
                      {record.vaccine && (
                        <div className="mb-2">
                          <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>Vaccine: </span>
                          <span className={`text-sm ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{record.vaccine.name}</span>
                        </div>
                      )}
                      <p className={`text-xs mt-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{record.notes}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Vital Signs History */}
            <Card className={`backdrop-blur-md border p-6 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}>
              <h2 className={`text-xl font-semibold mb-6 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Vital Signs History</h2>
              <div className="space-y-4">
                {vitalHistory.map((vital, index) => (
                  <Card key={index} className={`backdrop-blur-md border p-4 ${
                    theme === "dark"
                      ? "bg-slate-700/30 border-slate-600/40"
                      : "bg-white/30 border-white/40"
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{vital.date}</span>
                      <Badge className={`${theme === "dark" ? "bg-green-700 text-green-100" : "bg-green-100 text-green-700"}`}>Normal</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>BP: {vital.bp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>HR: {vital.hr}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
                        <span className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Temp: {vital.temperature}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-green-500" />
                        <span className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Weight: {vital.weight}kg</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Offline Access */}
            <Card className={`backdrop-blur-md border p-6 ${
              theme === "dark"
                ? "bg-slate-800/40 border-slate-600/50"
                : "bg-white/20 border-white/30"
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Offline Access</h2>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  theme === "dark" ? "bg-slate-700/40" : "bg-white/20"
                }`}>
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Encrypted Storage</p>
                      <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Records secured locally</p>
                    </div>
                  </div>
                  <Badge className={`${theme === "dark" ? "bg-green-700 text-green-100" : "bg-green-100 text-green-700"}`}>Active</Badge>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  theme === "dark" ? "bg-slate-700/40" : "bg-white/20"
                }`}>
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Offline Sync</p>
                      <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Last synced: 2 hours ago</p>
                    </div>
                  </div>
                  <Button size="sm" className={`${
                    theme === "dark"
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  }`}>
                    Sync Now
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className={`backdrop-blur-md border p-6 ${
              theme === "dark"
                ? "bg-slate-800/40 border-slate-600/50"
                : "bg-white/20 border-white/30"
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white justify-start">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
                <Button variant="outline" className={`w-full justify-start ${
                  theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700"
                    : "bg-transparent border-slate-300 text-slate-700 hover:bg-white/10"
                }`}>
                  <Pill className="w-4 h-4 mr-2" />
                  Request Prescription
                </Button>
                <Button variant="outline" className={`w-full justify-start ${
                  theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700"
                    : "bg-transparent border-slate-300 text-slate-700 hover:bg-white/10"
                }`}>
                  <Activity className="w-4 h-4 mr-2" />
                  Schedule Lab Test
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Record Detail Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className={`backdrop-blur-md border p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto ${
              theme === "dark"
                ? "bg-slate-800/90 border-slate-600/50"
                : "bg-white/90 border-white/30"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.diagnosis}</h2>
                <Button variant="outline" onClick={() => setSelectedRecord(null)} className={`${
                  theme === "dark"
                    ? "bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700"
                    : "bg-transparent border-slate-300 text-slate-700 hover:bg-white/10"
                }`}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>Date</p>
                    <p className={`${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.date}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>Doctor</p>
                    <p className={`${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.doctor}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>Hospital</p>
                    <p className={`${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.hospital}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>Type</p>
                    <Badge className={`${theme === "dark" ? "bg-indigo-700 text-indigo-100" : "bg-indigo-100 text-indigo-700"}`}>{selectedRecord.type}</Badge>
                  </div>
                </div>

                {selectedRecord.vitals && (
                  <div>
                    <h3 className={`font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Vital Signs</h3>
                    <div className={`grid grid-cols-2 gap-4 p-4 rounded-lg ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                    }`}>
                      <div>
                        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Temperature</p>
                        <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.vitals.temperature}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Blood Pressure</p>
                        <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.vitals.bloodPressure}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Heart Rate</p>
                        <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.vitals.heartRate}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>Weight</p>
                        <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{selectedRecord.vitals.weight}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRecord.prescription && (
                  <div>
                    <h3 className={`font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Prescription</h3>
                    <div className="space-y-3">
                      {selectedRecord.prescription.map((med: any, index: number) => (
                        <div key={index} className={`p-4 rounded-lg ${
                          theme === "dark" ? "bg-slate-700/50" : "bg-slate-50"
                        }`}>
                          <p className={`font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{med.medicine}</p>
                          <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                            {med.dosage} for {med.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className={`font-semibold mb-3 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>Doctor's Notes</h3>
                  <p className={`p-4 rounded-lg ${
                    theme === "dark" 
                      ? "text-slate-300 bg-slate-700/50" 
                      : "text-slate-700 bg-slate-50"
                  }`}>{selectedRecord.notes}</p>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className={`flex-1 ${
                    theme === "dark"
                      ? "bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700"
                      : "bg-transparent border-slate-300 text-slate-700 hover:bg-white/10"
                  }`}>
                    <Share className="w-4 h-4 mr-2" />
                    Share Record
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
