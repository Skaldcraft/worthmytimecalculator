import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { translations } from '@/lib/translations.js';

const CalculatorSection = ({ onCalculation, onClearHistory }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [price, setPrice] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeType, setIncomeType] = useState('monthly');

  const [lifespan, setLifespan] = useState('');
  const [costType, setCostType] = useState('monthly');

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({ price: '', income: '' });

  // Standard working hours per month (40 hours/week * 4 weeks)
  const HOURS_PER_MONTH = 160;

  // Reset form when language changes
  useEffect(() => {
    setPrice('');
    setIncomeAmount('');
    setLifespan('');
    setResults(null);
    setErrors({ price: '', income: '' });
    setIncomeType('monthly');
    setCostType('monthly');

    // Call parent handler if provided to clear the latest calculation state
    // so it doesn't accidentally get added to the new language's history
    if (onClearHistory) {
      onClearHistory();
    }
  }, [language, onClearHistory]);

  useEffect(() => {
    const priceNum = parseFloat(price);
    const incomeNum = parseFloat(incomeAmount);
    const lifespanNum = parseFloat(lifespan);

    const newErrors = { price: '', income: '' };

    if (price && (isNaN(priceNum) || priceNum <= 0)) {
      newErrors.price = t.priceError;
    }
    if (incomeAmount && (isNaN(incomeNum) || incomeNum <= 0)) {
      newErrors.income = t.incomeError;
    }

    setErrors(newErrors);

    if (price && incomeAmount && !newErrors.price && !newErrors.income) {
      let workDays, workHours, workWeeks;

      if (incomeType === 'monthly') {
        workDays = (priceNum / incomeNum) * 30;
        workHours = (priceNum / incomeNum) * HOURS_PER_MONTH;
        workWeeks = workHours / 40;
      } else {
        workHours = priceNum / incomeNum;
        workDays = workHours / 8;
        workWeeks = workHours / 40;
      }

      setResults({
        days: workDays,
        hours: workHours,
        weeks: workWeeks,
        price: priceNum,
        income: incomeNum,
        type: incomeType,
      });

      // Only trigger history addition if ALL required fields (including lifespan) are valid
      if (!isNaN(lifespanNum) && lifespanNum > 0) {
        const timeoutId = setTimeout(() => {
          if (onCalculation) {
            onCalculation({
              price: priceNum,
              days: workDays,
              timestamp: Date.now(),
              language: language, // Tag the calculation with the language it was created in
            });
          }
        }, 800);

        return () => clearTimeout(timeoutId);
      }
    } else {
      setResults(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, incomeAmount, incomeType, lifespan, language]);

  const handleIncomeTypeChange = (type) => {
    if (incomeType !== type) {
      setIncomeType(type);
      setIncomeAmount('');
    }
  };

  const priceNum = parseFloat(price);
  const lifespanNum = parseFloat(lifespan);
  const incomeNum = parseFloat(incomeAmount);
  
  let estimatedCost = null;
  let hoursNeeded = null;

  if (!isNaN(priceNum) && priceNum > 0 && !isNaN(lifespanNum) && lifespanNum > 0) {
    const yearlyCost = priceNum / lifespanNum;
    const monthlyCost = yearlyCost / 12;

    if (costType === 'monthly') {
      estimatedCost = monthlyCost;
    } else {
      estimatedCost = yearlyCost;
    }

    if (!isNaN(incomeNum) && incomeNum > 0) {
      if (incomeType === 'monthly') {
        hoursNeeded = (estimatedCost / incomeNum) * HOURS_PER_MONTH;
      } else {
        hoursNeeded = estimatedCost / incomeNum;
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        <Card className="border-2 border-primary shadow-xl h-full">
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-base font-medium">
                {t.priceLabel}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{t.currency}</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-7 text-base text-foreground placeholder:text-muted-foreground"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex p-1 bg-muted rounded-lg w-full max-w-[240px]">
                <button
                  type="button"
                  onClick={() => handleIncomeTypeChange('monthly')}
                  className={cn(
                    'flex-1 text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md transition-all',
                    incomeType === 'monthly'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t.monthly}
                </button>
                <button
                  type="button"
                  onClick={() => handleIncomeTypeChange('hourly')}
                  className={cn(
                    'flex-1 text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md transition-all',
                    incomeType === 'hourly'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t.hourly}
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income" className="text-sm font-medium">
                  {incomeType === 'monthly' ? t.monthlyIncome : t.hourlyIncome}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{t.currency}</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="0.00"
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    className="pl-7 text-base text-foreground placeholder:text-muted-foreground"
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.income && (
                  <p className="text-sm text-destructive">{errors.income}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm h-full">
          <CardContent className="pt-6 space-y-6 flex flex-col h-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="lifespan" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  {t.lifespanLabel}
                </Label>
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/50">
                  {t.optional}
                </span>
              </div>
              <Input
                id="lifespan"
                type="number"
                placeholder={t.lifespanPlaceholder}
                value={lifespan}
                onChange={(e) => setLifespan(e.target.value)}
                className="text-base text-foreground placeholder:text-muted-foreground"
                min="1"
                step="0.1"
              />
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex p-1 bg-muted rounded-lg w-full max-w-[240px]">
                <button
                  type="button"
                  onClick={() => setCostType('monthly')}
                  className={cn(
                    'flex-1 text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md transition-all',
                    costType === 'monthly'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t.costPerMonth}
                </button>
                <button
                  type="button"
                  onClick={() => setCostType('yearly')}
                  className={cn(
                    'flex-1 text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md transition-all',
                    costType === 'yearly'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {t.costPerYear}
                </button>
              </div>

              <div className="mt-auto pt-6">
                <AnimatePresence mode="wait">
                  {estimatedCost !== null ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-secondary/50 rounded-xl border border-border flex flex-col gap-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {costType === 'monthly' ? t.estimatedMonthlyCost : t.estimatedYearlyCost}
                        </p>
                        <p
                          className="text-3xl font-bold text-foreground"
                          style={{ letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
                        >
                          {estimatedCost.toFixed(2)}{' '}
                          <span className="text-xl text-muted-foreground font-medium">{t.currency}</span>
                        </p>
                      </div>
                      
                      {hoursNeeded !== null && (
                        <div className="pt-3 border-t border-border/50">
                          <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                            {t.hours} {costType === 'monthly' ? t.monthly.toLowerCase() : (language === 'es' ? 'por año' : 'per year')}
                          </p>
                          <p className="text-xl font-semibold text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>
                            {hoursNeeded.toFixed(1)} <span className="text-sm text-muted-foreground font-medium">h</span>
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 border border-dashed border-border rounded-xl flex items-center justify-center text-center min-h-[88px]"
                    >
                      <p className="text-sm text-muted-foreground">
                        {t.emptyCostState}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-4 w-4 opacity-90" />
                  <p className="text-xs font-medium opacity-90 uppercase tracking-wide">{t.days}</p>
                </div>
                <p
                  className="text-4xl font-bold"
                  style={{ letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {results.days.toFixed(1)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t.hours}</p>
                </div>
                <p
                  className="text-4xl font-bold text-card-foreground"
                  style={{ letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {results.hours.toFixed(0)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t.weeks}</p>
                </div>
                <p
                  className="text-4xl font-bold text-card-foreground"
                  style={{ letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {results.weeks.toFixed(1)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalculatorSection;