import { NextRequest, NextResponse } from 'next/server'

// Localization data for the AI Symptom Checker
const translations = {
  english: {
    title: 'Sahyog AI Symptom Checker',
    subtitle: 'Advanced AI-powered health analysis with multi-language voice support.',
    voicePrompt: 'Speak Your Symptoms',
    voiceDescription: 'Describe how you\'re feeling in your preferred language. Our AI will analyze your symptoms and provide intelligent health insights.',
    analyzing: 'Analyzing your symptoms...',
    results: 'Analysis Results',
    recommendations: 'Recommendations',
    consultation: 'Book Consultation',
    urgency: {
      low: 'Low Priority',
      medium: 'Medium Priority', 
      high: 'High Priority - Seek Immediate Care'
    },
    disclaimer: 'This tool provides general health information and should not replace professional medical advice.',
    symptoms: {
      fever: 'Fever',
      headache: 'Headache',
      cough: 'Cough',
      chest_pain: 'Chest Pain',
      stomach_pain: 'Stomach Pain',
      nausea: 'Nausea',
      body_ache: 'Body Ache',
      neck_stiffness: 'Neck Stiffness'
    },
    diseases: {
      'Dengue Fever': 'Dengue Fever - Mosquito-borne viral infection',
      'Malaria': 'Malaria - Parasitic infection transmitted by mosquitoes',
      'Pneumonia': 'Pneumonia - Lung infection causing breathing difficulties',
      'COVID-19': 'COVID-19 - Viral respiratory illness',
      'Food Poisoning': 'Food Poisoning - Illness from contaminated food',
      'Gastroenteritis': 'Gastroenteritis - Stomach and intestinal inflammation',
      'Appendicitis': 'Appendicitis - Appendix inflammation requiring urgent care',
      'Meningitis': 'Meningitis - Serious brain and spinal cord infection'
    }
  },
  
  hindi: {
    title: 'सहयोग AI लक्षण जांचकर्ता',
    subtitle: 'बहुभाषी आवाज़ समर्थन के साथ उन्नत AI-संचालित स्वास्थ्य विश्लेषण।',
    voicePrompt: 'अपने लक्षण बताएं',
    voiceDescription: 'अपनी पसंदीदा भाषा में बताएं कि आप कैसा महसूस कर रहे हैं। हमारा AI आपके लक्षणों का विश्लेषण करेगा।',
    analyzing: 'आपके लक्षणों का विश्लेषण किया जा रहा है...',
    results: 'विश्लेषण परिणाम',
    recommendations: 'सुझाव',
    consultation: 'डॉक्टर से सलाह लें',
    urgency: {
      low: 'कम प्राथमिकता',
      medium: 'मध्यम प्राथमिकता',
      high: 'उच्च प्राथमिकता - तुरंत चिकित्सा सहायता लें'
    },
    disclaimer: 'यह उपकरण सामान्य स्वास्थ्य जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।',
    symptoms: {
      fever: 'बुखार',
      headache: 'सिरदर्द',
      cough: 'खांसी',
      chest_pain: 'छाती में दर्द',
      stomach_pain: 'पेट में दर्द',
      nausea: 'जी मिचलाना',
      body_ache: 'शरीर में दर्द',
      neck_stiffness: 'गर्दन में अकड़न'
    },
    diseases: {
      'Dengue Fever': 'डेंगू बुखार - मच्छर से फैलने वाला वायरल संक्रमण',
      'Malaria': 'मलेरिया - मच्छर से फैलने वाला परजीवी संक्रमण',
      'Pneumonia': 'निमोनिया - फेफड़ों का संक्रमण',
      'COVID-19': 'कोविड-19 - वायरल श्वसन बीमारी',
      'Food Poisoning': 'खाद्य विषाक्तता - दूषित भोजन से बीमारी',
      'Gastroenteritis': 'गैस्ट्रोएंटेराइटिस - पेट और आंत की सूजन',
      'Appendicitis': 'अपेंडिसाइटिस - अपेंडिक्स की सूजन, तत्काल इलाज चाहिए',
      'Meningitis': 'मेनिंजाइटिस - गंभीर मस्तिष्क और रीढ़ संक्रमण'
    }
  },

  punjabi: {
    title: 'ਸਹਿਯੋਗ AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    subtitle: 'ਬਹੁ-ਭਾਸ਼ਾਈ ਆਵਾਜ਼ ਸਹਾਇਤਾ ਦੇ ਨਾਲ ਉੱਨਤ AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਵਿਸ਼ਲੇਸ਼ਣ।',
    voicePrompt: 'ਆਪਣੇ ਲੱਛਣ ਦੱਸੋ',
    voiceDescription: 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ। ਸਾਡਾ AI ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੇਗਾ।',
    analyzing: 'ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...',
    results: 'ਵਿਸ਼ਲੇਸ਼ਣ ਨਤੀਜੇ',
    recommendations: 'ਸੁਝਾਅ',
    consultation: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ',
    urgency: {
      low: 'ਘੱਟ ਤਰਜੀਹ',
      medium: 'ਮੱਧਮ ਤਰਜੀਹ',
      high: 'ਉੱਚ ਤਰਜੀਹ - ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਲਓ'
    },
    disclaimer: 'ਇਹ ਸਾਧਨ ਸਾਧਾਰਣ ਸਿਹਤ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਅਤੇ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ।',
    symptoms: {
      fever: 'ਬੁਖਾਰ',
      headache: 'ਸਿਰ ਦਰਦ',
      cough: 'ਖੰਘ',
      chest_pain: 'ਛਾਤੀ ਵਿੱਚ ਦਰਦ',
      stomach_pain: 'ਪੇਟ ਵਿੱਚ ਦਰਦ', 
      nausea: 'ਜੀ ਮਿਚਲਾਉਣਾ',
      body_ache: 'ਸਰੀਰ ਵਿੱਚ ਦਰਦ',
      neck_stiffness: 'ਗਰਦਨ ਵਿੱਚ ਅਕੜਨ'
    },
    diseases: {
      'Dengue Fever': 'ਡੇਂਗੂ ਬੁਖਾਰ - ਮੱਛਰ ਤੋਂ ਫੈਲਣ ਵਾਲਾ ਵਾਇਰਲ ਸੰਕਰਮਣ',
      'Malaria': 'ਮਲੇਰੀਆ - ਮੱਛਰ ਤੋਂ ਫੈਲਣ ਵਾਲਾ ਪਰਜੀਵੀ ਸੰਕਰਮਣ',
      'Pneumonia': 'ਨਿਮੋਨੀਆ - ਫੇਫੜਿਆਂ ਦਾ ਸੰਕਰਮਣ',
      'COVID-19': 'ਕੋਵਿਡ-19 - ਵਾਇਰਲ ਸਾਹ ਦੀ ਬਿਮਾਰੀ',
      'Food Poisoning': 'ਭੋਜਨ ਵਿਸ਼ਾਕਤਤਾ - ਦੂਸ਼ਿਤ ਭੋਜਨ ਤੋਂ ਬਿਮਾਰੀ',
      'Gastroenteritis': 'ਗੈਸਟ੍ਰੋਐਂਟੇਰਾਇਟਿਸ - ਪੇਟ ਅਤੇ ਅੰਤੜੀ ਦੀ ਸੋਜ',
      'Appendicitis': 'ਅਪੈਂਡਿਸਾਇਟਿਸ - ਅਪੈਂਡਿਕਸ ਦੀ ਸੋਜ, ਤੁਰੰਤ ਇਲਾਜ ਚਾਹੀਦਾ',
      'Meningitis': 'ਮੈਨਿੰਜਾਇਟਿਸ - ਗੰਭੀਰ ਦਿਮਾਗ ਅਤੇ ਰੀੜ੍ਹ ਦਾ ਸੰਕਰਮਣ'
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('language') || 'english'
  
  const supportedLanguages = ['english', 'hindi', 'punjabi']
  const selectedLanguage = supportedLanguages.includes(language) ? language : 'english'
  
  return NextResponse.json({
    language: selectedLanguage,
    translations: translations[selectedLanguage as keyof typeof translations],
    supportedLanguages: {
      english: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
      hindi: { name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
      punjabi: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const { text, fromLanguage, toLanguage } = await request.json()
    
    // Simple translation logic (in production, use Google Translate API or similar)
    // For now, return the localized text based on the target language
    const targetTranslations = translations[toLanguage as keyof typeof translations]
    
    if (!targetTranslations) {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 })
    }
    
    // Mock translation - in real implementation, this would use a translation service
    let translatedText = text
    
    // For demonstration, translate some common medical terms
    const medicalTerms: Record<string, Record<string, string>> = {
      'fever': {
        hindi: 'बुखार',
        punjabi: 'ਬੁਖਾਰ',
        english: 'fever'
      },
      'headache': {
        hindi: 'सिरदर्द',
        punjabi: 'ਸਿਰ ਦਰਦ',
        english: 'headache'
      },
      'cough': {
        hindi: 'खांसी',
        punjabi: 'ਖੰਘ',
        english: 'cough'
      }
    }
    
    // Simple term replacement for demonstration
    Object.keys(medicalTerms).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi')
      if (medicalTerms[term][toLanguage]) {
        translatedText = translatedText.replace(regex, medicalTerms[term][toLanguage])
      }
    })
    
    return NextResponse.json({
      originalText: text,
      translatedText,
      fromLanguage,
      toLanguage,
      confidence: 0.95
    })
    
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}