import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import LegalNoticePage from './pages/LegalNoticePage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import CookiePolicyPage from './pages/CookiePolicyPage.jsx';
import LegalNoticeEnPage from './pages/LegalNoticeEnPage.jsx';
import PrivacyPolicyEnPage from './pages/PrivacyPolicyEnPage.jsx';
import CookiePolicyEnPage from './pages/CookiePolicyEnPage.jsx';
import LanguageRedirect from './components/LanguageRedirect.jsx';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from '@/context/LanguageContext.jsx';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
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
          <Route path="/aviso-legal" element={<LegalNoticePage />} />
          <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/politica-cookies" element={<CookiePolicyPage />} />
          
          {/* English Legal Routes */}
          <Route path="/legal-notice" element={<LegalNoticeEnPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyEnPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyEnPage />} />
        </Routes>
        <Toaster />
      </Router>
    </LanguageProvider>
  );
}

export default App;