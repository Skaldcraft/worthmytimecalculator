import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CalculatorSection from '@/components/CalculatorSection.jsx';
import HistorySection from '@/components/HistorySection.jsx';
import BannerSection from '@/components/BannerSection.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { translations } from '@/lib/translations.js';

const LAST_UPDATED = '2026-05-13';

const HomePage = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [latestCalculation, setLatestCalculation] = useState(null);

  const handleCalculation = (calculation) => {
    setLatestCalculation(calculation);
  };

  return (
    <>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="canonical" href="https://worthmytimecalculator.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://worthmytimecalculator.com" />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:image" content="https://worthmytimecalculator.com/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://worthmytimecalculator.com" />
        <meta property="twitter:title" content={t.metaTitle} />
        <meta property="twitter:description" content={t.metaDescription} />
        <meta property="twitter:image" content="https://worthmytimecalculator.com/og-image.png" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="space-y-8">
            <div className="text-center space-y-2 mb-6">
              <h1 className="text-foreground">
                {t.title}
              </h1>
              <div className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                <p>{t.subtitle1}</p>
                <p>{t.subtitle2}</p>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-4">
                {t.lastUpdatedLabel} {LAST_UPDATED}
              </p>
              <h2 className="seo-heading" style={{ fontSize: '1px', height: 0, overflow: 'hidden', opacity: 0, margin: 0, padding: 0 }}>
                {t.seoH2}
              </h2>
            </div>

            {/* Application Sections - ensuring proper spacing and structure */}
            <CalculatorSection onCalculation={handleCalculation} />

            <BannerSection />

            <HistorySection latestCalculation={latestCalculation} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;