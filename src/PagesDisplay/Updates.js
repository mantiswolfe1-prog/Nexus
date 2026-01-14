import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Gamepad2, Brain, Wrench, Shield, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils.js';
import NeonButton from '../Components/UI/NeonButton.js';
import GlassCard from '../Components/UI/GlassCard.js';
import SoftParticleDrift from '../Components/Backgrounds/SoftParticleDrift.js';

const updates = [
  {
    version: 'v1.0.0-beta',
    date: 'January 2026',
    type: 'major',
    highlights: [
      {
        icon: Shield,
        title: 'Multi-Tier Role System',
        description: 'Introduced Guest, Verified, Admin, and Owner roles with Discord verification',
        category: 'Feature'
      },
      {
        icon: Gamepad2,
        title: 'Guest Demo Mode',
        description: 'Try Nexus features instantly without an account - explore games, tools, and media',
        category: 'Feature'
      },
      {
        icon: Brain,
        title: 'AI Study Tools',
        description: 'AI-powered chat assistant, formula sheets, and smart study recommendations',
        category: 'AI'
      },
      {
        icon: Wrench,
        title: 'Performance Manager',
        description: 'Adaptive performance system with FPS monitoring and low-end mode',
        category: 'Feature'
      }
    ],
    games: [
      '1v1.lol',
      'Slope',
      'Subway Surfers',
      'Retro Bowl',
      'Drift Hunters',
      'Basketball Legends',
      '+ 50 more games'
    ],
    improvements: [
      'Auto-save settings to localStorage',
      'Password-style code hiding with show/hide toggle',
      'Invite code system with auto-regeneration',
      'User management dashboard for Owner role',
      'Kick/ban functionality',
      'Discord verification workflow',
      'Glassmorphic UI design',
      'Particle animation backgrounds',
      'Device profile management'
    ]
  },
  {
    version: 'v0.9.0-alpha',
    date: 'December 2025',
    type: 'minor',
    highlights: [
      {
        icon: Gamepad2,
        title: 'Games Library Launch',
        description: 'Initial game collection with favorites system and search',
        category: 'Games'
      },
      {
        icon: Brain,
        title: 'Study Tools Suite',
        description: 'Flashcards, notes, calculator, and dictionary added',
        category: 'Feature'
      }
    ],
    games: [
      'Initial 20 game collection',
      'Favorites system',
      'Game search and filters'
    ],
    improvements: [
      'Basic settings panel',
      'Theme customization',
      'Privacy-first localStorage'
    ]
  },
  {
    version: 'v0.5.0-alpha',
    date: 'November 2025',
    type: 'minor',
    highlights: [
      {
        icon: Sparkles,
        title: 'Nexus Launch',
        description: 'Privacy-first student hub goes live',
        category: 'Launch'
      }
    ],
    improvements: [
      'Landing page and consent flow',
      'Basic authentication',
      'Dashboard layout'
    ]
  }
];

const categoryColors = {
  'Feature': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Games': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'AI': 'text-green-400 bg-green-500/10 border-green-500/20',
  'Launch': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
};

const typeColors = {
  'major': 'text-red-400 border-red-500/30',
  'minor': 'text-blue-400 border-blue-500/30',
  'patch': 'text-green-400 border-green-500/30'
};

export default function Updates() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      <SoftParticleDrift accentColor="#00f0ff" particleCount={30} speed={0.3} opacity={0.3} blur={2} />
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <motion.header 
          className="mb-8"
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
                <h1 className="text-4xl font-bold text-white mb-2">What's New</h1>
                <p className="text-white/60">Updates, new games, and feature releases</p>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="space-y-8">
          {updates.map((update, index) => (
            <motion.div
              key={update.version}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{update.version}</h2>
                      <span className={`px-3 py-1 rounded-full border text-xs font-medium ${typeColors[update.type]}`}>
                        {update.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Calendar className="w-4 h-4" />
                      {update.date}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {update.highlights && update.highlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {update.highlights.map((highlight, idx) => {
                        const Icon = highlight.icon;
                        return (
                          <div 
                            key={idx}
                            className={`p-4 rounded-xl border ${categoryColors[highlight.category]}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-black/20">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-white font-medium">{highlight.title}</h4>
                                  <span className="text-xs opacity-70">{highlight.category}</span>
                                </div>
                                <p className="text-sm text-white/70">{highlight.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* New Games */}
                {update.games && update.games.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-purple-400" />
                      New Games
                    </h3>
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="flex flex-wrap gap-2">
                        {update.games.map((game, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-black/30 text-purple-300 text-sm"
                          >
                            {game}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Improvements */}
                {update.improvements && update.improvements.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-cyan-400" />
                      Improvements & Changes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {update.improvements.map((improvement, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-2 text-sm text-white/70"
                        >
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm">
            More updates coming soon! Join our{' '}
            <a 
              href="https://discord.gg/nexushub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Discord
            </a>
            {' '}to stay updated.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
