import React, { createContext, useState, useContext } from 'react';
import en from '../locales/en';
import es from '../locales/es';
import de from '../locales/de';
import pt from '../locales/pt';
import fr from '../locales/fr';

const LanguageContext = createContext();

const translations = { en, es, de, pt, fr};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, switchLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
