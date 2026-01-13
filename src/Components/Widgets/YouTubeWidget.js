import React, { useState } from 'react';
import { Play, ThumbsUp, MessageCircle } from 'lucide-react';
import NeonButton from '../UI/NeonButton';

const MOCK_VIDEOS = [
  { id: 1, title: 'Study Music for Focus', channel: 'Study Beats', views: '1.2M', likes: '45K' },
  { id: 2, title: 'Math Tutorial: Calculus', channel: 'Math Explained', views: '892K', likes: '23K' },
  { id: 3, title: 'Science Experiments', channel: 'Lab Time', views: '567K', likes: '18K' },
];

export default function YouTubeWidget() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const video = MOCK_VIDEOS[currentVideo];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Play className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <div className="text-white font-medium text-sm truncate mb-1">{video.title}</div>
        <div className="text-white/60 text-xs truncate">{video.channel}</div>
      </div>

      <div className="flex items-center justify-center gap-1">
        <NeonButton 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentVideo((currentVideo - 1 + MOCK_VIDEOS.length) % MOCK_VIDEOS.length)}
        >
          ‹
        </NeonButton>
        
        <div className="flex-1 text-center">
          <div className="w-full h-20 bg-black/30 rounded-lg flex items-center justify-center">
            <Play className="w-6 h-6 text-white/50" />
          </div>
        </div>
        
        <NeonButton 
          variant="ghost" 
          size="icon" 
          onClick={() => setCurrentVideo((currentVideo + 1) % MOCK_VIDEOS.length)}
        >
          ›
        </NeonButton>
      </div>

      <div className="flex items-center justify-between text-white/40 text-xs">
        <span>{video.views} views</span>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-3 h-3" />
          <span>{video.likes}</span>
        </div>
      </div>
    </div>
  );
}