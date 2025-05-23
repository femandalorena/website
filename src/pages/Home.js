import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Home.css';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="home">
      <section className="hero screen-section" id="welcome">
        <h1>{t.welcome}</h1>
      </section>

      <ServicesSection t={t} />
      <Section id="aboutUs" title={t.aboutUs} content={t.aboutContent} alt />
      <LetsWorkTogetherSection t={t} />
    </main>
  );
}

function Section({ id, title, content, alt }) {
  return (
    <section className={`screen-section ${alt ? 'alt' : ''}`} id={id}>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}

function ServicesSection({ t }) {
  const gridRef = useRef(null);

  const handleMouseMove = (e) => {
    const grid = gridRef.current;
    if (!grid) return;

    const rect = grid.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const scrollTo = (grid.scrollWidth - rect.width) * percent;

    grid.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  return (
    <section className="screen-section alt" id="services">
      <h2>{t.services}</h2>
      <p className="services-intro">{t.servicesIntro}</p>
      <div
        className="services-grid"
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => gridRef.current?.scrollTo({ left: 0, behavior: 'smooth' })}
      >
        <ServiceCard title={t.servicesConsultingTitle} text={t.servicesConsultingText} />
        <ServiceCard title={t.servicesResearchTitle} text={t.servicesResearchText} />
        <ServiceCard title={t.servicesDevelopmentTitle} text={t.servicesDevelopmentText} />
        <ServiceCard title={t.servicesPoCTitle} text={t.servicesPoCText} />
        <ServiceCard title={t.servicesEquityTitle} text={t.servicesEquityText} />
      </div>
    </section>
  );
}

function ServiceCard({ title, text }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function LetsWorkTogetherSection({ t }) {
  const [isSendCV, setIsSendCV] = useState(false);

  return (
    <section className="screen-section work-together-section" id="workTogether">
      <div className="work-together-wrapper">
        <div className="toggle-side">
          <button
            id="toggleButton"
            aria-pressed={isSendCV}
            onClick={() => setIsSendCV(!isSendCV)}
            aria-label="Toggle between Hire Us and Send CV"
            type="button"
          >
            {isSendCV ? t.apply : t.hireUs}
          </button>
        </div>
        <form className="work-form" id="workForm" encType="multipart/form-data">
          <h2>{t.workTogether}</h2>

          <label htmlFor="name">{t.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder={t.name}
          />

          <label htmlFor="email">{t.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t.email}
          />

          <label htmlFor="message">{t.message}</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder={t.message}
          />

          {isSendCV && (
            <div className="attachment-wrapper">
              <label htmlFor="attachment">{t.upload}</label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
}
