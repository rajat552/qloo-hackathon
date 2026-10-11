import React from 'react';
import { Network, Brain, Compass, Layers, Search, Sparkles, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'graph', name: 'Taste Graph', icon: Network, badge: 'Memory' },
  { id: 'concierge', name: 'Concierge Agent', icon: Brain, badge: 'AI' },
  { id: 'city', name: 'City Mode', icon: Compass, badge: 'Travel' },
  { id: 'synthesis', name: 'Cross-Domain', icon: Layers, badge: 'Matrix' },
  { id: 'search', name: 'Aesthetic Archive', icon: Search, badge: 'Catalog' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  return (
    <header className="bg-black/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSectionChange('graph')}>
            <div className="w-11 h-11 bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-600/30 ring-1 ring-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-purple-300 bg-clip-text text-transparent tracking-tight">
                  Taste-Evolving Concierge
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-widest hidden sm:inline-block">
                  Qloo Hackathon
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Personalized Multi-Domain AI Agent &bull; <span className="text-purple-400 font-mono">Hybrid Graph Memory</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Navigation Bar */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
            {sections.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            ))}
          </nav>

          {/* Solo Developer Identity Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
            <UserCheck className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-400">Developer:</span>
            <span className="font-semibold text-white">Rajat (@rajat552)</span>
          </div>

          {/* Mobile Select Menu */}
          <div className="lg:hidden">
            <select
              value={activeSection}
              onChange={(e) => onSectionChange(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
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