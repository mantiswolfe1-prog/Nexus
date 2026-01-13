import React, { useState } from 'react';
import GlassCard from '../UI/GlassCard';

export default function ScientificCalculator({ accentColor }) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    if (memory === null) {
      setMemory(current);
    } else if (operation) {
      const result = calculate(memory, current, operation);
      setDisplay(String(result));
      setMemory(result);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      case '^': return Math.pow(a, b);
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && memory !== null) {
      const result = calculate(memory, parseFloat(display), operation);
      setDisplay(String(result));
      setMemory(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleScientific = (func) => {
    const current = parseFloat(display);
    let result;
    switch (func) {
      case 'sin': result = Math.sin(current * Math.PI / 180); break;
      case 'cos': result = Math.cos(current * Math.PI / 180); break;
      case 'tan': result = Math.tan(current * Math.PI / 180); break;
      case 'sqrt': result = Math.sqrt(current); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      default: result = current;
    }
    setDisplay(String(result));
    setNewNumber(true);
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'sqrt'],
    ['log', 'ln', '^', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'C', '=']
  ];

  return (
    <GlassCard className="p-6 max-w-md mx-auto">
      <div className="mb-4 p-4 rounded-xl bg-black/30 text-right">
        <div className="text-3xl font-mono text-white break-all">{display}</div>
      </div>
      <div className="grid gap-2">
        {buttons.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln'].includes(btn)) {
                    handleScientific(btn);
                  } else if (['+', '-', '×', '÷', '^'].includes(btn)) {
                    handleOperation(btn);
                  } else if (btn === '=') {
                    handleEquals();
                  } else if (btn === 'C') {
                    setDisplay('0');
                    setMemory(null);
                    setOperation(null);
                    setNewNumber(true);
                  } else {
                    handleNumber(btn);
                  }
                }}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                style={{
                  backgroundColor: ['='].includes(btn) ? accentColor + '40' : undefined
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}