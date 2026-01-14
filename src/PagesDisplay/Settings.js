import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Palette, 
  Monitor, 
  Cpu,
  Layers,
  Gamepad2,
  Boxes,
  Brain,
  Key,
  Shield,
  LogOut,
  Save,
  Download,
  Trash2,
  Search,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils.js';
import NeonButton from '../Components/UI/NeonButton.js';
import { Input } from '../Components/UI/input.js';
import { storage, session } from '../Components/Storage/clientStorage.js';
import SoftParticleDrift from '../Components/Backgrounds/SoftParticleDrift.js';
import SettingsSection from '../Components/Settings/SettingsSection.js';
import SettingControl from '../Components/Settings/SettingControl.js';
import DeviceProfileManager from '../Components/Settings/DeviceProfileManager.js';
import DiscordVerification from '../Components/Settings/DiscordVerification.js';

const BUILD_VERSION = 'v1.0.0-beta';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: { background: '#0a0a0f', accent: '#00f0ff', text: '#ffffff' },
    background: { type: 'soft-particle-drift', particleCount: 50, speed: 0.5, opacity: 0.4, blur: 2 },
    performance: { targetFPS: 60, ramLimit: 1024, animationScale: 1, widgetLimit: 3, adaptivePerf: true, showFPS: false },
    games: { fullscreenOnLaunch: true, escToClose: true, lazyLoadStrength: 'medium' },
    widgets: { enabled: false, spotify: false, youtube: false, tiktok: false, autoDisable: true },
    aiTools: { enabled: false, autoSuggest: true, personality: 'adaptive' },
    browser: { openLinksIn: 'nexus', searchEngine: 'google' },
    lowEndMode: false
  });
  
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([
    { id: 'default', name: 'Default', device: 'Standard' }
  ]);
  const [activeProfile, setActiveProfile] = useState('default');
  const [accessCode, setAccessCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [regenerateCooldown, setRegenerateCooldown] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadSettings();
    const interval = setInterval(() => {
      if (regenerateCooldown > 0) setRegenerateCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [regenerateCooldown]);

  const loadSettings = async () => {
    try {
      const accountCode = session.get();
      if (!accountCode) {
        navigate(createPageUrl('Landing'));
        return;
      }

      const role = session.getRole();
      setUserRole(role);
      setIsAdmin(session.isAdmin());
      setAccessCode(accountCode);
      
      // Load invite code if admin or owner
      if (session.isAdmin()) {
        const code = storage.getInviteCode();
        setInviteCode(code);
      }

      await storage.init();
      const userData = await storage.loadUser(accountCode);
      const userSettings = await storage.loadSettings();

      setUser(userData);
      if (userSettings) {
        setSettings(prev => ({ ...prev, ...userSettings }));
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (path, value) => {
    const keys = path.split('.');
    setSettings(prev => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      // Auto-save to localStorage immediately
      storage.saveSettings(updated);
      
      return updated;
    });
    storage.saveSettings({ ...settings });
  };

  const saveSettings = async () => {
    try {
      await storage.saveSettings(settings);
      alert('Settings saved!');
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  const exportData = async () => {
    const data = await storage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAllData = async () => {
    if (!confirm('Delete ALL data? This cannot be undone.')) return;
    await storage.deleteAllData();
    session.clear();
    navigate(createPageUrl('Landing'));
  };

  const handleLogout = () => {
    session.clear();
    navigate(createPageUrl('Landing'));
  };

  const regenerateInviteCode = () => {
    if (regenerateCooldown > 0) return;
    
    if (!confirm('Generate a new invite code? The old one will no longer work for new users!')) return;
    
    const newCode = storage.regenerateInviteCode();
    setInviteCode(newCode);
    setRegenerateCooldown(10);
    
    alert(`New invite code: ${newCode}\n\nShare this with new users. It will auto-regenerate after someone uses it.`);
  };

  const createProfile = (name) => {
    const newProfile = {
      id: Date.now().toString(),
      name,
      device: 'Custom',
      settings: { ...settings }
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const switchProfile = (id) => {
    setActiveProfile(id);
    const profile = profiles.find(p => p.id === id);
    if (profile?.settings) {
      setSettings(profile.settings);
    }
  };

  const deleteProfile = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeProfile === id) setActiveProfile('default');
  };

  const sections = useMemo(() => {
    const allSections = [
      {
        id: 'account',
        title: 'Account & Verification',
        icon: Key,
        keywords: ['account', 'access', 'code', 'login', 'regenerate', 'discord', 'verify'],
        custom: (
          <div className="space-y-4">
            {/* Discord Verification */}
            <DiscordVerification role={userRole} />

            {/* Role Upgrade Options */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
              <h4 className="text-white font-medium mb-3">Upgrade Your Account</h4>
              
              {userRole === 'guest' && (
                <div className="space-y-2">
                  <p className="text-white/60 text-sm mb-3">
                    Ready to unlock premium features?
                  </p>
                  <a
                    href="https://discord.gg/nexushub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <NeonButton className="w-full">
                      ✨ Ready to Verify? Join Discord
                    </NeonButton>
                  </a>
                  <p className="text-xs text-white/40 mt-2">
                    Verify your Discord membership to become a Verified user with full access!
                  </p>
                </div>
              )}
              
              {userRole === 'verified' && (
                <div className="space-y-2">
                  <p className="text-white/60 text-sm mb-3">
                    Enjoying Nexus? You already have full access to all features!
                  </p>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <strong>Verified User</strong> - Complete access unlocked
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      You have access to all games, features, and tools. Thanks for being part of Nexus!
                    </p>
                  </div>
                </div>
              )}
              
              {(userRole === 'admin' || userRole === 'owner') && (
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-5 h-5" />
                  <p className="text-sm">You have {userRole === 'owner' ? 'Owner' : 'Admin'} privileges - highest access level!</p>
                </div>
              )}
            </div>

            {/* Admin Invite Code Management */}
            {isAdmin && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <h4 className="text-cyan-400 font-medium mb-2">Admin Invite Code</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 rounded-lg bg-black/30 font-mono text-cyan-400 text-xl text-center tracking-wider font-bold">
                      {showInviteCode ? inviteCode : '••••••••'}
                    </div>
                    <button
                      onClick={() => setShowInviteCode(!showInviteCode)}
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
                      title={showInviteCode ? 'Hide code' : 'Show code'}
                    >
                      {showInviteCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(inviteCode);
                        alert('Invite code copied!');
                      }}
                      className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors text-sm font-medium"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Share this code with new users. It will auto-regenerate after someone uses it.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-medium mb-2">Manual Regenerate</h4>
                  <p className="text-white/60 text-sm mb-3">
                    Generate a new invite code (old one will no longer work).
                  </p>
                  <NeonButton
                    onClick={regenerateInviteCode}
                    disabled={regenerateCooldown > 0}
                    className="w-full"
                  >
                    {regenerateCooldown > 0 ? `Wait ${regenerateCooldown}s` : 'Regenerate Invite Code'}
                  </NeonButton>
                </div>
              </div>
            )}

            {/* User Access Code */}
            {!isAdmin && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4 border-t border-white/10">
                <h4 className="text-white font-medium mb-2">Your Access Code</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-lg bg-black/30 font-mono text-cyan-400 text-lg text-center tracking-wider">
                    {showAccessCode ? accessCode : '•'.repeat(accessCode.length || 8)}
                  </div>
                  <button
                    onClick={() => setShowAccessCode(!showAccessCode)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title={showAccessCode ? 'Hide code' : 'Show code'}
                  >
                    {showAccessCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(accessCode)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  This is your login code. Save it somewhere safe!
                </p>
              </div>
            )}
          </div>
        )
      },
      {
        id: 'theme',
        title: 'Theme & Colors',
        icon: Palette,
        keywords: ['color', 'background', 'accent', 'text', 'theme'],
        controls: [
          { path: 'theme.background', title: 'Background Color', description: 'Main page background', type: 'color', value: settings.theme.background },
          { path: 'theme.accent', title: 'Accent/Hover Color', description: 'Buttons and highlights', type: 'color', value: settings.theme.accent },
          { path: 'theme.text', title: 'Text Color', description: 'Primary text color', type: 'color', value: settings.theme.text }
        ]
      },
      {
        id: 'backgrounds',
        title: 'Backgrounds & Animations',
        icon: Monitor,
        keywords: ['background', 'particle', 'animation', 'blur', 'motion'],
        controls: [
          { path: 'background.particleCount', title: 'Particle Count', description: 'Number of animated particles', type: 'slider', value: settings.background.particleCount, min: 20, max: 100 },
          { path: 'background.speed', title: 'Motion Speed', description: 'Particle movement speed', type: 'slider', value: settings.background.speed, min: 0.1, max: 2, step: 0.1 },
          { path: 'background.opacity', title: 'Opacity', description: 'Particle visibility', type: 'slider', value: settings.background.opacity, min: 0.1, max: 1, step: 0.1 },
          { path: 'background.blur', title: 'Blur Intensity', description: 'Glow effect strength', type: 'slider', value: settings.background.blur, min: 0, max: 5 }
        ]
      },
      {
        id: 'performance',
        title: 'Performance Behavior',
        icon: Cpu,
        keywords: ['fps', 'performance', 'ram', 'animation', 'adaptive', 'optimize'],
        controls: [
          { path: 'performance.showFPS', title: 'FPS Counter', description: 'Show FPS monitor', type: 'toggle', value: settings.performance.showFPS },
          { path: 'performance.targetFPS', title: 'Target FPS', description: 'Preferred frame rate', type: 'slider', value: settings.performance.targetFPS, min: 15, max: 60, suffix: ' FPS' },
          { path: 'performance.ramLimit', title: 'RAM Soft Limit', description: 'Memory threshold (MB)', type: 'slider', value: settings.performance.ramLimit, min: 512, max: 4096, suffix: ' MB' },
          { path: 'performance.animationScale', title: 'Animation Scaling', description: 'Detail reduction strength', type: 'slider', value: settings.performance.animationScale, min: 0.5, max: 1, step: 0.1 },
          { path: 'performance.widgetLimit', title: 'Widget Limit', description: 'Max concurrent widgets', type: 'slider', value: settings.performance.widgetLimit, min: 1, max: 5 },
          { path: 'performance.adaptivePerf', title: 'Adaptive Performance', description: 'Auto-adjust quality', type: 'toggle', value: settings.performance.adaptivePerf }
        ]
      },
      {
        id: 'devices',
        title: 'Device Profiles',
        icon: Layers,
        keywords: ['device', 'profile', 'chromebook', 'pc', 'switch'],
        custom: <DeviceProfileManager profiles={profiles} activeProfile={activeProfile} onSwitch={switchProfile} onCreate={createProfile} onDelete={deleteProfile} />
      },
      {
        id: 'games',
        title: 'Games & Iframes',
        icon: Gamepad2,
        keywords: ['game', 'iframe', 'fullscreen', 'esc', 'lazy'],
        controls: [
          { path: 'games.fullscreenOnLaunch', title: 'Fullscreen on Launch', description: 'Auto-fullscreen games', type: 'toggle', value: settings.games.fullscreenOnLaunch },
          { path: 'games.escToClose', title: 'ESC to Close', description: 'Press ESC to exit games', type: 'toggle', value: settings.games.escToClose },
          { path: 'games.lazyLoadStrength', title: 'Lazy Load Strength', description: 'Resource loading strategy', type: 'dropdown', value: settings.games.lazyLoadStrength, options: [
            { value: 'low', label: 'Low (load all)' },
            { value: 'medium', label: 'Medium (smart)' },
            { value: 'high', label: 'High (minimal)' }
          ]}
        ]
      },
      {
        id: 'browser',
        title: 'Browser Settings',
        icon: Globe,
        keywords: ['browser', 'links', 'open', 'external', 'nexus', 'search', 'engine'],
        controls: [
          { path: 'browser.openLinksIn', title: 'Open Links In', description: 'Where to open game & video links', type: 'dropdown', value: settings.browser?.openLinksIn || 'nexus', options: [
            { value: 'nexus', label: 'Nexus Browser (Built-in)' },
            { value: 'external', label: 'External Browser' }
          ]},
          { path: 'browser.searchEngine', title: 'Search Engine', description: 'Default search engine for queries', type: 'dropdown', value: settings.browser?.searchEngine || 'google', options: [
            { value: 'google', label: 'Google' },
            { value: 'duckduckgo', label: 'DuckDuckGo' },
            { value: 'brave', label: 'Brave Search' },
            { value: 'bing', label: 'Bing' },
            { value: 'yahoo', label: 'Yahoo' },
            { value: 'ecosia', label: 'Ecosia' }
          ]}
        ]
      },
      {
        id: 'widgets',
        title: 'Widgets',
        icon: Boxes,
        keywords: ['widget', 'spotify', 'youtube', 'tiktok', 'sidebar'],
        controls: [
          { path: 'widgets.enabled', title: 'Enable Widgets', description: 'Show sidebar widgets', type: 'toggle', value: settings.widgets.enabled },
          { path: 'widgets.spotify', title: 'Spotify Widget', description: 'Music player widget', type: 'toggle', value: settings.widgets.spotify },
          { path: 'widgets.youtube', title: 'YouTube Widget', description: 'Video feed widget', type: 'toggle', value: settings.widgets.youtube },
          { path: 'widgets.tiktok', title: 'TikTok Widget', description: 'Short video widget', type: 'toggle', value: settings.widgets.tiktok },
          { path: 'widgets.autoDisable', title: 'Auto-Disable Low Perf', description: 'Disable on low FPS', type: 'toggle', value: settings.widgets.autoDisable }
        ]
      },
      {
        id: 'ai',
        title: 'AI Tools',
        icon: Brain,
        keywords: ['ai', 'assistant', 'suggest', 'chat', 'personality'],
        controls: [
          { path: 'aiTools.enabled', title: 'AI Assistant', description: 'Enable AI features', type: 'toggle', value: settings.aiTools.enabled },
          { path: 'aiTools.autoSuggest', title: 'Auto Suggestions', description: 'AI-powered hints', type: 'toggle', value: settings.aiTools.autoSuggest },
          { path: 'aiTools.personality', title: 'AI Personality Mode', description: 'How your AI assistant communicates', type: 'dropdown', value: settings.aiTools?.personality || 'adaptive', options: [
            { value: 'adaptive', label: '🔄 Adaptive - Mirrors your style' },
            { value: 'kind', label: '💚 Kind - Always encouraging' },
            { value: 'moody', label: '😏 Moody - Witty and sarcastic' },
            { value: 'professional', label: '💼 Professional - Direct and efficient' },
            { value: 'mentor', label: '🎓 Mentor - Educational & detailed' },
            { value: 'chill', label: '😎 Chill - Relaxed and friendly' }
          ]}
        ]
      },
      {
        id: 'account',
        title: 'Account & Access',
        icon: Key,
        keywords: ['account', 'access', 'code', 'login', 'logout'],
        custom: (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-white font-medium mb-1">Username</h4>
              <p className="text-white/70">{user?.username}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-white font-medium mb-2">Access Code</h4>
              <p className="text-white/70 font-mono text-sm">{accessCode}</p>
              <p className="text-white/40 text-xs mt-2">Save this code to log in again (5-20 chars)</p>
            </div>
            <div className="flex gap-2">
              <NeonButton variant="ghost" onClick={exportData} className="flex-1">
                <Download className="w-3 h-3 mr-1" />
                Export Data
              </NeonButton>
              <NeonButton variant="danger" onClick={deleteAllData} className="flex-1">
                <Trash2 className="w-3 h-3 mr-1" />
                Delete All
              </NeonButton>
            </div>
            <NeonButton variant="ghost" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </NeonButton>
          </div>
        )
      }
    ];

    if (isAdmin) {
      allSections.push({
        id: 'admin',
        title: 'Admin Dashboard',
        icon: Shield,
        keywords: ['admin', 'manage', 'users', 'diagnostics'],
        custom: (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <h4 className="text-red-400 font-medium mb-2">Admin Access Active</h4>
              <p className="text-white/60 text-sm">You have elevated privileges. Use responsibly.</p>
            </div>
            <Link to={createPageUrl('AdminDashboard')}>
              <NeonButton variant="primary" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Open Admin Console
              </NeonButton>
            </Link>
          </div>
        )
      });
    }

    return allSections;
  }, [settings, user, profiles, activeProfile, accessCode, regenerateCooldown, isAdmin]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    
    const query = searchQuery.toLowerCase();
    return sections.filter(section => {
      const titleMatch = section.title.toLowerCase().includes(query);
      const keywordMatch = section.keywords?.some(k => k.includes(query));
      const controlMatch = section.controls?.some(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query)
      );
      return titleMatch || keywordMatch || controlMatch;
    });
  }, [sections, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const expanded = {};
      filteredSections.forEach(section => {
        expanded[section.id] = true;
      });
      setExpandedSections(expanded);
    }
  }, [searchQuery, filteredSections]);

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: settings.theme.background, color: settings.theme.text }}>
      <SoftParticleDrift 
        accentColor={settings.theme.accent}
        particleCount={settings.background.particleCount}
        speed={settings.background.speed}
        opacity={settings.background.opacity}
        blur={settings.background.blur}
        lowEndMode={settings.lowEndMode}
      />
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <motion.header 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to={createPageUrl('Dashboard')}>
                <NeonButton variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </NeonButton>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-white/50">Customize your Nexus experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-white/40">Build Version</p>
                <p className="text-sm text-white/70 font-mono">{BUILD_VERSION}</p>
              </div>
              <NeonButton variant="primary" onClick={saveSettings}>
                <Save className="w-4 h-4 mr-2" />
                Save All
              </NeonButton>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search settings... (try 'fps', 'color', 'widget')"
              className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12"
            />
          </div>
        </motion.header>

        {/* Settings Sections */}
        <div className="space-y-4">
          {filteredSections.length === 0 && (
            <div className="text-center py-12 text-white/50">
              No settings found matching "{searchQuery}"
            </div>
          )}
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <SettingsSection
                title={section.title}
                icon={section.icon}
                expanded={expandedSections[section.id] || false}
                onToggle={() => toggleSection(section.id)}
                highlighted={searchQuery.trim() && filteredSections.includes(section)}
              >
                {section.custom ? section.custom : (
                  <div className="space-y-3">
                    {section.controls?.map((control) => (
                      <SettingControl
                        key={control.path}
                        {...control}
                        onChange={(value) => updateSetting(control.path, value)}
                      />
                    ))}
                  </div>
                )}
              </SettingsSection>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to={createPageUrl('Privacy')} className="text-white/40 hover:text-white/60 text-sm transition-colors">
            Privacy & Security Policy
          </Link>
        </motion.div>
      </div>
    </div>
  );
}