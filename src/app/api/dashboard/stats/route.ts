import { NextRequest, NextResponse } from 'next/server'

// Sample statistics for Siddaganga Institute dashboard
const sampleStats = {
  institute: {
    name: 'Siddaganga Institute of Technology',
    code: 'SIT',
    established: '1963',
    location: 'Tumkur, Karnataka, India'
  },
  overview: {
    totalUsers: 2847,
    totalRooms: 156,
    availableRooms: 89,
    pendingIssues: 12,
    todayEvents: 8,
    totalNotes: 342,
    publicNotes: 189,
    lostItems: 24,
    foundItems: 18
  },
  recentActivity: {
    issues: [
      {
        id: 1,
        title: 'Water Leak in Room 105',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 2,
        title: 'Power Outage in Lab Building',
        createdAt: new Date(Date.now() - 14400000).toISOString()
      },
      {
        id: 3,
        title: 'AC Not Working in Library',
        createdAt: new Date(Date.now() - 28800000).toISOString()
      }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(sampleStats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
}