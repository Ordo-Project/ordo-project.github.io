import React from 'react';
import { ShieldAlert, Circle, ArrowRight } from 'lucide-react';
import { Language, translations } from '../i18n';
import { SectionHeader } from './ui';

interface LimitsSectionProps {
  lang: Language;
}

export const LimitsSection: React.FC<LimitsSectionProps> = ({ lang }) => {
  const t = translations[lang].limits;

  return (
    <section id="limits" className="py-20 relative border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          tag={t.tag}
          title={t.title}
          accent="amber"
          icon={<ShieldAlert className="w-4 h-4" />}
        />

        <p className="text-sm text-[#8A94A6] max-w-3xl mb-8 font-light leading-relaxed">{t.subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {t.groups.map((g, gi) => (
            <div key={gi} className="glass-panel p-6 rounded-2xl border border-[#1E2330]">
              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-mono mb-4 border ${
                  g.name === 'Ordo-M'
                    ? 'bg-cyan-950/70 text-cyan-300 border-cyan-900/70'
                    : 'bg-violet-950/70 text-violet-300 border-violet-900/70'
                }`}
              >
                {g.name}
              </div>
              <ul className="space-y-3">
                {g.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5">
                    <Circle className="w-2 h-2 mt-1.5 shrink-0 text-amber-500 fill-amber-500/40" />
                    <span className="text-xs text-[#8A94A6] font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[#1E2330] bg-[#0B0D13]">
          <h3 className="text-sm font-bold text-white mb-4 font-mono">{t.nextTitle}</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
            {t.nextItems.map((n, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#08090C] border border-[#1E2330]">
                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-400" />
                <span className="text-[11px] text-[#8A94A6] font-light leading-relaxed">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
