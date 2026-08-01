import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OrdoMSection } from './components/OrdoMSection';
import { OrdoGenSection } from './components/OrdoGenSection';
import { TimelineSection } from './components/TimelineSection';
import { LimitsSection } from './components/LimitsSection';
import { ResearchDocs } from './components/ResearchDocs';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Language } from './translations';

const initialLang = (): Language => {
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ru')) {
    return 'ru';
  }
  return 'en';
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState<Language>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F1F5F9] font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} />
      <main>
        <HeroSection
          onExploreOrdoM={() => scrollToSection('ordo-m')}
          onExploreOrdoGen={() => scrollToSection('ordogen')}
          onExploreLiterature={() => scrollToSection('literature')}
          lang={lang}
        />
        <OrdoMSection lang={lang} />
        <OrdoGenSection lang={lang} />
        <TimelineSection lang={lang} />
        <LimitsSection lang={lang} />
        <ResearchDocs lang={lang} />
        <AboutSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default App;
