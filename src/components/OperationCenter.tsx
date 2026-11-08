import React, { useState } from 'react';
import { HeaderBar } from './HeaderBar';
import { PWAInstallBanner } from './PWAInstallBanner';
import { ResourceDashboard } from './ResourceDashboard';
import { IntelligenceTicker } from './IntelligenceTicker';
import { DecisionDesk } from './DecisionDesk';
import { StrategyTips } from './StrategyTips';
import { TelemetryPanel } from './TelemetryPanel';
import { LogConsole } from './LogConsole';
import { GameOverModal } from './GameOverModal';
import { DisclaimerModal } from './DisclaimerModal';
import { ToastContainer } from './ToastContainer';
import { ShieldAlert, Scale, Compass, Radio, Activity, Terminal, Layers, Gauge } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useGameStore } from '../store/useGameStore';
import { UI_TRANSLATIONS } from '../utils/translations';

type MobileTab = 'RESOURCE' | 'DECISION' | 'INTELLIGENCE' | 'TELEMETRY' | 'LOGS' | 'ALL';

export const OperationCenter: React.FC = () => {
  const language = useGameStore((state) => state.language);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('ALL');

  const t = UI_TRANSLATIONS[language].tabs;

  const handleOpenDisclaimer = () => {
    soundEngine.playUI('SELECT');
    setIsDisclaimerOpen(true);
  };

  const handleTabSelect = (tab: MobileTab) => {
    soundEngine.playUI('HOVER');
    setMobileTab(tab);
    // Smooth scroll back to top of workspace when switching views on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pb-14 lg:pb-0">
      
      {/* PWA Floating Install & Offline Alert Banner */}
      <PWAInstallBanner />

      {/* Top Header Navigation */}
      <HeaderBar />

      {/* Mobile Panorama Switcher Bar (visible on < lg screens) */}
      <div className="lg:hidden bg-slate-900/95 border-b border-amber-900/40 px-2 py-1.5 backdrop-blur-md sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none font-mono text-xs">
          <button
            onClick={() => handleTabSelect('ALL')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shrink-0 transition-all text-[11px] font-bold ${
              mobileTab === 'ALL'
                ? 'bg-amber-600 border-amber-400 text-slate-950 shadow'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.ALL}</span>
          </button>

          <button
            onClick={() => handleTabSelect('DECISION')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shrink-0 transition-all text-[11px] font-bold ${
              mobileTab === 'DECISION'
                ? 'bg-emerald-600 border-emerald-400 text-slate-950 shadow'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.DECISION}</span>
          </button>

          <button
            onClick={() => handleTabSelect('RESOURCE')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shrink-0 transition-all text-[11px] font-bold ${
              mobileTab === 'RESOURCE'
                ? 'bg-indigo-600 border-indigo-400 text-slate-950 shadow'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{language === 'EN' ? 'RESOURCES' : 'KAYNAKLAR'}</span>
          </button>

          <button
            onClick={() => handleTabSelect('TELEMETRY')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shrink-0 transition-all text-[11px] font-bold ${
              mobileTab === 'TELEMETRY'
                ? 'bg-amber-600 border-amber-400 text-slate-950 shadow'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.TELEMETRY}</span>
          </button>

          <button
            onClick={() => handleTabSelect('INTELLIGENCE')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shrink-0 transition-all text-[11px] font-bold ${
              mobileTab === 'INTELLIGENCE'
                ? 'bg-red-600 border-red-400 text-slate-950 shadow'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{t.INTELLIGENCE}</span>
          </button>

          <button
            onClick={() => handleTabSelect('LOGS')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shrink-0 transition-all text-[11px] font-bold ${
              mobileTab === 'LOGS'
                ? 'bg-blue-600 border-blue-400 text-slate-950 shadow'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.LOGS}</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        
        {/* Resource Dashboard - Macro Balances */}
        {(mobileTab === 'ALL' || mobileTab === 'RESOURCE') && (
          <div className="order-first lg:col-span-12">
            <ResourceDashboard />
          </div>
        )}

        {/* Decision Desk & AI Strategy Advisor */}
        {(mobileTab === 'ALL' || mobileTab === 'DECISION') && (
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col gap-3 sm:gap-4 min-h-[420px] sm:min-h-[480px]">
            <DecisionDesk />
            <StrategyTips />
          </div>
        )}

        {/* Telemetry Panel */}
        {(mobileTab === 'ALL' || mobileTab === 'TELEMETRY') && (
          <div className="order-2 lg:order-3 lg:col-span-4 min-h-[380px] sm:min-h-[440px]">
            <TelemetryPanel />
          </div>
        )}

        {/* Intelligence Ticker */}
        {(mobileTab === 'ALL' || mobileTab === 'INTELLIGENCE') && (
          <div className="order-3 lg:order-1 lg:col-span-3 min-h-[340px] lg:h-auto">
            <IntelligenceTicker />
          </div>
        )}

        {/* System Event Log Console */}
        {(mobileTab === 'ALL' || mobileTab === 'LOGS') && (
          <div className="order-4 lg:order-4 lg:col-span-12">
            <LogConsole />
          </div>
        )}

      </main>

      {/* Persistent Legal Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-3 px-3 sm:px-4 text-slate-500 text-[10px] sm:text-[11px] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
            <span>
              <strong>DEVLET AKLI v3.0:</strong> {language === 'EN' ? 'This simulation is entirely fictional and based on academic political science models. No relation to actual real-world persons or institutions.' : 'Bu simülasyon tamamen kurgusal olup akademik siyaset modellerine dayanır. Gerçek kurum ve kişilerle ilgisi yoktur.'}
            </span>
          </div>
          <button
            onClick={handleOpenDisclaimer}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-all font-semibold shrink-0"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'EN' ? 'Legal Disclaimer & Liability Waiver' : 'Yasal Uyarı & Sorumluluk Reddi Beyanı'}</span>
          </button>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar (visible on < lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 border-t border-amber-900/50 px-2 py-1.5 backdrop-blur-lg z-30 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => handleTabSelect('DECISION')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            mobileTab === 'DECISION' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-mono">{t.DECISION}</span>
        </button>

        <button
          onClick={() => handleTabSelect('RESOURCE')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            mobileTab === 'RESOURCE' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gauge className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-mono">{language === 'EN' ? 'Resource' : 'Kaynak'}</span>
        </button>

        <button
          onClick={() => handleTabSelect('TELEMETRY')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            mobileTab === 'TELEMETRY' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-mono">{t.TELEMETRY}</span>
        </button>

        <button
          onClick={() => handleTabSelect('INTELLIGENCE')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            mobileTab === 'INTELLIGENCE' ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-mono">{t.INTELLIGENCE}</span>
        </button>

        <button
          onClick={() => handleTabSelect('ALL')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
            mobileTab === 'ALL' ? 'text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-mono">{t.ALL}</span>
        </button>
      </div>

      {/* Toast Notifications System */}
      <ToastContainer />

      {/* Game Over Modal Overlay */}
      <GameOverModal />

      {/* Disclaimer Modal Overlay */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
};
