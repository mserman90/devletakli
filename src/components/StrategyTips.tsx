import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Sparkles, BrainCircuit, AlertTriangle, RefreshCw, ChevronDown, ChevronUp, ShieldAlert, ArrowUpRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Tooltip } from './Tooltip';

interface StrategyTipData {
  headline: string;
  recommendation: string;
  keyRisks: string[];
  recommendedFocusMetric: string;
}

export const StrategyTips: React.FC = () => {
  const { stateVector, turn, phase, activeCard, language, isGameOver } = useGameStore();
  const [tipData, setTipData] = useState<StrategyTipData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [lastTurnFetched, setLastTurnFetched] = useState<number>(-1);

  const fetchStrategyTip = useCallback(async (manual: boolean = false) => {
    if (isGameOver) return;
    setLoading(true);
    setError(null);

    if (manual) {
      soundEngine.playUI('SELECT');
    }

    try {
      const response = await fetch('/api/strategy-tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stateVector,
          turn,
          phase,
          activeCardTitle: activeCard?.title || 'General Decision',
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.tip) {
        setTipData(data.tip);
        setLastTurnFetched(turn);
      } else {
        throw new Error(data.error || 'Failed to fetch strategy tips');
      }
    } catch (err: any) {
      console.error('Error fetching strategy tip:', err);
      setError(language === 'EN' ? 'Unable to connect to AI Strategy Advisor' : 'Yapay Zeka Strateji Danışmanına bağlanılamadı');
    } finally {
      setLoading(false);
    }
  }, [stateVector, turn, phase, activeCard, language, isGameOver]);

  // Auto-fetch on initial mount or when turn changes
  useEffect(() => {
    if (turn !== lastTurnFetched && !isGameOver) {
      fetchStrategyTip(false);
    }
  }, [turn, isGameOver, lastTurnFetched, fetchStrategyTip]);

  // Metric metadata map
  const METRIC_NAMES: Record<string, { nameTR: string; nameEN: string; color: string }> = {
    TP: { nameTR: 'Temiz Para', nameEN: 'Clean Capital', color: 'text-emerald-400 border-emerald-500 bg-emerald-950/80' },
    KP: { nameTR: 'Kirli Para', nameEN: 'Dark Capital', color: 'text-red-400 border-red-500 bg-red-950/80' },
    PID: { nameTR: 'Parti İçi Demokrasi', nameEN: 'Internal Democracy', color: 'text-blue-400 border-blue-500 bg-blue-950/80' },
    GB: { nameTR: 'Bürokratik Nüfuz & GB', nameEN: 'Bureaucratic Influence & GB', color: 'text-purple-400 border-purple-500 bg-purple-950/80' },
    OH: { nameTR: 'Kamuoyu & Söylem Hegemonyası', nameEN: 'Public Opinion & Hegemony', color: 'text-amber-400 border-amber-500 bg-amber-950/80' },
    KD: { nameTR: 'Kur Dağınıklığı', nameEN: 'Currency Volatility', color: 'text-pink-400 border-pink-500 bg-pink-950/80' },
  };

  const focusKey = tipData?.recommendedFocusMetric?.toUpperCase() || 'TP';
  const focusMetricInfo = METRIC_NAMES[focusKey] || METRIC_NAMES.TP;

  return (
    <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-3.5 sm:p-4 shadow-xl text-slate-100 font-mono transition-all duration-300 relative overflow-hidden backdrop-blur-md">
      {/* Background Subtle Glow Accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/60 text-emerald-400 animate-pulse">
            <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-100 tracking-wide flex items-center gap-1.5">
                {language === 'EN' ? 'STRATEGY ADVISOR' : 'STRATEJİ AKLI DANIŞMANI'}
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/80 flex items-center gap-1 font-mono">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> GEMINI AI
                </span>
              </h3>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {language === 'EN' ? 'Contextual AI analysis based on live 6D vector & game status' : 'Canlı 6-boyutlu vektör ve durum verisiyle otonom tavsiye üretici'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => fetchStrategyTip(true)}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs flex items-center gap-1 disabled:opacity-50"
            title={language === 'EN' ? 'Refresh AI Strategy Tip' : 'AI Strateji Analizini Yenile'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="text-[10px] hidden sm:inline">{language === 'EN' ? 'Refresh' : 'Yenile'}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playUI('HOVER');
              setIsExpanded(!isExpanded);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      {isExpanded && (
        <div className="space-y-3 text-xs">
          {loading ? (
            <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-spin" />
              <span className="text-xs text-emerald-400 animate-pulse">
                {language === 'EN' ? 'Gemini 3.6 Flash evaluating strategic vectors...' : 'Gemini 3.6 Flash stratejik vektörleri analiz ediyor...'}
              </span>
            </div>
          ) : error ? (
            <div className="p-3.5 bg-red-950/40 border border-red-800/80 rounded-xl text-red-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => fetchStrategyTip(true)}
                className="px-2 py-1 bg-red-900 hover:bg-red-800 text-white rounded text-[10px] font-bold"
              >
                {language === 'EN' ? 'Retry' : 'Tekrar Dene'}
              </button>
            </div>
          ) : tipData ? (
            <>
              {/* Headline Banner */}
              <div className="p-2.5 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/50 rounded-xl flex items-start gap-2.5 shadow-md">
                <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    {language === 'EN' ? 'STRATEGIC EVALUATION' : 'STRATEJİK DEĞERLENDİRME HEDEFİ'}
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs sm:text-sm mt-0.5 leading-snug">
                    {tipData.headline}
                  </h4>
                </div>
              </div>

              {/* Detailed Tactical Advice */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-sans text-xs sm:text-xs">
                <p>{tipData.recommendation}</p>
              </div>

              {/* Grid: Key Risks & Recommended Focus Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {/* Key Risks Column */}
                <div className="sm:col-span-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    {language === 'EN' ? 'CRITICAL RISK WATCHLIST:' : 'KRİTİK RİSK TAKİP LİSTESİ:'}
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {(tipData.keyRisks || []).map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 font-sans">
                        <span className="text-amber-500 font-mono font-bold">&gt;</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Priority Focus Metric Badge */}
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'EN' ? 'PRIORITY FOCUS:' : 'ÖNCELİKLİ METRİK:'}
                  </div>
                  <div className="mt-1">
                    <Tooltip code={focusKey} position="top">
                      <div className={`p-2 rounded-lg border text-center font-mono font-bold text-xs flex items-center justify-center gap-1.5 ${focusMetricInfo.color}`}>
                        <span>{focusKey}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </Tooltip>
                    <div className="text-[10px] text-slate-400 text-center mt-1 font-sans">
                      {language === 'EN' ? focusMetricInfo.nameEN : focusMetricInfo.nameTR}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
