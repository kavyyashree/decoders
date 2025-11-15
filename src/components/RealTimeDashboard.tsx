'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, MapPin, Utensils, AlertTriangle } from 'lucide-react'

function RealTimeDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [realTimeData, setRealTimeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch('/api/realtime')
      const data = await response.json()
      setRealTimeData(data)
    } catch (error) {
      console.error('Error fetching real-time data:', error)
    }
  }

  useEffect(() => {
    fetchStats()
    fetchRealTimeData()
    setLoading(false)

    const interval = setInterval(() => {
      fetchRealTimeData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  const occupancyRate = stats?.overview?.totalRooms 
    ? Math.round(((stats.overview.totalRooms - stats.overview.availableRooms) / stats.overview.totalRooms) * 100)
    : 0

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{stats?.institute?.name}</h2>
            <p className="text-blue-100 mb-4">{stats?.institute?.code} • {stats?.institute?.established}</p>
            <p className="text-blue-200">📍 {stats?.institute?.location}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Active Users</p>
                <p className="text-2xl font-bold text-blue-800">{realTimeData?.activeUsers || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Available Rooms</p>
                <p className="text-2xl font-bold text-green-800">{stats?.overview?.availableRooms || 0}</p>
                <p className="text-xs text-green-600">of {stats?.overview?.totalRooms} total</p>
              </div>
              <MapPin className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Canteen Crowd</p>
                <p className="text-2xl font-bold text-orange-800">{realTimeData?.canteenCrowd || 0}</p>
              </div>
              <Utensils className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Pending Issues</p>
                <p className="text-2xl font-bold text-red-800">{stats?.overview?.pendingIssues || 0}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campus Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-xl font-bold">{stats?.overview?.totalUsers || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Today Events</p>
                <p className="text-xl font-bold">{stats?.overview?.todayEvents || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Notes</p>
                <p className="text-xl font-bold">{stats?.overview?.totalNotes || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Public Notes</p>
                <p className="text-xl font-bold">{stats?.overview?.publicNotes || 0}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Room Occupancy</span>
                <span className="text-sm font-medium">{occupancyRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lost Found Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Lost Items</p>
                <p className="text-xl font-bold text-red-600">{stats?.overview?.lostItems || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Found Items</p>
                <p className="text-xl font-bold text-green-600">{stats?.overview?.foundItems || 0}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Recent Activity</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {stats?.recentActivity?.issues?.slice(0, 3).map((issue: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{issue.title}</span>
                    <span className="text-gray-500">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-700 font-medium">
                Live Data - Last updated: {realTimeData?.lastUpdated ? new Date(realTimeData.lastUpdated).toLocaleTimeString() : 'Never'}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => { fetchRealTimeData(); fetchStats(); }}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RealTimeDashboard