import { useState } from 'react';
import { ViewType, CheckResult, UploadedImage } from './types';
import Landing from './components/Landing';
import CheckInterface from './components/CheckInterface';
import ScanningView from './components/ScanningView';
import ResultView from './components/ResultView';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);

  const handleStartCheck = () => {
    setCurrentView('check');
  };

  const handleImagesUploaded = (images: UploadedImage[]) => {
    setUploadedImages(images);
    setCurrentView('scanning');

    setTimeout(() => {
      const isAuth = Math.random() > 0.3;
      const result: CheckResult = {
        isAuthentic: isAuth,
        confidence: isAuth ? Math.floor(95 + Math.random() * 4) : Math.floor(15 + Math.random() * 25),
        issues: isAuth ? [] : [
          'Stitching pattern inconsistent with authentic pairs',
          'Box label font weight incorrect',
          'Heel tab shape deviation detected'
        ],
        checkId: `LC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date(),
        sneakerModel: 'Nike Killshot 2'
      };
      setCheckResult(result);
      setCurrentView('result');
    }, 5000);
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setUploadedImages([]);
    setCheckResult(null);
  };

  const handleCheckAnother = () => {
    setCurrentView('check');
    setUploadedImages([]);
    setCheckResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {currentView === 'landing' && <Landing onStartCheck={handleStartCheck} />}
      {currentView === 'check' && <CheckInterface onSubmit={handleImagesUploaded} onBack={handleBackToHome} />}
      {currentView === 'scanning' && <ScanningView />}
      {currentView === 'result' && checkResult && (
        <ResultView result={checkResult} onCheckAnother={handleCheckAnother} onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
