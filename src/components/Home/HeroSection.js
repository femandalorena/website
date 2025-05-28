import React from 'react';
import '../../styles/home/HeroSection.css';

export default function HeroSection({ title }) {
  return (
    <section className="hero screen-section" id="welcome">
      <h1>{title}</h1>
    </section>
  );
}
