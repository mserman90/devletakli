import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Shield, BookOpen, Scale, Lock, Play, Activity, Cpu, CheckCircle2, AlertOctagon, HelpCircle, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';
import { DisclaimerModal } from './DisclaimerModal';
import { soundEngine } from '../utils/soundEngine';

export const HeroScreen: React.FC = () => {
  const { hasAcceptedLegalTerms, setHasAcceptedLegalTerms, startGame } = useGameStore();
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleToggleAgreement = () => {
    soundEngine.playUI('SELECT');
    setHasAcceptedLegalTerms(!hasAcceptedLegalTerms);
  };

  const handleStart = () => {
    if (!hasAcceptedLegalTerms) return;
    startGame();
  };

  const handleOpenKnowledgeBase = () => {
    soundEngine.playUI('SELECT');
    setIsKnowledgeBaseOpen(true);
  };

  const handleOpenDisclaimer = () => {
    soundEngine.playUI('SELECT');
    setIsDisclaimerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* Visual Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="relative z-10 px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-600 text-slate-950 rounded-xl shadow-lg shadow-emerald-950/50">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold tracking-widest text-base text-slate-100 flex items-center gap-2 font-mono">
              DEVLET AKLI
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/40">
                v2.5 PROD
              </span>
            </span>
            <span className="text-xs text-slate-400 block">Siyasi Strateji &amp; Müesses Nizam Simülasyonu</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="hero-btn-kodleks"
            onClick={handleOpenKnowledgeBase}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">BİLGİ BANKASI / KODLEKS</span>
            <span className="sm:hidden">KODLEKS</span>
          </button>

          <button
            id="hero-btn-disclaimer"
            onClick={handleOpenDisclaimer}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-600/50 text-amber-400 transition-all shadow-sm"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">YASAL UYARI</span>
          </button>
        </div>
      </header>

      {/* Hero Central Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-14 flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SİMÜLASYON MOTORU SENKRONİZE &amp; HAZIR</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 max-w-4xl leading-tight mb-4">
          GERÇEK İKTİDAR KİMİN ELİNDE? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
            MÜESSES NİZAM SİMÜLASYONU
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 max-w-2xl mb-8 leading-relaxed font-sans">
          Geleneksel siyasetin sahte ikiliklerini aşın. Partinizi ulusal vesayet odaklarının ve küresel finans ağlarının tuzaklarına düşürmeden <strong>tam bağımsız bir halk hareketine</strong> dönüştürün.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-left mb-10">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="p-2 bg-emerald-950 text-emerald-400 rounded-lg w-fit mb-3 border border-emerald-800/60">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 font-mono mb-1">6-Boyutlu Durum Engine</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Temiz Para, Kirli Para, Parti İçi Demokrasi, Gölge Bürokrasi, Overton Hegemonyası ve Kur Dağınıklığı kaynak matrisi.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="p-2 bg-amber-950 text-amber-400 rounded-lg w-fit mb-3 border border-amber-800/60">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 font-mono mb-1">Tehdit &amp; Sabotaj AI</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Robert Michels ve Thomas Friedman modellerine dayalı otonom krizler ve acil durum sabotaj müdahaleleri.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="p-2 bg-purple-950 text-purple-400 rounded-lg w-fit mb-3 border border-purple-800/60">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 font-mono mb-1">Kodleks Teorik Külliyat</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Weber, Mills ve Kopenhag Okulu akademisine dayanan rehber, matematiksel denklemler ve akademik kaynakça.
            </p>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer & Action Panel */}
        <div className="w-full max-w-2xl bg-slate-900/90 border border-amber-600/40 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md space-y-4">
          
          <div className="flex items-start gap-3 text-left bg-amber-950/40 p-3.5 rounded-xl border border-amber-800/60">
            <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-normal">
              <strong>Yasal Zorunluluk &amp; Kullanım Koşulu:</strong> Bu yazılım akademik bir kurgusal oyundur. Oyundaki kurumlar, kararlar ve istihbarat akışları tamamen sanal algoritmalardan ibarettir. Gerçek kişi ve kurumlarla ilgisi yoktur.
            </div>
          </div>

          {/* Agreement Checkbox */}
          <label
            onClick={handleToggleAgreement}
            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all text-left ${
              hasAcceptedLegalTerms
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all border ${
              hasAcceptedLegalTerms
                ? 'bg-emerald-600 border-emerald-400 text-slate-950'
                : 'bg-slate-800 border-slate-600'
            }`}>
              {hasAcceptedLegalTerms && <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[3]" />}
            </div>
            <span className="text-xs md:text-sm font-medium leading-snug">
              <strong>Yasal Uyarıyı, Kurgusal Nitelik Beyanını ve Sorumluluk Sınırlarını</strong> okudum, anladım ve kayıtsız şartsız kabul ediyorum.
            </span>
          </label>

          {/* Action CTA Button */}
          <div className="pt-2">
            <button
              id="hero-btn-start-game"
              onClick={handleStart}
              disabled={!hasAcceptedLegalTerms}
              className={`w-full py-4 px-6 rounded-xl font-bold font-mono text-sm md:text-base transition-all flex items-center justify-center gap-3 ${
                hasAcceptedLegalTerms
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-80'
              }`}
            >
              {hasAcceptedLegalTerms ? (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <span>SİMÜLASYONU BAŞLAT // MAKAMA GEÇ</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-slate-500" />
                  <span>SİMÜLASYONU BAŞLATMAK İÇİN YASAL UYARIYI ONAYLAYIN</span>
                </>
              )}
            </button>

            {!hasAcceptedLegalTerms && (
              <p className="text-[11px] text-amber-400/90 font-mono mt-2 text-center">
                * Oyuna başlayabilmek için yukarıdaki yasal onay kutusunu işaretlemelisiniz.
              </p>
            )}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 max-w-7xl mx-auto w-full border-t border-slate-800/80 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        <span>© 2026 DEVLET AKLI SİMÜLASYONU // TÜM HAKLARI SAKLIDIR</span>
        <div className="flex items-center gap-4">
          <button onClick={handleOpenKnowledgeBase} className="hover:text-emerald-400 underline transition-all">
            Kodleks El Kitabı
          </button>
          <button onClick={handleOpenDisclaimer} className="hover:text-amber-400 underline transition-all">
            Yasal Uyarı Metni
          </button>
        </div>
      </footer>

      {/* Modals */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
      />

      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

    </div>
  );
};
