
import React from 'react';
import Header from './components/Header';
import HeroAtelier from './components/HeroAtelier';
import About from './components/About';
import Services from './components/Services';
import Indigenous from './components/Indigenous';
import Clients from './components/Clients';
import CaseStudy from './components/CaseStudy';
import Team from './components/Team';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';

const App: React.FC = () => {
  return (
    <div className="relative w-full">
      <Header />
      <main>
        <HeroAtelier />
        {/* All sections below the hero paint above the fixed Atelier background */}
        <div className="relative z-10 isolate bg-navy">
          <About />
          <Clients />
          <Contact />
          <Services />
          <Indigenous />
          <CaseStudy />
          <Team />
          <Careers />
        </div>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default App;
