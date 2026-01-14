import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';
import GlassCard from '../UI/GlassCard.js';
import { Slider } from '../UI/slider.js';

export default function MusicPlayer({ 
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  accentColor = '#1db954'
}) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.play().catch(err => console.error('Audio play failed:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying, track]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    setCurrentTime(current);
    setProgress((current / total) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = ([val]) => {
    if (!audioRef.current) return;
    const newTime = (val / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(val);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!track) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
      />
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
            <span className="text-xs text-white/40">{formatTime(currentTime)}</span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="flex-grow"
            />
            <span className="text-xs text-white/40">{formatTime(duration)}</span>
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
            onClick={onPrevious}
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
            onClick={onNext}
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
    </>
  );
}