import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { translations } from '@/lib/translations.js';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isSpanish = language === 'es';
  const legalT = isSpanish ? translations.es : translations.en;

  return (
    <footer className="border-t border-border mt-8 py-6 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground text-center mb-4 leading-relaxed">
          {isSpanish
            ? 'En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Esto no supone un coste extra para ti.'
            : 'As an Amazon Associate I earn from qualifying purchases. This does not involve any extra cost to you.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>{t.copyright}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link 
                to={isSpanish ? "/es/aviso-legal" : "/en/legal-notice"} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {legalT.legalNotice}
              </Link>
              <Link 
                to={isSpanish ? "/es/politica-privacidad" : "/en/privacy-policy"} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {legalT.privacyPolicy}
              </Link>
              <Link 
                to={isSpanish ? "/es/politica-cookies" : "/en/cookie-policy"} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {legalT.cookiePolicy}
              </Link>
              <button
                type="button"
                data-ptu-cookies-open
                className="hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {isSpanish ? 'Configurar cookies' : 'Cookie settings'}
              </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;