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

    const isEn = language === 'EN';

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
    } catch {
      // Heuristic fallback (Static GitHub Pages resilience)
      const tp = stateVector.TP ?? 50;
      const kp = stateVector.KP ?? 40;
      const pid = stateVector.PID ?? 60;
      const gb = stateVector.GB ?? 40;
      const kd = stateVector.KD ?? 30;

      let headline = isEn ? 'STRATEGIC EQUILIBRIUM POSTURE' : 'STRATEJİK DENGELENME POZİSYONU';
      let rec = isEn
        ? 'Maintain balance between Grassroots Funds and Shadow Bureaucracy while keeping Currency Volatility controlled.'
        : 'Temiz Para rezervlerini korurken Gölge Bürokrasi ve Kur Dağınıklığı arasındaki hassas dengeyi muhafaza edin.';
      let focus = 'TP';
      const keyRisks: string[] = [];

      if (tp <= 20) {
        headline = isEn ? 'CRITICAL ALERT: CLEAN CAPITAL DEPLETION' : 'KRİTİK UYARI: TEMİZ PARA TÜKENMEK ÜZERE';
        rec = isEn
          ? 'Your grassroots capital is dangerously low. Prioritize directives that generate TP or lower expenses immediately.'
          : 'Temiz Para rezervleriniz tükenme eşiğinde. Acilen TP artıran ve maliyeti düşüren kararları önceliklendirin.';
        focus = 'TP';
        keyRisks.push(isEn ? 'Imminent insolvency collapse' : 'Finansal çöküş riski yüksek');
      } else if (kd >= 70) {
        headline = isEn ? 'HIGH VOLATILITY: CURRENCY SHOCK THREAT' : 'YÜKSEK RİSK: KUR ŞOKU SIKILAŞMASI';
        rec = isEn
          ? 'Currency volatility is escalating. Avoid high-risk financial decisions and stabilize market expectations.'
          : 'Kur dağınıklığı kritik seviyelerde. Piyasayı sarsacak yüksek riskli kararlardan kaçının.';
        focus = 'KD';
        keyRisks.push(isEn ? 'Market shock threshold approaching' : 'Piyasa kilitlenme riski artıyor');
      } else if (gb <= 20) {
        headline = isEn ? 'INSTITUTIONAL RISK: BUREAUCRACY EROSION' : 'KURUMSAL RİSK: BÜROKRATİK ERİME';
        rec = isEn
          ? 'Shadow Bureaucracy memory is fading. Strengthen institutional state apparatus before administrative collapse.'
          : 'Gölge Bürokrasi hafızası zayıflıyor. Devlet aygıtını destekleyecek idari adımlara odaklanın.';
        focus = 'GB';
        keyRisks.push(isEn ? 'Deep state memory loss' : 'Devlet yönetilemez hale gelebilir');
      } else if (kp >= 75 && pid <= 25) {
        headline = isEn ? 'OLIGARCHY RISK: DARK CAPITAL INFILTRATION' : 'OLİGARŞİ TEHDİDİ: KİRLİ PARA VESAYETİ';
        rec = isEn
          ? 'Dark capital dominance threatens internal party democracy. Reinforce PID to prevent oligarchic takeover.'
          : 'Kirli Para parti içi demokrasiyi esir alma noktasında. PID metriğini yükseltecek demokratik hamleler yapın.';
        focus = 'PID';
        keyRisks.push(isEn ? 'Oligarchic capture imminent' : 'Parti içi vesayet kilitlenmesi');
      }

      setTipData({
        headline,
        recommendation: rec,
        keyRisks: keyRisks.length ? keyRisks : [isEn ? 'Maintain strategic equilibrium' : 'Stratejik dengeyi koruyun'],
        recommendedFocusMetric: focus,
      });
      setLastTurnFetched(turn);
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
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  {language === 'EN' ? 'HEURISTIC // LIVE' : 'OTONOM // AKTİF'}
                </span>
              </h3>
            </div>
            <p className="text-[10px] text-slate-400">
              {language === 'EN' ? 'Real-time tactical intelligence' : 'Anlık taktik durum ve risk değerlendirmesi'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => fetchStrategyTip(true)}
            disabled={loading || isGameOver}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all disabled:opacity-50"
            title={language === 'EN' ? 'Refresh Briefing' : 'Analizi Yenile'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 transition-all"
            title={isExpanded ? (language === 'EN' ? 'Collapse' : 'Daralt') : (language === 'EN' ? 'Expand' : 'Genişlet')}
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Body */}
      {isExpanded && (
        <div className="space-y-3 animate-fadeIn">
          {error && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {tipData && (
            <>
              {/* Headline Banner */}
              <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    {tipData.headline}
                  </span>
                </div>

                {tipData.recommendedFocusMetric && (
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 flex items-center gap-1 ${focusMetricInfo.color}`}>
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{language === 'EN' ? 'PRIORITY:' : 'ÖNCELİK:'} {tipData.recommendedFocusMetric}</span>
                  </div>
                )}
              </div>

              {/* Tactical Recommendation */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                <p>{tipData.recommendation}</p>
              </div>

              {/* Key Risks Bullets */}
              {tipData.keyRisks && tipData.keyRisks.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] text-red-400/90 font-bold tracking-wider uppercase flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-red-400" />
                    {language === 'EN' ? 'IMMEDIATE VULNERABILITIES:' : 'ÖNCELİKLİ RİSK NOKTALARI:'}
                  </span>
                  <div className="grid grid-cols-1 gap-1 text-[11px]">
                    {tipData.keyRisks.map((risk, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-1.5 p-1.5 rounded-lg bg-red-950/20 border border-red-900/30 text-red-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
