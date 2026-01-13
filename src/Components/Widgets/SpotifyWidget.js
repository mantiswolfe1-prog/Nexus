import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import NeonButton from '../UI/NeonButton';

const MOCK_TRACKS = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
  { id: 2, title: 'Watermelon Sugar', artist: 'Harry Styles', duration: '2:54' },
  { id: 3, title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
  { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58' },
  { id: 5, title: 'Stay', artist: 'The Kid Laroi & Justin Bieber', duration: '2:21' },
];

export default function SpotifyWidget() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const track = MOCK_TRACKS[currentTrack];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Music className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <div className="text-white font-medium text-sm truncate">{track.title}</div>
        <div className="text-white/60 text-xs truncate">{track.artist}</div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <NeonButton 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentTrack((currentTrack - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length)}
        >
          <SkipBack className="w-4 h-4" />
        </NeonButton>
        
        <NeonButton 
          variant="primary" 
          size="icon" 
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </NeonButton>
        
        <NeonButton 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentTrack((currentTrack + 1) % MOCK_TRACKS.length)}
        >
          <SkipForward className="w-4 h-4" />
        </NeonButton>
      </div>

      <div className="text-center text-white/40 text-xs">
        {isPlaying ? 'Playing' : 'Paused'} • {track.duration}
      </div>
    </div>
  );
}