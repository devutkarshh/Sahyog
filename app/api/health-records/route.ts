import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock health records database
const healthRecords = [
  {
    id: "1",
    patientId: "1",
    type: "vital_signs",
    date: "2024-01-10",
    data: {
      bloodPressure: "120/80",
      heartRate: 72,
      temperature: 98.6,
      weight: 70,
      height: 175,
    },
    doctorId: "2",
    notes: "Normal vital signs",
  },
  {
    id: "2",
    patientId: "1",
    type: "prescription",
    date: "2024-01-08",
    data: {
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice daily", duration: "5 days" },
        { name: "Amoxicillin", dosage: "250mg", frequency: "Three times daily", duration: "7 days" },
      ],
    },
    doctorId: "2",
    notes: "For fever and infection",
  },
  {
    id: "3",
    patientId: "1",
    type: "lab_results",
    date: "2024-01-05",
    data: {
      tests: [
        { name: "Blood Sugar", value: "95 mg/dL", range: "70-100 mg/dL", status: "normal" },
        { name: "Cholesterol", value: "180 mg/dL", range: "<200 mg/dL", status: "normal" },
        { name: "Hemoglobin", value: "14.2 g/dL", range: "12-16 g/dL", status: "normal" },
      ],
    },
    doctorId: "2",
    notes: "All tests within normal range",
  },
]

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
  const patientId = searchParams.get("patientId")
  const type = searchParams.get("type")

  let filteredRecords = healthRecords.filter((record) => record.patientId === patientId)

  if (type) {
    filteredRecords = filteredRecords.filter((record) => record.type === type)
  }

  return NextResponse.json({ records: filteredRecords })
}

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const recordData = await request.json()
    const newRecord = {
      id: Date.now().toString(),
      ...recordData,
      createdAt: new Date().toISOString(),
    }

    healthRecords.push(newRecord)
    return NextResponse.json({ record: newRecord })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create health record" }, { status: 500 })
  }
}
