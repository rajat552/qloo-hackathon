import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { TasteGraphView } from './components/Features/TasteGraphView';
import { ConciergeChat } from './components/Features/ConciergeChat';
import { CityItinerary } from './components/Features/CityItinerary';
import { CrossDomainSynthesis } from './components/Features/CrossDomainSynthesis';
import { SmartSearch } from './components/Features/SmartSearch';
import { ChoiceApproval } from './components/Features/ChoiceApproval';
import { apiService } from './services/api';
import { Bot } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('graph');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        await apiService.healthCheck();
        setBackendStatus('online');
      } catch {
        setBackendStatus('offline');
      }
    };

    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'graph':
        return <TasteGraphView />;
      case 'concierge':
        return <ConciergeChat />;
      case 'city':
        return <CityItinerary />;
      case 'synthesis':
        return <CrossDomainSynthesis />;
      case 'search':
        return <SmartSearch />;
      case 'approval':
        return <ChoiceApproval />;
      default:
        return <TasteGraphView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 selection:bg-purple-600 selection:text-white">
      {/* Sleek Ambient Lighting Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Backend Connectivity Status Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="flex items-center justify-between text-xs py-2 px-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full animate-ping bg-emerald-400" />
              <span className="text-gray-400 font-medium">System Status:</span>
              <span className={`font-semibold ${backendStatus === 'online' ? 'text-emerald-400' : 'text-purple-300'}`}>
                {backendStatus === 'online' ? 'FastAPI Backend Online (Port 8000)' : 'Client-Side Demo & Memory Layer Active'}
              </span>
            </div>

            <div className="text-gray-400 font-mono text-[11px] hidden sm:block">
              Hybrid Graph-Vector Memory: <span className="text-purple-300">Initialized (5 Nodes, 5 Bridges)</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          {renderActiveSection()}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/60 py-6 mt-12 text-center text-xs text-gray-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              The Taste-Evolving Concierge &bull; Built for the <span className="text-purple-300 font-semibold">Qloo Agentic Hackathon</span>
            </p>
            <p className="font-mono text-[11px]">
              Solo Developer: <span className="text-white font-semibold">Rajat</span> (<a href="https://github.com/rajat552" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">@rajat552</a>)
            </p>
          </div>
        </footer>

        {/* Floating Concierge / Choice Approval Launcher */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setActiveSection(activeSection === 'concierge' ? 'graph' : 'concierge')}
            className="group flex items-center space-x-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-xs shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all duration-200"
            title="Chat with Concierge Agent"
          >
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="hidden sm:inline">
              {activeSection === 'concierge' ? 'View Taste Graph' : 'Talk to Concierge'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;