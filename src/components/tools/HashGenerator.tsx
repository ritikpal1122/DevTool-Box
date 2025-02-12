import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import CryptoJS from 'crypto-js';

type HashType = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512';

export const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState<HashType>('SHA256');
  const [copied, setCopied] = useState(false);

  const hashTypes: HashType[] = ['MD5', 'SHA1', 'SHA256', 'SHA512'];

  const generateHash = () => {
    switch (hashType) {
      case 'MD5':
        return CryptoJS.MD5(input).toString();
      case 'SHA1':
        return CryptoJS.SHA1(input).toString();
      case 'SHA256':
        return CryptoJS.SHA256(input).toString();
      case 'SHA512':
        return CryptoJS.SHA512(input).toString();
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateHash());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Hash Generator</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 input-field"
            placeholder="Enter text to hash..."
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {hashTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setHashType(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                hashType === type
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-300">Hash Output</label>
            {input && (
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
          <div className="w-full bg-dark-light text-gray-300 rounded-lg p-4 font-mono text-sm break-all">
            {input ? generateHash() : 'Hash will appear here...'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};