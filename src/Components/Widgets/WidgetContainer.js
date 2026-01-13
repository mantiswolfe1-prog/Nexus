import React, { useState } from 'react';
import { motion, Draggable } from 'framer-motion';
import { X, GripVertical } from 'lucide-react';

export default function WidgetContainer({ 
  id, 
  title, 
  children, 
  onClose,
  defaultPosition = { x: 20, y: 100 }
}) {
  const [position, setPosition] = useState(defaultPosition);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: window.innerWidth - 300, top: 0, bottom: window.innerHeight - 200 }}
      initial={defaultPosition}
      className="fixed z-40 w-80"
      style={{ x: position.x, y: position.y }}
    >
      <div className="backdrop-blur-xl bg-black/50 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-white/10 cursor-move">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-white/50" />
            <h3 className="text-white font-medium text-sm">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
}