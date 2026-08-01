import React from 'react';
import { AlertTriangle, Layers, Crosshair, BarChart3, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart, Bar } from 'recharts';

export const OrdoGenSection: React.FC = () => {
  // Attention mass decay across window lengths (64K vs 128K cliff)
  const contextRotData = [
    { position: '0K - 16K', evidenceAttention: 100, retrievalAccuracy: 98, label: 'High Attention' },
    { position: '16K - 32K', evidenceAttention: 92, retrievalAccuracy: 95, label: 'Stable' },
    { position: '32K - 64K', evidenceAttention: 78, retrievalAccuracy: 90, label: '64K Exact Relay' },
    { position: '64K - 96K', evidenceAttention: 24, retrievalAccuracy: 35, label: 'Attention Collapse' },
    { position: '96K - 128K', evidenceAttention: 4.1, retrievalAccuracy: 0, label: '128K Plain Cliff (0/15)' },
  ];

  // Head Steering & Ablation Data
  const steeringData = [
    { setup: 'Post-Freeze Plain (Control)', score: 40, total: 75, pct: 53.3, label: '53.3% Baseline' },
    { setup: 'Matched-Control Heads', score: 40, total: 75, pct: 53.3, label: '53.3% Control' },
    { setup: 'Selected-Head Ablation', score: 24, total: 45, pct: 53.3, label: 'Drop (p=0.0078)' },
    { setup: 'Gold Evidence Head Steering', score: 49, total: 75, pct: 65.3, label: '65.3% (+9 Gains, p=0.0039)' },
  ];

  return (
    <section id="ordogen" className="py-20 relative border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400 font-mono text-xs">
            02
          </div>
          <div>
            <span className="text-xs font-mono text-violet-400 tracking-wider uppercase">PAPER 02 • CONTEXT ROT & COMPLEXITY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              OrdoGen: Long-Context & Attention Bottleneck Research
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-10">
          Commercial LLMs advertise nominal context windows up to 1M - 2M tokens, but empirical context rot evaluations reveal that <strong className="text-white">nominal window length does not equal functional retrieval</strong>. At 128K tokens, evidence attention mass collapses by ~24x, yielding 0/15 retrieval accuracy. OrdoGen addresses quadratic O(N^2) complexity through causal head localization (Layer 24) and trainable GQA block selectors.
        </p>

        {/* Technical Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330]">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-xs font-mono mb-1">1. The 128K Context Cliff</h3>
            <p className="text-xs text-[#8A94A6] leading-relaxed font-light">
              Plain 128K context runs experience a 24x drop in evidence attention mass relative to matched 64K runs, yielding 0/15 retrieval accuracy.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330]">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-xs font-mono mb-1">2. Layer 24 Retrieval Bottleneck</h3>
            <p className="text-xs text-[#8A94A6] leading-relaxed font-light">
              Per-head causal ablation isolates Layer 24 as the key retrieval bottleneck. Selected head ablation significantly reduces accuracy (32/45 -&gt; 24/45, p=0.0078).
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330]">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Crosshair className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-xs font-mono mb-1">3. Gold Evidence Head Steering</h3>
            <p className="text-xs text-[#8A94A6] leading-relaxed font-light">
              Oracle evidence head steering on post-freeze cases boosts retrieval from 40/75 to 49/75 (p=0.0039) with zero regressions across control sets.
            </p>
          </div>
        </div>

        {/* Empirical Figures */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Figure 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
                  <TrendingUp className="w-4 h-4 text-rose-400" />
                  <span>Figure 3: Attention Mass Decay Across Context Windows</span>
                </h3>
                <p className="text-[11px] text-[#8A94A6]">Empirical measurement on RTX A6000 clusters</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-mono border border-rose-800">
                24x Drop at 128K
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={contextRotData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="position" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="evidenceAttention" name="Evidence Attention Mass %" stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="retrievalAccuracy" name="Retrieval Accuracy %" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] text-[#8A94A6] font-sans">
              <strong className="text-white">Analysis:</strong> Answer-free semantic query relays achieve exact retrieval replication at 64K window length with only <span className="text-emerald-400 font-mono">4.2% latency overhead</span> (p=0.0156).
            </div>
          </div>

          {/* Figure 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
                  <BarChart3 className="w-4 h-4 text-violet-400" />
                  <span>Figure 4: Causal Gold Evidence Steering Results</span>
                </h3>
                <p className="text-[11px] text-[#8A94A6]">75 post-freeze case interventions</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-800">
                +9 Gains (p=0.0039)
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={steeringData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="setup" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} domain={[0, 80]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                  <Bar dataKey="pct" name="Query Retrieval Score %" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] text-[#8A94A6] font-sans">
              <strong className="text-white">Analysis:</strong> Steering causal attention heads rescues 9 post-freeze cases (40/75 -&gt; 49/75) with zero regressions across control sets.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
