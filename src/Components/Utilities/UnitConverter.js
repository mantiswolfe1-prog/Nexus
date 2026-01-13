import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import { Input } from '../UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/select';

const CONVERSIONS = {
  length: {
    name: 'Length',
    units: {
      m: { name: 'Meters', toBase: 1 },
      km: { name: 'Kilometers', toBase: 1000 },
      cm: { name: 'Centimeters', toBase: 0.01 },
      mm: { name: 'Millimeters', toBase: 0.001 },
      mi: { name: 'Miles', toBase: 1609.344 },
      ft: { name: 'Feet', toBase: 0.3048 },
      in: { name: 'Inches', toBase: 0.0254 },
      yd: { name: 'Yards', toBase: 0.9144 }
    }
  },
  weight: {
    name: 'Weight',
    units: {
      kg: { name: 'Kilograms', toBase: 1 },
      g: { name: 'Grams', toBase: 0.001 },
      mg: { name: 'Milligrams', toBase: 0.000001 },
      lb: { name: 'Pounds', toBase: 0.453592 },
      oz: { name: 'Ounces', toBase: 0.0283495 }
    }
  },
  temperature: {
    name: 'Temperature',
    units: {
      c: { name: 'Celsius' },
      f: { name: 'Fahrenheit' },
      k: { name: 'Kelvin' }
    }
  }
};

export default function UnitConverter({ accentColor = '#f368e0' }) {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, category]);

  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setToValue('');
      return;
    }

    if (category === 'temperature') {
      let celsius;
      if (fromUnit === 'c') celsius = value;
      else if (fromUnit === 'f') celsius = (value - 32) * 5/9;
      else celsius = value - 273.15;

      let result;
      if (toUnit === 'c') result = celsius;
      else if (toUnit === 'f') result = celsius * 9/5 + 32;
      else result = celsius + 273.15;

      setToValue(result.toFixed(4));
    } else {
      const units = CONVERSIONS[category].units;
      const baseValue = value * units[fromUnit].toBase;
      const result = baseValue / units[toUnit].toBase;
      setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
    }
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const currentUnits = CONVERSIONS[category].units;

  return (
    <GlassCard className="p-4 w-full max-w-xs" accentColor={accentColor} hover={false}>
      <h3 className="font-semibold text-white mb-4">Unit Converter</h3>

      {/* Category Selection */}
      <div className="mb-4">
        <Select value={category} onValueChange={(val) => {
          setCategory(val);
          const units = Object.keys(CONVERSIONS[val].units);
          setFromUnit(units[0]);
          setToUnit(units[1]);
        }}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CONVERSIONS).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* From */}
      <div className="space-y-2 mb-4">
        <Select value={fromUnit} onValueChange={setFromUnit}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(currentUnits).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="bg-white/5 border-white/10 text-white text-lg"
        />
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-4">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={swap}
          className="p-2 rounded-full"
          style={{ backgroundColor: accentColor }}
        >
          <ArrowLeftRight className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* To */}
      <div className="space-y-2">
        <Select value={toUnit} onValueChange={setToUnit}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(currentUnits).map(([key, { name }]) => (
              <SelectItem key={key} value={key}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={toValue}
          readOnly
          className="bg-white/10 border-white/10 text-white text-lg font-semibold"
        />
      </div>
    </GlassCard>
  );
}