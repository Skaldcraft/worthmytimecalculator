import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext.jsx';

const LanguageRedirect = ({ children }) => {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasRedirected = sessionStorage.getItem('hasLanguageRedirected');
    
    if (!hasRedirected) {
      sessionStorage.setItem('hasLanguageRedirected', 'true');
      
      // Detect browser language
      const browserLang = navigator.language || navigator.userLanguage || '';
      const isSpanish = browserLang.toLowerCase().startsWith('es');
      
      if (isSpanish) {
        setLanguage('es');
        navigate('/es', { replace: true });
      } else {
        setLanguage('en');
        navigate('/en', { replace: true });
      }
    } else {
      // If already redirected in this session, allow rendering the root route
      setIsChecking(false);
    }
  }, [navigate, setLanguage]);

  // Render nothing while the redirect check is happening
  if (isChecking) {
    return null;
  }

  return children;
};

export default LanguageRedirect;