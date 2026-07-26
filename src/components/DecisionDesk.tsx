import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CardOption } from '../types/game';
import { AlertOctagon, FileText, CheckCircle2, ShieldAlert, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const DecisionDesk: React.FC = () => {
  const { activeCard, selectOption, isInterruptActive, isGameOver } = useGameStore();
  const [hoveredOption, setHoveredOption] = useState<CardOption | null>(null);

  if (!activeCard) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 flex flex-col items-center justify-center h-full">
        <Compass className="w-12 h-12 text-slate-600 mb-3 animate-spin" />
        <h3 className="text-lg font-bold text-slate-300">Yeni Karar Dosyası Bekleniyor</h3>
        <p className="text-xs text-slate-500 mt-1">Strateji kurulu tarafından yeni seçenekler hazırlanıyor.</p>
      </div>
    );
  }

  const handleSelect = (optionId: string) => {
    if (isGameOver) return;
    selectOption(optionId);
  };

  return (
    <div
      className={`relative rounded-xl border p-5 flex flex-col h-full shadow-2xl transition-all duration-300 ${
        isInterruptActive
          ? 'bg-gradient-to-b from-red-950/90 via-slate-900 to-slate-950 border-red-600 shadow-red-900/30 animate-pulse'
          : 'bg-slate-900 border-slate-800'
      }`}
    >
      {/* Emergency Hazard Stripe Banner for Sabotage Interrupts */}
      {isInterruptActive && (
        <div className="mb-4 p-3 bg-red-900/80 border border-red-500 rounded-lg text-red-100 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5 text-red-300 animate-bounce" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-red-200">
              [KRİTİK MÜDAHALE] {activeCard.threatActor === 'GLOBAL_CAPITAL' ? 'KÜRESEL SERMAYE AĞLARI TAARRUZU' : 'ULUSAL MÜESSES NİZAM SABOTAJI'}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-red-950 text-red-300 border border-red-700 font-mono rounded">
            ACİL KOD: 429
          </span>
        </div>
      )}

      {/* Card Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <FileText className={`w-4 h-4 ${isInterruptActive ? 'text-red-400' : 'text-emerald-400'}`} />
          <span className="text-xs font-mono font-semibold uppercase text-slate-400">{activeCard.category} DOSYASI</span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
          KAYNAK: {activeCard.source}
        </span>
      </div>

      {/* Card Title & Narrative */}
      <div className="my-4">
        <h2 className="text-lg font-bold text-slate-100 leading-snug tracking-wide">{activeCard.title}</h2>
        <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-lg border border-slate-800 whitespace-pre-line">
          {activeCard.narrative}
        </p>
      </div>

      {/* Options List */}
      <div className="flex-1 space-y-3 my-2">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          STRATEJİK SEÇENEKLER VE KARAR HAMLELERİ:
        </h3>

        {activeCard.options.map((option, idx) => (
          <button
            key={option.id}
            id={`btn-option-${idx + 1}`}
            onMouseEnter={() => {
              soundEngine.playUI('HOVER');
              setHoveredOption(option);
            }}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => handleSelect(option.id)}
            disabled={isGameOver}
            className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
              isInterruptActive
                ? 'bg-slate-950/80 border-red-900/60 hover:border-red-500 hover:bg-red-950/40 text-slate-100'
                : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/80 text-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-400 transition-colors">
                    [{idx + 1}]
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                    {option.label}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-normal">{option.description}</p>
              </div>

              {option.riskFactor !== undefined && (
                <div
                  className={`shrink-0 text-[10px] font-mono px-2 py-1 rounded border flex items-center gap-1 ${
                    option.riskFactor > 50
                      ? 'bg-red-950/60 text-red-400 border-red-800'
                      : option.riskFactor > 25
                      ? 'bg-amber-950/60 text-amber-400 border-amber-800'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                  }`}
                >
                  <ShieldAlert className="w-3 h-3" />
                  <span>RİSK: %{option.riskFactor}</span>
                </div>
              )}
            </div>

            {/* Impact Delta Preview Bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex flex-wrap gap-2 text-[11px] font-mono">
              {Object.entries(option.stateDelta).map(([key, val]) => {
                if (val === undefined || val === 0) return null;
                const isPos = val > 0;
                return (
                  <span
                    key={key}
                    className={`px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${
                      isPos
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/50'
                        : 'bg-red-950/50 text-red-400 border-red-800/50'
                    }`}
                  >
                    {key}: {isPos ? `+${val}` : val}
                    {isPos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  </span>
                );
              })}
            </div>
          </button>
        ))}
      </div>

      {/* Option Consequence Preview Tooltip Footer */}
      {hoveredOption && (
        <div className="mt-3 p-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-300 font-mono flex items-start gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-emerald-400 font-bold">ÖNGÖRÜLEN SONUÇ: </span>
            <span>{hoveredOption.consequenceText}</span>
          </div>
        </div>
      )}
    </div>
  );
};
