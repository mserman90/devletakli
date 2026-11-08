import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Award, AlertTriangle, ShieldX, Skull, RotateCcw, Activity, Copy, Check, FileText } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Tooltip } from './Tooltip';

export const GameOverModal: React.FC = () => {
  const { isGameOver, gameOverReason, resetGame, turn, stateVector, language } = useGameStore();
  const [copied, setCopied] = useState(false);

  if (!isGameOver) return null;

  const isEn = language === 'EN';

  const handleRestart = () => {
    soundEngine.playUI('SELECT');
    resetGame();
  };

  const calculateGrade = () => {
    if (gameOverReason === 'VICTORY') {
      return stateVector.TP >= 70 && stateVector.KD <= 35 ? 'A+' : 'A';
    }
    if (turn >= 18) return 'B+';
    if (turn >= 12) return 'B';
    if (turn >= 6) return 'C';
    return 'F';
  };

  const calculateArchetype = () => {
    if (stateVector.TP >= 65 && stateVector.PID >= 60) {
      return isEn ? 'Grassroots Sovereign Democrat' : 'Demokratik Halk Egemeni';
    }
    if (stateVector.GB >= 65) {
      return isEn ? 'Technocratic Institutionalist' : 'Teknokratik Restorasyoncu';
    }
    if (stateVector.OH >= 65) {
      return isEn ? 'Discourse & Media Hegemon' : 'Söylem ve Kamuoyu Lideri';
    }
    if (stateVector.KP >= 65) {
      return isEn ? 'Oligarchic Negotiator' : 'Holding ve Sermaye Dengecisi';
    }
    if (stateVector.KD >= 75) {
      return isEn ? 'Market Shock Casualty' : 'Piyasa Çalkantısı Kurbanı';
    }
    return isEn ? 'Prudent Equilibrium Strategist' : 'İhtiyatlı Denge Stratejisti';
  };

  const grade = calculateGrade();
  const archetype = calculateArchetype();

  const handleCopyReport = () => {
    soundEngine.playUI('SELECT');
    const reportText = `=========================================
DEVLET AKLI - HÜKÜMET STALİYON VE BİLANÇO RAPORU
=========================================
Tarih: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}
Sonuç: ${gameOverReason}
Liderlik Notu: ${grade}
Yönetim Arketipi: ${archetype}
Hayatta Kalınan Tur: ${turn}

6-BOYUTLU NİHAİ DEVLET VEKTÖRÜ:
- TP (Temiz Para / Taban Fonu): ${stateVector.TP.toFixed(1)} / 100
- KP (Kirli Para / Holding Fonu): ${stateVector.KP.toFixed(1)} / 100
- PID (Parti İçi Demokrasi): ${stateVector.PID.toFixed(1)} / 100
- GB (Gölge Bürokrasi / Hafıza): ${stateVector.GB.toFixed(1)} / 100
- OH (Overton / Kamuoyu Hegemonyası): ${stateVector.OH.toFixed(1)} / 100
- KD (Kur Dağınıklığı / Volatilite): ${stateVector.KD.toFixed(1)} / 100
=========================================
https://github.com/mserman90/devletakli`;

    navigator.clipboard.writeText(reportText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  const getModalDetails = () => {
    switch (gameOverReason) {
      case 'VICTORY':
        return {
          title: isEn ? 'VICTORY: SOVEREIGN STATE POWER ESTABLISHED!' : 'ZAFER: DEVLET AKLI VE TAM EGEMENLİK KURULDU!',
          subtitle: isEn
            ? 'The national establishment has been stabilized, and public sovereignty has triumphed without bowing to global capital.'
            : 'Ulusal müesses nizam vesayet altına alınmış, küresel sermayeye boyun eğilmeden halk iradesi zafer kazanmıştır.',
          icon: <Award className="w-16 h-16 text-emerald-400 animate-bounce" />,
          borderColor: 'border-emerald-500',
          textColor: 'text-emerald-300',
        };

      case 'BANKRUPT_DEFEAT':
        return {
          title: isEn ? 'COLLAPSE: FINANCIAL BANKRUPTCY & CURRENCY SHOCK!' : 'ÇÖKÜŞ: FİNANSAL İFLAS VE KUR ŞOKU!',
          subtitle: isEn
            ? 'Clean Capital depleted or Currency Volatility reached peak levels. Markets locked down, economy collapsed.'
            : 'Temiz para tükendi veya Kur Dağınıklığı (KD) tavan yaptı. Piyasalar kilitlendi, ekonomi çöktü.',
          icon: <Skull className="w-16 h-16 text-red-500 animate-pulse" />,
          borderColor: 'border-red-600',
          textColor: 'text-red-300',
        };

      case 'AUTOCRACY_DEFEAT':
        return {
          title: isEn ? 'INTERVENTION: OLIGARCHIC TAKE OVER' : 'MÜDAHALE: OLİGARŞİK YOZLAŞMA VE OLİGARK ELE GEÇİRMESİ',
          subtitle: isEn
            ? 'Dark Capital captured the party and Internal Party Democracy was wiped out. The movement strayed entirely from its core principles.'
            : 'Kirli Para (KP) partiyi esir aldı, Parti İçi Demokrasi (PID) sıfırlandı. Parti amacından tamamen saptı.',
          icon: <AlertTriangle className="w-16 h-16 text-amber-500 animate-pulse" />,
          borderColor: 'border-amber-600',
          textColor: 'text-amber-300',
        };

      case 'DEEP_STATE_DEFEAT':
      default:
        return {
          title: isEn ? 'PURGE: BUREAUCRATIC DISSOLUTION' : 'TASFİYE: BÜROKRATİK ERİME VE DEVLET DIŞINA İTİLME',
          subtitle: isEn
            ? 'Shadow Bureaucracy was completely dismantled. Institutional memory eroded, rendering state administration unmanageable.'
            : 'Gölge Bürokrasi (GB) tamamen tasfiye edildi. Kurumsal hafıza yok olduğu için devlet yönetilemez hale geldi.',
          icon: <ShieldX className="w-16 h-16 text-purple-500 animate-pulse" />,
          borderColor: 'border-purple-600',
          textColor: 'text-purple-300',
        };
    }
  };

  const details = getModalDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div
        className={`w-full max-w-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 shadow-2xl bg-slate-900 ${details.borderColor} text-slate-100 flex flex-col items-center text-center relative overflow-hidden max-h-[88dvh] overflow-y-auto`}
      >
        {/* Top Icon */}
        <div className="p-3 sm:p-4 rounded-full bg-slate-950 border border-slate-800 my-1.5 sm:my-2">{details.icon}</div>

        {/* Title */}
        <h2 className={`text-base sm:text-xl md:text-2xl font-black uppercase tracking-wide mt-1 sm:mt-2 ${details.textColor}`}>
          {details.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 sm:mt-2 max-w-md leading-relaxed">{details.subtitle}</p>

        {/* Performance Grade & Archetype Badge */}
        <div className="w-full bg-slate-950/90 rounded-xl p-3 sm:p-4 my-3 border border-slate-800 flex items-center justify-around font-mono text-left">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">{isEn ? 'LEADERSHIP GRADE' : 'LİDERLİK NOTU'}</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{grade}</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">{isEn ? 'GOVERNANCE ARCHETYPE' : 'YÖNETİM ARKETİPİ'}</span>
            <span className="text-xs sm:text-sm font-bold text-indigo-300">{archetype}</span>
          </div>
        </div>

        {/* Telemetry Summary Card */}
        <div className="w-full bg-slate-950/80 rounded-xl p-3 sm:p-4 mb-3 border border-slate-800 text-[11px] sm:text-xs font-mono text-left">
          <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-slate-800">
            <span className="text-slate-400 font-bold flex items-center gap-1 text-[11px] sm:text-xs">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              {isEn ? 'FINAL STATE VECTOR:' : 'NİHAİ DEVLET VEKTÖRÜ:'}
            </span>
            <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">
              {isEn ? 'TURNS:' : 'TUR:'} {turn}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-slate-300 text-[11px] sm:text-xs">
            <Tooltip code="TP"><div>TP ({isEn ? 'Clean Capital' : 'Temiz Para'}): <span className="font-bold text-emerald-400">{stateVector.TP.toFixed(1)}</span></div></Tooltip>
            <Tooltip code="KP"><div>KP ({isEn ? 'Dark Capital' : 'Kirli Para'}): <span className="font-bold text-red-400">{stateVector.KP.toFixed(1)}</span></div></Tooltip>
            <Tooltip code="PID"><div>PID ({isEn ? 'Democracy' : 'Demokrasi'}): <span className="font-bold text-blue-400">{stateVector.PID.toFixed(1)}</span></div></Tooltip>
            <Tooltip code="BÜROKRATİK NÜFUZ"><div>GB ({isEn ? 'Bureaucracy' : 'Bürokratik Nüfuz'}): <span className="font-bold text-purple-400">{stateVector.GB.toFixed(1)}</span></div></Tooltip>
            <Tooltip code="KAMUOYU HEGEMONYASI"><div>OH ({isEn ? 'Public Hegemony' : 'Kamuoyu Hegemonyası'}): <span className="font-bold text-amber-400">{stateVector.OH.toFixed(1)}</span></div></Tooltip>
            <Tooltip code="KD"><div>KD ({isEn ? 'Volatility' : 'Kur Volatilitesi'}): <span className="font-bold text-pink-400">{stateVector.KD.toFixed(1)}</span></div></Tooltip>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          <button
            onClick={handleCopyReport}
            className="w-full py-2.5 px-4 rounded-xl font-bold font-mono text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-600/40 shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isEn ? 'DOSSIER COPIED!' : 'BİLANÇO KOPYALANDI!') : (isEn ? 'COPY EXECUTIVE DOSSIER' : 'HÜKÜMET BİLANÇO RAPORUNU KOPYALA')}</span>
          </button>

          <button
            id="btn-modal-restart"
            onClick={handleRestart}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{isEn ? 'START NEW SIMULATION SESSION' : 'YENİ SİMÜLASYON OTURUMU BAŞLAT'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
