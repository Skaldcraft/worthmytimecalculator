import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { Loader2, AlertCircle } from 'lucide-react';
import AdSlot from './AdSlot.jsx';

// Error Boundary to gracefully catch rendering errors in the banner html code
class BannerErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[BannerErrorBoundary] Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full bg-destructive/10 border-2 border-destructive p-4 rounded-md text-destructive my-4">
          <div className="flex items-center gap-2 font-bold mb-1">
            <AlertCircle className="w-5 h-5" />
            <span>Banner Render Error</span>
          </div>
          <p className="text-sm">An error occurred while rendering the banner.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const BannerContent = () => {
  const { language } = useLanguage();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBanners = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await pb.collection('banners').getList(1, 50, {
          filter: `isActive = true && language = "${language}"`,
          $autoCancel: false,
        });
        
        if (isMounted) {
          setBanners(response.items || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setBanners([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBanners();

    return () => {
      isMounted = false;
    };
  }, [language]);

  if (error) {
    return (
      <div className="w-full bg-destructive/10 border border-destructive/20 p-6 rounded-xl text-center my-8 flex flex-col items-center gap-2">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <h3 className="text-destructive font-semibold">Error loading banners</h3>
        <p className="text-destructive/80 text-sm">{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-[120px] bg-muted/30 border border-border border-dashed p-8 rounded-xl flex flex-col items-center justify-center my-8">
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin mb-3" />
        <span className="text-muted-foreground text-sm font-medium">Loading banners...</span>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="w-full my-8 flex flex-col gap-6 relative z-10">
      {banners.map((banner) => (
        <div key={banner.id} className="banner-wrapper relative w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400/20 text-xs font-medium z-0 pointer-events-none">
            ADVERTISEMENT
          </div>
          <AdSlot type="affiliate" data={banner} />
        </div>
      ))}
    </div>
  );
};

const BannerSection = () => (
  <BannerErrorBoundary>
    <BannerContent />
  </BannerErrorBoundary>
);

export default BannerSection;