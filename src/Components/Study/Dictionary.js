import React, { useState } from 'react';
import { Search } from 'lucide-react';
import GlassCard from '../../UI/GlassCard';
import { Input } from '../../UI/input';
import NeonButton from '../../UI/NeonButton';

// Simple local dictionary data
const DICTIONARY_DATA = {
  "hello": {
    definition: "A greeting or expression of goodwill.",
    partOfSpeech: "interjection",
    example: "Hello, how are you?"
  },
  "world": {
    definition: "The earth, together with all of its countries and peoples.",
    partOfSpeech: "noun",
    example: "He traveled around the world."
  },
  "computer": {
    definition: "An electronic device for storing and processing data.",
    partOfSpeech: "noun",
    example: "I use my computer for work."
  },
  "study": {
    definition: "The devotion of time and attention to acquiring knowledge.",
    partOfSpeech: "verb/noun",
    example: "She studies mathematics every day."
  },
  "nexus": {
    definition: "A connection or link between things.",
    partOfSpeech: "noun",
    example: "This app is the nexus of student tools."
  }
};

export default function Dictionary({ accentColor }) {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!word.trim()) return;
    
    const searchWord = word.toLowerCase().trim();
    const definition = DICTIONARY_DATA[searchWord];
    
    if (definition) {
      setResult({ word: searchWord, ...definition });
    } else {
      setResult({ error: 'Word not found in local dictionary' });
    }
  };

  return (
    <GlassCard className="p-6 max-w-3xl mx-auto">
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter a word..."
          className="bg-white/5 border-white/10 text-white"
        />
        <NeonButton onClick={handleSearch}>
          <Search className="w-4 h-4" />
        </NeonButton>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 capitalize">{result.word}</h2>
            <p className="text-white/50 italic">{result.partOfSpeech}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-medium mb-2">Definition</h3>
            <p className="text-white/70">{result.definition}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-medium mb-2">Example</h3>
            <p className="text-white/70 italic">"{result.example}"</p>
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="text-center text-white/50 mt-8">
          <p>{result.error}</p>
          <p className="text-sm mt-2">Try: hello, world, computer, study, nexus</p>
        </div>
      )}
    </GlassCard>
  );
}
          {result.meanings?.map((meaning, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5">
              <p className="text-sm font-medium text-white/70 mb-2">{meaning.partOfSpeech}</p>
              <ul className="space-y-2">
                {meaning.definitions.slice(0, 3).map((def, j) => (
                  <li key={j} className="text-white/90">{def.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {result?.error && (
        <p className="text-red-400 text-center">{result.error}</p>
      )}
    </GlassCard>
  );
}