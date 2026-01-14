import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Calendar, Flame, Plus, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { storage, session } from '../Components/Storage/clientStorage.js';
import SoftParticleDrift from '../Components/Backgrounds/SoftParticleDrift.js';
import GlassCard from '../Components/UI/GlassCard.js';
import NeonButton from '../Components/UI/NeonButton.js';
import { Input } from '../Components/UI/input.js';
import { createPageUrl } from '../utils.js';

// Default study habits
const DEFAULT_HABITS = [
  { id: 1, name: 'Study Flashcards', icon: '📚', category: 'study' },
  { id: 2, name: 'Write Notes', icon: '✏️', category: 'study' },
  { id: 3, name: 'Use Pomodoro Timer', icon: '⏱️', category: 'study' },
  { id: 4, name: 'Read Definitions', icon: '📖', category: 'study' },
  { id: 5, name: 'Practice Problems', icon: '🧮', category: 'study' },
];

export default function HabitTracker() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [todayCompleted, setTodayCompleted] = useState(new Set());
  const [streaks, setStreaks] = useState({});
  const [newHabit, setNewHabit] = useState('');
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const accountCode = session.get();
    if (!accountCode) {
      navigate(createPageUrl('Landing'));
      return;
    }
    loadHabitData();
  }, [navigate]);

  const loadHabitData = async () => {
    try {
      await storage.init();
      
      // Load habits
      const savedHabits = await storage.db.get('habits') || DEFAULT_HABITS;
      setHabits(savedHabits);
      
      // Load today's completions
      const today = new Date().toISOString().split('T')[0];
      const completedToday = await storage.db.get(`habits_completed_${today}`) || new Set();
      setTodayCompleted(completedToday);
      
      // Load streaks
      const savedStreaks = await storage.db.get('habit_streaks') || {};
      setStreaks(savedStreaks);
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to load habit data:', err);
      setLoading(false);
    }
  };

  const toggleHabit = async (habitId) => {
    const newCompleted = new Set(todayCompleted);
    if (newCompleted.has(habitId)) {
      newCompleted.delete(habitId);
    } else {
      newCompleted.add(habitId);
    }
    setTodayCompleted(newCompleted);
    
    // Save to storage
    try {
      await storage.init();
      const today = new Date().toISOString().split('T')[0];
      await storage.db.put(`habits_completed_${today}`, newCompleted);
      
      // Update streak if all habits completed
      if (newCompleted.size === habits.length) {
        updateStreak();
      }
    } catch (err) {
      console.error('Failed to save habit completion:', err);
    }
  };

  const updateStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    const newStreaks = { ...streaks };
    
    if (!newStreaks.currentStreak) {
      newStreaks.currentStreak = 0;
      newStreaks.lastCompletedDate = null;
    }
    
    const lastDate = newStreaks.lastCompletedDate;
    const todayDate = new Date(today);
    
    if (lastDate) {
      const lastDateObj = new Date(lastDate);
      const daysDiff = Math.floor((todayDate - lastDateObj) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        newStreaks.currentStreak += 1;
      } else if (daysDiff > 1) {
        // Streak broken, reset
        newStreaks.currentStreak = 1;
      }
    } else {
      newStreaks.currentStreak = 1;
    }
    
    newStreaks.lastCompletedDate = today;
    newStreaks.longestStreak = Math.max(newStreaks.longestStreak || 0, newStreaks.currentStreak);
    
    setStreaks(newStreaks);
    
    try {
      await storage.init();
      await storage.db.put('habit_streaks', newStreaks);
    } catch (err) {
      console.error('Failed to update streak:', err);
    }
  };

  const addHabit = async () => {
    if (!newHabit.trim()) return;
    
    const newHabitObj = {
      id: Date.now(),
      name: newHabit,
      icon: '⭐',
      category: 'custom'
    };
    
    const updatedHabits = [...habits, newHabitObj];
    setHabits(updatedHabits);
    setNewHabit('');
    setShowAddHabit(false);
    
    try {
      await storage.init();
      await storage.db.put('habits', updatedHabits);
    } catch (err) {
      console.error('Failed to add habit:', err);
    }
  };

  const removeHabit = async (habitId) => {
    const updatedHabits = habits.filter(h => h.id !== habitId);
    setHabits(updatedHabits);
    
    try {
      await storage.init();
      await storage.db.put('habits', updatedHabits);
    } catch (err) {
      console.error('Failed to remove habit:', err);
    }
  };

  const completionPercentage = habits.length > 0 
    ? Math.round((todayCompleted.size / habits.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <SoftParticleDrift 
        particleCount={40} 
        speed={0.3} 
        opacity={0.3} 
        blur={3}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-cyan-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-8 h-8 text-green-400" />
                Habit Tracker
              </h1>
              <p className="text-white/60 mt-1">Build consistency with daily study habits</p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-green-500/30 border-t-green-400 rounded-full animate-spin"></div>
            <p className="text-white/60 mt-4">Loading your habits...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Today's Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-8 border border-green-400/30 bg-green-500/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Today's Progress</h2>
                    <p className="text-green-300">{todayCompleted.size} of {habits.length} completed</p>
                  </div>
                  {streaks.currentStreak > 0 && (
                    <div className="text-right">
                      <p className="text-4xl font-bold text-orange-400 flex items-center gap-2">
                        <Flame className="w-8 h-8" />
                        {streaks.currentStreak}
                      </p>
                      <p className="text-orange-300 text-sm">Day Streak!</p>
                    </div>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-green-400/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                  />
                </div>
                <p className="text-green-300 text-sm font-medium mt-3 text-center">{completionPercentage}% Complete</p>
              </GlassCard>
            </motion.div>

            {/* Streak Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <GlassCard className="p-6 border border-cyan-400/30 bg-cyan-500/10">
                <p className="text-cyan-300/70 text-sm font-medium mb-2">Current Streak</p>
                <p className="text-3xl font-bold text-cyan-300">
                  {streaks.currentStreak || 0} days
                </p>
                <p className="text-cyan-300/60 text-xs mt-2">Keep it going! 🔥</p>
              </GlassCard>
              
              <GlassCard className="p-6 border border-purple-400/30 bg-purple-500/10">
                <p className="text-purple-300/70 text-sm font-medium mb-2">Longest Streak</p>
                <p className="text-3xl font-bold text-purple-300">
                  {streaks.longestStreak || 0} days
                </p>
                <p className="text-purple-300/60 text-xs mt-2">Personal best 🏆</p>
              </GlassCard>
            </motion.div>

            {/* Habits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Today's Habits</h2>
                
                <div className="space-y-3">
                  {habits.map((habit, index) => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        todayCompleted.has(habit.id)
                          ? 'bg-green-500/20 border-green-400/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            todayCompleted.has(habit.id)
                              ? 'bg-green-500 border-green-400'
                              : 'border-white/30'
                          }`}>
                            {todayCompleted.has(habit.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-2xl">{habit.icon}</span>
                          <span className={`font-medium ${
                            todayCompleted.has(habit.id)
                              ? 'text-green-300 line-through'
                              : 'text-white'
                          }`}>
                            {habit.name}
                          </span>
                        </div>
                        {habit.category === 'custom' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeHabit(habit.id);
                            }}
                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add New Habit */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  {!showAddHabit ? (
                    <button
                      onClick={() => setShowAddHabit(true)}
                      className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 text-white font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Custom Habit
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        placeholder="Name your habit..."
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') addHabit();
                        }}
                        className="bg-white/5 border-white/20 text-white"
                        autoFocus
                      />
                      <div className="flex gap-3">
                        <NeonButton
                          onClick={addHabit}
                          className="flex-1 py-2"
                          variant="primary"
                        >
                          Add Habit
                        </NeonButton>
                        <button
                          onClick={() => setShowAddHabit(false)}
                          className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </GlassCard>
            </motion.div>

            {/* Motivational Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6 border border-purple-400/30 bg-purple-500/10">
                <div className="space-y-2">
                  {completionPercentage === 100 ? (
                    <>
                      <p className="text-lg font-bold text-purple-300">🎉 Amazing!</p>
                      <p className="text-white/80">You completed all your habits today! Keep this up for a longer streak!</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-purple-300">💪 Keep Going!</p>
                      <p className="text-white/80">You're {habits.length - todayCompleted.size} habit(s) away from completing today. You've got this!</p>
                    </>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
