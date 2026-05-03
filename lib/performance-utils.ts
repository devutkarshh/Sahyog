import { useCallback, useRef, useEffect, useMemo, useState } from 'react'

// Debounce hook for performance optimization
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  ) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

// Throttle hook for scroll/resize events
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now())
  
  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    },
    [callback, delay]
  ) as T

  return throttledCallback
}

// Memoized intersection observer for lazy loading
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  }), [options])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      observerOptions
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [observerOptions])

  return { elementRef, isIntersecting }
}

// Memory-efficient animation frame hook
export function useAnimationFrame(callback: () => void, dependency: any[] = []) {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      callback()
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, dependency)

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])
}

// Optimized local storage hook with compression
export function useOptimizedLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value)
      // Use requestIdleCallback for non-blocking storage writes
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => {
          window.localStorage.setItem(key, JSON.stringify(value))
        })
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          window.localStorage.setItem(key, JSON.stringify(value))
        }, 0)
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key])

  return [storedValue, setValue]
}

// Performance monitoring hook
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0
  })

  useEffect(() => {
    // Measure load time
    const loadTime = performance.now()
    
    // Measure memory usage (if available)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

    setMetrics({
      loadTime,
      renderTime: 0,
      memoryUsage
    })

    // Track render time
    const renderStart = performance.now()
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStart
      setMetrics(prev => ({ ...prev, renderTime }))
    })
  }, [])

  return metrics
}

// Bundle size analyzer utility
export const bundleAnalyzer = {
  logComponentSize: (componentName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Component ${componentName} loaded at:`, performance.now())
    }
  },
  
  measureRenderTime: (componentName: string, renderFn: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      renderFn()
      const end = performance.now()
      console.log(`${componentName} render time:`, end - start, 'ms')
    } else {
      renderFn()
    }
  }
}