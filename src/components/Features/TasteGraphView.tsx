import React, { useState, useEffect } from 'react';
import { Network, Plus, Calendar, Info, ArrowRight, Film, Music, BookOpen, Utensils, Shirt, Compass, Star, Target, Layers } from 'lucide-react';
import { apiService } from '../../services/api';
import { TasteGraphData, TasteNode, QlooEntity } from '../../types';
import { LoadingSpinner } from '../UI/LoadingSpinner';

interface TasteGraphViewProps {
  onOpenConcierge?: () => void;
  onStartTour?: () => void;
}

const domainConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  film: { bg: 'bg-[#FED7AA]', text: 'text-amber-950', icon: <Film className="w-5 h-5 text-slate-900" /> },
  music: { bg: 'bg-[#BAE6FD]', text: 'text-sky-950', icon: <Music className="w-5 h-5 text-slate-900" /> },
  literature: { bg: 'bg-[#DDD6FE]', text: 'text-purple-950', icon: <BookOpen className="w-5 h-5 text-slate-900" /> },
  dining: { bg: 'bg-[#BBF7D0]', text: 'text-emerald-950', icon: <Utensils className="w-5 h-5 text-slate-900" /> },
  fashion: { bg: 'bg-[#FECDD3]', text: 'text-rose-950', icon: <Shirt className="w-5 h-5 text-slate-900" /> },
  travel: { bg: 'bg-[#BAE6FD]', text: 'text-indigo-950', icon: <Compass className="w-5 h-5 text-slate-900" /> },
};

