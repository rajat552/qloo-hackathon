import React, { useState } from 'react';
import { Layers, Sparkles, Film, Music, BookOpen, Utensils, Shirt, Globe } from 'lucide-react';
import { apiService } from '../../services/api';
import { CrossDomainSynthesisResponse } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const domainsList = [
  { id: 'film', label: 'Cinema / Film', icon: Film, pastel: 'bg-[#FED7AA]' },
  { id: 'music', label: 'Music / Audio', icon: Music, pastel: 'bg-[#BAE6FD]' },
  { id: 'literature', label: 'Literature / Sci-Fi', icon: BookOpen, pastel: 'bg-[#DDD6FE]' },
  { id: 'dining', label: 'Dining / Wine', icon: Utensils, pastel: 'bg-[#BBF7D0]' },
  { id: 'fashion', label: 'Fashion & Design', icon: Shirt, pastel: 'bg-[#FECDD3]' },
  { id: 'travel', label: 'Architecture & Travel', icon: Globe, pastel: 'bg-[#C7D2FE]' },
];

export const CrossDomainSynthesis: React.FC = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['film', 'literature', 'dining']);
  const [synthesis, setSynthesis] = useState<CrossDomainSynthesisResponse | null>({
    synthesis_title: 'Aesthetic Synthesis: CINEMA × LITERATURE × DINING',
    concept: 'Contemplative Analog Futurism',
    qloo_cross_correlation: 'Qloo Intelligence: Individuals engaging with melancholy indie cinema & speculative philosophy exhibit 4.2x affinity for low-intervention natural wine bars and analog listening cafes.',
    recommended_experiences: [
      {
        domain: 'Cinema',
        title: 'Solaris (1972) / After Yang (2021)',
        reasoning: 'Bridges philosophical sci-fi concepts with deeply emotional, contemplative pacing.'
      },
      {
        domain: 'Dining',
        title: 'Kissaten Siphon Coffee & Low-Intervention Pét-Nat',
        reasoning: 'Unites quiet solitude with uncompromising culinary craftsmanship.'
      },
      {
        domain: 'Travel & Spaces',
        title: 'Nakagin Retro-Futurism & Kyoto Ryoanji Rock Garden',
        reasoning: 'Physical architectural expressions of silence, texture, and futuristic minimalism.'
      }
    ]
  });
  const [loading, setLoading] = useState(false);

  const toggleDomain = (id: string) => {
    if (selectedDomains.includes(id)) {
      if (selectedDomains.length > 2) {
        setSelectedDomains(selectedDomains.filter(d => d !== id));
      }
    } else {
      setSelectedDomains([...selectedDomains, id]);
    }
  };

  const handleSynthesize = async () => {
    setLoading(true);
    try {
      const data = await apiService.synthesizeCrossDomain(selectedDomains);
      setSynthesis(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="tour-synthesis-section" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-[#15803D] text-xs font-black mb-2 shadow-[2px_2px_0px_#1E293B]">
          <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>Cross-Category Cultural Correlation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Cross-Domain Synthesis Matrix
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
          Qloo's cultural AI connects disparate interests. Pick 2 or more domains to generate an overarching aesthetic lifestyle signature.
        </p>
      </div>

      {/* Domain Picker Pills */}
      <div className="brutal-card p-6 space-y-4">
        <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
          Select Cultural Domains to Harmonize (Choose 2 or more):
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {domainsList.map(({ id, label, icon: Icon, pastel }) => {
            const isSelected = selectedDomains.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleDomain(id)}
                className={`p-3.5 rounded-2xl border-2 border-slate-900 text-left transition-all duration-150 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? `${pastel} shadow-[3px_3px_0px_#1E293B] -translate-y-0.5 text-slate-900 font-black`
                    : 'bg-white hover:bg-slate-50 text-slate-600 shadow-[1px_1px_0px_#1E293B]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 flex items-center justify-center shadow-[1px_1px_0px_#1E293B]">
                  <Icon className="w-4 h-4 text-slate-900" />
                </div>
                <span className="text-xs font-bold leading-tight">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-3 flex justify-end">
          <button
            onClick={handleSynthesize}
            disabled={loading}
            className="brutal-btn-primary px-6 py-3 rounded-xl text-xs font-black shadow-brutal-sm"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Computing Cross-Domain Affinities...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Synthesize Aesthetic Signature</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Synthesis Result Card */}
      {synthesis && (
        <div className="brutal-card p-6 sm:p-7 space-y-6">
          <div className="border-b-2 border-slate-900/10 pb-5">
            <span className="text-[11px] font-mono text-[#15803D] bg-[#DCFCE7] border border-slate-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
              {synthesis.synthesis_title}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {synthesis.concept}
            </h3>
            <div className="mt-3 bg-[#FAF7F2] border-2 border-slate-900 p-4 rounded-2xl shadow-[2px_2px_0px_#1E293B]">
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                <strong className="text-slate-900">Qloo Correlation Engine:</strong> {synthesis.qloo_cross_correlation}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">
              Synthesized Experiences Across Domains:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {synthesis.recommended_experiences.map((exp, idx) => {
                const pastels = ['bg-[#FED7AA]', 'bg-[#BBF7D0]', 'bg-[#DDD6FE]'];
                const cardPastel = pastels[idx % pastels.length];

                return (
                  <div
                    key={idx}
                    className="brutal-card p-5 space-y-3 hover:-translate-y-1 hover:shadow-brutal-lg transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${cardPastel} text-slate-900 border border-slate-900 inline-block`}>
                          {exp.domain}
                        </span>
                        {exp.qloo_verified && (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] border border-slate-900">
                            Qloo Live
                          </span>
                        )}
                      </div>

                      {exp.image_url && (
                        <div className="w-full h-32 rounded-xl overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] bg-slate-100">
                          <img
                            src={exp.image_url}
                            alt={exp.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLElement).parentElement?.classList.add('hidden');
                            }}
                          />
                        </div>
                      )}

                      <h5 className="font-black text-slate-900 text-sm leading-snug">{exp.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{exp.reasoning}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
