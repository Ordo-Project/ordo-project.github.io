import React from 'react';
import {
  Briefcase,
  AlertTriangle,
  Boxes,
  Check,
  Building2,
  Bot,
  Wallet,
  Mail,
  Github,
  ExternalLink,
  ScrollText,
} from 'lucide-react';
import { Language, translations } from '../i18n';
import { SectionHeader, SOCIAL } from './ui';

interface SummarySectionProps {
  lang: Language;
}

/** Icons per value row, in the order the copy declares them. */
const VALUE_ICONS = [Building2, Bot, Wallet];

export const SummarySection: React.FC<SummarySectionProps> = ({ lang }) => {
  const t = translations[lang].summary;

  return (
    <section id="summary" className="py-20 border-b border-[#1E2330] bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="00"
          tag={t.tag}
          title={t.title}
          accent="amber"
          icon={<Briefcase className="w-4 h-4" />}
        />

        <p className="mt-4 max-w-4xl text-sm sm:text-base text-[#C3CBD8] leading-relaxed font-light">
          {t.lead}
        </p>

        {/* Problem */}
        <h3 className="mt-12 text-xs font-mono uppercase tracking-wider text-rose-400">{t.problemTitle}</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {t.problems.map((p, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-[#1E2330] min-w-0">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white font-sans leading-snug">{p.title}</div>
                  <p className="mt-2 text-[13px] text-[#8A94A6] font-light leading-relaxed">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Solution */}
        <div className="mt-6 grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-[#08090C] min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Boxes className="w-4 h-4 text-cyan-400 shrink-0" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">{t.solutionTitle}</h3>
            </div>
            <p className="text-[13px] sm:text-sm text-[#C3CBD8] font-light leading-relaxed">{t.solutionText}</p>
            <ul className="mt-4 space-y-2.5">
              {t.solutionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#8A94A6] font-light leading-relaxed">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-[#1E2330] bg-[#08090C] min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <ScrollText className="w-4 h-4 text-amber-400 shrink-0" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400">{t.honestTitle}</h3>
            </div>
            <p className="text-[13px] text-[#8A94A6] font-light leading-relaxed">{t.honestText}</p>
          </div>
        </div>

        {/* Value per audience */}
        <h3 className="mt-12 text-xs font-mono uppercase tracking-wider text-emerald-400">{t.valueTitle}</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {t.values.map((v, i) => {
            const Icon = VALUE_ICONS[i] ?? Building2;
            return (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-[#1E2330] min-w-0 flex flex-col">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A94A6]">
                  <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="min-w-0 break-words">{v.who}</span>
                </div>
                <div className="mt-3 text-sm font-bold text-white font-sans leading-snug">{v.gain}</div>
                <p className="mt-2 text-[13px] text-[#8A94A6] font-light leading-relaxed">{v.detail}</p>
              </div>
            );
          })}
        </div>

        {/* The vendor argument, at length */}
        <div className="mt-6 glass-panel p-6 rounded-2xl border border-violet-500/20 bg-[#08090C]">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-violet-400 shrink-0" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-violet-400">{t.agentTitle}</h3>
          </div>
          <p className="text-[13px] sm:text-sm text-[#C3CBD8] font-light leading-relaxed max-w-5xl">{t.agentText}</p>
        </div>

        {/* Contact */}
        <div className="mt-6 glass-panel p-6 rounded-2xl border border-[#1E2330] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="min-w-0">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">{t.contactTitle}</h3>
            <p className="mt-2 text-[13px] text-[#8A94A6] font-light leading-relaxed max-w-2xl">{t.contactText}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={SOCIAL.email.url}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-all"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="break-all">{SOCIAL.email.handle}</span>
            </a>
            <a
              href={SOCIAL.org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#8A94A6] hover:text-white border border-[#1E2330] hover:border-cyan-500/40 text-xs font-mono transition-all"
            >
              <Github className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{SOCIAL.org.handle}</span>
              <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
