import React from 'react';
import { useCurrency } from '@/context/CurrencyContext.jsx';

const currencies = [
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'EUR', symbol: '\u20AC', label: 'EUR' },
  { code: 'GBP', symbol: '\u00A3', label: 'GBP' },
  { code: 'MXN', symbol: '$', label: 'MXN' },
  { code: 'ARS', symbol: '$', label: 'ARS' },
  { code: 'CLP', symbol: '$', label: 'CLP' },
  { code: 'COP', symbol: '$', label: 'COP' },
  { code: 'BRL', symbol: 'R$', label: 'BRL' },
  { code: 'PEN', symbol: 'S/', label: 'PEN' },
  { code: 'RUB', symbol: '\u20BD', label: 'RUB' },
  { code: 'TRY', symbol: '\u20BA', label: 'TRY' },
  { code: 'PLN', symbol: 'z\u0142', label: 'PLN' },
  { code: 'UAH', symbol: '\u20B4', label: 'UAH' },
  { code: 'RON', symbol: 'lei', label: 'RON' },
];

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      id="currency"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="bg-transparent border border-border/60 rounded px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 cursor-pointer"
      aria-label="Currency"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label} {'\u2013'} {c.symbol}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
