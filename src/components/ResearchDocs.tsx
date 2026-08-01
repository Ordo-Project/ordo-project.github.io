import React, { useMemo, useState } from 'react';
import { BookOpen, Search, FlaskConical, Target, AlertTriangle } from 'lucide-react';
import { Language, translations } from '../translations';
import { papers } from '../data';
import { SectionHeader } from './ui';

interface ResearchDocsProps {
  lang: Language;
}

export const ResearchDocs: React.FC<ResearchDocsProps> = ({ lang }) => {
  const t = translations[lang].literature;
  const [selectedId, setSelectedId] = useState(papers[0].id);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return papers;
    return papers.filter((p) =>
      [p.title[lang], p.summary[lang], p.project, p.date, ...p.tags]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query, lang]);

  const selected = papers.find((p) => p.id === selectedId) ?? filtered[0] ?? papers[0];

  const blocks = [
    { label: t.setup, text: selected.setup[lang], icon: FlaskConical, tone: 'text-cyan-400' },
    { label: t.result, text: selected.result[lang], icon: Target, tone: 'text-emerald-400' },
    { label: t.limit, text: selected.limit[lang], icon: AlertTriangle, tone: 'text-amber-400' },
  ];

  return (
    <section id="literature" className="py-20 relative bg-[#0A0B10] border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          tag={t.tag}
          title={t.title}
          accent="cyan"
          icon={<BookOpen className="w-4 h-4" />}
        />

        <p className="text-sm text-[#8A94A6] max-w-3xl mb-8 font-light leading-relaxed">{t.subtitle}</p>

        <div className="mb-6 relative max-w-md">
          <Search className="w-4 h-4 text-[#8A94A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0F1117] border border-[#1E2330] text-xs font-mono text-white placeholder:text-[#475569] focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Index */}
          <div className="lg:col-span-5 space-y-2.5 lg:max-h-[720px] lg:overflow-y-auto lg:pr-2">
            {filtered.length === 0 && (
              <div className="p-4 rounded-xl border border-[#1E2330] text-xs text-[#8A94A6] font-mono">
                {t.empty}
              </div>
            )}
            {filtered.map((p) => {
              const isSelected = selected.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border font-sans ${
                    isSelected
                      ? 'bg-[#0F1117] border-cyan-500/50 shadow-md'
                      : 'bg-[#08090C] border-[#1E2330] hover:bg-[#0F1117]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                        p.project === 'Ordo-M'
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                          : 'bg-violet-950/80 text-violet-300 border-violet-800/60'
                      }`}
                    >
                      {p.project}
                    </span>
                    <span className="text-[10px] text-[#475569] font-mono">{p.date}</span>
                  </div>
                  <h4 className={`text-xs font-bold leading-snug ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {p.title[lang]}
                  </h4>
                  <p className="text-[11px] text-[#8A94A6] mt-1 font-light leading-relaxed">{p.summary[lang]}</p>
                </button>
              );
            })}
          </div>

          {/* Reader */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#1E2330] bg-[#0B0D13] lg:sticky lg:top-24">
              <div className="border-b border-[#1E2330] pb-3 mb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      selected.project === 'Ordo-M'
                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                        : 'bg-violet-950/80 text-violet-300 border-violet-800/60'
                    }`}
                  >
                    {selected.project}
                  </span>
                  <span className="text-[10px] font-mono text-[#475569]">{selected.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-2 leading-snug">{selected.title[lang]}</h3>
                <p className="text-xs text-[#8A94A6] mt-2 font-light leading-relaxed">{selected.summary[lang]}</p>
              </div>

              <div className="space-y-4">
                {blocks.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="p-4 rounded-xl bg-[#050608] border border-[#1E2330]">
                      <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider mb-1.5 ${b.tone}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {b.label}
                      </div>
                      <p className="text-xs text-[#8A94A6] font-light leading-relaxed">{b.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
