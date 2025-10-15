import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface HumanVerificationProps {
  onVerified: () => void;
}

export function HumanVerification({ onVerified }: HumanVerificationProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  
  const num1 = 7;
  const num2 = 5;
  const correctAnswer = num1 + num2;

  const handleVerify = () => {
    if (parseInt(answer) === correctAnswer) {
      localStorage.setItem('terranova_verified', 'true');
      onVerified();
    } else {
      setError('Incorrect answer. Please try again.');
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="mb-2" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              TerraNova
            </h1>
            <p className="text-muted-foreground" style={{ fontStyle: 'italic' }}>
              Pioneering a Cleaner Tomorrow
            </p>
          </div>
          <CardTitle>Human Verification</CardTitle>
          <CardDescription>
            Please verify you're human to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="mb-2">What is {num1} + {num2}?</p>
              <input
                type="number"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError('');
                }}
                className="w-24 px-3 py-2 border border-border rounded-md text-center"
                placeholder="Answer"
              />
            </div>
            {error && (
              <p className="text-destructive text-center">{error}</p>
            )}
            <Button onClick={handleVerify} className="w-full">
              Verify & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
