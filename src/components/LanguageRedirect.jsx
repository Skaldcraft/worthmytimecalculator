import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext.jsx';

const LanguageRedirect = ({ children }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasRedirected = sessionStorage.getItem('hasLanguageRedirected');

    if (hasRedirected) {
      setIsChecking(false);
      return;
    }

    sessionStorage.setItem('hasLanguageRedirected', 'true');

    // Only redirect Spanish visitors to /es; English/others stay at /
    if (language === 'es') {
      navigate('/es', { replace: true });
    } else {
      setLanguage('en');
      setIsChecking(false);
    }
  }, [navigate, setLanguage, language]);

  if (isChecking) return null;

  return children;
};

export default LanguageRedirect;