import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Info, TrendingUp, DollarSign, Users, Shield, Landmark, Globe } from 'lucide-react';
import { StateVector } from '../types/game';
import { Tooltip } from './Tooltip';
import { UI_TRANSLATIONS } from '../utils/translations';

interface VariableMeta {
  key: keyof StateVector;
  label: string;
  fullNameTR: string;
  fullNameEN: string;
  color: string;
  icon: React.ReactNode;
  descTR: string;
  descEN: string;
}

const METRICS: VariableMeta[] = [
  {
    key: 'TP',
    label: 'TP',
    fullNameTR: 'Temiz Para (Taban Fonu)',
    fullNameEN: 'Clean Capital (Grassroots Fund)',
    color: '#10b981', // emerald
    icon: <DollarSign className="w-3.5 h-3.5 text-emerald-400" />,
    descTR: 'Finansal özerklik ve taban kitlesel fonlaması.',
    descEN: 'Financial autonomy and public crowdfunding.',
  },
  {
    key: 'KP',
    label: 'KP',
    fullNameTR: 'Kirli Para (Holding Fonu)',
    fullNameEN: 'Dark Capital (Corporate Fund)',
    color: '#ef4444', // red
    icon: <DollarSign className="w-3.5 h-3.5 text-red-400" />,
    descTR: 'Holding bağışları ve sistem bağımlılığı.',
    descEN: 'Corporate donations and system dependency.',
  },
  {
    key: 'PID',
    label: 'PID',
    fullNameTR: 'Parti İçi Demokrasi',
    fullNameEN: 'Party Democracy',
    color: '#3b82f6', // blue
    icon: <Users className="w-3.5 h-3.5 text-blue-400" />,
    descTR: 'Oligarşileşme direnci ve taban denetimi.',
    descEN: 'Resistance to oligarchy and grassroots control.',
  },
  {
    key: 'GB',
    label: 'GB',
    fullNameTR: 'Bürokratik Nüfuz & Gölge Bürokrasi',
    fullNameEN: 'Bureaucratic Influence & Shadow Bureaucracy',
    color: '#8b5cf6', // purple
    icon: <Shield className="w-3.5 h-3.5 text-purple-400" />,
    descTR: 'Bürokratik vesayet, kurumsal hafıza ve teknokratik sevk gücü.',
    descEN: 'Bureaucratic tutelage, institutional memory, and technocratic authority.',
  },
  {
    key: 'OH',
    label: 'OH',
    fullNameTR: 'Kamuoyu & Söylem Hegemonyası',
    fullNameEN: 'Public Opinion & Discourse Hegemony',
    color: '#f59e0b', // amber
    icon: <Landmark className="w-3.5 h-3.5 text-amber-400" />,
    descTR: 'Otonom medya, kamuoyu algısı ve söylem hakimiyeti.',
    descEN: 'Autonomous media, public perception, and discourse dominance.',
  },
  {
    key: 'KD',
    label: 'KD',
    fullNameTR: 'Kur Dağınıklığı',
    fullNameEN: 'Exchange Volatility',
    color: '#ec4899', // pink
    icon: <Globe className="w-3.5 h-3.5 text-pink-400" />,
    descTR: 'Piyasa baskısı ve kur volatilitesi.',
    descEN: 'Market pressure and exchange rate volatility.',
  },
];

export const TelemetryPanel: React.FC = () => {
  const { stateVector, history, language } = useGameStore();

  const t = UI_TRANSLATIONS[language].telemetry;

  const chartData = history.map((item) => ({
    turn: `T${item.turn}`,
    ...item.state,
  }));

  return (
    <div className="bg-[#fffbeb] text-slate-900 border-2 border-amber-900/50 rounded-sm p-3 sm:p-4 flex flex-col h-full shadow-2xl relative font-sans select-none md:rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
      
      {/* Top Metallic Clipboard Clip */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-md border border-slate-600 shadow-md flex items-center justify-center">
        <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
      </div>

      {/* Official State Seal Stamp */}
      <div className="absolute top-3 right-3 text-emerald-800/80 font-bold text-[9px] font-mono border border-emerald-800/40 px-2 py-0.5 rounded rotate-[-6deg] uppercase tracking-widest bg-emerald-50">
        {language === 'EN' ? 'OFFICIAL REPORT // VERIFIED' : 'MÜESSES RAPOR // ONAYLI'}
      </div>

      {/* Dossier Header */}
      <div className="pt-2 pb-2.5 border-b-2 border-amber-900/30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-amber-900 text-amber-100 rounded">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-black text-amber-950 uppercase tracking-widest font-serif">{t.title}</h2>
            <p className="text-[10px] font-mono text-amber-900/70">{language === 'EN' ? '6-Dimensional Strategic Resource Report' : '6-Boyutlu Stratejik Kaynak Raporu'}</p>
          </div>
        </div>
      </div>

      {/* Paper Metric Progress Bars */}
      <div className="my-2.5 space-y-2">
        <h3 className="text-[10px] font-mono font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-700" /> {language === 'EN' ? 'OFFICIAL VECTOR VALUES:' : 'RESMİ METRİK DEĞERLERİ:'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {METRICS.map((m) => {
            const val = stateVector[m.key];
            const fullName = language === 'EN' ? m.fullNameEN : m.fullNameTR;
            const desc = language === 'EN' ? m.descEN : m.descTR;
            return (
              <Tooltip key={m.key} code={m.key} customTitle={fullName} customDesc={desc} className="w-full">
                <div className="w-full p-1.5 bg-amber-100/60 border border-amber-800/20 rounded text-xs font-mono">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="flex items-center gap-1 font-bold text-amber-950 text-[11px]">
                      {m.icon}
                      {m.label}:
                    </span>
                    <span className="font-extrabold text-[11px]" style={{ color: m.color }}>
                      {val.toFixed(1)} / 100
                    </span>
                  </div>

                  <div className="w-full bg-amber-200/90 h-2 rounded-full overflow-hidden border border-amber-800/20">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(0, val))}%`,
                        backgroundColor: m.color,
                      }}
                    />
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Historical Graph Paper */}
      <div className="flex-1 mt-1 border border-amber-900/30 rounded p-2 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:12px_12px] bg-amber-50/90 flex flex-col min-h-[190px] shadow-inner relative">
        
        {/* Paper Clip Graphic in corner */}
        <div className="absolute -top-2 right-2 w-3 h-6 border-2 border-slate-500 rounded-t-full bg-slate-300 shadow-sm" />

        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold text-amber-950 flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-800" /> {language === 'EN' ? 'POLITICAL TREND GRAPH (TURNS):' : 'SİYASİ EĞİLİM GRAFİĞİ (TURLAR):'}
          </span>
        </div>

        <div className="flex-1 w-full h-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="turn" stroke="#78350f" fontSize={9} tickLine={false} fontFamily="monospace" />
              <YAxis domain={[0, 100]} stroke="#78350f" fontSize={9} tickLine={false} fontFamily="monospace" />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: '#fef3c7',
                  borderColor: '#92400e',
                  borderRadius: '0.25rem',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: '#451a03',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '9px', paddingTop: '2px', fontFamily: 'monospace' }} />
              {METRICS.map((m) => (
                <Line
                  key={m.key}
                  type="monotone"
                  dataKey={m.key}
                  stroke={m.color}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
