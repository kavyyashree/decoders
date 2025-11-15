import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = 'student' } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Create new user (in production, you'd save to database)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(newUser)

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}