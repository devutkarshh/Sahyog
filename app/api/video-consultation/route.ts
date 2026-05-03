import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock video consultation sessions
const consultationSessions = new Map()

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

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { appointmentId, action } = await request.json()

    if (action === "start") {
      // Create new consultation session
      const sessionId = `session_${Date.now()}`
      const session = {
        id: sessionId,
        appointmentId,
        startTime: new Date().toISOString(),
        status: "active",
        participants: [],
        connectionQuality: "good",
        recordingEnabled: false,
      }

      consultationSessions.set(sessionId, session)

      return NextResponse.json({
        sessionId,
        session,
        webrtcConfig: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
        },
      })
    }

    if (action === "join") {
      const { sessionId, participantInfo } = await request.json()
      const session = consultationSessions.get(sessionId)

      if (!session) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 })
      }

      session.participants.push({
        userId: user.userId,
        name: participantInfo.name,
        role: user.role,
        joinedAt: new Date().toISOString(),
        connectionStatus: "connected",
      })

      return NextResponse.json({ session })
    }

    if (action === "end") {
      const { sessionId } = await request.json()
      const session = consultationSessions.get(sessionId)

      if (session) {
        session.status = "completed"
        session.endTime = new Date().toISOString()
        session.duration = Math.round((new Date().getTime() - new Date(session.startTime).getTime()) / 1000)
      }

      return NextResponse.json({ session })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Consultation session failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId")

  if (sessionId) {
    const session = consultationSessions.get(sessionId)
    return NextResponse.json({ session })
  }

  // Return all sessions for user
  const userSessions = Array.from(consultationSessions.values()).filter((session) =>
    session.participants.some((p: any) => p.userId === user.userId),
  )

  return NextResponse.json({ sessions: userSessions })
}
