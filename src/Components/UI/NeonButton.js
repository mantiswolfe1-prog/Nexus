import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils.js';

export default function NeonButton({
  children,
  className,
  accentColor = '#00f0ff',
  variant = 'default',
  size = 'default',
  icon,
  ...props
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2'
  };

  const variants = {
    default: 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20',
    primary: `bg-gradient-to-r from-[${accentColor}]/20 to-[${accentColor}]/10 border-[${accentColor}]/30 hover:border-[${accentColor}]/50`,
    ghost: 'bg-transparent hover:bg-white/5 border-transparent',
    danger: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:border-red-500/50 text-red-400'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl border",
        "font-medium transition-all duration-200",
        "text-white/90 hover:text-white",
        sizes[size],
        variants[variant],
        className
      )}
      style={{
        boxShadow: variant === 'primary' ? `0 0 20px -5px ${accentColor}40` : 'none'
      }}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </motion.button>
  );
}