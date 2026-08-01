import React from 'react';
import { MemoryStick, Zap, ArrowRight, ShieldCheck, Database, Activity, FileText, Lock } from 'lucide-react';

interface HeroSectionProps {
  onExploreOrdoM: () => void;
  onExploreOrdoGen: () => void;
  onExploreLiterature: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreOrdoM,
  onExploreOrdoGen,
  onExploreLiterature,
}) => {
  return (
    <section id="overview" className="relative pt-32 pb-20 overflow-hidden border-b border-[#1E2330]">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Paper Metadata Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0F1117] border border-[#1E2330] text-slate-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Closed-Source Lab Research • Cut-off: August 2026</span>
          </div>
        </div>

        {/* Paper Title & Authors */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            External Rewritable Memory & Context Scaling for{' '}
            <span className="gradient-text-white-grey border-b border-cyan-500/40">Frozen LLMs</span>
          </h1>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs font-mono text-cyan-400">
            <span>Lead Researcher:</span>
            <a
              href="https://github.com/8hrsk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-300 underline underline-offset-4 font-semibold"
            >
              Russel Gavery (Gavrilov Ruslan, @8hrsk)
            </a>
          </div>

          <p className="mt-6 text-sm sm:text-base text-[#8A94A6] leading-relaxed font-light max-w-3xl mx-auto">
            An empirical investigation into parameter-isolated memory injection (Ordo-M) for frozen language models and causal attention head localization (OrdoGen) for eliminating nominal vs. functional context rot.
          </p>

          {/* Action Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreLiterature}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 font-mono text-xs border border-cyan-500/40 shadow-lg flex items-center justify-center space-x-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Read Technical Literature</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreOrdoM}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#F1F5F9] font-mono text-xs border border-[#1E2330] hover:border-cyan-500/40 transition-all flex items-center justify-center space-x-2"
            >
              <MemoryStick className="w-4 h-4 text-cyan-400" />
              <span>Ordo-M Paper</span>
            </button>

            <button
              onClick={onExploreOrdoGen}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#F1F5F9] font-mono text-xs border border-[#1E2330] hover:border-violet-500/40 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-violet-400" />
              <span>OrdoGen Paper</span>
            </button>
          </div>
        </div>

        {/* Empirical Results Table */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-[#1E2330] text-center">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">0.0%</div>
            <div className="text-[11px] text-[#8A94A6] mt-1 font-mono">Collateral Side Damage</div>
            <div className="text-[10px] text-cyan-400/80 mt-1 font-mono">vs 8.4% in LoRA adapter</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-[#1E2330] text-center">
            <div className="flex items-center justify-center text-violet-400 mb-1">
              <Database className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">100%</div>
            <div className="text-[11px] text-[#8A94A6] mt-1 font-mono">CounterFact Efficacy</div>
            <div className="text-[10px] text-violet-400/80 mt-1 font-mono">97.2% generalization accuracy</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-[#1E2330] text-center">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">64K</div>
            <div className="text-[11px] text-[#8A94A6] mt-1 font-mono">Exact Retrieval Relay</div>
            <div className="text-[10px] text-emerald-400/80 mt-1 font-mono">4.2% latency overhead</div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-[#1E2330] text-center">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">0 ms</div>
            <div className="text-[11px] text-[#8A94A6] mt-1 font-mono">Inference Penalty</div>
            <div className="text-[10px] text-cyan-400/80 mt-1 font-mono">15.1 t/s baseline preserved</div>
          </div>
        </div>

        {/* Research Abstract Box */}
        <div className="mt-10 glass-panel p-6 rounded-2xl border border-[#1E2330] bg-[#0B0D13]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">Executive Abstract</h3>
          <p className="text-xs text-[#8A94A6] leading-relaxed font-light font-sans">
            Large Language Models (LLMs) deployed as autonomous local coding or reasoning assistants face two fundamental architectural bottlenecks: fine-tuning fragility when updating domain facts (causing severe catastrophic forgetting or side-damage in adapters like LoRA) and exponential retrieval degradation across long context windows (nominal 128K window length collapsing to 0/15 functional retrieval accuracy). Ordo addresses both problems through two closed-source research projects: <strong>Ordo-M</strong> (external product-key rewritable memory table injected at depth 0.66 without altering base model parameters) and <strong>OrdoGen</strong> (causal localization of retrieval attention head bottlenecks at Layer 24 with gold evidence steering).
          </p>
        </div>
      </div>
    </section>
  );
};
