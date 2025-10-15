import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Gamepad2, MapPin, Calendar, Camera, Trophy, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CameraCapture } from './CameraCapture';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [level, setLevel] = useState(1);
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [wastesRecycled, setWastesRecycled] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showPlantingCamera, setShowPlantingCamera] = useState(false);

  const loadStats = () => {
    setLevel(parseInt(localStorage.getItem('terranova_level') || '1'));
    setTreesPlanted(parseInt(localStorage.getItem('terranova_trees_planted') || '0'));
    setWastesRecycled(parseInt(localStorage.getItem('terranova_wastes_recycled') || '0'));
    setCoins(parseInt(localStorage.getItem('terranova_coins') || '100'));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const levelProgress = ((wastesRecycled % 10) / 10) * 100;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2>Welcome Back!</h2>
        <p className="text-muted-foreground">Let's make a difference today</p>
      </div>

      {/* Level Progress */}
      <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Current Level</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Level {level}</p>
            </div>
            <Trophy className="w-12 h-12 opacity-80" />
          </div>
          <Progress value={levelProgress} className="h-2 bg-white/30" />
          <p className="mt-2" style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            {10 - (wastesRecycled % 10)} more wastes to next level
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-2" style={{ fontSize: '2rem' }}>🌳</div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{treesPlanted}</p>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Trees Planted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-2" style={{ fontSize: '2rem' }}>♻️</div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{wastesRecycled}</p>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>Wastes Recycled</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3>Quick Actions</h3>
        
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('segregation')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Waste Segregation Game</CardTitle>
                <CardDescription>Sort waste into correct bins</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
          if (coins >= 150) {
            onNavigate('wasterun');
          } else {
            alert(`You need 150 coins to unlock Waste Run! You have ${coins} coins.`);
          }
        }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <CardTitle>Waste Run Game {coins < 150 && '🔒'}</CardTitle>
                <CardDescription>
                  {coins >= 150 ? 'Run and segregate waste' : `Unlock for 150 coins (${coins}/150)`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('camera')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Verify Recycling</CardTitle>
                <CardDescription>Upload photo for 20 coins & 5 diamonds</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('gps')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>GPS Tracker</CardTitle>
                <CardDescription>Track waste collection trucks</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('schedule')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <CardTitle>Waste Schedule</CardTitle>
                <CardDescription>Manage collection schedule</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('analytics')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>View your impact statistics</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Plant a Tree */}
      <Card className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ fontSize: '3rem' }}>🌳</div>
              <div>
                <h3>Plant a Tree</h3>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Costs 10 coins
                </p>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (coins >= 10) {
                  // Deduct coins first
                  const currentCoins = parseInt(localStorage.getItem('terranova_coins') || '0');
                  localStorage.setItem('terranova_coins', (currentCoins - 10).toString());
                  setCoins(currentCoins - 10);
                  // Open camera for verification
                  setShowPlantingCamera(true);
                } else {
                  alert('You need 10 coins to plant a tree!');
                }
              }}
              disabled={coins < 10}
            >
              Plant Tree
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Camera Modal */}
      {showPlantingCamera && (
        <CameraCapture
          activityType="planting"
          rewards={{ coins: 15, diamonds: 3 }}
          onSuccess={() => {
            setShowPlantingCamera(false);
            loadStats();
          }}
          onCancel={() => {
            // Refund coins if user cancels
            const currentCoins = parseInt(localStorage.getItem('terranova_coins') || '0');
            localStorage.setItem('terranova_coins', (currentCoins + 10).toString());
            setShowPlantingCamera(false);
            loadStats();
          }}
        />
      )}
    </div>
  );
}
