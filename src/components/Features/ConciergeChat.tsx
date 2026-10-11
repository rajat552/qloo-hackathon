import React, { useState } from 'react';
import { Send, Bot, User, Brain, Compass, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { apiService } from '../../services/api';
import { ConciergeChatMessage, MemoryRecalled } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const samplePrompts = [
  "How do my cinema tastes connect to my dining preferences?",
  "I have a free Saturday afternoon. Where should I go based on what I've read and listened to?",
  "Why did you recommend a vinyl listening bar in Kyoto?",
  "Synthesize my love for sci-fi literature into evening plans."
];

export const ConciergeChat: React.FC = () => {
  const [messages, setMessages] = useState<ConciergeChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: "Welcome! I am your Taste-Evolving Concierge. Unlike standard chatbots that forget everything between sessions, I maintain persistent graph memory of your cultural journey across cinema, music, literature, and dining over time.\n\nI currently have your January indie cinema affinities, March cyberpunk explorations, and recent artisanal kissaten milestones loaded. How can I guide your lifestyle choices today?",
      timestamp: 'Just now',
      memory_recalled: [
        { milestone: "Past Lives (Celine Song)", domain: "film", timestamp: "January 2026" },
        { milestone: "Neuromancer & Exhalation", domain: "literature", timestamp: "March 2026" }
      ],
      qloo_confidence_score: 0.95,
      active_persona: "Contemplative Urbanite & Speculative Aesthete"
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeMemory, setActiveMemory] = useState<MemoryRecalled[]>(messages[0].memory_recalled || []);
  const [activeConfidence, setActiveConfidence] = useState<number>(0.95);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ConciergeChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiService.chatWithConcierge(text);
      
      const agentMsg: ConciergeChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        memory_recalled: response.memory_recalled,
        qloo_confidence_score: response.qloo_confidence_score,
        active_persona: response.active_persona
      };

      setMessages(prev => [...prev, agentMsg]);
      if (response.memory_recalled) {
        setActiveMemory(response.memory_recalled);
      }
      if (response.qloo_confidence_score) {
        setActiveConfidence(response.qloo_confidence_score);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Soft Sky Pastel styling */}
      <div className="bg-[#E2F1F8] border-2 border-slate-900 p-6 rounded-3xl shadow-brutal flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-[#15803D] text-xs font-black mb-2 shadow-[2px_2px_0px_#1E293B]">
            <Brain className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Anti-Amnesia Agentic Reasoning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Conversational Concierge
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium max-w-xl">
            Real-time multi-turn dialogue with continuous access to your taste knowledge graph.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white border-2 border-slate-900 px-4 py-2.5 rounded-2xl shadow-[2px_2px_0px_#1E293B]">
          <div>
            <div className="text-[10px] uppercase font-black text-slate-500">Qloo Cultural Confidence</div>
            <div className="text-base font-black text-slate-900">{Math.round(activeConfidence * 100)}% Match</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] border border-slate-900 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
          </div>
        </div>
      </div>

      {/* Main Chat & Memory Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Chat Window */}
        <div className="lg:col-span-8 flex flex-col h-[640px] bg-white border-2 border-slate-900 rounded-3xl shadow-brutal overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FFFDF9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'agent' && (
                  <div className="w-9 h-9 rounded-xl bg-[#FECDD3] border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E293B]">
                    <Bot className="w-5 h-5 text-slate-900" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed border-2 border-slate-900 shadow-[3px_3px_0px_#1E293B] ${
                    msg.sender === 'user'
                      ? 'bg-[#22C55E] text-white font-bold'
                      : 'bg-white text-slate-800 font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.memory_recalled && msg.memory_recalled.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t-2 border-slate-900/10 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-slate-700 font-black uppercase tracking-wider flex items-center mr-1">
                        <Clock className="w-3 h-3 mr-1 text-slate-500" /> Recalled Memory:
                      </span>
                      {msg.memory_recalled.map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-[#DCFCE7] border border-slate-900 text-[#15803D] font-bold">
                          {m.milestone} ({m.timestamp})
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={`mt-2 text-[10px] text-right font-bold ${msg.sender === 'user' ? 'text-white/80' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-[#BAE6FD] border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E293B]">
                    <User className="w-5 h-5 text-slate-900" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#FECDD3] border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E293B]">
                  <Bot className="w-5 h-5 text-slate-900" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] text-xs text-slate-600 font-bold flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Traversing taste knowledge graph & synthesizing Qloo correlations...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 border-t-2 border-slate-900 bg-[#E2F1F8] overflow-x-auto flex items-center space-x-2">
            <span className="text-[10px] uppercase font-black text-slate-700 shrink-0">Try asking:</span>
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                disabled={loading}
                className="shrink-0 text-xs font-bold px-3 py-1 rounded-xl bg-white hover:bg-[#DCFCE7] text-slate-800 border-2 border-slate-900 shadow-[1px_1px_0px_#1E293B] hover:-translate-y-0.5 transition"
              >
                "{p}"
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t-2 border-slate-900 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations, cross-category advice, or plan an evening..."
              className="flex-1 px-4 py-2.5 bg-[#FFFDF9] border-2 border-slate-900 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="brutal-btn-primary px-4 py-2.5 rounded-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>

        {/* Right 4 Cols: Active Memory Inspector Panel */}
        <div className="lg:col-span-4 brutal-card p-6 bg-[#FAF7F2] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b-2 border-slate-900/20">
              <div className="w-7 h-7 rounded-lg bg-[#DDD6FE] border-2 border-slate-900 flex items-center justify-center">
                <Compass className="w-4 h-4 text-slate-900" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Active Memory Inspector
              </h3>
            </div>

            {/* Persona Archetype */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[2px_2px_0px_#1E293B] space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500">
                User Persona Archetype
              </span>
              <p className="text-sm font-black text-slate-900">
                Contemplative Urbanite & Speculative Aesthete
              </p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                Synthesized from 5 persistent cross-domain milestones spanning Winter to Spring 2026.
              </p>
            </div>

            {/* Recalled Knowledge Nodes */}
            <div className="space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                Recalled Knowledge Nodes ({activeMemory.length})
              </span>

              <div className="space-y-2">
                {activeMemory.map((mem, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] text-xs">
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                      <span className="uppercase px-2 py-0.5 rounded bg-[#BAE6FD] border border-slate-900 text-slate-900">
                        {mem.domain}
                      </span>
                      <span className="text-slate-500">{mem.timestamp}</span>
                    </div>
                    <p className="font-extrabold text-slate-900 mt-1.5">{mem.milestone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Callout */}
          <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] text-xs text-slate-800 leading-relaxed">
            <span className="font-black text-[#15803D] block mb-1">
              💡 Why This Overcomes AI Amnesia:
            </span>
            Standard chatbots start from zero every session. The Taste-Evolving Concierge preserves your temporal graph so you never have to re-explain who you are or what moves you.
          </div>
        </div>
      </div>
    </div>
  );
};
