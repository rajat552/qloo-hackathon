import React, { useState, useEffect } from 'react';
import { MapPin, Coffee, BookOpen, Wine, Music, Sparkles, Compass } from 'lucide-react';
import { apiService } from '../../services/api';
import { CityItineraryResponse, CityItineraryActivity } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const supportedCities = [
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', icon: '⛩️' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', icon: '🗼' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', icon: '🏛️' },
  { id: 'paris', name: 'Paris', country: 'France', icon: '🥐' },
  { id: 'new york', name: 'New York', country: 'USA', icon: '🗽' },
];

export const CityItinerary: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('kyoto');
  const [itinerary, setItinerary] = useState<CityItineraryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItinerary(selectedCity);
  }, [selectedCity]);

  const loadItinerary = async (city: string) => {
    setLoading(true);
    try {
      const data = await apiService.getCityItinerary(city);
      setItinerary(data);
    } finally {
      setLoading(false);
    }
  };

  const renderActivityCard = (activity: CityItineraryActivity, timeOfDay: string, icon: React.ReactNode, periodColor: string) => {
    return (
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-200 space-y-3 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`p-2 rounded-xl ${periodColor} text-white`}>
              {icon}
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {timeOfDay}
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                {activity.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>{Math.round(activity.qloo_affinity_match * 100)}% Match</span>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          {activity.description}
        </p>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-gray-500" />
            <span>{activity.address}</span>
          </span>
          <span className="capitalize px-2 py-0.5 rounded bg-white/5 text-gray-300 text-[10px]">
            {activity.domain}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-black p-6 rounded-2xl border border-blue-500/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Proactive Travel Mode</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              City Experience Concierge
            </h2>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              When you travel to a new city, the agent cross-references local cultural spots against your multi-domain taste graph to recommend niche galleries, analog kissatens, and natural wine cellars.
            </p>
          </div>

          {/* City Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {supportedCities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedCity === city.id
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span>{city.icon}</span>
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading || !itinerary ? (
        <div className="flex flex-col items-center justify-center min-h-[350px]">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-gray-400">Synthesizing personalized city itinerary...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Itinerary Header */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Localized Lifestyle Blueprint
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{itinerary.city}</h3>
              <p className="text-xs text-purple-300 mt-1 font-medium">
                Vibe Aesthetic: {itinerary.vibe_tag}
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[11px] uppercase font-bold text-gray-400 mb-1">
                Active Memory Anchors:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {itinerary.memory_anchors.map((anchor, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-300">
                    &bull; {anchor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Part Day Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderActivityCard(
              itinerary.morning,
              'Morning & Audio Ritual',
              <Coffee className="w-4 h-4" />,
              'bg-amber-600'
            )}
            {renderActivityCard(
              itinerary.afternoon,
              'Afternoon & Solitude',
              <BookOpen className="w-4 h-4" />,
              'bg-emerald-600'
            )}
            {renderActivityCard(
              itinerary.evening,
              'Evening & Natural Tasting',
              <Wine className="w-4 h-4" />,
              'bg-rose-600'
            )}
            {renderActivityCard(
              itinerary.night,
              'Night & Ambient Immersion',
              <Music className="w-4 h-4" />,
              'bg-purple-600'
            )}
          </div>
        </div>
      )}
    </div>
  );
};
