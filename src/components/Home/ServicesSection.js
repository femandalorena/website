import React, { useRef } from 'react';
import ServiceCard from './ServiceCard';

export default function ServicesSection({ t }) {
  const gridRef = useRef(null);

  const handleMouseMove = (e) => {
    const grid = gridRef.current;
    if (!grid) return;

    const rect = grid.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const scrollTo = (grid.scrollWidth - rect.width) * percent;

    grid.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  const handleMouseLeave = () => {
    gridRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

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
      <div
        className="services-grid"
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} text={service.text} />
        ))}
      </div>
    </section>
  );
}
