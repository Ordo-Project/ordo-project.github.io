import React, { useMemo, useState } from 'react';
import {
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  CalendarDays,
  Info,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { translations, type Language } from '../i18n';
import { publications } from '../content/publications';
import { PaperReader, paperSections } from './PaperReader';
import { SectionHeader, SOCIAL } from './ui';

interface PublicationsSectionProps {
  lang: Language;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ lang }) => {
  const t = translations[lang].publications;
  // With several reports listed, the section opens as an index rather than a wall of text.
  const [openId, setOpenId] = useState<string | null>(null);

  const open = publications.find((p) => p.id === openId) ?? null;
  const sections = useMemo(() => (open ? paperSections(open, lang) : []), [open, lang]);

  return (
    <section id="publications" className="py-20 relative border-b border-[#1E2330] bg-[#0A0B10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          tag={t.tag}
          title={t.title}
          accent="emerald"
          icon={<FileText className="w-4 h-4" />}
        />

        <p className="text-sm text-[#8A94A6] max-w-3xl mb-8 font-light leading-relaxed">{t.subtitle}</p>

        {/* The track as one citable paper, hosted where it can be argued with */}
        <a
          href={SOCIAL.preprint.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-8 glass-panel p-5 sm:p-6 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/60 bg-[#08090C] transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between min-w-0">
            <div className="min-w-0">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-emerald-950/70 text-emerald-300 border-emerald-900/70">
                {t.preprintTag}
              </span>
              <h3 className="mt-2.5 text-base sm:text-lg font-bold text-white leading-snug group-hover:text-emerald-200 transition-colors">
                {t.preprintTitle}
              </h3>
              <p className="mt-1.5 text-xs text-[#8A94A6] font-light leading-relaxed max-w-3xl">{t.preprintText}</p>
              <p className="mt-2 text-[11px] font-mono text-emerald-400/80 break-all">{SOCIAL.preprint.handle}</p>
            </div>
            <span className="shrink-0 self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
              <BookOpen className="w-4 h-4" />
              {t.preprintCta}
              <ExternalLink className="w-3 h-3 opacity-70" />
            </span>
          </div>
        </a>

        <div className="space-y-5">
          {publications.map((paper) => {
            const isOpen = open?.id === paper.id;
            return (
              <div
                key={paper.id}
                className="glass-panel rounded-2xl border border-[#1E2330] overflow-hidden min-w-0"
              >
                {/* Header card */}
                <div className="p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-cyan-950/80 text-cyan-300 border-cyan-800/60">
                      {paper.project}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-emerald-950/70 text-emerald-300 border-emerald-900/70">
                      {t.badgeChapter} {paper.chapter}
                    </span>
                    <span className="text-[10px] font-mono text-[#475569]">{paper.date}</span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-white leading-snug">{paper.title[lang]}</h3>
                  <p className="text-xs font-mono text-cyan-400 mt-1.5">{paper.subtitle[lang]}</p>

                  <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { icon: User, label: t.metaAuthor, value: paper.author },
                      { icon: CalendarDays, label: t.metaCutoff, value: paper.cutoff },
                      { icon: Info, label: t.metaStatus, value: paper.status[lang] },
                      { icon: Clock, label: t.metaLength, value: `${paper.minutes} ${t.minutes}` },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <div key={i} className="p-3 rounded-xl bg-[#08090C] border border-[#1E2330] min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-1">
                            <Icon className="w-3 h-3 shrink-0" />
                            <span className="truncate">{m.label}</span>
                          </div>
                          <div className="text-[11px] text-[#9AA4B4] font-light leading-snug break-words">
                            {m.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setOpenId(isOpen ? null : paper.id)}
                      className="px-4 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 font-mono text-xs border border-cyan-500/40 flex items-center gap-2 transition-all"
                    >
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {isOpen ? t.closeLabel : t.openLabel}
                    </button>
                    <a
                      href={`${import.meta.env.BASE_URL}${paper.sourceFile}`}
                      download
                      className="px-4 py-2 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#8A94A6] hover:text-white font-mono text-xs border border-[#1E2330] flex items-center gap-2 transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      {t.downloadLabel}
                    </a>
                  </div>
                </div>

                {/* Full text */}
                {isOpen && (
                  <div className="border-t border-[#1E2330] bg-[#08090C]">
                    <div className="p-5 sm:p-7 grid lg:grid-cols-12 gap-8 min-w-0">
                      {/* Contents rail */}
                      <nav className="lg:col-span-3 min-w-0 order-first">
                        <div className="lg:sticky lg:top-24">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[#475569] mb-2">
                            {t.contentsLabel}
                          </div>
                          <ul className="space-y-1 max-h-64 lg:max-h-[60vh] overflow-y-auto pr-1">
                            {sections.map((s) => (
                              <li key={s.id}>
                                <a
                                  href={`#${s.id}`}
                                  className="block text-[11px] text-[#8A94A6] hover:text-cyan-300 leading-snug py-1 transition-colors"
                                >
                                  {s.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </nav>

                      <div className="lg:col-span-9 min-w-0">
                        <div className="mb-5 p-3 rounded-lg bg-[#0B0D13] border border-[#1E2330] text-[11px] text-[#8A94A6] font-light leading-relaxed flex gap-2">
                          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{lang === 'en' ? t.originalNote : t.translatedNote}</span>
                        </div>
                        <PaperReader paper={paper} lang={lang} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
