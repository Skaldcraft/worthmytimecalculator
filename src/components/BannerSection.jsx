import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext.jsx';

const getYouTubeId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
};

const getVimeoId = (url) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

const BannerItem = ({ banner }) => {
  const base =
    'block w-full max-w-[728px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300';

  if (banner.type === 'video') {
    const youtubeId = getYouTubeId(banner.url);
    const vimeoId = getVimeoId(banner.url);

    if (youtubeId || vimeoId) {
      const src = youtubeId
        ? `https://www.youtube.com/embed/${youtubeId}?rel=0`
        : `https://player.vimeo.com/video/${vimeoId}`;

      const marketingGranted =
        typeof window !== 'undefined' &&
        typeof window.PTUCookies?.has === 'function' &&
        window.PTUCookies.has('marketing');

      return (
        <div className={`${base} aspect-video`}>
          <iframe
            src={marketingGranted ? src : undefined}
            data-ptu-category="marketing"
            data-ptu-src={src}
            title={banner.alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      );
    }

    const video = (
      <video
        src={banner.url}
        poster={banner.img || undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-auto"
        aria-label={banner.alt}
      />
    );

    return banner.link ? (
      <a
        href={banner.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={base}
      >
        {video}
      </a>
    ) : (
      <div className={base}>{video}</div>
    );
  }

  return (
    <a
      href={banner.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={base}
    >
      <img
        src={banner.img}
        alt={banner.alt}
        className="w-full h-auto"
        loading="lazy"
      />
    </a>
  );
};

const BannerSection = () => {
  const { language } = useLanguage();
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const adLang = language === 'es' ? 'es' : 'en';

    const load = async () => {
      try {
        setError(false);
        const res = await fetch(`/ads/${adLang}.json`);
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
        <BannerItem key={banner.id} banner={banner} />
      ))}
    </div>
  );
};

export default BannerSection;
