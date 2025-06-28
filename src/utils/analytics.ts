// Google Analytics 4 tracking
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Track QR code generation
export const trackQRGeneration = (type: string, length: number) => {
  gtag('event', 'qr_code_generated', {
    event_category: 'QR Code',
    event_label: type,
    value: length
  });
};

// Track QR code download
export const trackQRDownload = (type: string) => {
  gtag('event', 'qr_code_downloaded', {
    event_category: 'QR Code',
    event_label: type
  });
};

// Track color customization
export const trackColorChange = (colorType: 'foreground' | 'background' | 'transparent') => {
  gtag('event', 'color_customization', {
    event_category: 'Customization',
    event_label: colorType
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, label: string) => {
  gtag('event', 'click', {
    event_category: 'External Link',
    event_label: label,
    transport_type: 'beacon'
  });
};