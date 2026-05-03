import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const consultationId = params.id

    console.log(`[v0] Ending consultation ${consultationId}`)

    // In a real app, you would:
    // 1. Update consultation status in database
    // 2. Clean up video call resources
    // 3. Send notifications to participants
    // 4. Save consultation summary

    // Mock ending consultation
    const consultationData = {
      id: consultationId,
      status: "completed",
      endedAt: new Date().toISOString(),
      duration: Math.floor(Math.random() * 1800) + 300, // 5-35 minutes
    }

    return NextResponse.json({
      success: true,
      message: "Consultation ended successfully",
      consultation: consultationData,
    })
  } catch (error) {
    console.error("[v0] Error ending consultation:", error)
    return NextResponse.json({ error: "Failed to end consultation" }, { status: 500 })
  }
}
