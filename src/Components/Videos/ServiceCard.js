import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, X } from 'lucide-react';
import GlassCard from '../UI/GlassCard';

export default function ServiceCard({ 
  service, 
  onLaunch, 
  isConnected,
  accentColor 
}) {
  return (
    <GlassCard 
      className="overflow-hidden group cursor-pointer"
      accentColor={service.color || accentColor}
      onClick={() => onLaunch(service)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={service.thumbnail} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-4xl font-bold text-white drop-shadow-2xl"
          >
            {service.logo || service.name}
          </motion.div>
        </div>

        {/* Connection status */}
        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
          isConnected 
            ? 'bg-green-500/30 text-green-400' 
            : 'bg-white/10 text-white/60'
        }`}>
          {isConnected ? (
            <>
              <Check className="w-3 h-3" />
              Connected
            </>
          ) : (
            <>
              <X className="w-3 h-3" />
              Not logged in
            </>
          )}
        </div>

        {/* Type badge */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
          style={{ backgroundColor: service.color + '40', color: service.color }}
        >
          {service.type === 'embed' ? 'Embedded' : 'External'}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">{service.name}</h3>
            <p className="text-sm text-white/50 mt-1">{service.description}</p>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-2 rounded-full bg-white/5"
          >
            <ExternalLink className="w-4 h-4 text-white/50" />
          </motion.div>
        </div>
      </div>
    </GlassCard>
  );
}