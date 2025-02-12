import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  useEffect(() => {
    const rgbColor = hexToRgb(hex);
    if (rgbColor) {
      setRgb(rgbColor);
      setHsl(rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b));
    }
  }, [hex]);

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Color Converter</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Color Preview</label>
            <div className="h-32 rounded-lg shadow-inner" style={{ backgroundColor: hex }} />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">HEX</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  className="input-field flex-1"
                  placeholder="#000000"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(hex, 'hex')}
                  className="px-3 text-gray-500 hover:text-gray-300"
                >
                  {copied === 'hex' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">RGB</label>
              <div className="flex gap-2">
                <div className="flex-1 input-field">
                  {`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                  className="px-3 text-gray-500 hover:text-gray-300"
                >
                  {copied === 'rgb' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">HSL</label>
              <div className="flex gap-2">
                <div className="flex-1 input-field">
                  {`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                  className="px-3 text-gray-500 hover:text-gray-300"
                >
                  {copied === 'hsl' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300">Color Values</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Red</label>
              <input
                type="number"
                value={rgb.r}
                onChange={(e) => setRgb({ ...rgb, r: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="input-field"
                min="0"
                max="255"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Green</label>
              <input
                type="number"
                value={rgb.g}
                onChange={(e) => setRgb({ ...rgb, g: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="input-field"
                min="0"
                max="255"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Blue</label>
              <input
                type="number"
                value={rgb.b}
                onChange={(e) => setRgb({ ...rgb, b: Math.min(255, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="input-field"
                min="0"
                max="255"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Hue</label>
              <input
                type="number"
                value={hsl.h}
                onChange={(e) => setHsl({ ...hsl, h: Math.min(360, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="input-field"
                min="0"
                max="360"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Saturation</label>
              <input
                type="number"
                value={hsl.s}
                onChange={(e) => setHsl({ ...hsl, s: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Lightness</label>
              <input
                type="number"
                value={hsl.l}
                onChange={(e) => setHsl({ ...hsl, l: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};