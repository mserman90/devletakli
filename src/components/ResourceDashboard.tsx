import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  Landmark,
  Coins,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Scale,
  Gauge,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/soundEngine';
import { Tooltip } from './Tooltip';

export const ResourceDashboard: React.FC = () => {
  const { stateVector, history, language } = useGameStore();
  const [expandedMetric, setExpandedMetric] = useState<'POLITICAL' | 'FINANCIAL' | 'PUBLIC' | null>(null);

  const { TP, KP, PID, GB, OH, KD } = stateVector;

  // Calculate Primary Derived Variables
  // 1. Political Capital (Siyasi Sermaye): Weighted combination of Party Democracy & Shadow Bureaucracy
  const politicalCapital = Math.max(0, Math.min(100, Math.round(PID * 0.5 + GB * 0.5)));

  // 2. Financial Reserves (Finansal Rezervler): Clean & Dark capital adjusted for currency volatility strain
  const financialReserves = Math.max(0, Math.min(100, Math.round(TP * 0.6 + KP * 0.4 - KD * 0.2)));

  // 3. Public Support (Halk Desteği): Overton Hegemony & Party legitimacy minus corruption backlash & inflation fatigue
  const publicSupport = Math.max(0, Math.min(100, Math.round(OH * 0.5 + PID * 0.4 - (KP * 0.1) - (KD * 0.1))));

  // Calculate deltas from previous turn if history exists
  const prevTurnState = history.length > 1 ? history[history.length - 2].state : null;

  const prevPolitical = prevTurnState
    ? Math.max(0, Math.min(100, Math.round(prevTurnState.PID * 0.5 + prevTurnState.GB * 0.5)))
    : politicalCapital;

  const prevFinancial = prevTurnState
    ? Math.max(0, Math.min(100, Math.round(prevTurnState.TP * 0.6 + prevTurnState.KP * 0.4 - prevTurnState.KD * 0.2)))
    : financialReserves;

  const prevPublic = prevTurnState
    ? Math.max(0, Math.min(100, Math.round(prevTurnState.OH * 0.5 + prevTurnState.PID * 0.4 - (prevTurnState.KP * 0.1) - (prevTurnState.KD * 0.1))))
    : publicSupport;

  const politicalDelta = politicalCapital - prevPolitical;
  const financialDelta = financialReserves - prevFinancial;
  const publicDelta = publicSupport - prevPublic;

  // Overall State Index
  const averageIndex = Math.round((politicalCapital + financialReserves + publicSupport) / 3);

  const getStatusText = (val: number, type: 'POLITICAL' | 'FINANCIAL' | 'PUBLIC') => {
    if (language === 'EN') {
      if (type === 'POLITICAL') {
        if (val >= 70) return { label: 'DOMINANT COALITION', color: 'text-indigo-400 bg-indigo-950/80 border-indigo-700/60' };
        if (val >= 40) return { label: 'STABLE LEVERAGE', color: 'text-blue-400 bg-blue-950/80 border-blue-700/60' };
        return { label: 'PARLIAMENTARY FRAGMENTATION', color: 'text-red-400 bg-red-950/80 border-red-700/60 animate-pulse' };
      }
      if (type === 'FINANCIAL') {
        if (val >= 70) return { label: 'HIGH LIQUIDITY', color: 'text-emerald-400 bg-emerald-950/80 border-emerald-700/60' };
        if (val >= 40) return { label: 'BALANCED TREASURY', color: 'text-teal-400 bg-teal-950/80 border-teal-700/60' };
        return { label: 'RESERVE STRAIN', color: 'text-amber-400 bg-amber-950/80 border-amber-700/60 animate-pulse' };
      }
      // PUBLIC
      if (val >= 70) return { label: 'HEGEMONIC CONSENSUS', color: 'text-cyan-400 bg-cyan-950/80 border-cyan-700/60' };
      if (val >= 40) return { label: 'MODERATE SATISFACTION', color: 'text-sky-400 bg-sky-950/80 border-sky-700/60' };
      return { label: 'CIVIL UNREST RISK', color: 'text-red-400 bg-red-950/80 border-red-700/60 animate-pulse' };
    } else {
      if (type === 'POLITICAL') {
        if (val >= 70) return { label: 'BASKIN İKTİDAR', color: 'text-indigo-400 bg-indigo-950/80 border-indigo-700/60' };
        if (val >= 40) return { label: 'DENGELİ VESAYET', color: 'text-blue-400 bg-blue-950/80 border-blue-700/60' };
        return { label: 'SİYASİ PARÇALANMA', color: 'text-red-400 bg-red-950/80 border-red-700/60 animate-pulse' };
      }
      if (type === 'FINANCIAL') {
        if (val >= 70) return { label: 'YÜKSEK LİKİDİTE', color: 'text-emerald-400 bg-emerald-950/80 border-emerald-700/60' };
        if (val >= 40) return { label: 'DENGELİ REZERV', color: 'text-teal-400 bg-teal-950/80 border-teal-700/60' };
        return { label: 'REZERV DARBOĞAZI', color: 'text-amber-400 bg-amber-950/80 border-amber-700/60 animate-pulse' };
      }
      // PUBLIC
      if (val >= 70) return { label: 'HEGEMONİK MÜTABAKAT', color: 'text-cyan-400 bg-cyan-950/80 border-cyan-700/60' };
      if (val >= 40) return { label: 'PASİF KABULLENİŞ', color: 'text-sky-400 bg-sky-950/80 border-sky-700/60' };
      return { label: 'TOPLUMSAL TEPKİ RİSKİ', color: 'text-red-400 bg-red-950/80 border-red-700/60 animate-pulse' };
    }
  };

  const handleToggleExpand = (metric: 'POLITICAL' | 'FINANCIAL' | 'PUBLIC') => {
    soundEngine.playUI('SELECT');
    setExpandedMetric(expandedMetric === metric ? null : metric);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md font-mono text-xs text-slate-200">
      
      {/* Top Header & Stability Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-600/50 text-indigo-400 shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
                {language === 'EN' ? 'RESOURCE & MACRO BALANCE DASHBOARD' : 'KAYNAK VE MAKRO DENGELER PANOSU'}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              {language === 'EN'
                ? 'Core state resource indicators derived from 6D vector telemetry'
                : '6-Boyutlu telemetry verisinden türetilen temel devlet kaynak göstergeleri'}
            </p>
          </div>
        </div>

        {/* Global Macro Balance Rating */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
          <Scale className="w-4 h-4 text-emerald-400" />
          <div className="flex flex-col text-right">
            <span className="text-[9px] text-slate-400 uppercase">
              {language === 'EN' ? 'MACRO STABILITY INDEX' : 'MAKRO DENGE ENDEKSİ'}
            </span>
            <span className="font-bold text-xs text-emerald-400">
              %{averageIndex} {averageIndex >= 65 ? '• SAĞLAM' : averageIndex >= 40 ? '• HASSAS' : '• RİSKLİ'}
            </span>
          </div>
        </div>
      </div>

      {/* Critical Resource Alert Banner if any variable is below 30 */}
      {(politicalCapital < 30 || financialReserves < 30 || publicSupport < 30) && (
        <div className="mb-3.5 p-2.5 bg-red-950/80 border border-red-700/80 rounded-xl text-red-200 text-[11px] flex items-center gap-2 animate-pulse font-sans">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>
            <strong>{language === 'EN' ? 'CRITICAL RESOURCE WARNING:' : 'KRİTİK KAYNAK UYARISI:'}</strong>{' '}
            {language === 'EN'
              ? 'One or more core resource pillars dropped below safe operational limit (<30%). Immediate intervention required!'
              : 'Temel kaynak alanlarından biri güvenli kritik eşiğin (%30) altına düştü. Acil müdahale gerekli!'}
          </span>
        </div>
      )}

      {/* Grid of 3 Main Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* 1. Political Capital Card */}
        <div
          onClick={() => handleToggleExpand('POLITICAL')}
          className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            expandedMetric === 'POLITICAL'
              ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-950/30'
              : 'bg-slate-950/70 border-slate-800 hover:border-indigo-800/60 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-950/80 border border-indigo-800/80 text-indigo-400">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-100">
                  {language === 'EN' ? 'POLITICAL CAPITAL' : 'SİYASİ SERMAYE'}
                </span>
                <span className="block text-[9px] text-slate-400">PID + GB</span>
              </div>
            </div>

            <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${getStatusText(politicalCapital, 'POLITICAL').color}`}>
              {getStatusText(politicalCapital, 'POLITICAL').label}
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-xl font-bold font-mono text-indigo-300">%{politicalCapital}</span>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {politicalDelta !== 0 && (
                <span className={`flex items-center font-bold ${politicalDelta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {politicalDelta > 0 ? <TrendingUp className="w-3 h-3 inline mr-0.5" /> : <TrendingDown className="w-3 h-3 inline mr-0.5" />}
                  {politicalDelta > 0 ? `+${politicalDelta}` : politicalDelta}
                </span>
              )}
              {expandedMetric === 'POLITICAL' ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </div>
          </div>

          {/* Meter Bar */}
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500 rounded-full"
              style={{ width: `${politicalCapital}%` }}
            />
          </div>

          {/* Sub-Metric Preview pills */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <Tooltip code="PID">
              <span className="hover:text-indigo-300 cursor-help">PID: <strong className="text-slate-200 font-mono">%{PID}</strong></span>
            </Tooltip>
            <Tooltip code="GB">
              <span className="hover:text-indigo-300 cursor-help">GB: <strong className="text-slate-200 font-mono">%{GB}</strong></span>
            </Tooltip>
          </div>
        </div>

        {/* 2. Financial Reserves Card */}
        <div
          onClick={() => handleToggleExpand('FINANCIAL')}
          className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            expandedMetric === 'FINANCIAL'
              ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-950/30'
              : 'bg-slate-950/70 border-slate-800 hover:border-emerald-800/60 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-100">
                  {language === 'EN' ? 'FINANCIAL RESERVES' : 'FINANSAL REZERVLER'}
                </span>
                <span className="block text-[9px] text-slate-400">TP + KP - KD</span>
              </div>
            </div>

            <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${getStatusText(financialReserves, 'FINANCIAL').color}`}>
              {getStatusText(financialReserves, 'FINANCIAL').label}
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-xl font-bold font-mono text-emerald-300">%{financialReserves}</span>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {financialDelta !== 0 && (
                <span className={`flex items-center font-bold ${financialDelta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {financialDelta > 0 ? <TrendingUp className="w-3 h-3 inline mr-0.5" /> : <TrendingDown className="w-3 h-3 inline mr-0.5" />}
                  {financialDelta > 0 ? `+${financialDelta}` : financialDelta}
                </span>
              )}
              {expandedMetric === 'FINANCIAL' ? <ChevronUp className="w-3.5 h-3.5 text-emerald-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </div>
          </div>

          {/* Meter Bar */}
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-teal-600 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${financialReserves}%` }}
            />
          </div>

          {/* Sub-Metric Preview pills */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <Tooltip code="TP">
              <span className="hover:text-emerald-300 cursor-help">TP: <strong className="text-slate-200 font-mono">%{TP}</strong></span>
            </Tooltip>
            <Tooltip code="KP">
              <span className="hover:text-emerald-300 cursor-help">KP: <strong className="text-slate-200 font-mono">%{KP}</strong></span>
            </Tooltip>
            <Tooltip code="KD">
              <span className="hover:text-emerald-300 cursor-help">KD: <strong className="text-red-300 font-mono">%{KD}</strong></span>
            </Tooltip>
          </div>
        </div>

        {/* 3. Public Support Card */}
        <div
          onClick={() => handleToggleExpand('PUBLIC')}
          className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
            expandedMetric === 'PUBLIC'
              ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-950/30'
              : 'bg-slate-950/70 border-slate-800 hover:border-cyan-800/60 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-800/80 text-cyan-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-slate-100">
                  {language === 'EN' ? 'PUBLIC SUPPORT' : 'HALK DESTEĞİ'}
                </span>
                <span className="block text-[9px] text-slate-400">OH + PID - Inflation</span>
              </div>
            </div>

            <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${getStatusText(publicSupport, 'PUBLIC').color}`}>
              {getStatusText(publicSupport, 'PUBLIC').label}
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-xl font-bold font-mono text-cyan-300">%{publicSupport}</span>
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {publicDelta !== 0 && (
                <span className={`flex items-center font-bold ${publicDelta > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {publicDelta > 0 ? <TrendingUp className="w-3 h-3 inline mr-0.5" /> : <TrendingDown className="w-3 h-3 inline mr-0.5" />}
                  {publicDelta > 0 ? `+${publicDelta}` : publicDelta}
                </span>
              )}
              {expandedMetric === 'PUBLIC' ? <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </div>
          </div>

          {/* Meter Bar */}
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-600 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${publicSupport}%` }}
            />
          </div>

          {/* Sub-Metric Preview pills */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <Tooltip code="OH">
              <span className="hover:text-cyan-300 cursor-help">OH: <strong className="text-slate-200 font-mono">%{OH}</strong></span>
            </Tooltip>
            <Tooltip code="PID">
              <span className="hover:text-cyan-300 cursor-help">PID: <strong className="text-slate-200 font-mono">%{PID}</strong></span>
            </Tooltip>
          </div>
        </div>

      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {expandedMetric && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3.5 p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-sans text-xs space-y-2 overflow-hidden"
          >
            {expandedMetric === 'POLITICAL' && (
              <div>
                <h4 className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1 font-mono">
                  <Landmark className="w-4 h-4" />
                  {language === 'EN' ? 'POLITICAL CAPITAL DEEP BREAKDOWN' : 'SİYASİ SERMAYE DETAYLI ANALİZİ'}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  {language === 'EN' ? (
                    <>
                      Political Capital represents the party apparatus integrity and{' '}
                      <Tooltip code="BÜROKRATİK NÜFUZ">
                        <span className="text-indigo-300 font-semibold underline decoration-dotted">bureaucratic command power</span>
                      </Tooltip>
                      . High levels allow passing controversial decrees without institutional resistance.
                    </>
                  ) : (
                    <>
                      Siyasi Sermaye, parti örgütlü sadakati ile{' '}
                      <Tooltip code="BÜROKRATİK NÜFUZ">
                        <span className="text-indigo-300 font-semibold underline decoration-dotted">bürokratik nüfuz ve sevk gücünün</span>
                      </Tooltip>{' '}
                      bileşimidir. Yüksek seviye, sert kararların dirençsiz uygulanmasını sağlar.
                    </>
                  )}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <Tooltip code="PID">
                      <span className="text-slate-400 block text-[9px] cursor-help hover:text-indigo-300">PARTİ İÇİ DEMOKRASİ (PID)</span>
                    </Tooltip>
                    <span className="font-bold text-slate-100">%{PID} / 100</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <Tooltip code="GB">
                      <span className="text-slate-400 block text-[9px] cursor-help hover:text-indigo-300">GÖLGE BÜROKRASİ / NÜFUZ (GB)</span>
                    </Tooltip>
                    <span className="font-bold text-slate-100">%{GB} / 100</span>
                  </div>
                </div>
              </div>
            )}

            {expandedMetric === 'FINANCIAL' && (
              <div>
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1 font-mono">
                  <Coins className="w-4 h-4" />
                  {language === 'EN' ? 'FINANCIAL RESERVES DEEP BREAKDOWN' : 'FINANSAL REZERVLER DETAYLI ANALİZİ'}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  {language === 'EN'
                    ? 'Financial Reserves determine public treasury solvency and capital mobility. High Currency Volatility (KD) drains liquidity reserves rapidly.'
                    : 'Finansal Rezervler, kamu hazinesinin ödeme kabiliyetini temsil eder. Kur Dağınıklığı (KD) arttıkça likidite rezervleri baskı altına girer.'}
                </p>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">TEMİZ PARA (TP)</span>
                    <span className="font-bold text-emerald-300">%{TP}</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">KİRLİ PARA (KP)</span>
                    <span className="font-bold text-red-300">%{KP}</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">KUR BASKISI (KD)</span>
                    <span className="font-bold text-amber-300">-%{KD}</span>
                  </div>
                </div>
              </div>
            )}

            {expandedMetric === 'PUBLIC' && (
              <div>
                <h4 className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1 font-mono">
                  <Users className="w-4 h-4" />
                  {language === 'EN' ? 'PUBLIC SUPPORT DEEP BREAKDOWN' : 'HALK DESTEĞİ DETAYLI ANALİZİ'}
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  {language === 'EN' ? (
                    <>
                      Public Support measures grassroots legitimacy and{' '}
                      <Tooltip code="KAMUOYU HEGEMONYASI">
                        <span className="text-cyan-300 font-semibold underline decoration-dotted">public opinion & discourse hegemony</span>
                      </Tooltip>
                      . If it drops critically, civil unrest and street protests will escalate.
                    </>
                  ) : (
                    <>
                      Halk Desteği, kitle meşruiyeti ve{' '}
                      <Tooltip code="KAMUOYU HEGEMONYASI">
                        <span className="text-cyan-300 font-semibold underline decoration-dotted">kamuoyu hegemonyasının</span>
                      </Tooltip>{' '}
                      bütünleşmiş halidir. Tehlikeli seviyelere düşmesi halinde kitle hareketleri tetiklenir.
                    </>
                  )}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <Tooltip code="OH">
                      <span className="text-slate-400 block text-[9px] cursor-help hover:text-cyan-300">KAMUOYU HEGEMONYASI (OH)</span>
                    </Tooltip>
                    <span className="font-bold text-cyan-300">%{OH}</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                    <Tooltip code="PID">
                      <span className="text-slate-400 block text-[9px] cursor-help hover:text-blue-300">TABAN DEMOKRASİSİ (PID)</span>
                    </Tooltip>
                    <span className="font-bold text-blue-300">%{PID}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
