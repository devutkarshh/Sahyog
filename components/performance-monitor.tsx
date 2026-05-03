"use client"

import { useEffect, useState } from 'react'
import { usePerformanceMetrics } from '@/lib/performance-utils'

interface PerformanceMonitorProps {
  enabled?: boolean
  showOverlay?: boolean
}

export default function PerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  showOverlay = false 
}: PerformanceMonitorProps) {
  const metrics = usePerformanceMetrics()
  const [vitals, setVitals] = useState({
    cls: 0,
    fid: 0,
    fcp: 0,
    lcp: 0,
    ttfb: 0
  })

  useEffect(() => {
    if (!enabled) return

    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'layout-shift':
            setVitals(prev => ({ ...prev, cls: entry.value }))
            break
          case 'largest-contentful-paint':
            setVitals(prev => ({ ...prev, lcp: entry.startTime }))
            break
          case 'first-contentful-paint':
            setVitals(prev => ({ ...prev, fcp: entry.startTime }))
            break
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming
            setVitals(prev => ({ 
              ...prev, 
              ttfb: navEntry.responseStart - navEntry.requestStart 
            }))
            break
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['layout-shift', 'largest-contentful-paint', 'first-contentful-paint', 'navigation'] })
    } catch (e) {
      console.warn('Performance Observer not supported')
    }

    return () => observer.disconnect()
  }, [enabled])

  // Log performance metrics to console in development
  useEffect(() => {
    if (enabled && process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics')
      console.log('Load Time:', `${metrics.loadTime.toFixed(2)}ms`)
      console.log('Render Time:', `${metrics.renderTime.toFixed(2)}ms`)
      console.log('Memory Usage:', `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`)
      console.log('LCP:', `${vitals.lcp.toFixed(2)}ms`)
      console.log('FCP:', `${vitals.fcp.toFixed(2)}ms`)
      console.log('CLS:', vitals.cls.toFixed(4))
      console.log('TTFB:', `${vitals.ttfb.toFixed(2)}ms`)
      console.groupEnd()
    }
  }, [enabled, metrics, vitals])

  if (!enabled || !showOverlay) {
    return null
  }

  return (
    <div className="fixed top-0 right-0 z-[9999] bg-black/80 text-white text-xs p-2 m-2 rounded font-mono backdrop-blur-sm">
      <div className="space-y-1">
        <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
        <div>Render: {metrics.renderTime.toFixed(0)}ms</div>
        <div>Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</div>
        <div className={vitals.lcp > 2500 ? 'text-red-400' : vitals.lcp > 1200 ? 'text-yellow-400' : 'text-green-400'}>
          LCP: {vitals.lcp.toFixed(0)}ms
        </div>
        <div className={vitals.fcp > 1800 ? 'text-red-400' : vitals.fcp > 1000 ? 'text-yellow-400' : 'text-green-400'}>
          FCP: {vitals.fcp.toFixed(0)}ms
        </div>
        <div className={vitals.cls > 0.25 ? 'text-red-400' : vitals.cls > 0.1 ? 'text-yellow-400' : 'text-green-400'}>
          CLS: {vitals.cls.toFixed(3)}
        </div>
      </div>
    </div>
  )
}