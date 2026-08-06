import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    const pageLocation = window.location.href;
    const pageTitle = document.title;
    const pageLanguage = document.documentElement.lang || 'en';

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_location: pageLocation,
        page_title: pageTitle,
        language: pageLanguage,
      });
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'virtual_page_view',
      page_path: pagePath,
      page_location: pageLocation,
      page_title: pageTitle,
      page_language: pageLanguage,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default AnalyticsPageTracker;
