import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Camera } from 'lucide-react';
import { CameraCapture } from './CameraCapture';

interface CameraVerificationProps {
  onBack: () => void;
  onCurrencyUpdate: () => void;
}

export function CameraVerification({ onBack, onCurrencyUpdate }: CameraVerificationProps) {
  const [showCamera, setShowCamera] = useState(false);



  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="mb-6">
        <h2>Verify Your Recycling</h2>
        <p className="text-muted-foreground">Upload photos or videos of your recycling activities</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Capture Recycling Activity</CardTitle>
          <CardDescription>
            Use your camera to verify your recycling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onClick={() => setShowCamera(true)}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="mb-2">Take Photo with Camera</h3>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
              Click to open camera and capture your recycling activity
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span>1</span>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Take clear photos</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Make sure the waste and bins are clearly visible
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span>2</span>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Show the process</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Capture yourself actively sorting or depositing waste
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span>3</span>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>Good lighting</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Take photos in well-lit conditions for better verification
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          activityType="recycling"
          rewards={{ coins: 20, diamonds: 5 }}
          onSuccess={() => {
            setShowCamera(false);
            onCurrencyUpdate();
          }}
          onCancel={() => {
            setShowCamera(false);
          }}
        />
      )}
    </div>
  );
}
