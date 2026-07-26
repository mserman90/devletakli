import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Award, AlertTriangle, ShieldX, Skull, RotateCcw, Activity } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const GameOverModal: React.FC = () => {
  const { isGameOver, gameOverReason, resetGame, turn, stateVector } = useGameStore();

  if (!isGameOver) return null;

  const handleRestart = () => {
    soundEngine.playUI('SELECT');
    resetGame();
  };

  const getModalDetails = () => {
    switch (gameOverReason) {
      case 'VICTORY':
        return {
          title: 'ZAFER: DEVLET AKLI VE TAM EGEMENLİK KURULDU!',
          subtitle: 'Ulusal müesses nizam vesayet altına alınmış, küresel sermayeye boyun eğilmeden halk iradesi zafer kazanmıştır.',
          icon: <Award className="w-16 h-16 text-emerald-400 animate-bounce" />,
          borderColor: 'border-emerald-500',
          bgColor: 'bg-emerald-950/90',
          textColor: 'text-emerald-300',
        };

      case 'BANKRUPT_DEFEAT':
        return {
          title: 'ÇÖKÜŞ: FİNANSAL İFLAS VE KUR ŞOKU!',
          subtitle: 'Temiz para tükendi veya Kur Dağınıklığı (KD) tavan yaptı. Piyasalar kilitlendi, ekonomi çöktü.',
          icon: <Skull className="w-16 h-16 text-red-500 animate-pulse" />,
          borderColor: 'border-red-600',
          bgColor: 'bg-red-950/90',
          textColor: 'text-red-300',
        };

      case 'AUTOCRACY_DEFEAT':
        return {
          title: 'MÜDAHALE: OLİGARŞİK YOZLAŞMA VE OLİGARK ELE GEÇİRMESİ',
          subtitle: 'Kirli Para (KP) partiyi esir aldı, Parti İçi Demokrasi (PID) sıfırlandı. Parti amacından tamamen saptı.',
          icon: <AlertTriangle className="w-16 h-16 text-amber-500 animate-pulse" />,
          borderColor: 'border-amber-600',
          bgColor: 'bg-amber-950/90',
          textColor: 'text-amber-300',
        };

      case 'DEEP_STATE_DEFEAT':
      default:
        return {
          title: 'TASFİYE: BÜROKRATİK ERİME VE DEVLET DIŞINA İTİLME',
          subtitle: 'Gölge Bürokrasi (GB) tamamen tasfiye edildi. Kurumsal hafıza yok olduğu için devlet yönetilemez hale geldi.',
          icon: <ShieldX className="w-16 h-16 text-purple-500 animate-pulse" />,
          borderColor: 'border-purple-600',
          bgColor: 'bg-purple-950/90',
          textColor: 'text-purple-300',
        };
    }
  };

  const details = getModalDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full max-w-xl p-6 rounded-2xl border-2 shadow-2xl bg-slate-900 ${details.borderColor} text-slate-100 flex flex-col items-center text-center relative overflow-hidden`}
      >
        {/* Top Icon */}
        <div className="p-4 rounded-full bg-slate-950 border border-slate-800 my-2">{details.icon}</div>

        {/* Title */}
        <h2 className={`text-xl md:text-2xl font-black uppercase tracking-wide mt-2 ${details.textColor}`}>
          {details.title}
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-md leading-relaxed">{details.subtitle}</p>

        {/* Telemetry Summary Card */}
        <div className="w-full bg-slate-950/80 rounded-xl p-4 my-5 border border-slate-800 text-xs font-mono text-left">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <span className="text-slate-400 font-bold flex items-center gap-1">
              <Activity className="w-4 h-4 text-emerald-400" /> SON SİMÜLASYON RAPORU:
            </span>
            <span className="text-emerald-400 font-bold">TOPLAM TUR: {turn}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-300">
            <div>TP (Temiz Para): <span className="font-bold text-emerald-400">{stateVector.TP.toFixed(1)}</span></div>
            <div>KP (Kirli Para): <span className="font-bold text-red-400">{stateVector.KP.toFixed(1)}</span></div>
            <div>PID (Demokrasi): <span className="font-bold text-blue-400">{stateVector.PID.toFixed(1)}</span></div>
            <div>GB (Bürokrasi): <span className="font-bold text-purple-400">{stateVector.GB.toFixed(1)}</span></div>
            <div>OH (Overton): <span className="font-bold text-amber-400">{stateVector.OH.toFixed(1)}</span></div>
            <div>KD (Kur Volatilitesi): <span className="font-bold text-pink-400">{stateVector.KD.toFixed(1)}</span></div>
          </div>
        </div>

        {/* Restart Button */}
        <button
          id="btn-modal-restart"
          onClick={handleRestart}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>YENİ SİMÜLASYON OTURUMU BAŞLAT</span>
        </button>
      </div>
    </div>
  );
};
