import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import HeroSection from './HeroSection';
import Section from './Section';
import ServicesSection from './ServicesSection';
import LetsWorkTogetherSection from './LetsWorkTogetherSection';
import '../../styles/Home.css';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="home">
      <HeroSection title={t.welcome} />
      <ServicesSection t={t} />
      <Section id="aboutUs" title={t.aboutUs} content={t.aboutContent} alt />
      <LetsWorkTogetherSection t={t} />
    </main>
  );
}
