import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Cpu, Gamepad2 } from 'lucide-react';
import { Input } from '../UI/input';
import { cn } from '../../utils.js';

export default function GameFilters({ 
  search, 
  setSearch, 
  performance, 
  setPerformance,
  genre,
  setGenre,
  accentColor = '#ff6b6b'
}) {
  const genres = ['All', 'Action', 'Puzzle', 'Racing', 'Sports', 'Strategy', 'Adventure', 'Arcade'];
  const performanceOptions = [
    { value: 'all', label: 'All Devices', icon: Gamepad2 },
    { value: 'low', label: 'Low-End', icon: Cpu },
    { value: 'high', label: 'High-End', icon: Cpu }
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search games..."
          className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl"
        />
      </div>

      {/* Performance Filter */}
      <div className="flex flex-wrap gap-2">
        {performanceOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => setPerformance(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              performance === option.value
                ? "bg-white/10 text-white border-2"
                : "bg-white/5 text-white/60 border-2 border-transparent hover:bg-white/10"
            )}
            style={{
              borderColor: performance === option.value ? accentColor : 'transparent'
            }}
          >
            <option.icon className="w-4 h-4" />
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2">
        {genres.map((g) => (
          <motion.button
            key={g}
            onClick={() => setGenre(g.toLowerCase())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              genre === g.toLowerCase()
                ? "text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
            )}
            style={{
              backgroundColor: genre === g.toLowerCase() ? accentColor : undefined
            }}
          >
            {g}
          </motion.button>
        ))}
      </div>
    </div>
  );
}