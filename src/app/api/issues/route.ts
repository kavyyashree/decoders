import { NextRequest, NextResponse } from 'next/server'

// Sample issues data for Siddaganga Institute
const sampleIssues = [
  {
    id: 1,
    title: 'Water Leak in Room 105',
    description: 'Water leaking from ceiling in Room 105 of Hostel Block A',
    category: 'water',
    location: 'Hostel Block A - Room 105',
    priority: 'high',
    status: 'pending',
    userId: '1',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 2,
    title: 'Power Outage in Lab Building',
    description: 'Frequent power fluctuations in Computer Lab Building',
    category: 'electricity',
    location: 'CS Building - Lab 3',
    priority: 'medium',
    status: 'in-progress',
    userId: '2',
    createdAt: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: 3,
    title: 'AC Not Working in Library',
    description: 'Air conditioning not working in library reading hall',
    category: 'other',
    location: 'Library - Reading Hall',
    priority: 'medium',
    status: 'pending',
    userId: '3',
    createdAt: new Date(Date.now() - 28800000).toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(sampleIssues)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, location, priority, userId } = await request.json()

    if (!title || !category || !location || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newIssue = {
      id: Date.now(),
      title,
      description,
      category,
      location,
      priority: priority || 'medium',
      status: 'pending',
      userId,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Issue reported successfully!',
      issue: newIssue
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to report issue' },
      { status: 500 }
    )
  }
}