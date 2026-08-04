import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SummarySection } from './components/SummarySection';
import { OrdoMSection } from './components/OrdoMSection';
import { OrdoGenSection } from './components/OrdoGenSection';
import { TimelineSection } from './components/TimelineSection';
import { LimitsSection } from './components/LimitsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ResearchDocs } from './components/ResearchDocs';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Language, translations } from './i18n';

/** Each language has its own indexable URL (/ and /ru/), so the path wins over the browser. */
const langFromPath = (): Language | null =>
  typeof window !== 'undefined' && /^\/ru(\/|$)/.test(window.location.pathname) ? 'ru' : null;

const initialLang = (): Language => {
  const fromPath = langFromPath();
  if (fromPath) return fromPath;
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('ru')) {
    return 'ru';
  }
  return 'en';
};

/** Head metadata the crawlers read is per-page; this keeps it honest after an in-page switch. */
const syncHead = (lang: Language) => {
  const m = translations[lang].meta;
  document.documentElement.lang = lang;
  document.title = m.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
  const path = lang === 'ru' ? '/ru/' : '/';
  const canonical = `https://ordo-project.com${path}`;
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
  if (window.location.pathname !== path) {
    window.history.replaceState({ lang }, '', path + window.location.hash);
  }
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [lang, setLang] = useState<Language>(initialLang);

  useEffect(() => {
    syncHead(lang);
  }, [lang]);

  useEffect(() => {
    const onPop = () => setLang(langFromPath() ?? 'en');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

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
          onExploreSummary={() => scrollToSection('summary')}
          onExploreOrdoM={() => scrollToSection('ordo-m')}
          onExploreOrdoGen={() => scrollToSection('ordogen')}
          onExploreLiterature={() => scrollToSection('literature')}
          lang={lang}
        />
        <SummarySection lang={lang} />
        <OrdoMSection lang={lang} />
        <OrdoGenSection lang={lang} />
        <TimelineSection lang={lang} />
        <LimitsSection lang={lang} />
        <PublicationsSection lang={lang} />
        <ResearchDocs lang={lang} />
        <AboutSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default App;
