import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started',
    features: [
      'Basic JSON formatting',
      'Simple regex testing',
      'Base64 encoding/decoding',
      'MD5 & SHA1 hashing',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '9',
    description: 'Best for professional developers',
    features: [
      'All Free features',
      'Advanced JSON tools',
      'Regex pattern library',
      'All hash algorithms',
      'Cloud sync',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Team',
    price: '29',
    description: 'For development teams',
    features: [
      'All Pro features',
      'Team collaboration',
      'Shared snippets',
      'Admin controls',
      'API access',
      'Custom branding',
      '24/7 support',
    ],
  },
];

export const Pricing: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Choose the plan that best fits your needs
          </motion.p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-xl p-8 ${
                plan.popular
                  ? 'bg-indigo-600 text-white shadow-xl scale-105'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full">
                    Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="ml-2 text-sm opacity-80">/month</span>
                </div>
                <p className={plan.popular ? 'text-indigo-100' : 'text-gray-600'}>
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${
                      plan.popular ? 'text-indigo-200' : 'text-indigo-600'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};