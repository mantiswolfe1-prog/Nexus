import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import { Slider } from '../UI/slider';

export default function MusicPlayer({ 
  track,
  isPlaying,
  onPlayPause,
  accentColor = '#1db954'
}) {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  if (!track) return null;

  return (
    <GlassCard className="p-4" accentColor={accentColor} hover={false}>
      <div className="flex items-center gap-4">
        {/* Album Art */}
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0"
          animate={isPlaying ? { rotate: [0, 360] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <img 
            src={track.albumArt} 
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Track Info */}
        <div className="flex-grow min-w-0">
          <h4 className="font-semibold text-white truncate">{track.title}</h4>
          <p className="text-sm text-white/50 truncate">{track.artist}</p>
          
          {/* Progress Bar */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-white/40">1:24</span>
            <Slider
              value={[progress]}
              onValueChange={([val]) => setProgress(val)}
              max={100}
              step={1}
              className="flex-grow"
            />
            <span className="text-xs text-white/40">3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white/50 hover:text-white transition-colors hidden sm:block"
          >
            <Shuffle className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPlayPause}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: accentColor }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-white/50 hover:text-white transition-colors hidden sm:block"
          >
            <Repeat className="w-4 h-4" />
          </motion.button>

          {/* Volume */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </motion.button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={([val]) => {
                setVolume(val);
                setIsMuted(false);
              }}
              max={100}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}