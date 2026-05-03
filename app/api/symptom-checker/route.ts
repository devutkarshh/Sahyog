import { type NextRequest, NextResponse } from "next/server"

// Mock AI symptom analysis database with comprehensive symptom coverage
const symptomDatabase = {
  // General symptoms
  fever: {
    conditions: [
      { name: "Common Cold", probability: 0.4, severity: "mild" },
      { name: "Flu", probability: 0.3, severity: "moderate" },
      { name: "Viral Infection", probability: 0.2, severity: "mild" },
      { name: "Bacterial Infection", probability: 0.1, severity: "moderate" },
    ],
  },
  "fatigue/tiredness": {
    conditions: [
      { name: "Common Cold", probability: 0.3, severity: "mild" },
      { name: "Flu", probability: 0.4, severity: "moderate" },
      { name: "Anemia", probability: 0.2, severity: "moderate" },
      { name: "Thyroid Disorder", probability: 0.1, severity: "moderate" },
    ],
  },
  chills: {
    conditions: [
      { name: "Flu", probability: 0.5, severity: "moderate" },
      { name: "Malaria", probability: 0.3, severity: "severe" },
      { name: "Sepsis", probability: 0.2, severity: "severe" },
    ],
  },
  "excessive_sweating": {
    conditions: [
      { name: "Hyperthyroidism", probability: 0.4, severity: "moderate" },
      { name: "Menopause", probability: 0.3, severity: "mild" },
      { name: "Anxiety", probability: 0.2, severity: "mild" },
      { name: "Tuberculosis", probability: 0.1, severity: "severe" },
    ],
  },
  "general_weakness": {
    conditions: [
      { name: "Anemia", probability: 0.4, severity: "moderate" },
      { name: "Dehydration", probability: 0.3, severity: "mild" },
      { name: "Diabetes", probability: 0.2, severity: "moderate" },
      { name: "Heart Disease", probability: 0.1, severity: "severe" },
    ],
  },
  "unexplained_weight_loss": {
    conditions: [
      { name: "Hyperthyroidism", probability: 0.3, severity: "moderate" },
      { name: "Diabetes", probability: 0.3, severity: "moderate" },
      { name: "Cancer", probability: 0.2, severity: "severe" },
      { name: "Tuberculosis", probability: 0.2, severity: "severe" },
    ],
  },

  // Head & Neurological symptoms  
  headache: {
    conditions: [
      { name: "Tension Headache", probability: 0.5, severity: "mild" },
      { name: "Migraine", probability: 0.3, severity: "moderate" },
      { name: "Dehydration", probability: 0.15, severity: "mild" },
      { name: "Sinusitis", probability: 0.05, severity: "moderate" },
    ],
  },
  dizziness: {
    conditions: [
      { name: "Vertigo", probability: 0.4, severity: "moderate" },
      { name: "Low Blood Pressure", probability: 0.3, severity: "mild" },
      { name: "Dehydration", probability: 0.2, severity: "mild" },
      { name: "Inner Ear Infection", probability: 0.1, severity: "moderate" },
    ],
  },
  confusion: {
    conditions: [
      { name: "Dehydration", probability: 0.3, severity: "moderate" },
      { name: "Dementia", probability: 0.3, severity: "severe" },
      { name: "Medication Side Effect", probability: 0.2, severity: "mild" },
      { name: "Stroke", probability: 0.2, severity: "severe" },
    ],
  },
  "memory_problems": {
    conditions: [
      { name: "Alzheimer's Disease", probability: 0.4, severity: "severe" },
      { name: "Depression", probability: 0.3, severity: "moderate" },
      { name: "Stress", probability: 0.2, severity: "mild" },
      { name: "Thyroid Disorder", probability: 0.1, severity: "moderate" },
    ],
  },
  seizures: {
    conditions: [
      { name: "Epilepsy", probability: 0.5, severity: "severe" },
      { name: "Brain Tumor", probability: 0.3, severity: "severe" },
      { name: "Stroke", probability: 0.2, severity: "severe" },
    ],
  },
  "numbness/tingling": {
    conditions: [
      { name: "Diabetes", probability: 0.4, severity: "moderate" },
      { name: "Carpal Tunnel Syndrome", probability: 0.3, severity: "mild" },
      { name: "Vitamin B12 Deficiency", probability: 0.2, severity: "moderate" },
      { name: "Stroke", probability: 0.1, severity: "severe" },
    ],
  },

  // Respiratory symptoms
  cough: {
    conditions: [
      { name: "Common Cold", probability: 0.4, severity: "mild" },
      { name: "Bronchitis", probability: 0.25, severity: "moderate" },
      { name: "Allergies", probability: 0.2, severity: "mild" },
      { name: "Pneumonia", probability: 0.15, severity: "severe" },
    ],
  },
  "shortness_of_breath": {
    conditions: [
      { name: "Asthma", probability: 0.4, severity: "moderate" },
      { name: "Pneumonia", probability: 0.3, severity: "severe" },
      { name: "Heart Disease", probability: 0.2, severity: "severe" },
      { name: "Anxiety", probability: 0.1, severity: "mild" },
    ],
  },
  "chest_pain": {
    conditions: [
      { name: "Muscle Strain", probability: 0.4, severity: "mild" },
      { name: "Gastroesophageal Reflux", probability: 0.3, severity: "mild" },
      { name: "Heart Attack", probability: 0.2, severity: "severe" },
      { name: "Pneumonia", probability: 0.1, severity: "severe" },
    ],
  },
  wheezing: {
    conditions: [
      { name: "Asthma", probability: 0.6, severity: "moderate" },
      { name: "Bronchitis", probability: 0.3, severity: "moderate" },
      { name: "Pneumonia", probability: 0.1, severity: "severe" },
    ],
  },
  "sore_throat": {
    conditions: [
      { name: "Viral Pharyngitis", probability: 0.5, severity: "mild" },
      { name: "Strep Throat", probability: 0.3, severity: "moderate" },
      { name: "Allergies", probability: 0.2, severity: "mild" },
    ],
  },
  "runny_nose": {
    conditions: [
      { name: "Common Cold", probability: 0.5, severity: "mild" },
      { name: "Allergies", probability: 0.4, severity: "mild" },
      { name: "Sinusitis", probability: 0.1, severity: "moderate" },
    ],
  },

  // Digestive symptoms
  stomach_pain: {
    conditions: [
      { name: "Indigestion", probability: 0.4, severity: "mild" },
      { name: "Gastritis", probability: 0.3, severity: "moderate" },
      { name: "Food Poisoning", probability: 0.2, severity: "moderate" },
      { name: "Appendicitis", probability: 0.1, severity: "severe" },
    ],
  },
  nausea: {
    conditions: [
      { name: "Food Poisoning", probability: 0.4, severity: "moderate" },
      { name: "Gastroenteritis", probability: 0.3, severity: "moderate" },
      { name: "Pregnancy", probability: 0.2, severity: "mild" },
      { name: "Migraine", probability: 0.1, severity: "moderate" },
    ],
  },
  vomiting: {
    conditions: [
      { name: "Food Poisoning", probability: 0.5, severity: "moderate" },
      { name: "Gastroenteritis", probability: 0.3, severity: "moderate" },
      { name: "Appendicitis", probability: 0.2, severity: "severe" },
    ],
  },
  diarrhea: {
    conditions: [
      { name: "Gastroenteritis", probability: 0.5, severity: "moderate" },
      { name: "Food Poisoning", probability: 0.3, severity: "moderate" },
      { name: "Irritable Bowel Syndrome", probability: 0.2, severity: "mild" },
    ],
  },
  constipation: {
    conditions: [
      { name: "Dietary Issues", probability: 0.5, severity: "mild" },
      { name: "Dehydration", probability: 0.3, severity: "mild" },
      { name: "Medication Side Effect", probability: 0.2, severity: "mild" },
    ],
  },
  "loss_of_appetite": {
    conditions: [
      { name: "Depression", probability: 0.4, severity: "moderate" },
      { name: "Infection", probability: 0.3, severity: "moderate" },
      { name: "Cancer", probability: 0.2, severity: "severe" },
      { name: "Liver Disease", probability: 0.1, severity: "severe" },
    ],
  },

  // Musculoskeletal symptoms
  body_ache: {
    conditions: [
      { name: "Flu", probability: 0.4, severity: "moderate" },
      { name: "Viral Infection", probability: 0.3, severity: "mild" },
      { name: "Fibromyalgia", probability: 0.2, severity: "moderate" },
      { name: "Autoimmune Disease", probability: 0.1, severity: "severe" },
    ],
  },
  "joint_pain": {
    conditions: [
      { name: "Arthritis", probability: 0.5, severity: "moderate" },
      { name: "Injury", probability: 0.3, severity: "mild" },
      { name: "Autoimmune Disease", probability: 0.2, severity: "severe" },
    ],
  },
  "muscle_pain": {
    conditions: [
      { name: "Muscle Strain", probability: 0.5, severity: "mild" },
      { name: "Flu", probability: 0.3, severity: "moderate" },
      { name: "Fibromyalgia", probability: 0.2, severity: "moderate" },
    ],
  },
  "back_pain": {
    conditions: [
      { name: "Muscle Strain", probability: 0.5, severity: "mild" },
      { name: "Herniated Disc", probability: 0.3, severity: "moderate" },
      { name: "Kidney Stone", probability: 0.2, severity: "severe" },
    ],
  },
  "neck_stiffness": {
    conditions: [
      { name: "Muscle Strain", probability: 0.5, severity: "mild" },
      { name: "Meningitis", probability: 0.3, severity: "severe" },
      { name: "Cervical Spondylosis", probability: 0.2, severity: "moderate" },
    ],
  },
  swelling: {
    conditions: [
      { name: "Injury", probability: 0.4, severity: "mild" },
      { name: "Heart Failure", probability: 0.3, severity: "severe" },
      { name: "Kidney Disease", probability: 0.2, severity: "severe" },
      { name: "Medication Side Effect", probability: 0.1, severity: "mild" },
    ],
  },
}

