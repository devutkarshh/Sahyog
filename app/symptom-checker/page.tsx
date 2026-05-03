"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Heart,
  Activity,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  FileText,
  Mic,
  MessageSquare,
  Sparkles,
  Shield,
  ClipboardList
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"
import ThemeSwitcher from "@/components/theme-switcher"
import dynamic from 'next/dynamic'
import "./glassmorphic-styles.css"

// Dynamic imports for heavy components
const AISpeechRecognition = dynamic(() => import('@/components/ai-speech-recognition'), {
  loading: () => (
    <div className="analyzing-state">
      <div className="medical-spinner">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">Loading AI Speech Recognition</div>
      <p className="loading-subtitle">Preparing voice analysis system...</p>
    </div>
  ),
  ssr: false
})

const ManualSymptomEntry = dynamic(() => import('@/components/manual-symptom-entry'), {
  loading: () => (
    <div className="analyzing-state">
      <div className="medical-spinner">
        <div className="spinner"></div>
      </div>
      <div className="loading-text">Loading Symptom Entry</div>
      <p className="loading-subtitle">Preparing symptom analysis forms...</p>
    </div>
  ),
  ssr: false
})

export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [severity, setSeverity] = useState("")
  const [duration, setDuration] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("ai-voice")
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const steps = ["Basic Information", "Select Symptoms", "Symptom Details", "Analysis Results"]

  const commonSymptoms = [
    { id: "fever", name: "Fever", icon: Thermometer, category: "General" },
    { id: "headache", name: "Headache", icon: Brain, category: "Neurological" },
    { id: "cough", name: "Cough", icon: Activity, category: "Respiratory" },
    { id: "sore_throat", name: "Sore Throat", icon: Activity, category: "Respiratory" },
    { id: "body_ache", name: "Body Ache", icon: Activity, category: "Musculoskeletal" },
    { id: "nausea", name: "Nausea", icon: Activity, category: "Gastrointestinal" },
    { id: "fatigue", name: "Fatigue", icon: Clock, category: "General" },
    { id: "dizziness", name: "Dizziness", icon: Brain, category: "Neurological" },
    { id: "chest_pain", name: "Chest Pain", icon: Heart, category: "Cardiovascular" },
    { id: "shortness_breath", name: "Shortness of Breath", icon: Activity, category: "Respiratory" },
    { id: "stomach_pain", name: "Stomach Pain", icon: Activity, category: "Gastrointestinal" },
    { id: "joint_pain", name: "Joint Pain", icon: Activity, category: "Musculoskeletal" },
  ]

  return (
    <div className="symptom-checker-canvas symptom-typography">
      <div className="container mx-auto px-6 py-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 relative">
            {/* Theme Switcher */}
            <div className="absolute top-0 right-0">
              <ThemeSwitcher />
            </div>
            
            <h1 className="main-title">
              <ClipboardList className="main-title-icon" />
              Sahyog AI Symptom Checker
            </h1>
            <p className="subtitle-text max-w-2xl mx-auto text-lg">
              Advanced AI-powered health analysis with multi-language support. 
              Get intelligent health insights through voice or manual entry.
            </p>
          </div>

          {/* Main Glass Container */}
          <div className="glassmorphic-container p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 glass-panel p-2">
                <TabsTrigger 
                  value="ai-voice" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:text-teal-700 rounded-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold">AI Voice Analysis</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="manual" 
                  className="flex items-center space-x-2 data-[state=active]:bg-white/80 data-[state=active]:text-teal-700 rounded-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-semibold">Manual Entry</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai-voice" className="space-y-6">
                <div className="text-center mb-6 glass-panel p-6">
                  <h2 className="section-header justify-center">
                    <Mic className="section-header-icon" />
                    Speak Your Symptoms
                  </h2>
                  <p className="body-text">
                    Describe how you are feeling in your preferred language. Our AI will analyze your symptoms 
                    and provide intelligent health insights.
                  </p>
                </div>
                
                <AISpeechRecognition />
              </TabsContent>

              <TabsContent value="manual" className="space-y-6">
                <ManualSymptomEntry />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
