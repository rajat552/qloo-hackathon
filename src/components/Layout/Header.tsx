import React from 'react';
import { Network, Brain, Compass, Layers, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'graph', name: 'Taste Graph', icon: Network },
  { id: 'concierge', name: 'Concierge Agent', icon: Brain },
  { id: 'city', name: 'City Mode', icon: Compass },
  { id: 'synthesis', name: 'Cross-Domain', icon: Layers },
  { id: 'search', name: 'Aesthetic Archive', icon: Search },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
      <div className="bg-white border-2 border-slate-900 rounded-2xl sm:rounded-3xl shadow-brutal px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo & Branding */}
        <div
          className="flex items-center space-x-3 cursor-pointer group select-none"
          onClick={() => onSectionChange('graph')}
        >
          <div className="w-10 h-10 bg-[#FECDD3] border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#1E293B] group-hover:scale-105 transition-transform duration-150">
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Taste<span className="text-[#16A34A]">Hub</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#DCFCE7] text-[#15803D] border border-slate-900 rounded-full">
                Qloo Agent
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 font-medium -mt-0.5">
              Taste-Evolving Concierge &bull; Graph Memory
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1.5">
          {sections.map(({ id, name, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#DCFCE7] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] -translate-y-0.5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                <span>{name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onSectionChange('concierge')}
            className="brutal-btn-primary px-3.5 sm:px-4 py-2 text-xs font-bold"
          >
            <Brain className="w-4 h-4" />
            <span>Launch Agent</span>
          </button>

          {/* Mobile Select Menu */}
          <div className="lg:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="bg-white border-2 border-slate-900 text-slate-900 text-xs font-bold rounded-xl px-2.5 py-2 focus:outline-none shadow-[2px_2px_0px_#1E293B]"
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