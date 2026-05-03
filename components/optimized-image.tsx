"use client"

import Image from 'next/image'
import { useState, memo } from 'react'
import { ImageIcon } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
  placeholder?: 'blur' | 'empty'
  quality?: number
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  style,
  placeholder = 'empty',
  quality = 85,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { theme } = useTheme()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center ${className} ${
          theme === "dark" 
            ? "bg-slate-800 text-slate-500" 
            : "bg-slate-100 text-slate-400"
        }`}
        style={style}
      >
        <ImageIcon className="w-8 h-8" />
        <span className="ml-2 text-sm">Image unavailable</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${fill ? 'object-cover' : ''}`}
        onLoad={handleLoadingComplete}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  )
})

export default OptimizedImage