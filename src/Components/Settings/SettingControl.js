import React from 'react';
import { Switch } from '../UI/switch';
import { Slider } from '../UI/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';
import { Label } from '../UI/label';

export default function SettingControl({ 
  title, 
  description, 
  type, // 'toggle', 'slider', 'dropdown', 'color'
  value, 
  onChange,
  min,
  max,
  step = 1,
  options = [],
  suffix = ''
}) {
  return (
    <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors">
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-white/50 text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2 min-w-[140px]">
        {type === 'toggle' && (
          <Switch checked={value} onCheckedChange={onChange} />
        )}
        {type === 'slider' && (
          <div className="w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white text-sm font-mono">{value}{suffix}</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={([val]) => onChange(val)}
              min={min}
              max={max}
              step={step}
              className="w-full"
            />
          </div>
        )}
        {type === 'dropdown' && (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {type === 'color' && (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/20"
          />
        )}
      </div>
    </div>
  );
}