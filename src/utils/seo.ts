// SEO utility functions

export const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "QR Kód Generátor",
    "alternateName": "qrkod.hu",
    "url": "https://qrkod.hu",
    "description": "Ingyenes online QR kód generátor magyarul. Készíts QR kódot weboldalhoz, telefonszámhoz, emailhez, WiFi hálózathoz és szöveghez.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "HUF"
    },
    "creator": {
      "@type": "Organization",
      "name": "qrkod.hu"
    },
    "inLanguage": "hu",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };
};

export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ingyenes a QR kód generátor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Igen, a qrkod.hu QR kód generátor teljesen ingyenes és korlátlan használat mellett érhető el."
        }
      },
      {
        "@type": "Question",
        "name": "Milyen formátumban töltődik le a QR kód?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A QR kód PNG formátumban, 1024x1024 pixel felbontásban töltődik le, amely tökéletes nyomtatáshoz és digitális használathoz."
        }
      },
      {
        "@type": "Question",
        "name": "Működik mobilon is a QR kód generátor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Igen, a qrkod.hu minden eszközön használható - mobiltelefonon, tableten és számítógépen egyaránt."
        }
      },
      {
        "@type": "Question",
        "name": "Milyen típusú QR kódokat lehet készíteni?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weboldalhoz, telefonszámhoz, email címhez, WiFi hálózathoz, GPS koordinátákhoz és egyszerű szöveghez is készíthetsz QR kódot."
        }
      }
    ]
  };
};

export const getPageKeywords = (type?: string) => {
  const baseKeywords = "qr kód generátor, ingyenes qr kód, qr kód készítő, online qr kód, qr code generator magyar";
  
  const typeKeywords: Record<string, string> = {
    'url': 'weboldal qr kód, link qr kód, url qr kód',
    'phone': 'telefonszám qr kód, telefon qr kód, hívás qr kód',
    'email': 'email qr kód, e-mail qr kód, levél qr kód',
    'wifi': 'wifi qr kód, internet qr kód, hálózat qr kód',
    'location': 'helyszín qr kód, gps qr kód, térkép qr kód',
    'text': 'szöveges qr kód, üzenet qr kód, szöveg qr kód'
  };
  
  return type && typeKeywords[type] 
    ? `${baseKeywords}, ${typeKeywords[type]}`
    : baseKeywords;
};