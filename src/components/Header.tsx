import React, { useState, useEffect } from 'react';
import { Cpu, MemoryStick, Zap, BookOpen, User, Github, Menu, X, ExternalLink, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Abstract', icon: Zap },
    { id: 'ordo-m', label: 'Ordo-M Memory', icon: MemoryStick },
    { id: 'ordogen', label: 'OrdoGen Context', icon: Cpu },
    { id: 'literature', label: 'Technical Literature', icon: FileText },
    { id: 'docs', label: 'Experimental Papers', icon: BookOpen },
    { id: 'about', label: 'Researcher', icon: User },
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
          ? 'bg-[#08090C]/90 backdrop-blur-md border-b border-[#1E2330] py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Lab Header */}
          <div
            onClick={() => handleNavClick('overview')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-950 to-slate-900 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400/80 transition-all">
              <Cpu className="w-4 h-4 text-cyan-400 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white font-mono group-hover:text-cyan-300 transition-colors">
                  ORDO RESEARCH
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                  LAB PREPRINT
                </span>
              </div>
              <span className="text-[11px] text-[#8A94A6] tracking-wide block font-mono">
                ordo-project.com
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 glass-panel px-3 py-1.5 rounded-xl border border-[#1E2330]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-[#8A94A6] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* GitHub Profile */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://github.com/8hrsk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#0F1117] hover:bg-[#161922] text-[#8A94A6] hover:text-white text-xs font-mono border border-[#1E2330] hover:border-cyan-500/40 transition-all"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>@8hrsk</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0F1117] border border-[#1E2330] text-[#8A94A6] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E2330] bg-[#08090C]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 font-mono text-xs">
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
              href="https://github.com/8hrsk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg bg-[#0F1117] text-white text-xs font-mono border border-[#1E2330]"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub / @8hrsk</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
