import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Star, X } from 'lucide-react';

interface ReviewPromptProps {
  onClose: () => void;
}

export function ReviewPrompt({ onClose }: ReviewPromptProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Save review data
    localStorage.setItem('terranova_last_review', Date.now().toString());
    localStorage.setItem('terranova_user_rating', rating.toString());
    if (review) {
      localStorage.setItem('terranova_user_review', review);
    }
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleLater = () => {
    localStorage.setItem('terranova_last_review', Date.now().toString());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Enjoying TerraNova?</CardTitle>
              <CardDescription>We'd love to hear your feedback!</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLater}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <div className="space-y-6">
              {/* Star Rating */}
              <div>
                <Label className="mb-3 block">How would you rate your experience?</Label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              {rating > 0 && (
                <div>
                  <Label htmlFor="review" className="mb-2 block">
                    Tell us more (optional)
                  </Label>
                  <Textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="What do you like most about TerraNova? How can we improve?"
                    rows={4}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleLater} className="flex-1">
                  Maybe Later
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="flex-1"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4" style={{ fontSize: '4rem' }}>🙏</div>
              <h3 className="mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                Your feedback helps us make TerraNova better for everyone.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Label({ children, htmlFor, className }: any) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}
