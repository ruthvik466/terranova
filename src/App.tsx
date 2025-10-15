import { useState, useEffect } from 'react';
import { HumanVerification } from './components/HumanVerification';
import { UserSetup } from './components/UserSetup';
import { MainApp } from './components/MainApp';

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user has already verified and set up profile
    const verified = localStorage.getItem('terranova_verified');
    const profile = localStorage.getItem('terranova_profile');
    
    if (verified === 'true') {
      setIsVerified(true);
    }
    
    if (profile) {
      setHasProfile(true);
    }
  }, []);

  return (
    <>
      {/* Interstellar Black Hole Background */}
      <div className="space-background">
        <div className="stars" />
        <div className="black-hole-container">
          <div className="gravitational-lensing" />
          <div className="accretion-disk" />
          <div className="accretion-glow" />
          <div className="accretion-glow-2" />
          <div className="light-ring" />
          <div className="black-hole" />
        </div>
      </div>

      {/* App Content */}
      {!isVerified ? (
        <HumanVerification onVerified={() => setIsVerified(true)} />
      ) : !hasProfile ? (
        <UserSetup onComplete={() => setHasProfile(true)} />
      ) : (
        <MainApp />
      )}
    </>
  );
}
