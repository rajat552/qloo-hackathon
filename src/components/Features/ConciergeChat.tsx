import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Brain, Compass, Clock, CheckCircle2 } from 'lucide-react';
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
      text: "Welcome. I am your Taste-Evolving Concierge. Unlike standard assistants, I maintain persistent memory of your cultural journey across cinema, music, literature, and dining over time.\n\nI currently have your January indie cinema affinities, March cyberpunk explorations, and recent artisanal kissaten milestones loaded. How can I guide your lifestyle choices today?",
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
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/50 via-purple-950/40 to-black p-6 rounded-2xl border border-indigo-500/20 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-2">
            <Brain className="w-3.5 h-3.5" />
            <span>Anti-Amnesia Agentic Reasoning</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Conversational Concierge
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Real-time multi-turn dialogue with continuous access to your taste knowledge graph.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl">
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400">Qloo Cultural Confidence</div>
            <div className="text-lg font-mono font-bold text-purple-300">{Math.round(activeConfidence * 100)}% Match</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      {/* Main Chat & Memory Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Chat Window */}
        <div className="lg:col-span-2 flex flex-col h-[600px] bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'agent' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-purple-500/20">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20'
                      : 'bg-white/5 text-gray-200 border border-white/10 shadow-lg'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.memory_recalled && msg.memory_recalled.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider flex items-center mr-1">
                        <Clock className="w-3 h-3 mr-1" /> Recalled:
                      </span>
                      {msg.memory_recalled.map((m, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-200 font-mono">
                          {m.milestone} ({m.timestamp})
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 text-[10px] text-right opacity-60">
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Traversing taste knowledge graph & synthesizing Qloo correlations...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 border-t border-gray-800/80 bg-black/40 overflow-x-auto flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold text-gray-500 shrink-0">Try asking:</span>
            {samplePrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                disabled={loading}
                className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-purple-300 border border-white/5 transition"
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
            className="p-3 bg-black/60 border-t border-gray-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations, cross-category advice, or plan an evening..."
              className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl disabled:opacity-50 transition shadow-md shadow-purple-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Col: Active Memory Inspector Panel */}
        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sm font-semibold text-gray-300 pb-3 border-b border-gray-800">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Active Memory Inspector</span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  User Persona Archetype
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  Contemplative Urbanite & Speculative Aesthete
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Synthesized from 5 persistent cross-domain milestones spanning Winter to Spring 2026.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 mb-2 block">
                  Currently Recalled Knowledge Nodes ({activeMemory.length})
                </span>

                <div className="space-y-2.5">
                  {activeMemory.map((mem, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="uppercase text-purple-300 font-bold">{mem.domain}</span>
                        <span className="text-gray-400">{mem.timestamp}</span>
                      </div>
                      <p className="font-semibold text-white mt-1">{mem.milestone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs text-gray-300 leading-relaxed">
            <span className="font-semibold text-purple-300 block mb-1">
              💡 Why This Overcomes AI Amnesia:
            </span>
            Standard chatbots start from zero every session. The Taste-Evolving Concierge preserves your temporal graph so you never have to re-explain who you are or what moves you.
          </div>
        </div>
      </div>
    </div>
  );
};
