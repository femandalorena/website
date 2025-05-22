import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Home.css';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="home">
      <section className="hero screen-section" id="welcome">
        <h1>{t.welcome}</h1>
        <p>{t.slogan}</p>
      </section>

      <Section id="services" title={t.services} content={t.servicesContent} />
      <Section id="aboutUs" title={t.aboutUs} content={t.aboutContent} alt />
      <Section id="workWithUs" title={t.workWithUs} content={t.workContent} />

      <ContactSection title={t.contact} />
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

function ContactSection({ title }) {
  return (
    <section className="screen-section contact" id="contact">
      <h2>{title}</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Email" required />
        <textarea rows="5" placeholder="Your Message" required />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
