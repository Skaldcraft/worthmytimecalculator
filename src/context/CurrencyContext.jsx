import React, { createContext, useContext, useState } from 'react';

const localeToCurrency = {
  'es-ES': 'EUR',
  'en-GB': 'GBP',
  'en-US': 'USD',
  'es-MX': 'MXN',
  'es-AR': 'ARS',
  'es-CL': 'CLP',
  'es-CO': 'COP',
  'pt-BR': 'BRL',
  'es-PE': 'PEN',
};

const langToCurrency = {
  de: 'EUR',
  en: 'USD',
  es: 'EUR',
  fr: 'EUR',
  it: 'EUR',
  pl: 'PLN',
  ro: 'RON',
  ru: 'RUB',
  tr: 'TRY',
  uk: 'UAH',
  pt: 'EUR',
};

const currencySymbols = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
  MXN: '$',
  ARS: '$',
  CLP: '$',
  COP: '$',
  BRL: 'R$',
  PEN: 'S/',
  RUB: '\u20BD',
  TRY: '\u20BA',
  PLN: 'z\u0142',
  UAH: '\u20B4',
  RON: 'lei',
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(() => {
    try {
      const stored = localStorage.getItem('currencyPreference');
      if (stored && currencySymbols[stored]) return stored;
    } catch {}
    const locale = typeof navigator !== 'undefined' ? (navigator.language || '') : '';
    const lang = locale.split('-')[0];
    return localeToCurrency[locale] || langToCurrency[lang] || 'USD';
  });

  const setCurrency = (code) => {
    setCurrencyState(code);
    try { localStorage.setItem('currencyPreference', code); } catch {}
  };

  const symbol = currencySymbols[currency] || '$';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (ctx === undefined) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
};

export { currencySymbols };
