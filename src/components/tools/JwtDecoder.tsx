import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [decodedHeader, setDecodedHeader] = useState('');
  const [decodedPayload, setDecodedPayload] = useState('');
  const [error, setError] = useState('');

  const decodeToken = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      setDecodedHeader(JSON.stringify(header, null, 2));
      setDecodedPayload(JSON.stringify(payload, null, 2));
      setError('');
    } catch (err) {
      setError('Invalid JWT token');
      setDecodedHeader('');
      setDecodedPayload('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">JWT Decoder</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full h-32 input-field"
            placeholder="Paste your JWT token here..."
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={decodeToken}
          className="tool-button"
        >
          Decode Token
        </motion.button>
        
        {error ? (
          <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : (
          decodedHeader && decodedPayload && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-300">Header</h3>
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  className="rounded-lg"
                >
                  {decodedHeader}
                </SyntaxHighlighter>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-300">Payload</h3>
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  className="rounded-lg"
                >
                  {decodedPayload}
                </SyntaxHighlighter>
              </div>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};