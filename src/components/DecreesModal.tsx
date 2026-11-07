import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { FileText, Scale, X, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface DecreesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DecreesModal: React.FC<DecreesModalProps> = ({ isOpen, onClose }) => {
  const { decrees, enactEmergencyDecree, language } = useGameStore();

  if (!isOpen) return null;

  const isEn = language === 'EN';

  const handleEnact = (id: string) => {
    enactEmergencyDecree(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-3xl bg-slate-900 border-2 border-red-900/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100 font-sans">
        
        {/* Header */}
        <div className="bg-red-950/80 px-4 sm:px-6 py-3.5 border-b border-red-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg shadow">
              <Scale className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide text-red-100 font-serif">
                {isEn ? 'EMERGENCY DECREES & EXECUTIVE ORDERS' : 'OLAĞANÜSTÜ KARARNAMELER (KHK) MASASI'}
              </h2>
              <p className="text-[11px] font-mono text-red-300/70">
                {isEn
                  ? 'Radical sovereign executive tools with direct statecraft trade-offs.'
                  : 'Kriz anlarında doğrudan yürürlüğe konabilen radikal kamusal müdahaleler.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Decrees List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
          {decrees.map((decree) => {
            const isReady = decree.currentCooldown === 0;
            const title = isEn ? decree.titleEN : decree.title;
            const desc = isEn ? decree.descriptionEN : decree.description;

            return (
              <div
                key={decree.id}
                className="bg-slate-950/80 border border-red-900/40 rounded-xl p-4 shadow-lg hover:border-red-700/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-red-400 shrink-0" />
                    <h3 className="text-xs sm:text-sm font-bold text-amber-100 font-serif">{title}</h3>
                    {isReady ? (
                      <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" /> {isEn ? 'AUTHORIZED' : 'YETKİ HAZIR'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" /> {decree.currentCooldown} {isEn ? 'TURNS' : 'TUR'}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">{desc}</p>

                  {/* Impact Pills */}
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {Object.entries(decree.stateDelta).map(([k, v]) => (
                      <span
                        key={k}
                        className={`px-1.5 py-0.5 rounded border font-bold ${
                          (v ?? 0) > 0
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60'
                            : 'bg-red-950 text-red-300 border-red-700/60'
                        }`}
                      >
                        {k} {(v ?? 0) > 0 ? `+${v}` : v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enact Button */}
                <div className="w-full sm:w-auto shrink-0">
                  <button
                    disabled={!isReady}
                    onClick={() => handleEnact(decree.id)}
                    className={`w-full sm:w-auto py-2 px-4 rounded-lg text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow ${
                      isReady
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white cursor-pointer shadow-red-900/50'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {isReady ? (isEn ? 'ENACT DECREE' : 'KARARNAMEYİ İMZALA') : (isEn ? `COOLING (${decree.currentCooldown} T)` : `BEKLEMEDE (${decree.currentCooldown} TUR)`)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            {isEn ? 'Emergency decrees require high executive responsibility.' : 'Kararnameler yüksek siyasi ve iktisadi denge sorumluluğu gerektirir.'}
          </span>
          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all"
          >
            {isEn ? 'CLOSE' : 'KAPAT'}
          </button>
        </div>
      </div>
    </div>
  );
};
