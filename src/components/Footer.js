import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Footer.css';

const startupName = process.env.STARTUP_NAME;

export default function Footer() {
  const { t } = useLanguage();

  return React.createElement(
    'footer',
    { className: 'footer' },
    React.createElement(
      'p',
      null,
      `© 2025 ${startupName}. ${t.contactContent}`
    )
  );
}
