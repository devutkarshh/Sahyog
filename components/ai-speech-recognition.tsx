'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RefreshCw, 
  Brain,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  Languages,
  BarChart3
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

interface SymptomExtractionResult {
  symptoms: string[]
  severity: 'mild' | 'moderate' | 'severe'
  duration: string
  confidence: number
}

interface DiseaseClassification {
  disease: string
  confidence: number
  description: string
  urgency: 'low' | 'medium' | 'high'
  category: string
}

interface AISymptomResponse {
  transcription: string
  detectedLanguage: string
  extractedSymptoms: SymptomExtractionResult
  predictions: DiseaseClassification[]
  recommendations: string[]
  requiresConsultation: boolean
  sessionId: string
}

const LANGUAGES = {
  auto: { name: 'Auto Detect', flag: '🌐' },
  english: { name: 'English', flag: '🇺🇸' },
  hindi: { name: 'हिंदी', flag: '🇮🇳' },
  punjabi: { name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
}

export default function AISpeechRecognition() {
  const { theme } = useTheme()
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('auto')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AISymptomResponse | null>(null)
  const [waveformData, setWaveformData] = useState<number[]>([])
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Initialize audio context for waveform visualization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      })
      
      // Setup waveform visualization
      if (audioContextRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream)
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        source.connect(analyserRef.current)
        updateWaveform()
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })
      
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setAudioBlob(audioBlob)
        setAudioUrl(URL.createObjectURL(audioBlob))
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      setRecordingDuration(0)
      
      // Start recording timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
      
    } catch (error) {
      console.error('Error starting recording:', error)
      alert('Unable to access microphone. Please check permissions.')
    }
  }

  // Update waveform visualization
  const updateWaveform = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyserRef.current.getByteFrequencyData(dataArray)
      
      // Sample every 8th value for visualization
      const sampledData = []
      for (let i = 0; i < bufferLength; i += 8) {
        sampledData.push(dataArray[i])
      }
      
      setWaveformData(sampledData)
      animationFrameRef.current = requestAnimationFrame(updateWaveform)
    }
  }

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setWaveformData([])
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }

  // Play/pause recorded audio
  const togglePlayback = () => {
    if (!audioUrl) return
    
    if (isPlaying) {
      // Pause audio
      setIsPlaying(false)
    } else {
      // Play audio
      const audio = new Audio(audioUrl)
      audio.play()
      setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
    }
  }

  // Analyze symptoms using AI
  const analyzeSymptoms = async () => {
    if (!audioBlob) return
    
    setIsProcessing(true)
    
    try {
      // Convert audio blob to base64
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Audio = reader.result as string
        
        const response = await fetch('/api/ai-symptom-checker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            audioData: base64Audio,
            language: selectedLanguage
          })
        })
        
        if (response.ok) {
          const result = await response.json()
          setAnalysisResult(result)
        } else {
          throw new Error('Analysis failed')
        }
      }
      
      reader.readAsDataURL(audioBlob)
    } catch (error) {
      console.error('Error analyzing symptoms:', error)
      alert('Failed to analyze symptoms. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset the component
  const resetRecording = () => {
    setAudioBlob(null)
    setAudioUrl('')
    setAnalysisResult(null)
    setRecordingDuration(0)
    setIsPlaying(false)
    setWaveformData([])
  }

  // Format recording duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getUrgencyBg = (urgency: string) => {
    switch (urgency) {
      case 'high': return theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'
      case 'medium': return theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50'
      case 'low': return theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'
      default: return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Language Selection */}
      <Card className={`p-6 ${
        theme === 'dark' 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-white/50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Languages className="w-5 h-5 text-indigo-500" />
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
              Language Selection
            </h3>
          </div>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className={`w-48 ${
              theme === 'dark' 
                ? 'bg-slate-700 border-slate-600 text-slate-100' 
                : 'bg-white border-slate-300'
            }`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([code, lang]) => (
                <SelectItem key={code} value={code}>
                  <span className="flex items-center space-x-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Speak clearly about your symptoms. Our AI supports English, Hindi, and Punjabi.
        </p>
      </Card>

      {/* Recording Interface */}
      <Card className={`p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700' 
          : 'bg-gradient-to-br from-white/50 to-slate-50/50 border-slate-200'
      }`}>
        <div className="text-center space-y-6">
          {/* Waveform Visualization */}
          {isRecording && (
            <div className="flex items-center justify-center space-x-1 h-16">
              {waveformData.map((amplitude, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-indigo-500 to-blue-500 rounded-full transition-all duration-75"
                  style={{
                    width: '3px',
                    height: `${Math.max(4, (amplitude / 255) * 60)}px`
                  }}
                />
              ))}
            </div>
          )}

          {/* Recording Button */}
          <div className="flex items-center justify-center">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`w-24 h-24 rounded-full transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
                  : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-lg shadow-indigo-500/25'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </Button>
          </div>

          {/* Recording Status */}
          <div className="space-y-2">
            {isRecording ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className={`font-medium ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                  Recording... {formatDuration(recordingDuration)}
                </span>
              </div>
            ) : audioBlob ? (
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={togglePlayback}
                  className={`${
                    theme === 'dark' 
                      ? 'border-slate-600 text-slate-200 hover:bg-slate-700' 
                      : 'border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play Recording'}
                </Button>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Duration: {formatDuration(recordingDuration)}
                </span>
              </div>
            ) : (
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Click the microphone to start recording your symptoms
              </p>
            )}
          </div>

          {/* Action Buttons */}
          {audioBlob && !analysisResult && (
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={analyzeSymptoms}
                disabled={isProcessing}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetRecording}
                className={`${
                  theme === 'dark' 
                    ? 'border-slate-600 text-slate-200 hover:bg-slate-700' 
                    : 'border-slate-300 hover:bg-slate-50'
                }`}
              >
                Record Again
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Processing State */}
      {isProcessing && (
        <div className="analyzing-state">
          <div className="medical-spinner">
            <div className="spinner"></div>
          </div>
          <div className="loading-text">
            Analyzing Your Voice
          </div>
          <p className="loading-subtitle">
            Our AI is processing your voice recording and extracting health insights
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Transcription */}
          <Card className={`p-6 ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                Transcription
              </h3>
              <Badge variant="secondary">
                {LANGUAGES[analysisResult.detectedLanguage as keyof typeof LANGUAGES]?.name || analysisResult.detectedLanguage}
              </Badge>
            </div>
            <p className={`p-4 rounded-lg italic ${
              theme === 'dark' 
                ? 'bg-slate-700/30 text-slate-300' 
                : 'bg-slate-50 text-slate-700'
            }`}>
              "{analysisResult.transcription}"
            </p>
          </Card>

          {/* Extracted Symptoms */}
          <Card className={`p-6 ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <Stethoscope className="w-5 h-5 text-emerald-500" />
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                Extracted Symptoms
              </h3>
              <Badge 
                variant="secondary"
                className={analysisResult.extractedSymptoms.severity === 'severe' ? 'bg-red-100 text-red-700' :
                          analysisResult.extractedSymptoms.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'}
              >
                {analysisResult.extractedSymptoms.severity}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {analysisResult.extractedSymptoms.symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-slate-700/30 border-slate-600' 
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    {symptom.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
            {analysisResult.extractedSymptoms.duration !== 'unknown' && (
              <div className="mt-4 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Duration: {analysisResult.extractedSymptoms.duration}
                </span>
              </div>
            )}
          </Card>

          {/* Disease Predictions */}
          <Card className={`p-6 ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="w-5 h-5 text-blue-500" />
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                AI Predictions
              </h3>
            </div>
            <div className="space-y-4">
              {analysisResult.predictions.map((prediction, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getUrgencyBg(prediction.urgency)} ${
                    theme === 'dark' ? 'border-slate-600' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                        {prediction.disease}
                      </span>
                      <Badge 
                        variant="secondary"
                        className={`${getUrgencyColor(prediction.urgency)} border-current`}
                      >
                        {prediction.urgency} urgency
                      </Badge>
                    </div>
                    <span className={`font-bold text-lg ${getUrgencyColor(prediction.urgency)}`}>
                      {prediction.confidence}%
                    </span>
                  </div>
                  <Progress 
                    value={prediction.confidence} 
                    className="mb-2 h-2"
                  />
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {prediction.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className={`p-6 ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/50 border-slate-200'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              {analysisResult.requiresConsultation ? (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                Recommendations
              </h3>
              {analysisResult.requiresConsultation && (
                <Badge className="bg-red-100 text-red-700">Consultation Required</Badge>
              )}
            </div>
            <div className="space-y-3">
              {analysisResult.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-slate-700/30' 
                      : 'bg-slate-50'
                  }`}
                >
                  <p className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
            
            {analysisResult.requiresConsultation && (
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Book Immediate Consultation
                </Button>
              </div>
            )}
          </Card>

          {/* Reset Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={resetRecording}
              className={`${
                theme === 'dark' 
                  ? 'border-slate-600 text-slate-200 hover:bg-slate-700' 
                  : 'border-slate-300 hover:bg-slate-50'
              }`}
            >
              New Symptom Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}