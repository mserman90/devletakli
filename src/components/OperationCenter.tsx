import React, { useState } from 'react';
import { HeaderBar } from './HeaderBar';
import { IntelligenceTicker } from './IntelligenceTicker';
import { DecisionDesk } from './DecisionDesk';
import { TelemetryPanel } from './TelemetryPanel';
import { LogConsole } from './LogConsole';
import { GameOverModal } from './GameOverModal';
import { DisclaimerModal } from './DisclaimerModal';
import { ShieldAlert, Scale } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const OperationCenter: React.FC = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const handleOpenDisclaimer = () => {
    soundEngine.playUI('SELECT');
    setIsDisclaimerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header Navigation */}
      <HeaderBar />

      {/* Main 12-Column Grid Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Intelligence Ticker (3 cols) */}
        <div className="lg:col-span-3 h-[420px] lg:h-auto">
          <IntelligenceTicker />
        </div>

        {/* Middle Column: Decision Desk (5 cols) */}
        <div className="lg:col-span-5 min-h-[480px]">
          <DecisionDesk />
        </div>

        {/* Right Column: Telemetry Panel (4 cols) */}
        <div className="lg:col-span-4 min-h-[440px]">
          <TelemetryPanel />
        </div>

        {/* Bottom Span: System Event Log Console (12 cols) */}
        <div className="lg:col-span-12">
          <LogConsole />
        </div>
      </main>

      {/* Persistent Legal Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-3 px-4 text-slate-500 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
            <span>
              <strong>DEVLET AKLI v2.5:</strong> Bu simülasyon tamamen kurgusal olup akademik siyaset modellerine dayanır. Gerçek kurum ve kişilerle ilgisi yoktur.
            </span>
          </div>
          <button
            onClick={handleOpenDisclaimer}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-all font-semibold shrink-0"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Yasal Uyarı &amp; Sorumluluk Reddi Beyanı</span>
          </button>
        </div>
      </footer>

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
