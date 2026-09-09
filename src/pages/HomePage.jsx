import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CalculatorSection from '@/components/CalculatorSection.jsx';
import HistorySection from '@/components/HistorySection.jsx';
import BannerSection from '@/components/BannerSection.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { translations } from '@/lib/translations.js';

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
              <h2 className="seo-heading" style={{ fontSize: '1px', height: 0, overflow: 'hidden', opacity: 0, margin: 0, padding: 0 }}>
                {t.seoH2}
              </h2>
            </div>

            {/* Application Sections - ensuring proper spacing and structure */}
            <CalculatorSection onCalculation={handleCalculation} />

            <BannerSection />

            <div className="w-full flex justify-center my-8">
              <div className="w-full max-w-3xl rounded-2xl border border-border/80 bg-card/90 p-6 sm:p-8 text-center shadow-sm">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80 sm:text-xs">
                  {language === 'es' ? 'TAMBIÉN DE SKALDCRAFT' : 'ALSO FROM SKALDCRAFT'}
                </p>

                <h3 className="text-xl font-bold text-foreground sm:text-2xl">WorkWorth</h3>

                <p className="mt-3 text-base font-medium text-foreground sm:text-lg">
                  {language === 'es'
                    ? 'Identifica lo que suma. Reduce lo que te consume.'
                    : 'Identify what adds value. Cut what drains you.'}
                </p>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {language === 'es'
                    ? 'Calcula tu tarifa real por hora, tu beneficio neto y a dónde se van tu tiempo y tu dinero en cada periodo de trabajo.'
                    : 'Calculate your real hourly rate, your net profit, and where your time and money go in each work period.'}
                </p>

                <p className="mt-5 text-sm sm:text-base">
                  <a
                    href="https://workworth.skaldcraft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {language === 'es' ? 'Visitar WorkWorth' : 'Visit WorkWorth'}
                  </a>
                  <span className="ml-2 text-muted-foreground">https://workworth.skaldcraft.com/</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {language === 'es'
                    ? 'WorkWorth funciona por completo en tu propio dispositivo: sin cuenta, sin contraseña y sin nube.'
                    : 'WorkWorth works entirely on your own device: no account, no password, and no cloud.'}
                </p>

                <p className="mt-3 text-xs text-muted-foreground sm:text-sm">
                  {language === 'es'
                    ? 'En español para la versión en español y en inglés para las demás versiones.'
                    : 'In Spanish for the Spanish version and in English for all other versions.'}
                </p>
              </div>
            </div>

            <HistorySection latestCalculation={latestCalculation} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;