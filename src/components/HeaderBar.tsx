import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Shield, Volume2, VolumeX, RotateCcw, Activity, Award, BookOpen, Scale, Home, Languages, History } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';
import { DisclaimerModal } from './DisclaimerModal';
import { HistoricalScenariosModal } from './HistoricalScenariosModal';
import { Tooltip } from './Tooltip';
import { UI_TRANSLATIONS } from '../utils/translations';

export const HeaderBar: React.FC = () => {
  const { turn, phase, isSoundMuted, toggleSound, resetGame, isInterruptActive, isGameOver, returnToHero, language, toggleLanguage } = useGameStore();
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isHistoricalModalOpen, setIsHistoricalModalOpen] = useState(false);

  const t = UI_TRANSLATIONS[language].header;

  const handleReset = () => {
    soundEngine.playUI('SELECT');
    const msg = language === 'EN' ? 'Are you sure you want to reset the simulation?' : 'Simülasyonu sıfırlamak istediğinizden emin misiniz?';
    if (window.confirm(msg)) {
      resetGame();
    }
  };

  const handleToggleSound = () => {
    toggleSound();
    if (isSoundMuted) {
      soundEngine.playUI('SELECT');
    }
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
    <>
      <header className="bg-amber-950/40 border-b-2 border-amber-900/60 text-slate-100 px-3 sm:px-4 py-2.5 sm:py-3 shadow-2xl select-none relative z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Executive Brass Nameplate Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 text-center sm:text-left">
            <div className={`p-2 sm:p-2.5 rounded-xl border shadow-md shrink-0 ${
              isInterruptActive
                ? 'bg-red-900 border-red-500 text-white animate-pulse'
                : 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-amber-400 text-slate-950'
            }`}>
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                  {language === 'EN' ? 'NATIONAL PARLIAMENT // CHAIR OFFICE' : 'ULUSAL PARLAMENTO // GENEL BAŞKANLIK MAKAMI'}
                </span>
                <Tooltip code="PROD" position="bottom" customTitle="DEVLET AKLI PROD v2.5">
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono border border-amber-600/50">
                    v2.5 {language}
                  </span>
                </Tooltip>
              </div>
              <h1 className="text-xs sm:text-sm md:text-base font-black tracking-wide text-amber-100 font-serif">
                {language === 'EN' ? 'ESTABLISHMENT STRATEGY & COMMAND DESK' : 'MÜESSES NİZAM STRATEJİ VE SEVK MASASI'}
              </h1>
            </div>
          </div>

          {/* Desk Clock & Turn Brass Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <div className="bg-amber-950/80 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-amber-700/60 shadow-inner flex items-center gap-1.5 text-amber-200">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span className="text-amber-400/80 text-[11px] sm:text-xs">{t.turn}:</span>
              <span className="text-emerald-400 font-bold text-xs sm:text-sm">#{turn}</span>
            </div>

            <div className="bg-amber-950/80 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-amber-700/60 shadow-inner flex items-center gap-1.5 text-amber-200">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="text-amber-400/80 text-[11px] sm:text-xs">{t.phase} {phase}:</span>
              <span className="text-amber-300 font-semibold text-[11px] sm:text-xs">
                {language === 'EN' ? (
                  phase === 1 ? 'Grassroots Surge' :
                  phase === 2 ? 'Discourse Hegemony' :
                  phase === 3 ? 'Shadow Bureaucracy' : 'Sovereignty Trial'
                ) : (
                  phase === 1 ? 'Tabana İnme' :
                  phase === 2 ? 'Söylem Hegemonyası' :
                  phase === 3 ? 'Gölge Bürokrasi' : 'Egemenlik Sınavı'
                )}
              </span>
            </div>

            {isInterruptActive && (
              <div className="bg-red-950/90 text-red-200 px-2.5 py-1.5 rounded-lg border border-red-500 animate-pulse font-bold flex items-center gap-1.5 shadow-lg text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>{t.alarm}</span>
              </div>
            )}
          </div>

          {/* Standardized Icon Action Buttons */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {/* Dil Değiştir (TR / EN) */}
            <Tooltip code="LANG" position="bottom" customTitle={t.langToggleTitle} customDesc={t.langToggleDesc}>
              <button
                id="btn-toggle-language"
                onClick={toggleLanguage}
                className="h-9 sm:h-10 px-2.5 flex items-center justify-center gap-1 rounded-xl bg-slate-900 border border-blue-500/60 text-blue-400 hover:text-blue-200 hover:border-blue-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono font-bold text-xs"
                title={t.langToggleTitle}
                aria-label={t.langToggleTitle}
              >
                <Languages className="w-4 h-4 text-blue-400" />
                <span>{language === 'TR' ? 'EN' : 'TR'}</span>
              </button>
            </Tooltip>

            {/* Tarihsel Senaryolar */}
            <Tooltip code="HIST" position="bottom" customTitle={language === 'EN' ? 'Historical Scenarios' : 'Tarihsel Senaryolar'} customDesc={language === 'EN' ? 'Load specific decade starting state or custom political crisis' : 'Spesifik bir dönemi veya özel kriz senaryosunu yükleyin'}>
              <button
                id="btn-open-historical"
                onClick={() => {
                  soundEngine.playUI('SELECT');
                  setIsHistoricalModalOpen(true);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-purple-500/60 text-purple-400 hover:text-purple-200 hover:border-purple-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
                title={language === 'EN' ? 'Historical Scenarios' : 'Tarihsel Senaryolar'}
                aria-label={language === 'EN' ? 'Historical Scenarios' : 'Tarihsel Senaryolar'}
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            {/* Giriş / Hero Ekranı */}
            <Tooltip code="HOME" position="bottom" customTitle={t.homeTooltipTitle} customDesc={t.homeTooltipDesc}>
              <button
                id="btn-return-hero"
                onClick={returnToHero}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-amber-800/60 text-amber-400 hover:text-amber-200 hover:border-amber-500 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
                title={t.homeTooltipTitle}
                aria-label={t.homeTooltipTitle}
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            {/* Kodleks / Bilgi Bankası */}
            <Tooltip code="KODLEKS" position="bottom" customTitle={t.kodleksTooltipTitle} customDesc={t.kodleksTooltipDesc}>
              <button
                id="btn-open-kodleks"
                onClick={handleOpenKnowledgeBase}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-emerald-600/60 text-emerald-400 hover:text-emerald-200 hover:border-emerald-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
                title={t.kodleksTooltipTitle}
                aria-label={t.kodleksTooltipTitle}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            {/* Yasal Uyarı */}
            <Tooltip code="LEGAL" position="bottom" customTitle={t.disclaimerTooltipTitle} customDesc={t.disclaimerTooltipDesc}>
              <button
                id="btn-open-disclaimer"
                onClick={handleOpenDisclaimer}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-amber-600/60 text-amber-400 hover:text-amber-200 hover:border-amber-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
                title={t.disclaimerTooltipTitle}
                aria-label={t.disclaimerTooltipTitle}
              >
                <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            {/* Ses Kapat/Aç */}
            <Tooltip code="SOUND" position="bottom" customTitle={isSoundMuted ? t.soundOff : t.soundOn} customDesc={t.soundDesc}>
              <button
                id="btn-sound-toggle"
                onClick={handleToggleSound}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 ${
                  isSoundMuted
                    ? 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                    : 'bg-slate-900 border-teal-500/60 text-teal-400 hover:border-teal-400 hover:text-teal-200 hover:bg-slate-800'
                }`}
                title={isSoundMuted ? t.soundOff : t.soundOn}
                aria-label={isSoundMuted ? t.soundOff : t.soundOn}
              >
                {isSoundMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </Tooltip>

            {/* Sıfırla */}
            <Tooltip code="RESET" position="bottom" customTitle={t.resetTitle} customDesc={t.resetDesc}>
              <button
                id="btn-reset-game"
                onClick={handleReset}
                disabled={isGameOver}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-600/60 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-md shrink-0"
                title={t.resetTitle}
                aria-label={t.resetTitle}
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Knowledge Base & Kodleks Modal */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
      />

      {/* Yasal Uyarı & Sorumluluk Reddi Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      {/* Tarihsel Senaryolar Modal */}
      <HistoricalScenariosModal
        isOpen={isHistoricalModalOpen}
        onClose={() => setIsHistoricalModalOpen(false)}
      />
    </>
  );
};
