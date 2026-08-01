import React, { useState } from 'react';
import { MemoryStick, Cpu, BarChart3, Clock, Terminal, Copy, Check } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const OrdoMSection: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

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
    <section id="ordo-m" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <MemoryStick className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">ARCHITECTURAL BREAKTHROUGH</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ordo-M: External Rewritable Memory
            </h2>
          </div>
        </div>

        <p className="text-base sm:text-lg text-[#8A94A6] max-w-4xl font-light leading-relaxed mb-12">
          Ordo-M attaches an external rewritable memory matrix directly to a <strong className="text-white">frozen LLM</strong> via forward hook at depth 0.66. Knowledge updates require zero parameter retuning of the base model. Updating documentation or code base specifications occurs in seconds, leaving all other stored knowledge <span className="text-cyan-300 font-semibold">100% pristine</span>.
        </p>

        {/* Mechanism Overview Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330] mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>How Ordo-M Forward Hook Works</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#08090C] border border-[#1E2330]">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 font-mono text-xs flex items-center justify-center mb-3">01</div>
              <h4 className="font-semibold text-white text-sm mb-1">Text Canonical Address</h4>
              <p className="text-xs text-[#8A94A6]">
                Address is derived via SHA-256 from explicit symbol names or file paths in the input text. Non-matching tokens return exactly zero lookup.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#08090C] border border-[#1E2330]">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 font-mono text-xs flex items-center justify-center mb-3">02</div>
              <h4 className="font-semibold text-white text-sm mb-1">Product-Key Matrix Lookup</h4>
              <p className="text-xs text-[#8A94A6]">
                Key table retrieves target value vectors from RAM or NVMe storage. Base weights remain untouched; table can be updated incrementally in waves.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#08090C] border border-[#1E2330]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs flex items-center justify-center mb-3">03</div>
              <h4 className="font-semibold text-white text-sm mb-1">Zero Latency Injection</h4>
              <p className="text-xs text-[#8A94A6]">
                Forward hook injects memory vectors into network residual stream at layer depth 0.66. Disabling hook leaves base model byte-identical to original.
              </p>
            </div>
          </div>
        </div>

        {/* Charts & Interactive Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Chart 1: Ordo-M vs LoRA Collateral Damage */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>Ordo-M vs LoRA Collateral Damage</span>
                </h3>
                <p className="text-xs text-[#8A94A6] mt-1">Measured on CounterFact & Qwen3-8B benchmark suite</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 text-[10px] font-mono border border-cyan-800/50">
                0.0% Side Damage
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collateralData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="metric" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} interval={0} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Ordo-M" fill="#06B6D4" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="LoRA (Equal Cap)" fill="#F43F5E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
              <strong>Key Finding:</strong> LoRA degrades surrounding knowledge by <span className="text-rose-400 font-mono font-bold">8.4%</span> on updates, whereas Ordo-M maintains <span className="text-emerald-400 font-mono font-bold">0.0% side-damage</span>.
            </div>
          </div>

          {/* Chart 2: Wave Fine-Tuning Parity */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-violet-400" />
                  <span>Incremental Wave Fine-Tuning Parity</span>
                </h3>
                <p className="text-xs text-[#8A94A6] mt-1">Wave speed: 45s per update vs 75s+ full retrain</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-violet-950/80 text-violet-300 text-[10px] font-mono border border-violet-800/50">
                96.2% Retrain Parity
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waveData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" />
                  <XAxis dataKey="setup" stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} />
                  <YAxis stroke="#8A94A6" tick={{ fill: '#8A94A6', fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1117', borderColor: '#2E364A', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="waveAvg" name="Wave Avg Knowledge %" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs text-violet-200">
              <strong>Wave Drift Metric:</strong> Early knowledge drift across 4 consecutive wave fine-tunes is <span className="text-emerald-400 font-mono font-bold">0.0 percentage points</span>.
            </div>
          </div>
        </div>

        {/* Resource Costs & Quantization Table */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330] mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Hardware Footprint & Resource Metrics</h3>
          <p className="text-xs text-[#8A94A6] mb-6">Tested on Qwen3-8B / NVIDIA L4 24GB & Apple M1 8GB</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E2330] text-[#8A94A6]">
                  <th className="pb-3 font-semibold">Parameter / Axis</th>
                  <th className="pb-3 font-semibold">Measured Metric</th>
                  <th className="pb-3 font-semibold">Operational Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2330] text-[#F1F5F9]">
                <tr>
                  <td className="py-3 text-cyan-400 font-medium">Training Speed Scaling</td>
                  <td className="py-3">Linear (Exponent 1.05); 0.076s per record / epoch</td>
                  <td className="py-3 text-[#8A94A6]">Scales cleanly with large documentation sets</td>
                </tr>
                <tr>
                  <td className="py-3 text-cyan-400 font-medium">Training VRAM Footprint</td>
                  <td className="py-3">0.0112 GB per 1M memory params (0.0034 GB inference)</td>
                  <td className="py-3 text-[#8A94A6]">Allows 8B-27B models on consumer 12GB GPUs</td>
                </tr>
                <tr>
                  <td className="py-3 text-cyan-400 font-medium">Inference Generation Speed</td>
                  <td className="py-3">15.1 → 15.1 tokens/sec</td>
                  <td className="py-3 text-[#8A94A6]">Zero latency penalty (Memory lookup is free)</td>
                </tr>
                <tr>
                  <td className="py-3 text-cyan-400 font-medium">RAM / NVMe Disk Table Offloading</td>
                  <td className="py-3">0.98× t/s baseline speed</td>
                  <td className="py-3 text-[#8A94A6]">Memory size is no longer limited by GPU VRAM</td>
                </tr>
                <tr>
                  <td className="py-3 text-cyan-400 font-medium">Quantization Stability</td>
                  <td className="py-3">Int8 preserves full edit series (Int4 breaks edit series)</td>
                  <td className="py-3 text-[#8A94A6]">Int8 quantized memory table recommended</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Command Line & Quickstart Snippets */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2330]">
          <div className="flex items-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Reproduce Ordo-M Locally</h3>
          </div>
          <p className="text-xs text-[#8A94A6] mb-6">Selftest runs in seconds on standard CPU without GPU or model downloads.</p>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-[#08090C] p-4 rounded-xl border border-[#1E2330] relative group">
              <button
                onClick={() => copyToClipboard('uv venv --python 3.12 .venv && .venv/bin/python -m ordo_m selftest', 'cmd1')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0F1117] text-[#8A94A6] hover:text-white border border-[#1E2330]"
              >
                {copiedCmd === 'cmd1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <div className="text-[#8A94A6] mb-1"># 1. Environment Setup & Selftest</div>
              <div className="text-cyan-300">uv venv --python 3.12 .venv</div>
              <div className="text-cyan-300">.venv/bin/python -m ordo_m selftest</div>
            </div>

            <div className="bg-[#08090C] p-4 rounded-xl border border-[#1E2330] relative group">
              <button
                onClick={() => copyToClipboard('.venv/bin/python -m ordo_m ingest --config configs/ingest-library.yaml --src /path/to/lib', 'cmd2')}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0F1117] text-[#8A94A6] hover:text-white border border-[#1E2330]"
              >
                {copiedCmd === 'cmd2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <div className="text-[#8A94A6] mb-1"># 2. Documentation Diff Ingest & Memory Update</div>
              <div className="text-cyan-300">.venv/bin/python -m ordo_m ingest --config configs/ingest-library.yaml --src /path/to/lib</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
