import { useState, useEffect } from 'react';
import { Home, Gamepad2, MapPin, Calendar, BookOpen, Users, Camera, Trophy, User, BarChart3 } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { WasteSegregationGame } from './games/WasteSegregationGame';
import { WasteRunGame } from './games/WasteRunGame';
import { GPSTracker } from './GPSTracker';
import { WasteSchedule } from './WasteSchedule';
import { Awareness } from './Awareness';
import { Community } from './Community';
import { CameraVerification } from './CameraVerification';
import { Profile } from './Profile';
import { Analytics } from './Analytics';
import { ReviewPrompt } from './ReviewPrompt';

export function MainApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [coins, setCoins] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [sessionStartTime] = useState(Date.now());

  useEffect(() => {
    const profileData = localStorage.getItem('terranova_profile');
    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
    
    setCoins(parseInt(localStorage.getItem('terranova_coins') || '100'));
    setDiamonds(parseInt(localStorage.getItem('terranova_diamonds') || '10'));

    // Check for review prompt after 10 minutes
    const reviewTimer = setTimeout(() => {
      const lastReview = localStorage.getItem('terranova_last_review');
      if (!lastReview || Date.now() - parseInt(lastReview) > 7 * 24 * 60 * 60 * 1000) {
        setShowReview(true);
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearTimeout(reviewTimer);
  }, []);

  const updateCurrency = () => {
    setCoins(parseInt(localStorage.getItem('terranova_coins') || '0'));
    setDiamonds(parseInt(localStorage.getItem('terranova_diamonds') || '0'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'segregation':
        return <WasteSegregationGame onBack={() => setCurrentPage('dashboard')} onCurrencyUpdate={updateCurrency} />;
      case 'wasterun':
        return <WasteRunGame onBack={() => setCurrentPage('dashboard')} onCurrencyUpdate={updateCurrency} />;
      case 'gps':
        return <GPSTracker onBack={() => setCurrentPage('dashboard')} />;
      case 'schedule':
        return <WasteSchedule onBack={() => setCurrentPage('dashboard')} />;
      case 'awareness':
        return <Awareness onBack={() => setCurrentPage('dashboard')} />;
      case 'community':
        return <Community onBack={() => setCurrentPage('dashboard')} />;
      case 'camera':
        return <CameraVerification onBack={() => setCurrentPage('dashboard')} onCurrencyUpdate={updateCurrency} />;
      case 'profile':
        return <Profile onBack={() => setCurrentPage('dashboard')} />;
      case 'analytics':
        return <Analytics onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>TerraNova</h1>
            <span className="text-muted-foreground" style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>
              Pioneering a Cleaner Tomorrow
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <span>🪙</span>
              <span>{coins}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
              <span>💎</span>
              <span>{diamonds}</span>
            </div>
            <button
              onClick={() => setCurrentPage('profile')}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <span style={{ fontSize: '1.5rem' }}>{profile?.avatar || '🌱'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {renderPage()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <NavButton
              icon={<Home className="w-5 h-5" />}
              label="Home"
              active={currentPage === 'dashboard'}
              onClick={() => setCurrentPage('dashboard')}
            />
            <NavButton
              icon={<Gamepad2 className="w-5 h-5" />}
              label="Games"
              active={currentPage === 'segregation' || currentPage === 'wasterun'}
              onClick={() => setCurrentPage('segregation')}
            />
            <NavButton
              icon={<BarChart3 className="w-5 h-5" />}
              label="Stats"
              active={currentPage === 'analytics'}
              onClick={() => setCurrentPage('analytics')}
            />
            <NavButton
              icon={<BookOpen className="w-5 h-5" />}
              label="Learn"
              active={currentPage === 'awareness'}
              onClick={() => setCurrentPage('awareness')}
            />
            <NavButton
              icon={<Users className="w-5 h-5" />}
              label="Community"
              active={currentPage === 'community'}
              onClick={() => setCurrentPage('community')}
            />
          </div>
        </div>
      </div>

      {showReview && <ReviewPrompt onClose={() => setShowReview(false)} />}
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
        active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      <span style={{ fontSize: '0.75rem' }}>{label}</span>
    </button>
  );
}
