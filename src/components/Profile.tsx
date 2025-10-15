import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Edit, Save, Trophy, Target } from 'lucide-react';
import { Progress } from './ui/progress';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    level: 1,
    coins: 0,
    diamonds: 0,
    trees: 0,
    wastes: 0
  });

  useEffect(() => {
    const profileData = localStorage.getItem('terranova_profile');
    if (profileData) {
      const parsed = JSON.parse(profileData);
      setProfile(parsed);
      setEditedProfile(parsed);
    }

    setStats({
      level: parseInt(localStorage.getItem('terranova_level') || '1'),
      coins: parseInt(localStorage.getItem('terranova_coins') || '0'),
      diamonds: parseInt(localStorage.getItem('terranova_diamonds') || '0'),
      trees: parseInt(localStorage.getItem('terranova_trees_planted') || '0'),
      wastes: parseInt(localStorage.getItem('terranova_wastes_recycled') || '0')
    });
  }, []);

  const handleSave = () => {
    localStorage.setItem('terranova_profile', JSON.stringify(editedProfile));
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first recycling', icon: '🌱', unlocked: stats.wastes > 0 },
    { id: 2, name: 'Eco Warrior', description: 'Recycle 50 items', icon: '⚔️', unlocked: stats.wastes >= 50 },
    { id: 3, name: 'Century Club', description: 'Recycle 100 items', icon: '💯', unlocked: stats.wastes >= 100 },
    { id: 4, name: 'Tree Hugger', description: 'Plant 25 trees', icon: '🌳', unlocked: stats.trees >= 25 },
    { id: 5, name: 'Community Leader', description: 'Join the welfare community', icon: '👑', unlocked: localStorage.getItem('terranova_community_member') === 'true' },
    { id: 6, name: 'Quiz Master', description: 'Complete 5 quizzes', icon: '🎓', unlocked: stats.level >= 6 },
  ];

  const levelProgress = ((stats.wastes % 10) / 10) * 100;

  if (!profile) return null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <span style={{ fontSize: '3rem' }}>{profile.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2>{profile.username}</h2>
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-full">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span style={{ fontSize: '0.875rem' }}>Level {stats.level}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-3">{profile.nationality} • {profile.country}</p>
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1" style={{ fontSize: '0.875rem' }}>
                  <span>Progress to Level {stats.level + 1}</span>
                  <span>{stats.wastes % 10}/10</span>
                </div>
                <Progress value={levelProgress} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="mb-1" style={{ fontSize: '1.5rem' }}>🪙</div>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.coins}</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Coins</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="mb-1" style={{ fontSize: '1.5rem' }}>💎</div>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.diamonds}</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Diamonds</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="mb-1" style={{ fontSize: '1.5rem' }}>🌳</div>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.trees}</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Trees</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="mb-1" style={{ fontSize: '1.5rem' }}>♻️</div>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{stats.wastes}</p>
              <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Recycled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Profile Information</CardTitle>
            <Button
              variant={isEditing ? 'default' : 'outline'}
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Username</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.username}
                  onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                />
              ) : (
                <p className="mt-1">{profile.username}</p>
              )}
            </div>

            <div>
              <Label>Nationality</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.nationality}
                  onChange={(e) => setEditedProfile({ ...editedProfile, nationality: e.target.value })}
                />
              ) : (
                <p className="mt-1">{profile.nationality}</p>
              )}
            </div>

            <div>
              <Label>Country</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.country}
                  onChange={(e) => setEditedProfile({ ...editedProfile, country: e.target.value })}
                />
              ) : (
                <p className="mt-1">{profile.country}</p>
              )}
            </div>

            <div>
              <Label>Address</Label>
              {isEditing ? (
                <Input
                  value={editedProfile.address}
                  onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                />
              ) : (
                <p className="mt-1">{profile.address}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your milestones and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  achievement.unlocked
                    ? 'border-green-500 bg-green-50'
                    : 'border-border bg-muted opacity-50'
                }`}
              >
                <div className="mb-2" style={{ fontSize: '2rem' }}>{achievement.icon}</div>
                <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{achievement.name}</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-2 text-green-600" style={{ fontSize: '0.75rem' }}>
                    ✓ Unlocked
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
