import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Tv, Film, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import AnimatedBackground from '../Components/UI/AnimatedBackground';
import GlassCard from '../Components/UI/GlassCard.js';
import NeonButton from '../Components/UI/NeonButton.js';
import ServiceCard from '../Components/Videos/ServiceCard';

const VIDEO_SERVICES = [
  { 
    id: 'youtube', 
    name: 'YouTube', 
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=225&fit=crop',
    color: '#ff0000',
    type: 'embed',
    description: 'Watch videos, shorts & live streams',
    url: 'https://www.youtube.com'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=225&fit=crop',
    color: '#00f2ea',
    type: 'embed',
    description: 'Short-form video content',
    url: 'https://www.tiktok.com'
  },
  { 
    id: 'netflix', 
    name: 'Netflix', 
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=225&fit=crop',
    color: '#e50914',
    type: 'external',
    description: 'Movies & TV shows (subscription)',
    url: 'https://www.netflix.com'
  },
  { 
    id: 'disney', 
    name: 'Disney+', 
    thumbnail: 'https://images.unsplash.com/photo-1640499900704-b00dd6a1103a?w=400&h=225&fit=crop',
    color: '#113ccf',
    type: 'external',
    description: 'Disney, Marvel, Star Wars & more',
    url: 'https://www.disneyplus.com'
  },
  { 
    id: 'hulu', 
    name: 'Hulu', 
    thumbnail: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=225&fit=crop',
    color: '#1ce783',
    type: 'external',
    description: 'TV shows & original content',
    url: 'https://www.hulu.com'
  },
  { 
    id: 'prime', 
    name: 'Prime Video', 
    thumbnail: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=225&fit=crop',
    color: '#00a8e1',
    type: 'external',
    description: 'Amazon original series & movies',
    url: 'https://www.primevideo.com'
  },
  { 
    id: 'peacock', 
    name: 'Peacock', 
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&fit=crop',
    color: '#000000',
    type: 'embed',
    description: 'NBC content & live sports',
    url: 'https://www.peacocktv.com'
  },
  { 
    id: 'twitch', 
    name: 'Twitch', 
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
    color: '#9146ff',
    type: 'embed',
    description: 'Live streaming & gaming',
    url: 'https://www.twitch.tv'
  },
];

export default function Videos() {
  const [activeService, setActiveService] = useState(null);
  const [connectedServices, setConnectedServices] = useState(['youtube']);
  const [category, setCategory] = useState('all');

  const accentColor = '#ff9f43';

  const categories = [
    { id: 'all', label: 'All Services', icon: Tv },
    { id: 'embed', label: 'Embedded', icon: Play },
    { id: 'external', label: 'External', icon: Film },
  ];

  const filteredServices = VIDEO_SERVICES.filter(service => 
    category === 'all' || service.type === category
  );

  const launchService = (service) => {
    if (service.type === 'external') {
      window.open(service.url, '_blank');
    } else {
      setActiveService(service);
    }
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
              <h1 className="text-3xl font-bold text-white">Videos</h1>
              <p className="text-white/50">Stream from your favorite platforms</p>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat.id
                    ? 'text-white'
                    : 'bg-white/5 text-white/50 hover:text-white/70'
                }`}
                style={{
                  backgroundColor: category === cat.id ? accentColor : undefined
                }}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.header>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.05 * index }}
              >
                <ServiceCard
                  service={service}
                  onLaunch={launchService}
                  isConnected={connectedServices.includes(service.id)}
                  accentColor={accentColor}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Embedded Player Modal */}
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
                className="w-full max-w-6xl h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="w-full h-full p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: activeService.color }}
                      >
                        {activeService.name[0]}
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
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
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