import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Plus, Copy, Check, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { CodeSnippet } from '../../types';

export const CodeSnippets: React.FC = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [copied, setCopied] = useState<string | null>(null);

  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'rust',
    'go',
    'html',
    'css',
    'sql',
  ];

  const handleSave = () => {
    if (title && code) {
      const newSnippet: CodeSnippet = {
        id: uuidv4(),
        title,
        code,
        language,
        createdAt: new Date(),
      };
      setSnippets([newSnippet, ...snippets]);
      setTitle('');
      setCode('');
    }
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Code Snippets</h2>
      
      <div className="md:grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Snippet title..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 font-mono text-sm input-field"
              placeholder="Enter your code..."
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="tool-button inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Save Snippet</span>
          </motion.button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mt-5 md:mt-0 text-gray-300">Saved Snippets</h3>
          <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {snippets.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No snippets saved yet
              </div>
            ) : (
              snippets.map((snippet) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">{snippet.title}</h4>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(snippet.id, snippet.code)}
                        className="text-gray-500 hover:text-gray-300"
                      >
                        {copied === snippet.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(snippet.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={vscDarkPlus}
                    className="rounded-lg text-sm"
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};