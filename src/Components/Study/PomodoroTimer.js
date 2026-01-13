import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import GlassCard from '../../UI/GlassCard';
import NeonButton from '../../UI/NeonButton';

export default function PomodoroTimer({ accentColor = '#a55eea' }) {
  const [mode, setMode] = useState('focus'); // focus, break
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const times = {
    focus: 25 * 60,
    break: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      if (mode === 'focus') {
        setSessions(prev => prev + 1);
        setMode('break');
        setTimeLeft(times.break);
      } else {
        setMode('focus');
        setTimeLeft(times.focus);
      }
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((times.focus - timeLeft) / times.focus) * 100
    : ((times.break - timeLeft) / times.break) * 100;

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(times[mode]);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(times[newMode]);
  };

  return (
    <GlassCard className="p-6" accentColor={accentColor} hover={false}>
      <div className="text-center">
        {/* Mode Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => switchMode('focus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'focus' ? 'bg-white/10 text-white' : 'text-white/50'
            }`}
            style={{ borderBottom: mode === 'focus' ? `2px solid ${accentColor}` : 'none' }}
          >
            <Brain className="w-4 h-4" />
            Focus
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => switchMode('break')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              mode === 'break' ? 'bg-white/10 text-white' : 'text-white/50'
            }`}
            style={{ borderBottom: mode === 'break' ? `2px solid ${accentColor}` : 'none' }}
          >
            <Coffee className="w-4 h-4" />
            Break
          </motion.button>
        </div>

        {/* Timer Display */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={accentColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 88}
              initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100) }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm text-white/50 mt-2">
              {mode === 'focus' ? 'Stay focused!' : 'Take a break'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <NeonButton
            variant="ghost"
            size="icon"
            onClick={reset}
          >
            <RotateCcw className="w-5 h-5" />
          </NeonButton>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsRunning(!isRunning)}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: accentColor }}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </motion.button>

          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Sessions */}
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < sessions % 4 ? '' : 'bg-white/10'
              }`}
              style={{ backgroundColor: i < sessions % 4 ? accentColor : undefined }}
            />
          ))}
        </div>
        <p className="text-xs text-white/40 mt-2">{sessions} sessions completed</p>
      </div>
    </GlassCard>
  );
}