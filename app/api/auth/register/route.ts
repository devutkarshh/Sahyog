import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, phone, address } = await request.json()

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user (in real app, save to database)
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      role: role || "patient",
      phone,
      address,
      createdAt: new Date().toISOString(),
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || "nabha-health-secret",
      { expiresIn: "24h" },
    )

    return NextResponse.json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
