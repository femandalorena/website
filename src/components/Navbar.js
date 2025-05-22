import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Navbar.css';

const flags = {
  en: 'https://flagcdn.com/w40/gb.png',
  es: 'https://flagcdn.com/w40/es.png',
  de: 'https://flagcdn.com/w40/de.png',
  pt: 'https://flagcdn.com/w40/pt.png',
};

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const { language, switchLanguage, t } = useLanguage();

  const toggleMenu = () => setMenuActive(!menuActive);

  const startupName = process.env.STARTUP_NAME;

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt', label: 'Português' },
  ];

  return React.createElement(
    'nav',
    { className: 'navbar' },
    React.createElement(
      'div',
      { className: 'navbar-left' },
      React.createElement(
        'div',
        { className: 'logo' },
        startupName
      ),
      React.createElement(
        'div',
        { className: menuActive ? 'nav-links active' : 'nav-links' },
        ['services', 'aboutUs', 'workWithUs', 'contact'].map((section) =>
          React.createElement(
            'a',
            { key: section, href: `#${section.toLowerCase()}`, onClick: () => setMenuActive(false) },
            t[section]
          )
        )
      ),
    ),
    React.createElement(
      'div',
      { className: 'navbar-right' },
      React.createElement(
        'div',
        { className: 'language-dropdown' },
        React.createElement(
          'button',
          {
            className: 'language-button',
            onClick: () => setMenuActive(false),
            title: t.language,
            'aria-label': 'Select Language',
          },
          React.createElement('img', {
            src: flags[language],
            alt: language,
            style: { width: '24px', height: '18px', marginRight: '8px', verticalAlign: 'middle', borderRadius: '3px', boxShadow: '0 0 4px rgba(0,0,0,0.2)' }
          }),
          language.toUpperCase()
        ),
        React.createElement(
          'ul',
          { className: 'language-menu' },
          languageOptions.map(({ code, label }) =>
            React.createElement(
              'li',
              {
                key: code,
                className: code === language ? 'active' : '',
                onClick: () => switchLanguage(code),
                role: 'button',
                tabIndex: 0,
                onKeyPress: (e) => { if (e.key === 'Enter') switchLanguage(code); },
              },
              React.createElement('img', {
                src: flags[code],
                alt: label,
                style: { width: '24px', height: '18px', marginRight: '8px', verticalAlign: 'middle', borderRadius: '3px', boxShadow: '0 0 4px rgba(0,0,0,0.2)' }
              }),
              label
            )
          )
        )
      ),
      React.createElement(
        'button',
        {
          className: 'nav-toggle',
          onClick: toggleMenu,
          'aria-label': 'Toggle Menu',
          'aria-expanded': menuActive,
        },
        menuActive
          ? React.createElement('span', { className: 'close-icon' }, '✖')
          : React.createElement('span', { className: 'menu-icon' }, '☰')
      )
    )
  );
}
