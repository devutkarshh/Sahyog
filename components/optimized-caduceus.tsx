"use client"

import { useState, useEffect, useRef } from "react"
import { Stethoscope, Heart, Activity } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface OptimizedCaduceusProps {
  className?: string
}

export default function OptimizedCaduceus({ className = "" }: OptimizedCaduceusProps) {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [shouldLoadModel, setShouldLoadModel] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { theme } = useTheme()

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          // Delay model loading slightly to prioritize critical content
          setTimeout(() => setShouldLoadModel(true), 100)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1 
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Handle iframe load event
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      // Add a small delay to ensure the 3D model is actually rendered
      setTimeout(() => setIsModelLoaded(true), 500)
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [shouldLoadModel])

  return (
    <div ref={containerRef} className={`fixed inset-0 w-full h-full ${className}`}>
      {/* Medical Loading Skeleton */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isModelLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            {/* Animated Medical Icons */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className={`p-4 rounded-full animate-pulse ${
                theme === "dark" 
                  ? "bg-emerald-900/30 border border-emerald-700/50" 
                  : "bg-emerald-100/50 border border-emerald-200/50"
              }`}>
                <Stethoscope className="w-8 h-8 text-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              </div>
              <div className={`p-4 rounded-full animate-pulse ${
                theme === "dark" 
                  ? "bg-teal-900/30 border border-teal-700/50" 
                  : "bg-teal-100/50 border border-teal-200/50"
              }`}>
                <Heart className="w-8 h-8 text-teal-600 animate-bounce" style={{ animationDelay: '200ms' }} />
              </div>
              <div className={`p-4 rounded-full animate-pulse ${
                theme === "dark" 
                  ? "bg-cyan-900/30 border border-cyan-700/50" 
                  : "bg-cyan-100/50 border border-cyan-200/50"
              }`}>
                <Activity className="w-8 h-8 text-cyan-600 animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>

            {/* Loading Text */}
            <div className={`space-y-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              <div className="text-lg font-medium">Loading Medical Visualization</div>
              <div className={`text-sm ${theme === "dark" ? "text-slate-200" : "text-slate-700"}`}>Preparing 3D Healthcare Model...</div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 max-w-xs mx-auto">
              <div className={`h-1 rounded-full overflow-hidden ${
                theme === "dark" ? "bg-slate-700/50" : "bg-slate-200/50"
              }`}>
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model Container */}
      {shouldLoadModel && (
        <div className="sketchfab-embed-wrapper w-full h-full">
          <iframe
            ref={iframeRef}
            title="Medical Caduceus - 3D Healthcare Symbol"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            loading="lazy"
            src="https://sketchfab.com/models/25e4fd28387a494a875babd7a4271c0f/embed?autospin=1&autostart=1&preload=1&ui_theme=dark&dnt=1"
            className={`w-full h-full border-0 transition-opacity duration-1000 ${
              isModelLoaded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onLoad={() => {
              // Backup load handler if useEffect doesn't catch it
              setTimeout(() => setIsModelLoaded(true), 300)
            }}
          />
        </div>
      )}

      {/* Fallback for very slow connections */}
      {isInView && !shouldLoadModel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-2" />
            <div className="text-sm">Initializing 3D Model...</div>
          </div>
        </div>
      )}
    </div>
  )
}