const treatments = {
  "Common Cold": {
    recommendations: [
      "Rest and stay hydrated",
      "Take paracetamol for fever",
      "Use saline nasal drops",
      "Gargle with warm salt water",
    ],
    medicines: ["Paracetamol", "Cough syrup"],
    duration: "5-7 days",
    whenToSeeDoctor: "If symptoms worsen or persist beyond 10 days",
  },
  "Flu": {
    recommendations: [
      "Complete bed rest",
      "Drink plenty of fluids",
      "Take fever reducers",
      "Avoid contact with others",
    ],
    medicines: ["Paracetamol", "Antiviral medication"],
    duration: "7-10 days",
    whenToSeeDoctor: "If high fever persists or breathing difficulties occur",
  },
  "Tension Headache": {
    recommendations: [
      "Apply cold or warm compress",
      "Practice relaxation techniques",
      "Maintain regular sleep schedule",
      "Stay hydrated",
    ],
    medicines: ["Paracetamol", "Ibuprofen"],
    duration: "2-4 hours",
    whenToSeeDoctor: "If headaches become frequent or severe",
  },
  "Viral Infection": {
    recommendations: [
      "Rest and recover",
      "Stay hydrated",
      "Take supportive medications",
      "Avoid spreading to others",
    ],
    medicines: ["Paracetamol", "Rest"],
    duration: "5-10 days",
    whenToSeeDoctor: "If symptoms worsen or fever is very high",
  },
  "Bacterial Infection": {
    recommendations: [
      "Complete prescribed antibiotic course",
      "Rest and stay hydrated",
      "Monitor symptoms closely",
    ],
    medicines: ["Antibiotics", "Paracetamol"],
    duration: "7-14 days",
    whenToSeeDoctor: "If symptoms don't improve within 2-3 days of antibiotics",
  },
  "Migraine": {
    recommendations: [
      "Rest in dark, quiet room",
      "Apply cold compress to head",
      "Stay hydrated",
      "Avoid triggers",
    ],
    medicines: ["Sumatriptan", "Ibuprofen", "Anti-nausea medication"],
    duration: "4-72 hours",
    whenToSeeDoctor: "If headaches become more frequent or severe",
  },
  "Dehydration": {
    recommendations: [
      "Drink plenty of fluids",
      "Use oral rehydration salts",
      "Rest in cool environment",
      "Avoid alcohol and caffeine",
    ],
    medicines: ["Oral rehydration salts", "Electrolyte solutions"],
    duration: "Few hours to 1 day",
    whenToSeeDoctor: "If unable to keep fluids down or signs of severe dehydration",
  },
  "Asthma": {
    recommendations: [
      "Use prescribed inhaler",
      "Avoid triggers",
      "Keep rescue inhaler nearby",
      "Monitor peak flow",
    ],
    medicines: ["Bronchodilator inhaler", "Steroid inhaler"],
    duration: "Chronic condition - ongoing management",
    whenToSeeDoctor: "If having difficulty breathing or inhaler not helping",
  },
  "Pneumonia": {
    recommendations: [
      "SEEK IMMEDIATE MEDICAL ATTENTION",
      "Complete antibiotic course",
      "Rest and stay hydrated",
      "Use humidifier",
    ],
    medicines: ["Antibiotics", "Oxygen therapy"],
    duration: "2-3 weeks",
    whenToSeeDoctor: "IMMEDIATELY - this is a serious condition",
  },
  "Bronchitis": {
    recommendations: [
      "Rest and stay hydrated",
      "Use humidifier",
      "Avoid smoke and irritants",
      "Take expectorants",
    ],
    medicines: ["Cough expectorant", "Bronchodilators"],
    duration: "1-3 weeks",
    whenToSeeDoctor: "If cough persists beyond 3 weeks or difficulty breathing",
  },
  "Allergies": {
    recommendations: [
      "Avoid known allergens",
      "Take antihistamines",
      "Use nasal sprays",
      "Keep windows closed during high pollen",
    ],
    medicines: ["Antihistamines", "Nasal decongestants"],
    duration: "Seasonal or ongoing",
    whenToSeeDoctor: "If symptoms interfere with daily life",
  },
  "Indigestion": {
    recommendations: [
      "Eat smaller, frequent meals",
      "Avoid spicy and fatty foods",
      "Don't lie down after eating",
      "Stay upright for 2-3 hours after meals",
    ],
    medicines: ["Antacids", "Proton pump inhibitors"],
    duration: "Few hours",
    whenToSeeDoctor: "If symptoms persist or worsen",
  },
  "Gastritis": {
    recommendations: [
      "Avoid spicy, acidic foods",
      "Take prescribed medications",
      "Eat smaller meals",
      "Reduce stress",
    ],
    medicines: ["Proton pump inhibitors", "Antacids"],
    duration: "Few days to weeks",
    whenToSeeDoctor: "If severe pain or vomiting blood",
  },
  "Food Poisoning": {
    recommendations: [
      "Stay hydrated",
      "Rest",
      "Gradually return to normal diet",
      "Avoid dairy and fatty foods initially",
    ],
    medicines: ["Oral rehydration salts", "Anti-diarrheal if necessary"],
    duration: "1-3 days",
    whenToSeeDoctor: "If severe dehydration, high fever, or blood in stool",
  },
  "Appendicitis": {
    recommendations: [
      "SEEK IMMEDIATE EMERGENCY CARE",
      "Do not eat or drink",
      "Do not take pain medications",
      "Go to emergency room immediately",
    ],
    medicines: ["Surgical intervention required"],
    duration: "Emergency condition",
    whenToSeeDoctor: "IMMEDIATELY - Go to emergency room",
  },
  "Gastroenteritis": {
    recommendations: [
      "Stay hydrated",
      "Rest",
      "BRAT diet (Bananas, Rice, Applesauce, Toast)",
      "Avoid dairy temporarily",
    ],
    medicines: ["Oral rehydration salts", "Probiotics"],
    duration: "3-7 days",
    whenToSeeDoctor: "If severe dehydration or symptoms persist beyond 7 days",
  },
  "Muscle Strain": {
    recommendations: [
      "Rest the affected muscle",
      "Apply ice for first 24-48 hours",
      "Use compression bandage",
      "Elevate if possible",
    ],
    medicines: ["Ibuprofen", "Topical pain relievers"],
    duration: "3-6 weeks",
    whenToSeeDoctor: "If severe pain, inability to move, or no improvement",
  },
  "Arthritis": {
    recommendations: [
      "Gentle exercise and stretching",
      "Apply heat or cold therapy",
      "Maintain healthy weight",
      "Take prescribed medications",
    ],
    medicines: ["NSAIDs", "Disease-modifying drugs"],
    duration: "Chronic condition - ongoing management",
    whenToSeeDoctor: "If joint pain interferes with daily activities",
  },
  "Fibromyalgia": {
    recommendations: [
      "Regular gentle exercise",
      "Stress management",
      "Good sleep hygiene",
      "Physical therapy",
    ],
    medicines: ["Pregabalin", "Duloxetine", "Pain relievers"],
    duration: "Chronic condition - ongoing management",
    whenToSeeDoctor: "If pain significantly impacts quality of life",
  },
  "Anemia": {
    recommendations: [
      "Eat iron-rich foods",
      "Take prescribed supplements",
      "Address underlying cause",
      "Regular monitoring",
    ],
    medicines: ["Iron supplements", "Vitamin B12", "Folic acid"],
    duration: "Few weeks to months",
    whenToSeeDoctor: "If symptoms persist or worsen despite treatment",
  },
  "Diabetes": {
    recommendations: [
      "Monitor blood sugar regularly",
      "Follow prescribed diet",
      "Regular exercise",
      "Take medications as prescribed",
    ],
    medicines: ["Metformin", "Insulin", "Other diabetes medications"],
    duration: "Chronic condition - lifelong management",
    whenToSeeDoctor: "For regular monitoring and if blood sugar levels are unstable",
  },
  "Hyperthyroidism": {
    recommendations: [
      "Take prescribed medications",
      "Avoid caffeine",
      "Regular monitoring",
      "Manage stress",
    ],
    medicines: ["Antithyroid medications", "Beta blockers"],
    duration: "Months to years",
    whenToSeeDoctor: "If symptoms worsen or medication side effects occur",
  },
  "Depression": {
    recommendations: [
      "Seek professional help",
      "Stay active",
      "Maintain social connections",
      "Practice stress management",
    ],
    medicines: ["Antidepressants", "Therapy"],
    duration: "Varies - may be ongoing",
    whenToSeeDoctor: "If having thoughts of self-harm or symptoms interfere with life",
  },
  "Anxiety": {
    recommendations: [
      "Practice relaxation techniques",
      "Regular exercise",
      "Limit caffeine",
      "Consider therapy",
    ],
    medicines: ["Anti-anxiety medications", "Beta blockers"],
    duration: "Varies",
    whenToSeeDoctor: "If anxiety interferes with daily functioning",
  },
  "Heart Disease": {
    recommendations: [
      "FOLLOW CARDIOLOGIST RECOMMENDATIONS",
      "Take prescribed medications",
      "Heart-healthy diet",
      "Regular but gentle exercise",
    ],
    medicines: ["ACE inhibitors", "Beta blockers", "Statins"],
    duration: "Chronic condition - lifelong management",
    whenToSeeDoctor: "Regularly and immediately if chest pain or breathing problems",
  },
  "Heart Attack": {
    recommendations: [
      "CALL EMERGENCY SERVICES IMMEDIATELY",
      "Chew aspirin if not allergic",
      "Stay calm and rest",
      "Do not drive yourself",
    ],
    medicines: ["Emergency medical intervention"],
    duration: "Medical emergency",
    whenToSeeDoctor: "IMMEDIATELY - Call 911/Emergency services",
  },
  "Stroke": {
    recommendations: [
      "CALL EMERGENCY SERVICES IMMEDIATELY",
      "Note time symptoms started",
      "Do not give food or water",
      "Keep person comfortable",
    ],
    medicines: ["Emergency medical intervention"],
    duration: "Medical emergency",
    whenToSeeDoctor: "IMMEDIATELY - Call 911/Emergency services",
  },
  "Meningitis": {
    recommendations: [
      "SEEK IMMEDIATE EMERGENCY CARE",
      "This is a medical emergency",
      "Do not delay treatment",
      "Isolation may be required",
    ],
    medicines: ["Antibiotics", "Hospital treatment"],
    duration: "Emergency condition",
    whenToSeeDoctor: "IMMEDIATELY - Go to emergency room",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { symptoms, age, gender, duration, severity } = await request.json()

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate processing time

    let allConditions: any[] = []

    // Analyze each symptom
    symptoms.forEach((symptom: string) => {
      // Normalize symptom name to match database keys
      let symptomKey = symptom.toLowerCase()
        .replace(/\s+/g, "_")  // Replace all spaces with underscores
        .replace(/[\/]/g, "/") // Keep forward slashes as is
        .replace(/[^\w\/]/g, "_") // Replace other special characters with underscores
        .replace(/_+/g, "_")   // Replace multiple underscores with single
        .replace(/^_|_$/g, ""); // Remove leading/trailing underscores
      
      // Try exact match first
      if (symptomDatabase[symptomKey as keyof typeof symptomDatabase]) {
        const conditions = symptomDatabase[symptomKey as keyof typeof symptomDatabase].conditions
        allConditions = [...allConditions, ...conditions]
      } else {
        // Try alternative key formats
        const altKeys = [
          symptomKey.replace(/_/g, ""), // Remove all underscores
          symptomKey.replace("_", ""), // Remove first underscore only
          symptom.toLowerCase().replace(/[^a-z]/g, "_"), // Keep only letters
        ]
        
        for (const altKey of altKeys) {
          if (symptomDatabase[altKey as keyof typeof symptomDatabase]) {
            const conditions = symptomDatabase[altKey as keyof typeof symptomDatabase].conditions
            allConditions = [...allConditions, ...conditions]
            break
          }
        }
      }
    })

    // Aggregate and sort by probability
    const conditionMap = new Map()
    allConditions.forEach((condition) => {
      if (conditionMap.has(condition.name)) {
        const existing = conditionMap.get(condition.name)
        existing.probability = Math.min(existing.probability + condition.probability * 0.3, 0.9)
      } else {
        conditionMap.set(condition.name, { ...condition })
      }
    })

    const finalConditions = Array.from(conditionMap.values())
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3)

    // Get treatment recommendations for top condition
    const topCondition = finalConditions[0]
    const treatment = treatments[topCondition?.name as keyof typeof treatments] || {
      recommendations: ["Consult with a healthcare provider"],
      medicines: [],
      duration: "Variable",
      whenToSeeDoctor: "Schedule an appointment for proper diagnosis",
    }

    const analysis = {
      conditions: finalConditions,
      primaryCondition: topCondition,
      treatment,
      riskLevel: topCondition?.severity || "unknown",
      confidence: Math.round((topCondition?.probability || 0) * 100),
      recommendations: {
        immediate: treatment.recommendations.slice(0, 2),
        general: treatment.recommendations.slice(2),
        medicines: treatment.medicines,
        duration: treatment.duration,
        followUp: treatment.whenToSeeDoctor,
      },
      emergencyWarning: finalConditions.some((c) => c.severity === "severe")
        ? "Some symptoms may indicate a serious condition. Seek immediate medical attention if symptoms worsen."
        : null,
    }

    return NextResponse.json({ analysis })
  } catch (error) {
    return NextResponse.json({ error: "Symptom analysis failed" }, { status: 500 })
  }
}
