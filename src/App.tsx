import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { AdminPage } from './components/AdminPage';
import { Gallery } from './components/Gallery';
import { mockPrompts, Prompt } from './data/mockData';
import { supabase } from './lib/supabase';
import { Loader2 } from 'lucide-react';

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    try {
      // Check if configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        setPrompts(mockPrompts);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const mapped: Prompt[] = data.map(p => ({
          id: p.id,
          title: p.title,
          author: p.author,
          authorUrl: p.author_url,
          promptText: p.prompt_text,
          imageUrl: p.image_url,
          imageUrls: p.image_urls,
          model: p.model,
          likes: p.likes
        }));
        setPrompts(mapped);
      } else {
        setPrompts(mockPrompts);
      }
    } catch (e) {
      console.error('Error fetching prompts:', e);
      setPrompts(mockPrompts);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddPrompt = (newPrompt: Prompt) => {
    // Prompt is already saved to DB in AdminPage
    setPrompts([newPrompt, ...prompts]);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onAdminClick={() => navigate('/admin')} 
        showAdminButton={location.pathname === '/'} 
      />
      
      <Routes>
        <Route 
          path="/" 
          element={
            isLoading ? (
              <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  <p className="text-text-secondary animate-pulse">Loading gallery...</p>
                </div>
              </div>
            ) : (
              <Gallery 
                prompts={prompts} 
                onPromptClick={setSelectedPrompt} 
              />
            )
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminPage 
              onBack={() => navigate('/')}
              onSubmit={handleAddPrompt}
            />
          } 
        />
      </Routes>

      <Footer />

      {selectedPrompt && (
        <DetailModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
        />
      )}
    </div>
  );
}

export default App;
