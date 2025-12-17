import React, { useState, useEffect } from 'react';
import { X, Copy, Check, User, Quote, ExternalLink, ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react';
import { Prompt } from '../data/mockData';

interface DetailModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = prompt.imageUrls && prompt.imageUrls.length > 0 
    ? prompt.imageUrls 
    : [prompt.imageUrl];

  const hasMultipleImages = images.length > 1;

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAuthorUrl = () => {
    if (prompt.authorUrl) {
      window.open(prompt.authorUrl, '_blank');
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div className="glass-panel w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-3/5 bg-black/60 flex items-center justify-center overflow-hidden h-[40vh] md:h-auto relative group">
           {/* Gradient overlay for text contrast if needed, mostly decoration here */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
          
           {/* Copy Image Link Button */}
           <button
             onClick={() => {
               navigator.clipboard.writeText(images[currentImageIndex]);
               setImageCopied(true);
               setTimeout(() => setImageCopied(false), 2000);
             }}
             className="absolute top-4 right-16 md:right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-2"
             title="Copy Image URL"
           >
             {imageCopied ? <Check className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5" />}
           </button>
          
          <img 
            src={images[currentImageIndex]} 
            alt={`${prompt.title} - Image ${currentImageIndex + 1}`} 
            className="w-full h-full object-contain transition-opacity duration-300"
            key={currentImageIndex} // Force re-render for animation if desired, or remove for smooth transition
          />

          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto bg-glass-bg/30 border-t md:border-t-0 md:border-l border-glass-border">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 leading-tight">{prompt.title}</h2>
            <div 
              className={`flex items-center gap-3 text-text-secondary ${prompt.authorUrl ? 'cursor-pointer group' : ''}`}
              onClick={openAuthorUrl}
            >
              <div className="w-8 h-8 rounded-full bg-accent-gray/30 flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                <User className="w-4 h-4 text-white group-hover:text-blue-400 transition-colors" />
              </div>
              <span className="font-medium text-lg text-gray-300 group-hover:text-blue-400 group-hover:underline transition-all">
                {prompt.author}
              </span>
              {prompt.authorUrl && <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1 text-text-primary font-medium text-sm uppercase tracking-wider opacity-70">
              <Quote className="w-3 h-3" />
              <span>Prompt</span>
            </div>
            <div className="bg-black/30 rounded-xl p-5 border border-glass-border flex-1 overflow-y-auto max-h-[300px] hover:border-white/20 transition-colors">
              <p className="text-text-secondary leading-relaxed text-sm md:text-base font-light">
                {prompt.promptText}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 font-semibold text-lg transition-all duration-300 shadow-lg ${
              copied 
                ? 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-green-900/20' 
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30 hover:shadow-white/5'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
