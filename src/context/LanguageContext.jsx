import React, { createContext, useContext, useState } from 'react';

const SUPPORTED_LANGUAGES = ['de', 'en', 'es', 'fr', 'it', 'pl', 'ro', 'ru', 'tr', 'uk'];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/es')) return 'es';
      if (path.startsWith('/en')) return 'en';
    }

    try {
      const stored = localStorage.getItem('userLanguagePreference');
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
    } catch {}

    const browserLang = typeof navigator !== 'undefined' ? (navigator.language || navigator.userLanguage || '') : '';
    const lang = browserLang.toLowerCase().split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(lang)) return lang;

    return 'en';
  });

  const setLanguage = (newLanguage) => {
    setLanguageState(newLanguage);
    try { localStorage.setItem('userLanguagePreference', newLanguage); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
