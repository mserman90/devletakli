import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Terminal, ShieldAlert, Cpu, AlertTriangle, ArrowRightLeft, ListFilter } from 'lucide-react';
import { GameLog } from '../types/game';

export const LogConsole: React.FC = () => {
  const { logs } = useGameStore();
  const [filter, setFilter] = useState<string>('ALL');

  const filteredLogs = logs.filter((log) => {
    if (filter === 'ALL') return true;
    return log.type === filter;
  });

  const getLogBadge = (type: GameLog['type']) => {
    switch (type) {
      case 'DECISION':
        return <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">KARAR</span>;
      case 'DRIFT':
        return <span className="px-1.5 py-0.5 bg-blue-950 text-blue-400 border border-blue-800 rounded">SÜRÜKLENME</span>;
      case 'AI_ATTACK':
        return <span className="px-1.5 py-0.5 bg-red-950 text-red-400 border border-red-800 rounded font-bold animate-pulse">TEHDİT</span>;
      case 'WARNING':
        return <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 rounded">UYARI</span>;
      default:
        return <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded">SİSTEM</span>;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-lg text-slate-200">
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200">CANLI SİSTEM VE OTOMASYON GÜNLÜĞÜ (LOGS)</span>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-1 mt-1 sm:mt-0">
          <ListFilter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {['ALL', 'DECISION', 'DRIFT', 'AI_ATTACK', 'WARNING', 'SYSTEM'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                filter === f
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {f === 'ALL' && 'TÜMÜ'}
              {f === 'DECISION' && 'KARAR'}
              {f === 'DRIFT' && 'SÜRÜKLENME'}
              {f === 'AI_ATTACK' && 'TEHDİT'}
              {f === 'WARNING' && 'UYARI'}
              {f === 'SYSTEM' && 'SİSTEM'}
            </button>
          ))}
        </div>
      </div>

      {/* Log Feed */}
      <div className="max-h-36 overflow-y-auto font-mono text-[11px] space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-600 italic py-2 text-center">Seçilen filtrede kayıtlı log bulunmuyor.</div>
        ) : (
          filteredLogs.slice().reverse().map((log) => (
            <div
              key={log.id}
              className={`p-1.5 rounded border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
                log.type === 'AI_ATTACK'
                  ? 'bg-red-950/30 border-red-900/50 text-red-200'
                  : log.type === 'WARNING'
                  ? 'bg-amber-950/30 border-amber-900/50 text-amber-200'
                  : 'bg-slate-950/50 border-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                <span className="text-slate-400 font-bold">[T{log.turn}]</span>
                {getLogBadge(log.type)}
                <span className="leading-tight">{log.message}</span>
              </div>

              {log.impact && (
                <div className="text-[10px] text-slate-400 italic bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                  {log.impact}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
