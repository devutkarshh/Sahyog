"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LoadingState {
  dashboard: boolean
  healthRecords: boolean
  appointments: boolean
  consultation: boolean
  symptomChecker: boolean
  pharmacy: boolean
  [key: string]: boolean
}

interface LoadingContextType {
  loadingStates: LoadingState
  setLoading: (key: keyof LoadingState, loading: boolean) => void
  isLoading: (key: keyof LoadingState) => boolean
  setMultipleLoading: (states: Partial<LoadingState>) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

const initialLoadingState: LoadingState = {
  dashboard: false,
  healthRecords: false,
  appointments: false,
  consultation: false,
  symptomChecker: false,
  pharmacy: false,
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>(initialLoadingState)

  const setLoading = (key: keyof LoadingState, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }))
  }

  const isLoading = (key: keyof LoadingState) => {
    return loadingStates[key]
  }

  const setMultipleLoading = (states: Partial<LoadingState>) => {
    setLoadingStates(prev => {
      const newState = { ...prev }
      Object.entries(states).forEach(([key, value]) => {
        if (value !== undefined) {
          newState[key as keyof LoadingState] = value
        }
      })
      return newState
    })
  }

  return (
    <LoadingContext.Provider value={{
      loadingStates,
      setLoading,
      isLoading,
      setMultipleLoading
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

// Hook for component-level loading with automatic cleanup
export function useComponentLoading(key: keyof LoadingState) {
  const { setLoading, isLoading } = useLoading()
  
  const startLoading = () => setLoading(key, true)
  const stopLoading = () => setLoading(key, false)
  const loading = isLoading(key)

  return {
    loading,
    startLoading,
    stopLoading,
    setLoading: (state: boolean) => setLoading(key, state)
  }
}