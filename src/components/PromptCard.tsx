import React, { useState } from 'react';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Prompt } from '../data/mockData';

interface PromptCardProps {
  prompt: Prompt;
  onClick: (prompt: Prompt) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleAuthorClick = (e: React.MouseEvent) => {
    if (prompt.authorUrl) {
      e.stopPropagation();
      window.open(prompt.authorUrl, '_blank');
    }
  };

  return (
    <div 
      className="glass-panel rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 mb-6 break-inside-avoid relative"
      onClick={() => onClick(prompt)}
    >
      {/* Image Container - Full Card */}
      <div className="relative w-full overflow-hidden bg-white/5 min-h-[200px]">
        {/* Placeholder / Loading State */}
        {!imageLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse z-10">
            <ImageIcon className="w-8 h-8 text-white/20" />
          </div>
        )}

        <img 
          src={prompt.imageUrl} 
          alt={prompt.title} 
          className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 block ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setHasError(true)}
        />
        
        {/* Model Badge - Top Right */}
        <div className="absolute top-3 right-3 z-20">
           <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-lg">
             <Sparkles className="w-3 h-3 text-yellow-300" />
             <span className="text-[10px] font-semibold text-white/90 tracking-wide uppercase">{prompt.model || 'AI Model'}</span>
           </div>
        </div>
      </div>
      
      {/* Info Section - Blurred Bottom Bar Overlay (Visible ONLY on hover) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-md transition-opacity duration-500 ease-in-out z-10 opacity-0 group-hover:opacity-100">
        <h3 className="text-white font-medium text-base truncate drop-shadow-md group-hover:text-blue-300 transition-colors">{prompt.title}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span 
            className={`text-white/80 text-xs font-medium shadow-black drop-shadow-sm ${prompt.authorUrl ? 'hover:text-blue-300 cursor-pointer hover:underline' : ''}`}
            onClick={handleAuthorClick}
          >
            @{prompt.author}
          </span>
          {prompt.likes && (
            <div className="flex items-center gap-1.5 text-white/90 text-xs">
              <Heart className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors fill-white/10" />
              <span className="font-medium shadow-black drop-shadow-sm">{prompt.likes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
