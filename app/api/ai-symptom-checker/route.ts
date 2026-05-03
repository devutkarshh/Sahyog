import { NextRequest, NextResponse } from 'next/server'

// Types for our AI pipeline
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

// Medical knowledge base - expandable with real datasets
const SYMPTOM_DISEASE_MAPPING = {
  'fever,headache,body_ache': [
    { disease: 'Dengue Fever', confidence: 75, category: 'vector_borne', urgency: 'high' },
    { disease: 'Malaria', confidence: 68, category: 'vector_borne', urgency: 'high' },
    { disease: 'Viral Fever', confidence: 45, category: 'viral', urgency: 'medium' }
  ],
  'cough,fever,chest_pain': [
    { disease: 'Pneumonia', confidence: 80, category: 'respiratory', urgency: 'high' },
    { disease: 'COVID-19', confidence: 65, category: 'viral', urgency: 'high' },
    { disease: 'Bronchitis', confidence: 50, category: 'respiratory', urgency: 'medium' }
  ],
  'stomach_pain,nausea,vomiting': [
    { disease: 'Food Poisoning', confidence: 70, category: 'gastrointestinal', urgency: 'medium' },
    { disease: 'Gastroenteritis', confidence: 65, category: 'gastrointestinal', urgency: 'medium' },
    { disease: 'Appendicitis', confidence: 45, category: 'gastrointestinal', urgency: 'high' }
  ],
  'headache,fever,neck_stiffness': [
    { disease: 'Meningitis', confidence: 85, category: 'neurological', urgency: 'high' },
    { disease: 'Migraine', confidence: 30, category: 'neurological', urgency: 'low' }
  ]
}

// Language detection patterns
const LANGUAGE_PATTERNS = {
  hindi: /[\u0900-\u097F]/,
  punjabi: /[\u0A00-\u0A7F]/,
  english: /^[a-zA-Z\s.,!?]+$/
}

// Medical entity extraction with multi-language support
function extractMedicalSymptoms(text: string, language: string): SymptomExtractionResult {
  const symptoms: string[] = []
  let severity: 'mild' | 'moderate' | 'severe' = 'mild'
  let duration = 'unknown'
  
  // English symptom extraction
  const englishSymptoms = {
    'fever': /\b(fever|temperature|hot|burning)\b/i,
    'cough': /\b(cough|coughing|throat)\b/i,
    'headache': /\b(headache|head pain|migraine)\b/i,
    'stomach_pain': /\b(stomach|belly|abdominal|tummy).*?(pain|ache|hurt)\b/i,
    'nausea': /\b(nausea|nauseated|sick|vomit)\b/i,
    'chest_pain': /\b(chest|heart).*?(pain|ache|hurt)\b/i,
    'body_ache': /\b(body|muscle|joint).*?(ache|pain)\b/i,
    'neck_stiffness': /\b(neck|stiff)\b/i
  }

  // Hindi symptom patterns
  const hindiSymptoms = {
    'fever': /\b(बुखार|तापमान|गर्मी)\b/,
    'cough': /\b(खांसी|गले)\b/,
    'headache': /\b(सिरदर्द|सिर में दर्द)\b/,
    'stomach_pain': /\b(पेट|पेट में दर्द)\b/,
    'nausea': /\b(जी मिचलाना|उल्टी)\b/
  }

  // Punjabi symptom patterns
  const punjabiSymptoms = {
    'fever': /\b(ਬੁਖਾਰ|ਤਾਪਮਾਨ)\b/,
    'cough': /\b(ਖੰਘ|ਗਲੇ)\b/,
    'headache': /\b(ਸਿਰ ਦਰਦ|ਸਿਰ ਵਿੱਚ ਦਰਦ)\b/
  }

  const symptomPatterns = language === 'hindi' ? hindiSymptoms : 
                         language === 'punjabi' ? punjabiSymptoms : 
                         englishSymptoms

  // Extract symptoms
  for (const [symptom, pattern] of Object.entries(symptomPatterns)) {
    if (pattern.test(text)) {
      symptoms.push(symptom)
    }
  }

  // Determine severity from keywords
  if (/\b(severe|intense|unbearable|बहुत|गंभीर|ਗੰਭੀਰ)\b/i.test(text)) {
    severity = 'severe'
  } else if (/\b(moderate|medium|मध्यम|ਮੱਧਮ)\b/i.test(text)) {
    severity = 'moderate'
  }

  // Extract duration
  const durationMatch = text.match(/(\d+)\s*(day|days|hour|hours|week|दिन|घंटे|ਦਿਨ|ਘੰਟੇ)/i)
  if (durationMatch) {
    duration = durationMatch[0]
  }

  return {
    symptoms,
    severity,
    duration,
    confidence: symptoms.length > 0 ? 0.8 : 0.3
  }
}

