import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import Home from './components/Home/Home';
import { LanguageProvider } from './context/LanguageContext';
import './styles/colors.css';

export default function App() {
  const [isWorkingWithUs, setIsWorkingWithUs] = useState(true);

  return (
    <LanguageProvider>
      <AnimatedBackground />
      <Navbar
        isWorkingWithUs={isWorkingWithUs}
        setIsWorkingWithUs={setIsWorkingWithUs}
      />
      <Home
        isWorkingWithUs={isWorkingWithUs}
        setIsWorkingWithUs={setIsWorkingWithUs}
      />
      <Footer />
    </LanguageProvider>
  );
}
