import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Hash,
  KeyRound,
  FileJson,
  Binary,
  BookMarked,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: FileJson,
    title: 'JSON Formatter',
    description: 'Format and validate JSON with syntax highlighting',
  },
  {
    icon: Code2,
    title: 'Regex Tester',
    description: 'Test and debug regular expressions in real-time',
  },
  {
    icon: Binary,
    title: 'Base64 Tool',
    description: 'Encode and decode Base64 strings instantly',
  },
  {
    icon: Hash,
    title: 'Hash Generator',
    description: 'Generate secure hashes using multiple algorithms',
  },
  {
    icon: KeyRound,
    title: 'JWT Decoder',
    description: 'Decode and inspect JWT tokens',
  },
  {
    icon: BookMarked,
    title: 'Code Snippets',
    description: 'Save and organize your code snippets',
  },
];

interface LandingPageProps {
  onSelectTool: (tool: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectTool }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold text-gray-900">
            Developer's Swiss Army Knife
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the essential development tools you need, in one beautiful interface.
            Boost your productivity with our carefully crafted utilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelectTool(feature.title.toLowerCase().split(' ')[0])}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <Icon className="w-8 h-8 text-indigo-500" />
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <p className="text-gray-600">
            Built with ❤️ for developers by developers
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};