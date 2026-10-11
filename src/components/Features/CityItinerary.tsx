import React, { useState, useEffect } from 'react';
import { MapPin, Coffee, BookOpen, Wine, Music, Compass, Star } from 'lucide-react';
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

  const renderActivityCard = (
    activity: CityItineraryActivity,
    timeOfDay: string,
    icon: React.ReactNode,
    pastelBg: string
  ) => {
    return (
      <div className="brutal-card p-5 space-y-3.5 hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className={`w-11 h-11 rounded-xl ${pastelBg} border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#1E293B]`}>
              {icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 border border-slate-900 text-slate-800">
                {timeOfDay}
              </span>
              <h4 className="text-base font-extrabold text-slate-900 leading-snug mt-0.5">
                {activity.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border-2 border-[#16A34A] text-[#15803D] text-xs font-black shadow-[1px_1px_0px_#16A34A] shrink-0">
            <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
            <span>{Math.round(activity.qloo_affinity_match * 100)}% Match</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {activity.description}
        </p>

        <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{activity.address}</span>
          </span>
          <span className="capitalize px-2 py-0.5 rounded-md bg-[#E2F1F8] border border-slate-900 text-slate-800 text-[10px] font-bold">
            {activity.domain}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-[#15803D] text-xs font-black shadow-[2px_2px_0px_#1E293B]">
              <Compass className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Proactive Travel Mode</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              City Experience Concierge
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
              When you travel to a new city, the agent cross-references local cultural spots against your multi-domain taste graph to recommend niche galleries, analog kissatens, and listening bars.
            </p>
          </div>

          {/* City Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {supportedCities.map((city) => {
              const isSelected = selectedCity === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border-2 border-slate-900 flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#22C55E] text-white shadow-[2px_2px_0px_#1E293B] -translate-y-0.5'
                      : 'bg-white text-slate-800 hover:bg-slate-100 shadow-[2px_2px_0px_#1E293B]'
                  }`}
                >
                  <span>{city.icon}</span>
                  <span>{city.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {loading || !itinerary ? (
        <div className="flex flex-col items-center justify-center min-h-[350px]">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm font-bold text-slate-700">Synthesizing personalized city itinerary...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Itinerary Header */}
          <div className="brutal-card p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#BAE6FD] border border-slate-900 text-slate-900">
                Localized Lifestyle Blueprint
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">{itinerary.city}</h3>
              <p className="text-xs text-slate-600 mt-1 font-bold">
                Vibe Aesthetic: <span className="text-[#16A34A]">{itinerary.vibe_tag}</span>
              </p>
            </div>

            <div className="flex flex-col md:items-end space-y-1">
              <span className="text-[11px] uppercase font-black text-slate-500">
                Active Memory Anchors:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {itinerary.memory_anchors.map((anchor, idx) => (
                  <span key={idx} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-[#FAF7F2] border border-slate-900 text-slate-800">
                    &bull; {anchor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Part Day Grid styled after LearnHub Reference Image 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderActivityCard(
              itinerary.morning,
              'Morning & Audio Ritual',
              <Coffee className="w-5 h-5 text-slate-900" />,
              'bg-[#FED7AA]'
            )}
            {renderActivityCard(
              itinerary.afternoon,
              'Afternoon & Solitude',
              <BookOpen className="w-5 h-5 text-slate-900" />,
              'bg-[#BBF7D0]'
            )}
            {renderActivityCard(
              itinerary.evening,
              'Evening & Natural Tasting',
              <Wine className="w-5 h-5 text-slate-900" />,
              'bg-[#FECDD3]'
            )}
            {renderActivityCard(
              itinerary.night,
              'Night & Ambient Immersion',
              <Music className="w-5 h-5 text-slate-900" />,
              'bg-[#DDD6FE]'
            )}
          </div>
        </div>
      )}
    </div>
  );
};
