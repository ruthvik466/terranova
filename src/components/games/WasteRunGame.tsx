import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft } from 'lucide-react';

interface WasteRunGameProps {
  onBack: () => void;
  onCurrencyUpdate: () => void;
}

const wasteTypes = [
  { type: 'organic', emoji: '🍎', bin: 'organic' },
  { type: 'plastic', emoji: '🍾', bin: 'plastic' },
  { type: 'paper', emoji: '📰', bin: 'paper' },
  { type: 'metal', emoji: '🥫', bin: 'metal' },
];

export function WasteRunGame({ onBack, onCurrencyUpdate }: WasteRunGameProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentWaste, setCurrentWaste] = useState(wasteTypes[0]);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  
  const gameLoopRef = useRef<number>();

  const startGame = () => {
    const coins = parseInt(localStorage.getItem('terranova_coins') || '0');
    if (coins < 150) {
      alert('You need 150 coins to play this game!');
      return;
    }
    
    // Deduct coins first time
    const hasUnlocked = localStorage.getItem('terranova_wasterun_unlocked');
    if (!hasUnlocked) {
      localStorage.setItem('terranova_coins', (coins - 150).toString());
      localStorage.setItem('terranova_wasterun_unlocked', 'true');
      onCurrencyUpdate();
    }
    
    setGameState('playing');
    setScore(0);
    setDistance(0);
    setSpeed(1);
    pickNewWaste();
  };

  const pickNewWaste = () => {
    const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    setCurrentWaste(randomWaste);
  };

  const handleBinClick = (binType: string) => {
    if (gameState !== 'playing' || isPaused) return;
    
    if (currentWaste.bin === binType) {
      setScore(score + 10);
      setDistance(distance + 10);
      setSpeed(Math.min(speed + 0.1, 3));
      pickNewWaste();
      
      if ((score + 10) % 50 === 0) {
        const currentCoins = parseInt(localStorage.getItem('terranova_coins') || '0');
        const currentDiamonds = parseInt(localStorage.getItem('terranova_diamonds') || '0');
        localStorage.setItem('terranova_coins', (currentCoins + 10).toString());
        localStorage.setItem('terranova_diamonds', (currentDiamonds + 2).toString());
        onCurrencyUpdate();
      }
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setGameState('gameover');
    const currentWastes = parseInt(localStorage.getItem('terranova_wastes_recycled') || '0');
    localStorage.setItem('terranova_wastes_recycled', (currentWastes + Math.floor(score / 10)).toString());
  };

  useEffect(() => {
    if (gameState === 'playing' && !isPaused) {
      gameLoopRef.current = window.setInterval(() => {
        setDistance(d => d + 0.1);
      }, 100);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, isPaused]);

  const bins = [
    { type: 'organic', name: 'Organic', color: 'bg-green-500', emoji: '🌱' },
    { type: 'plastic', name: 'Plastic', color: 'bg-blue-500', emoji: '♻️' },
    { type: 'paper', name: 'Paper', color: 'bg-yellow-500', emoji: '📄' },
    { type: 'metal', name: 'Metal', color: 'bg-gray-500', emoji: '⚙️' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h2>Waste Run</h2>
            <p className="text-muted-foreground">Run and segregate waste on the go!</p>
          </div>

          {gameState === 'menu' && (
            <div className="text-center py-12">
              <div className="mb-6">
                <div style={{ fontSize: '4rem' }} className="mb-4">🏃‍♂️</div>
                <h3>Ready to Run?</h3>
                <p className="text-muted-foreground">
                  Sort waste into bins as you run. Wrong choice ends the game!
                </p>
              </div>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p>🎮 Earn 10 coins & 2 diamonds for every 50 points!</p>
              </div>
              <Button onClick={startGame} size="lg">
                Start Running
              </Button>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
                <div>
                  <p>Score: {score}</p>
                  <p>Distance: {Math.floor(distance)}m</p>
                </div>
                <div>
                  <p>Speed: {speed.toFixed(1)}x</p>
                </div>
              </div>

              <div className="mb-6 relative h-64 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {isPaused ? (
                    <div className="text-center">
                      <p style={{ fontSize: '3rem' }}>⏸️</p>
                      <p>Sorting...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div style={{ fontSize: '4rem' }} className="mb-2">🏃‍♂️</div>
                      <div className="mt-4 p-4 bg-white/90 rounded-lg">
                        <p className="mb-2">Waste chasing you:</p>
                        <div style={{ fontSize: '3rem' }}>{currentWaste.emoji}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {bins.map((bin) => (
                  <button
                    key={bin.type}
                    onClick={() => {
                      setIsPaused(true);
                      setTimeout(() => {
                        handleBinClick(bin.type);
                        setIsPaused(false);
                      }, 500);
                    }}
                    className={`${bin.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    <div style={{ fontSize: '2rem' }} className="mb-2">{bin.emoji}</div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{bin.name}</p>
                  </button>
                ))}
              </div>

              <p className="text-center text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                Click the correct bin to sort the waste!
              </p>
            </>
          )}

          {gameState === 'gameover' && (
            <div className="text-center py-12">
              <div style={{ fontSize: '4rem' }} className="mb-4">😅</div>
              <h3 className="mb-2">Game Over!</h3>
              <p className="mb-2">Final Score: {score}</p>
              <p className="mb-2">Distance: {Math.floor(distance)}m</p>
              <p className="text-muted-foreground mb-6">
                You sorted {Math.floor(score / 10)} wastes correctly!
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={startGame}>Play Again</Button>
                <Button variant="outline" onClick={onBack}>Exit</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
