import React, { useState } from 'react';
import { CheckCircle, ThumbsUp, Star } from 'lucide-react';
import { apiService, ApiError } from '../../services/api';
import { ChoiceApprovalResponse } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { ErrorMessage } from '../UI/ErrorMessage';

export const ChoiceApproval: React.FC = () => {
  const [itemDescription, setItemDescription] = useState('');
  const [userStyle, setUserStyle] = useState('');
  const [approval, setApproval] = useState<ChoiceApprovalResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

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

  const getAffinityEmoji = (score: number) => {
    if (score >= 0.8) return '🔥';
    if (score >= 0.6) return '👍';
    if (score >= 0.4) return '👌';
    return '🤔';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-xs font-black text-[#15803D] shadow-[2px_2px_0px_#1E293B]">
          AI Taste Validation
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Aesthetic Choice Approval
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          Get Qloo-powered taste validation before committing to a new cultural or fashion choice.
        </p>
      </div>

      <div className="brutal-card max-w-2xl mx-auto p-6 space-y-4">
        <form onSubmit={handleGetApproval} className="space-y-4">
          <div>
            <label htmlFor="itemDescription" className="block text-xs font-black text-slate-900 mb-1.5 uppercase tracking-wider">
              Describe the item or experience you're considering
            </label>
            <textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="e.g., 'vintage charcoal chore jacket' or 'brutalist concrete cafe in Tokyo'"
              className="w-full px-4 py-3 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-none"
              disabled={loading}
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="userStyle" className="block text-xs font-black text-slate-900 mb-1.5 uppercase tracking-wider">
              Your style or mood preferences (optional)
            </label>
            <textarea
              id="userStyle"
              value={userStyle}
              onChange={(e) => setUserStyle(e.target.value)}
              placeholder="e.g., 'Contemplative urbanite, muted earth tones, quiet craftsmanship'"
              className="w-full px-4 py-2.5 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E] resize-none"
              disabled={loading}
              rows={2}
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
                <span>Validate Taste Match</span>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto">
          <ErrorMessage message={error} onRetry={() => handleGetApproval({ preventDefault: () => {} } as React.FormEvent)} />
        </div>
      )}

      {showResult && approval && (
        <div className="max-w-2xl mx-auto">
          <div className="brutal-card p-6 text-center space-y-5 bg-white">
            <div className="w-16 h-16 bg-[#DCFCE7] border-2 border-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-[3px_3px_0px_#1E293B]">
              <CheckCircle className="w-8 h-8 text-[#15803D]" />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-slate-900">
                {approval.approval}
              </h3>
              
              <div>
                <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#DCFCE7] border-2 border-[#16A34A] text-[#15803D] text-xs font-black shadow-[2px_2px_0px_#16A34A]">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>
                    Affinity Score: {Math.round(approval.affinity_score * 100)}% {getAffinityEmoji(approval.affinity_score)}
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF7F2] border-2 border-slate-900 rounded-2xl p-4 text-left space-y-1.5 shadow-[2px_2px_0px_#1E293B]">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">AI Reasoning:</h4>
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};