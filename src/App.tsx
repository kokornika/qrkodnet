import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Link, Type, Phone, Mail, Wifi, MapPin, Globe, Palette, ExternalLink, HelpCircle, Star, Users, Zap } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#1e40af');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [isTransparent, setIsTransparent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async (inputText: string) => {
    if (!inputText.trim()) {
      setQrCodeDataUrl('');
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const dataUrl = await QRCode.toDataURL(inputText, {
        width: 1024,
        margin: 2,
        color: {
          dark: foregroundColor,
          light: isTransparent ? '#00000000' : backgroundColor
        },
        errorCorrectionLevel: 'M'
      });
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      setError('Hiba történt a QR kód generálása során');
      setQrCodeDataUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode(text);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [text, foregroundColor, backgroundColor, isTransparent]);

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = `qr-kod-${Date.now()}.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  const detectInputType = (input: string) => {
    if (!input.trim()) return { type: 'empty', icon: <Type className="w-5 h-5" />, label: '' };
    
    // URL detection
    if (input.startsWith('https://') || input.startsWith('http://') || input.startsWith('www.')) {
      return { type: 'url', icon: <Globe className="w-5 h-5" />, label: 'Weboldal' };
    }
    
    // Phone number detection (at least 9 digits)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{9,}$/;
    if (phoneRegex.test(input.replace(/\s/g, ''))) {
      return { type: 'phone', icon: <Phone className="w-5 h-5" />, label: 'Telefonszám' };
    }
    
    // Email detection
    if (input.includes('@') && input.includes('.')) {
      return { type: 'email', icon: <Mail className="w-5 h-5" />, label: 'Email cím' };
    }
    
    // WiFi detection
    if (input.startsWith('WIFI:')) {
      return { type: 'wifi', icon: <Wifi className="w-5 h-5" />, label: 'WiFi hálózat' };
    }
    
    // GPS coordinates detection
    if (input.startsWith('geo:') || (input.includes(',') && /^-?\d+\.?\d*,-?\d+\.?\d*$/.test(input))) {
      return { type: 'location', icon: <MapPin className="w-5 h-5" />, label: 'Helyszín' };
    }
    
    // Default to text
    return { type: 'text', icon: <Type className="w-5 h-5" />, label: 'Szöveg' };
  };

  const inputType = detectInputType(text);

  const presetColors = [
    { name: 'Kék', fg: '#1e40af', bg: '#ffffff' },
    { name: 'Fekete', fg: '#000000', bg: '#ffffff' },
    { name: 'Piros', fg: '#dc2626', bg: '#ffffff' },
    { name: 'Zöld', fg: '#16a34a', bg: '#ffffff' },
    { name: 'Sötét', fg: '#ffffff', bg: '#1f2937' },
    { name: 'Átlátszó', fg: '#000000', bg: '#ffffff', transparent: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
      {/* SEO optimized Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ingyenes QR Kód Generátor
            </h1>
            <p className="text-blue-100 text-sm mb-4">
              Gyors, egyszerű és teljesen ingyenes QR kód készítő magyarul
            </p>
            
            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-blue-100 text-xs">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>10,000+ felhasználó</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>4.8/5 értékelés</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>Azonnali generálás</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-100/50 border border-blue-100/50">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  {inputType.icon}
                  Mit szeretnél QR kóddá alakítani?
                  {inputType.label && (
                    <span className="ml-auto text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {inputType.label}
                    </span>
                  )}
                </h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Írd be a tartalmat..."
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none min-h-[100px] text-gray-700 placeholder-gray-400"
                      aria-label="QR kód tartalom beviteli mező"
                    />
                  </div>

                  {text && (
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      <span className="font-medium">Karakterek:</span> {text.length}
                    </div>
                  )}
                </div>

                {/* Input suggestions with SEO keywords */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">QR kód típusok és példák:</h3>
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3" />
                      <span><strong>Weboldal QR kód:</strong> https://example.com vagy www.example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span><strong>Telefonszám QR kód:</strong> +36 30 123 4567 vagy 06301234567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      <span><strong>Email QR kód:</strong> email@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span><strong>Helyszín QR kód:</strong> 47.4979,19.0402 vagy geo:47.4979,19.0402</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-3 h-3" />
                      <span><strong>WiFi QR kód:</strong> WIFI:T:WPA;S:HálózatNév;P:jelszó;;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Type className="w-3 h-3" />
                      <span><strong>Szöveges QR kód:</strong> Bármilyen szöveg vagy üzenet</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Customization */}
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-100/50 border border-blue-100/50">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Palette className="w-5 h-5" />
                  QR kód színek testreszabása
                </h3>

                {/* Preset Colors */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                  {presetColors.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setForegroundColor(preset.fg);
                        setBackgroundColor(preset.bg);
                        setIsTransparent(preset.transparent || false);
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors"
                      aria-label={`${preset.name} színséma kiválasztása`}
                    >
                      <div className="relative">
                        <div 
                          className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center text-xs font-bold"
                          style={{ 
                            backgroundColor: preset.transparent ? 'transparent' : preset.bg,
                            color: preset.fg,
                            backgroundImage: preset.transparent ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                            backgroundSize: preset.transparent ? '6px 6px' : 'auto',
                            backgroundPosition: preset.transparent ? '0 0, 0 3px, 3px -3px, -3px 0px' : 'auto'
                          }}
                        >
                          QR
                        </div>
                      </div>
                      <span className="text-xs text-gray-700 font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      QR kód színe
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                        aria-label="QR kód színének kiválasztása"
                      />
                      <input
                        type="text"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono"
                        aria-label="QR kód szín kódja"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Háttér színe
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          disabled={isTransparent}
                          className={`w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer ${
                            isTransparent ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          aria-label="Háttér színének kiválasztása"
                        />
                        <input
                          type="text"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          disabled={isTransparent}
                          className={`flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono ${
                            isTransparent ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          aria-label="Háttér szín kódja"
                        />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isTransparent}
                          onChange={(e) => setIsTransparent(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Átlátszó háttér</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Ad 1 - Digitális Névjegykártya */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-emerald-900 mb-2">
                      💼 Digitális Névjegykártya QR Kóddal
                    </h4>
                    <p className="text-emerald-700 text-sm mb-3">
                      Készíts professzionális digitális névjegykártyát QR kóddal! Modern, környezetbarát megoldás üzleti kapcsolatokhoz.
                    </p>
                    <a
                      href="https://qrnevjegy.hu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Kipróbálom
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="ml-4 text-4xl">
                    📱
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-100/50 border border-blue-100/50">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Generált QR Kód</h3>
                
                <div className="flex flex-col items-center">
                  {isLoading ? (
                    <div className="w-64 h-64 flex items-center justify-center bg-gray-50 rounded-2xl" aria-label="QR kód generálása folyamatban">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : qrCodeDataUrl ? (
                    <div className="relative group">
                      <div 
                        className="w-64 h-64 rounded-2xl p-4 border-4 border-gray-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        style={{
                          backgroundImage: isTransparent ? 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)' : 'none',
                          backgroundSize: isTransparent ? '16px 16px' : 'auto',
                          backgroundPosition: isTransparent ? '0 0, 0 8px, 8px -8px, -8px 0px' : 'auto',
                          backgroundColor: isTransparent ? 'transparent' : '#ffffff'
                        }}
                      >
                        <img
                          src={qrCodeDataUrl}
                          alt="Generált QR kód - kattints a letöltéshez"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-2xl transition-colors duration-300"></div>
                    </div>
                  ) : (
                    <div className="w-64 h-64 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                      <QrCode className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-center text-sm">
                        A QR kód itt fog megjelenni
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
                      {error}
                    </div>
                  )}

                  {qrCodeDataUrl && (
                    <button
                      onClick={downloadQRCode}
                      className="mt-6 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                      aria-label="QR kód letöltése PNG formátumban"
                    >
                      <Download className="w-5 h-5" />
                      QR Kód Letöltése (PNG)
                    </button>
                  )}
                </div>
              </div>

              {/* FAQ Section for SEO */}
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-100/50 border border-blue-100/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Gyakori kérdések
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Ingyenes a QR kód generátor?</h4>
                    <p className="text-gray-600">Igen, teljesen ingyenes és korlátlan használat.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Milyen formátumban töltődik le?</h4>
                    <p className="text-gray-600">PNG formátumban, 1024x1024 pixel felbontásban.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Működik mobilon is?</h4>
                    <p className="text-gray-600">Igen, minden eszközön használható.</p>
                  </div>
                </div>
              </div>

              {/* Mini Ad 2 - Weboldal Fejlesztés */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 border border-purple-100">
                <div className="text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="text-lg font-bold text-purple-900 mb-2">
                    Weboldal Fejlesztés
                  </h4>
                  <p className="text-purple-700 text-sm mb-4">
                    Professzionális weboldalak és online megjelenés. Modern design, gyors betöltés, SEO optimalizálás.
                  </p>
                  <a
                    href="https://onlinelepes.hu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Részletek
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 border border-orange-100">
                <h4 className="text-lg font-bold text-orange-900 mb-3">💡 QR kód tippek</h4>
                <ul className="space-y-2 text-orange-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Sötét előtér és világos háttér a legjobb olvashatóság</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Átlátszó háttér ideális logók és designok mellé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>A QR kód nagy felbontásban készül (1024px)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Teszteld a QR kódot különböző eszközökön</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional SEO Content */}
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl shadow-blue-100/50 border border-blue-100/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Miért válaszd a qrkod.hu QR kód generátort?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gyors és egyszerű</h3>
                <p className="text-gray-600 text-sm">
                  Másodpercek alatt készíts professzionális QR kódokat. Nincs regisztráció, nincs várakozás.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Testreszabható</h3>
                <p className="text-gray-600 text-sm">
                  Változtasd meg a színeket, használj átlátszó hátteret. Illeszd a QR kódot a brandedhéz.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nagy felbontás</h3>
                <p className="text-gray-600 text-sm">
                  1024x1024 pixel felbontású PNG fájlok. Tökéletes nyomtatáshoz és digitális használathoz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with additional SEO content */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <QrCode className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-white text-lg">qrkod.hu</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Magyarország vezető ingyenes QR kód generátora. Gyors, megbízható és teljesen ingyenes.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.8/5 értékelés</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">QR kód típusok</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Weboldal QR kód</li>
                <li>Telefonszám QR kód</li>
                <li>Email QR kód</li>
                <li>WiFi QR kód</li>
                <li>Helyszín QR kód</li>
                <li>Szöveges QR kód</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Funkciók</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Ingyenes használat</li>
                <li>Színes QR kódok</li>
                <li>Átlátszó háttér</li>
                <li>Nagy felbontás</li>
                <li>Azonnali letöltés</li>
                <li>Mobil barát</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Kapcsolat</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@qrkod.hu</li>
                <li>Gyakori kérdések</li>
                <li>Adatvédelem</li>
                <li>Felhasználási feltételek</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 qrkod.hu - Ingyenes QR kód generátor. Minden jog fenntartva.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              QR Code® is a registered trademark of DENSO WAVE INCORPORATED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;