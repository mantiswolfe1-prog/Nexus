import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../UI/GlassCard';

export default function Calculator({ accentColor = '#f368e0' }) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result;
      
      switch (operation) {
        case '+': result = currentValue + inputValue; break;
        case '-': result = currentValue - inputValue; break;
        case '×': result = currentValue * inputValue; break;
        case '÷': result = inputValue !== 0 ? currentValue / inputValue : 'Error'; break;
        default: result = inputValue;
      }
      
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (operation && previousValue !== null) {
      performOperation(null);
      setOperation(null);
      setPreviousValue(null);
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const handleButton = (btn) => {
    if (btn >= '0' && btn <= '9') inputDigit(parseInt(btn));
    else if (btn === '.') inputDecimal();
    else if (btn === 'C') clear();
    else if (btn === '±') setDisplay(String(parseFloat(display) * -1));
    else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
    else if (btn === '=') calculate();
    else performOperation(btn);
  };

  const isOperator = (btn) => ['+', '-', '×', '÷'].includes(btn);
  const isSpecial = (btn) => ['C', '±', '%'].includes(btn);

  return (
    <GlassCard className="p-4 w-full max-w-xs" accentColor={accentColor} hover={false}>
      <div className="mb-4 p-4 rounded-xl bg-black/30 text-right">
        <div className="text-white/50 text-sm h-5">
          {previousValue !== null && `${previousValue} ${operation || ''}`}
        </div>
        <div className="text-3xl font-bold text-white truncate">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((btn, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleButton(btn)}
            className={`
              h-14 rounded-xl font-semibold text-lg transition-colors
              ${btn === '0' ? 'col-span-2' : ''}
              ${isOperator(btn) ? 'text-white' : ''}
              ${isSpecial(btn) ? 'bg-white/20 text-white' : ''}
              ${!isOperator(btn) && !isSpecial(btn) && btn !== '=' ? 'bg-white/10 text-white hover:bg-white/20' : ''}
              ${btn === '=' ? 'text-white' : ''}
            `}
            style={{
              backgroundColor: isOperator(btn) || btn === '=' ? accentColor : undefined
            }}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </GlassCard>
  );
}