// Disease classification using symptom patterns
function classifyDiseases(symptoms: string[]): DiseaseClassification[] {
  const predictions: DiseaseClassification[] = []
  
  // Create symptom signature
  const symptomSignature = symptoms.sort().join(',')
  
  // Find matching patterns
  for (const [pattern, diseases] of Object.entries(SYMPTOM_DISEASE_MAPPING)) {
    const patternSymptoms = pattern.split(',')
    const matchCount = patternSymptoms.filter(s => symptoms.includes(s)).length
    const matchRatio = matchCount / patternSymptoms.length
    
    if (matchRatio > 0.5) {
      diseases.forEach(disease => {
        predictions.push({
          disease: disease.disease,
          confidence: Math.round(disease.confidence * matchRatio),
          description: getdiseaseDescription(disease.disease),
          urgency: disease.urgency as 'low' | 'medium' | 'high',
          category: disease.category
        })
      })
    }
  }

  // Sort by confidence and return top 3
  return predictions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3)
}

function getdiseaseDescription(disease: string): string {
  const descriptions: Record<string, string> = {
    'Dengue Fever': 'A mosquito-borne viral infection causing fever, headache, and muscle pain',
    'Malaria': 'A parasitic infection transmitted by mosquitoes, causing fever and chills',
    'Pneumonia': 'Infection that inflames air sacs in lungs, causing breathing difficulties',
    'COVID-19': 'Viral respiratory illness with fever, cough, and breathing problems',
    'Food Poisoning': 'Illness caused by contaminated food, causing stomach upset',
    'Gastroenteritis': 'Inflammation of stomach and intestines causing nausea and diarrhea',
    'Appendicitis': 'Inflammation of appendix requiring immediate medical attention',
    'Meningitis': 'Serious infection causing inflammation of brain and spinal cord membranes'
  }
  return descriptions[disease] || 'Medical condition requiring professional evaluation'
}

function generateRecommendations(predictions: DiseaseClassification[], severity: string): string[] {
  const recommendations: string[] = []
  
  const hasHighUrgency = predictions.some(p => p.urgency === 'high')
  const hasHighConfidence = predictions.some(p => p.confidence > 70)
  
  if (hasHighUrgency || severity === 'severe') {
    recommendations.push('🚨 Seek immediate medical attention')
    recommendations.push('📞 Consider visiting emergency room or calling ambulance')
  } else if (hasHighConfidence || severity === 'moderate') {
    recommendations.push('👩‍⚕️ Schedule consultation with a doctor within 24 hours')
    recommendations.push('💊 Take appropriate rest and monitor symptoms')
  } else {
    recommendations.push('🏠 Monitor symptoms and rest at home')
    recommendations.push('💧 Stay hydrated and maintain good nutrition')
  }

  // Specific recommendations based on predicted diseases
  if (predictions.some(p => p.disease.includes('Dengue') || p.disease.includes('Malaria'))) {
    recommendations.push('🦟 Use mosquito repellent and eliminate standing water')
  }
  
  if (predictions.some(p => p.category === 'respiratory')) {
    recommendations.push('😷 Wear mask and avoid crowded places')
  }

  return recommendations
}

// Simulate speech-to-text (in real implementation, use OpenAI Whisper or Google Speech)
function simulateSpeechToText(audioBase64: string): { text: string, language: string } {
  // This would be replaced with actual ASR service
  // For demo, we'll return sample transcriptions
  const sampleTranscriptions = [
    { text: "I have been having fever and headache for 2 days", language: "english" },
    { text: "मुझे 2 दिन से बुखार और सिरदर्द है", language: "hindi" },
    { text: "ਮੈਨੂੰ 2 ਦਿਨਾਂ ਤੋਂ ਬੁਖਾਰ ਅਤੇ ਸਿਰ ਦਰਦ ਹੈ", language: "punjabi" }
  ]
  
  return sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)]
}

function detectLanguage(text: string): string {
  if (LANGUAGE_PATTERNS.hindi.test(text)) return 'hindi'
  if (LANGUAGE_PATTERNS.punjabi.test(text)) return 'punjabi'
  return 'english'
}

export async function POST(request: NextRequest) {
  try {
    const { audioData, language = 'auto' } = await request.json()
    
    // Generate session ID
    const sessionId = `symptom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Step 1: Speech-to-Text
    const transcriptionResult = simulateSpeechToText(audioData)
    const detectedLanguage = language === 'auto' ? detectLanguage(transcriptionResult.text) : language
    
    // Step 2: Extract symptoms using NLP
    const extractedSymptoms = extractMedicalSymptoms(transcriptionResult.text, detectedLanguage)
    
    // Step 3: Classify diseases
    const predictions = classifyDiseases(extractedSymptoms.symptoms)
    
    // Step 4: Generate recommendations
    const recommendations = generateRecommendations(predictions, extractedSymptoms.severity)
    
    // Step 5: Determine if consultation is required
    const requiresConsultation = predictions.length === 0 || 
                                predictions[0]?.confidence < 70 ||
                                predictions.some(p => p.urgency === 'high')
    
    const response: AISymptomResponse = {
      transcription: transcriptionResult.text,
      detectedLanguage,
      extractedSymptoms,
      predictions,
      recommendations,
      requiresConsultation,
      sessionId
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('AI Symptom Checker Error:', error)
    return NextResponse.json(
      { error: 'Failed to process symptom analysis' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'AI Symptom Checker API Active',
    features: [
      'Multi-language speech recognition (English, Hindi, Punjabi)',
      'Medical entity extraction and symptom analysis',
      'Disease classification with confidence scoring',
      'Intelligent recommendations and urgency assessment',
      'Telemedicine integration for human-in-the-loop'
    ]
  })
}