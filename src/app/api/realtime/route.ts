import { NextRequest, NextResponse } from 'next/server'

// Sample real-time data for Siddaganga Institute dashboard
const sampleRealTimeData = {
  activeUsers: 2847,
  canteenCrowd: 67,
  currentEvents: 8,
  lastUpdated: new Date().toISOString()
}

export async function GET(request: NextRequest) {
  try {
    // Simulate some variation in real-time data
    const variation = Math.random() * 20 - 10 // -10 to +10
    const activeUsers = Math.max(2500, 2847 + Math.floor(variation))
    const canteenCrowd = Math.max(20, Math.min(150, 67 + Math.floor(variation * 1.5)))
    
    const realTimeData = {
      activeUsers,
      canteenCrowd,
      currentEvents: 8,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(realTimeData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch real-time data' },
      { status: 500 }
    )
  }
}