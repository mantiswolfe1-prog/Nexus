import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Cpu, ExternalLink } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

export default function GameCard({ 
  game, 
  onPlay, 
  onFavorite,
  isFavorite,
  accentColor = '#ff6b6b'
}) {
  const performanceColors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  return (
    <GlassCard 
      className="overflow-hidden group"
      accentColor={accentColor}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <motion.button
          onClick={() => onPlay(game)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: accentColor + '90' }}
          >
            <ExternalLink className="w-6 h-6 text-white ml-1" />
          </div>
        </motion.button>

        {/* Performance badge */}
        <div 
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
          style={{ 
            backgroundColor: performanceColors[game.performance] + '30',
            color: performanceColors[game.performance]
          }}
        >
          <Cpu className="w-3 h-3" />
          {game.performance === 'low' ? 'Light' : game.performance === 'medium' ? 'Medium' : 'Heavy'}
        </div>

        {/* Favorite button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(game);
          }}
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm bg-black/30 hover:bg-black/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Star 
            className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white/70'}`}
          />
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white truncate">{game.title}</h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {game.playTime || '~5 min'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/10">
            {game.genre}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}