import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CardOption } from '../types/game';
import { AlertOctagon, FileText, CheckCircle2, ShieldAlert, ArrowUpRight, ArrowDownRight, Compass, Monitor } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Tooltip } from './Tooltip';
import { getTranslatedCard, UI_TRANSLATIONS } from '../utils/translations';

export const DecisionDesk: React.FC = () => {
  const { activeCard, selectOption, isInterruptActive, isGameOver, language } = useGameStore();
  const [hoveredOption, setHoveredOption] = useState<CardOption | null>(null);

  const t = UI_TRANSLATIONS[language].decision;
  const translatedCard = activeCard ? getTranslatedCard(activeCard, language) : null;

  if (!translatedCard) {
    return (
      <div className="bg-slate-900 border-8 border-slate-800 rounded-2xl p-8 text-center text-slate-400 flex flex-col items-center justify-center h-full shadow-2xl relative">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse absolute top-4 left-4" />
        <Compass className="w-12 h-12 text-emerald-500 mb-3 animate-spin" />
        <h3 className="text-lg font-bold text-slate-200 font-mono">
          {language === 'EN' ? 'TERMINAL: AWAITING OPTION DOSSIER' : 'TERMİNAL: YENİ SEÇENEK DOSYASI BEKLENİYOR'}
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          {language === 'EN' ? 'New telemetry being processed by strategy council...' : 'Strateji kurulu tarafından yeni veriler işleniyor...'}
        </p>
      </div>
    );
  }

  const handleSelect = (optionId: string) => {
    if (isGameOver) return;
    selectOption(optionId);
  };

  const categoryTR: Record<string, string> = {
    FINANCE: language === 'EN' ? 'FINANCE' : 'FİNANS',
    POLITICS: language === 'EN' ? 'POLITICS' : 'SİYASET',
    BUREAUCRACY: language === 'EN' ? 'BUREAUCRACY' : 'BÜROKRASİ',
    MEDIA: language === 'EN' ? 'MEDIA' : 'MEDYA',
    FOREIGN: language === 'EN' ? 'FOREIGN POLICY' : 'DIŞ POLİTİKA',
    SECURITY: language === 'EN' ? 'SECURITY' : 'GÜVENLİK',
  };

  return (
    <div className="flex flex-col h-full relative font-mono select-none">
      
      {/* Desktop Computer Monitor Casing */}
      <div className={`rounded-2xl border-4 sm:border-8 p-3 sm:p-5 flex flex-col h-full shadow-2xl relative transition-all duration-300 ${
        isInterruptActive
          ? 'bg-slate-950 border-red-900 shadow-red-950/80 ring-2 ring-red-600'
          : 'bg-slate-950 border-slate-800 ring-2 ring-slate-700/80 shadow-2xl'
      }`}>

        {/* Monitor Screen Top Bezel Details */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 tracking-wider">
              {language === 'EN' ? 'EXECUTIVE TERMINAL' : 'GENEL BAŞKANLIK BİLGİSAYAR TERMİNALİ'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/40">
              STRAT-90
            </span>
            {/* Power LED Indicator */}
            <div className={`w-2.5 h-2.5 rounded-full ${isInterruptActive ? 'bg-red-500 animate-ping' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'}`} />
          </div>
        </div>

        {/* Interrupt Hazard Banner on Screen */}
        {isInterruptActive && (
          <div className="mb-3 p-2.5 bg-red-950/90 border border-red-500 rounded text-red-200 flex items-center justify-between shadow-lg animate-pulse text-xs">
            <div className="flex items-center space-x-2">
              <AlertOctagon className="w-4 h-4 text-red-400 animate-bounce" />
              <span className="font-bold uppercase tracking-wider text-red-300">
                [ALARM] {translatedCard.threatActor === 'GLOBAL_CAPITAL' ? (language === 'EN' ? 'GLOBAL CAPITAL NETWORKS' : 'KÜRESEL SERMAYE AĞLARI') : (language === 'EN' ? 'NATIONAL ESTABLISHMENT' : 'ULUSAL MÜESSES NİZAM')} {language === 'EN' ? 'SABOTAGE' : 'SABOTAJI'}
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-red-900 text-red-200 rounded">CODE: 429</span>
          </div>
        )}

        {/* Active Prompt Metadata */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <div className="flex items-center space-x-1.5">
            <FileText className={`w-3.5 h-3.5 ${isInterruptActive ? 'text-red-400' : 'text-emerald-400'}`} />
            <span className="font-bold text-emerald-400 uppercase">{(categoryTR[translatedCard.category] || translatedCard.category)} {t.directive}</span>
          </div>
          <span>{t.source}: {translatedCard.source}</span>
        </div>

        {/* Screen Narrative Display */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800/80 mb-3 text-slate-200 text-xs md:text-sm leading-relaxed whitespace-pre-line shadow-inner">
          <h2 className="text-sm md:text-base font-bold text-white mb-2 leading-snug font-sans tracking-wide">
            {translatedCard.title}
          </h2>
          <p className="text-slate-300 font-sans">{translatedCard.narrative}</p>
        </div>

        {/* Decision Options on Computer Screen */}
        <div className="flex-1 space-y-2.5 my-1">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {language === 'EN' ? 'EXECUTIVE DECISION & ACTION OPTIONS:' : 'BİLGİSAYAR EKRANI KARAR VE HAMLE SEÇENEKLERİ:'}
          </div>

          {translatedCard.options.map((option: CardOption, idx: number) => (
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
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden font-sans ${
                isInterruptActive
                  ? 'bg-red-950/40 border-red-800 hover:border-red-500 hover:bg-red-900/60 text-slate-100 shadow-lg'
                  : 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-400 hover:bg-slate-800 text-slate-100 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 group-hover:text-emerald-300">
                      &gt; [{idx + 1}]
                    </span>
                    <h4 className="text-xs md:text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {option.label}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">{option.description}</p>
                </div>

                {option.riskFactor !== undefined && (
                  <div
                    className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                      option.riskFactor > 50
                        ? 'bg-red-950 text-red-300 border-red-700'
                        : option.riskFactor > 25
                        ? 'bg-amber-950 text-amber-300 border-amber-700'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    }`}
                  >
                    <ShieldAlert className="w-3 h-3" />
                    <span>{t.risk}: %{option.riskFactor}</span>
                  </div>
                )}
              </div>

              {/* State Delta Badges */}
              <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[10px] font-mono">
                {Object.entries(option.stateDelta).map(([key, val]) => {
                  if (val === undefined || val === 0) return null;
                  const isPos = val > 0;
                  return (
                    <Tooltip key={key} code={key} position="top">
                      <span
                        className={`px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${
                          isPos
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-red-950 text-red-300 border-red-800'
                        }`}
                      >
                        {key}: {isPos ? `+${val}` : val}
                        {isPos ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                      </span>
                    </Tooltip>
                  );
                })}
              </div>
            </button>
          ))}
        </div>

        {/* Hovered Option Impact Preview */}
        {hoveredOption && (
          <div className="mt-2 p-2 bg-slate-900 border border-emerald-500/60 rounded-lg text-xs text-slate-200 font-mono flex items-start gap-2 shadow-xl animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-emerald-400 font-bold">{language === 'EN' ? 'PROJECTED DIRECTIVE IMPACT: ' : 'ÖNGÖRÜLEN DİREKTİF SONUCU: '}</span>
              <span>{hoveredOption.consequenceText}</span>
            </div>
          </div>
        )}

        {/* Monitor Base Stand */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 border-t border-slate-700 rounded-b-xl shadow-2xl -z-10 flex items-center justify-center">
          <div className="w-20 h-1 bg-slate-600 rounded" />
        </div>

      </div>
    </div>
  );
};
