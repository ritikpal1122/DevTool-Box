import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings, LogIn, LogOut, User, Github } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import { supabase } from '../../lib/supabase';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-dark/80 backdrop-blur-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Settings className="w-8 h-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-white">DevToolbox</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#tools" className="text-gray-300 hover:text-white">Tools</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {user.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            ) : (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target='_blank'
                href='https://www.github.com/ritikpal1122'
                className="flex items-center space-x-2 px-4 py-2  text-white "
              >
                <Github className="w-4 h-4" />
                <span></span>
              </motion.a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white">Features</a>
                <a href="#tools" className="text-gray-300 hover:text-white">Tools</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a>
                {user ? (
                  <>
                    <span className="text-gray-300 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {user.email}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};