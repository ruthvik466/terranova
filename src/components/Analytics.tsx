import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  onBack: () => void;
}

export function Analytics({ onBack }: AnalyticsProps) {
  const [wastesRecycled, setWastesRecycled] = useState(0);

  useEffect(() => {
    setWastesRecycled(parseInt(localStorage.getItem('terranova_wastes_recycled') || '0'));
  }, []);

  // Sample data for waste generation in locality (actual data simulation)
  const localityWasteData = [
    { month: 'Jan', waste: 1200 },
    { month: 'Feb', waste: 1100 },
    { month: 'Mar', waste: 1300 },
    { month: 'Apr', waste: 1250 },
    { month: 'May', waste: 1400 },
    { month: 'Jun', waste: 1350 },
  ];

  // User's recycling activity
  const userRecyclingData = [
    { month: 'Jan', recycled: Math.floor(wastesRecycled * 0.1) },
    { month: 'Feb', recycled: Math.floor(wastesRecycled * 0.15) },
    { month: 'Mar', recycled: Math.floor(wastesRecycled * 0.2) },
    { month: 'Apr', recycled: Math.floor(wastesRecycled * 0.25) },
    { month: 'May', recycled: Math.floor(wastesRecycled * 0.15) },
    { month: 'Jun', recycled: Math.floor(wastesRecycled * 0.15) },
  ];

  // Waste type distribution
  const wasteTypeData = [
    { name: 'Organic', value: 35, color: '#22c55e' },
    { name: 'Plastic', value: 25, color: '#3b82f6' },
    { name: 'Paper', value: 20, color: '#eab308' },
    { name: 'Metal', value: 10, color: '#6b7280' },
    { name: 'Glass', value: 7, color: '#06b6d4' },
    { name: 'E-Waste', value: 3, color: '#ef4444' },
  ];

  // Weekly progress
  const weeklyData = [
    { day: 'Mon', items: 5 },
    { day: 'Tue', items: 8 },
    { day: 'Wed', items: 6 },
    { day: 'Thu', items: 10 },
    { day: 'Fri', items: 7 },
    { day: 'Sat', items: 12 },
    { day: 'Sun', items: 9 },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-6">
        <h2>Analytics & Insights</h2>
        <p className="text-muted-foreground">Track your environmental impact</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Total Recycled</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{wastesRecycled}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span style={{ fontSize: '1.5rem' }}>♻️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>This Week</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>57</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>CO₂ Saved</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{(wastesRecycled * 0.5).toFixed(1)}kg</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <span style={{ fontSize: '1.5rem' }}>🌍</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart - Locality Waste Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Locality Waste Generation</CardTitle>
            <CardDescription>Monthly waste in your area (tons)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={localityWasteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="waste" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - User Recycling */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recycling Activity</CardTitle>
            <CardDescription>Items recycled per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userRecyclingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="recycled" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Waste Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Type Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>This Week's Progress</CardTitle>
            <CardDescription>Daily recycling items</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="items" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }} className="mb-2">🌳 Environmental Impact</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                Your recycling efforts are equivalent to planting {Math.floor(wastesRecycled / 10)} trees!
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }} className="mb-2">💧 Water Saved</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                You've saved approximately {(wastesRecycled * 2).toLocaleString()} liters of water through recycling.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }} className="mb-2">⚡ Energy Conservation</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                Your actions have conserved enough energy to power a home for {Math.floor(wastesRecycled / 5)} days!
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }} className="mb-2">🏆 Community Rank</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                You're in the top 15% of recyclers in your community!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
