import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Single Check',
    price: '$2',
    description: 'Perfect for one-time verification',
    features: ['1 Authentication Check', 'Instant Results', 'Certificate Download', 'Email Support'],
  },
  {
    name: 'Bundle',
    price: '$8',
    description: 'Best value for multiple pairs',
    features: ['5 Authentication Checks', 'Priority Processing', 'Certificate Download', 'Priority Support'],
    popular: true,
  },
  {
    name: 'Reseller Pro',
    price: '$50',
    perMonth: true,
    description: 'Unlimited checks for pros',
    features: ['Unlimited Checks', 'API Access', 'Batch Processing', '24/7 Premium Support', 'White-Label Reports'],
  },
];

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-xl text-gray-400">Choose the plan that works for you</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-8 rounded-2xl border transition-all ${
              plan.popular
                ? 'bg-gradient-to-b from-[#00FF41]/10 to-transparent border-[#00FF41]/50 shadow-2xl shadow-[#00FF41]/20 scale-105'
                : 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center space-x-1 px-4 py-1 bg-[#00FF41] text-black text-sm font-bold rounded-full">
                  <Sparkles className="w-4 h-4" />
                  <span>POPULAR</span>
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-400 mb-6">{plan.description}</p>

            <div className="mb-8">
              <span className="text-5xl font-bold">{plan.price}</span>
              {plan.perMonth && <span className="text-gray-400 ml-2">/month</span>}
            </div>

            <button
              className={`w-full py-3 px-6 rounded-xl font-bold transition-all mb-8 ${
                plan.popular
                  ? 'bg-[#00FF41] text-black hover:bg-[#00CC33]'
                  : 'bg-white/10 hover:bg-white/20 border border-white/10'
              }`}
            >
              Get Started
            </button>

            <ul className="space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start space-x-3">
                  <Check className={`w-5 h-5 mt-0.5 ${plan.popular ? 'text-[#00FF41]' : 'text-gray-400'}`} />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
