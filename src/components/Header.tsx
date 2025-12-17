import { Github, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onAdminClick?: () => void;
  showAdminButton?: boolean;
}

export function Header({ onAdminClick, showAdminButton = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-glass-bg/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            PixPrompt
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {showAdminButton && onAdminClick && (
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-white/90"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Submit Prompt</span>
            </button>
          )}
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-text-secondary hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
}
