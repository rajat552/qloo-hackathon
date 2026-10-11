import React, { useState } from 'react';
import { Layers, Sparkles, Film, Music, BookOpen, Utensils, Shirt, Globe, ArrowRight } from 'lucide-react';
import { apiService } from '../../services/api';
import { CrossDomainSynthesisResponse } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const domainsList = [
  { id: 'film', label: 'Cinema / Film', icon: Film, color: 'text-amber-400 border-amber-500/30' },
  { id: 'music', label: 'Music / Audio', icon: Music, color: 'text-purple-400 border-purple-500/30' },
  { id: 'literature', label: 'Literature / Sci-Fi', icon: BookOpen, color: 'text-emerald-400 border-emerald-500/30' },
  { id: 'dining', label: 'Dining / Wine', icon: Utensils, color: 'text-rose-400 border-rose-500/30' },
  { id: 'fashion', label: 'Fashion & Design', icon: Shirt, color: 'text-pink-400 border-pink-500/30' },
  { id: 'travel', label: 'Architecture & Travel', icon: Globe, color: 'text-cyan-400 border-cyan-500/30' },
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-black p-6 rounded-2xl border border-purple-500/20 backdrop-blur-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Cross-Category Cultural Correlation</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Cross-Domain Synthesis Matrix
        </h2>
        <p className="text-gray-300 text-sm mt-1 max-w-2xl">
          Qloo's cultural AI connects disparate interests. Pick 2 or more domains to generate an overarching aesthetic lifestyle signature.
        </p>
      </div>

      {/* Domain Picker Pills */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl space-y-4">
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
          Select Cultural Domains to Harmonize (Choose 2 or more):
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {domainsList.map(({ id, label, icon: Icon, color }) => {
            const isSelected = selectedDomains.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleDomain(id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500 shadow-md shadow-purple-600/20 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-400' : 'text-gray-500'}`} />
                <span className="text-xs font-semibold leading-tight">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSynthesize}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Computing Cross-Domain Affinities...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Aesthetic Signature</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Synthesis Result Card */}
      {synthesis && (
        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-bold">
              {synthesis.synthesis_title}
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {synthesis.concept}
            </h3>
            <p className="text-xs text-gray-300 mt-2 bg-purple-950/20 border border-purple-800/30 p-3.5 rounded-xl leading-relaxed">
              <strong>Correlation Engine:</strong> {synthesis.qloo_cross_correlation}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Synthesized Experiences Across Domains:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {synthesis.recommended_experiences.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
                    {exp.domain}
                  </span>
                  <h5 className="font-bold text-white text-sm">{exp.title}</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">{exp.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
