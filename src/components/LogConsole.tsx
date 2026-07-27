import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Terminal, ListFilter } from 'lucide-react';
import { GameLog } from '../types/game';
import { UI_TRANSLATIONS } from '../utils/translations';

export const LogConsole: React.FC = () => {
  const { logs, language } = useGameStore();
  const [filter, setFilter] = useState<string>('ALL');

  const t = UI_TRANSLATIONS[language].logs;

  const filteredLogs = logs.filter((log) => {
    if (filter === 'ALL') return true;
    return log.type === filter;
  });

  const getLogBadge = (type: GameLog['type']) => {
    switch (type) {
      case 'DECISION':
        return <span className="px-1.5 py-0.5 bg-emerald-900 text-emerald-100 border border-emerald-700 rounded text-[10px]">{language === 'EN' ? 'DECISION' : 'KARAR'}</span>;
      case 'DRIFT':
        return <span className="px-1.5 py-0.5 bg-blue-900 text-blue-100 border border-blue-700 rounded text-[10px]">{language === 'EN' ? 'DRIFT' : 'SÜRÜKLENME'}</span>;
      case 'AI_ATTACK':
        return <span className="px-1.5 py-0.5 bg-red-900 text-red-100 border border-red-700 rounded text-[10px] font-bold animate-pulse">{language === 'EN' ? 'THREAT' : 'TEHDİT'}</span>;
      case 'WARNING':
        return <span className="px-1.5 py-0.5 bg-amber-900 text-amber-100 border border-amber-700 rounded text-[10px]">{language === 'EN' ? 'WARNING' : 'UYARI'}</span>;
      default:
        return <span className="px-1.5 py-0.5 bg-amber-950 text-amber-200 border border-amber-800 rounded text-[10px]">{language === 'EN' ? 'SYSTEM' : 'SİSTEM'}</span>;
    }
  };

  return (
    <div className="bg-[#fffbeb] text-amber-950 border-2 border-amber-900/60 rounded-lg p-3.5 shadow-2xl relative font-mono select-none">
      
      {/* Leather Book Corner Protectors */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-900 rounded-tl-sm bg-amber-800/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-900 rounded-tr-sm bg-amber-800/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-900 rounded-bl-sm bg-amber-800/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-900 rounded-br-sm bg-amber-800/40" />

      {/* Ribbon Bookmark Decorative Tag */}
      <div className="absolute -top-2 right-10 w-4 h-8 bg-red-800 rounded-b shadow-md z-10" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b-2 border-amber-900/30 text-xs">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-amber-900" />
          <span className="font-bold text-amber-950 uppercase font-serif tracking-wide text-xs md:text-sm">
            {t.title}
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1 mt-1 sm:mt-0 font-mono">
          <ListFilter className="w-3.5 h-3.5 text-amber-900 mr-1 shrink-0" />
          {['ALL', 'DECISION', 'DRIFT', 'AI_ATTACK', 'WARNING', 'SYSTEM'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                filter === f
                  ? 'bg-amber-900 text-amber-100 shadow'
                  : 'bg-amber-200/80 text-amber-950 hover:bg-amber-300 border border-amber-800/30'
              }`}
            >
              {f === 'ALL' && (language === 'EN' ? 'ALL' : 'TÜMÜ')}
              {f === 'DECISION' && (language === 'EN' ? 'DECISION' : 'KARAR')}
              {f === 'DRIFT' && (language === 'EN' ? 'DRIFT' : 'SÜRÜKLENME')}
              {f === 'AI_ATTACK' && (language === 'EN' ? 'THREAT' : 'TEHDİT')}
              {f === 'WARNING' && (language === 'EN' ? 'WARNING' : 'UYARI')}
              {f === 'SYSTEM' && (language === 'EN' ? 'SYSTEM' : 'SİSTEM')}
            </button>
          ))}
        </div>
      </div>

      {/* Log Entries List */}
      <div className="max-h-36 overflow-y-auto text-[11px] space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-amber-800/30">
        {filteredLogs.length === 0 ? (
          <div className="text-amber-800/60 italic py-2 text-center">{t.noLogs}</div>
        ) : (
          filteredLogs.slice().reverse().map((log) => (
            <div
              key={log.id}
              className={`p-2 rounded border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-sm ${
                log.type === 'AI_ATTACK'
                  ? 'bg-red-100 border-red-300 text-red-950'
                  : log.type === 'WARNING'
                  ? 'bg-amber-100 border-amber-300 text-amber-950'
                  : 'bg-white/80 border-amber-800/20 text-amber-950'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-amber-800/70 text-[10px]">{log.timestamp}</span>
                <span className="text-amber-900 font-bold">[{language === 'EN' ? 'TURN' : 'TUR'} #{log.turn}]</span>
                {getLogBadge(log.type)}
                <span className="leading-tight font-medium">{log.message}</span>
              </div>

              {log.impact && (
                <div className="text-[10px] text-amber-950 font-bold bg-amber-200/80 px-2 py-0.5 rounded border border-amber-800/30 shrink-0">
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
