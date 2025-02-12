import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  Settings,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">DevToolbox</span>
            </div>
            <p className="text-gray-400">
              Essential developer tools in one beautiful interface.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  JSON Formatter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Regex Tester
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Base64 Tool
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Hash Generator
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with{' '}
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            by developers for developers
          </p>
        </div>
      </div>
    </footer>
  );
};