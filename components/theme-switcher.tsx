"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="theme-switcher-button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <div className="theme-switcher-icons">
        <Sun 
          className={`theme-icon sun-icon ${!isDark ? 'active' : 'inactive'}`}
          size={20}
        />
        <Moon 
          className={`theme-icon moon-icon ${isDark ? 'active' : 'inactive'}`}
          size={18}
        />
      </div>
    </button>
  )
}