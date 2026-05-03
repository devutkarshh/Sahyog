"use client"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Calendar, 
  FileText, 
  User,
  Thermometer,
  Pill,
  Clock,
  Video
} from "lucide-react"

interface MedicalSkeletonProps {
  className?: string
  variant?: "card" | "list" | "dashboard" | "consultation" | "health-record"
  showIcon?: boolean
  animated?: boolean
}

export function MedicalSkeleton({ 
  className, 
  variant = "card", 
  showIcon = true,
  animated = true 
}: MedicalSkeletonProps) {
  const baseClasses = cn(
    "animate-pulse",
    animated && "animate-pulse",
    className
  )

  const getIcon = () => {
    switch (variant) {
      case "consultation":
        return <Video className="w-5 h-5 text-emerald-400/60" />
      case "health-record":
        return <FileText className="w-5 h-5 text-blue-400/60" />
      case "dashboard":
        return <Activity className="w-5 h-5 text-purple-400/60" />
      default:
        return <Heart className="w-5 h-5 text-emerald-400/60" />
    }
  }

  if (variant === "card") {
    return (
      <div className={cn("p-6 rounded-xl border bg-card", baseClasses)}>
        <div className="flex items-center space-x-4">
          {showIcon && (
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
              {getIcon()}
            </div>
          )}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "list") {
    return (
      <div className={cn("flex items-center space-x-3 p-3 rounded-lg", baseClasses)}>
        {showIcon && (
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            {getIcon()}
          </div>
        )}
        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-2 w-2/3" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    )
  }

  if (variant === "dashboard") {
    return (
      <div className={cn("p-6 rounded-xl border bg-card space-y-4", baseClasses)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showIcon && (
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                {getIcon()}
              </div>
            )}
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    )
  }

  if (variant === "consultation") {
    return (
      <div className={cn("p-6 rounded-xl border bg-card", baseClasses)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-400/60" />
            </div>
            <div>
              <Skeleton className="h-4 w-28 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400/60 rounded-full animate-pulse"></div>
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-32 w-full rounded-lg mb-4" />
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    )
  }

  if (variant === "health-record") {
    return (
      <div className={cn("p-4 rounded-lg border bg-card", baseClasses)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-400/60" />
            </div>
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <Calendar className="w-3 h-3 text-gray-400/60" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center space-x-4">
            <Stethoscope className="w-3 h-3 text-gray-400/60" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </div>
    )
  }

  return <Skeleton className={baseClasses} />
}

// Specialized skeleton components for different sections
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <MedicalSkeleton key={i} variant="card" />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <MedicalSkeleton variant="dashboard" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <MedicalSkeleton key={i} variant="list" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <MedicalSkeleton variant="dashboard" />
          <MedicalSkeleton variant="card" />
        </div>
      </div>
    </div>
  )
}

export function HealthRecordsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <MedicalSkeleton key={i} variant="health-record" />
        ))}
      </div>
    </div>
  )
}

export function ConsultationSkeleton() {
  return (
    <div className="space-y-6">
      {/* Video Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        <div className="lg:col-span-3">
          <MedicalSkeleton variant="consultation" />
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <Skeleton className="h-6 w-20 mb-4" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AppointmentsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-400/60" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24 mb-1" />
                  <div className="flex items-center space-x-4">
                    <Clock className="w-3 h-3 text-gray-400/60" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}