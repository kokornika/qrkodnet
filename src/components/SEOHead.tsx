import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "QR Kód Generátor Ingyenes | qrkod.hu - Magyar QR Kód Készítő Online",
  description = "✅ Ingyenes QR kód generátor magyarul! Készíts QR kódot weboldalhoz, telefonszámhoz, emailhez, WiFi-hoz. Színes, átlátszó háttér, azonnali letöltés. qrkod.hu",
  keywords = "qr kód generátor, ingyenes qr kód, qr kód készítő, online qr kód, qr code generator magyar, qr kód generátor ingyenes, wifi qr kód, qr kód színes",
  canonical = "https://qrkod.hu/",
  ogImage = "https://qrkod.hu/og-image.jpg"
}) => {
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
  }, [title, description, keywords, canonical, ogImage]);
  
  return null;
};