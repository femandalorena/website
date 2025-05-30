import React from 'react';
import PropTypes from 'prop-types';
import ServiceCard from './ServiceCard';
import '../../styles/home/ServicesSection.css';

export default function ServicesSection({ t }) {
  const {
    services,
    servicesIntro,
    servicesText,
    servicesSubtext,
    servicesConsultingTitle,
    servicesConsultingText,
    servicesResearchTitle,
    servicesResearchText,
    servicesDevelopmentTitle,
    servicesDevelopmentText,
    servicesPoCTitle,
    servicesPoCText,
    servicesEquityTitle,
    servicesEquityText,
  } = t;

  const servicesData = [
    { title: servicesConsultingTitle, text: servicesConsultingText },
    { title: servicesResearchTitle, text: servicesResearchText },
    { title: servicesDevelopmentTitle, text: servicesDevelopmentText },
    { title: servicesPoCTitle, text: servicesPoCText },
    { title: servicesEquityTitle, text: servicesEquityText },
  ];

  return (
    <section
      id="services"
      className="screen-section alt"
      aria-labelledby="services-title"
    >
      <h2 id="services-title">{services}</h2>
      <p className="services-intro">{servicesIntro}</p>
      <p className="services-text">{servicesText}</p>
      <p className="services-subtext">{servicesSubtext}</p>
      <div className="services-grid" role="list">
        {servicesData.map(({ title, text }, index) => (
          <ServiceCard key={index} title={title} text={text} role="listitem" />
        ))}
      </div>
    </section>
  );
}

ServicesSection.propTypes = {
  t: PropTypes.shape({
    services: PropTypes.string.isRequired,
    servicesIntro: PropTypes.string.isRequired,
    servicesText: PropTypes.string.isRequired,
    servicesSubtext: PropTypes.string.isRequired,
    servicesConsultingTitle: PropTypes.string.isRequired,
    servicesConsultingText: PropTypes.string.isRequired,
    servicesResearchTitle: PropTypes.string.isRequired,
    servicesResearchText: PropTypes.string.isRequired,
    servicesDevelopmentTitle: PropTypes.string.isRequired,
    servicesDevelopmentText: PropTypes.string.isRequired,
    servicesPoCTitle: PropTypes.string.isRequired,
    servicesPoCText: PropTypes.string.isRequired,
    servicesEquityTitle: PropTypes.string.isRequired,
    servicesEquityText: PropTypes.string.isRequired,
  }).isRequired,
};
