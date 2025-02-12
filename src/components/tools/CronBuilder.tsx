import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export const CronBuilder: React.FC = () => {
  const [minutes, setMinutes] = useState('*');
  const [hours, setHours] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [expression, setExpression] = useState('* * * * *');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newExpression = `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setExpression(newExpression);
    generateDescription(newExpression);
  }, [minutes, hours, dayOfMonth, month, dayOfWeek]);

  const generateDescription = (expr: string) => {
    const parts = expr.split(' ');
    let desc = 'Runs ';

    if (parts[0] === '*' && parts[1] === '*') {
      desc += 'every minute';
    } else if (parts[0] === '0' && parts[1] === '*') {
      desc += 'every hour';
    } else if (parts[0] === '0' && parts[1] === '0') {
      desc += 'every day at midnight';
    } else {
      if (parts[0] !== '*') desc += `at minute ${parts[0]} `;
      if (parts[1] !== '*') desc += `at hour ${parts[1]} `;
    }

    if (parts[2] !== '*') desc += `on day ${parts[2]} of the month `;
    if (parts[3] !== '*') desc += `in month ${parts[3]} `;
    if (parts[4] !== '*') desc += `on ${getDayName(parts[4])} `;

    setDescription(desc.trim());
  };

  const getDayName = (day: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[parseInt(day)] || day;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Cron Expression Builder</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Minutes</label>
              <input
                type="text"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="input-field"
                placeholder="*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Hours</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="input-field"
                placeholder="*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Day (Month)</label>
              <input
                type="text"
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                className="input-field"
                placeholder="*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Month</label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="input-field"
                placeholder="*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Day (Week)</label>
              <input
                type="text"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="input-field"
                placeholder="*"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">Expression</label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="text-gray-500 hover:text-gray-300"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </motion.button>
            </div>
            <div className="bg-gray-900 text-white rounded-lg p-4 font-mono">
              {expression}
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-300">{description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-600">Quick Reference</h3>
          <div className="border rounded-lg shadow p-4 space-y-4">
            <div>
              <h4 className="font-medium text-red-600">Special Characters</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-300">
                <li><span className="font-mono">*</span> - any value</li>
                <li><span className="font-mono">,</span> - value list separator</li>
                <li><span className="font-mono">-</span> - range of values</li>
                <li><span className="font-mono">/</span> - step values</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-600">Common Examples</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-300">
                <li><span className="font-mono">0 0 * * *</span> - Daily at midnight</li>
                <li><span className="font-mono">*/15 * * * *</span> - Every 15 minutes</li>
                <li><span className="font-mono">0 9-17 * * 1-5</span> - Working hours</li>
                <li><span className="font-mono">0 0 1 * *</span> - Monthly at midnight</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};