import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import GlassCard from '../UI/GlassCard.js';
import { Input } from '../UI/input.js';
import NeonButton from '../UI/NeonButton.js';
import { getPersonalityResponse, getTimedTip } from '../../utils/personalities.js';
import { storage } from '../Storage/clientStorage.js';

export default function AIChat({ accentColor }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [personality, setPersonality] = useState('adaptive');

  useEffect(() => {
    // Load personality from settings
    const loadPersonality = async () => {
      try {
        await storage.init();
        const settings = await storage.loadSettings();
        if (settings?.aiPersonality) {
          setPersonality(settings.aiPersonality);
        }
      } catch (err) {
        console.error('Failed to load AI personality:', err);
      }
    };
    loadPersonality();
  }, []);

  const generateResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Help/greeting
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return getPersonalityResponse(personality, 'greeting');
    }
    
    // Search requests
    if (lowerMsg.includes('search') || lowerMsg.includes('find') || lowerMsg.includes('look up')) {
      return getPersonalityResponse(personality, 'search');
    }
    
    // Definition requests
    if (lowerMsg.includes('what is') || lowerMsg.includes('define') || lowerMsg.includes('meaning of')) {
      const word = userMessage.split(' ').pop();
      return getPersonalityResponse(personality, 'definition').replace('{word}', word);
    }
    
    // Encouragement
    if (lowerMsg.includes('help') || lowerMsg.includes('stuck') || lowerMsg.includes('difficult')) {
      return getPersonalityResponse(personality, 'encouragement');
    }
    
    // Tips
    if (lowerMsg.includes('tip') || lowerMsg.includes('advice') || lowerMsg.includes('suggest')) {
      const tip = getTimedTip(personality);
      return getPersonalityResponse(personality, 'tip').replace('{tip}', tip);
    }
    
    // Default fallback with personality
    const defaultResponses = {
      adaptive: "I understand what you're asking. Let me help you with that.",
      kind: "That's a great question! I'm here to help you figure it out! 💡",
      moody: "Alright, alright. I see what you're getting at. Let me think...",
      professional: "I've noted your query. Let me provide an appropriate response.",
      mentor: "Excellent question! Let me break this down for you step by step.",
      chill: "Yeah, I got you. Let me help you out with that. 👍"
    };
    
    return defaultResponses[personality] || defaultResponses.adaptive;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const userInput = input;
    setInput('');
    
    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(userInput);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response
      }]);
    }, 800);
  };

  return (
    <GlassCard className="p-6 max-w-4xl mx-auto h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-white/50 mt-20">
            <p>Ask me anything about your studies!</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-white/10 text-white ml-auto'
                  : 'bg-white/5 text-white/90'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your question..."
          className="bg-white/5 border-white/10 text-white"
        />
        <NeonButton onClick={handleSend}>
          <Send className="w-4 h-4" />
        </NeonButton>
      </div>
    </GlassCard>
  );
}