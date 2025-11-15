import { NextRequest, NextResponse } from 'next/server'

// Sample notes data for Siddaganga Institute
const sampleNotes = [
  {
    id: 1,
    title: 'Calculus Chapter 5 Notes',
    description: 'Complete notes on integration and differentiation with solved examples',
    subject: 'Mathematics',
    isPublic: true,
    fileUrl: null,
    userId: '1',
    user: {
      name: 'Rahul Kumar',
      email: 'rahul@site.ac.in'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 2,
    title: 'Physics Lab Manual',
    description: 'Comprehensive lab manual for quantum mechanics experiments',
    subject: 'Physics',
    isPublic: true,
    fileUrl: null,
    userId: '2',
    user: {
      name: 'Priya Sharma',
      email: 'priya@site.ac.in'
    },
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 3,
    title: 'Data Structures Assignment Solutions',
    description: 'Complete solutions for data structures and algorithms assignments',
    subject: 'Computer Science',
    isPublic: false,
    fileUrl: null,
    userId: '3',
    user: {
      name: 'Amit Patel',
      email: 'amit@site.ac.in'
    },
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 4,
    title: 'Digital Electronics Tutorial',
    description: 'Tutorial notes on digital logic circuits and design',
    subject: 'Electronics',
    isPublic: true,
    fileUrl: null,
    userId: '4',
    user: {
      name: 'Sneha Reddy',
      email: 'sneha@site.ac.in'
    },
    createdAt: new Date(Date.now() - 345600000).toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(sampleNotes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const title = formData.get('title')
    const description = formData.get('description')
    const subject = formData.get('subject')
    const isPublic = formData.get('isPublic') === 'true'
    const userId = formData.get('userId')
    const file = formData.get('file')

    if (!title || !subject || !userId) {
      return NextResponse.json(
        { error: 'Title, subject, and user ID are required' },
        { status: 400 }
      )
    }

    const newNote = {
      id: Date.now(),
      title,
      description: description || '',
      subject,
      isPublic,
      fileUrl: file ? `/uploads/${file.name}` : null, // In production, handle actual file upload
      userId,
      user: {
        name: 'Current User',
        email: 'user@site.ac.in'
      },
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Notes uploaded successfully!',
      note: newNote
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload notes' },
      { status: 500 }
    )
  }
}