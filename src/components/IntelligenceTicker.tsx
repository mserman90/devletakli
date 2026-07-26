import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Radio, RefreshCw, AlertTriangle, ExternalLink, Zap } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const IntelligenceTicker: React.FC = () => {
  const { intelligenceFeed, rateLimitStatus, fetchIntelligence } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initial fetch on mount
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    soundEngine.playUI('HOVER');
    setIsLoading(true);
    await fetchIntelligence();
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-full shadow-md text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-950 text-emerald-400 rounded-md border border-emerald-800/50">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">CANLI İSTİHBARAT AKIŞI</h2>
            <p className="text-[11px] text-slate-400">Algoritmik Simülasyon Akışı &amp; Kodleks Ağ Katmanı</p>
          </div>
        </div>

        <button
          id="btn-refresh-rss"
          onClick={handleRefresh}
          disabled={isLoading}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-all disabled:opacity-50"
          title="Akışı Yenile"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>

      {/* API Rate Limit & Quota Tracking Bar (Rule 3) */}
      <div className="my-3 p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80 text-xs">
        <div className="flex items-center justify-between mb-1 font-mono text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> API KOTA DURUMU:
          </span>
          <span className={`font-bold ${rateLimitStatus.isWarningThreshold ? 'text-amber-400' : 'text-emerald-400'}`}>
            {rateLimitStatus.remaining} / {rateLimitStatus.limit} Kalan (%{rateLimitStatus.usedPercentage} kullanıldı)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              rateLimitStatus.usedPercentage >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${rateLimitStatus.usedPercentage}%` }}
          />
        </div>

        {/* Rule 3: %80 Quota Warning Threshold Badge */}
        {rateLimitStatus.isWarningThreshold && (
          <div className="mt-2 p-1.5 bg-amber-950/80 border border-amber-600/50 text-amber-300 rounded text-[10px] flex items-center gap-1.5 font-mono">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400 animate-bounce" />
            <span>[UYARI - KOTA EŞİĞİ] API kota kullanımınız %80 limitine ulaştı!</span>
          </div>
        )}
      </div>

      {/* Feed List or Explicit "Veri mevcut değil" Banner (Rule 1) */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
        {intelligenceFeed.length === 0 ? (
          <div id="no-data-banner" className="h-48 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-lg p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Veri mevcut değil</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              {rateLimitStatus.errorMessage || 'Harici ağ akışına ulaşılamadı veya kota doldu.'}
            </p>
          </div>
        ) : (
          intelligenceFeed.map((item) => (
            <div
              key={item.id}
              className={`p-2.5 rounded-lg border text-xs transition-all hover:border-slate-600 ${
                item.urgency === 'CRITICAL'
                  ? 'bg-red-950/20 border-red-900/40 text-slate-200'
                  : 'bg-slate-950/40 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-mono">
                <span className="text-emerald-400/90 font-semibold">{item.source}</span>
                <span>{item.pubDate ? new Date(item.pubDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : 'CANLI'}</span>
              </div>
              <h3 className="font-medium text-slate-200 text-xs leading-snug line-clamp-2">{item.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {item.category}
                </span>
                {item.link && item.link !== '#' && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5"
                  >
                    Detay <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
