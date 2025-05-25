import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import '../styles/Footer.css';

const startupName = process.env.REACT_APP_STARTUP_NAME;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-left">
        <p className="footer-company">© 2025 {startupName}. {t.contactContent}</p>
        <p className="footer-location">📍 La Paz, Bolivia</p>
      </div>

      <div className="footer-right">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram size={24} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook size={24} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>
    </footer>
  );
}
