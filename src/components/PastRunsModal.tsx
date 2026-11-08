import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { History, Award, X, Activity, ShieldAlert, CheckCircle2, Skull } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PastRunsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PastRunsModal: React.FC<PastRunsModalProps> = ({ isOpen, onClose }) => {
  const { pastRuns, language } = useGameStore();

  if (!isOpen) return null;

  const isEn = language === 'EN';

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'VICTORY':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-600/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {isEn ? 'VICTORY: SOVEREIGNTY' : 'ZAFER: DEVLET AKLI'}
          </span>
        );
      case 'BANKRUPT_DEFEAT':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-600/40 flex items-center gap-1">
            <Skull className="w-3 h-3" /> {isEn ? 'FINANCIAL COLLAPSE' : 'FİNANSAL ÇÖKÜŞ'}
          </span>
        );
      case 'AUTOCRACY_DEFEAT':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-600/40 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> {isEn ? 'OLIGARCHIC CAPTURE' : 'OLİGARŞİK VESAYET'}
          </span>
        );
      case 'DEEP_STATE_DEFEAT':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-600/40 flex items-center gap-1">
            <Activity className="w-3 h-3" /> {isEn ? 'BUREAUCRATIC PURGE' : 'BÜROKRATİK ERİME'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-3xl bg-slate-900 border-2 border-indigo-900/80 rounded-2xl shadow-2xl flex flex-col max-h-[88dvh] overflow-hidden text-slate-100 font-sans">
        
        {/* Header */}
        <div className="bg-indigo-950/80 px-4 sm:px-6 py-3.5 border-b border-indigo-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-lg shadow">
              <History className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide text-indigo-100 font-serif">
                {isEn ? 'ARCHIVE OF PAST GOVERNMENTS & HALL OF FAME' : 'GEÇMİŞ İKTİDAR DÖNEMLERİ SİCİLİ VE BAŞARI ARŞİVİ'}
              </h2>
              <p className="text-[11px] font-mono text-indigo-300/70">
                {isEn
                  ? 'Historical track record and performance evaluations of your governance tenures.'
                  : 'Tamamlanan simülasyonların sonuç karnesi, tur sayıları ve nihai strateji dereceleri.'}
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

        {/* List of Runs */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {pastRuns.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p>{isEn ? 'No completed government records found yet.' : 'Henüz tamamlanmış bir iktidar dönemi kaydı bulunmuyor.'}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                {isEn ? 'Play a full simulation to register in the National Archives.' : 'Ulusal arşive kaydolmak için bir simülasyon oturumunu tamamlayın.'}
              </p>
            </div>
          ) : (
            pastRuns.map((run, idx) => (
              <div
                key={run.id || idx}
                className="bg-slate-950/80 border border-indigo-900/40 rounded-xl p-3.5 shadow-md hover:border-indigo-700/60 transition-all font-mono text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 flex items-center justify-center font-bold text-xs">
                      #{pastRuns.length - idx}
                    </span>
                    <span className="text-slate-300 font-semibold">{run.date}</span>
                    <span className="text-slate-500 text-[11px]">• {isEn ? 'Turn' : 'Tur'} #{run.turn}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getOutcomeBadge(run.outcome)}
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/60 font-black text-xs">
                      {run.grade}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-amber-400/90 font-bold">
                    {isEn ? 'Archetype:' : 'Liderlik Arketipi:'} {isEn ? run.archetypeEN : run.archetype}
                  </span>

                  <div className="flex flex-wrap gap-2 text-slate-400">
                    <span>TP: <strong className="text-emerald-400">{run.finalState?.TP?.toFixed(0)}</strong></span>
                    <span>KP: <strong className="text-red-400">{run.finalState?.KP?.toFixed(0)}</strong></span>
                    <span>PID: <strong className="text-blue-400">{run.finalState?.PID?.toFixed(0)}</strong></span>
                    <span>GB: <strong className="text-purple-400">{run.finalState?.GB?.toFixed(0)}</strong></span>
                    <span>OH: <strong className="text-amber-400">{run.finalState?.OH?.toFixed(0)}</strong></span>
                    <span>KD: <strong className="text-pink-400">{run.finalState?.KD?.toFixed(0)}</strong></span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>{isEn ? `Total Archives: ${pastRuns.length}` : `Toplam Arşiv Kaydı: ${pastRuns.length}`}</span>
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
