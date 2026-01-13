import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

export default function SettingsSection({ 
  title, 
  icon: Icon, 
  expanded, 
  onToggle, 
  children,
  highlighted = false
}) {
  return (
    <GlassCard 
      className={`overflow-hidden transition-all ${highlighted ? 'ring-2 ring-cyan-400' : ''}`}
      hover={false}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-white/50 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}