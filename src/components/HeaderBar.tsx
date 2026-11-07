import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  Shield,
  Volume2,
  VolumeX,
  RotateCcw,
  Activity,
  Award,
  BookOpen,
  Scale,
  Home,
  Languages,
  History,
  Users,
  FileText,
  Save,
  Radio,
  Sparkles,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
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

  return (
    <>
      <header className="bg-amber-950/40 border-b-2 border-amber-900/60 text-slate-100 px-3 sm:px-4 py-2.5 sm:py-3 shadow-2xl select-none relative z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Executive Brass Nameplate Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 text-center sm:text-left">
            <div
              className={`p-2 sm:p-2.5 rounded-xl border shadow-md shrink-0 ${
                isInterruptActive
                  ? 'bg-red-900 border-red-500 text-white animate-pulse'
                  : 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-amber-400 text-slate-950'
              }`}
            >
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                  {isEn ? 'NATIONAL PARLIAMENT // CHAIR OFFICE' : 'ULUSAL PARLAMENTO // GENEL BAŞKANLIK MAKAMI'}
                </span>
                <Tooltip code="PROD" position="bottom" customTitle="DEVLET AKLI PROD v3.0">
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono border border-amber-600/50 flex items-center gap-1 font-bold">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" /> v3.0 {language}
                  </span>
                </Tooltip>
              </div>
              <h1 className="text-xs sm:text-sm md:text-base font-black tracking-wide text-amber-100 font-serif">
                {isEn ? 'ESTABLISHMENT STRATEGY & COMMAND DESK' : 'MÜESSES NİZAM STRATEJİ VE SEVK MASASI'}
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
                {isEn ? (
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

          {/* Action Hub Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            
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
                className="h-9 sm:h-10 px-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 border border-amber-500/60 text-amber-300 hover:text-amber-100 hover:border-amber-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono text-xs font-bold relative"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{isEn ? 'Cabinet' : 'Kabine'}</span>
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
                className="h-9 sm:h-10 px-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 border border-red-500/60 text-red-300 hover:text-red-100 hover:border-red-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono text-xs font-bold relative"
              >
                <FileText className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">{isEn ? 'Decrees' : 'KHK'}</span>
                {readyDecreesCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                )}
              </button>
            </Tooltip>

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
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-purple-500/60 text-purple-400 hover:text-purple-200 hover:border-purple-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-indigo-500/60 text-indigo-400 hover:text-indigo-200 hover:border-indigo-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-emerald-600/60 text-emerald-400 hover:text-emerald-200 hover:border-emerald-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
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
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 ${
                  isAmbientPlaying
                    ? 'bg-slate-900 border-amber-400 text-amber-300 shadow-amber-900/50'
                    : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
              >
                <Radio className={`w-4 h-4 sm:w-5 sm:h-5 ${isAmbientPlaying ? 'animate-pulse text-amber-400' : ''}`} />
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
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            {/* Dil Değiştir (TR / EN) */}
            <Tooltip code="LANG" position="bottom" customTitle={t.langToggleTitle} customDesc={t.langToggleDesc}>
              <button
                id="btn-toggle-language"
                onClick={toggleLanguage}
                className="h-9 sm:h-10 px-2.5 flex items-center justify-center gap-1 rounded-xl bg-slate-900 border border-blue-500/60 text-blue-400 hover:text-blue-200 hover:border-blue-400 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 font-mono font-bold text-xs"
              >
                <Languages className="w-4 h-4 text-blue-400" />
                <span>{language === 'TR' ? 'EN' : 'TR'}</span>
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
              >
                {isSoundMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </Tooltip>

            {/* Giriş / Hero Ekranı */}
            <Tooltip code="HOME" position="bottom" customTitle={t.homeTooltipTitle} customDesc={t.homeTooltipDesc}>
              <button
                id="btn-return-hero"
                onClick={returnToHero}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-600/60 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            {/* Sıfırla */}
            <Tooltip code="RESET" position="bottom" customTitle={t.resetTitle} customDesc={t.resetDesc}>
              <button
                id="btn-reset-game"
                onClick={handleReset}
                disabled={isGameOver}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-600/60 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-md shrink-0"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </header>

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
