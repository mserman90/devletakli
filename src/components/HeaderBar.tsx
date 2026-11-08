import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  Shield,
  Volume2,
  VolumeX,
  RotateCcw,
  Activity,
  Award,
  BookOpen,
  Home,
  Languages,
  History,
  Users,
  FileText,
  Save,
  Radio,
  Sparkles,
  Menu,
  X,
  Smartphone,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { pwaManager } from '../utils/pwaManager';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';
import { DisclaimerModal } from './DisclaimerModal';
import { HistoricalScenariosModal } from './HistoricalScenariosModal';
import { CabinetModal } from './CabinetModal';
import { DecreesModal } from './DecreesModal';
import { PastRunsModal } from './PastRunsModal';
import { SaveLoadModal } from './SaveLoadModal';
import { Tooltip } from './Tooltip';
import { UI_TRANSLATIONS } from '../utils/translations';

export const HeaderBar: React.FC = () => {
  const {
    turn,
    phase,
    isSoundMuted,
    isAmbientPlaying,
    toggleSound,
    toggleAmbient,
    resetGame,
    isInterruptActive,
    isGameOver,
    returnToHero,
    language,
    toggleLanguage,
    advisors,
    decrees,
  } = useGameStore();

  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isHistoricalModalOpen, setIsHistoricalModalOpen] = useState(false);
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [isDecreesOpen, setIsDecreesOpen] = useState(false);
  const [isPastRunsOpen, setIsPastRunsOpen] = useState(false);
  const [isSaveLoadOpen, setIsSaveLoadOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canInstallPWA, setCanInstallPWA] = useState(false);

  useEffect(() => {
    return pwaManager.subscribeInstall((installable) => {
      setCanInstallPWA(installable);
    });
  }, []);

  const t = UI_TRANSLATIONS[language].header;
  const isEn = language === 'EN';

  const readyAdvisorsCount = advisors.filter((a) => a.currentCooldown === 0).length;
  const readyDecreesCount = decrees.filter((d) => d.currentCooldown === 0).length;

  const handleReset = () => {
    soundEngine.playUI('SELECT');
    const msg = isEn
      ? 'Are you sure you want to reset the simulation?'
      : 'Simülasyonu sıfırlamak istediğinizden emin misiniz?';
    if (window.confirm(msg)) {
      resetGame();
      setIsMobileMenuOpen(false);
    }
  };

  const handleToggleSound = () => {
    toggleSound();
    if (isSoundMuted) {
      soundEngine.playUI('SELECT');
    }
  };

  const handleToggleAmbient = () => {
    toggleAmbient();
  };

  const handleInstallPWA = async () => {
    soundEngine.playUI('SELECT');
    await pwaManager.promptInstall();
  };

  return (
    <>
      <header className="bg-amber-950/40 border-b-2 border-amber-900/60 text-slate-100 px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-2xl select-none relative z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Executive Brass Nameplate Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div
              className={`p-1.5 sm:p-2.5 rounded-xl border shadow-md shrink-0 transition-transform ${
                isInterruptActive
                  ? 'bg-red-900 border-red-500 text-white animate-pulse'
                  : 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-amber-400 text-slate-950'
              }`}
            >
              <Shield className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[9px] sm:text-xs uppercase font-mono tracking-widest text-amber-400 font-bold truncate max-w-[140px] sm:max-w-none">
                  {isEn ? 'CHAIR OFFICE' : 'GENEL BAŞKANLIK'}
                </span>
                <span className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono border border-amber-600/50 flex items-center gap-0.5 font-bold">
                  <Sparkles className="w-2 h-2 text-amber-400" /> v3.0
                </span>
              </div>
              <h1 className="text-[11px] sm:text-sm md:text-base font-black tracking-wide text-amber-100 font-serif leading-tight">
                {isEn ? 'ESTABLISHMENT DESK' : 'DEVLET AKLI'}
              </h1>
            </div>
          </div>

          {/* Quick Turn & Phase Badges (visible across all screen sizes) */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            <div className="bg-amber-950/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-amber-700/60 shadow-inner flex items-center gap-1 text-amber-200">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
              <span className="text-amber-400/80 text-[10px] sm:text-xs hidden xs:inline">{t.turn}:</span>
              <span className="text-emerald-400 font-bold text-xs sm:text-sm">#{turn}</span>
            </div>

            <div className="bg-amber-950/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-amber-700/60 shadow-inner flex items-center gap-1 text-amber-200">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span className="text-amber-400/80 text-[10px] sm:text-xs">{t.phase} {phase}</span>
            </div>

            {isInterruptActive && (
              <div className="bg-red-950/90 text-red-200 px-2 py-1 rounded-lg border border-red-500 animate-pulse font-bold flex items-center gap-1 shadow-lg text-[10px] sm:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="hidden sm:inline">{t.alarm}</span>
              </div>
            )}
          </div>

          {/* Desktop Executive Buttons (hidden on < lg screens) */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2">
            
            {/* Gölge Kabine ve Danışmanlar */}
            <Tooltip
              code="CABINET"
              position="bottom"
              customTitle={isEn ? 'Shadow Cabinet & Advisors' : 'Gölge Kabine ve Danışmanlar'}
              customDesc={isEn ? 'Consult 4 strategic advisors and deploy emergency doctrines' : '4 stratejik danışmanı yönetin ve acil durum doktrinlerini devreye sokun'}
            >
              <button
                id="btn-open-cabinet"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsCabinetOpen(true);
                }}
                className="h-9 px-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 border border-amber-500/60 text-amber-300 hover:text-amber-100 hover:border-amber-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono text-xs font-bold relative"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>{isEn ? 'Cabinet' : 'Kabine'}</span>
                {readyAdvisorsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            </Tooltip>

            {/* Olağanüstü Kararnameler (KHK) */}
            <Tooltip
              code="DECREES"
              position="bottom"
              customTitle={isEn ? 'Emergency Decrees (KHK)' : 'Olağanüstü Kararnameler (KHK)'}
              customDesc={isEn ? 'Enact executive decrees with direct statecraft trade-offs' : 'Olağanüstü kamusal tasarruf, denetim ve halk oylaması kararnameleri imzalayın'}
            >
              <button
                id="btn-open-decrees"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsDecreesOpen(true);
                }}
                className="h-9 px-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 border border-red-500/60 text-red-300 hover:text-red-100 hover:border-red-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono text-xs font-bold relative"
              >
                <FileText className="w-4 h-4 text-red-400" />
                <span>{isEn ? 'Decrees' : 'KHK'}</span>
                {readyDecreesCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                )}
              </button>
            </Tooltip>

            {/* PWA Install Button if available */}
            {canInstallPWA && (
              <Tooltip code="PWA" position="bottom" customTitle={isEn ? 'Install PWA' : 'Uygulamayı Yükle'}>
                <button
                  onClick={handleInstallPWA}
                  className="h-9 px-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 hover:from-amber-500 hover:to-amber-600 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono text-xs font-bold"
                >
                  <Download className="w-4 h-4" />
                  <span>{isEn ? 'Install' : 'Yükle'}</span>
                </button>
              </Tooltip>
            )}

            {/* Tarihsel Senaryolar */}
            <Tooltip
              code="HIST"
              position="bottom"
              customTitle={isEn ? 'Historical Scenarios' : 'Tarihsel Senaryolar'}
              customDesc={isEn ? 'Load 1970s, 1980s, 1990s, 2001 or custom scenarios' : '1970, 1980, 1990, 2001 veya özel kriz senaryolarını yükleyin'}
            >
              <button
                id="btn-open-historical"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsHistoricalModalOpen(true);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-purple-500/60 text-purple-400 hover:text-purple-200 hover:border-purple-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <History className="w-4 h-4" />
              </button>
            </Tooltip>

            {/* Geçmiş Dönemler Sicili */}
            <Tooltip
              code="ARCHIVE"
              position="bottom"
              customTitle={isEn ? 'Government Archives' : 'İktidar Sicili & Arşiv'}
              customDesc={isEn ? 'View past governance records and scores' : 'Önceki iktidar dönemleri sicili ve performans karnesini görüntüleyin'}
            >
              <button
                id="btn-open-past-runs"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsPastRunsOpen(true);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-indigo-500/60 text-indigo-400 hover:text-indigo-200 hover:border-indigo-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Award className="w-4 h-4" />
              </button>
            </Tooltip>

            {/* Kaydet ve Yükle */}
            <Tooltip
              code="SAVE"
              position="bottom"
              customTitle={isEn ? 'Save / Load / Export' : 'Kayıt ve Hafıza'}
              customDesc={isEn ? 'Persist game state or transfer via JSON' : 'Simülasyon durumunu kaydet, yükle veya JSON olarak aktar'}
            >
              <button
                id="btn-open-saveload"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsSaveLoadOpen(true);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-emerald-600/60 text-emerald-400 hover:text-emerald-200 hover:border-emerald-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Save className="w-4 h-4" />
              </button>
            </Tooltip>

            {/* Ambiyans Sesi Toggle */}
            <Tooltip
              code="AMBIENT"
              position="bottom"
              customTitle={isEn ? 'Tactical Ambience Drone' : 'Taktik Ambiyans Sesi'}
              customDesc={isEn ? 'Toggle background command room drone synthesizer' : 'Sevk masası arka plan düşük frekanslı synthesizer ambiyansını aç/kapat'}
            >
              <button
                id="btn-toggle-ambient"
                onClick={handleToggleAmbient}
                className={`w-9 h-9 flex items-center justify-center rounded-xl border hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 ${
                  isAmbientPlaying
                    ? 'bg-slate-900 border-amber-400 text-amber-300 shadow-amber-900/50'
                    : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
              >
                <Radio className={`w-4 h-4 ${isAmbientPlaying ? 'animate-pulse text-amber-400' : ''}`} />
              </button>
            </Tooltip>

            {/* Kodleks / Bilgi Bankası */}
            <Tooltip code="KODLEKS" position="bottom" customTitle={t.kodleksTooltipTitle} customDesc={t.kodleksTooltipDesc}>
              <button
                id="btn-open-kodleks"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsKnowledgeBaseOpen(true);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </Tooltip>

            {/* Dil Değiştir (TR / EN) */}
            <Tooltip code="LANG" position="bottom" customTitle={t.langToggleTitle} customDesc={t.langToggleDesc}>
              <button
                id="btn-toggle-language"
                onClick={toggleLanguage}
                className="h-9 px-2 flex items-center justify-center gap-1 rounded-xl bg-slate-900 border border-blue-500/60 text-blue-400 hover:text-blue-200 hover:border-blue-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono font-bold text-xs"
              >
                <Languages className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'TR' ? 'EN' : 'TR'}</span>
              </button>
            </Tooltip>

            {/* Ses Kapat/Aç */}
            <Tooltip code="SOUND" position="bottom" customTitle={isSoundMuted ? t.soundOff : t.soundOn} customDesc={t.soundDesc}>
              <button
                id="btn-sound-toggle"
                onClick={handleToggleSound}
                className={`w-9 h-9 flex items-center justify-center rounded-xl border hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 ${
                  isSoundMuted
                    ? 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                    : 'bg-slate-900 border-teal-500/60 text-teal-400 hover:border-teal-400 hover:text-teal-200 hover:bg-slate-800'
                }`}
              >
                {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </Tooltip>

            {/* Giriş / Hero Ekranı */}
            <Tooltip code="HOME" position="bottom" customTitle={t.homeTooltipTitle} customDesc={t.homeTooltipDesc}>
              <button
                id="btn-return-hero"
                onClick={returnToHero}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-600/60 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Home className="w-4 h-4" />
              </button>
            </Tooltip>

            {/* Sıfırla */}
            <Tooltip code="RESET" position="bottom" customTitle={t.resetTitle} customDesc={t.resetDesc}>
              <button
                id="btn-reset-game"
                onClick={handleReset}
                disabled={isGameOver}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-600/60 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-md shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>

          {/* Mobile Right Bar: Fast Action & Hamburger Menu (visible on < lg) */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Quick Cabinet */}
            <button
              onClick={() => {
                soundEngine.playUI('SELECT');
                setIsCabinetOpen(true);
              }}
              className="h-8 px-2 rounded-lg bg-slate-900 border border-amber-500/60 text-amber-300 flex items-center gap-1 font-mono text-[11px] font-bold relative active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEn ? 'Cab' : 'Kabine'}</span>
              {readyAdvisorsCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Quick Decrees */}
            <button
              onClick={() => {
                soundEngine.playUI('SELECT');
                setIsDecreesOpen(true);
              }}
              className="h-8 px-2 rounded-lg bg-slate-900 border border-red-500/60 text-red-300 flex items-center gap-1 font-mono text-[11px] font-bold relative active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span>{isEn ? 'KHK' : 'KHK'}</span>
              {readyDecreesCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => {
                soundEngine.playUI('HOVER');
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-600/70 text-amber-200 flex items-center justify-center active:scale-95 shadow-md"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Over Action Drawer / Sheet */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 border-l border-amber-900/60 p-4 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm text-amber-200 font-mono">
                    {isEn ? 'EXECUTIVE SUITE' : 'MÜESSES MENÜ'}
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* PWA Mobile Prompt */}
              {canInstallPWA && (
                <button
                  onClick={() => {
                    handleInstallPWA();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mb-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{isEn ? 'Install App to Phone (PWA)' : 'Uygulamayı Telefona Yükle (PWA)'}</span>
                </button>
              )}

              {/* Grid of Navigation Items */}
              <div className="space-y-2 text-xs font-mono">
                <button
                  onClick={() => {
                    soundEngine.playUI('SELECT');
                    setIsCabinetOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-amber-300"
                >
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>{isEn ? 'Shadow Cabinet & Advisors' : 'Gölge Kabine & Danışmanlar'}</span>
                  </span>
                  {readyAdvisorsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-600 text-[10px]">
                      {readyAdvisorsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    soundEngine.playUI('SELECT');
                    setIsDecreesOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-red-300"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-red-400" />
                    <span>{isEn ? 'Emergency Decrees (KHK)' : 'Olağanüstü Kararnameler'}</span>
                  </span>
                  {readyDecreesCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-600 text-[10px]">
                      {readyDecreesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    soundEngine.playUI('SELECT');
                    setIsKnowledgeBaseOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center gap-2.5 text-slate-200"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Doctrine & Knowledge Base' : 'Bilgi Bankası & Kodleks'}</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playUI('SELECT');
                    setIsHistoricalModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center gap-2.5 text-purple-300"
                >
                  <History className="w-4 h-4 text-purple-400" />
                  <span>{isEn ? 'Historical Scenarios' : 'Tarihsel Senaryolar'}</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playUI('SELECT');
                    setIsSaveLoadOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center gap-2.5 text-emerald-300"
                >
                  <Save className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Save / Load Session' : 'Oturum Kaydet & Yükle'}</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playUI('SELECT');
                    setIsPastRunsOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center gap-2.5 text-indigo-300"
                >
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>{isEn ? 'Government Archives' : 'İktidar Sicili & Arşiv'}</span>
                </button>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <button
                    onClick={handleToggleSound}
                    className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-300"
                  >
                    <span className="flex items-center gap-2.5">
                      {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
                      <span>{isEn ? 'Sound Effects' : 'Ses Efektleri'}</span>
                    </span>
                    <span className={`text-[10px] font-bold ${isSoundMuted ? 'text-slate-500' : 'text-teal-400'}`}>
                      {isSoundMuted ? (isEn ? 'MUTED' : 'KAPALI') : (isEn ? 'ON' : 'AÇIK')}
                    </span>
                  </button>

                  <button
                    onClick={handleToggleAmbient}
                    className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-300"
                  >
                    <span className="flex items-center gap-2.5">
                      <Radio className={`w-4 h-4 ${isAmbientPlaying ? 'text-amber-400 animate-pulse' : ''}`} />
                      <span>{isEn ? 'Command Ambience Drone' : 'Taktik Ambiyans Sesi'}</span>
                    </span>
                    <span className={`text-[10px] font-bold ${isAmbientPlaying ? 'text-amber-400' : 'text-slate-500'}`}>
                      {isAmbientPlaying ? (isEn ? 'ON' : 'AÇIK') : (isEn ? 'OFF' : 'KAPALI')}
                    </span>
                  </button>

                  <button
                    onClick={toggleLanguage}
                    className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-blue-300"
                  >
                    <span className="flex items-center gap-2.5">
                      <Languages className="w-4 h-4 text-blue-400" />
                      <span>{isEn ? 'Language / Dil' : 'Dil / Language'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-700">
                      {language}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Mobile Drawer */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  returnToHero();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 font-mono"
              >
                <Home className="w-4 h-4" />
                <span>{isEn ? 'Return to Home Screen' : 'Ana Ekrana Dön'}</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 font-bold text-xs flex items-center justify-center gap-2 font-mono"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isEn ? 'Reset Simulation' : 'Simülasyonu Sıfırla'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CabinetModal isOpen={isCabinetOpen} onClose={() => setIsCabinetOpen(false)} />
      <DecreesModal isOpen={isDecreesOpen} onClose={() => setIsDecreesOpen(false)} />
      <PastRunsModal isOpen={isPastRunsOpen} onClose={() => setIsPastRunsOpen(false)} />
      <SaveLoadModal isOpen={isSaveLoadOpen} onClose={() => setIsSaveLoadOpen(false)} />
      <KnowledgeBaseModal isOpen={isKnowledgeBaseOpen} onClose={() => setIsKnowledgeBaseOpen(false)} />
      <DisclaimerModal isOpen={isDisclaimerOpen} onClose={() => setIsDisclaimerOpen(false)} />
      <HistoricalScenariosModal isOpen={isHistoricalModalOpen} onClose={() => setIsHistoricalModalOpen(false)} />
    </>
  );
};
