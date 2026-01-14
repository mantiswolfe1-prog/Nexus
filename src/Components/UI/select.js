import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open), value });
        }
        if (child.type === SelectContent && open) {
          return React.cloneElement(child, { onValueChange, setOpen });
        }
        return null;
      })}
    </div>
  );
}

export function SelectTrigger({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-left ${className}`}
    >
      <span className="flex-1 overflow-visible whitespace-normal">{children}</span>
      <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
    </button>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, onValueChange, setOpen }) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-white/10 rounded-lg overflow-hidden z-50 max-h-60 overflow-y-auto">
      {React.Children.map(children, child =>
        React.cloneElement(child, { 
          onClick: (val) => {
            onValueChange(val);
            setOpen(false);
          }
        })
      )}
    </div>
  );
}

export function SelectItem({ value, children, onClick }) {
  return (
    <div
      onClick={() => onClick(value)}
      className="px-3 py-2 hover:bg-white/10 cursor-pointer text-white text-sm whitespace-normal break-words"
    >
      {children}
    </div>
  );
}
