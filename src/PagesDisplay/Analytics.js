import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Clock, Target, Calendar, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { storage, session } from '../Components/Storage/clientStorage.js';
import SoftParticleDrift from '../Components/Backgrounds/SoftParticleDrift.js';
import GlassCard from '../Components/UI/GlassCard.js';
import { createPageUrl } from '../utils.js';

export default function Analytics() {
  const navigate = useNavigate();
  const [tabStats, setTabStats] = useState({});
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    loadAnalytics();
    const accountCode = session.get();
    if (!accountCode) {
      navigate(createPageUrl('Landing'));
    }
  }, [navigate]);

  const loadAnalytics = async () => {
    try {
      await storage.init();
      const stats = await storage.db.get('tabStats') || {};
      setTabStats(stats);
      
      // Calculate total clicks
      const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
      setTotalClicks(total);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load analytics:', err);
      setLoading(false);
    }
  };

  // Sort tabs by click count
  const sortedTabs = Object.entries(tabStats)
    .sort((a, b) => b[1] - a[1]);

  const maxClicks = sortedTabs.length > 0 ? sortedTabs[0][1] : 0;

  // Category breakdowns
  const studyTools = ['FlashcardDeck', 'NotesPanel', 'PomodoroTimer', 'Dictionary', 'FormulaSheet', 'AIChat', 'AIHelper', 'Whiteboard', 'ScientificCalculator'];
  const games = ['Games'];
  const entertainment = ['Music', 'Videos', 'Social'];
  
  const getCategoryStats = (items) => {
    return items.reduce((sum, item) => sum + (tabStats[item] || 0), 0);
  };

  const studyClicks = getCategoryStats(studyTools);
  const gamesClicks = getCategoryStats(games);
  const entertainmentClicks = getCategoryStats(entertainment);

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
                <BarChart3 className="w-8 h-8 text-purple-400" />
                Your Analytics
              </h1>
              <p className="text-white/60 mt-1">See how you've been using Nexus</p>
            </div>
          </div>
        </motion.div>

        {/* Period Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {['week', 'month', 'all'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-purple-500/40 border border-purple-400 text-purple-200'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
            <p className="text-white/60 mt-4">Loading your analytics...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard className="p-6 border border-cyan-400/30 bg-cyan-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-300/70 text-sm font-medium">Total Interactions</p>
                      <p className="text-3xl font-bold text-cyan-300 mt-2">{totalClicks}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-cyan-400 opacity-50" />
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-6 border border-green-400/30 bg-green-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-300/70 text-sm font-medium">Study Sessions</p>
                      <p className="text-3xl font-bold text-green-300 mt-2">{studyClicks}</p>
                    </div>
                    <Target className="w-8 h-8 text-green-400 opacity-50" />
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-6 border border-purple-400/30 bg-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-300/70 text-sm font-medium">Most Used</p>
                      <p className="text-2xl font-bold text-purple-300 mt-2">
                        {sortedTabs.length > 0 ? sortedTabs[0][0] : 'None yet'}
                      </p>
                      <p className="text-purple-300/60 text-xs mt-1">
                        {sortedTabs.length > 0 ? `${sortedTabs[0][1]} clicks` : ''}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-400 opacity-50" />
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Category Breakdown
                </h2>
                
                <div className="space-y-4">
                  {/* Study Tools */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">📚 Study Tools</span>
                      <span className="text-green-300 font-bold">{studyClicks} clicks</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: maxClicks > 0 ? `${(studyClicks / maxClicks) * 100}%` : '0%' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Games */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">🎮 Games</span>
                      <span className="text-cyan-300 font-bold">{gamesClicks} clicks</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: maxClicks > 0 ? `${(gamesClicks / maxClicks) * 100}%` : '0%' }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-400"
                      />
                    </div>
                  </div>

                  {/* Entertainment */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">🎵 Entertainment</span>
                      <span className="text-purple-300 font-bold">{entertainmentClicks} clicks</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: maxClicks > 0 ? `${(entertainmentClicks / maxClicks) * 100}%` : '0%' }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Detailed Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard className="p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Top Features</h2>
                
                {sortedTabs.length > 0 ? (
                  <div className="space-y-3">
                    {sortedTabs.map(([tab, count], index) => (
                      <motion.div
                        key={tab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-lg font-bold text-purple-400">#{index + 1}</span>
                          <span className="text-white font-medium">{tab}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(count / maxClicks) * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            />
                          </div>
                          <span className="text-cyan-300 font-bold w-12 text-right">{count}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-center py-8">
                    No data yet. Start using Nexus features to see your analytics!
                  </p>
                )}
              </GlassCard>
            </motion.div>

            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlassCard className="p-6 border border-blue-400/30 bg-blue-500/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  💡 Insights
                </h2>
                <div className="space-y-2 text-white/80">
                  {studyClicks > entertainmentClicks ? (
                    <p>✨ You're focused! Study tools account for {Math.round((studyClicks / totalClicks) * 100)}% of your usage.</p>
                  ) : (
                    <p>🎮 You're taking breaks! Mix in some study time for balance.</p>
                  )}
                  {sortedTabs.length > 0 && (
                    <p>🎯 Your favorite feature is <span className="text-cyan-300 font-bold">{sortedTabs[0][0]}</span>. Keep exploring others too!</p>
                  )}
                  <p>📊 Track your progress by checking back here regularly!</p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
