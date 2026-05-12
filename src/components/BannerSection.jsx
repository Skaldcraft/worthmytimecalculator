import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const BannerSection = () => {
  const { language } = useLanguage();
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setError(false);
        const res = await fetch(`/ads/${language}.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setBanners(Array.isArray(data) ? data.filter((b) => b.active) : []);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [language]);

  if (error || banners.length === 0) return null;

  return (
    <div className="w-full my-8 flex flex-col items-center gap-6">
      {banners.map((banner) => (
        <a
          key={banner.id}
          href={banner.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full max-w-[728px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <img
            src={banner.img}
            alt={banner.alt}
            className="w-full h-auto"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
};

export default BannerSection;
