import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils.js';
import { 
  Gamepad2, 
  Play, 
  Music, 
  Brain, 
  Globe, 
  MessageCircle, 
  User, 
  Wrench,
  Sparkles,
  Clock,
  Star,
  Bell,
  AlertTriangle,
  Zap,
  BarChart3,
  Calendar
} from 'lucide-react';
import DashboardTile from '../Components/Dashboard/DashboardTile.js';
import QuickActions from '../Components/Dashboard/QuickActions.js';
import GlassCard from '../Components/UI/GlassCard.js';
import { storage, session } from '../Components/Storage/clientStorage.js';
import SoftParticleDrift from '../Components/Backgrounds/SoftParticleDrift.js';
import FPSMonitor from '../Components/Performance/FPSMonitor.js';
import { PerformanceProvider, usePerformance } from '../Components/Performance/PerformanceManager.js';
import DashboardAI from '../Components/AI/DashboardAI.js';

function DashboardContent() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [globalNotices, setGlobalNotices] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showFPS, setShowFPS] = useState(false);
  const navigate = useNavigate();
  const { handlePerformanceChange, getPerformanceSettings } = usePerformance();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadUserData();
    loadGlobalNotices();
  }, []);

  // Keyboard shortcut to toggle FPS monitor (Ctrl+Shift+F)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setShowFPS(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const loadUserData = async () => {
    try {
      const accountCode = session.get();
      if (!accountCode) {
        navigate(createPageUrl('Landing'));
        return;
      }

      await storage.init();
      const userData = await storage.loadUser(accountCode);
      const userSettings = await storage.loadSettings();
      const userFavorites = await storage.loadFavorites();

      if (!userData) {
        session.clear();
        navigate(createPageUrl('Landing'));
        return;
      }

      setUser(userData);
      setSettings(userSettings || {
        aiEnabled: false,
        widgetsEnabled: false,
        lowEndMode: false,
        transition: 'fade',
        theme: {
          background: '#0a0a0f',
          accent: '#00f0ff',
          text: '#ffffff'
        }
      });
      setFavorites(userFavorites);
    } catch (err) {
      console.error('Failed to load user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadGlobalNotices = async () => {
    try {
      // Mock notices - base44 removed
      setGlobalNotices([]);
    } catch (err) {
      console.error('Failed to load notices:', err);
    }
  };

  const handlePanicMode = () => {
    // Stop any audio
    document.querySelectorAll('audio, video').forEach(el => el.pause());
    // Clear session but keep encrypted data
    session.clear();
    // Redirect to safe page
    window.location.href = 'https://www.google.com/search?q=math+homework';
  };

  const handleLowEndModeToggle = async () => {
    const newValue = !settings.lowEndMode;
    const updatedSettings = { ...settings, lowEndMode: newValue };
    setSettings(updatedSettings);
    try {
      await storage.saveSettings(updatedSettings);
    } catch (err) {
      console.error('Failed to save low-end mode:', err);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const recordTabClick = async (tabName) => {
    try {
      await storage.init();
      const stats = (await storage.db.get('tabStats')) || {};
      stats[tabName] = (stats[tabName] || 0) + 1;
      await storage.db.put('tabStats', stats);
    } catch (err) {
      console.error('Failed to record tab click:', err);
    }
  };

  const tiles = [
    { 
      title: 'Games', 
      icon: Gamepad2, 
      description: 'Browser games from CrazyGames, Poki & more',
      page: 'Games',
      accent: '#ff6b6b',
      stats: '500+ games'
    },
    { 
      title: 'Videos', 
      icon: Play, 
      description: 'Stream YouTube, TikTok, Netflix & more',
      page: 'Videos',
      accent: '#ff9f43',
      stats: 'All platforms'
    },
    { 
      title: 'Music', 
      icon: Music, 
      description: 'Spotify, SoundCloud, Apple Music',
      page: 'Music',
      accent: '#1db954',
      stats: 'Your playlists'
    },
    { 
      title: 'Browser', 
      icon: Globe, 
      description: 'Tabbed mini-browser with bookmarks',
      page: 'Browser',
      accent: '#3498db',
      stats: 'Private tabs'
    },
    { 
      title: 'Social', 
      icon: MessageCircle, 
      description: 'Discord, social feeds & messaging',
      page: 'Social',
      accent: '#5865f2',
      stats: 'Connected'
    },
    { 
      title: 'Profile', 
      icon: User, 
      description: 'Customize themes, backgrounds & more',
      page: 'Settings',
      accent: '#00f0ff',
      stats: 'Settings'
    },
    { 
      title: 'User Analytics', 
      icon: BarChart3, 
      description: 'Track usage, habits & streaks',
      page: 'UserAnalytics',
      accent: '#00d4ff',
      stats: 'Insights'
    },
    { 
      title: 'Utilities', 
      icon: Wrench, 
      description: 'AI tools, calculator, converter, whiteboard & more',
      page: 'Utilities',
      accent: '#f368e0',
      stats: '15+ tools'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }

  const perfSettings = getPerformanceSettings();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: settings?.theme?.background }}>
      <SoftParticleDrift
        particleCount={settings?.lowEndMode ? 30 : perfSettings.particleCount}
        blur={settings?.lowEndMode ? 0 : perfSettings.blur}
        accentColor={settings?.theme?.accent || '#00f0ff'}
        lowEndMode={settings?.lowEndMode || perfSettings.reduceDetail}
      />
      
      {showFPS && (
        <FPSMonitor
          visible={showFPS}
          position="top-right"
          onPerformanceChange={handlePerformanceChange}
        />
      )}
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-5 h-5" style={{ color: settings?.theme?.accent || '#00f0ff' }} />
                <span className="text-white/50 text-sm">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {getGreeting()}, <span style={{ color: settings?.theme?.accent || '#00f0ff' }}>{user?.username || 'Student'}</span>
              </h1>
              <p className="text-white/50 mt-1">Welcome to Nexus</p>
            </div>
            
            <QuickActions 
              accentColor={settings?.theme?.accent || '#00f0ff'}
              panicMode={false}
              setPanicMode={handlePanicMode}
              lowEndMode={settings?.lowEndMode || false}
              setLowEndMode={handleLowEndModeToggle}
              onSettingsClick={() => navigate(createPageUrl('Settings'))}
            />
          </div>
        </motion.header>

        {/* Notifications Panel */}
        {globalNotices.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-4" hover={false} accentColor={settings?.theme?.accent}>
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-white/70 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">System Messages</h3>
                  <div className="space-y-2">
                    {globalNotices.map((notice) => (
                      <p key={notice.id} className="text-sm text-white/60">
                        {notice.message}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Notification Bar - Replaced Stats */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-4" hover={false} accentColor={settings?.theme?.accent}>
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-white/70 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Quick Info</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{favorites.length} Favorites</span>
                  </div>
                  {globalNotices.length > 0 && (
                    <div className="flex items-center gap-2 text-white/90">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                        {globalNotices.length} new {globalNotices.length === 1 ? 'message' : 'messages'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {tiles.map((tile, index) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.1 * index, type: 'spring', stiffness: 100 }}
              >
                <Link 
                  to={createPageUrl(tile.page)} 
                  className="block h-full"
                  onClick={() => recordTabClick(tile.page)}
                >
                  <DashboardTile 
                    {...tile}
                    accentColor={tile.accent}
                  />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-white/30 text-sm space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>
            Press <kbd className="px-2 py-1 rounded bg-white/10 text-white/50 font-mono">?</kbd> to see all keyboard shortcuts
          </p>
          <p className="text-xs">
            Quick: <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono text-xs">P</kbd> Games · 
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono text-xs mx-1">S</kbd> Study · 
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-white/40 font-mono text-xs">M</kbd> Music · 
            <kbd className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300/60 font-mono text-xs mx-1">ESC</kbd> Panic
          </p>
        </motion.footer>

        {/* AI Assistant */}
        <DashboardAI accentColor={settings?.theme?.accent || '#a55eea'} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <PerformanceProvider>
      <DashboardContent />
    </PerformanceProvider>
  );
}