export const TasteGraphView: React.FC<TasteGraphViewProps> = ({ onOpenConcierge, onStartTour }) => {
  const [graphData, setGraphData] = useState<TasteGraphData | null>(null);
  const [selectedNode, setSelectedNode] = useState<TasteNode | null>(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New node form state
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('literature');
  const [newTimestamp, setNewTimestamp] = useState('May 2026');
  const [newNotes, setNewNotes] = useState('');
  const [newTag, setNewTag] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Live Qloo Autocomplete State
  const [qlooSuggestions, setQlooSuggestions] = useState<QlooEntity[]>([]);
  const [isSearchingQloo, setIsSearchingQloo] = useState(false);

  const handleNameChange = async (val: string) => {
    setNewName(val);
    if (val.trim().length >= 3) {
      setIsSearchingQloo(true);
      try {
        const matches = await apiService.searchQloo(val, 4);
        setQlooSuggestions(matches);
      } catch {
        setQlooSuggestions([]);
      } finally {
        setIsSearchingQloo(false);
      }
    } else {
      setQlooSuggestions([]);
    }
  };

  const handleSelectEntity = (entity: QlooEntity) => {
    setNewName(entity.name);
    setQlooSuggestions([]);
    if (entity.subtype?.includes('movie') || entity.subtype?.includes('film')) setNewDomain('film');
    else if (entity.subtype?.includes('artist') || entity.subtype?.includes('music')) setNewDomain('music');
    else if (entity.subtype?.includes('book')) setNewDomain('literature');
    else if (entity.subtype?.includes('place')) setNewDomain('dining');
    else if (entity.subtype?.includes('brand')) setNewDomain('fashion');
  };

  useEffect(() => {
    loadGraph();
  }, []);

  const loadGraph = async () => {
    setLoading(true);
    try {
      const data = await apiService.getTasteGraph();
      setGraphData(data);
      if (data.nodes.length > 0) {
        setSelectedNode(data.nodes[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSubmitting(true);
    try {
      await apiService.addTasteNode({
        name: newName,
        domain: newDomain,
        timestamp: newTimestamp,
        notes: newNotes,
        tags: newTag ? newTag.split(',').map(t => t.trim()) : [newDomain]
      });
      setShowAddModal(false);
      setNewName('');
      setNewNotes('');
      setNewTag('');
      await loadGraph();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm font-bold text-slate-700">Loading Persistent Taste Knowledge Graph...</p>
      </div>
    );
  }

  const nodes = graphData?.nodes || [];
  const edges = graphData?.edges || [];

  const timeOptions = ['all', ...Array.from(new Set(nodes.map(n => n.timestamp)))];
  const filteredNodes = selectedTimeFilter === 'all'
    ? nodes
    : nodes.filter(n => n.timestamp === selectedTimeFilter);

  // Bridges connected to selected node
  const activeBridges = selectedNode
    ? edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
    : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section id="tour-brand-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
        {/* Left Column: Headline & Action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border-2 border-slate-900 text-xs font-black text-[#15803D] shadow-[2px_2px_0px_#1E293B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span>New: Persistent Hybrid Memory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
            Map Your Taste, <br />
            <span className="text-[#16A34A]">Anytime, Anywhere!</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
            Overcoming AI amnesia with Qloo cross-domain affinities. Connect how January's indie cinema echoes into April's architecture, literature, and dining.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="tour-add-milestone-btn"
              onClick={() => setShowAddModal(true)}
              className="brutal-btn-primary px-5 py-3 text-sm font-black rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Add Taste Milestone</span>
            </button>

            {onOpenConcierge && (
              <button
                onClick={onOpenConcierge}
                className="brutal-btn-secondary px-5 py-3 text-sm font-black rounded-xl"
              >
                <span>Talk to Concierge &rarr;</span>
              </button>
            )}

            {onStartTour && (
              <button
                onClick={onStartTour}
                className="px-4 py-3 text-sm font-black rounded-xl bg-[#FAF7F2] hover:bg-[#E2F1F8] border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] text-slate-800 transition flex items-center space-x-1.5"
                title="Start 10-Step Interactive Tour"
              >
                <Compass className="w-4 h-4 text-slate-700" />
                <span>10-Step Tour</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div className="lg:col-span-5 relative pr-2">
          {/* Decorative Corner Category Badges (anchored cleanly without clipping) */}
          <div className="hidden sm:flex absolute -top-2.5 -right-1 z-20 w-10 h-10 rounded-2xl bg-[#FECDD3] border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] items-center justify-center">
            <Target className="w-4 h-4 text-slate-900" />
          </div>

          <div className="hidden sm:flex absolute top-1/2 -right-2.5 z-20 w-8 h-8 rounded-full bg-[#BBF7D0] border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] items-center justify-center">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          </div>

          <div className="hidden sm:flex absolute -bottom-2.5 -left-1 z-20 w-9 h-9 rounded-2xl bg-[#DDD6FE] border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] items-center justify-center">
            <Layers className="w-4 h-4 text-slate-900" />
          </div>

          {/* Main Card Container */}
          <div id="tour-persona-card" className="brutal-card p-6 sm:p-7 relative z-10 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#BAE6FD] border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
                <Network className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {graphData?.user_persona.archetype || 'Contemplative Urbanite'}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  5 Cultural Milestones &bull; 5 Active Bridges
                </p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Cross-Domain Cohesion</span>
                <span className="text-[#16A34A]">92%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full border-2 border-slate-900 p-0.5 overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                  style={{ width: '92%' }}
                />
              </div>
            </div>

            {/* Persona Trajectory Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {graphData?.user_persona.evolving_vector.map((v, i) => (
                <span key={i} className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-900 text-slate-800">
                  &bull; {v}
                </span>
              ))}
            </div>

            {/* Action inside card */}
            <button
              onClick={() => {
                if (filteredNodes.length > 0) setSelectedNode(filteredNodes[0]);
              }}
              className="w-full brutal-btn-primary py-3 rounded-xl text-xs font-black shadow-brutal-sm"
            >
              <span>Inspect Taste Graph</span>
            </button>
          </div>
        </div>
      </section>

      {/* Explore Section Header matching LearnHub Reference Image 2 */}
      <section id="tour-explore-section" className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <div className="inline-block px-4 py-1 rounded-full bg-[#BAE6FD] border-2 border-slate-900 text-xs font-black text-slate-900 shadow-[2px_2px_0px_#1E293B]">
            Knowledge Nodes
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Cultural Milestones
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Browse through your saved milestones and click to reveal Qloo cross-category bridges.
          </p>
        </div>

        {/* Timeline Filter Bar */}
        <div className="flex items-center justify-center space-x-2.5 overflow-x-auto py-2">
          <span className="text-xs uppercase tracking-wider text-slate-500 font-extrabold flex items-center space-x-1 pl-1">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>Timeline:</span>
          </span>
          {timeOptions.map((time) => {
            const isSelected = selectedTimeFilter === time;
            return (
              <button
                key={time}
                onClick={() => setSelectedTimeFilter(time)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border-2 border-slate-900 ${
                  isSelected
                    ? 'bg-[#22C55E] text-white shadow-[2px_2px_0px_#1E293B] -translate-y-0.5'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-[2px_2px_0px_#1E293B]'
                }`}
              >
                {time === 'all' ? 'All Milestones' : time}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Cultural Nodes (2 cols) + Inspector (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Cols: Cultural Entity Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredNodes.map((node) => {
              const cfg = domainConfig[node.domain.toLowerCase()] || domainConfig.film;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`brutal-card p-5 cursor-pointer relative overflow-hidden transition-all duration-200 ${
                    isSelected
                      ? 'ring-4 ring-[#22C55E] -translate-y-1 shadow-brutal-lg'
                      : 'hover:-translate-y-1 hover:shadow-brutal-lg'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-11 h-11 rounded-xl ${cfg.bg} border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#1E293B]`}>
                        {cfg.icon}
                      </div>
                      <div>
                        <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 border border-slate-900 text-slate-800 whitespace-nowrap">
                          {node.domain}
                        </span>
                        <div className="text-[11px] text-slate-500 font-bold mt-0.5 flex items-center whitespace-nowrap">
                          <Calendar className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                          {node.timestamp}
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border-2 border-[#16A34A] text-[#15803D] text-xs font-black shadow-[1px_1px_0px_#16A34A] shrink-0 whitespace-nowrap">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
                      <span>{Math.round(node.affinity * 100)}%</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-1">
                    {node.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                    {node.notes}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-slate-900/10">
                    <div className="flex flex-wrap gap-1">
                      {node.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-[#E2F1F8] border border-slate-900 text-slate-800 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-black text-[#16A34A] flex items-center">
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 4 Cols: Node Inspector & Qloo Affinity Bridges */}
          <div id="tour-memory-inspector" className="lg:col-span-4 brutal-card p-6 space-y-5 bg-[#FAF7F2]">
            <div className="flex items-center space-x-2 pb-3 border-b-2 border-slate-900/20">
              <div className="w-7 h-7 rounded-lg bg-[#FECDD3] border-2 border-slate-900 flex items-center justify-center">
                <Info className="w-4 h-4 text-slate-900" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Memory Node Inspector
              </h3>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[2px_2px_0px_#1E293B] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {selectedNode.domain} &bull; {selectedNode.timestamp}
                    </span>
                    <span className="text-xs font-black text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-md border border-slate-900">
                      {Math.round(selectedNode.affinity * 100)}% Match
                    </span>
                  </div>

                  {selectedNode.image_url && (
                    <div className="w-full h-36 rounded-xl overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] bg-slate-100">
                      <img
                        src={selectedNode.image_url}
                        alt={selectedNode.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).parentElement?.classList.add('hidden');
                        }}
                      />
                    </div>
                  )}

                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {selectedNode.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedNode.notes}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {selectedNode.tags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#DDD6FE] text-purple-950 border border-slate-900">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Qloo Bridges */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Qloo Affinity Bridges ({activeBridges.length})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#BAE6FD] border border-slate-900 text-slate-900">
                      Cross-Category
                    </span>
                  </div>

                  {activeBridges.length === 0 ? (
                    <p className="text-xs text-slate-500 italic p-3 bg-white border-2 border-slate-900 rounded-xl">
                      No direct cross-domain bridges registered for this node yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {activeBridges.map((bridge) => {
                        const otherNodeId = bridge.source === selectedNode.id ? bridge.target : bridge.source;
                        const otherNode = nodes.find(n => n.id === otherNodeId);

                        return (
                          <div
                            key={bridge.id}
                            className="p-3.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#1E293B] space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                              <span className="px-2 py-0.5 rounded-md bg-[#BBF7D0] border border-slate-900 text-emerald-950 uppercase">
                                {bridge.relation}
                              </span>
                              <span className="text-slate-900 font-black">
                                {Math.round(bridge.strength * 100)}% Affinity
                              </span>
                            </div>

                            <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                              <span>{selectedNode.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                              <span className="text-[#16A34A]">{otherNode?.name || 'Related Node'}</span>
                            </div>

                            <p className="text-[11px] text-slate-600 leading-normal font-medium bg-slate-50 p-2 rounded-lg border border-slate-200">
                              {bridge.qloo_correlation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-6">
                Click any milestone on the left to inspect its Qloo affinity bridges.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Modal: Add New Cultural Milestone */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-2 border-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-brutal-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#BBF7D0] border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#1E293B]">
                  <Plus className="w-4 h-4 text-slate-900" />
                </div>
                <span>Add Cultural Milestone</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 font-black text-xs flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Input a cultural entity you've enjoyed recently. The memory layer will synthesize its position and calculate Qloo cross-category bridges.
            </p>

            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-black text-slate-900">Entity / Title</label>
                  <span className="text-[10px] font-black text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-slate-900 shadow-[1px_1px_0px_#1E293B]">
                    {isSearchingQloo ? 'Searching Qloo...' : 'Qloo Live Autocomplete'}
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Crying in H Mart, Aphex Twin, Solaris"
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
                />

                {/* Autocomplete Dropdown */}
                {qlooSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border-2 border-slate-900 rounded-xl shadow-brutal p-1.5 space-y-1">
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-2 py-0.5">
                      Qloo Live Matches:
                    </div>
                    {qlooSuggestions.map((item) => (
                      <button
                        key={item.entity_id}
                        type="button"
                        onClick={() => handleSelectEntity(item)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#DCFCE7] text-xs font-bold text-slate-900 flex items-center justify-between group transition"
                      >
                        <div className="flex items-center space-x-2 truncate">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-5 h-5 rounded-md object-cover border border-slate-900 shrink-0" />
                          ) : (
                            <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-900 flex items-center justify-center text-[10px] shrink-0">🏛️</span>
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                          {item.subtype ? item.subtype.replace('urn:entity:', '') : 'entity'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-900 mb-1">Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="film">Film / Cinema</option>
                    <option value="music">Music / Audio</option>
                    <option value="literature">Literature / Books</option>
                    <option value="dining">Dining / Culinary</option>
                    <option value="fashion">Fashion / Aesthetics</option>
                    <option value="travel">Travel / Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-900 mb-1">Milestone Date</label>
                  <input
                    type="text"
                    value={newTimestamp}
                    onChange={(e) => setNewTimestamp(e.target.value)}
                    placeholder="e.g. May 2026"
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">Personal Notes & Reflections</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Why did this resonate? (e.g. Loved the melancholic pacing and quiet intimacy)"
                  className="w-full px-3.5 py-2 bg-white border-2 border-slate-900 rounded-xl text-xs font-medium text-slate-900 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g. Atmospheric, Indie, Nostalgia"
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t-2 border-slate-900/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !newName.trim()}
                  className="brutal-btn-primary px-5 py-2.5 text-xs font-black rounded-xl disabled:opacity-50"
                >
                  {submitting ? 'Linking to Graph...' : 'Commit to Memory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
