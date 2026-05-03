import { NextRequest, NextResponse } from 'next/server'

interface ConsultationRequest {
  sessionId: string
  patientData: {
    age: string
    gender: string
    symptoms: string[]
    severity: string
    duration: string
  }
  aiAnalysis: {
    predictions: Array<{
      disease: string
      confidence: number
      urgency: 'low' | 'medium' | 'high'
    }>
    requiresConsultation: boolean
    transcription?: string
    detectedLanguage?: string
  }
  urgencyLevel: 'low' | 'medium' | 'high'
  preferredLanguage: string
}

interface Doctor {
  id: string
  name: string
  specialization: string
  languages: string[]
  availability: 'available' | 'busy' | 'offline'
  rating: number
  consultationsFee: number
}

// Mock doctor database - in production, this would be a real database
const availableDoctors: Doctor[] = [
  {
    id: 'dr_001',
    name: 'Dr. Rajesh Kumar',
    specialization: 'General Medicine',
    languages: ['english', 'hindi', 'punjabi'],
    availability: 'available',
    rating: 4.8,
    consultationsFee: 500
  },
  {
    id: 'dr_002', 
    name: 'Dr. Priya Singh',
    specialization: 'Internal Medicine',
    languages: ['english', 'hindi'],
    availability: 'available',
    rating: 4.9,
    consultationsFee: 600
  },
  {
    id: 'dr_003',
    name: 'Dr. Manpreet Kaur',
    specialization: 'Family Medicine',
    languages: ['english', 'punjabi', 'hindi'],
    availability: 'available',
    rating: 4.7,
    consultationsFee: 450
  },
  {
    id: 'dr_004',
    name: 'Dr. Amit Sharma',
    specialization: 'Emergency Medicine',
    languages: ['english', 'hindi'],
    availability: 'busy',
    rating: 4.9,
    consultationsFee: 800
  }
]

function findBestDoctor(request: ConsultationRequest): Doctor | null {
  const { preferredLanguage, urgencyLevel, aiAnalysis } = request
  
  // Filter doctors by language and availability
  const suitableDoctors = availableDoctors.filter(doctor => {
    const isLanguageCompatible = doctor.languages.includes(preferredLanguage)
    const isAvailable = doctor.availability === 'available' || 
      (urgencyLevel === 'high' && doctor.availability === 'busy')
    
    return isLanguageCompatible && isAvailable
  })
  
  if (suitableDoctors.length === 0) {
    return null
  }
  
  // For high urgency, prioritize emergency medicine specialists
  if (urgencyLevel === 'high') {
    const emergencyDoctors = suitableDoctors.filter(d => 
      d.specialization.includes('Emergency') || d.specialization.includes('Internal')
    )
    if (emergencyDoctors.length > 0) {
      return emergencyDoctors.sort((a, b) => b.rating - a.rating)[0]
    }
  }
  
  // For specific conditions, try to match specialization
  const predictions = aiAnalysis.predictions
  if (predictions.length > 0) {
    const topCondition = predictions[0].disease.toLowerCase()
    
    if (topCondition.includes('heart') || topCondition.includes('chest')) {
      const cardioDoctors = suitableDoctors.filter(d => 
        d.specialization.includes('Internal') || d.specialization.includes('Emergency')
      )
      if (cardioDoctors.length > 0) {
        return cardioDoctors.sort((a, b) => b.rating - a.rating)[0]
      }
    }
  }
  
  // Default: return highest rated available doctor
  return suitableDoctors.sort((a, b) => b.rating - a.rating)[0]
}

