import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Radio, RefreshCw, AlertTriangle, ExternalLink, Zap } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Tooltip } from './Tooltip';
import { UI_TRANSLATIONS } from '../utils/translations';

export const IntelligenceTicker: React.FC = () => {
  const { intelligenceFeed, rateLimitStatus, fetchIntelligence, language } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  const t = UI_TRANSLATIONS[language].ticker;

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    soundEngine.playUI('HOVER');
    setIsLoading(true);
    await fetchIntelligence();
    setIsLoading(false);
  };

  return (
    <div className="bg-[#fefce8] text-slate-900 border-2 border-amber-900/40 rounded-sm p-3 sm:p-4 flex flex-col h-full shadow-2xl relative font-mono select-none md:rotate-[-0.5deg] hover:rotate-0 transition-transform duration-300">
      
      {/* Brass Pin at top corner */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-600 rounded-sm border border-amber-800 shadow-md flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-amber-300 border border-amber-950" />
      </div>

      {/* Red Official Stamp */}
      <div className="absolute top-3 right-3 border-2 border-red-700/80 text-red-800 font-bold text-[10px] px-2 py-0.5 rounded rotate-[12deg] pointer-events-none opacity-80 uppercase tracking-widest">
        {language === 'EN' ? 'CONFIDENTIAL // BULLETIN' : 'GİZLİ // BÜLTEN'}
      </div>

      {/* Paper Header */}
      <div className="pb-3 border-b-2 border-dashed border-amber-900/30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-red-700 animate-pulse" />
          <div>
            <h2 className="text-xs font-bold text-amber-950 uppercase tracking-widest font-serif">{t.title}</h2>
            <p className="text-[10px] text-amber-900/70">{language === 'EN' ? 'Real-Time Telegraph & Wire Press' : 'Anlık Telgraf ve Haber Baskısı'}</p>
          </div>
        </div>

        <button
          id="btn-refresh-rss"
          onClick={handleRefresh}
          disabled={isLoading}
          className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded border border-amber-800/40 transition-all disabled:opacity-50"
          title={language === 'EN' ? 'Refresh Teleprinter Feed' : 'Teleks Baskısını Yenile'}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-800' : ''}`} />
        </button>
      </div>

      {/* Printed Quota Meter */}
      <div className="my-3 p-2 bg-amber-100/80 rounded border border-amber-800/30 text-[11px]">
        <div className="flex items-center justify-between mb-1 font-bold text-amber-950">
          <Tooltip code="API" customTitle={language === 'EN' ? 'API QUOTA SYSTEM' : 'API KOTA SİSTEMİ'}>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-700" /> {t.quotaRatio}:
            </span>
          </Tooltip>
          <span className={rateLimitStatus.isWarningThreshold ? 'text-red-700' : 'text-emerald-800'}>
            {rateLimitStatus.remaining} / {rateLimitStatus.limit}
          </span>
        </div>

        <div className="w-full bg-amber-200/80 h-1.5 rounded-full overflow-hidden border border-amber-800/20">
          <div
            className={`h-full transition-all duration-300 ${
              rateLimitStatus.usedPercentage >= 80 ? 'bg-red-600' : 'bg-emerald-700'
            }`}
            style={{ width: `${rateLimitStatus.usedPercentage}%` }}
          />
        </div>

        {rateLimitStatus.isWarningThreshold && (
          <Tooltip code="RFC 6585">
            <div className="mt-2 p-1 bg-red-100 border border-red-400 text-red-900 rounded text-[10px] flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0 text-red-600" />
              <span>{t.quotaWarning}</span>
            </div>
          </Tooltip>
        )}
      </div>

      {/* Printed Teleprinter Items */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-amber-800/30">
        {intelligenceFeed.length === 0 ? (
          <div id="no-data-banner" className="h-44 flex flex-col items-center justify-center border-2 border-dashed border-amber-800/30 rounded p-4 text-center">
            <AlertTriangle className="w-7 h-7 text-amber-800/60 mb-2" />
            <p className="text-xs font-bold text-amber-900 uppercase">{t.noData}</p>
            <p className="text-[11px] text-amber-800/80 mt-1">
              {rateLimitStatus.errorMessage || (language === 'EN' ? 'No signal on telegraph wire or quota exceeded.' : 'Telgraf hattında sinyal yok veya kota doldu.')}
            </p>
          </div>
        ) : (
          intelligenceFeed.map((item) => {
            const displayTitle = (language === 'EN' && item.titleEN) ? item.titleEN : item.title;
            const displaySource = (language === 'EN' && item.sourceEN) ? item.sourceEN : item.source;
            const displayCategory = (language === 'EN' && item.categoryEN) ? item.categoryEN : item.category;

            return (
              <div
                key={item.id}
                className={`p-2.5 rounded border text-xs transition-all ${
                  item.urgency === 'CRITICAL'
                    ? 'bg-red-50/90 border-red-300 text-red-950 shadow-sm'
                    : 'bg-white/80 border-amber-800/20 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-amber-900/80 mb-1 border-b border-amber-800/10 pb-1">
                  <span className="font-bold uppercase tracking-wider">{displaySource}</span>
                  <span>{item.pubDate ? new Date(item.pubDate).toLocaleTimeString(language === 'EN' ? 'en-US' : 'tr-TR', { hour: '2-digit', minute: '2-digit' }) : (language === 'EN' ? 'LIVE' : 'ANLIK')}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-xs leading-snug">{displayTitle}</h3>
                <div className="mt-2 flex items-center justify-between pt-1 border-t border-dashed border-amber-800/20">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-950 font-bold uppercase">
                    {displayCategory}
                  </span>
                  {item.link && item.link !== '#' && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-amber-900 hover:underline flex items-center gap-0.5 font-bold"
                    >
                      {language === 'EN' ? 'Details' : 'Detay'} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Perforated Receipt Bottom Edge Effect */}
      <div className="mt-2 pt-1 border-t-2 border-dashed border-amber-900/30 text-[9px] text-amber-900/60 text-center font-mono">
        {language === 'EN' ? '--- NATIONAL INTELLIGENCE WIRE PRESS /// END ---' : '--- MİLLİ İSTİHBARAT MASA BASKISI /// SONU ---'}
      </div>
    </div>
  );
};
