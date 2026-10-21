import React from 'react';
import { Network, Brain, Compass, Layers, Search, Sparkles, ThumbsUp } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onStartTour?: () => void;
}

const sections = [
  { id: 'graph', name: 'Taste Graph', icon: Network },
  { id: 'concierge', name: 'Concierge', icon: Brain },
  { id: 'city', name: 'City Mode', icon: Compass },
  { id: 'synthesis', name: 'Cross-Domain', icon: Layers },
  { id: 'search', name: 'Archive', icon: Search },
  { id: 'approval', name: 'Validator', icon: ThumbsUp },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange, onStartTour }) => {
  return (
    <header className="sticky top-2 sm:top-4 z-50 px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
      <div className="bg-white/95 backdrop-blur-md border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_#1E293B] px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 select-none shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#22C55E] border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">
                Taste<span className="text-[#16A34A]">Hub</span>
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-slate-500 font-semibold -mt-0.5">
              Taste-Evolving Concierge
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="tour-header-nav" className="hidden md:flex items-center gap-1 xl:gap-1.5">
          {sections.map(({ id, name, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`h-9 px-3 xl:px-3.5 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap border-2 select-none ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[2px_2px_0px_#16A34A] -translate-y-0.5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#22C55E]' : 'text-slate-500'}`} />
                <span className="whitespace-nowrap">{name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          {/* 10-Step Guided Tour Button */}
          {onStartTour && (
            <button
              id="tour-btn"
              onClick={onStartTour}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-[#E2F1F8] hover:bg-[#BAE6FD] border-2 border-slate-900 text-xs font-black text-slate-900 shadow-[2px_2px_0px_#1E293B] hover:-translate-y-0.5 transition shrink-0 whitespace-nowrap"
              title="Take a quick guided tour"
            >
              <Compass className="w-3.5 h-3.5 text-slate-800 shrink-0" />
              <span className="hidden sm:inline">Tour</span>
            </button>
          )}

          {/* Live Qloo Connectivity Pulse */}
          <div
            id="tour-qloo-live"
            className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-xs font-black text-[#15803D] shadow-[2px_2px_0px_#1E293B] shrink-0 whitespace-nowrap"
            title="Connected to Qloo Cultural Intelligence"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
            </span>
            <span className="hidden sm:inline">Qloo Live</span>
          </div>

          {/* Mobile Select Menu */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="bg-white border-2 border-slate-900 text-slate-900 text-xs font-bold rounded-xl px-2 py-1.5 focus:outline-none shadow-[2px_2px_0px_#1E293B] max-w-[110px] sm:max-w-none"
              aria-label="Navigation Menu"
            >
              {sections.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};