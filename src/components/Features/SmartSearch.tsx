import React, { useState, useRef } from 'react';
import { Search, Sparkles, User, Settings, X, Tag } from 'lucide-react';
import { apiService, ApiError, API_BASE_URL } from '../../services/api';
import { FashionItem, UserProfile } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';

const QUICK_PROMPTS = [
  'Minimalist Linen Jacket',
  'Vintage Arthouse Denim',
  'Analog Kissaten Selvedge',
  'Monochrome Tailoring'
];

const AESTHETIC_FALLBACKS = [
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80'
];

export const SmartSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [stylePreferences, setStylePreferences] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [results, setResults] = useState<FashionItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const executeSearch = async (searchQuery: string, prefs?: string) => {
    const q = searchQuery.trim() || 'Minimalist Linen Jacket';
    setQuery(q);
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.search(q, prefs || stylePreferences || undefined);
      const rawItems = response.items || [];
      
      // Strict deduplication by image URL and title
      const uniqueItems: FashionItem[] = [];
      const seenImages = new Set<string>();
      const seenTitles = new Set<string>();

      for (const item of rawItems) {
        const img = item.image_url?.trim().toLowerCase();
        const title = (item.clothing_type || item.remarks || '').trim().toLowerCase();

        if (img && seenImages.has(img)) continue;
        if (title && seenTitles.has(title)) continue;

        if (img) seenImages.add(img);
        if (title) seenTitles.add(title);
        uniqueItems.push(item);
      }

      setResults(uniqueItems);
      setUserProfile(response.personalization || null);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSearch(query);
  };

  const handleQuickPrompt = async (prompt: string) => {
    setQuery(prompt);
    await executeSearch(prompt);
  };

  return (
    <div id="tour-search-section" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-xs font-black text-[#15803D] shadow-[2px_2px_0px_#1E293B]">
          Aesthetic Archive
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Taste Search
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          Search your aesthetic archive and discover matching pieces with style and mood filters.
        </p>
      </div>

      <div className="brutal-card max-w-2xl mx-auto p-6 space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search an aesthetic or item (e.g., minimalist linen jacket)..."
              className="w-full pl-11 pr-10 py-3 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
              disabled={loading}
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center mr-1">
              <Tag className="w-3 h-3 mr-1" /> Popular Searches:
            </span>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleQuickPrompt(prompt)}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#DCFCE7] border border-slate-900 text-slate-800 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
          
          <div>
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Add style preferences (optional)</span>
            </button>
            
            {showPreferences && (
              <div className="mt-3">
                <textarea
                  value={stylePreferences}
                  onChange={(e) => setStylePreferences(e.target.value)}
                  placeholder="e.g., Muted earth tones, Japanese workwear, and relaxed tailoring"
                  className="w-full p-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full brutal-btn-primary py-3.5 rounded-xl text-xs font-black shadow-brutal-sm"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" className="text-white" />
                <span>Searching aesthetic archive...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Search Archive</span>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto">
          <ErrorMessage message={error} onRetry={() => executeSearch(query)} />
        </div>
      )}

      {userProfile && (
        <div className="brutal-card max-w-2xl mx-auto p-5 bg-[#FAF7F2]">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#DDD6FE] border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E293B]">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-slate-900 text-sm mb-2">Active Style Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-extrabold text-slate-700">Style:</span>
                  <span className="ml-2 font-medium text-slate-900 capitalize">{userProfile.style_preference || 'Minimalist'}</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-700">Colors:</span>
                  <span className="ml-2 font-medium text-slate-900">
                    {Array.isArray(userProfile.color_preference) ? userProfile.color_preference.join(', ') : 'Charcoal, Ecru, Olive, Neutral'}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-extrabold text-slate-700">Occasions:</span>
                  <span className="ml-2 font-medium text-slate-900">
                    {Array.isArray(userProfile.occasion_focus) ? userProfile.occasion_focus.join(', ') : 'Gallery, Studio, Contemporary Casual'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={resultsRef}>
        {results.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Found {results.length} Matches for "{query}"
              </h3>
              <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] border border-slate-900 px-3 py-1 rounded-full shadow-[1px_1px_0px_#1E293B] w-fit">
                Qloo Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {results.map((item, idx) => (
                <div key={item.id} className="brutal-card p-4 space-y-3 hover:-translate-y-1 hover:shadow-brutal-lg transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-60 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-900">
                      <img
                        src={
                          item.image_url?.startsWith('http')
                            ? item.image_url
                            : item.image_url
                            ? `${API_BASE_URL}${item.image_url}`
                            : AESTHETIC_FALLBACKS[idx % AESTHETIC_FALLBACKS.length]
                        }
                        alt={`${item.clothing_type || 'Item'} - ${item.dominant_color || 'Neutral'}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = AESTHETIC_FALLBACKS[idx % AESTHETIC_FALLBACKS.length];
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black rounded-lg shadow-[1px_1px_0px_#1E293B]">
                          #{item.original_id}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-extrabold text-slate-900 capitalize text-sm">{item.clothing_type || 'Curated Item'}</h4>
                      <p className="text-xs text-slate-600 mb-3 font-medium line-clamp-2 mt-0.5">
                        {item.pattern_description || item.remarks || 'Curated aesthetic milestone'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="px-2 py-0.5 bg-[#BAE6FD] text-slate-900 text-[10px] font-bold rounded-md border border-slate-900">
                        {item.dominant_color || 'Neutral'}
                      </span>
                      {item.secondary_color && (
                        <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold rounded-md border border-slate-900">
                          {item.secondary_color}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(item.occasion_suitability) ? item.occasion_suitability : ['Contemporary']).map((occasion, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#FAF7F2] text-slate-700 text-[10px] font-semibold rounded-md border border-slate-300">
                          {occasion}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};