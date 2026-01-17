import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Sparkles, Bell } from 'lucide-react';
import { createPageUrl } from 'utils';
import { session, storage } from './Components/Storage/clientStorage.js';
import KeyboardHandler from './Components/UI/KeyboardHandler.js';
import WidgetsOverlay from './Components/Widgets/WidgetsOverlay.js';
import Sidebar from './Components/UI/Sidebar.js';
import { useNotifications, NotificationCenter, NotificationToast } from './Components/Notifications/NotificationCenter.js';
import ScheduleTracker from './Components/Schedule/ScheduleTracker.js';
import DecoyScreen from './Components/Stealth/DecoyScreen.js';
import { AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchMode, setSearchMode] = useState('browser'); // 'browser' or 'ai'
  const [lastActivity, setLastActivity] = useState(Date.now());
  const lastActivityRef = useRef(Date.now());
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [activeToasts, setActiveToasts] = useState([]);
  const [showDecoy, setShowDecoy] = useState(false);
  const [decoyReason, setDecoyReason] = useState('idle');
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(72);
  const notifications = useNotifications();

  // Expose notifications globally
  useEffect(() => {
    window.nexusNotifications = {
      show: (notification) => {
        const newNotif = notifications.addNotification(notification);
        setActiveToasts(prev => [...prev, newNotif]);
      }
    };
    return () => {
      delete window.nexusNotifications;
    };
  }, [notifications]);

  const [sessionId] = useState(() => {
    // Generate unique session ID
    const existing = sessionStorage.getItem('nexus_session_id');
    if (existing) return existing;
    const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('nexus_session_id', newId);
    return newId;
  });

  // Tab title and favicon morphing for stealth
  useEffect(() => {
    const getFakeTitle = () => {
      try {
        const settings = JSON.parse(localStorage.getItem('nexus_settings') || '{}');
        return settings.accessibility?.fakeTabName || 'IXL - Math Practice';
      } catch {
        return 'IXL - Math Practice';
      }
    };

    const originalTitle = 'Nexus - Student Hub';
    const originalFavicon = '/favicon.ico';
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is not active - disguise it
        const fakeTitle = getFakeTitle();
        document.title = fakeTitle;
        // Change favicon to neutral study icon
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.rel = 'icon';
        link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="70" text-anchor="middle" fill="%23333">📚</text></svg>';
        if (!document.querySelector("link[rel*='icon']")) {
          document.head.appendChild(link);
        }
      } else {
        // Tab is active - show real title
        document.title = originalTitle;
        const link = document.querySelector("link[rel*='icon']");
        if (link) {
          link.href = originalFavicon;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Boss Key Handler
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('nexus_settings') || '{}');
    const stealthSettings = settings.stealth || {};
    
    const handleBossKey = (e) => {
      if (!stealthSettings.bossKeyEnabled) return;
      
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowDecoy(prev => !prev);
        setDecoyReason('bosskey');
      }
    };

    document.addEventListener('keydown', handleBossKey);
    return () => document.removeEventListener('keydown', handleBossKey);
  }, []);

  // Idle Decoy Mode
  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('nexus_settings') || '{}');
    const stealthSettings = settings.stealth || {};
    
    if (!stealthSettings.idleDecoyEnabled || showDecoy) return;

    let idleTimeout;
    const resetIdleTimer = () => {
      setLastActivity(Date.now());
      clearTimeout(idleTimeout);
      
      const timeoutMinutes = stealthSettings.idleDecoyTimeout || 3;
      idleTimeout = setTimeout(() => {
        setShowDecoy(true);
        setDecoyReason('idle');
      }, timeoutMinutes * 60 * 1000);
    };

    // Activity listeners
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Initialize idle timer
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimeout);
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [showDecoy]);
  
  // Monitor for admin kicks, bans, and timeouts
  useEffect(() => {
    // Track user activity
    const handleActivity = () => {
      const now = Date.now();
      lastActivityRef.current = now;
      setLastActivity(now);
    };
    
    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    const checkKickStatus = () => {
      try {
        const kickList = JSON.parse(localStorage.getItem('nexus_kick_list') || '[]');
        const kicked = kickList.find(k => k.sessionId === sessionId);
        
        if (kicked) {
          // User has been kicked
          localStorage.removeItem('nexus_kick_list');
          sessionStorage.clear();
          window.location.href = createPageUrl('Landing');
        }
      } catch (err) {
        console.error('Kick check failed:', err);
      }
    };
    
    const checkBanStatus = () => {
      try {
        const accessCode = session.getAccessCode();
        if (!accessCode) return;
        
        // Check if user got banned during their session
        if (storage.isBanned(accessCode)) {
          const banInfo = storage.getBanInfo(accessCode);
          let message = 'Your account has been banned.';
          if (banInfo && !banInfo.isPermanent) {
            const minutesLeft = Math.ceil(banInfo.timeRemaining / 60000);
            message = `Your account has been temporarily banned. Try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`;
          }
          
          alert(message);
          session.clear();
          sessionStorage.clear();
          window.location.href = createPageUrl('Landing');
        }
      } catch (err) {
        console.error('Ban check failed:', err);
      }
    };

    // Update heartbeat for active sessions tracking
    const updateHeartbeat = () => {
      try {
        const sessions = JSON.parse(localStorage.getItem('nexus_active_sessions') || '[]');
        const email = localStorage.getItem('nexus_user_email') || sessionStorage.getItem('nexus_user_email') || 'Anonymous';
        const role = sessionStorage.getItem('nexus_role') || 'guest';
        
        // Remove old session entries for this sessionId
        const filtered = sessions.filter(s => s.sessionId !== sessionId);
        
        // Add current session with role
        filtered.push({
          sessionId,
          email,
          role,
          lastSeen: Date.now()
        });
        
        // Keep only last 50 sessions
        const recent = filtered.slice(-50);
        localStorage.setItem('nexus_active_sessions', JSON.stringify(recent));
      } catch (err) {
        console.error('Heartbeat failed:', err);
      }
    };

    // Check for session timeout (30 minutes of inactivity)
    const checkTimeout = () => {
      const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
      const inactive = Date.now() - lastActivityRef.current;
      
      if (inactive > TIMEOUT_DURATION) {
        alert('Your session has expired due to inactivity. Please login again.');
        session.clear();
        sessionStorage.clear();
        navigate(createPageUrl('Landing'));
      }
    };

    // Check for kicks every second
    const kickInterval = setInterval(checkKickStatus, 1000);
    
    // Check for bans every 5 seconds
    const banInterval = setInterval(checkBanStatus, 5000);
    
    // Check for timeout every 60 seconds
    const timeoutInterval = setInterval(checkTimeout, 60000);
    
    // Update heartbeat every 10 seconds
    updateHeartbeat();
    const heartbeatInterval = setInterval(updateHeartbeat, 10000);
    
    return () => {
      clearInterval(kickInterval);
      clearInterval(banInterval);
      clearInterval(timeoutInterval);
      clearInterval(heartbeatInterval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [sessionId, navigate]);
  
  // Don't show search bar on Browser or StudyTools page
  const isBrowserPage = location.pathname.includes('/browser');
  const isStudyToolsPage = location.pathname.includes('/study');
  const isLandingPage = location.pathname.includes('/landing') || location.pathname === '/';
  const isAuthPage = location.pathname.includes('/auth');
  const isConsentPage = location.pathname.includes('/consent');
  const shouldHideUI = isLandingPage || isAuthPage || isConsentPage;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      if (searchMode === 'browser') {
        navigate(createPageUrl('Browser'), { state: { url: searchInput.trim() } });
      } else {
        // Navigate to StudyTools with AI query
        navigate(createPageUrl('StudyTools'), { state: { aiQuery: searchInput.trim() } });
      }
      setSearchInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]" style={{ paddingLeft: shouldHideUI ? 0 : sidebarWidth }}>
      {/* Global Keyboard Shortcuts Handler */}
      {!shouldHideUI && <KeyboardHandler />}
      {/* Opera-style Sidebar */}
      {!shouldHideUI && <Sidebar onWidthChange={setSidebarWidth} />}
      {/* Sidebar Widgets Overlay (only when not docked) */}
      {!shouldHideUI && <WidgetsOverlay />}
      
      {/* Universal Search Bar */}
      {!shouldHideUI && !isBrowserPage && !isStudyToolsPage && (
        <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto flex items-center gap-2">
              {/* Mode Toggle */}
              <button
                type="button"
                onClick={() => setSearchMode(searchMode === 'browser' ? 'ai' : 'browser')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  searchMode === 'ai' 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}
                title={`Switch to ${searchMode === 'browser' ? 'AI' : 'Browser'} mode`}
              >
                {searchMode === 'browser' ? (
                  <Search className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span className="text-sm font-medium hidden sm:inline">
                  {searchMode === 'browser' ? 'Browser' : 'AI'}
                </span>
              </button>
              
              {/* Search Input */}
              <div className="relative flex-1">
                {searchMode === 'browser' ? (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
                ) : (
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/50" />
                )}
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    searchMode === 'browser' 
                      ? "Search or enter URL..." 
                      : "Ask AI anything..."
                  }
                  className={`w-full pl-10 pr-4 py-2 bg-white/5 border rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    searchMode === 'ai'
                      ? 'border-purple-500/30 focus:ring-purple-500/50'
                      : 'border-cyan-500/30 focus:ring-cyan-500/50'
                  }`}
                />
              </div>

              {/* Schedule Tracker */}
              <ScheduleTracker />

              {/* Notification Bell */}
              <button
                type="button"
                onClick={() => setNotificationCenterOpen(true)}
                className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-white" />
                {notifications.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        :root {
          --background: 0 0% 3.9%;
          --foreground: 0 0% 98%;
          --card: 0 0% 3.9%;
          --card-foreground: 0 0% 98%;
          --popover: 0 0% 3.9%;
          --popover-foreground: 0 0% 98%;
          --primary: 0 0% 98%;
          --primary-foreground: 0 0% 9%;
          --secondary: 0 0% 14.9%;
          --secondary-foreground: 0 0% 98%;
          --muted: 0 0% 14.9%;
          --muted-foreground: 0 0% 63.9%;
          --accent: 0 0% 14.9%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 14.9%;
          --input: 0 0% 14.9%;
          --ring: 0 0% 83.1%;
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }

        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        body {
          background: #0a0a0f;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Notification Center Modal */}
      <NotificationCenter
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
        notifications={notifications.notifications}
        onMarkAsRead={notifications.markAsRead}
        onMarkAllAsRead={notifications.markAllAsRead}
        onDelete={notifications.deleteNotification}
        onClearAll={notifications.clearAll}
      />
      
      {/* Toast Notifications (bottom right) */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence>
            {activeToasts.map(toast => (
              <NotificationToast
                key={toast.id}
                notification={toast}
                onDismiss={() => setActiveToasts(prev => prev.filter(t => t.id !== toast.id))}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Decoy Screen Overlay (Boss Key or Idle) */}
      {showDecoy && (
        <DecoyScreen 
          onDismiss={() => setShowDecoy(false)} 
          reason={decoyReason}
        />
      )}
      
      {children}
    </div>
  );
}