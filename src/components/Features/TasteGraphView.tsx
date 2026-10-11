import React, { useState, useEffect } from 'react';
import { Network, Plus, Calendar, Sparkles, Filter, Info, ArrowRight, Check } from 'lucide-react';
import { apiService } from '../../services/api';
import { TasteGraphData, TasteNode, TasteEdge } from '../../types';
import { Card } from '../UI/Card';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const domainColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  film: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  music: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  literature: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  dining: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'shadow-rose-500/20' },
  fashion: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' },
  travel: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
};

export const TasteGraphView: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-400">Loading Persistent Taste Knowledge Graph...</p>
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
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-black p-6 rounded-2xl border border-purple-500/20 backdrop-blur-xl shadow-2xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Hybrid Graph-Vector Memory Layer</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Evolving Taste Knowledge Graph
          </h2>
          <p className="text-gray-300 text-sm mt-1 max-w-2xl">
            Overcoming AI amnesia by tracking multi-domain taste trajectories across months.
            Discover how January's indie cinema echoes into April's architecture and culinary preferences.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Taste Milestone</span>
        </button>
      </div>

      {/* Timeline Filter Bar */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center space-x-1 pl-1">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          <span>Timeline:</span>
        </span>
        {timeOptions.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTimeFilter(time)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTimeFilter === time
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {time === 'all' ? 'Full Trajectory' : time}
          </button>
        ))}
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Graph Map */}
        <div className="lg:col-span-2 bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Cultural Entity Nodes ({filteredNodes.length})</span>
            </h3>
            <span className="text-xs text-gray-400">Click a node to inspect Qloo affinity bridges</span>
          </div>

          {/* Node Grid representation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredNodes.map((node) => {
              const color = domainColors[node.domain.toLowerCase()] || domainColors.film;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${color.bg} ${
                    isSelected
                      ? `${color.border} ring-2 ring-purple-500/60 scale-[1.02] shadow-lg ${color.glow}`
                      : 'border-gray-800/80 hover:border-gray-700 bg-gray-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${color.bg} ${color.text} border ${color.border}`}>
                      {node.domain}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono flex items-center space-x-1">
                      <Calendar className="w-3 h-3 mr-0.5 text-gray-500" />
                      {node.timestamp}
                    </span>
                  </div>

                  <h4 className="font-semibold text-white text-base leading-snug line-clamp-1">
                    {node.name}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {node.notes}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {node.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-white/5 text-gray-300 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-purple-300 font-bold">
                      {Math.round(node.affinity * 100)}% Match
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Persona Vector Summary */}
          {graphData?.user_persona && (
            <div className="mt-6 p-4 rounded-xl bg-purple-950/20 border border-purple-800/30">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Current Persona Vector:
              </span>
              <p className="text-sm font-medium text-white mt-1">
                {graphData.user_persona.archetype}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {graphData.user_persona.evolving_vector.map((v, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/5">
                    &bull; {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Node Inspector & Qloo Cross-Domain Bridges */}
        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center space-x-2 text-sm font-semibold text-gray-300 pb-3 border-b border-gray-800">
            <Info className="w-4 h-4 text-purple-400" />
            <span>Memory Node Inspector</span>
          </div>

          {selectedNode ? (
            <div className="mt-4 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
                  {selectedNode.domain} &bull; {selectedNode.timestamp}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedNode.name}</h3>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                  {selectedNode.notes}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Tags & Aesthetic Signals:
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connected Qloo Bridges */}
              <div className="pt-3 border-t border-gray-800">
                <h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Qloo Correlation Bridges ({activeBridges.length})</span>
                  <span className="text-[10px] text-purple-400">Cross-Domain</span>
                </h5>

                {activeBridges.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No direct bridges registered for this node.</p>
                ) : (
                  <div className="space-y-3">
                    {activeBridges.map((bridge) => {
                      const otherNodeId = bridge.source === selectedNode.id ? bridge.target : bridge.source;
                      const otherNode = nodes.find(n => n.id === otherNodeId);

                      return (
                        <div key={bridge.id} className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs space-y-1.5">
                          <div className="flex items-center justify-between font-mono text-[10px] text-purple-300 font-bold">
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                              {bridge.relation}
                            </span>
                            <span>{Math.round(bridge.strength * 100)}% Affinity</span>
                          </div>
                          <div className="text-gray-300 flex items-center space-x-1 font-medium">
                            <span>{selectedNode.name}</span>
                            <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                            <span className="text-white font-semibold">{otherNode?.name || 'Related Node'}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-normal">
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
            <p className="text-xs text-gray-500 mt-4">Select a node to inspect its affinity connections.</p>
          )}
        </div>
      </div>

      {/* Modal: Add New Cultural Milestone */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900 border border-purple-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Plus className="w-5 h-5 text-purple-400" />
              <span>Add Cultural Milestone</span>
            </h3>
            <p className="text-xs text-gray-400">
              Input a new entity you've enjoyed recently. The memory layer will synthesize its position and calculate Qloo cross-category bridges.
            </p>

            <form onSubmit={handleAddMilestone} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Entity / Title</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Crying in H Mart, Aphex Twin, Solaris"
                  className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
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
                  <label className="block text-xs font-medium text-gray-300 mb-1">Time Milestone</label>
                  <input
                    type="text"
                    value={newTimestamp}
                    onChange={(e) => setNewTimestamp(e.target.value)}
                    placeholder="e.g. May 2026"
                    className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Personal Notes & Reflections</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Why did this resonate? (e.g. Loved the melancholic pacing and visual stillness)"
                  className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g. Atmospheric, Indie, Nostalgia"
                  className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !newName.trim()}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 transition"
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
