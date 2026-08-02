import React from 'react';
import { User, Github, Sparkles, ExternalLink, ShieldCheck, Cpu, Terminal } from 'lucide-react';
import { Language, translations } from '../i18n';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-20 relative bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-[#1E2330] relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Profile Card */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="relative inline-block mb-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-violet-950 p-1 border border-cyan-500/40 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-[#08090C] flex items-center justify-center text-cyan-400">
                    <User className="w-12 h-12" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>FOUNDER</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-sans">Russel Gavery</h3>
              <p className="text-xs font-mono text-cyan-400 mt-0.5">Gavrilov Ruslan (@8hrsk)</p>
              <p className="text-xs text-[#8A94A6] mt-2 font-light">
                {t.role}
              </p>

              <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
                <a
                  href="https://github.com/8hrsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#08090C] hover:bg-[#161922] text-[#8A94A6] hover:text-white border border-[#1E2330] text-xs font-mono transition-all"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>@8hrsk</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Right Bio & Academic Philosophy */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.tag}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight font-sans">
                {t.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#8A94A6] leading-relaxed font-light">
                {t.bio}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-xs font-bold text-white mb-1 flex items-center space-x-2 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.card1Title}</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] font-light leading-relaxed">
                    {t.card1Text}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-xs font-bold text-white mb-1 flex items-center space-x-2 font-mono">
                    <Cpu className="w-4 h-4 text-violet-400 shrink-0" />
                    <span>{t.card2Title}</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] font-light leading-relaxed">
                    {t.card2Text}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-xs font-bold text-white mb-1 flex items-center space-x-2 font-mono">
                    <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{t.card3Title}</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] font-light leading-relaxed">
                    {t.card3Text}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-xl bg-[#08090C] border border-[#1E2330]">
                  <div className="text-xs font-bold text-white mb-1 font-mono">{t.contactTitle}</div>
                  <p className="text-xs text-[#8A94A6] font-light leading-relaxed">{t.contactText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
