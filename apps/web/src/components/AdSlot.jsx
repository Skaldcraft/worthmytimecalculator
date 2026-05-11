import React, { useEffect } from 'react';

/**
 * AdSlot Component
 * A universal wrapper for both affiliate banners and automated ads (Google AdSense).
 * 
 * @param {string} type - 'affiliate' or 'adsense'
 * @param {object} data - banner/ad configuration data
 */
const AdSlot = ({ type = 'affiliate', data }) => {
  useEffect(() => {
    // Attempt to push to AdSense if type is adsense
    if (type === 'adsense' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, [type]);

  if (type === 'affiliate' && data?.htmlCode) {
    return (
      <div 
        className="ad-slot affiliate-banner w-full flex justify-center items-center overflow-hidden rounded-xl"
        dangerouslySetInnerHTML={{ __html: data.htmlCode }} 
      />
    );
  }

  if (type === 'adsense') {
    return (
      <div className="ad-slot adsense-container w-full flex justify-center py-4">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={data.clientId || "YOUR_CLIENT_ID"}
          data-ad-slot={data.slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return null;
};

export default AdSlot;
