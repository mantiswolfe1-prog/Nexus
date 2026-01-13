import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Pen, Calculator, Book, FileText, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from 'utils';
import GlassCard from 'components/ui/GlassCard';
import NeonButton from 'components/ui/NeonButton';
import SoftParticleDrift from 'components/backgrounds/SoftParticleDrift';
import Whiteboard from 'components/utilities/Whiteboard';
import ScientificCalculator from 'components/study/ScientificCalculator';
import Dictionary from 'components/study/Dictionary';
import FormulaSheet from 'components/study/FormulaSheet';
import AIChat from 'components/study/AIChat';

const TOOLS = [
  { id: 'whiteboard', name: 'Whiteboard', icon: Pen, component: Whiteboard },
  { id: 'calculator', name: 'Calculator', icon: Calculator, component: ScientificCalculator },
  { id: 'dictionary', name: 'Dictionary', icon: Book, component: Dictionary },
  { id: 'formulas', name: 'Formula Sheets', icon: FileText, component: FormulaSheet },
  { id: 'ai', name: 'AI Assistant', icon: Bot, component: AIChat }
];

export default function StudyTools() {
  const [activeTool, setActiveTool] = useState('whiteboard');
  const accentColor = '#a55eea';

  const ActiveComponent = TOOLS.find(t => t.id === activeTool)?.component;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SoftParticleDrift accentColor={accentColor} particleCount={40} />
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <motion.header 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Dashboard')}>
              <NeonButton variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </NeonButton>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Study Tools</h1>
              <p className="text-white/50">Everything you need to learn</p>
            </div>
          </div>
        </motion.header>

        {/* Tool Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TOOLS.map((tool) => (
            <NeonButton
              key={tool.id}
              variant={activeTool === tool.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTool(tool.id)}
              className="flex items-center gap-2"
            >
              <tool.icon className="w-4 h-4" />
              {tool.name}
            </NeonButton>
          ))}
        </div>

        {/* Active Tool */}
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {ActiveComponent && <ActiveComponent accentColor={accentColor} />}
        </motion.div>
      </div>
    </div>
  );
}