import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Clock, TrendingUp, Shuffle, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import GlassCard from '../Components/UI/GlassCard';
import NeonButton from '../Components/UI/NeonButton';
import GameCard from '../Components/Games/GameCard';
import GameFilters from '../Components/Games/GameFilters';
import { storage } from '../Components/Storage/clientStorage.js';
import SoftParticleDrift from '../Components/Backgrounds/SoftParticleDrift';

const SAMPLE_GAMES = [
  { 
    id: 1, 
    title: '2048', 
    thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=225&fit=crop', 
    tags: ['puzzle', 'casual', 'math'], 
    performance: 'low', 
    source: 'poki', 
    playTime: '5-10 min',
    url: 'https://poki.com/en/g/2048'
  },
  { 
    id: 2, 
    title: 'Subway Surfers', 
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop', 
    tags: ['arcade', 'endless-runner', 'action'], 
    performance: 'medium', 
    source: 'crazygames', 
    playTime: '10+ min',
    url: 'https://www.crazygames.com/game/subway-surfers'
  },
  { 
    id: 3, 
    title: 'Slope', 
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop', 
    tags: ['action', '3d', 'skill'], 
    performance: 'medium', 
    source: 'coolmath', 
    playTime: '5 min',
    url: 'https://www.coolmathgames.com/0-slope'
  },
  { 
    id: 4, 
    title: 'Chess', 
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=225&fit=crop', 
    tags: ['strategy', 'board', 'multiplayer'], 
    performance: 'low', 
    source: 'poki', 
    playTime: '15+ min',
    url: 'https://poki.com/en/g/chess'
  },
  { 
    id: 5, 
    title: 'Moto X3M', 
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop', 
    tags: ['racing', 'bike', 'stunts'], 
    performance: 'medium', 
    source: 'crazygames', 
    playTime: '5-10 min',
    url: 'https://www.crazygames.com/game/moto-x3m'
  },
  { 
    id: 6, 
    title: 'Basketball Stars', 
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop', 
    tags: ['sports', 'basketball', 'multiplayer'], 
    performance: 'medium', 
    source: 'poki', 
    playTime: '10 min',
    url: 'https://poki.com/en/g/basketball-stars'
  },
  { 
    id: 7, 
    title: 'Fireboy and Watergirl', 
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=225&fit=crop', 
    tags: ['adventure', 'puzzle', 'co-op'], 
    performance: 'low', 
    source: 'coolmath', 
    playTime: '15+ min',
    url: 'https://www.coolmathgames.com/0-fireboy-and-watergirl'
  },
  { 
    id: 8, 
    title: 'Temple Run', 
    thumbnail: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=225&fit=crop', 
    tags: ['action', 'endless-runner', '3d'], 
    performance: 'high', 
    source: 'crazygames', 
    playTime: '5 min',
    url: 'https://www.crazygames.com/game/temple-run-2'
  },
  { 
    id: 9, 
    title: 'Cut the Rope', 
    thumbnail: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=400&h=225&fit=crop', 
    tags: ['puzzle', 'casual', 'physics'], 
    performance: 'low', 
    source: 'poki', 
    playTime: '5 min',
    url: 'https://poki.com/en/g/cut-the-rope'
  },
  { 
    id: 10, 
    title: 'Happy Wheels', 
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop', 
    tags: ['action', 'physics', 'funny'], 
    performance: 'medium', 
    source: 'crazygames', 
    playTime: '10 min',
    url: 'https://www.crazygames.com/game/happy-wheels'
  },
  { 
    id: 11, 
    title: 'Run 3', 
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b07?w=400&h=225&fit=crop', 
    tags: ['arcade', '3d', 'endless-runner'], 
    performance: 'low', 
    source: 'coolmath', 
    playTime: '10+ min',
    url: 'https://www.coolmathgames.com/0-run-3'
  },
  { 
    id: 12, 
    title: 'Drift Hunters', 
    thumbnail: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=225&fit=crop', 
    tags: ['racing', 'car', '3d'], 
    performance: 'high', 
    source: 'crazygames', 
    playTime: '15+ min',
    url: 'https://www.crazygames.com/game/drift-hunters'
  },
];

