import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { TasteGraphView } from './components/Features/TasteGraphView';
import { ConciergeChat } from './components/Features/ConciergeChat';
import { CityItinerary } from './components/Features/CityItinerary';
import { CrossDomainSynthesis } from './components/Features/CrossDomainSynthesis';
import { SmartSearch } from './components/Features/SmartSearch';
import { ChoiceApproval } from './components/Features/ChoiceApproval';
import { apiService } from './services/api';
import { Bot, Sparkles, CheckCircle2, ShieldCheck, Github } from 'lucide-react';

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
        return <TasteGraphView onOpenConcierge={() => setActiveSection('concierge')} />;
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
        return <TasteGraphView onOpenConcierge={() => setActiveSection('concierge')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 selection:bg-[#BBF7D0] selection:text-slate-900 flex flex-col font-sans">
      {/* Decorative top soft sky backdrop strip */}
      <div className="h-2 w-full bg-[#BAE6FD] border-b-2 border-slate-900" />

      {/* Main Top Header */}
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* System Status & AI Badge Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
        <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-brutal-sm px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border border-slate-900 text-xs font-bold text-[#15803D]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>AI Engine Active</span>
            </span>
            <span className="text-xs text-slate-600 font-semibold hidden md:inline">
              Backend Status:
            </span>
            <span className="text-xs font-bold text-slate-800">
              {backendStatus === 'online' ? 'FastAPI Local Daemon (Port 8000)' : 'Client-Side Agent & Graph Memory Active'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#E2F1F8] border border-slate-900 text-[11px] text-slate-800 font-bold">
              <Sparkles className="w-3 h-3 text-[#16A34A]" />
              Hybrid Graph-Vector Memory: 5 Nodes & 5 Bridges
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#15803D]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {renderActiveSection()}
      </main>

      {/* Neo-brutalist Footer styled after LearnHub reference */}
      <footer className="mt-20 border-t-2 border-slate-900 bg-[#E2F1F8] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b-2 border-slate-900/20">
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FECDD3] border-2 border-slate-900 rounded-lg flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
                  <Sparkles className="w-4 h-4 text-slate-900" />
                </div>
                <span className="text-lg font-black text-slate-900">
                  Taste<span className="text-[#16A34A]">Hub</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Empowering personalized cultural discovery with Qloo cross-domain affinities and persistent graph memory.
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <a
                  href="https://github.com/rajat552/qloo-hackathon"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#1E293B] hover:translate-x-0.5 hover:translate-y-0.5 transition"
                  title="GitHub Repository"
                >
                  <Github className="w-4 h-4 text-slate-900" />
                </a>
                <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#1E293B]" title="Verified Safe">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                </div>
              </div>
            </div>

            {/* Col 2: Core Capabilities */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                Agent Features
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li><button onClick={() => setActiveSection('graph')} className="hover:text-slate-900 hover:underline">Taste Knowledge Graph</button></li>
                <li><button onClick={() => setActiveSection('concierge')} className="hover:text-slate-900 hover:underline">Anti-Amnesia Concierge</button></li>
                <li><button onClick={() => setActiveSection('city')} className="hover:text-slate-900 hover:underline">City Mode Itinerary</button></li>
                <li><button onClick={() => setActiveSection('synthesis')} className="hover:text-slate-900 hover:underline">Cross-Domain Synthesis</button></li>
              </ul>
            </div>

            {/* Col 3: Technology Stack */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                Built With
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li>Qloo API Cultural Graph</li>
                <li>FastAPI Microservice (Python)</li>
                <li>React 18 & TypeScript</li>
                <li>Neo-Brutalist Design System</li>
              </ul>
            </div>

            {/* Col 4: Project Info */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                Submission Info
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Built for the <span className="font-bold text-slate-900">Qloo Agentic AI Hackathon</span>.
              </p>
              <div className="mt-3 p-3 bg-white border-2 border-slate-900 rounded-xl shadow-[2px_2px_0px_#1E293B]">
                <div className="text-[10px] uppercase font-bold text-slate-500">Developer</div>
                <div className="text-xs font-extrabold text-slate-900">Rajat (@rajat552)</div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 font-medium">
            <p>&copy; 2026 Taste-Evolving Concierge. All rights reserved.</p>
            <div className="flex space-x-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>API Status: Normal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Concierge Action Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setActiveSection(activeSection === 'concierge' ? 'graph' : 'concierge')}
          className="brutal-btn-primary px-4 py-3 rounded-2xl shadow-brutal hover:shadow-brutal-sm text-xs font-extrabold"
          title="Chat with Concierge Agent"
        >
          <Bot className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">
            {activeSection === 'concierge' ? 'View Taste Graph' : 'Talk to Concierge'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;