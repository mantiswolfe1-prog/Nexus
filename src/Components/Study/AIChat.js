import React, { useState } from 'react';
import { Send } from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import { Input } from '../UI/input';
import NeonButton from '../UI/NeonButton';

export default function AIChat({ accentColor }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'AI assistant responses would appear here. Connect to Base44 AI integration for real responses.' 
      }]);
    }, 1000);
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