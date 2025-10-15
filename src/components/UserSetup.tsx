import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { User, MapPin, Globe, Home } from 'lucide-react';

interface UserSetupProps {
  onComplete: () => void;
}

const avatarOptions = ['🌱', '🌍', '♻️', '🌳', '💚', '🌿', '🌸', '🦋'];

export function UserSetup({ onComplete }: UserSetupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    avatar: '🌱',
    nationality: '',
    country: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (step === 1) {
      if (!formData.username || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!formData.nationality || !formData.country || !formData.address) {
        setError('Please fill in all fields');
        return;
      }
      
      localStorage.setItem('terranova_profile', JSON.stringify(formData));
      localStorage.setItem('terranova_coins', '100');
      localStorage.setItem('terranova_diamonds', '10');
      localStorage.setItem('terranova_level', '1');
      localStorage.setItem('terranova_trees_planted', '0');
      localStorage.setItem('terranova_wastes_recycled', '0');
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            TerraNova
          </h1>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Step {step} of 2
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Choose Your Avatar</Label>
                <div className="grid grid-cols-4 gap-2">
                  {avatarOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setFormData({ ...formData, avatar: emoji })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.avatar === emoji
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span style={{ fontSize: '2rem' }}>{emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-9"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                />
              </div>
              
              {error && <p className="text-destructive">{error}</p>}
              
              <Button onClick={handleSubmit} className="w-full">
                Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span style={{ fontSize: '3rem' }}>{formData.avatar}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="pl-9"
                    placeholder="e.g., American, Indian, British"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="pl-9"
                    placeholder="e.g., United States, India, United Kingdom"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="pl-9"
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>
              
              {error && <p className="text-destructive">{error}</p>}
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="w-full">
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
