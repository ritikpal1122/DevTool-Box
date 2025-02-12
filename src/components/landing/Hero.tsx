import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import mainNav from "../../main_nan.avif"

interface HeroProps {
  onSelectTool: (tool: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTool }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const handleGetStarted = () => {
    onSelectTool('json'); // Start with JSON formatter tool
  };

  return (
    <div className="relative min-h-screen  pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Developer Tools,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Reimagined
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            All the essential development tools you need, in one beautiful interface.
            Built by developers, for developers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="inline-flex items-center px-6 py-3 bg-primary justify-center text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Code2 className="w-5 h-5 mr-2" />
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-dark-lighter text-white rounded-lg hover:bg-dark transition-colors"
            >
              <Zap className="w-5 h-5 mr-2" />
              <span>Sign In</span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-transparent to-transparent" />
            <img
              src={mainNav}
              alt="Developer workspace"
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Background decorations */}
      {/* <div className=" hidden md:flex relative top-1/4 left-0 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className=" hidden md:flex absolute top-1/3 right-0 w-72 h-72 bg-dark-lighter rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className=" hidden md:flex absolute bottom-0 left-1/2 w-72 h-72 bg-primary-light rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" /> */}
    </div>
  );
};