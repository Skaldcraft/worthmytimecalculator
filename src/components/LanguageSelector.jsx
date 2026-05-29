import React from 'react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Espa\u00F1ol' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Fran\u00E7ais' },
  { code: 'it', label: 'Italiano' },
  { code: 'pl', label: 'Polski' },
  { code: 'ro', label: 'Rom\u00E2n\u0103' },
  { code: 'ru', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439' },
  { code: 'tr', label: 'T\u00FCrk\u00E7e' },
  { code: 'uk', label: '\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      id="language"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-transparent border border-border/60 rounded px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 cursor-pointer"
      aria-label="Language"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
