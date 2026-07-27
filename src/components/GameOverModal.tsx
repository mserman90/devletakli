import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Award, AlertTriangle, ShieldX, Skull, RotateCcw, Activity } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const GameOverModal: React.FC = () => {
  const { isGameOver, gameOverReason, resetGame, turn, stateVector, language } = useGameStore();

  if (!isGameOver) return null;

  const handleRestart = () => {
    soundEngine.playUI('SELECT');
    resetGame();
  };

  const getModalDetails = () => {
    switch (gameOverReason) {
      case 'VICTORY':
        return {
          title: language === 'EN' ? 'VICTORY: SOVEREIGN STATE POWER ESTABLISHED!' : 'ZAFER: DEVLET AKLI VE TAM EGEMENLİK KURULDU!',
          subtitle: language === 'EN' ? 'The national establishment has been stabilized, and public sovereignty has triumphed without bowing to global capital.' : 'Ulusal müesses nizam vesayet altına alınmış, küresel sermayeye boyun eğilmeden halk iradesi zafer kazanmıştır.',
          icon: <Award className="w-16 h-16 text-emerald-400 animate-bounce" />,
          borderColor: 'border-emerald-500',
          bgColor: 'bg-emerald-950/90',
          textColor: 'text-emerald-300',
        };

      case 'BANKRUPT_DEFEAT':
        return {
          title: language === 'EN' ? 'COLLAPSE: FINANCIAL BANKRUPTCY & CURRENCY SHOCK!' : 'ÇÖKÜŞ: FİNANSAL İFLAS VE KUR ŞOKU!',
          subtitle: language === 'EN' ? 'Clean Capital depleted or Currency Volatility reached peak levels. Markets locked down, economy collapsed.' : 'Temiz para tükendi veya Kur Dağınıklığı (KD) tavan yaptı. Piyasalar kilitlendi, ekonomi çöktü.',
          icon: <Skull className="w-16 h-16 text-red-500 animate-pulse" />,
          borderColor: 'border-red-600',
          bgColor: 'bg-red-950/90',
          textColor: 'text-red-300',
        };

      case 'AUTOCRACY_DEFEAT':
        return {
          title: language === 'EN' ? 'INTERVENTION: OLIGARCHIC TAKE OVER' : 'MÜDAHALE: OLİGARŞİK YOZLAŞMA VE OLİGARK ELE GEÇİRMESİ',
          subtitle: language === 'EN' ? 'Dark Capital captured the party and Internal Party Democracy was wiped out. The movement strayed entirely from its core principles.' : 'Kirli Para (KP) partiyi esir aldı, Parti İçi Demokrasi (PID) sıfırlandı. Parti amacından tamamen saptı.',
          icon: <AlertTriangle className="w-16 h-16 text-amber-500 animate-pulse" />,
          borderColor: 'border-amber-600',
          bgColor: 'bg-amber-950/90',
          textColor: 'text-amber-300',
        };

      case 'DEEP_STATE_DEFEAT':
      default:
        return {
          title: language === 'EN' ? 'PURGE: BUREAUCRATIC DISSOLUTION' : 'TASFİYE: BÜROKRATİK ERİME VE DEVLET DIŞINA İTİLME',
          subtitle: language === 'EN' ? 'Shadow Bureaucracy was completely dismantled. Institutional memory eroded, rendering state administration unmanageable.' : 'Gölge Bürokrasi (GB) tamamen tasfiye edildi. Kurumsal hafıza yok olduğu için devlet yönetilemez hale geldi.',
          icon: <ShieldX className="w-16 h-16 text-purple-500 animate-pulse" />,
          borderColor: 'border-purple-600',
          bgColor: 'bg-purple-950/90',
          textColor: 'text-purple-300',
        };
    }
  };

  const details = getModalDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full max-w-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 shadow-2xl bg-slate-900 ${details.borderColor} text-slate-100 flex flex-col items-center text-center relative overflow-hidden max-h-[95vh] overflow-y-auto`}
      >
        {/* Top Icon */}
        <div className="p-3 sm:p-4 rounded-full bg-slate-950 border border-slate-800 my-1.5 sm:my-2">{details.icon}</div>

        {/* Title */}
        <h2 className={`text-base sm:text-xl md:text-2xl font-black uppercase tracking-wide mt-1 sm:mt-2 ${details.textColor}`}>
          {details.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 sm:mt-2 max-w-md leading-relaxed">{details.subtitle}</p>

        {/* Telemetry Summary Card */}
        <div className="w-full bg-slate-950/80 rounded-xl p-3 sm:p-4 my-3 sm:my-5 border border-slate-800 text-[11px] sm:text-xs font-mono text-left">
          <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-slate-800">
            <span className="text-slate-400 font-bold flex items-center gap-1 text-[11px] sm:text-xs">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" /> {language === 'EN' ? 'FINAL SIMULATION REPORT:' : 'SON SİMÜLASYON RAPORU:'}
            </span>
            <span className="text-emerald-400 font-bold text-[11px] sm:text-xs">{language === 'EN' ? 'TOTAL TURNS:' : 'TOPLAM TUR:'} {turn}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 text-slate-300 text-[11px] sm:text-xs">
            <div>TP ({language === 'EN' ? 'Clean Capital' : 'Temiz Para'}): <span className="font-bold text-emerald-400">{stateVector.TP.toFixed(1)}</span></div>
            <div>KP ({language === 'EN' ? 'Dark Capital' : 'Kirli Para'}): <span className="font-bold text-red-400">{stateVector.KP.toFixed(1)}</span></div>
            <div>PID ({language === 'EN' ? 'Democracy' : 'Demokrasi'}): <span className="font-bold text-blue-400">{stateVector.PID.toFixed(1)}</span></div>
            <div>GB ({language === 'EN' ? 'Bureaucracy' : 'Bürokrasi'}): <span className="font-bold text-purple-400">{stateVector.GB.toFixed(1)}</span></div>
            <div>OH (Overton): <span className="font-bold text-amber-400">{stateVector.OH.toFixed(1)}</span></div>
            <div>KD ({language === 'EN' ? 'Volatility' : 'Kur Volatilitesi'}): <span className="font-bold text-pink-400">{stateVector.KD.toFixed(1)}</span></div>
          </div>
        </div>

        {/* Restart Button */}
        <button
          id="btn-modal-restart"
          onClick={handleRestart}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{language === 'EN' ? 'START NEW SIMULATION SESSION' : 'YENİ SİMÜLASYON OTURUMU BAŞLAT'}</span>
        </button>
      </div>
    </div>
  );
};
