import React, { useState, useEffect } from 'react';
import { Cpu, MemoryStick, Zap, BookOpen, User, Github, Menu, X, Globe, GitCommitVertical, ShieldAlert, FileText, Briefcase, Mail } from 'lucide-react';
import { Language, translations } from '../i18n';
import { SOCIAL, XIcon, OrdoMark } from './ui';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: t.abstract, icon: Zap },
    { id: 'summary', label: t.summary, icon: Briefcase },
    { id: 'ordo-m', label: t.ordoM, icon: MemoryStick },
    { id: 'ordogen', label: t.ordoGen, icon: Cpu },
    { id: 'timeline', label: t.timeline, icon: GitCommitVertical },
    { id: 'limits', label: t.limits, icon: ShieldAlert },
    { id: 'publications', label: t.publications, icon: FileText },
    { id: 'literature', label: t.literature, icon: BookOpen },
    { id: 'about', label: t.about, icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-[#1E2330] py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Lab Tag */}
          <div
            onClick={() => handleNavClick('overview')}
            className="flex items-center space-x-3 cursor-pointer shrink-0 group"
          >
            <div className="w-9 h-9 shrink-0 flex items-center justify-center">
              <OrdoMark className="w-9 h-9 opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-mono group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  ORDO RESEARCH
                </span>
              </div>
              <span className="text-[10px] text-[#8A94A6] tracking-wide font-mono whitespace-nowrap">
                ordo-project.com
              </span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden xl:flex items-center space-x-1 glass-panel px-2.5 py-1 rounded-xl border border-[#1E2330]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-[#8A94A6] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Toggle & GitHub */}
          <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-cyan-400 font-mono text-xs border border-[#1E2330] hover:border-cyan-500/40 transition-all"
              title="Switch Language / Сменить язык"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* X Profile Button */}
            <a
              href={SOCIAL.x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#8A94A6] hover:text-white text-xs font-mono border border-[#1E2330] hover:border-cyan-500/40 transition-all"
              title={SOCIAL.x.handle}
            >
              <XIcon className="w-3 h-3 text-cyan-400" />
              {/* The header row is capped at max-w-7xl, so a wider viewport buys no room:
                  the action buttons stay icon-only and carry their handle for screen readers. */}
              <span className="sr-only">{SOCIAL.x.handle}</span>
            </a>

            {/* Project email */}
            <a
              href={SOCIAL.email.url}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#8A94A6] hover:text-white text-xs font-mono border border-[#1E2330] hover:border-cyan-500/40 transition-all"
              title={SOCIAL.email.handle}
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="sr-only">{SOCIAL.email.handle}</span>
            </a>

            {/* Project organisation on GitHub */}
            <a
              href={SOCIAL.org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#8A94A6] hover:text-white text-xs font-mono border border-[#1E2330] hover:border-cyan-500/40 transition-all"
              title={SOCIAL.org.handle}
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span className="sr-only">{SOCIAL.org.handle}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="px-2 py-1 rounded bg-[#0F1117] text-cyan-400 font-mono text-xs border border-[#1E2330]"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0F1117] border border-[#1E2330] text-[#8A94A6] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#1E2330] bg-[#08090C]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 font-mono text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                    : 'text-[#8A94A6] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#1E2330]">
            <a
              href={SOCIAL.org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-[#0F1117] text-white text-xs font-mono border border-[#1E2330]"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub / {SOCIAL.org.handle}</span>
            </a>
            <a
              href={SOCIAL.email.url}
              className="mt-2 flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-[#0F1117] text-white text-xs font-mono border border-[#1E2330]"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="break-all">{SOCIAL.email.handle}</span>
            </a>
            <a
              href={SOCIAL.x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-[#0F1117] text-white text-xs font-mono border border-[#1E2330]"
            >
              <XIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>X / {SOCIAL.x.handle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
