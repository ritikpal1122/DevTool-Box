import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex) || [];
      setMatches(found);
      setError('');
    } catch (err) {
      setError('Invalid regular expression');
      setMatches([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">Regex Tester</h2>
      
      <div className=" md:grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Pattern</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="flex-1 input-field"
                placeholder="Enter regex pattern..."
              />
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-20 input-field"
                placeholder="flags"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full h-48 input-field"
              placeholder="Enter text to test..."
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={testRegex}
            className="tool-button"
          >
            Test Regex
          </motion.button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300">Results</h3>
          {error ? (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          ) : matches.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Found {matches.length} matches:</p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {matches.map((match, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-2 rounded border border-gray-200"
                  >
                    {match}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 bg-gray-50 p-4 rounded-lg">
              No matches found
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};