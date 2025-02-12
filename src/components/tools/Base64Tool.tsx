import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Copy, Check } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (error) {
      setOutput('Invalid input for ' + mode);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 input-field"
            placeholder={`Enter text to ${mode}...`}
          />
        </div>
        
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConvert}
            className="tool-button"
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleMode}
            className="tool-button bg-gray-600 hover:bg-gray-700"
          >
            <ArrowDownUp className="w-4 h-4" />
          </motion.button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-300">Output</label>
            {output && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="text-gray-500 hover:text-gray-300"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            )}
          </div>
          <div className="w-full h-32 bg-dark-light rounded-lg p-4 overflow-auto">
            <pre className="text-gray-200 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};