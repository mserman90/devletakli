import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle2, WifiOff, Share2, PlusSquare } from 'lucide-react';
import { pwaManager } from '../utils/pwaManager';
import { soundEngine } from '../utils/soundEngine';
import { useGameStore } from '../store/useGameStore';

export const PWAInstallBanner: React.FC = () => {
  const language = useGameStore((state) => state.language);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  const isEn = language === 'EN';
  const isIos =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  useEffect(() => {
    const unsubInstall = pwaManager.subscribeInstall((installable) => {
      setCanInstall(installable);
    });
    const unsubOnline = pwaManager.subscribeOnline((online) => {
      setIsOnline(online);
    });
    setIsInstalled(pwaManager.isInstalled());

    return () => {
      unsubInstall();
      unsubOnline();
    };
  }, []);

  const handleInstallClick = async () => {
    soundEngine.playUI('SELECT');
    if (canInstall) {
      const accepted = await pwaManager.promptInstall();
      if (accepted) {
        setIsDismissed(true);
      }
    } else if (isIos && !isInstalled) {
      setShowIosGuide(true);
    }
  };

  // Offline status notification bar (always show when offline)
  if (!isOnline) {
    return (
      <div className="bg-amber-950/95 border-b border-amber-600/60 px-3 py-1.5 text-amber-200 text-xs font-mono flex items-center justify-between shadow-lg sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>
            <strong>{isEn ? 'OFFLINE OPERATION MODE:' : 'ÇEVRİMDIŞI ÇALIŞMA MODU:'}</strong>{' '}
            {isEn
              ? 'Simulation running completely offline via local PWA cache.'
              : 'Simülasyon yerel PWA önbelleği üzerinden çevrimdışı kesintisiz çalışıyor.'}
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/50 font-bold">
          {isEn ? 'CACHE ACTIVE' : 'ÖNBELLEK AKTİF'}
        </span>
      </div>
    );
  }

  // If already installed or dismissed, do not show banner
  if (isInstalled || isDismissed || (!canInstall && !isIos)) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-amber-950/95 via-slate-900/95 to-amber-950/95 border-b border-amber-500/50 px-3 sm:px-4 py-2 text-slate-200 text-xs font-mono shadow-xl relative z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-600/30 border border-amber-500/60 text-amber-400 shrink-0">
              <Smartphone className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <span className="font-bold text-amber-300 block sm:inline">
                {isEn ? 'INSTALL PROGRESSIVE WEB APP (PWA):' : 'UYGULAMAYI TELEFONA / MASAÜSTÜNE YÜKLE (PWA):'}
              </span>{' '}
              <span className="text-[11px] text-slate-300 hidden md:inline">
                {isEn
                  ? 'Run full-screen, offline-ready, without browser URL bar.'
                  : 'Tarayıcı çubuğu olmadan tam ekran, internet olmadan çevrimdışı oynayın.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEn ? 'Install App' : 'Hemen Yükle'}</span>
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title={isEn ? 'Dismiss' : 'Kapat'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Installation Instruction Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-sm w-full p-5 text-slate-100 shadow-2xl relative font-sans">
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-6 h-6 text-amber-400" />
              <h3 className="font-bold text-base text-amber-300">
                {isEn ? 'Install on iOS / Safari' : 'iOS / Safari Kurulum Rehberi'}
              </h3>
            </div>

            <p className="text-xs text-slate-300 mb-4 font-mono leading-relaxed">
              {isEn
                ? 'To install this application on your iPhone / iPad home screen:'
                : 'Devlet Aklı simülasyonunu iPhone / iPad ana ekranınıza eklemek için:'}
            </p>

            <ol className="space-y-3 text-xs text-slate-200 font-mono">
              <li className="flex items-start gap-2.5 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <Share2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>1.</strong> {isEn ? 'Tap the Safari' : 'Safari alt menüsündeki'}{' '}
                  <strong className="text-blue-400">{isEn ? 'Share' : 'Paylaş (Share)'}</strong>{' '}
                  {isEn ? 'button.' : 'simgesine dokunun.'}
                </span>
              </li>

              <li className="flex items-start gap-2.5 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <PlusSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>2.</strong> {isEn ? 'Scroll down and tap' : 'Aşağı kaydırarak'}{' '}
                  <strong className="text-emerald-400">
                    {isEn ? 'Add to Home Screen' : 'Ana Ekrana Ekle'}
                  </strong>{' '}
                  {isEn ? '.' : 'seçeneğini seçin.'}
                </span>
              </li>

              <li className="flex items-start gap-2.5 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>3.</strong> {isEn ? 'Tap' : 'Sağ üstteki'}{' '}
                  <strong className="text-amber-400">{isEn ? 'Add' : 'Ekle'}</strong>{' '}
                  {isEn ? 'in the top-right corner to complete.' : 'butonuna basın.'}
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full mt-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs"
            >
              {isEn ? 'Got it' : 'Anladım'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