export default function Games() {
  const [search, setSearch] = useState('');
  const [performance, setPerformance] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [activeSource, setActiveSource] = useState('all');
  const [playingGame, setPlayingGame] = useState(null);

  const accentColor = '#ff6b6b';

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && playingGame) {
        setPlayingGame(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playingGame]);

  const loadFavorites = async () => {
    try {
      await storage.init();
      const saved = await storage.loadFavorites();
      setFavorites(saved);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const allTags = [...new Set(SAMPLE_GAMES.flatMap(g => g.tags))].sort();
  const sources = ['all', 'poki', 'crazygames', 'coolmath'];

  const filteredGames = SAMPLE_GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesPerformance = performance === 'all' || game.performance === performance;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => game.tags.includes(tag));
    const matchesSource = activeSource === 'all' || game.source === activeSource;
    const matchesFavorite = activeTab !== 'favorites' || favorites.includes(game.id);
    return matchesSearch && matchesPerformance && matchesTags && matchesSource && matchesFavorite;
  });

  // Pin favorites to top
  const sortedGames = [...filteredGames].sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  const toggleFavorite = async (game) => {
    const newFavorites = favorites.includes(game.id) 
      ? favorites.filter(id => id !== game.id)
      : [...favorites, game.id];
    
    setFavorites(newFavorites);
    
    try {
      await storage.saveFavorites(newFavorites);
    } catch (err) {
      console.error('Failed to save favorites:', err);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const playGame = (game) => {
    setPlayingGame(game);
  };

  const tabs = [
    { id: 'all', label: 'All Games', icon: TrendingUp },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'recent', label: 'Recently Played', icon: Clock },
  ];

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'poki', name: 'Poki' },
    { id: 'crazygames', name: 'CrazyGames' },
    { id: 'coolmath', name: 'Coolmath Games' },
    { id: 'nealfun', name: 'Neal.fun' },
    { id: 'gamejolt', name: 'GameJolt' },
    { id: 'github', name: 'GitHub Games' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SoftParticleDrift accentColor={accentColor} particleCount={40} />
      
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
              <h1 className="text-3xl font-bold text-white">Games</h1>
              <p className="text-white/50">Browser games from top platforms</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/70'
                }`}
                style={{
                  borderBottom: activeTab === tab.id ? `2px solid ${accentColor}` : 'none'
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}

            <NeonButton 
              variant="ghost" 
              className="ml-auto"
              onClick={() => {
                const randomGame = SAMPLE_GAMES[Math.floor(Math.random() * SAMPLE_GAMES.length)];
                playGame(randomGame);
              }}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random Game
            </NeonButton>
          </div>

          {/* Platform Filter Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setActiveSource(platform.id)}
                className={`p-4 rounded-xl font-medium text-sm transition-all ${
                  activeSource === platform.id
                    ? 'bg-white/15 text-white border-2'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border-2 border-transparent'
                }`}
                style={{ borderColor: activeSource === platform.id ? accentColor : 'transparent' }}
              >
                {platform.name}
              </button>
            ))}
          </div>

          {/* Filters */}
          <GameFilters
            search={search}
            setSearch={setSearch}
            performance={performance}
            setPerformance={setPerformance}
            accentColor={accentColor}
          />

          {/* Tag Filters */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-white/50" />
              <span className="text-sm text-white/50">Filter by tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-white/20 text-white border-2'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 border-2 border-transparent'
                  }`}
                  style={{ borderColor: selectedTags.includes(tag) ? accentColor : 'transparent' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.header>

        {/* Game Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {sortedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.05 * index }}
              >
                <GameCard
                  game={game}
                  onPlay={playGame}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.includes(game.id)}
                  accentColor={accentColor}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {sortedGames.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/50 text-lg">No games found matching your filters</p>
          </motion.div>
        )}

        {/* Game Player Modal */}
        <AnimatePresence>
          {playingGame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setPlayingGame(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-5xl aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="w-full h-full p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">{playingGame.title}</h2>
                    <NeonButton variant="ghost" onClick={() => setPlayingGame(null)}>
                      Close (ESC)
                    </NeonButton>
                  </div>
                  <div className="w-full h-[calc(100%-60px)] bg-black rounded-xl overflow-hidden">
                    <iframe
                      src={playingGame.url}
                      className="w-full h-full border-0"
                      title={playingGame.title}
                      allowFullScreen
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