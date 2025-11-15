import { NextRequest, NextResponse } from 'next/server'

// Sample users for Siddaganga Institute
const sampleUsers = [
  {
    id: '1',
    name: 'Rahul Kumar',
    email: 'rahul@site.ac.in',
    password: 'password123',
    role: 'student'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@site.ac.in',
    password: 'password123',
    role: 'student'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit@site.ac.in',
    password: 'password123',
    role: 'student'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in sample data
    const user = sampleUsers.find(u => u.email === email && u.password === password)

    if (user) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json(userWithoutPassword)
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}