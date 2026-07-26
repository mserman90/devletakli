import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Info, TrendingUp, DollarSign, Users, Shield, Landmark, Globe } from 'lucide-react';
import { StateVector } from '../types/game';

interface VariableMeta {
  key: keyof StateVector;
  label: string;
  fullName: string;
  color: string;
  icon: React.ReactNode;
  desc: string;
}

const METRICS: VariableMeta[] = [
  {
    key: 'TP',
    label: 'TP',
    fullName: 'Temiz Para (Taban Fonu)',
    color: '#10b981', // emerald
    icon: <DollarSign className="w-3.5 h-3.5 text-emerald-400" />,
    desc: 'Finansal özerklik ve taban kitlesel fonlaması.',
  },
  {
    key: 'KP',
    label: 'KP',
    fullName: 'Kirli Para (Holding Fonu)',
    color: '#ef4444', // red
    icon: <DollarSign className="w-3.5 h-3.5 text-red-400" />,
    desc: 'Holding bağışları ve sistem bağımlılığı.',
  },
  {
    key: 'PID',
    label: 'PID',
    fullName: 'Parti İçi Demokrasi',
    color: '#3b82f6', // blue
    icon: <Users className="w-3.5 h-3.5 text-blue-400" />,
    desc: 'Oligarşileşme direnci ve taban denetimi.',
  },
  {
    key: 'GB',
    label: 'GB',
    fullName: 'Gölge Bürokrasi',
    color: '#8b5cf6', // purple
    icon: <Shield className="w-3.5 h-3.5 text-purple-400" />,
    desc: 'Kurumsal hafıza ve teknokratik güç.',
  },
  {
    key: 'OH',
    label: 'OH',
    fullName: 'Overton Hegemonyası',
    color: '#f59e0b', // amber
    icon: <Landmark className="w-3.5 h-3.5 text-amber-400" />,
    desc: 'Otonom medya ve söylem hakimiyeti.',
  },
  {
    key: 'KD',
    label: 'KD',
    fullName: 'Kur Dağınıklığı',
    color: '#ec4899', // pink
    icon: <Globe className="w-3.5 h-3.5 text-pink-400" />,
    desc: 'Piyasa baskısı ve kur volatilitesi.',
  },
];

export const TelemetryPanel: React.FC = () => {
  const { stateVector, history } = useGameStore();

  const chartData = history.map((item) => ({
    turn: `T${item.turn}`,
    ...item.state,
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-full shadow-md text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-blue-950 text-blue-400 rounded-md border border-blue-800/50">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">TELEMETRİ VE DURUM VEKTÖRÜ</h2>
            <p className="text-[11px] text-slate-400">Recharts Zaman Serisi & Analitik</p>
          </div>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
          VEKTÖR: 6-BOYUTLU
        </div>
      </div>

      {/* Progress Bars Matrix */}
      <div className="my-3 space-y-2.5">
        <h3 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-400" /> ANLIK METRİK DEĞERLERİ:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {METRICS.map((m) => {
            const val = stateVector[m.key];
            return (
              <div
                key={m.key}
                className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs hover:border-slate-700 transition-all group relative"
              >
                <div className="flex items-center justify-between font-mono mb-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-300">
                    {m.icon}
                    {m.label}:
                  </span>
                  <span className="font-bold" style={{ color: m.color }}>
                    {val.toFixed(1)} / 100
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(0, val))}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>

                {/* Tooltip info on hover */}
                <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{m.fullName}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Telemetry Recharts Chart */}
      <div className="flex-1 mt-2 border border-slate-800/80 rounded-lg p-2.5 bg-slate-950/40 flex flex-col min-h-[220px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Info className="w-3 h-3 text-blue-400" /> EĞİLİM GRAFİĞİ (TURLAR):
          </span>
        </div>

        <div className="flex-1 w-full h-full min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="turn" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }} />
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
