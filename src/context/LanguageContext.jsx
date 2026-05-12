import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      // Check for persistent user preference
      const storedPreference = localStorage.getItem('userLanguagePreference');
      if (storedPreference === 'en' || storedPreference === 'es') {
        return storedPreference;
      }
    } catch (error) {
      console.warn('Failed to access localStorage for language preference:', error);
    }

    // Auto-detect browser language if no preference is saved
    const browserLang = typeof navigator !== 'undefined' ? (navigator.language || navigator.userLanguage || '') : '';
    if (browserLang.toLowerCase().startsWith('en')) {
      return 'en';
    }
    
    // Default to 'es' if neither is detected or if it explicitly starts with 'es'
    return 'es';
  });

  const setLanguage = (newLanguage) => {
    setLanguageState(newLanguage);
    try {
      localStorage.setItem('userLanguagePreference', newLanguage);
    } catch (error) {
      console.warn('Failed to save language preference to localStorage:', error);
    }
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