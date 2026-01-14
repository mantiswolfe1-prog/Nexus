import React, { useState } from 'react';
import { X } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }) {
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type === DialogTrigger) {
          return React.cloneElement(child, { onOpenChange });
        }
        if (child.type === DialogContent && open) {
          return React.cloneElement(child, { onOpenChange });
        }
        return null;
      })}
    </div>
  );
}

export function DialogTrigger({ asChild, children, onOpenChange }) {
  if (asChild) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true)
    });
  }
  return (
    <button onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
}

export function DialogContent({ children, onOpenChange, className = '' }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className={`relative bg-gray-900 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4 ${className}`}>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children, className = '' }) {
  return <h2 className={`text-lg font-semibold text-white ${className}`}>{children}</h2>;
}
