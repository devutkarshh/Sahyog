"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  UserCheck,
  Calendar,
  Clock,
  Thermometer,
  Brain,
  Heart,
  Bone,
  Eye,
  Ear,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  Globe,
  Activity,
  FileText,
  Clipboard,
  Plus,
  Pencil
} from "lucide-react"
import { useRouter } from "next/navigation"

// Enhanced symptom database with multi-language support
const symptomCategories = {
  english: {
    general: {
      name: "General Symptoms",
      icon: Activity,
      symptoms: [
        { id: "fever", name: "Fever", severity: ["mild", "moderate", "high"] },
        { id: "fatigue", name: "Fatigue/Tiredness", severity: ["mild", "moderate", "severe"] },
        { id: "chills", name: "Chills", severity: ["mild", "moderate", "severe"] },
        { id: "sweating", name: "Excessive Sweating", severity: ["mild", "moderate", "severe"] },
        { id: "weakness", name: "General Weakness", severity: ["mild", "moderate", "severe"] },
        { id: "weight_loss", name: "Unexplained Weight Loss", severity: ["mild", "moderate", "severe"] }
      ]
    },
    head: {
      name: "Head & Neurological",
      icon: Brain,
      symptoms: [
        { id: "headache", name: "Headache", severity: ["mild", "moderate", "severe"] },
        { id: "dizziness", name: "Dizziness", severity: ["mild", "moderate", "severe"] },
        { id: "confusion", name: "Confusion", severity: ["mild", "moderate", "severe"] },
        { id: "memory_loss", name: "Memory Problems", severity: ["mild", "moderate", "severe"] },
        { id: "seizure", name: "Seizures", severity: ["mild", "moderate", "severe"] },
        { id: "numbness", name: "Numbness/Tingling", severity: ["mild", "moderate", "severe"] }
      ]
    },
    respiratory: {
      name: "Respiratory",
      icon: Heart,
      symptoms: [
        { id: "cough", name: "Cough", severity: ["dry", "productive", "severe"] },
        { id: "shortness_breath", name: "Shortness of Breath", severity: ["mild", "moderate", "severe"] },
        { id: "chest_pain", name: "Chest Pain", severity: ["mild", "moderate", "severe"] },
        { id: "wheezing", name: "Wheezing", severity: ["mild", "moderate", "severe"] },
        { id: "sore_throat", name: "Sore Throat", severity: ["mild", "moderate", "severe"] },
        { id: "runny_nose", name: "Runny Nose", severity: ["mild", "moderate", "severe"] }
      ]
    },
    digestive: {
      name: "Digestive",
      icon: Activity,
      symptoms: [
        { id: "stomach_pain", name: "Stomach Pain", severity: ["mild", "moderate", "severe"] },
        { id: "nausea", name: "Nausea", severity: ["mild", "moderate", "severe"] },
        { id: "vomiting", name: "Vomiting", severity: ["mild", "moderate", "severe"] },
        { id: "diarrhea", name: "Diarrhea", severity: ["mild", "moderate", "severe"] },
        { id: "constipation", name: "Constipation", severity: ["mild", "moderate", "severe"] },
        { id: "loss_appetite", name: "Loss of Appetite", severity: ["mild", "moderate", "severe"] }
      ]
    },
    musculoskeletal: {
      name: "Muscle & Joint",
      icon: Bone,
      symptoms: [
        { id: "body_ache", name: "Body Aches", severity: ["mild", "moderate", "severe"] },
        { id: "joint_pain", name: "Joint Pain", severity: ["mild", "moderate", "severe"] },
        { id: "muscle_pain", name: "Muscle Pain", severity: ["mild", "moderate", "severe"] },
        { id: "back_pain", name: "Back Pain", severity: ["mild", "moderate", "severe"] },
        { id: "neck_stiffness", name: "Neck Stiffness", severity: ["mild", "moderate", "severe"] },
        { id: "swelling", name: "Swelling", severity: ["mild", "moderate", "severe"] }
      ]
    }
  },
  hindi: {
    general: {
      name: "सामान्य लक्षण",
      icon: Activity,
      symptoms: [
        { id: "fever", name: "बुखार", severity: ["हल्का", "मध्यम", "तेज़"] },
        { id: "fatigue", name: "थकान", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "chills", name: "कंपकंपी", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "sweating", name: "अधिक पसीना", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "weakness", name: "सामान्य कमजोरी", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "weight_loss", name: "अचानक वजन कम होना", severity: ["हल्का", "मध्यम", "गंभीर"] }
      ]
    },
    head: {
      name: "सिर और न्यूरोलॉजिकल",
      icon: Brain,
      symptoms: [
        { id: "headache", name: "सिरदर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "dizziness", name: "चक्कर आना", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "confusion", name: "भ्रम", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "memory_loss", name: "याददाश्त की समस्या", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "seizure", name: "दौरे", severity: ["हल्के", "मध्यम", "गंभीर"] },
        { id: "numbness", name: "सुन्नता/झुनझुनी", severity: ["हल्की", "मध्यम", "गंभीर"] }
      ]
    },
    respiratory: {
      name: "श्वसन संबंधी",
      icon: Heart,
      symptoms: [
        { id: "cough", name: "खांसी", severity: ["सूखी", "कफ के साथ", "गंभीर"] },
        { id: "shortness_breath", name: "सांस लेने में तकलीफ", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "chest_pain", name: "छाती में दर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "wheezing", name: "सांस लेते समय आवाज", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "sore_throat", name: "गले में खराश", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "runny_nose", name: "नाक बहना", severity: ["हल्का", "मध्यम", "गंभीर"] }
      ]
    },
    digestive: {
      name: "पाचन संबंधी",
      icon: Activity,
      symptoms: [
        { id: "stomach_pain", name: "पेट में दर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "nausea", name: "जी मिचलाना", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "vomiting", name: "उल्टी", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "diarrhea", name: "दस्त", severity: ["हल्के", "मध्यम", "गंभीर"] },
        { id: "constipation", name: "कब्ज", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "loss_appetite", name: "भूख न लगना", severity: ["हल्की", "मध्यम", "गंभीर"] }
      ]
    },
    musculoskeletal: {
      name: "मांसपेशी और जोड़",
      icon: Bone,
      symptoms: [
        { id: "body_ache", name: "शरीर में दर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "joint_pain", name: "जोड़ों में दर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "muscle_pain", name: "मांसपेशियों में दर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "back_pain", name: "पीठ दर्द", severity: ["हल्का", "मध्यम", "गंभीर"] },
        { id: "neck_stiffness", name: "गर्दन में अकड़न", severity: ["हल्की", "मध्यम", "गंभीर"] },
        { id: "swelling", name: "सूजन", severity: ["हल्की", "मध्यम", "गंभीर"] }
      ]
    }
  },
  punjabi: {
    general: {
      name: "ਆਮ ਲੱਛਣ",
      icon: Activity,
      symptoms: [
        { id: "fever", name: "ਬੁਖਾਰ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਜ਼ਿਆਦਾ"] },
        { id: "fatigue", name: "ਥਕਾਵਟ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "chills", name: "ਠੰਢ ਲੱਗਣੀ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "sweating", name: "ਜ਼ਿਆਦਾ ਪਸੀਨਾ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "weakness", name: "ਆਮ ਕਮਜ਼ੋਰੀ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "weight_loss", name: "ਅਚਾਨਕ ਭਾਰ ਘਟਣਾ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] }
      ]
    },
    head: {
      name: "ਸਿਰ ਅਤੇ ਨਿਊਰੋਲੌਜੀਕਲ",
      icon: Brain,
      symptoms: [
        { id: "headache", name: "ਸਿਰ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "dizziness", name: "ਚੱਕਰ ਆਉਣੇ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "confusion", name: "ਕਨਫਿਊਜ਼ਨ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "memory_loss", name: "ਯਾਦਦਾਸ਼ਤ ਦੀ ਸਮੱਸਿਆ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "seizure", name: "ਦੌਰੇ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "numbness", name: "ਸੁੰਨ ਹੋਣਾ/ਝਰਣ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] }
      ]
    },
    respiratory: {
      name: "ਸਾਹ ਸੰਬੰਧੀ",
      icon: Heart,
      symptoms: [
        { id: "cough", name: "ਖੰਘ", severity: ["ਸੁੱਕੀ", "ਬਲਗਮ ਦੇ ਨਾਲ", "ਗੰਭੀਰ"] },
        { id: "shortness_breath", name: "ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "chest_pain", name: "ਛਾਤੀ ਵਿੱਚ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "wheezing", name: "ਸਾਹ ਲੈਂਦੇ ਸਮੇਂ ਆਵਾਜ਼", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "sore_throat", name: "ਗਲੇ ਵਿੱਚ ਖਰਾਸ਼", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "runny_nose", name: "ਨੱਕ ਵਗਣਾ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] }
      ]
    },
    digestive: {
      name: "ਪਾਚਨ ਸੰਬੰਧੀ",
      icon: Activity,
      symptoms: [
        { id: "stomach_pain", name: "ਪੇਟ ਵਿੱਚ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "nausea", name: "ਜੀ ਮਿਚਲਾਉਣਾ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "vomiting", name: "ਉਲਟੀ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "diarrhea", name: "ਦਸਤ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "constipation", name: "ਕਬਜ਼", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "loss_appetite", name: "ਭੁੱਖ ਨਾ ਲੱਗਣੀ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] }
      ]
    },
    musculoskeletal: {
      name: "ਮਾਸਪੇਸ਼ੀ ਅਤੇ ਜੋੜ",
      icon: Bone,
      symptoms: [
        { id: "body_ache", name: "ਸਰੀਰ ਵਿੱਚ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "joint_pain", name: "ਜੋੜਾਂ ਵਿੱਚ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "muscle_pain", name: "ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "back_pain", name: "ਪਿੱਠ ਦਰਦ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "neck_stiffness", name: "ਗਰਦਨ ਵਿੱਚ ਅਕੜਨ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] },
        { id: "swelling", name: "ਸੋਜ", severity: ["ਘੱਟ", "ਮੱਧਮ", "ਗੰਭੀਰ"] }
      ]
    }
  }
}

// UI translations
const uiTranslations = {
  english: {
    title: "Manual Symptom Entry",
    subtitle: "Step-by-step guided assessment for detailed symptom analysis",
    steps: {
      basic: "Basic Information",
      symptoms: "Select Symptoms", 
      severity: "Severity Assessment",
      review: "Review & Analyze"
    },
    basicInfo: {
      age: "Age",
      gender: "Gender",
      duration: "How long have you been experiencing symptoms?",
      agePlaceholder: "Enter your age",
      genderOptions: {
        male: "Male",
        female: "Female", 
        other: "Other",
        prefer_not: "Prefer not to say"
      },
      durationOptions: {
        hours: "Few hours",
        day: "1 day",
        days: "2-3 days",
        week: "1 week",
        weeks: "More than 1 week"
      }
    },
    symptomSelection: {
      title: "Select Your Symptoms",
      subtitle: "Choose all symptoms you are currently experiencing",
      noSymptoms: "No symptoms selected",
      selectedCount: "symptoms selected"
    },
    severityAssessment: {
      title: "Assess Symptom Severity",
      subtitle: "Rate the severity of each selected symptom",
      additional: "Additional Details",
      additionalPlaceholder: "Describe any additional symptoms or details..."
    },
    review: {
      title: "Review Your Information",
      subtitle: "Please review your information before analysis",
      personalInfo: "Personal Information",
      selectedSymptoms: "Selected Symptoms",
      additionalNotes: "Additional Notes"
    },
    buttons: {
      next: "Next Step",
      previous: "Previous",
      analyze: "Analyze Symptoms",
      back: "Back to Symptoms"
    },
    language: {
      select: "Select Language",
      english: "English",
      hindi: "हिंदी", 
      punjabi: "ਪੰਜਾਬੀ"
    },
    analysis: {
      analyzing: "Analyzing your symptoms...",
      results: "Analysis Results",
      confidence: "Confidence Level",
      riskLevel: "Risk Level",
      recommendations: "Recommendations",
      consultation: "Book Consultation"
    }
  },
  hindi: {
    title: "मैन्युअल लक्षण प्रविष्टि",
    subtitle: "विस्तृत लक्षण विश्लेषण के लिए चरणबद्ध निर्देशित मूल्यांकन",
    steps: {
      basic: "मूलभूत जानकारी",
      symptoms: "लक्षण चुनें",
      severity: "गंभीरता मूल्यांकन", 
      review: "समीक्षा और विश्लेषण"
    },
    basicInfo: {
      age: "उम्र",
      gender: "लिंग",
      duration: "आप कितने समय से लक्षणों का अनुभव कर रहे हैं?",
      agePlaceholder: "अपनी उम्र दर्ज करें",
      genderOptions: {
        male: "पुरुष",
        female: "महिला",
        other: "अन्य",
        prefer_not: "नहीं बताना चाहते"
      },
      durationOptions: {
        hours: "कुछ घंटे",
        day: "1 दिन",
        days: "2-3 दिन",
        week: "1 सप्ताह",
        weeks: "1 सप्ताह से अधिक"
      }
    },
    symptomSelection: {
      title: "अपने लक्षण चुनें",
      subtitle: "वर्तमान में अनुभव हो रहे सभी लक्षणों को चुनें",
      noSymptoms: "कोई लक्षण चयनित नहीं",
      selectedCount: "लक्षण चयनित"
    },
    severityAssessment: {
      title: "लक्षण की गंभीरता का आकलन करें",
      subtitle: "प्रत्येक चयनित लक्षण की गंभीरता को रेट करें",
      additional: "अतिरिक्त विवरण",
      additionalPlaceholder: "कोई अतिरिक्त लक्षण या विवरण का वर्णन करें..."
    },
    review: {
      title: "अपनी जानकारी की समीक्षा करें",
      subtitle: "विश्लेषण से पहले कृपया अपनी जानकारी की समीक्षा करें",
      personalInfo: "व्यक्तिगत जानकारी",
      selectedSymptoms: "चयनित लक्षण",
      additionalNotes: "अतिरिक्त नोट्स"
    },
    buttons: {
      next: "अगला चरण",
      previous: "पिछला",
      analyze: "लक्षणों का विश्लेषण करें",
      back: "लक्षणों पर वापस जाएं"
    },
    language: {
      select: "भाषा चुनें",
      english: "English",
      hindi: "हिंदी",
      punjabi: "ਪੰਜਾਬੀ"
    },
    analysis: {
      analyzing: "आपके लक्षणों का विश्लेषण किया जा रहा है...",
      results: "विश्लेषण परिणाम",
      confidence: "विश्वास स्तर",
      riskLevel: "जोखिम स्तर",
      recommendations: "सुझाव",
      consultation: "डॉक्टर से सलाह लें"
    }
  },
  punjabi: {
    title: "ਮੈਨੁਅਲ ਲੱਛਣ ਐਂਟਰੀ",
    subtitle: "ਵਿਸਤ੍ਰਿਤ ਲੱਛਣ ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਕਦਮ-ਵਾਰ ਮਾਰਗਦਰਸ਼ਨ ਮੁਲਾਂਕਣ",
    steps: {
      basic: "ਬੁਨਿਆਦੀ ਜਾਣਕਾਰੀ",
      symptoms: "ਲੱਛਣ ਚੁਣੋ",
      severity: "ਗੰਭੀਰਤਾ ਮੁਲਾਂਕਣ",
      review: "ਸਮੀਖਿਆ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ"
    },
    basicInfo: {
      age: "ਉਮਰ",
      gender: "ਲਿੰਗ",
      duration: "ਤੁਸੀਂ ਕਿੰਨੇ ਸਮੇਂ ਤੋਂ ਲੱਛਣਾਂ ਦਾ ਅਨੁਭਵ ਕਰ ਰਹੇ ਹੋ?",
      agePlaceholder: "ਆਪਣੀ ਉਮਰ ਦਰਜ ਕਰੋ",
      genderOptions: {
        male: "ਮਰਦ",
        female: "ਔਰਤ",
        other: "ਹੋਰ",
        prefer_not: "ਨਹੀਂ ਦੱਸਣਾ ਚਾਹੁੰਦੇ"
      },
      durationOptions: {
        hours: "ਕੁਝ ਘੰਟੇ",
        day: "1 ਦਿਨ",
        days: "2-3 ਦਿਨ",
        week: "1 ਹਫਤਾ",
        weeks: "1 ਹਫਤੇ ਤੋਂ ਜ਼ਿਆਦਾ"
      }
    },
    symptomSelection: {
      title: "ਆਪਣੇ ਲੱਛਣ ਚੁਣੋ",
      subtitle: "ਵਰਤਮਾਨ ਵਿੱਚ ਅਨੁਭਵ ਹੋ ਰਹੇ ਸਾਰੇ ਲੱਛਣਾਂ ਨੂੰ ਚੁਣੋ",
      noSymptoms: "ਕੋਈ ਲੱਛਣ ਚੁਣਿਆ ਨਹੀਂ",
      selectedCount: "ਲੱਛਣ ਚੁਣੇ ਗਏ"
    },
    severityAssessment: {
      title: "ਲੱਛਣਾਂ ਦੀ ਗੰਭੀਰਤਾ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ",
      subtitle: "ਹਰ ਚੁਣੇ ਗਏ ਲੱਛਣ ਦੀ ਗੰਭੀਰਤਾ ਨੂੰ ਰੇਟ ਕਰੋ",
      additional: "ਵਾਧੂ ਵੇਰਵੇ",
      additionalPlaceholder: "ਕੋਈ ਵਾਧੂ ਲੱਛਣ ਜਾਂ ਵੇਰਵਿਆਂ ਦਾ ਵਰਣਨ ਕਰੋ..."
    },
    review: {
      title: "ਆਪਣੀ ਜਾਣਕਾਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
      subtitle: "ਵਿਸ਼ਲੇਸ਼ਣ ਤੋਂ ਪਹਿਲਾਂ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
      personalInfo: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ",
      selectedSymptoms: "ਚੁਣੇ ਗਏ ਲੱਛਣ",
      additionalNotes: "ਵਾਧੂ ਨੋਟਸ"
    },
    buttons: {
      next: "ਅਗਲਾ ਕਦਮ",
      previous: "ਪਿਛਲਾ",
      analyze: "ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
      back: "ਲੱਛਣਾਂ 'ਤੇ ਵਾਪਸ ਜਾਓ"
    },
    language: {
      select: "ਭਾਸ਼ਾ ਚੁਣੋ",
      english: "English",
      hindi: "हिंदी",
      punjabi: "ਪੰਜਾਬੀ"
    },
    analysis: {
      analyzing: "ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
      results: "ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜੇ",
      confidence: "ਭਰੋਸੇ ਦਾ ਪੱਧਰ",
      riskLevel: "ਜੋਖਿਮ ਪੱਧਰ",
      recommendations: "ਸੁਝਾਅ",
      consultation: "ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ"
    }
  }
}

export default function ManualSymptomEntry() {
  const [currentStep, setCurrentStep] = useState(0)
  const [language, setLanguage] = useState<'english' | 'hindi' | 'punjabi'>('english')
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    duration: '',
    selectedSymptoms: [] as Array<{
      id: string, 
      name: string, 
      severity: string, 
      category: string,
      details?: string
    }>,
    additionalNotes: ''
  })
  const [expandedSymptoms, setExpandedSymptoms] = useState<Set<string>>(new Set())
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const steps = ['basic', 'symptoms', 'severity', 'review']
  const t = uiTranslations[language]
  const symptoms = symptomCategories[language]

  const handleSymptomToggle = (symptomId: string, symptomName: string, category: string) => {
    setFormData(prev => {
      const existing = prev.selectedSymptoms.find(s => s.id === symptomId)
      if (existing) {
        return {
          ...prev,
          selectedSymptoms: prev.selectedSymptoms.filter(s => s.id !== symptomId)
        }
      } else {
        return {
          ...prev,
          selectedSymptoms: [...prev.selectedSymptoms, {
            id: symptomId,
            name: symptomName,
            severity: 'Mild',
            category
          }]
        }
      }
    })
  }

  const handleSeverityChange = (symptomId: string, severity: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.map(s => 
        s.id === symptomId ? { ...s, severity } : s
      )
    }))
  }

  const handleSeveritySliderChange = (symptomId: string, value: number) => {
    const severityMap = ['Mild', 'Moderate', 'Severe']
    const severity = severityMap[value - 1] || 'Mild'
    handleSeverityChange(symptomId, severity)
  }

  const getSeverityValue = (severity: string): number => {
    const severityMap = { 'Mild': 1, 'Moderate': 2, 'Severe': 3 }
    return severityMap[severity as keyof typeof severityMap] || 1
  }

  const getSeverityColor = (severity: string): string => {
    const colorMap = {
      'Mild': '#22c55e',
      'Moderate': '#f59e0b', 
      'Severe': '#ef4444'
    }
    return colorMap[severity as keyof typeof colorMap] || '#22c55e'
  }

  const toggleSymptomDetails = (symptomId: string) => {
    setExpandedSymptoms(prev => {
      const newSet = new Set(prev)
      if (newSet.has(symptomId)) {
        newSet.delete(symptomId)
      } else {
        newSet.add(symptomId)
      }
      return newSet
    })
  }

  const handleSymptomDetailsChange = (symptomId: string, details: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.map(s => 
        s.id === symptomId ? { ...s, details } : s
      )
    }))
  }

  const getSymptomIcon = (categoryKey: string) => {
    const iconMap: { [key: string]: any } = {
      general: Thermometer,
      neurological: Brain,
      cardiovascular: Heart,
      respiratory: Activity,
      musculoskeletal: Bone,
      gastrointestinal: Activity,
      sensory: Eye,
      psychological: Brain
    }
    return iconMap[categoryKey] || Activity
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    
    try {
      // Prepare data for API
      const analysisData = {
        symptoms: formData.selectedSymptoms.map(s => s.name),
        age: parseInt(formData.age),
        gender: formData.gender,
        duration: formData.duration,
        severity: formData.selectedSymptoms.reduce((acc, s) => ({
          ...acc,
          [s.name]: s.severity
        }), {}),
        additionalNotes: formData.additionalNotes,
        language: language
      }

      const response = await fetch('/api/symptom-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      })

      if (response.ok) {
        const result = await response.json()
        setAnalysisResult(result.analysis)
        setCurrentStep(steps.length) // Move to results step
      } else {
        console.error('Analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getCurrentLanguageTranslations = () => {
    return uiTranslations[language] || uiTranslations.english
  }

  const getDurationLabel = (durationValue: string) => {
    const t = getCurrentLanguageTranslations()
    const durationMap: Record<string, string> = {
      'hours': t.basicInfo.durationOptions.hours,
      'day': t.basicInfo.durationOptions.day,
      'days': t.basicInfo.durationOptions.days,
      'week': t.basicInfo.durationOptions.week,
      'weeks': t.basicInfo.durationOptions.weeks
    }
    return durationMap[durationValue] || durationValue
  }

  const getGenderLabel = (genderValue: string) => {
    const t = getCurrentLanguageTranslations()
    const genderMap: Record<string, string> = {
      'male': t.basicInfo.genderOptions.male,
      'female': t.basicInfo.genderOptions.female,
      'other': t.basicInfo.genderOptions.other,
      'prefer_not': t.basicInfo.genderOptions.prefer_not
    }
    return genderMap[genderValue] || genderValue
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (steps[currentStep]) {
      case 'basic':
        return formData.age && formData.gender && formData.duration
      case 'symptoms':
        return formData.selectedSymptoms.length > 0
      case 'severity':
        return formData.selectedSymptoms.every(s => s.severity)
      case 'review':
        return true
      default:
        return false
    }
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="space-y-6">
      {/* Header with Language Selection */}
      <div className="glass-panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="main-title">
              <Clipboard className="main-title-icon" />
              {t.title}
            </h2>
            <p className="subtitle-text mt-1">{t.subtitle}</p>
          </div>
          <Select value={language} onValueChange={(value: 'english' | 'hindi' | 'punjabi') => setLanguage(value)}>
            <SelectTrigger className="w-[200px] language-selector">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">{t.language.english}</SelectItem>
              <SelectItem value="hindi">{t.language.hindi}</SelectItem>
              <SelectItem value="punjabi">{t.language.punjabi}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Progress Indicator */}
      {currentStep < steps.length && (
        <div className="glass-panel p-6">
          <div className="progress-circles">
            {steps.map((step, index) => {
              const stepKey = step as keyof typeof t.steps;
              let status = 'inactive';
              if (index < currentStep) status = 'completed';
              else if (index === currentStep) status = 'active';
              
              return (
                <div key={step} className="progress-step">
                  <div className={`progress-circle ${status}`}>
                    {status === 'completed' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`progress-label ${status}`}>
                    {t.steps[stepKey]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Content */}
      {currentStep === 0 && (
        <div className="glass-panel p-8">
          {/* Enhanced Header */}
          <div className="basic-info-header">
            <div className="header-icon-wrapper">
              <UserCheck className="personal-data-icon" />
            </div>
            <h3 className="basic-info-title">{t.steps.basic}</h3>
          </div>
          
          {/* Two-column layout for Age and Gender */}
          <div className="basic-info-layout">
            {/* Age Input Card */}
            <div className="age-input-card">
              <Label htmlFor="age" className="input-card-label">{t.basicInfo.age}</Label>
              <Input
                id="age"
                type="number"
                placeholder={t.basicInfo.agePlaceholder}
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="age-glass-input"
              />
            </div>
            
            {/* Gender Selection Pills */}
            <div className="gender-selection-group">
              <Label className="input-card-label">{t.basicInfo.gender}</Label>
              <div className="gender-pills">
                {[
                  { value: 'male', label: t.basicInfo.genderOptions.male },
                  { value: 'female', label: t.basicInfo.genderOptions.female },
                  { value: 'other', label: t.basicInfo.genderOptions.other },
                  { value: 'prefer_not', label: t.basicInfo.genderOptions.prefer_not }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`gender-pill ${formData.gender === option.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Symptom Duration Card - Full Width */}
          <div className="duration-card">
            <Label className="input-card-label">{t.basicInfo.duration}</Label>
            <div className="duration-pills">
              {[
                { value: 'hours', label: t.basicInfo.durationOptions.hours },
                { value: 'day', label: t.basicInfo.durationOptions.day },
                { value: 'days', label: t.basicInfo.durationOptions.days },
                { value: 'week', label: t.basicInfo.durationOptions.week },
                { value: 'weeks', label: t.basicInfo.durationOptions.weeks }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`duration-pill ${formData.duration === option.value ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, duration: option.value }))}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="glass-panel p-6">
          <h3 className="section-header">
            <Activity className="section-header-icon" />
            {t.symptomSelection.title}
          </h3>
          <p className="body-text mb-6">{t.symptomSelection.subtitle}</p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="symptom-count-badge">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">
                {formData.selectedSymptoms.length === 0 
                  ? t.symptomSelection.noSymptoms 
                  : `${formData.selectedSymptoms.length} ${t.symptomSelection.selectedCount}`
                }
              </span>
            </div>
          </div>

          <div className="symptom-category-grid">
            {Object.entries(symptoms).map(([categoryKey, category]) => {
              const IconComponent = category.icon
              return (
                <div key={categoryKey} className="space-y-4">
                  <h4 className="section-header">
                    <IconComponent className="section-header-icon" />
                    {category.name}
                  </h4>
                  <div className="symptom-pills-grid">
                    {category.symptoms.map((symptom) => {
                      const isSelected = formData.selectedSymptoms.some(s => s.id === symptom.id)
                      return (
                        <div
                          key={symptom.id}
                          className={`symptom-pill ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSymptomToggle(symptom.id, symptom.name, categoryKey)}
                        >
                          {isSelected && <CheckCircle className="checkmark-icon" />}
                          <span>{symptom.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="glass-panel p-8">
          <h3 className="section-header">
            <Thermometer className="section-header-icon" />
            {t.severityAssessment.title}
          </h3>
          <p className="body-text mb-8">{t.severityAssessment.subtitle}</p>
          
          <div className="symptom-assessment-grid">
            {formData.selectedSymptoms.map((symptom) => {
              const categoryData = symptoms[symptom.category as keyof typeof symptoms]
              const SymptomIcon = getSymptomIcon(symptom.category)
              const isExpanded = expandedSymptoms.has(symptom.id)
              const severityValue = getSeverityValue(symptom.severity)
              const severityColor = getSeverityColor(symptom.severity)
              
              return (
                <div key={symptom.id} className={`symptom-assessment-card ${symptom.severity ? 'assessed' : ''}`}>
                  {/* Severity indicator bar */}
                  {symptom.severity && (
                    <div 
                      className="severity-indicator-bar"
                      style={{ backgroundColor: severityColor }}
                    />
                  )}
                  
                  {/* Card header with icon and symptom name */}
                  <div className="symptom-card-header">
                    <div className="symptom-icon-wrapper">
                      <SymptomIcon className="symptom-card-icon" />
                    </div>
                    <h4 className="symptom-card-title">{symptom.name}</h4>
                  </div>
                  
                  {/* Severity slider */}
                  <div className="severity-slider-container">
                    <div className="severity-slider-label">
                      {symptom.severity || 'Not assessed'}
                    </div>
                    <div className="severity-slider-wrapper">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        value={severityValue}
                        onChange={(e) => handleSeveritySliderChange(symptom.id, parseInt(e.target.value))}
                        className="severity-slider"
                        style={{
                          background: symptom.severity ? 
                            `linear-gradient(90deg, #22c55e 0%, ${severityValue >= 2 ? '#f59e0b' : '#22c55e'} 33%, ${severityValue >= 2 ? '#f59e0b' : '#22c55e'} 66%, ${severityValue === 3 ? '#ef4444' : severityValue >= 2 ? '#f59e0b' : '#22c55e'} 100%)` :
                            'rgba(255, 255, 255, 0.3)'
                        }}
                      />
                      <div className="severity-slider-marks">
                        <span className="slider-mark mild">Mild</span>
                        <span className="slider-mark moderate">Moderate</span>
                        <span className="slider-mark severe">Severe</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add details toggle */}
                  <button
                    type="button"
                    className="add-details-toggle"
                    onClick={() => toggleSymptomDetails(symptom.id)}
                  >
                    <Plus className={`details-icon ${isExpanded ? 'expanded' : ''}`} />
                    <span>Add Details</span>
                  </button>
                  
                  {/* Expandable details section */}
                  {isExpanded && (
                    <div className="symptom-details-container">
                      <Textarea
                        placeholder={`Describe your ${symptom.name.toLowerCase()} in more detail...`}
                        value={symptom.details || ''}
                        onChange={(e) => handleSymptomDetailsChange(symptom.id, e.target.value)}
                        rows={3}
                        className="symptom-details-input"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* General additional notes */}
          <div className="additional-notes-section">
            <Label htmlFor="additional" className="input-card-label">{t.severityAssessment.additional}</Label>
            <Textarea
              id="additional"
              placeholder={t.severityAssessment.additionalPlaceholder}
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              rows={4}
              className="glass-input"
            />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="glassmorphic-title flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t.review.title}
            </h3>
            <p className="glassmorphic-text mt-2">{t.review.subtitle}</p>
          </div>

          {/* Personal Information Card */}
          <div className="review-card glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="glassmorphic-subtitle">Personal Information</h4>
              <button className="review-edit-button p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <Pencil className="h-4 w-4 text-teal-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="glassmorphic-text">Age</span>
                <span className="glassmorphic-text font-semibold">{formData.age}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="glassmorphic-text">Gender</span>
                <span className="glassmorphic-text font-semibold">{getGenderLabel(formData.gender)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="glassmorphic-text">Symptom Duration</span>
                <span className="glassmorphic-text font-semibold">{getDurationLabel(formData.duration)}</span>
              </div>
            </div>
          </div>

          {/* Symptom Summary Card */}
          <div className="review-card glass-panel p-6">
            <h4 className="glassmorphic-subtitle mb-4">Symptom Summary</h4>
            <div className="space-y-3">
              {formData.selectedSymptoms.map((symptom) => (
                <div key={symptom.id} className={`review-symptom-pill ${symptom.severity?.toLowerCase() === 'severe' ? 'severity-severe' : symptom.severity?.toLowerCase() === 'moderate' ? 'severity-moderate' : 'severity-mild'}`}>
                  <div className="symptom-content">
                    <div className="symptom-name">{symptom.name}</div>
                    <div className="symptom-severity">{symptom.severity}</div>
                  </div>
                </div>
              ))}
            </div>

            {formData.additionalNotes && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h5 className="glassmorphic-subtitle text-sm mb-3">Additional Notes</h5>
                <div className="glass-panel p-4 bg-white/5">
                  <p className="glassmorphic-text text-sm">
                    {formData.additionalNotes}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <div className="pt-4">
            <button 
              onClick={handleAnalyze}
              disabled={!canProceed()}
              className="analyze-symptoms-button w-full"
            >
              <Brain className="h-5 w-5" />
              Analyze My Symptoms
            </button>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {currentStep === steps.length && analysisResult && (
        <div className="glass-panel p-6">
          <div className="mb-6">
            <h3 className="glassmorphic-title flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {t.analysis.results}
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="analysis-card">
                <div className="text-2xl font-bold glassmorphic-primary">{analysisResult.confidence}%</div>
                <div className="glassmorphic-text text-sm">{t.analysis.confidence}</div>
              </div>
              <div className="analysis-card">
                <div className="text-lg font-semibold glassmorphic-text capitalize">{analysisResult.riskLevel}</div>
                <div className="glassmorphic-text text-sm">{t.analysis.riskLevel}</div>
              </div>
              <div className="analysis-card">
                <div className="text-lg font-semibold glassmorphic-text">{analysisResult.primaryCondition?.name}</div>
                <div className="glassmorphic-text text-sm">Primary Condition</div>
              </div>
            </div>

            {analysisResult.emergencyWarning && (
              <div className="emergency-alert p-4 rounded-xl border border-red-300/30 bg-red-100/20 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    {analysisResult.emergencyWarning}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="glassmorphic-subtitle">{t.analysis.recommendations}</h4>
              <div className="space-y-3">
                {analysisResult.recommendations?.immediate?.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="glassmorphic-text text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setCurrentStep(0)} className="nav-button secondary">
                {t.buttons.back}
              </Button>
              <Button onClick={() => router.push('/consultation/new')} className="nav-button primary flex-1">
                {t.analysis.consultation}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing State */}
      {isAnalyzing && (
        <div className="analyzing-state">
          <div className="medical-spinner">
            <div className="spinner"></div>
          </div>
          <div className="loading-text">
            {t.analysis.analyzing}
          </div>
          <p className="loading-subtitle">
            Please wait while we analyze your symptoms...
          </p>
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      )}

      {/* Navigation */}
      {currentStep < steps.length && !isAnalyzing && (
        <div className="glass-panel p-6">
          <div className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="nav-button secondary flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.buttons.previous}
            </Button>
            
            <Button
              onClick={currentStep === steps.length - 1 ? handleAnalyze : nextStep}
              disabled={!canProceed()}
              className="nav-button primary flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Brain className="h-4 w-4" />
                  {t.buttons.analyze}
                </>
              ) : (
                <>
                  {t.buttons.next}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}