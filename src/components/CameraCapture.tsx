import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Camera, X, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface CameraCaptureProps {
  activityType: 'recycling' | 'planting';
  onSuccess: () => void;
  onCancel: () => void;
  rewards: {
    coins: number;
    diamonds: number;
  };
}

export function CameraCapture({ activityType, onSuccess, onCancel, rewards }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<'success' | 'failure' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use back camera on mobile
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Camera access error:', error);
      setErrorMessage('Unable to access camera. Please grant camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Simulate AI image analysis
    setTimeout(() => {
      // Get canvas and analyze image data
      if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const data = imageData.data;
          
          // Simple analysis: check for green colors (plants/recycling bins) and variety
          let greenPixels = 0;
          let totalBrightness = 0;
          let colorVariety = 0;
          const sampleSize = Math.floor(data.length / 400); // Sample every 100th pixel
          
          for (let i = 0; i < data.length; i += sampleSize) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Check for green dominance
            if (g > r && g > b && g > 100) {
              greenPixels++;
            }
            
            // Calculate brightness
            totalBrightness += (r + g + b) / 3;
            
            // Color variety (standard deviation approximation)
            colorVariety += Math.abs(r - g) + Math.abs(g - b) + Math.abs(b - r);
          }
          
          const avgBrightness = totalBrightness / (data.length / sampleSize);
          const greenRatio = greenPixels / (data.length / sampleSize);
          const avgColorVariety = colorVariety / (data.length / sampleSize);
          
          // Verification logic based on activity type
          let isValid = false;
          
          if (activityType === 'planting') {
            // For tree planting: expect green colors, outdoor brightness, color variety
            isValid = greenRatio > 0.15 && avgBrightness > 60 && avgColorVariety > 50;
          } else {
            // For recycling: expect more color variety, objects, good lighting
            isValid = avgColorVariety > 40 && avgBrightness > 50 && avgBrightness < 220;
          }
          
          // Add some randomness to make it more realistic (80% success rate if basic criteria met)
          if (isValid) {
            isValid = Math.random() > 0.2;
          } else {
            // Small chance of success even if criteria not perfectly met (10%)
            isValid = Math.random() > 0.9;
          }
          
          setIsAnalyzing(false);
          setAnalysisResult(isValid ? 'success' : 'failure');
          
          if (isValid) {
            // Award coins and update stats
            const currentCoins = parseInt(localStorage.getItem('terranova_coins') || '0');
            const currentDiamonds = parseInt(localStorage.getItem('terranova_diamonds') || '0');
            
            localStorage.setItem('terranova_coins', (currentCoins + rewards.coins).toString());
            localStorage.setItem('terranova_diamonds', (currentDiamonds + rewards.diamonds).toString());
            
            if (activityType === 'planting') {
              const currentTrees = parseInt(localStorage.getItem('terranova_trees_planted') || '0');
              localStorage.setItem('terranova_trees_planted', (currentTrees + 1).toString());
            } else {
              const currentWastes = parseInt(localStorage.getItem('terranova_wastes_recycled') || '0');
              localStorage.setItem('terranova_wastes_recycled', (currentWastes + 1).toString());
              
              // Update level if needed
              if ((currentWastes + 1) % 10 === 0) {
                const currentLevel = parseInt(localStorage.getItem('terranova_level') || '1');
                localStorage.setItem('terranova_level', (currentLevel + 1).toString());
              }
            }
            
            setTimeout(() => {
              onSuccess();
            }, 2000);
          }
        }
      }
    }, 2000);
  };

  const retake = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    startCamera();
  };

  const getActivityTitle = () => {
    return activityType === 'planting' ? 'Plant a Tree' : 'Verify Recycling';
  };

  const getActivityDescription = () => {
    return activityType === 'planting' 
      ? 'Take a photo of you planting a tree or the planted tree'
      : 'Take a photo of you recycling waste properly';
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{getActivityTitle()}</CardTitle>
              <CardDescription>{getActivityDescription()}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>Camera Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {/* Camera/Preview */}
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {!capturedImage ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Overlay hints */}
              {!capturedImage && stream && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 right-4 text-white bg-black/50 p-3 rounded-lg">
                    <p style={{ fontSize: '0.875rem' }}>
                      {activityType === 'planting' 
                        ? '🌱 Position the tree or sapling in the frame'
                        : '♻️ Show waste being sorted into the correct bin'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Actions */}
            {!capturedImage && stream && !errorMessage && (
              <Button onClick={capturePhoto} className="w-full" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Capture Photo
              </Button>
            )}

            {capturedImage && !analysisResult && !isAnalyzing && (
              <div className="flex gap-3">
                <Button onClick={retake} variant="outline" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={analyzeImage} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify & Submit
                </Button>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p>Analyzing your photo...</p>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  Our AI is verifying your activity
                </p>
              </div>
            )}

            {analysisResult === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800">Verified Successfully!</AlertTitle>
                <AlertDescription className="text-green-700">
                  <p className="mb-2">
                    {activityType === 'planting' 
                      ? 'Great job planting that tree! 🌳'
                      : 'Excellent recycling! ♻️'}
                  </p>
                  <div className="flex items-center gap-4">
                    <span>+{rewards.coins} 🪙 Coins</span>
                    <span>+{rewards.diamonds} 💎 Diamonds</span>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {analysisResult === 'failure' && (
              <Alert className="bg-red-50 border-red-200">
                <XCircle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-800">Oops! Verification Failed</AlertTitle>
                <AlertDescription className="text-red-700">
                  <p className="mb-3">
                    {activityType === 'planting' 
                      ? "We couldn't detect tree planting activity in your photo. Make sure to show the tree, sapling, or planting process clearly."
                      : "We couldn't verify recycling activity in your photo. Make sure to show waste being sorted into the correct bins."}
                  </p>
                  <p style={{ fontSize: '0.875rem' }} className="mb-3">
                    <strong>Tips:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1" style={{ fontSize: '0.875rem' }}>
                    <li>Ensure good lighting</li>
                    <li>Show the {activityType === 'planting' ? 'tree/plant' : 'waste and bins'} clearly</li>
                    <li>Take the photo in a relevant environment</li>
                    <li>Avoid blurry images</li>
                  </ul>
                  <Button onClick={retake} className="w-full mt-4" variant="outline">
                    Try Again
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Instructions */}
            {!capturedImage && stream && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }} className="mb-2">
                  📸 Photo Guidelines:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  {activityType === 'planting' ? (
                    <>
                      <li>Show the tree, sapling, or planting area</li>
                      <li>Include greenery in the frame</li>
                      <li>Take photo outdoors in natural setting</li>
                      <li>Show yourself planting if possible</li>
                    </>
                  ) : (
                    <>
                      <li>Show waste being sorted into bins</li>
                      <li>Include the recycling bin or container</li>
                      <li>Make sure waste type is visible</li>
                      <li>Show yourself in the recycling process</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
