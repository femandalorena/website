import React from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import { LanguageProvider } from './context/LanguageContext';
import './styles/colors.css';

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
