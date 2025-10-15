import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Lock, Users, Trophy, Target } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface CommunityProps {
  onBack: () => void;
}

export function Community({ onBack }: CommunityProps) {
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [wastesRecycled, setWastesRecycled] = useState(0);
  const [canJoin, setCanJoin] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const trees = parseInt(localStorage.getItem('terranova_trees_planted') || '0');
    const wastes = parseInt(localStorage.getItem('terranova_wastes_recycled') || '0');
    setTreesPlanted(trees);
    setWastesRecycled(wastes);
    setCanJoin(trees >= 50 && wastes >= 250);
    setIsMember(localStorage.getItem('terranova_community_member') === 'true');
  }, []);

  const joinCommunity = () => {
    if (canJoin) {
      localStorage.setItem('terranova_community_member', 'true');
      setIsMember(true);
    }
  };

  const challenges = [
    {
      title: 'Week 1: Plastic Free Challenge',
      description: 'Avoid single-use plastics for 7 days',
      reward: '100 coins, 25 diamonds',
      participants: 1234,
      difficulty: 'Medium'
    },
    {
      title: 'Week 2: Compost Champion',
      description: 'Start composting and share your setup',
      reward: '150 coins, 30 diamonds',
      participants: 891,
      difficulty: 'Easy'
    },
    {
      title: 'Week 3: Zero Waste Weekend',
      description: 'Produce zero waste for 2 days',
      reward: '200 coins, 50 diamonds',
      participants: 567,
      difficulty: 'Hard'
    },
    {
      title: 'Week 4: Community Cleanup',
      description: 'Organize a local cleanup event',
      reward: '300 coins, 75 diamonds',
      participants: 345,
      difficulty: 'Medium'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'EcoWarrior23', points: 15420, badge: '🏆' },
    { rank: 2, name: 'GreenGuru', points: 14890, badge: '🥈' },
    { rank: 3, name: 'RecycleKing', points: 13560, badge: '🥉' },
    { rank: 4, name: 'EarthLover', points: 12340, badge: '⭐' },
    { rank: 5, name: 'WasteWarrior', points: 11890, badge: '⭐' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-6">
        <h2>Community Hub</h2>
        <p className="text-muted-foreground">Join the global movement for a cleaner planet</p>
      </div>

      {/* Membership Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Welfare Community Membership</CardTitle>
          <CardDescription>
            Exclusive access to challenges and competitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isMember ? (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Trees Planted</span>
                    <span>{treesPlanted}/50</span>
                  </div>
                  <Progress value={(treesPlanted / 50) * 100} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Wastes Recycled</span>
                    <span>{wastesRecycled}/250</span>
                  </div>
                  <Progress value={(wastesRecycled / 250) * 100} />
                </div>
              </div>
              
              {canJoin ? (
                <Button onClick={joinCommunity} className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              ) : (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                    Plant 50+ trees and recycle 250+ wastes to unlock
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">Welcome, Member!</h3>
              <p className="text-muted-foreground">
                You're now part of the TerraNova Welfare Community
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Challenges */}
      <div className="mb-6">
        <h3 className="mb-4">Active Challenges</h3>
        <div className="space-y-3">
          {challenges.map((challenge, index) => (
            <Card key={index} className={!isMember ? 'opacity-60' : ''}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{challenge.title}</h4>
                      {!isMember && <Lock className="w-4 h-4" />}
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                      {challenge.description}
                    </p>
                  </div>
                  <Badge variant={
                    challenge.difficulty === 'Easy' ? 'secondary' :
                    challenge.difficulty === 'Medium' ? 'default' :
                    'destructive'
                  }>
                    {challenge.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span style={{ fontSize: '0.875rem' }}>{challenge.reward}</span>
                  </div>
                </div>
                
                {isMember && (
                  <Button className="w-full mt-3" variant="outline">
                    Join Challenge
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Global Leaderboard</CardTitle>
          <CardDescription>Top environmental champions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '1.5rem' }}>{entry.badge}</span>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>#{entry.rank} {entry.name}</p>
                    <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                      {entry.points.toLocaleString()} points
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!isMember && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
              <p style={{ fontSize: '0.875rem' }}>
                Join the community to compete on the leaderboard!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
