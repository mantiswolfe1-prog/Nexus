import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Circle, Grid, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import GlassCard from 'components/ui/GlassCard';
import NeonButton from 'components/ui/NeonButton';
import { Slider } from 'components/ui/slider';
import { Label } from 'components/ui/label';
import SoftParticleDrift from 'components/backgrounds/SoftParticleDrift';

const BACKGROUNDS = [
  {
    id: 'soft-particle-drift',
    name: 'Soft Particle Drift',
    description: 'Calm, minimal particles (default)',
    icon: Circle,
    preview: '/placeholder-particles.jpg',
    settings: [
      { key: 'particleCount', label: 'Particle Count', min: 20, max: 100, default: 50 },
      { key: 'speed', label: 'Speed', min: 0.1, max: 2, default: 0.5, step: 0.1 },
      { key: 'opacity', label: 'Opacity', min: 0.1, max: 1, default: 0.4, step: 0.1 },
      { key: 'blur', label: 'Blur', min: 0, max: 5, default: 2 }
    ]
  },
  {
    id: 'gradient-flow',
    name: 'Gradient Flow',
    description: 'Animated color gradient',
    icon: Sparkles,
    preview: '/placeholder-gradient.jpg',
    settings: []
  },
  {
    id: 'minimal-grid',
    name: 'Minimal Grid',
    description: 'Interactive grid lines',
    icon: Grid,
    preview: '/placeholder-grid.jpg',
    settings: []
  },
  {
    id: 'custom-image',
    name: 'Custom Image',
    description: 'Upload your own background',
    icon: ImageIcon,
    preview: '/placeholder-custom.jpg',
    settings: []
  }
];

export default function Backgrounds() {
  const [selectedBg, setSelectedBg] = useState('soft-particle-drift');
  const [expandedBg, setExpandedBg] = useState(null);
  const [bgSettings, setBgSettings] = useState({
    'soft-particle-drift': {
      particleCount: 50,
      speed: 0.5,
      opacity: 0.4,
      blur: 2
    }
  });

  const accentColor = '#00f0ff';

  const updateSetting = (bgId, key, value) => {
    setBgSettings(prev => ({
      ...prev,
      [bgId]: {
        ...prev[bgId],
        [key]: value
      }
    }));
  };

  const handleSelectBackground = (bgId) => {
    setSelectedBg(bgId);
    setExpandedBg(expandedBg === bgId ? null : bgId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SoftParticleDrift 
        {...bgSettings['soft-particle-drift']}
        accentColor={accentColor}
      />
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Settings')}>
              <NeonButton variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </NeonButton>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Backgrounds</h1>
              <p className="text-white/50">Choose and customize your background</p>
            </div>
          </div>
        </motion.header>

        <div className="space-y-4">
          {BACKGROUNDS.map((bg, index) => (
            <motion.div
              key={bg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard 
                className={`p-4 cursor-pointer transition-all ${
                  selectedBg === bg.id ? 'ring-2' : ''
                }`}
                style={{ ringColor: selectedBg === bg.id ? accentColor : 'transparent' }}
                onClick={() => handleSelectBackground(bg.id)}
                hover={true}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center"
                    style={{ backgroundColor: selectedBg === bg.id ? accentColor + '20' : undefined }}
                  >
                    <bg.icon className="w-8 h-8 text-white/70" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{bg.name}</h3>
                    <p className="text-sm text-white/50">{bg.description}</p>
                  </div>
                  {selectedBg === bg.id && (
                    <div className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium">
                      Active
                    </div>
                  )}
                </div>
              </GlassCard>

              <AnimatePresence>
                {expandedBg === bg.id && bg.settings.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <GlassCard className="p-6 mt-2" hover={false}>
                      <h4 className="text-white font-medium mb-4">Customize Settings</h4>
                      <div className="space-y-6">
                        {bg.settings.map((setting) => (
                          <div key={setting.key}>
                            <Label className="text-white text-sm mb-2 block">
                              {setting.label}: {bgSettings[bg.id]?.[setting.key] ?? setting.default}
                            </Label>
                            <Slider
                              value={[bgSettings[bg.id]?.[setting.key] ?? setting.default]}
                              onValueChange={([val]) => updateSetting(bg.id, setting.key, val)}
                              min={setting.min}
                              max={setting.max}
                              step={setting.step || 1}
                              className="w-full"
                            />
                          </div>
                        ))}

                        {/* Live Preview */}
                        <div className="mt-6">
                          <Label className="text-white text-sm mb-2 block">Live Preview</Label>
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10">
                            <SoftParticleDrift 
                              {...bgSettings[bg.id]}
                              accentColor={accentColor}
                            />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}