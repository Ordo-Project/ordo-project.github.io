import React from 'react';
import { Zap, AlertTriangle, Layers, Crosshair, BarChart3, TrendingUp } from 'lucide-react';
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
    <section id="ordogen" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-violet-400 tracking-wider uppercase">CONTEXT ROT & QUADRATIC COMPLEXITY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              OrdoGen: Long-Context Architecture Research
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-12">
          Commercial LLMs advertise nominal context windows up to 1M–2M tokens, but empirical testing proves that <strong className="text-white">nominal window length does not equal functional retrieval</strong>. Beyond 64K tokens, plain attention mass collapses by <span className="text-rose-400 font-semibold font-mono">24×</span>, leading to severe <strong className="text-white">Context Rot</strong>. OrdoGen targets this bottleneck through causal head localization and trainable GQA block selection.
        </p>

        {/* Technical Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-3xl border border-[#1E2330]">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">The 128K Context Cliff</h3>
            <p className="text-xs text-[#8A94A6] leading-relaxed">
              At 128K plain context, evidence attention mass drops by ~24× relative to 64K, resulting in 0/15 retrieval scores. Nominal context is non-functional without intervention.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#1E2330]">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">Layer 24 Head Bottleneck</h3>
            <p className="text-xs text-[#8A94A6] leading-relaxed">
              Per-head causal analysis pinpoints Layer 24 as the primary retrieval bottleneck. Selected head ablation drops query accuracy significantly (32/45 → 24/45, p=0.0078).
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#1E2330]">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <Crosshair className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">Gold Evidence Head Steering</h3>
            <p className="text-xs text-[#8A94A6] leading-relaxed">
              Oracle evidence steering on post-freeze cases boosts accuracy from 40/75 to 49/75 (p=0.0039) with zero regressions, paving the way for learned GQA block selectors.
            </p>
          </div>
        </div>

        {/* Interactive Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Chart 1: Context Rot & Evidence Attention Mass */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-rose-400" />
                  <span>Context Rot: Attention Mass Decay</span>
                </h3>
                <p className="text-xs text-[#8A94A6] mt-1">Measured evidence attention mass vs token position</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 text-[10px] font-mono border border-rose-800/50">
                24× Drop at 128K
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={contextRotData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="position" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="evidenceAttention" name="Evidence Attention Mass %" stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="retrievalAccuracy" name="Retrieval Accuracy %" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200">
              <strong>Context Rot Finding:</strong> Answer-free semantic query relays achieve exact 64K retrieval with <span className="text-emerald-400 font-mono font-bold font-semibold">4.2% latency overhead</span> (p=0.0156 replication).
            </div>
          </div>

          {/* Chart 2: Gold Evidence Head Steering Intervention */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                  <span>Gold Evidence Steering Intervention</span>
                </h3>
                <p className="text-xs text-[#8A94A6] mt-1">Causal rescue on 75 post-freeze plain cases</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-mono border border-emerald-800/50">
                +9 Gains (p=0.0039)
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={steeringData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="setup" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} domain={[0, 80]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="pct" name="Query Retrieval Score %" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
              <strong>Oracle Sufficiency:</strong> Steering causal attention heads rescues 9 post-freeze cases without causing a single regression across held-out sets.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
