import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return null

  const token = authHeader.split(" ")[1]
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "nabha-health-secret")
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role")
  const userId = searchParams.get("userId")

  // Mock dashboard statistics
  if (role === "doctor") {
    const doctorStats = {
      todayAppointments: 8,
      totalPatients: 156,
      pendingConsultations: 3,
      completedToday: 5,
      avgRating: 4.8,
      monthlyConsultations: 89,
      emergencyCalls: 2,
      prescriptionsIssued: 23,
    }
    return NextResponse.json({ stats: doctorStats })
  } else {
    const patientStats = {
      upcomingAppointments: 2,
      totalConsultations: 12,
      healthRecords: 8,
      prescriptions: 5,
      lastCheckup: "2024-01-10",
      nextAppointment: "2024-01-15",
      medicineReminders: 3,
      healthScore: 85,
    }
    return NextResponse.json({ stats: patientStats })
  }
}
