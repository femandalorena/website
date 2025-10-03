import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import AboutUsSection from './AboutUsSection';
import LetsWorkTogetherSection from './LetsWorkTogetherSection';
import '../../styles/home/Home.css';

export default function Home({ isWorkingWithUs, setIsWorkingWithUs }) {
  const { t } = useLanguage();

  return (
    <main className="home">
      <HeroSection title={t.welcome} />
      <ServicesSection t={t} />
      <AboutUsSection t={t} />
      <LetsWorkTogetherSection
        id="workTogether"
        t={t}
        isWorkingWithUs={isWorkingWithUs}
        setIsWorkingWithUs={setIsWorkingWithUs}
      />
    </main>
  );
}
