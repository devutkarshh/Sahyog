"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuthState } from "@/hooks/use-auth"
import { useTheme } from "@/contexts/theme-context"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuthState()
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      router.push("/patient/dashboard") // Default to patient dashboard
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemedPageWrapper showHeader={false}>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Card className={`backdrop-blur-md border p-8 ${
            theme === "dark"
              ? "bg-slate-800/20 border-slate-700/30"
              : "bg-white/20 border-white/30"
          }`}>
            <div className="text-center mb-8">
              <Link href="/" className="flex items-center justify-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  NabhaHealth
                </span>
              </Link>
              <h1 className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}>Welcome Back</h1>
            <p className="text-slate-600">Sign in to access your health portal</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-white/50 border-white/30"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 bg-white/50 border-white/30"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Demo Accounts</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <strong>Patient:</strong> patient@nabhahealth.com / password123
              </p>
              <p>
                <strong>Doctor:</strong> doctor@nabhahealth.com / password123
              </p>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </ThemedPageWrapper>
  )
}
