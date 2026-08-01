import React from 'react';
import { Cpu, Github, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-[#1E2330] bg-[#050608] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm font-mono tracking-tight">ORDO RESEARCH</div>
              <div className="text-[11px] text-[#8A94A6] font-mono">{t.tagline}</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 text-xs text-[#8A94A6] font-mono">
            <a
              href="https://github.com/8hrsk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 flex items-center space-x-1.5 transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>@8hrsk</span>
            </a>
            <span className="text-[#1E2330]">|</span>
            <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.host}</span>
            </div>
            <span className="text-[#1E2330] hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px]">{t.cutoff}</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1E2330]/50 text-center text-[11px] text-[#475569] font-mono">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
};
