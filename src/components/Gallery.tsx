import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Search, Sparkles, Layers, ChevronDown, Loader2 } from 'lucide-react';
import { PromptCard } from './PromptCard';
import { DetailModal } from './DetailModal';
import { Prompt } from '../data/mockData';

interface GalleryProps {
  prompts: Prompt[];
  onPromptClick: (prompt: Prompt) => void;
}

const ITEMS_PER_PAGE = 9;

export function Gallery({ prompts, onPromptClick }: GalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'random'>('latest');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const observerTarget = useRef(null);

  // Extract unique models from data
  const models = useMemo(() => {
    const priorityModels = ['Nano Banana', 'Grok', 'Sora 2'];
    const otherModels = prompts
      .map(p => p.model || 'Other')
      .filter(m => !priorityModels.includes(m));
    
    const uniqueOthers = [...new Set(otherModels)];
    
    return ['All', ...priorityModels, ...uniqueOthers];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    let result = prompts.filter(prompt => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(query) || 
        prompt.promptText.toLowerCase().includes(query) ||
        prompt.author.toLowerCase().includes(query);
      
      const matchesModel = selectedModel === 'All' || (prompt.model || 'Other') === selectedModel;

      return matchesSearch && matchesModel;
    });

    if (sortBy === 'random') {
      result = [...result].sort(() => 0.5 - Math.random()); 
    } else {
       result = [...result].reverse();
    }

    return result;
  }, [searchQuery, selectedModel, sortBy, prompts]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedModel, sortBy]);

  const displayedPrompts = useMemo(() => {
    return filteredPrompts.slice(0, visibleCount);
  }, [filteredPrompts, visibleCount]);

  const hasMore = visibleCount < filteredPrompts.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate network delay for better UX
          setTimeout(() => {
            setVisibleCount(prev => prev + ITEMS_PER_PAGE);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoadingMore]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
      {/* Hero Search Section */}
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-text-primary my-16">
          Discover & Share <br className="md:hidden" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI Art Prompts</span>
        </h2>
        
        <div className="relative w-full max-w-2xl group mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5 group-focus-within:text-white transition-colors z-10 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search for prompts, styles, or keywords..." 
              className="w-full bg-glass-bg border border-glass-border backdrop-blur-xl rounded-2xl py-4 pl-12 pr-4 text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-gray focus:bg-glass-bg/80 transition-all shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter & Sort Toolbar */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-40">
          
          {/* Left: Model Tags */}
          <div className="flex flex-wrap gap-2">
            {models.map(model => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedModel === model
                    ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                    : 'bg-white/5 text-text-secondary border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {model === 'All' && <Sparkles className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />}
                {model}
              </button>
            ))}
          </div>

          {/* Right: Sorting & Stats */}
          <div className="flex items-center gap-4 self-end md:self-auto text-sm text-text-secondary bg-glass-bg/50 px-4 py-2 rounded-xl border border-glass-border backdrop-blur-md">
            <div className="flex items-center gap-1 pr-4 border-r border-white/10">
              <Layers className="w-4 h-4" />
              <span className="font-medium text-text-primary">{filteredPrompts.length}</span>
              <span className="hidden sm:inline">Works</span>
            </div>

            {/* Sorting Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer hover:text-text-primary transition-colors">
                <span className="font-medium text-text-primary">
                  {sortBy === 'latest' ? 'Latest' : 'Random'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-32 py-1 bg-neutral-900 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => setSortBy('latest')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${sortBy === 'latest' ? 'text-blue-400' : 'text-text-secondary'}`}
                >
                  Latest
                </button>
                <button 
                  onClick={() => setSortBy('random')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${sortBy === 'random' ? 'text-purple-400' : 'text-text-secondary'}`}
                >
                  Random
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {filteredPrompts.length > 0 ? (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {displayedPrompts.map(prompt => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onClick={onPromptClick} 
              />
            ))}
          </Masonry>

          {/* Load More Sentinel & Indicator */}
          <div ref={observerTarget} className="h-20 flex items-center justify-center w-full mt-8">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-text-secondary animate-in fade-in zoom-in duration-300">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                <span className="text-sm font-medium">Loading more inspiration...</span>
              </div>
            )}
            {!hasMore && displayedPrompts.length > 0 && (
              <div className="text-text-secondary text-sm font-medium opacity-50">
                You've reached the end
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
             <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">No prompts found</h2>
          <p className="text-text-secondary">Try adjusting your search query to find what you're looking for.</p>
        </div>
      )}
    </main>
  );
}
