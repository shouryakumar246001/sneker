import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const scanningSteps = [
  'Analyzing stitching patterns...',
  'Checking UV reflectivity...',
  'Matching SKU against database...',
  'Comparing material texture...',
  'Verifying box label authenticity...',
];

export default function ScanningView() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % scanningSteps.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="w-32 h-32 border-4 border-[#00FF41]/20 rounded-full" />
              <div className="absolute inset-0 w-32 h-32 border-4 border-[#00FF41] border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-[#00FF41]" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">Authenticating...</h2>
          <p className="text-xl text-gray-400 mb-12">
            Our AI is analyzing your sneakers
          </p>

          <div className="mb-8">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#00FF41] to-[#00CC33]"
              />
            </div>
            <p className="text-sm text-gray-400">{progress}% Complete</p>
          </div>

          <div className="space-y-3">
            {scanningSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: 0,
                }}
                className={`flex items-center space-x-3 p-4 rounded-xl backdrop-blur-sm ${
                  index === currentStep
                    ? 'bg-[#00FF41]/10 border border-[#00FF41]/20'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {index === currentStep ? (
                  <Loader2 className="w-5 h-5 text-[#00FF41] animate-spin" />
                ) : index < currentStep ? (
                  <div className="w-5 h-5 bg-[#00FF41] rounded-full flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-black rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-white/20 rounded-full" />
                )}
                <span
                  className={`font-medium ${
                    index === currentStep ? 'text-[#00FF41]' : index < currentStep ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
          >
            <p className="text-sm text-gray-400">
              This usually takes 5-10 seconds. Please don't close this window.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
