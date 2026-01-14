import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Keyboard } from 'lucide-react';
import GlassCard from './GlassCard.js';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'P / G', action: 'Open Games', category: 'Navigation' },
    { key: 'S', action: 'Open Study Tools', category: 'Navigation' },
    { key: 'M', action: 'Open Music', category: 'Navigation' },
    { key: 'V', action: 'Open Videos', category: 'Navigation' },
    { key: 'B', action: 'Open Browser', category: 'Navigation' },
    { key: 'U', action: 'Open Utilities', category: 'Navigation' },
    { key: 'D', action: 'Go to Dashboard', category: 'Navigation' },
    { key: 'H', action: 'Open Habits Tracker', category: 'Navigation' },
    { key: 'A', action: 'Open Analytics', category: 'Navigation' },
    { key: 'ESC', action: 'Panic Mode (Emergency Exit)', category: 'Special', danger: true },
    { key: '?', action: 'Show this help', category: 'Special' },
  ];

  const categories = [...new Set(shortcuts.map(s => s.category))];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
        >
          <GlassCard className="p-8 border border-cyan-400/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Keyboard className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white/70 hover:text-white" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    {category === 'Special' ? <Zap className="w-4 h-4" /> : null}
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {shortcuts
                      .filter(s => s.category === category)
                      .map((shortcut, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            shortcut.danger
                              ? 'bg-red-500/10 border border-red-400/30'
                              : 'bg-white/5 border border-white/10'
                          }`}
                        >
                          <span className={`font-medium ${
                            shortcut.danger ? 'text-red-300' : 'text-white'
                          }`}>
                            {shortcut.action}
                          </span>
                          <kbd className={`px-3 py-1.5 rounded-md font-mono text-sm border ${
                            shortcut.danger
                              ? 'bg-red-500/20 border-red-400/40 text-red-200'
                              : 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                          }`}>
                            {shortcut.key}
                          </kbd>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm text-center">
                💡 Tip: Shortcuts won't work while typing in input fields
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
