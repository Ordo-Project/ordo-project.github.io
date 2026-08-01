import React from 'react';
import { User, Github, Sparkles, ShieldCheck, Cpu, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#1E2330] relative overflow-hidden">
          {/* Background Ambient Blur */}
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Profile Avatar Card */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="relative inline-block mb-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-cyan-500 via-violet-500 to-emerald-500 p-1 shadow-2xl shadow-cyan-500/20">
                  <div className="w-full h-full rounded-[22px] bg-[#08090C] flex items-center justify-center text-cyan-400">
                    <User className="w-14 h-14" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>FOUNDER</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white">Russel Gavery</h3>
              <p className="text-xs font-mono text-cyan-400 mt-0.5">Gavrilov Ruslan (@8hoursking)</p>
              <p className="text-xs text-[#8A94A6] mt-2 font-light">
                Lead Researcher & Founder, Ordo Project
              </p>

              <div className="mt-5 flex items-center justify-center md:justify-start space-x-3">
                <a
                  href="https://github.com/8hoursking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#08090C] hover:bg-[#161922] text-[#8A94A6] hover:text-white border border-[#1E2330] transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Right Bio & Philosophy */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5" />
                <span>INDEPENDENT AI RESEARCH</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Pioneering Non-Destructive Memory Systems for Next-Gen LLMs
              </h4>

              <p className="text-xs sm:text-sm text-[#8A94A6] leading-relaxed font-light">
                Ordo Project was founded by <strong className="text-white">Russel Gavery</strong> (Gavrilov Ruslan) to solve fundamental limitations in current Transformer architectures: fine-tuning fragility, memory collateral damage, and nominal vs. functional context rot.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-xs font-bold text-white mb-1 flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Zero Side-Damage Memory</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] font-light">
                    Designing external memory matrices that leave base model parameters pristine (0.0% collateral damage).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-xs font-bold text-white mb-1 flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-violet-400" />
                    <span>Accessible Hardware Scaling</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] font-light">
                    Enabling 27B+ parameter model updates on consumer GPUs (RTX 3060/L4) and Apple Silicon (M1).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
