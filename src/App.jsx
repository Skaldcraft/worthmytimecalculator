import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import LanguageRedirect from './components/LanguageRedirect.jsx';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from '@/context/LanguageContext.jsx';
import { CurrencyProvider } from '@/context/CurrencyContext.jsx';
import CookieConsentBanner from '@/components/CookieConsent.jsx';

const LegalNoticePage = lazy(() => import('./pages/LegalNoticePage.jsx'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage.jsx'));
const LegalNoticeEnPage = lazy(() => import('./pages/LegalNoticeEnPage.jsx'));
const PrivacyPolicyEnPage = lazy(() => import('./pages/PrivacyPolicyEnPage.jsx'));
const CookiePolicyEnPage = lazy(() => import('./pages/CookiePolicyEnPage.jsx'));

function App() {
  return (
    <CurrencyProvider>
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <CookieConsentBanner />
        <Suspense fallback={null}>
        <Routes>
          {/* Root route with LanguageRedirect middleware */}
          <Route 
            path="/" 
            element={
              <LanguageRedirect>
                <HomePage />
              </LanguageRedirect>
            } 
          />
          
          {/* Language-specific home routes */}
          <Route path="/en" element={<HomePage />} />
          <Route path="/es" element={<HomePage />} />
          
          {/* Spanish Legal Routes */}
          <Route path="/es/aviso-legal" element={<LegalNoticePage />} />
          <Route path="/es/politica-privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/es/politica-cookies" element={<CookiePolicyPage />} />
          
          {/* English Legal Routes */}
          <Route path="/en/legal-notice" element={<LegalNoticeEnPage />} />
          <Route path="/en/privacy-policy" element={<PrivacyPolicyEnPage />} />
          <Route path="/en/cookie-policy" element={<CookiePolicyEnPage />} />
        </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </LanguageProvider>
    </CurrencyProvider>
  );
}

export default App;