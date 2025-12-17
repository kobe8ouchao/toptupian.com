import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Prompt } from '../data/mockData';
import { ArrowLeft, Save, Image, Type, User, MessageSquare, Sparkles, Link as LinkIcon, Plus, Trash2, Loader2 } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
  onSubmit: (newPrompt: Prompt) => void;
}

export function AdminPage({ onBack, onSubmit }: AdminPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    authorUrl: '',
    promptText: '',
    imageUrls: [''],
    model: 'Nano Banana',
    likes: 0
  });

  const models = ['Nano Banana', 'Grok', 'Sora 2', 'Midjourney', 'DALL-E 3', 'Stable Diffusion'];

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const addImageUrl = () => {
    // Insert new URL at the beginning (index 0) or after the main image?
    // User asked to "insert at first input, not below". 
    // If they mean literally the first one:
    setFormData({ ...formData, imageUrls: ['', ...formData.imageUrls] });
  };

  const removeImageUrl = (index: number) => {
    if (formData.imageUrls.length > 1) {
      const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
      setFormData({ ...formData, imageUrls: newImageUrls });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty URLs
    const validImageUrls = formData.imageUrls.filter(url => url.trim() !== '');
    
    if (validImageUrls.length === 0) {
      alert('Please provide at least one image URL');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare prompt object for Supabase
      const dbPrompt = {
        title: formData.title,
        author: formData.author,
        author_url: formData.authorUrl,
        prompt_text: formData.promptText,
        model: formData.model,
        likes: formData.likes,
        image_url: validImageUrls[0],
        image_urls: validImageUrls
      };

      // Check if Supabase is configured
      const { data, error } = await supabase
        .from('prompts')
        .insert([dbPrompt])
        .select()
        .single();

      if (error) throw error;

      // Construct the Prompt object from the response (using real ID) or fallback
      const newPrompt: Prompt = {
        id: data?.id || Date.now().toString(),
        title: data?.title || formData.title,
        author: data?.author || formData.author,
        authorUrl: data?.author_url || formData.authorUrl,
        promptText: data?.prompt_text || formData.promptText,
        model: data?.model || formData.model,
        likes: data?.likes || formData.likes,
        imageUrl: data?.image_url || validImageUrls[0],
        imageUrls: data?.image_urls || validImageUrls
      };

      onSubmit(newPrompt);
    } catch (error) {
      console.error('Error saving prompt:', error);
      alert('Failed to save to database. Please check your connection and configuration.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-in fade-in duration-300">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            ) : (
              <Save className="w-6 h-6 text-blue-400" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Submit New Prompt</h2>
            <p className="text-text-secondary text-sm">Add a new artwork to the collection</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Type className="w-4 h-4" /> Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:outline-none focus:bg-black/40 transition-all"
              placeholder="e.g. Cyberpunk City"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Author */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <User className="w-4 h-4" /> Author
              </label>
              <input
                required
                type="text"
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:outline-none focus:bg-black/40 transition-all"
                placeholder="e.g. ArtMaster"
              />
            </div>

            {/* Author URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <LinkIcon className="w-4 h-4" /> Author Platform URL
              </label>
              <input
                type="url"
                value={formData.authorUrl}
                onChange={e => setFormData({...formData, authorUrl: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:outline-none focus:bg-black/40 transition-all"
                placeholder="https://x.com/username"
              />
            </div>
          </div>

          {/* Model */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Sparkles className="w-4 h-4" /> Model
            </label>
            <div className="relative">
              <select
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none focus:bg-black/40 transition-all appearance-none cursor-pointer"
              >
                {models.map(m => <option key={m} value={m} className="bg-[#1a1a1a]">{m}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                ▼
              </div>
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm font-medium text-text-secondary">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4" /> Image URLs
              </div>
              <button
                type="button"
                onClick={addImageUrl}
                className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Image
              </button>
            </label>
            
            <div className="space-y-3">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex gap-2">
                    <input
                      required={index === 0}
                      type="url"
                      value={url}
                      onChange={e => handleImageUrlChange(index, e.target.value)}
                      className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:outline-none focus:bg-black/40 transition-all"
                      placeholder={index === 0 ? "Primary Image URL (Required)" : "Additional Image URL (Optional)"}
                    />
                    {formData.imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrl(index)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {url && (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 w-full md:w-1/2 bg-black/40">
                      <img 
                        src={url} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                        onLoad={(e) => (e.currentTarget.style.display = 'block')} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Text */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <MessageSquare className="w-4 h-4" /> Prompt Text
            </label>
            <textarea
              required
              rows={4}
              value={formData.promptText}
              onChange={e => setFormData({...formData, promptText: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:outline-none focus:bg-black/40 transition-all resize-none"
              placeholder="Detailed description of the prompt..."
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Submit Prompt
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
