import React from 'react';
import { MemoryStick, Zap, ArrowRight, ShieldCheck, Database, Cpu, Activity, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreSimulator: () => void;
  onExploreOrdoM: () => void;
  onExploreOrdoGen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSimulator,
  onExploreOrdoM,
  onExploreOrdoGen,
}) => {
  return (
    <section id="overview" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glowing Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Independent LLM Architecture Research • Cut-off: August 2026</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
            Rewritable Memory & Context Scaling for{' '}
            <span className="gradient-text-cyan-violet">Frozen LLMs</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#8A94A6] leading-relaxed font-light">
            Ordo reimagines Large Language Model capacity. Injecting external rewritable knowledge tables without changing base weights by a single bit, and solving quadratic context rot.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreSimulator}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center justify-center space-x-2 group"
            >
              <Cpu className="w-4 h-4" />
              <span>Try Interactive Memory Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreOrdoM}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0F1117] hover:bg-[#161922] text-[#F1F5F9] font-medium text-sm border border-[#1E2330] hover:border-cyan-500/40 transition-all flex items-center justify-center space-x-2"
            >
              <MemoryStick className="w-4 h-4 text-cyan-400" />
              <span>Explore Ordo-M Paper</span>
            </button>
          </div>
        </div>

        {/* Metrics Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330] text-center hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-center text-cyan-400 mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">0.0%</div>
            <div className="text-xs text-[#8A94A6] mt-1 font-medium">Collateral Side-Damage</div>
            <div className="text-[10px] text-cyan-400/80 mt-1 font-mono">vs 8.4% in equal-capacity LoRA</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330] text-center hover:border-violet-500/30 transition-all">
            <div className="flex items-center justify-center text-violet-400 mb-2">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-xs text-[#8A94A6] mt-1 font-medium">CounterFact Efficacy</div>
            <div className="text-[10px] text-violet-400/80 mt-1 font-mono">97.2% generalization accuracy</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330] text-center hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-center text-emerald-400 mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">64K</div>
            <div className="text-xs text-[#8A94A6] mt-1 font-medium">Exact-Retrieval Window</div>
            <div className="text-[10px] text-emerald-400/80 mt-1 font-mono">4.2% latency overhead</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#1E2330] text-center hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-center text-cyan-400 mb-2">
              <Activity className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">0 ms</div>
            <div className="text-xs text-[#8A94A6] mt-1 font-medium">Inference Speed Penalty</div>
            <div className="text-[10px] text-cyan-400/80 mt-1 font-mono">15.1 t/s baseline stays 15.1 t/s</div>
          </div>
        </div>

        {/* Dual Project Spotlight Cards */}
        <div className="mt-14 grid md:grid-cols-2 gap-8">
          {/* Card 1: Ordo-M */}
          <div className="glass-panel p-8 rounded-3xl border border-[#1E2330] relative group hover:border-cyan-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full blur-2xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <MemoryStick className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">PROJECT 01</span>
                <h3 className="text-2xl font-bold text-white">Ordo-M</h3>
              </div>
            </div>
            <p className="text-sm text-[#8A94A6] leading-relaxed mb-6 font-light">
              External rewritable memory attached directly to a <strong className="text-white">frozen base LLM</strong> (e.g., Qwen3-8B). Written knowledge is stored in a hash-addressed table computed from text entity canonicals and retrieved during inference without altering base weights by even a single bit.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#1E2330]">
                <span className="text-[#8A94A6]">Wave Fine-Tuning Parity</span>
                <span className="text-cyan-300 font-mono font-medium">96.2% (Parity with full retrain)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#1E2330]">
                <span className="text-[#8A94A6]">Side Damage on 50 Fact Updates</span>
                <span className="text-emerald-400 font-mono font-medium">0.0% (Pristine retention)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#1E2330]">
                <span className="text-[#8A94A6]">Memory Table VRAM Footprint</span>
                <span className="text-cyan-300 font-mono font-medium">0.0034 GB / 1M params</span>
              </div>
            </div>
            <button
              onClick={onExploreOrdoM}
              className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Explore Ordo-M Architecture & Benchmarks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: OrdoGen */}
          <div className="glass-panel p-8 rounded-3xl border border-[#1E2330] relative group hover:border-violet-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-bl-full blur-2xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-violet-950/60 border border-violet-500/30 text-violet-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-violet-400 tracking-wider">PROJECT 02</span>
                <h3 className="text-2xl font-bold text-white">OrdoGen</h3>
              </div>
            </div>
            <p className="text-sm text-[#8A94A6] leading-relaxed mb-6 font-light">
              Tackling the quadratic complexity $O(N^2)$ of context windows and solving the <strong className="text-white">context rot problem</strong>. OrdoGen pinpoints functional context limits vs nominal window sizes, localizing retrieval bottlenecks to specific attention heads (Layer 24).
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#1E2330]">
                <span className="text-[#8A94A6]">128K Plain Context Rot Cliff</span>
                <span className="text-rose-400 font-mono font-medium">24× Evidence Attention Drop</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#1E2330]">
                <span className="text-[#8A94A6]">Gold Evidence Head Steering</span>
                <span className="text-violet-300 font-mono font-medium">40/75 → 49/75 (p=0.0039)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#1E2330]">
                <span className="text-[#8A94A6]">64K Exact-Retrieval Relay</span>
                <span className="text-emerald-400 font-mono font-medium">p=0.0156 Replication</span>
              </div>
            </div>
            <button
              onClick={onExploreOrdoGen}
              className="w-full py-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Explore OrdoGen Research & Experiments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
