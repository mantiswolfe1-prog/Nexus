import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Plus, 
  Star,
  Search,
  Bookmark,
  Settings,
  Globe,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from 'utils';
import AnimatedBackground from '../Components/UI/AnimatedBackground.js';
import GlassCard from '../Components/UI/GlassCard.js';
import NeonButton from '../Components/UI/NeonButton.js';
import BrowserTab from '../Components/Browser/BrowserTab.js';
import { Input } from '../Components/UI/input';

const DEFAULT_BOOKMARKS = [
  { id: 1, title: 'Google', url: 'https://www.google.com', favicon: 'https://www.google.com/favicon.ico' },
  { id: 2, title: 'Wikipedia', url: 'https://www.wikipedia.org', favicon: 'https://www.wikipedia.org/favicon.ico' },
  { id: 3, title: 'Khan Academy', url: 'https://www.khanacademy.org', favicon: 'https://www.khanacademy.org/favicon.ico' },
  { id: 4, title: 'Quizlet', url: 'https://www.quizlet.com', favicon: 'https://quizlet.com/favicon.ico' },
];

export default function Browser() {
  const location = useLocation();
  const [tabs, setTabs] = useState([
    { id: 1, title: 'New Tab', url: '', loading: false }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [urlInput, setUrlInput] = useState('');
  const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [settings, setSettings] = useState({ browser: { searchEngine: 'google' } });

  const accentColor = '#3498db';
  const activeTab = tabs.find(t => t.id === activeTabId);

  // Search engine URLs
  const searchEngines = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    brave: 'https://search.brave.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    yahoo: 'https://search.yahoo.com/search?p=',
    ecosia: 'https://www.ecosia.org/search?q='
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Open URL from navigation state
  useEffect(() => {
    if (location.state?.url) {
      navigateTo(location.state.url);
    }
  }, [location.state]);

  const loadSettings = async () => {
    try {
      const { storage } = await import('../Components/Storage/clientStorage.js');
      await storage.init();
      const saved = await storage.loadSettings();
      if (saved) {
        setSettings(saved);
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const createTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'New Tab',
      url: '',
      loading: false
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setUrlInput('');
  };

  const closeTab = (tabId) => {
    if (tabs.length === 1) {
      createTab();
    }
    setTabs(prev => prev.filter(t => t.id !== tabId));
    if (activeTabId === tabId) {
      const remaining = tabs.filter(t => t.id !== tabId);
      if (remaining.length > 0) {
        setActiveTabId(remaining[remaining.length - 1].id);
      }
    }
  };

  const navigateTo = (url) => {
    if (!url) return;
    
    // Add https if not present
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it's a search query or URL
      if (url.includes('.') && !url.includes(' ')) {
        finalUrl = 'https://' + url;
      } else {
        // Use selected search engine
        const searchEngine = settings.browser?.searchEngine || 'google';
        const searchUrl = searchEngines[searchEngine] || searchEngines.google;
        finalUrl = `${searchUrl}${encodeURIComponent(url)}`;
      }
    }

    setTabs(prev => prev.map(t => 
      t.id === activeTabId 
        ? { ...t, url: finalUrl, title: new URL(finalUrl).hostname, loading: true }
        : t
    ));

    // Simulate loading
    setTimeout(() => {
      setTabs(prev => prev.map(t => 
        t.id === activeTabId 
          ? { ...t, loading: false }
          : t
      ));
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateTo(urlInput);
  };

  const addBookmark = () => {
    if (activeTab?.url) {
      const newBookmark = {
        id: Date.now(),
        title: activeTab.title,
        url: activeTab.url,
        favicon: `https://www.google.com/s2/favicons?domain=${new URL(activeTab.url).hostname}`
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };

  const goHome = () => {
    setTabs(prev => prev.map(t => 
      t.id === activeTabId 
        ? { ...t, url: '', title: 'New Tab' }
        : t
    ));
    setUrlInput('');
  };

  const refresh = () => {
    if (activeTab?.url) {
      setTabs(prev => prev.map(t => 
        t.id === activeTabId 
          ? { ...t, loading: true }
          : t
      ));
      setTimeout(() => {
        setTabs(prev => prev.map(t => 
          t.id === activeTabId 
            ? { ...t, loading: false }
            : t
        ));
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground type="gradient" accentColor={accentColor} />
      
      <div className="relative z-10 p-4 sm:p-6 h-screen flex flex-col max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Link to={createPageUrl('Dashboard')}>
              <NeonButton variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </NeonButton>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Browser</h1>
              <p className="text-white/50 text-sm">Private sandboxed browsing</p>
            </div>
          </div>
        </motion.header>

        {/* Browser Window */}
        <GlassCard className="flex-grow flex flex-col overflow-hidden" hover={false}>
          {/* Tabs Bar */}
          <div className="flex items-center gap-1 p-2 border-b border-white/10 overflow-x-auto">
            <AnimatePresence mode="popLayout">
              {tabs.map(tab => (
                <BrowserTab
                  key={tab.id}
                  tab={tab}
                  isActive={tab.id === activeTabId}
                  onSelect={() => {
                    setActiveTabId(tab.id);
                    setUrlInput(tab.url);
                  }}
                  onClose={() => closeTab(tab.id)}
                  accentColor={accentColor}
                />
              ))}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={createTab}
              className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center gap-2 p-3 border-b border-white/10">
            <div className="flex items-center gap-1">
              <NeonButton variant="ghost" size="icon" disabled>
                <ArrowLeft className="w-4 h-4" />
              </NeonButton>
              <NeonButton variant="ghost" size="icon" disabled>
                <ArrowRight className="w-4 h-4" />
              </NeonButton>
              <NeonButton variant="ghost" size="icon" onClick={refresh}>
                <RotateCw className={`w-4 h-4 ${activeTab?.loading ? 'animate-spin' : ''}`} />
              </NeonButton>
              <NeonButton variant="ghost" size="icon" onClick={goHome}>
                <Home className="w-4 h-4" />
              </NeonButton>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Search or enter URL..."
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white h-9"
                />
              </div>
            </form>

            <NeonButton variant="ghost" size="icon" onClick={addBookmark}>
              <Star className="w-4 h-4" />
            </NeonButton>
            <NeonButton 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              <Bookmark className="w-4 h-4" />
            </NeonButton>
          </div>

          {/* Content Area */}
          <div className="flex-grow relative">
            {activeTab?.url ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <motion.div 
                  className="text-center p-8 max-w-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">External Link</h3>
                  <p className="text-white/70 mb-4">{activeTab.title}</p>
                  <p className="text-sm text-white/50 mb-6">
                    For security, external sites open in a new window
                  </p>
                  <NeonButton
                    onClick={() => window.open(activeTab.url, '_blank')}
                    className="gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Open in New Window
                  </NeonButton>
                  <button
                    onClick={() => {
                      setTabs(prev => prev.map(t => 
                        t.id === activeTabId ? { ...t, url: '', title: 'New Tab' } : t
                      ));
                      setUrlInput('');
                    }}
                    className="mt-3 text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    Go back
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8">
                {/* New Tab Page */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
                  <p className="text-white/50">Search or enter a URL to get started</p>
                </motion.div>

                {/* Bookmarks Grid */}
                {showBookmarks && (
                  <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {bookmarks.map((bookmark, index) => (
                      <motion.button
                        key={bookmark.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        onClick={() => {
                          setUrlInput(bookmark.url);
                          navigateTo(bookmark.url);
                        }}
                        className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-center"
                      >
                        <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-white/10 flex items-center justify-center">
                          {bookmark.favicon ? (
                            <img src={bookmark.favicon} alt="" className="w-6 h-6" />
                          ) : (
                            <Globe className="w-5 h-5 text-white/50" />
                          )}
                        </div>
                        <span className="text-sm text-white/70 group-hover:text-white truncate block">
                          {bookmark.title}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}