import { motion } from 'framer-motion';
import { Shield, Zap, Users, ChevronRight } from 'lucide-react';
import LiveFeed from './LiveFeed';
import Pricing from './Pricing';

interface LandingProps {
  onStartCheck: () => void;
}

export default function Landing({ onStartCheck }: LandingProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 via-transparent to-[#FF3B30]/5 pointer-events-none" />

      <div className="relative z-10">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Shield className="w-8 h-8 text-[#00FF41]" />
            <span className="text-2xl font-bold tracking-tight">LegitCheck AI</span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onStartCheck}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-all backdrop-blur-sm"
          >
            Start Check
          </motion.button>
        </nav>

        <div className="container mx-auto px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#00FF41]/10 border border-[#00FF41]/20 rounded-full mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-[#00FF41]" />
              <span className="text-sm font-medium text-[#00FF41]">99.8% Accuracy on Nike & Adidas</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Don't Get
              <span className="block bg-gradient-to-r from-[#00FF41] to-[#00CC33] bg-clip-text text-transparent">
                Scammed
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Verify your grails in seconds with AI-powered authentication.
              Trusted by sneakerheads and resellers worldwide.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartCheck}
              className="group px-8 py-4 bg-gradient-to-r from-[#00FF41] to-[#00CC33] text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#00FF41]/50 transition-all flex items-center space-x-2 mx-auto"
            >
              <span>Verify Your Sneakers</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-5xl mx-auto"
          >
            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <Shield className="w-12 h-12 text-[#00FF41] mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-gray-400">Advanced machine learning trained on millions of authentic pairs</p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <Zap className="w-12 h-12 text-[#00FF41] mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-gray-400">Get your verification report in under 10 seconds</p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <Users className="w-12 h-12 text-[#00FF41] mb-4" />
              <h3 className="text-xl font-bold mb-2">250K+ Checks</h3>
              <p className="text-gray-400">Trusted by collectors and resellers globally</p>
            </div>
          </motion.div>
        </div>

        <LiveFeed />

        <Pricing />

        <footer className="container mx-auto px-4 py-12 text-center text-gray-500 border-t border-white/5">
          <p>&copy; 2024 LegitCheck AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
