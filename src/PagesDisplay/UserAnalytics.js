import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import AnimatedBackground from '../Components/UI/AnimatedBackground.js';
import NeonButton from '../Components/UI/NeonButton.js';
import Analytics from './Analytics.js';
import HabitTracker from './HabitTracker.js';

export default function UserAnalytics() {
  const [activeTab, setActiveTab] = useState('analytics');
  const accentColor = '#00d4ff';

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'habits', label: 'Habits & Streaks', icon: Calendar },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground type="gradient" accentColor={accentColor} />
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Link to={createPageUrl('Dashboard')}>
              <NeonButton variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </NeonButton>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">User Analytics</h1>
              <p className="text-white/50">Track your usage, habits & streaks</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'bg-white/5 text-white/50 hover:text-white/70'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? accentColor : undefined
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'analytics' ? (
            <div className="analytics-wrapper">
              <Analytics embedded={true} />
            </div>
          ) : (
            <div className="habits-wrapper">
              <HabitTracker embedded={true} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
