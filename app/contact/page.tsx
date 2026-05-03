"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { ThemedPageWrapper } from "@/components/themed-page-wrapper"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <ThemedPageWrapper 
      headerBadge="Contact Us"
      backLink="/"
    >
      {/* Contact Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-6 ${
            theme === "dark" ? "text-slate-100" : "text-slate-800"
          }`}>Contact Us</h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }`}>
            Get in touch with our team for support, partnerships, or any questions about NabhaHealth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="backdrop-blur-md bg-white/30 border border-white/40 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="bg-white/50 border-white/60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-white/50 border-white/60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="bg-white/50 border-white/60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  required
                  className="bg-white/50 border-white/60"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3"
              >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="backdrop-blur-md bg-white/30 border border-white/40 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Phone Support</h3>
                  <p className="text-slate-600">24/7 Emergency Helpline</p>
                </div>
              </div>
              <p className="text-slate-700 font-medium">+91 98765 43210</p>
              <p className="text-slate-600">Emergency: 108</p>
            </Card>

            <Card className="backdrop-blur-md bg-white/30 border border-white/40 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Email Support</h3>
                  <p className="text-slate-600">We'll respond within 24 hours</p>
                </div>
              </div>
              <p className="text-slate-700 font-medium">support@nabhahealth.com</p>
              <p className="text-slate-600">partnerships@nabhahealth.com</p>
            </Card>

            <Card className="backdrop-blur-md bg-white/30 border border-white/40 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Office Location</h3>
                  <p className="text-slate-600">Nabha, Punjab, India</p>
                </div>
              </div>
              <p className="text-slate-700">Civil Hospital Road</p>
              <p className="text-slate-700">Nabha, Punjab 147201</p>
            </Card>

            <Card className="backdrop-blur-md bg-white/30 border border-white/40 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Support Hours</h3>
                  <p className="text-slate-600">Always here when you need us</p>
                </div>
              </div>
              <p className="text-slate-700">Medical Support: 24/7</p>
              <p className="text-slate-700">General Support: 9 AM - 6 PM</p>
            </Card>
          </div>
        </div>
      </section>
    </ThemedPageWrapper>
  )
}
