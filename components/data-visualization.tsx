"use client"

import { useTheme } from "@/contexts/theme-context"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, MapPin, Activity } from "lucide-react"

export default function DataVisualization() {
  const { theme } = useTheme()

  const growthData = [
    { year: "2022", villages: 15, patients: 2500 },
    { year: "2023", villages: 45, patients: 12000 },
    { year: "2024", villages: 120, patients: 35000 },
    { year: "2025", villages: 173, patients: 50000 },
  ]

  const demographics = [
    { label: "Children (0-18)", percentage: 30, color: "from-blue-500 to-cyan-500" },
    { label: "Adults (19-60)", percentage: 55, color: "from-emerald-500 to-teal-500" },
    { label: "Elderly (60+)", percentage: 15, color: "from-purple-500 to-pink-500" },
  ]

  const punjabRegions = [
    { region: "Patiala District", villages: 67, status: "active" },
    { region: "Sangrur District", villages: 54, status: "active" },
    { region: "Fatehgarh Sahib", villages: 32, status: "active" },
    { region: "Barnala District", villages: 20, status: "expanding" },
  ]

  return (
    <section
      className={`relative z-10 py-20 backdrop-blur-sm ${
        theme === "dark"
          ? "bg-gradient-to-r from-slate-800/30 to-slate-700/20"
          : "bg-gradient-to-r from-white/30 to-white/20"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
            Sahyog's Impact Across Punjab
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
            Real data showing our growth and reach across rural communities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Growth Chart */}
          <Card
            className={`backdrop-blur-md border p-8 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                Growth Journey (2022-2025)
              </h3>
            </div>
            <div className="space-y-4">
              {growthData.map((item, index) => (
                <div key={item.year} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      {item.year}
                    </span>
                    <div className="text-right">
                      <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        {item.villages} villages • {item.patients.toLocaleString()} patients
                      </span>
                    </div>
                  </div>
                  <div className={`w-full h-2 rounded-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}>
                    <div
                      className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.villages / 173) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Demographics Pie Chart */}
          <Card
            className={`backdrop-blur-md border p-8 ${
              theme === "dark"
                ? "bg-slate-800/20 border-slate-700/30"
                : "bg-white/20 border-white/30"
            }`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                Patient Demographics
              </h3>
            </div>
            <div className="space-y-4">
              {demographics.map((item, index) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                      {item.label}
                    </span>
                    <span className={`text-sm font-bold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className={`w-full h-3 rounded-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}>
                    <div
                      className={`h-3 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Punjab Map Regions */}
        <Card
          className={`backdrop-blur-md border p-8 ${
            theme === "dark"
              ? "bg-slate-800/20 border-slate-700/30"
              : "bg-white/20 border-white/30"
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
              Regional Coverage Across Punjab
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {punjabRegions.map((region, index) => (
              <div
                key={region.region}
                className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-slate-700/30 border-slate-600/50"
                    : "bg-white/30 border-white/50"
                }`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-slate-100" : "text-slate-800"}`}>
                    {region.villages}
                  </div>
                  <div className={`text-sm mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
                    {region.region}
                  </div>
                  <div
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      region.status === "active"
                        ? theme === "dark"
                          ? "bg-green-900/50 text-green-400"
                          : "bg-green-100 text-green-700"
                        : theme === "dark"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {region.status === "active" ? "Active" : "Expanding"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}