import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();
const startupName = process.env.STARTUP_NAME;

const translations = {
  en: {
    services: 'Services',
    aboutUs: 'About Us',
    workWithUs: 'Work With Us',
    contact: 'Contact',
    welcome: 'Welcome to '+ startupName +' — AI & Software Solutions',
    servicesContent:
      'We offer cutting-edge AI technology tailored for your business growth.',
    aboutContent:
      'YourStartup is dedicated to innovation and excellence in AI software.',
    workContent:
      'Join our team to build amazing AI products that transform industries.',
    contactContent:
      'Get in touch with us to start your AI journey today.',
    language: 'Language',
  },
  es: {
    services: 'Servicios',
    aboutUs: 'Sobre Nosotros',
    workWithUs: 'Trabaja con Nosotros',
    contact: 'Contacto',
    welcome: 'Bienvenido a '+ startupName +' — Soluciones de IA y Software',
    servicesContent:
      'Ofrecemos tecnología de IA de vanguardia para el crecimiento de tu negocio.',
    aboutContent:
      'YourStartup está dedicado a la innovación y excelencia en software de IA.',
    workContent:
      'Únete a nuestro equipo para construir productos de IA increíbles.',
    contactContent:
      'Contáctanos para comenzar tu viaje en IA hoy mismo.',
    language: 'Idioma',
  },
  de: {
    services: 'Dienstleistungen',
    aboutUs: 'Über Uns',
    workWithUs: 'Arbeite mit Uns',
    contact: 'Kontakt',
    welcome: 'Willkommen bei '+ startupName +' — KI & Softwarelösungen',
    servicesContent:
      'Wir bieten modernste KI-Technologie für das Wachstum Ihres Unternehmens.',
    aboutContent:
      'YourStartup widmet sich Innovation und Exzellenz in der KI-Software.',
    workContent:
      'Werden Sie Teil unseres Teams, um erstaunliche KI-Produkte zu entwickeln.',
    contactContent:
      'Kontaktieren Sie uns, um Ihre KI-Reise noch heute zu starten.',
    language: 'Sprache',
  },
  pt: {
    services: 'Serviços',
    aboutUs: 'Sobre Nós',
    workWithUs: 'Trabalhe Conosco',
    contact: 'Contato',
    welcome: 'Bem-vindo à '+ startupName +' — Soluções em IA e Software',
    servicesContent:
      'Oferecemos tecnologia de IA de ponta para o crescimento do seu negócio.',
    aboutContent:
      'A YourStartup é dedicada à inovação e excelência em software de IA.',
    workContent:
      'Junte-se à nossa equipe para construir produtos incríveis de IA.',
    contactContent:
      'Entre em contato conosco para iniciar sua jornada em IA hoje.',
    language: 'Idioma',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, switchLanguage, t: translations[language] } },
    children
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
