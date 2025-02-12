import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export const SqlFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [copied, setCopied] = useState(false);

  const formatSql = () => {
    try {
      // Basic SQL formatting
      let result = input
        .replace(/\s+/g, ' ')
        .replace(/\s*([,()])\s*/g, '$1 ')
        .replace(/\s*([=<>])\s*/g, ' $1 ')
        .replace(/\bSELECT\b/gi, '\nSELECT')
        .replace(/\bFROM\b/gi, '\nFROM')
        .replace(/\bWHERE\b/gi, '\nWHERE')
        .replace(/\bAND\b/gi, '\n  AND')
        .replace(/\bOR\b/gi, '\n  OR')
        .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
        .replace(/\bHAVING\b/gi, '\nHAVING')
        .replace(/\bORDER BY\b/gi, '\nORDER BY')
        .replace(/\bLIMIT\b/gi, '\nLIMIT')
        .replace(/\bJOIN\b/gi, '\nJOIN')
        .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
        .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
        .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
        .replace(/\bOUTER JOIN\b/gi, '\nOUTER JOIN')
        .replace(/\bUNION\b/gi, '\nUNION\n')
        .replace(/\bINSERT INTO\b/gi, '\nINSERT INTO')
        .replace(/\bVALUES\b/gi, '\nVALUES')
        .replace(/\bUPDATE\b/gi, '\nUPDATE')
        .replace(/\bSET\b/gi, '\nSET')
        .replace(/\bDELETE FROM\b/gi, '\nDELETE FROM')
        .trim();

      setFormatted(result);
    } catch (error) {
      setFormatted('Error formatting SQL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">SQL Formatter</h2>
    <div className='flex justify-end'>
    <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={formatSql}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Format
              </motion.button>
    </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm rounded-lg border bg-dark-light border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your SQL query here..."
          />
        </div>
        
        <div className="space-y-2 pb-10 md:pb-0">
          
          <div className="flex justify-between items-center mt-5 md:mt-0 ">
            <label className="block text-sm font-medium text-gray-300">Formatted Output</label>
            <div className="flex gap-2">
            
              {formatted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-gray-300"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              )}
            </div>
          </div>
          
          {formatted ? (
            <SyntaxHighlighter
              language="sql"
              style={vscDarkPlus}
              className="h-full rounded-lg"
            >
              {formatted}
            </SyntaxHighlighter>
          ) : (
            <div className="h-full bg-dark-light border rounded-lg p-4 text-gray-400">
              Formatted SQL will appear here...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};