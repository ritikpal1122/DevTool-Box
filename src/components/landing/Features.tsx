import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Hash,
  KeyRound,
  FileJson,
  Binary,
  BookMarked,
  Zap,
  Shield,
  Cloud,
} from 'lucide-react';

const features = [
  {
    icon: FileJson,
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON with syntax highlighting',
  },
  {
    icon: Code2,
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching',
  },
  {
    icon: Binary,
    title: 'Base64 Tool',
    description: 'Encode and decode Base64 strings with ease',
  },
  {
    icon: Hash,
    title: 'Hash Generator',
    description: 'Generate secure hashes using multiple algorithms',
  },
  {
    icon: KeyRound,
    title: 'JWT Decoder',
    description: 'Decode and inspect JWT tokens securely',
  },
  {
    icon: BookMarked,
    title: 'Code Snippets',
    description: 'Save and organize your frequently used code snippets',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'See changes instantly as you type with live preview',
  },
  {
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your data is encrypted and stored securely',
  },
  {
    icon: Cloud,
    title: 'Cloud Sync',
    description: 'Access your tools and snippets from anywhere',
  },
];

export const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-20 border-b-[0.5px] border-dark-light ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-100 mb-4"
          >
            Powerful Developer Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Everything you need to streamline your development workflow,
            all in one beautiful interface.
          </motion.p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-light  rounded-xl p-6 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              >
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold hover:text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};