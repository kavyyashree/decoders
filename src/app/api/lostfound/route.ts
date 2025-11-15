import { NextRequest, NextResponse } from 'next/server'

// Sample lost and found items for Siddaganga Institute
const sampleLostItems = [
  {
    id: 1,
    title: 'Black Wallet',
    description: 'Lost black leather wallet near library entrance',
    category: 'IDs',
    location: 'Library Building',
    contactInfo: 'student@site.ac.in',
    type: 'lost',
    imageUrl: null,
    userId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Silver Watch',
    description: 'Found silver digital watch in computer lab',
    category: 'Electronics',
    location: 'CS Building - Lab 3',
    contactInfo: 'found@site.ac.in',
    type: 'lost',
    imageUrl: null,
    userId: '2',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]

const sampleFoundItems = [
  {
    id: 3,
    title: 'Blue Backpack',
    description: 'Found blue backpack near parking area',
    category: 'Bags',
    location: 'Main Parking',
    contactInfo: 'security@site.ac.in',
    type: 'found',
    imageUrl: null,
    userId: '3',
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: 4,
    title: 'Student ID Card',
    description: 'Found SITE student ID card in canteen',
    category: 'IDs',
    location: 'Canteen Building',
    contactInfo: 'lostfound@site.ac.in',
    type: 'found',
    imageUrl: null,
    userId: '4',
    createdAt: new Date(Date.now() - 21600000).toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      lost: sampleLostItems,
      found: sampleFoundItems
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch lost and found items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const item = {
      id: Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      location: formData.get('location'),
      contactInfo: formData.get('contactInfo'),
      type: formData.get('type'),
      userId: formData.get('userId'),
      imageUrl: null, // In production, you'd handle file upload here
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: `${item.type} item reported successfully!`,
      item
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to report item' },
      { status: 500 }
    )
  }
}