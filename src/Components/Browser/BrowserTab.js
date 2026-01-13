import React from 'react';
import { motion } from 'framer-motion';
import { X, Globe, RefreshCw } from 'lucide-react';
import { cn } from '../../utils.js';

export default function BrowserTab({ 
  tab, 
  isActive, 
  onSelect, 
  onClose,
  accentColor = '#3498db'
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer transition-colors min-w-[120px] max-w-[200px]",
        isActive 
          ? "bg-white/10 border-b-2" 
          : "bg-white/5 hover:bg-white/10"
      )}
      style={{ borderColor: isActive ? accentColor : 'transparent' }}
    >
      {tab.loading ? (
        <RefreshCw className="w-4 h-4 text-white/50 animate-spin flex-shrink-0" />
      ) : tab.favicon ? (
        <img src={tab.favicon} alt="" className="w-4 h-4 flex-shrink-0" />
      ) : (
        <Globe className="w-4 h-4 text-white/50 flex-shrink-0" />
      )}
      
      <span className="text-sm text-white/80 truncate flex-grow">
        {tab.title || 'New Tab'}
      </span>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="p-0.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}