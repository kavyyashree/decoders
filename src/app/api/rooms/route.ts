import { NextRequest, NextResponse } from 'next/server'

// Sample room data for Siddaganga Institute
const sampleRooms = [
  {
    id: 1,
    name: 'Computer Lab - Room 201',
    type: 'Computer Lab',
    building: 'CS Building',
    floor: 2,
    capacity: 40,
    isAvailable: true
  },
  {
    id: 2,
    name: 'Study Room A',
    type: 'Study Room',
    building: 'Library',
    floor: 1,
    capacity: 8,
    isAvailable: true
  },
  {
    id: 3,
    name: 'Lecture Hall B',
    type: 'Lecture Hall',
    building: 'Main Academic Block',
    floor: 3,
    capacity: 120,
    isAvailable: false
  },
  {
    id: 4,
    name: 'Physics Lab',
    type: 'Laboratory',
    building: 'Science Block',
    floor: 2,
    capacity: 30,
    isAvailable: true
  },
  {
    id: 5,
    name: 'Tutorial Room 1',
    type: 'Tutorial Room',
    building: 'CS Building',
    floor: 1,
    capacity: 25,
    isAvailable: false
  },
  {
    id: 6,
    name: 'Electronics Lab',
    type: 'Laboratory',
    building: 'Science Block',
    floor: 3,
    capacity: 35,
    isAvailable: true
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(sampleRooms)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    )
  }
}