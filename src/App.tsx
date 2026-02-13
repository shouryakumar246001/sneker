import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ViewType, CheckResult, UploadedImage } from './types';
import Landing from './components/Landing';
import CheckInterface from './components/CheckInterface';
import ScanningView from './components/ScanningView';
import ResultView from './components/ResultView';

// ⚠️ SECURITY WARNING: In production, move this API call to a backend server.
// For testing locally, replace this string with your actual API key.
const API_KEY = "YOUR_GOOGLE_API_KEY_HERE"; 
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);

  const handleStartCheck = () => {
    setCurrentView('check');
  };

  // Helper: Convert File to Base64 for Gemini
  const fileToGenerativePart = async (file: File) => {
    return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve({
          inlineData: {
            data: base64data.split(',')[1],
            mimeType: file.type,
          },
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagesUploaded = async (images: UploadedImage[]) => {
    setUploadedImages(images);
    setCurrentView('scanning');

    try {
      // 1. Prepare images
      const imageParts = await Promise.all(
        images.map(img => fileToGenerativePart(img.file))
      );

      // 2. Initialize Model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // 3. The "Expert Authenticator" Prompt
      const prompt = `
        You are a professional sneaker authenticator with 20 years of experience. 
        Your job is to Legit Check (LC) these sneakers based on the provided images.
        
        Analyze the following specific details if visible:
        1. **Size Tag:** Check if the font is too bold or if the UPC/dates align with authentic production runs.
        2. **Stitching:** Look for double-stitching errors, loose threads, or inconsistent spacing (especially on the swoosh or heel).
        3. **Shape:** Analyze the heel curvature and the toe box shape. Fakes often have bulky toe boxes.
        4. **Materials:** Assess the texture of the leather/suede.
        
        CRITICAL INSTRUCTION:
        - If the images are blurry or not of a sneaker, return "isAuthentic": false and "confidence": 0.
        - Be strict. If you see minor flaws, lower the confidence score.
        
        Output ONLY valid JSON in this exact format (do not use Markdown code blocks):
        {
          "isAuthentic": boolean,
          "confidence": number,  // 0 to 100
          "sneakerModel": string, // Best guess of model name
          "issues": [string, string] // Array of specific flaws found (e.g. "Heel stitching is uneven", "Size tag font weight is incorrect"). If authentic, leave empty.
        }
      `;

      // 4. Send to AI
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();

      console.log("AI Raw Response:", text); // Debugging line

      // 5. Clean & Parse JSON
      // sometimes AI wraps json in ```json ... ```, so we remove that.
      const cleanJson = text.replace(/```json|```/g, '').trim();
      const aiData = JSON.parse(cleanJson);

      // 6. Set State
      const finalResult: CheckResult = {
        isAuthentic: aiData.isAuthentic,
        confidence: aiData.confidence,
        issues: aiData.issues || [],
        sneakerModel: aiData.sneakerModel || "Unknown Model",
        checkId: `LC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        timestamp: new Date()
      };

      setCheckResult(finalResult);
      setCurrentView('result');

    } catch (error) {
      console.error("Authentication Failed:", error);
      alert("Something went wrong with the analysis. Check the console for details.");
      setCurrentView('check');
    }
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
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
