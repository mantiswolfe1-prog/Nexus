import React, { useState } from 'react';
import GlassCard from '../UI/GlassCard';
import NeonButton from '../UI/NeonButton';

const FORMULAS = {
  math: [
    { name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / 2a' },
    { name: 'Pythagorean Theorem', formula: 'a² + b² = c²' },
    { name: 'Distance Formula', formula: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)' },
    { name: 'Slope Formula', formula: 'm = (y₂ - y₁) / (x₂ - x₁)' },
    { name: 'Area of Circle', formula: 'A = πr²' },
    { name: 'Volume of Sphere', formula: 'V = (4/3)πr³' }
  ],
  science: [
    { name: 'Force', formula: 'F = ma' },
    { name: 'Kinetic Energy', formula: 'KE = ½mv²' },
    { name: 'Potential Energy', formula: 'PE = mgh' },
    { name: 'Speed', formula: 'v = d/t' },
    { name: 'Density', formula: 'ρ = m/V' },
    { name: 'Ohm\'s Law', formula: 'V = IR' }
  ]
};

export default function FormulaSheet({ accentColor }) {
  const [category, setCategory] = useState('math');

  return (
    <GlassCard className="p-6 max-w-3xl mx-auto">
      <div className="flex gap-2 mb-6">
        <NeonButton
          variant={category === 'math' ? 'primary' : 'ghost'}
          onClick={() => setCategory('math')}
        >
          Math
        </NeonButton>
        <NeonButton
          variant={category === 'science' ? 'primary' : 'ghost'}
          onClick={() => setCategory('science')}
        >
          Science
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FORMULAS[category].map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <h3 className="text-white font-medium mb-2">{item.name}</h3>
            <p className="text-white/70 font-mono text-lg">{item.formula}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}