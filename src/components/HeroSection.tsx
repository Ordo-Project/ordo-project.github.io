import React from 'react';
import { MemoryStick, Zap, ArrowRight, ShieldCheck, Layers, Activity, FileText, Lock, AlertTriangle } from 'lucide-react';
import { Language, translations } from '../i18n';

interface HeroSectionProps {
  onExploreOrdoM: () => void;
  onExploreOrdoGen: () => void;
  onExploreLiterature: () => void;
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreOrdoM,
  onExploreOrdoGen,
  onExploreLiterature,
  lang,
}) => {
  const t = translations[lang].hero;

  const metrics = [
    { icon: ShieldCheck, tone: 'text-cyan-400', sub: 'text-cyan-400/80', val: t.metrics.damageVal, label: t.metrics.damageLabel, note: t.metrics.damageSub },
    { icon: Layers, tone: 'text-violet-400', sub: 'text-violet-400/80', val: t.metrics.effVal, label: t.metrics.effLabel, note: t.metrics.effSub },
    { icon: Activity, tone: 'text-emerald-400', sub: 'text-emerald-400/80', val: t.metrics.relayVal, label: t.metrics.relayLabel, note: t.metrics.relaySub },
    { icon: AlertTriangle, tone: 'text-rose-400', sub: 'text-rose-400/80', val: t.metrics.penaltyVal, label: t.metrics.penaltyLabel, note: t.metrics.penaltySub },
  ];

  return (
    <section id="overview" className="relative pt-32 pb-20 overflow-hidden border-b border-[#1E2330]">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#0F1117] border border-[#1E2330] text-slate-300 text-[11px] sm:text-xs font-mono text-center">
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t.badge}</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            {t.titleStart}
            <span className="gradient-text-white-grey border-b border-cyan-500/40">{t.titleEnd}</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-mono text-cyan-400">
            <span>{t.leadResearcher}</span>
            <a
              href="https://github.com/8hrsk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-300 underline underline-offset-4 font-semibold"
            >
              {t.author}
            </a>
          </div>

          <p className="mt-6 text-sm sm:text-base text-[#8A94A6] leading-relaxed font-light max-w-3xl mx-auto">
            {t.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreLiterature}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 font-mono text-xs border border-cyan-500/40 shadow-lg flex items-center justify-center space-x-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>{t.btnLiterature}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreOrdoM}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#F1F5F9] font-mono text-xs border border-[#1E2330] hover:border-cyan-500/40 transition-all flex items-center justify-center space-x-2"
            >
              <MemoryStick className="w-4 h-4 text-cyan-400" />
              <span>{t.btnOrdoM}</span>
            </button>

            <button
              onClick={onExploreOrdoGen}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#F1F5F9] font-mono text-xs border border-[#1E2330] hover:border-violet-500/40 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-violet-400" />
              <span>{t.btnOrdoGen}</span>
            </button>
          </div>
        </div>

        {/* Headline numbers — three confirmed results and one that is still open */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="glass-panel p-4 rounded-xl border border-[#1E2330] text-center glass-panel-hover">
                <div className={`flex items-center justify-center mb-1 ${m.tone}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">{m.val}</div>
                <div className="text-[11px] text-[#8A94A6] mt-1 font-mono leading-snug">{m.label}</div>
                <div className={`text-[10px] mt-1 font-mono leading-snug ${m.sub}`}>{m.note}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-[#1E2330] bg-[#0B0D13]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">{t.abstractTitle}</h3>
            <p className="text-xs sm:text-[13px] text-[#8A94A6] leading-relaxed font-light font-sans">
              {t.abstractText}
            </p>
          </div>

          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-[#1E2330] bg-[#0B0D13]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-violet-400 mb-3">{t.statusTitle}</h3>
            <div className="space-y-3">
              {t.statusItems.map((s, i) => (
                <div key={i} className="border-l-2 border-[#1E2330] pl-3">
                  <div className="text-[11px] font-mono text-white">{s.label}</div>
                  <div className="text-[11px] text-[#8A94A6] font-light leading-relaxed mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
