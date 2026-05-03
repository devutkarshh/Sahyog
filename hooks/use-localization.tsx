'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'english' | 'hindi' | 'punjabi'

interface LocalizationContextType {
  currentLanguage: Language
  translations: Record<string, any>
  setLanguage: (language: Language) => void
  translate: (key: string, fallback?: string) => string
  isLoading: boolean
  supportedLanguages: Record<string, { name: string; nativeName: string; flag: string }>
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)

interface LocalizationProviderProps {
  children: ReactNode
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english')
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [supportedLanguages, setSupportedLanguages] = useState<Record<string, any>>({})

  const loadTranslations = async (language: Language) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/localization?language=${language}`)
      const data = await response.json()
      
      setTranslations(data.translations)
      setSupportedLanguages(data.supportedLanguages)
      
      // Store language preference in localStorage
      localStorage.setItem('preferred-language', language)
    } catch (error) {
      console.error('Failed to load translations:', error)
      // Fallback to English translations
      setTranslations({
        title: 'Sahyog AI Symptom Checker',
        subtitle: 'Advanced AI-powered health analysis',
        // ... other fallback translations
      })
    } finally {
      setIsLoading(false)
    }
  }

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    loadTranslations(language)
  }

  const translate = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }
    
    return typeof value === 'string' ? value : fallback || key
  }

  // Initialize with saved language preference or detect from browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    const browserLanguage = navigator.language.toLowerCase()
    
    let initialLanguage: Language = 'english'
    
    if (savedLanguage && ['english', 'hindi', 'punjabi'].includes(savedLanguage)) {
      initialLanguage = savedLanguage
    } else if (browserLanguage.includes('hi')) {
      initialLanguage = 'hindi'
    } else if (browserLanguage.includes('pa')) {
      initialLanguage = 'punjabi'
    }
    
    setCurrentLanguage(initialLanguage)
    loadTranslations(initialLanguage)
  }, [])

  const value: LocalizationContextType = {
    currentLanguage,
    translations,
    setLanguage,
    translate,
    isLoading,
    supportedLanguages
  }

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  )
}

export function useLocalization() {
  const context = useContext(LocalizationContext)
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider')
  }
  return context
}

// Utility function for getting the appropriate font class for each language
export function getLanguageFont(language: Language): string {
  switch (language) {
    case 'hindi':
      return 'font-hindi' // Would need to define this in CSS with appropriate Hindi font
    case 'punjabi':
      return 'font-punjabi' // Would need to define this in CSS with appropriate Gurmukhi font
    case 'english':
    default:
      return 'font-sans'
  }
}

// Utility function for text direction (useful for future RTL language support)
export function getTextDirection(language: Language): 'ltr' | 'rtl' {
  // Hindi and Punjabi are LTR, but this function is useful for future Arabic/Urdu support
  return 'ltr'
}