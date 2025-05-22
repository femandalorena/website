import React from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import Home from './pages/Home';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return React.createElement(
    LanguageProvider,
    null,
    React.createElement(AnimatedBackground, null),
    React.createElement(Navbar, null),
    React.createElement(Home, null),
    React.createElement(Footer, null)
  );
}
