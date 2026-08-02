import React, { useState } from 'react';
import { GitCommitVertical, CheckCircle2, XCircle, GitBranch } from 'lucide-react';
import { Language, translations } from '../i18n';
import { SectionHeader } from './ui';

interface TimelineSectionProps {
  lang: Language;
}

type Kind = 'win' | 'fail' | 'pivot';

const KIND_STYLE: Record<Kind, { dot: string; chip: string; icon: React.ElementType }> = {
  win: { dot: 'bg-emerald-500 shadow-[0_0_12px_-2px_#10B981]', chip: 'bg-emerald-950/70 text-emerald-300 border-emerald-900/70', icon: CheckCircle2 },
  fail: { dot: 'bg-rose-500 shadow-[0_0_12px_-2px_#F43F5E]', chip: 'bg-rose-950/70 text-rose-300 border-rose-900/70', icon: XCircle },
  pivot: { dot: 'bg-amber-500 shadow-[0_0_12px_-2px_#F59E0B]', chip: 'bg-amber-950/70 text-amber-300 border-amber-900/70', icon: GitBranch },
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({ lang }) => {
  const t = translations[lang].timeline;
  const [filter, setFilter] = useState<'all' | 'Ordo-M' | 'OrdoGen'>('all');

  const entries = t.entries.filter((e) => filter === 'all' || e.proj === filter);

  const buttons: Array<{ id: 'all' | 'Ordo-M' | 'OrdoGen'; label: string }> = [
    { id: 'all', label: t.filterAll },
    { id: 'Ordo-M', label: 'Ordo-M' },
    { id: 'OrdoGen', label: 'OrdoGen' },
  ];

  return (
    <section id="timeline" className="py-20 relative border-b border-[#1E2330] bg-[#0A0B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          tag={t.tag}
          title={t.title}
          accent="emerald"
          icon={<GitCommitVertical className="w-4 h-4" />}
        />

        <p className="text-sm text-[#8A94A6] max-w-3xl mb-6 font-light leading-relaxed">{t.subtitle}</p>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {buttons.map((b) => (
            <button
              key={b.id}
              onClick={() => setFilter(b.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border transition-all ${
                filter === b.id
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                  : 'bg-[#0F1117] text-[#8A94A6] border-[#1E2330] hover:text-white'
              }`}
            >
              {b.label}
            </button>
          ))}
          <div className="flex items-center gap-3 ml-auto text-[10px] font-mono text-[#8A94A6]">
            {(['win', 'fail', 'pivot'] as Kind[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${KIND_STYLE[k].dot}`} />
                {t.kinds[k]}
              </span>
            ))}
          </div>
        </div>

        <div className="relative pl-6 sm:pl-8">
          <div className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 via-[#1E2330] to-violet-500/40" />

          <div className="space-y-4">
            {entries.map((e, i) => {
              const style = KIND_STYLE[e.kind as Kind];
              const Icon = style.icon;
              return (
                <div key={`${e.date}-${i}`} className="relative">
                  <span className={`absolute -left-6 sm:-left-8 top-4 w-3.5 h-3.5 rounded-full border-2 border-[#0A0B10] ${style.dot}`} />
                  <div className="glass-panel rounded-xl border border-[#1E2330] p-4 glass-panel-hover">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-[#8A94A6]">{e.date}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          e.proj === 'Ordo-M'
                            ? 'bg-cyan-950/70 text-cyan-300 border-cyan-900/70'
                            : 'bg-violet-950/70 text-violet-300 border-violet-900/70'
                        }`}
                      >
                        {e.proj}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${style.chip}`}>
                        <Icon className="w-3 h-3" />
                        {t.kinds[e.kind as Kind]}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-sans">{e.title}</h4>
                    <p className="text-[11px] sm:text-xs text-[#8A94A6] mt-1 font-light leading-relaxed">{e.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
