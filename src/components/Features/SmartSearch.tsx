import React, { useState } from 'react';
import { Search, Sparkles, User, Settings } from 'lucide-react';
import { apiService, ApiError } from '../../services/api';
import { FashionItem, UserProfile } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';

export const SmartSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [stylePreferences, setStylePreferences] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [results, setResults] = useState<FashionItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.search(query, stylePreferences || undefined);
      setResults(response.items);
      setUserProfile(response.personalization || null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-xs font-black text-[#15803D] shadow-[2px_2px_0px_#1E293B]">
          Aesthetic Archive & Discovery
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Smart Aesthetic Search
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          Query your personal aesthetic archive with multi-domain style filters.
        </p>
      </div>

      <div className="brutal-card max-w-2xl mx-auto p-6 space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'minimalist linen jacket' or 'analog retro-futurism attire'"
              className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
              disabled={loading}
            />
          </div>
          
          <div>
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Personalize with style preferences (optional)</span>
            </button>
            
            {showPreferences && (
              <div className="mt-3">
                <textarea
                  value={stylePreferences}
                  onChange={(e) => setStylePreferences(e.target.value)}
                  placeholder="e.g., 'I love muted earth tones, Japanese workwear, and minimalist tailoring'"
                  className="w-full p-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full brutal-btn-primary py-3.5 rounded-xl text-xs font-black shadow-brutal-sm disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Search Aesthetic Archive</span>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto">
          <ErrorMessage message={error} onRetry={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)} />
        </div>
      )}

      {userProfile && (
        <div className="brutal-card max-w-2xl mx-auto p-5 bg-[#FAF7F2]">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#DDD6FE] border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E293B]">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm mb-2">Active Style Signature</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-extrabold text-slate-700">Style:</span>
                  <span className="ml-2 font-bold text-[#16A34A] capitalize">{userProfile.style_preference}</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-700">Colors:</span>
                  <span className="ml-2 font-medium text-slate-700">{userProfile.color_preference.join(', ')}</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-700">Occasions:</span>
                  <span className="ml-2 font-medium text-slate-700">{userProfile.occasion_focus.join(', ')}</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-700">Personality:</span>
                  <span className="ml-2 font-bold text-slate-800 capitalize">{userProfile.personality}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              Found {results.length} Archive Matches for "{query}"
            </h3>
            <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] border border-slate-900 px-3 py-1 rounded-full">
              Qloo Match Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {results.map((item) => (
              <div key={item.id} className="brutal-card p-4 space-y-3 hover:-translate-y-1 hover:shadow-brutal-lg transition-all">
                <div className="relative h-60 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-900">
                  <img
                    src={item.image_url.startsWith('http') ? item.image_url : `http://127.0.0.1:8000${item.image_url}`}
                    alt={`${item.clothing_type} - ${item.dominant_color}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8L3N2Zz4K';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 bg-white border-2 border-slate-900 text-slate-900 text-[10px] font-black rounded-lg shadow-[1px_1px_0px_#1E293B]">
                      #{item.original_id}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 capitalize text-sm">{item.clothing_type}</h4>
                  <p className="text-xs text-slate-600 mb-3 font-medium line-clamp-2 mt-0.5">
                    {item.pattern_description || item.remarks || 'Curated fashion milestone'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-[#BAE6FD] text-slate-900 text-[10px] font-bold rounded-md border border-slate-900">
                      {item.dominant_color}
                    </span>
                    {item.secondary_color && (
                      <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold rounded-md border border-slate-900">
                        {item.secondary_color}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.occasion_suitability.map((occasion, idx) => (
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
  );
};