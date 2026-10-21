import React, { useState } from 'react';
import {
  CheckCircle,
  ThumbsUp,
  Star,
  Shuffle,
  Check,
  Plus,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { apiService, ApiError } from '../../services/api';
import { ChoiceApprovalResponse, AntiRecommendationResponse, FashionPlace } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';

export const ChoiceApproval: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'validate' | 'serendipity'>('validate');

  // Validation State
  const [itemDescription, setItemDescription] = useState('');
  const [userStyle, setUserStyle] = useState('');
  const [approval, setApproval] = useState<ChoiceApprovalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Serendipity State
  const [serendipityInput, setSerendipityInput] = useState('');
  const [antiResponse, setAntiResponse] = useState<AntiRecommendationResponse | null>(null);
  const [loadingAnti, setLoadingAnti] = useState(false);
  const [addedPlaces, setAddedPlaces] = useState<string[]>([]);

  const handleGetApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemDescription.trim()) return;

    setLoading(true);
    setError(null);
    setShowResult(false);

    try {
      const response = await apiService.getChoiceApproval({
        item_description: itemDescription,
        user_style: userStyle || undefined
      });
      setApproval(response);
      setShowResult(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to get choice approval');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAntiRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAnti(true);
    setError(null);

    try {
      const response = await apiService.getAntiRecommendations({
        current_item_description: serendipityInput.trim() || 'Minimalist Workwear'
      });
      setAntiResponse(response);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to generate serendipitous counterpoints');
    } finally {
      setLoadingAnti(false);
    }
  };

  const handleAddCounterpointToGraph = async (place: FashionPlace) => {
    if (addedPlaces.includes(place.name)) return;
    try {
      await apiService.addTasteNode({
        name: place.name,
        domain: 'travel',
        timestamp: 'Spring 2026',
        notes: `Serendipity Engine discovery: ${place.style_focus} in ${place.location}.`,
        tags: [place.style_focus, 'Serendipity Counterpoint', 'Qloo Discovery']
      });
      setAddedPlaces(prev => [...prev, place.name]);
    } catch (err) {
      console.error('Failed to add counterpoint to graph:', err);
    }
  };

  const getAffinityEmoji = (score: number) => {
    if (score >= 0.8) return '🔥';
    if (score >= 0.6) return '👍';
    if (score >= 0.4) return '👌';
    return '🤔';
  };

  return (
    <div id="tour-validator-section" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-xs font-black text-[#15803D] shadow-[2px_2px_0px_#1E293B]">
          <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Qloo Taste AI™ Validation & Serendipity Engine</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Aesthetic Validator & Serendipity
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto">
          Validate whether a prospective cultural or lifestyle choice harmonizes with your taste graph, or break algorithmic echo chambers with curated counterpoints.
        </p>

        {/* Tab Switcher */}
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('validate')}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black border-2 border-slate-900 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'validate'
                ? 'bg-[#DCFCE7] text-slate-900 shadow-[2px_2px_0px_#1E293B] -translate-y-0.5'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Taste Match Validator</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('serendipity');
              if (!antiResponse && !loadingAnti) {
                handleGetAntiRecommendations({ preventDefault: () => {} } as React.FormEvent);
              }
            }}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black border-2 border-slate-900 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'serendipity'
                ? 'bg-[#DDD6FE] text-slate-900 shadow-[2px_2px_0px_#1E293B] -translate-y-0.5'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-700" />
            <span>Serendipity (Anti-Recs)</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto">
          <ErrorMessage message={error} onRetry={() => {}} />
        </div>
      )}

      {/* TAB 1: TASTE MATCH VALIDATOR */}
      {activeTab === 'validate' && (
        <div className="space-y-6">
          <div className="brutal-card max-w-2xl mx-auto p-6 space-y-4 bg-white">
            <form onSubmit={handleGetApproval} className="space-y-4">
              <div>
                <label htmlFor="itemDescription" className="block text-xs font-black text-slate-900 mb-1.5 uppercase tracking-wider">
                  Describe the item, venue, or cultural experience you're considering
                </label>
                <textarea
                  id="itemDescription"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g., 'Comme des Garcons tailored wool coat' or 'Vinyl Kissaten in Shibuya'"
                  className="w-full px-4 py-3 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-none"
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="userStyle" className="block text-xs font-black text-slate-900 mb-1.5 uppercase tracking-wider">
                  Style or mood focus (optional)
                </label>
                <input
                  id="userStyle"
                  type="text"
                  value={userStyle}
                  onChange={(e) => setUserStyle(e.target.value)}
                  placeholder="e.g., 'Contemplative urbanite, understated craftsmanship'"
                  className="w-full px-4 py-2.5 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !itemDescription.trim()}
                className="w-full brutal-btn-primary py-3.5 rounded-xl text-xs font-black shadow-brutal-sm disabled:opacity-50"
              >
                {loading ? (
                  <LoadingSpinner size="sm" className="text-white" />
                ) : (
                  <>
                    <ThumbsUp className="w-4 h-4 text-white" />
                    <span>Validate Taste Match via Qloo</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {showResult && approval && (
            <div className="max-w-2xl mx-auto">
              <div className="brutal-card p-6 text-center space-y-5 bg-white">
                <div className="w-16 h-16 bg-[#DCFCE7] border-2 border-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_#1E293B]">
                  <CheckCircle className="w-8 h-8 text-[#15803D]" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900">
                      {approval.approval}
                    </h3>
                    {approval.qloo_verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border border-slate-900 text-[#15803D] text-[10px] font-black shrink-0 whitespace-nowrap">
                        <ShieldCheck className="w-3 h-3 text-[#15803D] shrink-0" /> Qloo Verified
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#DCFCE7] border-2 border-[#16A34A] text-[#15803D] text-xs font-black shadow-[2px_2px_0px_#16A34A]">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>
                        Affinity Score: {Math.round(approval.affinity_score * 100)}% {getAffinityEmoji(approval.affinity_score)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] border-2 border-slate-900 rounded-2xl p-4 text-left space-y-1.5 shadow-[2px_2px_0px_#1E293B]">
                    <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">AI Cultural Rationale:</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">{approval.message}</p>
                    {approval.style_analysis && (
                      <p className="text-xs text-slate-600 font-medium pt-1">{approval.style_analysis}</p>
                    )}
                  </div>

                  {approval.user_profile && (
                    <div className="bg-[#E2F1F8] border-2 border-slate-900 rounded-2xl p-4 text-left shadow-[2px_2px_0px_#1E293B]">
                      <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-2">Style Signature Match</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-extrabold text-slate-700">Style:</span>
                          <span className="ml-1.5 font-bold text-[#16A34A] capitalize">{approval.user_profile.style_preference}</span>
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-700">Colors:</span>
                          <span className="ml-1.5 font-medium text-slate-700">{approval.user_profile.color_preference.join(', ')}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="font-extrabold text-slate-700">Occasions:</span>
                          <span className="ml-1.5 font-medium text-slate-700">{approval.user_profile.occasion_focus.join(' &bull; ')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SERENDIPITY ENGINE */}
      {activeTab === 'serendipity' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="brutal-card p-6 bg-white space-y-4">
            <form onSubmit={handleGetAntiRecommendations} className="space-y-3">
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                Current Aesthetic Habit or Default Routine:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={serendipityInput}
                  onChange={(e) => setSerendipityInput(e.target.value)}
                  placeholder="e.g., 'Minimalist monochrome workwear and standard third-wave cafes'"
                  className="flex-1 px-4 py-2.5 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
                <button
                  type="submit"
                  disabled={loadingAnti}
                  className="w-full sm:w-auto brutal-btn-primary px-5 py-2.5 rounded-xl text-xs font-black shrink-0 flex items-center justify-center gap-1.5"
                >
                  {loadingAnti ? (
                    <LoadingSpinner size="sm" className="text-white" />
                  ) : (
                    <>
                      <Shuffle className="w-3.5 h-3.5 text-white" />
                      <span>Find Counterpoints</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {antiResponse && (
            <div className="space-y-4">
              {/* Serendipity Header Info */}
              <div className="bg-[#DDD6FE] border-2 border-slate-900 p-4 rounded-2xl shadow-[2px_2px_0px_#1E293B] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 block">
                    Serendipity Score
                  </span>
                  <p className="text-xl font-black text-slate-900">
                    {Math.round(antiResponse.uniqueness_score * 100)}% Aesthetic Diversity
                  </p>
                </div>
                <div className="text-right max-w-xs text-xs text-purple-950 font-medium hidden sm:block">
                  {antiResponse.contrast_reasoning}
                </div>
              </div>

              {/* Counterpoint Place Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {antiResponse.places.map((place) => (
                  <div
                    key={place.id}
                    className="brutal-card p-4 bg-white flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      {place.image_url && (
                        <img
                          src={place.image_url}
                          alt={place.name}
                          className="w-full h-32 object-cover rounded-xl border-2 border-slate-900"
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#BAE6FD] text-slate-900 border border-slate-900 shrink-0 whitespace-nowrap">
                          {place.location}
                        </span>
                        {place.rating && (
                          <div className="flex items-center text-xs font-black text-slate-900">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-400 mr-1" />
                            {place.rating}
                          </div>
                        )}
                      </div>
                      <h4 className="font-black text-slate-900 text-sm">{place.name}</h4>
                      <p className="text-xs text-slate-600 font-medium">{place.style_focus}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddCounterpointToGraph(place)}
                      disabled={addedPlaces.includes(place.name)}
                      className={`w-full py-2 rounded-xl text-xs font-black border-2 border-slate-900 transition flex items-center justify-center gap-1.5 ${
                        addedPlaces.includes(place.name)
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FFFDF9] hover:bg-[#DCFCE7] text-slate-900 shadow-[2px_2px_0px_#1E293B]'
                      }`}
                    >
                      {addedPlaces.includes(place.name) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#15803D]" />
                          <span>Added to Graph</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Counterpoint</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};