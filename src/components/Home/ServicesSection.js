import React from 'react';
import ServiceCard from './ServiceCard';
import '../../styles/home/ServicesSection.css';

export default function ServicesSection({ t }) {
  const services = [
    { title: t.servicesConsultingTitle, text: t.servicesConsultingText },
    { title: t.servicesResearchTitle, text: t.servicesResearchText },
    { title: t.servicesDevelopmentTitle, text: t.servicesDevelopmentText },
    { title: t.servicesPoCTitle, text: t.servicesPoCText },
    { title: t.servicesEquityTitle, text: t.servicesEquityText },
  ];

  return (
    <section className="screen-section alt" id="services">
      <h2>{t.services}</h2>
      <p className="services-intro">{t.servicesIntro}</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} text={service.text} />
        ))}
      </div>
    </section>
  );
}
