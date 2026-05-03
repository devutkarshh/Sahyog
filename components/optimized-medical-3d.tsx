"use client"

import { useState, useEffect, useRef } from "react"
import "@/styles/instant-medical-3d.css"

interface OptimizedMedical3DProps {
  theme: string
}

export default function OptimizedMedical3D({ theme }: OptimizedMedical3DProps) {
  const [showSketchfab, setShowSketchfab] = useState(false)
  const [sketchfabLoaded, setSketchfabLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Use Intersection Observer to only load Sketchfab when page is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            // Delay Sketchfab loading to let page settle
            timeoutRef.current = setTimeout(() => {
              setShowSketchfab(true)
            }, 1500) // Load after 1.5 seconds when page is visible
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSketchfabLoad = () => {
    setSketchfabLoaded(true)
    // Fade out instant animation after Sketchfab loads
    setTimeout(() => {
      const instantAnimation = document.querySelector('.medical-3d-container')
      if (instantAnimation) {
        instantAnimation.classList.add('fade-out')
      }
    }, 500)
  }

  return (
    <>
      {/* Instant CSS 3D Animation - Loads immediately */}
      <div 
        ref={containerRef}
        className={`medical-3d-container ${sketchfabLoaded ? 'fade-out' : ''}`}
      >
        <div className="medical-scene">
          {/* Main Caduceus Staff */}
          <div className="caduceus-staff"></div>
          
          {/* Wings */}
          <div className="caduceus-wing left"></div>
          <div className="caduceus-wing right"></div>
          
          {/* First Serpent */}
          <div className="medical-serpent serpent-1">
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
          </div>
          
          {/* Second Serpent */}
          <div className="medical-serpent serpent-2">
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
            <div className="serpent-body"></div>
          </div>
          
          {/* Floating Medical Particles */}
          <div className="medical-particles">
            <div className="medical-particle particle-cross"></div>
            <div className="medical-particle particle-heart"></div>
            <div className="medical-particle particle-pulse"></div>
            <div className="medical-particle particle-cross"></div>
            <div className="medical-particle particle-heart"></div>
            <div className="medical-particle particle-pulse"></div>
          </div>
        </div>
      </div>

      {/* Sketchfab 3D Model - Loads progressively */}
      {showSketchfab && (
        <div className="fixed inset-0 w-full h-full z-0">
          <div className="sketchfab-embed-wrapper w-full h-full">
            <iframe 
              title="Medical Caduceus 3D Model"
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; fullscreen; xr-spatial-tracking" 
              src="https://sketchfab.com/models/25e4fd28387a494a875babd7a4271c0f/embed?autospin=1&autostart=1&preload=1&ui_theme=dark"
              className="w-full h-full border-0"
              style={{
                width: '100%',
                height: '100%',
                opacity: sketchfabLoaded ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
              }}
              onLoad={handleSketchfabLoad}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Overlay for better text readability */}
      <div 
        className={`fixed inset-0 transition-all duration-1000 ${
          theme === "dark"
            ? "bg-slate-900/85"
            : "bg-white/75"
        }`}
        style={{ zIndex: 1 }}
      />
    </>
  )
}