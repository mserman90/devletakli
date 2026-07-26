import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Shield, Volume2, VolumeX, RotateCcw, Activity, Award, BookOpen, Scale, Home } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';
import { DisclaimerModal } from './DisclaimerModal';

export const HeaderBar: React.FC = () => {
  const { turn, phase, isSoundMuted, toggleSound, resetGame, isInterruptActive, isGameOver, returnToHero } = useGameStore();
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleReset = () => {
    soundEngine.playUI('SELECT');
    if (window.confirm('Simülasyonu sıfırlamak istediğinizden emin misiniz?')) {
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
      <header className="bg-slate-900 border-b border-slate-800 text-slate-100 px-4 py-3 shadow-lg select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Title & Brand */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isInterruptActive ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 text-white'}`}>
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-slate-100 flex items-center gap-2">
                DEVLET AKLI <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono border border-emerald-500/30">v2.5 PROD</span>
              </h1>
              <p className="text-xs text-slate-400">Siyasi Strateji & Müesses Nizam Simülasyonu</p>
            </div>
          </div>

          {/* Tactical Status Badges */}
          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">TUR:</span>
              <span className="text-emerald-400 font-bold text-sm">{turn}</span>
            </div>

            <div className="bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">FAZ {phase}:</span>
              <span className="text-amber-400 font-semibold">
                {phase === 1 && 'Tabana İnme'}
                {phase === 2 && 'Söylem Hegemonyası'}
                {phase === 3 && 'Gölge Bürokrasi'}
                {phase === 4 && 'Egemenlik Sınavı'}
              </span>
            </div>

            {isInterruptActive && (
              <div className="bg-red-950/80 text-red-400 px-3 py-1.5 rounded-md border border-red-600 animate-pulse font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                SABOTAJ SİRENİ AKTİF
              </div>
            )}
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-2">
            <button
              id="btn-return-hero"
              onClick={returnToHero}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
              title="Giriş / Hero Ekranına Dön"
            >
              <Home className="w-5 h-5 text-slate-400" />
            </button>

            <button
              id="btn-open-kodleks"
              onClick={handleOpenKnowledgeBase}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-950/80 border border-emerald-600/60 text-emerald-400 hover:bg-emerald-900/80 hover:text-emerald-200 transition-all shadow-sm"
              title="Bilgi Bankası ve Kodleks El Kitabını Aç"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>BİLGİ BANKASI / KODLEKS</span>
            </button>

            <button
              id="btn-open-disclaimer"
              onClick={handleOpenDisclaimer}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-amber-950/80 border border-amber-600/60 text-amber-400 hover:bg-amber-900/80 hover:text-amber-200 transition-all shadow-sm"
              title="Yasal Uyarı ve Sorumluluk Reddi Metnini Aç"
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span>YASAL UYARI</span>
            </button>

            <button
              id="btn-sound-toggle"
              onClick={handleToggleSound}
              className={`p-2 rounded-lg border transition-all ${
                isSoundMuted
                  ? 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                  : 'bg-slate-800 border-emerald-500/40 text-emerald-400 hover:bg-slate-700'
              }`}
              title={isSoundMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            >
              {isSoundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              id="btn-reset-game"
              onClick={handleReset}
              disabled={isGameOver}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Sıfırla</span>
            </button>
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
    </>
  );
};
