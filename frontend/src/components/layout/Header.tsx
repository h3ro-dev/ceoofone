'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-blue hover:text-primary-orange transition-colors">
              CEO of One
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#problem" 
              onClick={(e) => scrollToSection(e, '#problem')}
              className="text-neutral-darkGray hover:text-primary-blue transition-colors"
            >
              The Problem
            </a>
            <a 
              href="#solution" 
              onClick={(e) => scrollToSection(e, '#solution')}
              className="text-neutral-darkGray hover:text-primary-blue transition-colors"
            >
              Solution
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, '#how-it-works')}
              className="text-neutral-darkGray hover:text-primary-blue transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => scrollToSection(e, '#testimonials')}
              className="text-neutral-darkGray hover:text-primary-blue transition-colors"
            >
              Success Stories
            </a>
          </nav>
          
          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="primary" className="hidden sm:inline-flex" isBookingTrigger>
              Get Started Free
            </Button>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-neutral-softGray">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;