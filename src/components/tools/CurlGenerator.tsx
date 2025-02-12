import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Plus, Trash2, Check } from 'lucide-react';

interface Header {
  key: string;
  value: string;
}

export const CurlGenerator: React.FC = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const generateCurl = () => {
    let curl = `curl -X ${method} '${url}'`;
    
    headers.forEach(header => {
      if (header.key && header.value) {
        curl += `\n  -H '${header.key}: ${header.value}'`;
      }
    });

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      curl += `\n  -d '${body}'`;
    }

    return curl;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCurl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">cURL Generator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-300 mb-1">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="input-field"
              >
                {methods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">Headers</label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addHeader}
                className="text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
            {headers.map((header, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                  placeholder="Header name"
                  className="input-field"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="input-field"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeHeader(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            ))}
          </div>

          {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Request Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Request body (JSON, form data, etc.)"
                className="input-field h-32"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-300">Generated cURL Command</label>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="text-gray-500 hover:text-gray-300"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </motion.button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white overflow-x-auto">
            <pre className="whitespace-pre-wrap">{generateCurl()}</pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};