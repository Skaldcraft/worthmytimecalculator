import React from 'react';
import LanguageSelector from '@/components/LanguageSelector.jsx';
import CurrencySelector from '@/components/CurrencySelector.jsx';

const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground" style={{ letterSpacing: '-0.01em' }}>
            Worth My Time Calculator
          </h1>
          
          <div className="flex items-center gap-3">
            <CurrencySelector />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
