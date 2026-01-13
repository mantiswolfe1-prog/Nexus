import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageCircle, 
  Users, 
  Bell, 
  ExternalLink,
  Check,
  X as CloseIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import AnimatedBackground from 'components/ui/AnimatedBackground';
import GlassCard from 'components/ui/GlassCard';
import NeonButton from 'components/ui/NeonButton';

const SOCIAL_SERVICES = [
  { 
    id: 'discord', 
    name: 'Discord', 
    color: '#5865f2',
    icon: '💬',
    description: 'Chat with friends & communities',
    url: 'https://discord.com/app',
    connected: true
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    color: '#e4405f',
    icon: '📸',
    description: 'Photo & video sharing',
    url: 'https://www.instagram.com',
    connected: false
  },
  { 
    id: 'twitter', 
    name: 'X (Twitter)', 
    color: '#1da1f2',
    icon: '🐦',
    description: 'Microblogging & news',
    url: 'https://twitter.com',
    connected: false
  },
  { 
    id: 'reddit', 
    name: 'Reddit', 
    color: '#ff4500',
    icon: '🔴',
    description: 'Forums & discussions',
    url: 'https://www.reddit.com',
    connected: false
  },
  { 
    id: 'snapchat', 
    name: 'Snapchat', 
    color: '#fffc00',
    icon: '👻',
    description: 'Photo & video messaging',
    url: 'https://www.snapchat.com',
    connected: false
  },
];

const SAMPLE_ACTIVITY = [
  { id: 1, platform: 'Discord', message: 'New message in #general', time: '2m ago', icon: '💬' },
  { id: 2, platform: 'Discord', message: 'Study Group is live!', time: '15m ago', icon: '🎙️' },
  { id: 3, platform: 'Reddit', message: 'Your post got 50 upvotes', time: '1h ago', icon: '⬆️' },
];

export default function Social() {
  const [activeService, setActiveService] = useState(null);
  const [services, setServices] = useState(SOCIAL_SERVICES);

  const accentColor = '#5865f2';

  const toggleConnection = (serviceId) => {
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, connected: !s.connected } : s
    ));
  };

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
              <h1 className="text-3xl font-bold text-white">Social</h1>
              <p className="text-white/50">Connect with friends & communities</p>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: accentColor }} />
              Your Platforms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <GlassCard className="p-4" accentColor={service.color}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: service.color + '30' }}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{service.name}</h3>
                          <p className="text-xs text-white/50">{service.description}</p>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        service.connected 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {service.connected ? <Check className="w-3 h-3" /> : <CloseIcon className="w-3 h-3" />}
                        {service.connected ? 'Connected' : 'Not connected'}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <NeonButton 
                        className="flex-grow justify-center"
                        onClick={() => setActiveService(service)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </NeonButton>
                      <NeonButton 
                        variant="ghost"
                        onClick={() => toggleConnection(service.id)}
                      >
                        {service.connected ? 'Disconnect' : 'Connect'}
                      </NeonButton>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" style={{ color: accentColor }} />
              Recent Activity
            </h2>
            <GlassCard className="p-4" hover={false}>
              <div className="space-y-4">
                {SAMPLE_ACTIVITY.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm text-white truncate">{activity.message}</p>
                      <p className="text-xs text-white/40">{activity.platform} • {activity.time}</p>
                    </div>
                  </motion.div>
                ))}

                {SAMPLE_ACTIVITY.length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <div className="mt-4">
              <GlassCard className="p-4" hover={false}>
                <h3 className="text-sm font-medium text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 text-left text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Open Discord
                  </button>
                  <button className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 text-left text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notification Settings
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setActiveService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-5xl h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="w-full h-full p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ backgroundColor: activeService.color }}
                      >
                        {activeService.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{activeService.name}</h2>
                        <p className="text-sm text-white/50">{activeService.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <NeonButton 
                        variant="ghost"
                        onClick={() => window.open(activeService.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in New Tab
                      </NeonButton>
                      <NeonButton variant="ghost" onClick={() => setActiveService(null)}>
                        Close
                      </NeonButton>
                    </div>
                  </div>
                  <div className="w-full h-[calc(100%-80px)] bg-black rounded-xl overflow-hidden">
                    <iframe
                      src={activeService.url}
                      className="w-full h-full border-0"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}