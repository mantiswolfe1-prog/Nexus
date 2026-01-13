import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Music as MusicIcon, Radio, Disc, Heart, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import AnimatedBackground from '../Components/UI/AnimatedBackground';
import GlassCard from '../Components/UI/GlassCard.js';
import NeonButton from '../Components/UI/NeonButton.js';
import MusicPlayer from '../Components/Music/MusicPlayer';

const MUSIC_SERVICES = [
  { 
    id: 'spotify', 
    name: 'Spotify', 
    color: '#1db954',
    icon: '🎵',
    description: 'Your playlists & recommendations',
    url: 'https://open.spotify.com'
  },
  { 
    id: 'apple', 
    name: 'Apple Music', 
    color: '#fc3c44',
    icon: '🎧',
    description: 'Apple Music library',
    url: 'https://music.apple.com'
  },
  { 
    id: 'soundcloud', 
    name: 'SoundCloud', 
    color: '#ff5500',
    icon: '☁️',
    description: 'Discover independent artists',
    url: 'https://soundcloud.com'
  },
  { 
    id: 'youtube', 
    name: 'YouTube Music', 
    color: '#ff0000',
    icon: '▶️',
    description: 'Music videos & audio',
    url: 'https://music.youtube.com'
  },
];

const SAMPLE_TRACKS = [
  { 
    id: 1, 
    title: 'Blinding Lights', 
    artist: 'The Weeknd', 
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    duration: '3:20'
  },
  { 
    id: 2, 
    title: 'Levitating', 
    artist: 'Dua Lipa', 
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop',
    duration: '3:45'
  },
  { 
    id: 3, 
    title: 'Stay', 
    artist: 'The Kid LAROI', 
    albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop',
    duration: '2:21'
  },
  { 
    id: 4, 
    title: 'Good 4 U', 
    artist: 'Olivia Rodrigo', 
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    duration: '2:58'
  },
  { 
    id: 5, 
    title: 'Peaches', 
    artist: 'Justin Bieber', 
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    duration: '3:18'
  },
];

export default function Music() {
  const [activeService, setActiveService] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(SAMPLE_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([1, 3]);

  const accentColor = '#1db954';

  const toggleFavorite = (trackId) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground type="gradient" accentColor={accentColor} />
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-32">
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
              <h1 className="text-3xl font-bold text-white">Music</h1>
              <p className="text-white/50">Stream from your favorite services</p>
            </div>
          </div>
        </motion.header>

        {/* Music Services */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5" style={{ color: accentColor }} />
            Your Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MUSIC_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <GlassCard 
                  className="p-4 cursor-pointer text-center"
                  accentColor={service.color}
                  onClick={() => setActiveService(service)}
                >
                  <div 
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-2xl mb-3"
                    style={{ backgroundColor: service.color + '30' }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-white text-sm">{service.name}</h3>
                  <p className="text-xs text-white/50 mt-1">{service.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recently Played */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: accentColor }} />
            Recently Played
          </h2>
          <GlassCard className="divide-y divide-white/5" hover={false}>
            {SAMPLE_TRACKS.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
                className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                  currentTrack?.id === track.id 
                    ? 'bg-white/5' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={track.albumArt} 
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  {currentTrack?.id === track.id && isPlaying && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            className="w-1 bg-white rounded-full"
                            animate={{ height: [8, 16, 8] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <h4 className={`font-medium truncate ${
                    currentTrack?.id === track.id ? 'text-white' : 'text-white/90'
                  }`} style={currentTrack?.id === track.id ? { color: accentColor } : {}}>
                    {track.title}
                  </h4>
                  <p className="text-sm text-white/50 truncate">{track.artist}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track.id);
                  }}
                  className="p-2"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${
                      favorites.includes(track.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white/30 hover:text-white/50'
                    }`}
                  />
                </motion.button>
                
                <span className="text-sm text-white/40 hidden sm:block">{track.duration}</span>
              </motion.div>
            ))}
          </GlassCard>
        </motion.section>

        {/* Service Player Modal */}
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
                      allow="autoplay; encrypted-media"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Player */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-5xl mx-auto">
          <MusicPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            accentColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
}