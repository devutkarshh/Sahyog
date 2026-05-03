import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock notifications database
const notifications = [
  {
    id: "1",
    userId: "1",
    type: "appointment_reminder",
    title: "Upcoming Appointment",
    message: "You have a video consultation with Dr. Priya Sharma in 30 minutes",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    data: { appointmentId: "1" },
  },
  {
    id: "2",
    userId: "1",
    type: "prescription_ready",
    title: "Prescription Ready",
    message: "Your prescription is ready for pickup at Nabha Medical Store",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    data: { pharmacyId: "1" },
  },
  {
    id: "3",
    userId: "2",
    type: "new_patient",
    title: "New Patient Appointment",
    message: "Rajesh Kumar has booked an appointment for tomorrow at 10:00 AM",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    data: { appointmentId: "2", patientId: "1" },
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

  const userNotifications = notifications
    .filter((notif) => notif.userId === user.userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({ notifications: userNotifications })
}

export async function PUT(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { notificationId, read } = await request.json()

    const notification = notifications.find((n) => n.id === notificationId && n.userId === user.userId)
    if (notification) {
      notification.read = read
      return NextResponse.json({ notification })
    }

    return NextResponse.json({ error: "Notification not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, type, title, message, data } = await request.json()

    const newNotification = {
      id: Date.now().toString(),
      userId,
      type,
      title,
      message,
      read: false,
      createdAt: new Date().toISOString(),
      data: data || {},
    }

    notifications.push(newNotification)

    // In a real app, you would send push notifications here

    return NextResponse.json({ notification: newNotification })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
