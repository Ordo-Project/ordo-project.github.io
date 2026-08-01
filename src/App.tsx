import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OrdoMSection } from './components/OrdoMSection';
import { OrdoGenSection } from './components/OrdoGenSection';
import { ResearchDocs } from './components/ResearchDocs';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F1F5F9] font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <HeroSection
          onExploreOrdoM={() => scrollToSection('ordo-m')}
          onExploreOrdoGen={() => scrollToSection('ordogen')}
          onExploreLiterature={() => scrollToSection('literature')}
        />
        <OrdoMSection />
        <OrdoGenSection />
        <ResearchDocs />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
