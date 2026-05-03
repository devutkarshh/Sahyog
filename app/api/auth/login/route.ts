import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock database - replace with actual database
const users = [
  {
    id: "1",
    email: "patient@nabhahealth.com",
    password: "$2a$10$rOvHdKzjbQIqtNG.XiQxaOKANjXdFQqNQH5cGxQ8yQxQxQxQxQxQx", // password123
    role: "patient",
    name: "Rajesh Kumar",
  },
  {
    id: "2",
    email: "doctor@nabhahealth.com",
    password: "$2a$10$rOvHdKzjbQIqtNG.XiQxaOKANjXdFQqNQH5cGxQ8yQxQxQxQxQxQx", // password123
    role: "doctor",
    name: "Dr. Priya Sharma",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "nabha-health-secret",
      { expiresIn: "24h" },
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