function generateConsultationSummary(request: ConsultationRequest): string {
  const { patientData, aiAnalysis } = request
  
  let summary = `**AI Symptom Analysis Summary**\n\n`
  summary += `**Patient Information:**\n`
  summary += `- Age: ${patientData.age}\n`
  summary += `- Gender: ${patientData.gender}\n`
  summary += `- Symptom Duration: ${patientData.duration}\n`
  summary += `- Severity: ${patientData.severity}\n\n`
  
  summary += `**Reported Symptoms:**\n`
  patientData.symptoms.forEach(symptom => {
    summary += `- ${symptom.replace('_', ' ')}\n`
  })
  
  if (aiAnalysis.transcription) {
    summary += `\n**Patient's Description (${aiAnalysis.detectedLanguage}):**\n`
    summary += `"${aiAnalysis.transcription}"\n\n`
  }
  
  summary += `**AI Predictions:**\n`
  aiAnalysis.predictions.forEach((prediction, index) => {
    summary += `${index + 1}. ${prediction.disease} (${prediction.confidence}% confidence, ${prediction.urgency} urgency)\n`
  })
  
  summary += `\n**Recommendation:** ${aiAnalysis.requiresConsultation ? 'Professional consultation recommended' : 'Monitor symptoms'}`
  
  return summary
}

export async function POST(request: NextRequest) {
  try {
    const consultationRequest: ConsultationRequest = await request.json()
    
    // Find the best available doctor
    const assignedDoctor = findBestDoctor(consultationRequest)
    
    if (!assignedDoctor) {
      return NextResponse.json({
        success: false,
        error: 'No suitable doctor available',
        message: 'All doctors are currently busy. Please try again in a few minutes or visit the nearest healthcare facility.',
        waitTime: '10-15 minutes'
      }, { status: 503 })
    }
    
    // Generate consultation summary
    const consultationSummary = generateConsultationSummary(consultationRequest)
    
    // Create consultation session
    const consultationId = `consult_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // In production, this would create a real consultation session in the database
    const consultation = {
      id: consultationId,
      sessionId: consultationRequest.sessionId,
      doctorId: assignedDoctor.id,
      doctorName: assignedDoctor.name,
      doctorSpecialization: assignedDoctor.specialization,
      patientSummary: consultationSummary,
      urgencyLevel: consultationRequest.urgencyLevel,
      preferredLanguage: consultationRequest.preferredLanguage,
      estimatedDuration: consultationRequest.urgencyLevel === 'high' ? '15-20 min' : '10-15 min',
      consultationFee: assignedDoctor.consultationsFee,
      status: 'scheduled',
      scheduledAt: new Date().toISOString(),
      estimatedStart: new Date(Date.now() + (consultationRequest.urgencyLevel === 'high' ? 2 * 60000 : 5 * 60000)).toISOString()
    }
    
    // Prepare response
    const response = {
      success: true,
      consultation,
      doctor: {
        name: assignedDoctor.name,
        specialization: assignedDoctor.specialization,
        rating: assignedDoctor.rating,
        languages: assignedDoctor.languages,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${assignedDoctor.id}`
      },
      waitTime: consultationRequest.urgencyLevel === 'high' ? '2-3 minutes' : '5-10 minutes',
      preparation: [
        'Keep your symptoms description ready',
        'Have your medical history available if possible', 
        'Ensure good internet connection for video call',
        'Find a quiet, well-lit space for the consultation'
      ],
      nextSteps: [
        'You will receive a notification when the doctor is ready',
        'The consultation will start automatically',
        'A detailed report will be generated after the session'
      ]
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Consultation booking error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to book consultation',
        message: 'There was an error processing your request. Please try again.'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const consultationId = searchParams.get('id')
  
  if (!consultationId) {
    return NextResponse.json(
      { error: 'Consultation ID required' },
      { status: 400 }
    )
  }
  
  // Mock consultation status check
  const consultation = {
    id: consultationId,
    status: 'in_progress', // scheduled, in_progress, completed, cancelled
    doctorName: 'Dr. Rajesh Kumar',
    estimatedTimeRemaining: '8 minutes',
    currentPosition: consultationId.includes('high') ? 1 : 2,
    totalQueue: 3
  }
  
  return NextResponse.json(consultation)
}

// WebSocket endpoint for real-time consultation updates would be implemented separately