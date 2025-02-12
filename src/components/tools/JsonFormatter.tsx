import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ToolHeader } from './ToolHeader';
import { supabase } from '../../lib/supabase';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');
  const [user] = useState(supabase.auth.getUser());

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError('Invalid JSON');
      setFormatted('');
    }
  };

  return (
    <div className="h-full bg-dark">
      {/* <ToolHeader title="JSON Formatter" user={user} /> */}
      <ToolHeader title="JSON Formatter" />

      <div className="p-6 space-y-4">
        <div className="flex justify-end">  <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={formatJson}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Format
        </motion.button></div>
        <div className="grid  md:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full p-4 rounded-lg bg-dark-lighter border border-primary/20 text-white font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Paste your JSON here..."
            />
          </div>

          <div className="space-y-2 mt-5 md:mt-0 pb-10 md:pb-0">
            <div className="flex justify-between items-center ">
              <label className="block text-sm font-medium text-gray-300">Formatted Output</label>

            </div>

            {error ? (
              <div className="text-primary p-4 bg-primary/10 rounded-lg border border-primary/20">
                {error}
              </div>
            ) : formatted ? (
              <div className="h-full rounded-lg overflow-hidden border border-primary/20">
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  className="h-full !bg-dark-lighter !m-0"
                  customStyle={{
                    background: 'transparent',
                    padding: '1rem',
                  }}
                >
                  {formatted}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="h-full bg-dark-lighter rounded-lg p-4 text-gray-500 border border-primary/20">
                Formatted JSON will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};