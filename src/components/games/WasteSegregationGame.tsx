import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft } from 'lucide-react';

interface WasteItem {
  id: number;
  name: string;
  type: 'organic' | 'plastic' | 'paper' | 'metal' | 'glass' | 'ewaste';
  emoji: string;
}

const wasteItems: WasteItem[] = [
  { id: 1, name: 'Apple Core', type: 'organic', emoji: '🍎' },
  { id: 2, name: 'Plastic Bottle', type: 'plastic', emoji: '🍾' },
  { id: 3, name: 'Newspaper', type: 'paper', emoji: '📰' },
  { id: 4, name: 'Banana Peel', type: 'organic', emoji: '🍌' },
  { id: 5, name: 'Soda Can', type: 'metal', emoji: '🥫' },
  { id: 6, name: 'Glass Jar', type: 'glass', emoji: '🫙' },
  { id: 7, name: 'Cardboard', type: 'paper', emoji: '📦' },
  { id: 8, name: 'Plastic Bag', type: 'plastic', emoji: '🛍️' },
  { id: 9, name: 'Old Phone', type: 'ewaste', emoji: '📱' },
  { id: 10, name: 'Battery', type: 'ewaste', emoji: '🔋' },
];

interface WasteSegregationGameProps {
  onBack: () => void;
  onCurrencyUpdate: () => void;
}

export function WasteSegregationGame({ onBack, onCurrencyUpdate }: WasteSegregationGameProps) {
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [itemsProcessed, setItemsProcessed] = useState(0);

  useEffect(() => {
    if (!gameOver) {
      pickNewItem();
    }
  }, [gameOver]);

  const pickNewItem = () => {
    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    setCurrentItem(randomItem);
  };

  const handleBinClick = (binType: string) => {
    if (!currentItem) return;

    if (currentItem.type === binType) {
      setScore(score + 10);
      setItemsProcessed(itemsProcessed + 1);
      
      if ((itemsProcessed + 1) % 5 === 0) {
        const currentCoins = parseInt(localStorage.getItem('terranova_coins') || '0');
        const currentDiamonds = parseInt(localStorage.getItem('terranova_diamonds') || '0');
        localStorage.setItem('terranova_coins', (currentCoins + 5).toString());
        localStorage.setItem('terranova_diamonds', (currentDiamonds + 1).toString());
        onCurrencyUpdate();
      }
      
      pickNewItem();
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setGameOver(true);
        const currentWastes = parseInt(localStorage.getItem('terranova_wastes_recycled') || '0');
        localStorage.setItem('terranova_wastes_recycled', (currentWastes + itemsProcessed).toString());
        
        if ((currentWastes + itemsProcessed) % 10 === 0 && itemsProcessed > 0) {
          const currentLevel = parseInt(localStorage.getItem('terranova_level') || '1');
          localStorage.setItem('terranova_level', (currentLevel + 1).toString());
        }
      } else {
        pickNewItem();
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setItemsProcessed(0);
    pickNewItem();
  };

  const bins = [
    { type: 'organic', name: 'Organic', color: 'bg-green-500', emoji: '🌱' },
    { type: 'plastic', name: 'Plastic', color: 'bg-blue-500', emoji: '♻️' },
    { type: 'paper', name: 'Paper', color: 'bg-yellow-500', emoji: '📄' },
    { type: 'metal', name: 'Metal', color: 'bg-gray-500', emoji: '⚙️' },
    { type: 'glass', name: 'Glass', color: 'bg-cyan-500', emoji: '🫙' },
    { type: 'ewaste', name: 'E-Waste', color: 'bg-red-500', emoji: '🔌' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>Waste Segregation</h2>
              <p className="text-muted-foreground">Sort waste into correct bins!</p>
            </div>
            <div className="text-right">
              <p>Score: {score}</p>
              <p>Lives: {'❤️'.repeat(lives)}</p>
            </div>
          </div>

          {!gameOver ? (
            <>
              {currentItem && (
                <div className="mb-8 text-center">
                  <div className="mb-4 p-8 bg-muted rounded-lg inline-block">
                    <div style={{ fontSize: '4rem' }}>{currentItem.emoji}</div>
                  </div>
                  <h3>{currentItem.name}</h3>
                  <p className="text-muted-foreground">Where should this go?</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bins.map((bin) => (
                  <button
                    key={bin.type}
                    onClick={() => handleBinClick(bin.type)}
                    className={`${bin.color} text-white p-6 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    <div style={{ fontSize: '2rem' }} className="mb-2">{bin.emoji}</div>
                    <p style={{ fontWeight: 'bold' }}>{bin.name}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-center" style={{ fontSize: '0.875rem' }}>
                  💡 Earn 5 coins & 1 diamond for every 5 correct sorts!
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <h2 className="mb-2">Game Over!</h2>
              <p className="mb-1">Final Score: {score}</p>
              <p className="mb-1">Items Processed: {itemsProcessed}</p>
              <p className="text-muted-foreground mb-6">
                You recycled {itemsProcessed} items! Keep it up!
              </p>
              <Button onClick={resetGame}>Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
