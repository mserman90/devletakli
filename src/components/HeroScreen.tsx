import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Shield, BookOpen, Scale, Lock, Play, Activity, Cpu, CheckCircle2, AlertOctagon, HelpCircle, Award, Sparkles, ShieldCheck, History, Languages, Smartphone, Download } from 'lucide-react';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';
import { DisclaimerModal } from './DisclaimerModal';
import { HistoricalScenariosModal } from './HistoricalScenariosModal';
import { PWAInstallBanner } from './PWAInstallBanner';
import { soundEngine } from '../utils/soundEngine';
import { pwaManager } from '../utils/pwaManager';
import { Tooltip } from './Tooltip';

export const HeroScreen: React.FC = () => {
  const { hasAcceptedLegalTerms, setHasAcceptedLegalTerms, startGame, language, toggleLanguage } = useGameStore();
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isHistoricalOpen, setIsHistoricalOpen] = useState(false);
  const [canInstallPWA, setCanInstallPWA] = useState(false);

  useEffect(() => {
    return pwaManager.subscribeInstall((installable) => {
      setCanInstallPWA(installable);
    });
  }, []);

  const isEn = language === 'EN';

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

  const handleOpenHistorical = () => {
    soundEngine.playUI('SELECT');
    setIsHistoricalOpen(true);
  };

  const handleInstallPWA = async () => {
    soundEngine.playUI('SELECT');
    await pwaManager.promptInstall();
  };

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* Visual Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* PWA Floating Banner */}
      <PWAInstallBanner />

      {/* Top Brand Bar */}
      <header className="relative z-10 px-3 sm:px-6 py-3.5 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="p-2 sm:p-2.5 bg-emerald-600 text-slate-950 rounded-xl shadow-lg shadow-emerald-950/50">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold tracking-widest text-sm sm:text-base text-slate-100 flex items-center gap-1.5 sm:gap-2 font-mono">
              DEVLET AKLI
              <Tooltip code="PROD">
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <Sparkles className="w-2 sm:w-2.5 h-2 sm:h-2.5" /> v3.0 PROD
                </span>
              </Tooltip>
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 block font-serif">
              {isEn ? 'Political Strategy & Deep Statecraft Simulation' : 'Siyasi Strateji & Müesses Nizam Simülasyonu'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
          {canInstallPWA && (
            <button
              onClick={handleInstallPWA}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 hover:from-amber-500 hover:to-amber-600 transition-all shadow-md font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEn ? 'PWA INSTALL' : 'PWA YÜKLE'}</span>
            </button>
          )}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 border border-blue-500/60 text-blue-300 transition-all shadow-sm font-mono"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isEn ? 'TR' : 'EN'}</span>
          </button>

          <button
            id="hero-btn-historical"
            onClick={handleOpenHistorical}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 border border-purple-500/60 text-purple-300 transition-all shadow-sm"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{isEn ? 'HISTORICAL SCENARIOS' : 'TARİHSEL SENARYOLAR'}</span>
            <span className="sm:hidden">{isEn ? 'SCENARIO' : 'SENARYO'}</span>
          </button>

          <button
            id="hero-btn-kodleks"
            onClick={handleOpenKnowledgeBase}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isEn ? 'KODLEKS MANUAL' : 'BİLGİ BANKASI / KODLEKS'}</span>
            <span className="sm:hidden">KODLEKS</span>
          </button>

          <button
            id="hero-btn-disclaimer"
            onClick={handleOpenDisclaimer}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-600/50 text-amber-400 transition-all shadow-sm"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isEn ? 'LEGAL' : 'YASAL UYARI'}</span>
          </button>
        </div>
      </header>

      {/* Hero Central Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-14 flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] sm:text-xs font-mono mb-4 sm:mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isEn ? 'SIMULATION CORE v3.0 SYNCHRONIZED & READY' : 'SİMÜLASYON MOTORU v3.0 SENKRONİZE & HAZIR'}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 max-w-4xl leading-tight mb-3 sm:mb-4">
          {isEn ? 'WHO HOLDS THE REAL POWER?' : 'GERÇEK İKTİDAR KİMİN ELİNDE?'} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
            {isEn ? 'STATE REASON & POWER SIMULATION' : 'MÜESSES NİZAM SİMÜLASYONU'}
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mb-6 sm:mb-8 leading-relaxed font-sans px-2">
          {isEn
            ? 'Transcend the false dichotomies of mainstream politics. Guide your party against deep bureaucratic tutelage and global financial traps into a fully sovereign popular movement.'
            : 'Geleneksel siyasetin sahte ikiliklerini aşın. Partinizi ulusal vesayet odaklarının ve küresel finans ağlarının tuzaklarına düşürmeden tam bağımsız bir halk hareketine dönüştürün.'}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl text-left mb-6 sm:mb-10">
          <div className="p-3.5 sm:p-4 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="p-2 bg-emerald-950 text-emerald-400 rounded-lg w-fit mb-2 sm:mb-3 border border-emerald-800/60">
              <Cpu className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono mb-1">{isEn ? '6D Tactical Vector & Radar' : '6-Boyutlu Durum & Radar'}</h3>
            <div className="text-[11px] sm:text-xs text-slate-400 leading-relaxed space-x-1">
              <Tooltip code="TP"><span className="text-emerald-400 font-bold hover:underline">TP</span></Tooltip>,{' '}
              <Tooltip code="KP"><span className="text-red-400 font-bold hover:underline">KP</span></Tooltip>,{' '}
              <Tooltip code="PID"><span className="text-blue-400 font-bold hover:underline">PID</span></Tooltip>,{' '}
              <Tooltip code="BÜROKRATİK NÜFUZ"><span className="text-purple-400 font-bold hover:underline">GB</span></Tooltip>,{' '}
              <Tooltip code="KAMUOYU HEGEMONYASI"><span className="text-amber-400 font-bold hover:underline">OH</span></Tooltip> ve{' '}
              <Tooltip code="KD"><span className="text-teal-400 font-bold hover:underline">KD</span></Tooltip>{' '}
              {isEn ? 'matrix with live tactical radar.' : 'kaynak matrisi ve taktik radar.'}
            </div>
          </div>

          <div className="p-3.5 sm:p-4 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="p-2 bg-amber-950 text-amber-400 rounded-lg w-fit mb-2 sm:mb-3 border border-amber-800/60">
              <Activity className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono mb-1">{isEn ? 'Shadow Cabinet & Decrees' : 'Gölge Kabine & KHK Masası'}</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-normal">
              {isEn
                ? 'Appoint 4 strategic advisors with unique doctrines and enact emergency executive orders.'
                : '4 stratejik danışmanla pasif kalkanlar kurun ve kriz anlarında olağanüstü kararnameler imzalayın.'}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 bg-slate-900/80 rounded-xl border border-slate-800 backdrop-blur-sm sm:col-span-2 md:col-span-1">
            <div className="p-2 bg-purple-950 text-purple-400 rounded-lg w-fit mb-2 sm:mb-3 border border-purple-800/60">
              <BookOpen className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono mb-1">{isEn ? 'Deep Historical Scenarios' : 'Zengin Tarihsel Senaryolar'}</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-normal">
              {isEn
                ? 'Relive pivotal crises: 1970s oil shocks, 1980s post-coup tutelage, 1990s bank scandals, and 2001 currency collapse.'
                : '1970\'ler petrol şoku, 1980\'ler vesayet restorasyonu, 1990\'lar banka krizleri ve 2001 devalüasyonunu yönetin.'}
            </p>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer & Action Panel */}
        <div className="w-full max-w-2xl bg-slate-900/90 border border-amber-600/40 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-3 sm:space-y-4">
          
          <div className="flex items-start gap-2.5 sm:gap-3 text-left bg-amber-950/40 p-3 sm:p-3.5 rounded-xl border border-amber-800/60">
            <AlertOctagon className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] sm:text-xs text-amber-200/90 leading-normal font-sans">
              <strong>{isEn ? 'Legal Notice & Terms:' : 'Yasal Zorunluluk & Kullanım Koşulu:'}</strong>{' '}
              {isEn
                ? 'This software is an academic fictional simulation. Entities, directives, and scenarios are purely algorithmic and theoretical.'
                : 'Bu yazılım akademik bir kurgusal oyundur. Oyundaki kurumlar, kararlar ve istihbarat akışları tamamen sanal algoritmalardan ibarettir. Gerçek kişi ve kurumlarla ilgisi yoktur.'}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <label
            onClick={handleToggleAgreement}
            className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all text-left ${
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
            <span className="text-xs sm:text-sm font-medium leading-snug">
              <strong>{isEn ? 'I have read and unconditionally accept the Legal Disclaimer and Fictional Framework.' : 'Yasal Uyarıyı, Kurgusal Nitelik Beyanını ve Sorumluluk Sınırlarını'}</strong>{' '}
              {!isEn && 'okudum, anladım ve kayıtsız şartsız kabul ediyorum.'}
            </span>
          </label>

          {/* Action CTA Buttons */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <button
              id="hero-btn-start-game"
              onClick={handleStart}
              disabled={!hasAcceptedLegalTerms}
              className={`flex-1 py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl font-bold font-mono text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                hasAcceptedLegalTerms
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-80'
              }`}
            >
              {hasAcceptedLegalTerms ? (
                <>
                  <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-300" />
                  <span>{isEn ? 'START SIMULATION' : 'SİMÜLASYONU BAŞLAT'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 sm:w-5 h-4 sm:h-5 text-slate-500" />
                  <span>{isEn ? 'START (REQUIRES LEGAL ACCEPTANCE)' : 'SİMÜLASYONU BAŞLAT (YASAL ONAY GEREKİR)'}</span>
                </>
              )}
            </button>

            <button
              id="hero-btn-historical-cta"
              onClick={handleOpenHistorical}
              className="py-3.5 sm:py-4 px-4 sm:px-5 bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 border border-purple-500/60 rounded-xl font-bold font-mono text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-950/40 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              <History className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400" />
              <span>{isEn ? 'HISTORICAL SCENARIOS' : 'TARİHSEL SENARYO SEÇ'}</span>
            </button>
          </div>

          {!hasAcceptedLegalTerms && (
            <p className="text-[10px] sm:text-[11px] text-amber-400/90 font-mono text-center">
              * {isEn ? 'You must tick the legal acknowledgment box above to enter.' : 'Oyuna doğrudan başlamak için yukarıdaki yasal onay kutusunu işaretlemelisiniz.'}
            </p>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-3.5 max-w-7xl mx-auto w-full border-t border-slate-800/80 text-[10px] sm:text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        <span>© 2026 DEVLET AKLI SİMÜLASYONU // TÜM HAKLARI SAKLIDIR</span>
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={handleOpenKnowledgeBase} className="hover:text-emerald-400 underline transition-all">
            {isEn ? 'Kodleks Manual' : 'Kodleks El Kitabı'}
          </button>
          <button onClick={handleOpenDisclaimer} className="hover:text-amber-400 underline transition-all">
            {isEn ? 'Legal Disclaimer' : 'Yasal Uyarı Metni'}
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

      <HistoricalScenariosModal
        isOpen={isHistoricalOpen}
        onClose={() => setIsHistoricalOpen(false)}
      />

    </div>
  );
};
