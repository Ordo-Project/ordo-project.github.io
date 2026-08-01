import React from 'react';
import { Cpu, BarChart3, Clock, Lock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const OrdoMSection: React.FC = () => {
  // Data for Collateral Damage Comparison
  const collateralData = [
    { metric: 'CounterFact Efficacy', 'Ordo-M': 100, 'LoRA (Equal Cap)': 100 },
    { metric: 'Paraphrase Generalization', 'Ordo-M': 97.2, 'LoRA (Equal Cap)': 68.5 },
    { metric: 'Collateral Damage (Lower is better)', 'Ordo-M': 0.0, 'LoRA (Equal Cap)': 8.4 },
    { metric: '50 Fact Update Retention', 'Ordo-M': 88.0, 'LoRA (Equal Cap)': 41.2 },
  ];

  // Data for Wave Training Parity
  const waveData = [
    { setup: 'Old baseline (6 epochs)', waveAvg: 29.5, drift: 0.0, label: '29.5% Wave Avg' },
    { setup: 'Calib 500 -> Freeze (6 ep)', waveAvg: 81.1, drift: 0.5, label: '81.1% Wave Avg' },
    { setup: 'Calib 500 -> Freeze (18 ep)', waveAvg: 96.2, drift: 0.0, label: '96.2% Wave Avg (Parity)' },
    { setup: 'Full Retrain (Control)', waveAvg: 96.9, drift: 0.0, label: '96.9% Full Retrain' },
  ];

  return (
    <section id="ordo-m" className="py-20 relative border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xs">
            01
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">PAPER 01 • TECHNICAL SPECIFICATION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Ordo-M: External Rewritable Memory Matrices
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-10">
          Ordo-M introduces a parameter-isolated memory architecture that attaches an external rewritable value table to a <strong className="text-white">frozen base LLM</strong> (Qwen3-8B baseline) via a single forward-hook at network layer depth <code className="text-cyan-300 font-mono">0.66</code>. Memory edits operate purely on value vectors, ensuring zero parameter modifications to the host LLM and zero collateral side-damage.
        </p>

        {/* Mathematical Formulation Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#1E2330] mb-10 bg-[#0B0D13]">
          <h3 className="text-sm font-mono font-bold text-white mb-4 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Mathematical Formulation & Forward Hook Mechanics</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] space-y-3">
              <div className="text-cyan-400 font-semibold">// 1. Entity Canonical Address Mapping</div>
              <div className="text-slate-300">
                {"a(s) = SHA-256(Canonical(s)) mod M"}
              </div>
              <p className="text-[#8A94A6] font-sans font-light leading-relaxed">
                Input entity mentions s are deterministically mapped to address slot a. Non-matching or unindexed tokens yield zero lookup vector.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050608] border border-[#1E2330] space-y-3">
              <div className="text-violet-400 font-semibold">// 2. Residual Injection at Depth 0.66</div>
              <div className="text-slate-300">
                {"h_l <= h_l + W_out * v_a(s)"}
              </div>
              <p className="text-[#8A94A6] font-sans font-light leading-relaxed">
                Linear projection matrix W_out injects memory vectors into layer depth 0.66. Initialized to zeros, leaving model byte-identical prior to edit ingestion.
              </p>
            </div>
          </div>
        </div>

        {/* Experimental Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Chart 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Figure 1: Collateral Side-Damage Evaluation</span>
                </h3>
                <p className="text-[11px] text-[#8A94A6]">CounterFact & Qwen3-8B benchmark comparison</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                0.0% Side-Damage
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collateralData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="metric" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} interval={0} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                  <Bar dataKey="Ordo-M" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="LoRA (Equal Cap)" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] text-[#8A94A6] font-sans">
              <strong className="text-white">Analysis:</strong> While equal-capacity LoRA adapters cause an <span className="text-rose-400 font-mono">8.4%</span> performance degradation on surrounding knowledge, Ordo-M maintains <span className="text-emerald-400 font-mono font-semibold">0.0% collateral side-damage</span> across all 50-fact update series.
            </div>
          </div>

          {/* Chart 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2 font-mono">
                  <Clock className="w-4 h-4 text-violet-400" />
                  <span>Figure 2: Incremental Wave Fine-Tuning Parity</span>
                </h3>
                <p className="text-[11px] text-[#8A94A6]">Wave time: 45s vs 75s+ full retrain</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-mono border border-violet-800">
                96.2% Retention
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waveData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="setup" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 9 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                  <Bar dataKey="waveAvg" name="Wave Avg Knowledge %" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#050608] border border-[#1E2330] text-[11px] text-[#8A94A6] font-sans">
              <strong className="text-white">Analysis:</strong> Calibrating initial output projections eliminates wave learning saturation, reaching <span className="text-violet-300 font-mono">96.2% parity</span> with full retraining while taking only 45s per wave.
            </div>
          </div>
        </div>

        {/* Resource Footprint Table */}
        <div className="glass-panel p-6 rounded-2xl border border-[#1E2330] mb-10">
          <h3 className="text-sm font-bold text-white mb-3 font-mono">Table 1: Hardware Resource & Quantization Footprint</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E2330] text-[#8A94A6]">
                  <th className="pb-2">Axis / Metric</th>
                  <th className="pb-2">Measured Empirical Value</th>
                  <th className="pb-2">Architectural Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2330] text-slate-300">
                <tr>
                  <td className="py-2.5 text-cyan-400">Training Speed Scaling</td>
                  <td className="py-2.5">Linear exponent 1.05 (0.076s / record / epoch)</td>
                  <td className="py-2.5 text-[#8A94A6]">Scales cleanly to large doc corpora</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-cyan-400">VRAM Allocation</td>
                  <td className="py-2.5">0.0112 GB / 1M memory params (0.0034 GB inference)</td>
                  <td className="py-2.5 text-[#8A94A6]">Enables 27B LLMs on consumer GPUs</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-cyan-400">Inference Throughput</td>
                  <td className="py-2.5">15.1 → 15.1 tokens/sec</td>
                  <td className="py-2.5 text-[#8A94A6]">Zero generation latency penalty</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-cyan-400">RAM / NVMe Offloading</td>
                  <td className="py-2.5">0.98x token generation speed</td>
                  <td className="py-2.5 text-[#8A94A6]">Memory capacity independent of GPU VRAM</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-cyan-400">Quantization Stability</td>
                  <td className="py-2.5">Int8 preserves full edit series (Int4 degrades)</td>
                  <td className="py-2.5 text-[#8A94A6]">Int8 quantized tables recommended</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Closed-Source Research Notice */}
        <div className="p-5 rounded-2xl bg-[#0F1117] border border-[#1E2330] flex items-start space-x-3 text-xs">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white font-mono">Closed-Source Research Access Notice</div>
            <p className="text-[#8A94A6] font-light leading-relaxed">
              Ordo-M source code and internal evaluation harnesses are currently closed-source. Academic researchers and institutional partners interested in reviewing empirical logs or requesting joint research access may contact lead researcher Russel Gavery via GitHub profile <a href="https://github.com/8hrsk" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline font-mono">@8hrsk</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
