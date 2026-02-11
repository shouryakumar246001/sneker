import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LiveCheckItem } from '../types';

const mockChecks: LiveCheckItem[] = [
  { id: '1', location: 'Tokyo', sneaker: 'Travis Scott J1s', result: 'Authentic' },
  { id: '2', location: 'New York', sneaker: 'Nike Killshot 2', result: 'Authentic' },
  { id: '3', location: 'London', sneaker: 'Jordan 4 Military Black', result: 'Fake' },
  { id: '4', location: 'Los Angeles', sneaker: 'Nike Dunk Low Panda', result: 'Authentic' },
  { id: '5', location: 'Paris', sneaker: 'Yeezy 350 Bred', result: 'Authentic' },
  { id: '6', location: 'Berlin', sneaker: 'Jordan 1 Chicago', result: 'Fake' },
  { id: '7', location: 'Toronto', sneaker: 'Nike SB Dunk High', result: 'Authentic' },
  { id: '8', location: 'Dubai', sneaker: 'Off-White Air Max 97', result: 'Authentic' },
];

export default function LiveFeed() {
  const [checks, setChecks] = useState<LiveCheckItem[]>(mockChecks);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomCheck = mockChecks[Math.floor(Math.random() * mockChecks.length)];
      setChecks(prev => [{ ...randomCheck, id: Date.now().toString() }, ...prev.slice(0, 7)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 border-y border-white/10 py-8 overflow-hidden">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Live Checks</h2>
      </div>

      <div className="relative">
        <div className="flex space-x-6 animate-scroll">
          {[...checks, ...checks].map((check, index) => (
            <motion.div
              key={`${check.id}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full whitespace-nowrap min-w-fit"
            >
              {check.result === 'Authentic' ? (
                <CheckCircle2 className="w-4 h-4 text-[#00FF41]" />
              ) : (
                <XCircle className="w-4 h-4 text-[#FF3B30]" />
              )}
              <span className="text-sm">
                <span className="text-gray-400">User in</span>{' '}
                <span className="font-semibold">{check.location}</span>{' '}
                <span className="text-gray-400">just verified</span>{' '}
                <span className="font-semibold">{check.sneaker}</span>
                {' - '}
                <span className={check.result === 'Authentic' ? 'text-[#00FF41]' : 'text-[#FF3B30]'}>
                  {check.result}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
