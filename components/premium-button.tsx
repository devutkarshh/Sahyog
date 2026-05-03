"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/theme-context"
import type { ReactNode } from "react"

interface PremiumButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
}

export function PremiumButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
}: PremiumButtonProps) {
  const { theme } = useTheme()
  const baseClasses = "relative overflow-hidden transition-all duration-500 transform-gpu"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-cyan-500 hover:via-emerald-500 hover:to-teal-500 text-white shadow-xl hover:shadow-2xl animate-gradient-x hover:scale-105 hover:animate-pulse-glow",
    secondary:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-rose-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-xl hover:shadow-2xl animate-gradient-x hover:scale-105",
    outline: theme === "dark"
      ? "border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 dark:hover:bg-emerald-900/20 hover:scale-105 transition-all duration-300"
      : "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-all duration-300",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "bg-[length:200%_100%] hover:bg-[position:100%_0%]",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
      )}
    </Button>
  )
}
