import React from 'react';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const Header = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground" style={{ letterSpacing: '-0.01em' }}>
            Worth My Time Calculator
          </h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 font-medium hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? 'Español' : 'English'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;