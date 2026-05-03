import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock appointments database
const appointments = [
  {
    id: "1",
    patientId: "1",
    doctorId: "2",
    patientName: "Rajesh Kumar",
    doctorName: "Dr. Priya Sharma",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "Video Consultation",
    status: "scheduled",
    symptoms: "Fever, headache",
    notes: "Follow-up consultation",
  },
  {
    id: "2",
    patientId: "1",
    doctorId: "2",
    patientName: "Rajesh Kumar",
    doctorName: "Dr. Priya Sharma",
    date: "2024-01-20",
    time: "2:30 PM",
    type: "General Checkup",
    status: "completed",
    symptoms: "Regular checkup",
    notes: "All vitals normal",
  },
]

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader) return null

  const token = authHeader.split(" ")[1]
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "nabha-health-secret") as any
  } catch (error) {
    console.error("[v0] Token verification failed:", error)
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const role = searchParams.get("role")

  let filteredAppointments = appointments
  if (role === "patient") {
    filteredAppointments = appointments.filter((apt) => apt.patientId === userId)
  } else if (role === "doctor") {
    filteredAppointments = appointments.filter((apt) => apt.doctorId === userId)
  }

  return NextResponse.json({ appointments: filteredAppointments })
}

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const appointmentData = await request.json()
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    }

    appointments.push(newAppointment)
    return NextResponse.json({ appointment: newAppointment })
  } catch (error) {
    console.error("[v0] Failed to create appointment:", error)
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
