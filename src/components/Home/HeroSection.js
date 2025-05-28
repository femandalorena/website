import React from 'react';
import '../../styles/home/HeroSection.css';
import CatFace from './CatFace';

export default function HeroSection({ title }) {
  return (
    <section className="hero screen-section" id="welcome">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            {title.split(' ').map((word, i) => (
              <span key={i} className="animated-word" style={{ animationDelay: `${i * 0.2}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-image">
          <CatFace />
        </div>
      </div>
    </section>
  );
}
