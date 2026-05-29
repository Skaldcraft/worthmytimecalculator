import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useCurrency } from '@/context/CurrencyContext.jsx';

const HistorySection = ({ latestCalculation }) => {
  const { language } = useLanguage();
  const { symbol } = useCurrency();
  const [history, setHistory] = useState([]);

  const storageKey = `calculatorHistory_${language}`;
  const titleText = language === 'es' ? 'Historial reciente' : 'Recent History';
  const clearText = language === 'es' ? 'Limpiar' : 'Clear';
  const itemPrefix = language === 'es' ? 'Artículo de' : 'Item of';
  const daysText = language === 'es' ? 'días' : 'days';

  // Load history from localStorage on mount and when language changes
  useEffect(() => {
    const savedHistory = localStorage.getItem(storageKey);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, [storageKey]);

  // Add new calculation to history ONLY if it belongs to the current language
  useEffect(() => {
    if (latestCalculation && latestCalculation.language === language) {
      setHistory(prevHistory => {
        // Check if this calculation is already the most recent one (by timestamp)
        const lastItem = prevHistory[0];
        if (lastItem && lastItem.timestamp === latestCalculation.timestamp) {
          return prevHistory; // Don't add duplicate
        }

        // Add new item and keep only last 4
        const newHistory = [latestCalculation, ...prevHistory].slice(0, 4);
        localStorage.setItem(storageKey, JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [latestCalculation, language, storageKey]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(storageKey);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="border-border shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold">{titleText}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-destructive transition-all duration-200"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {clearText}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {history.map((item, index) => (
              <motion.div
                key={item.timestamp}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {itemPrefix} {symbol}{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {item.days.toFixed(1)} {daysText}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default HistorySection;