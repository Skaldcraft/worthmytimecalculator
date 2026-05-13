import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { translations } from '@/lib/translations.js';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-border mt-8 py-6 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>{t.copyright}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link 
                to={language === 'en' ? "/en/legal-notice" : "/es/aviso-legal"} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {t.legalNotice}
              </Link>
              <Link 
                to={language === 'en' ? "/en/privacy-policy" : "/es/politica-privacidad"} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {t.privacyPolicy}
              </Link>
              <Link 
                to={language === 'en' ? "/en/cookie-policy" : "/es/politica-cookies"} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {t.cookiePolicy}
              </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;