import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, BookOpen, Calculator, FileText, Code } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import { Input } from '../UI/input';
import { base44 } from '@/api/base44Client';

export default function AIHelper({ accentColor = '#a55eea' }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('explain'); // explain, solve, summarize, code

  const modes = [
    { id: 'explain', label: 'Explain', icon: BookOpen },
    { id: 'solve', label: 'Solve', icon: Calculator },
    { id: 'summarize', label: 'Summarize', icon: FileText },
    { id: 'code', label: 'Code Help', icon: Code },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');

    const prompts = {
      explain: `Explain this concept clearly and simply for a student: "${query}". Break it down step by step and use examples if helpful. Don't do the work for them, help them understand.`,
      solve: `Help me understand how to solve this problem: "${query}". Guide me through the thought process without just giving the answer. Ask questions to help me think through it.`,
      summarize: `Summarize this text or topic in a clear, concise way: "${query}". Highlight the key points a student should remember.`,
      code: `Help me understand this coding concept or debug this code: "${query}". Explain what's happening and guide me to understand, not just fix it.`
    };

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompts[mode],
        add_context_from_internet: true
      });
      setResponse(result);
    } catch (error) {
      setResponse('Sorry, I had trouble processing that. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "What's the Pythagorean theorem?",
    "Explain photosynthesis",
    "How do I solve quadratic equations?",
    "What caused World War I?"
  ];

  return (
    <GlassCard className="p-6" accentColor={accentColor} hover={false}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
        <h3 className="font-semibold text-white">AI Study Helper</h3>
      </div>

      {/* Mode Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === m.id 
                ? 'text-white' 
                : 'bg-white/5 text-white/50 hover:text-white/70'
            }`}
            style={{ backgroundColor: mode === m.id ? accentColor : undefined }}
          >
            <m.icon className="w-3 h-3" />
            {m.label}
          </motion.button>
        ))}
      </div>

      {/* Quick Prompts */}
      {!response && !isLoading && (
        <div className="mb-4">
          <p className="text-xs text-white/40 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setQuery(prompt)}
                className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-white/60 hover:text-white/80 hover:bg-white/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Response Area */}
      {(response || isLoading) && (
        <div className="mb-4 p-4 rounded-xl bg-white/5 min-h-[120px]">
          {isLoading ? (
            <div className="flex items-center gap-2 text-white/50">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <div className="text-sm text-white/80 whitespace-pre-wrap">
              {response}
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Ask me to ${mode} something...`}
          className="bg-white/5 border-white/10 text-white"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading || !query.trim()}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
          style={{ backgroundColor: accentColor }}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

      <p className="text-xs text-white/30 mt-3 text-center">
        I help you learn, not do your homework for you!
      </p>
    </GlassCard>
  );
}