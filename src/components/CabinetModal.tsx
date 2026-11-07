import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Landmark, Users, Shield, Radio, Zap, Clock, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CabinetModal: React.FC<CabinetModalProps> = ({ isOpen, onClose }) => {
  const { advisors, activateAdvisorDoctrine, language } = useGameStore();

  if (!isOpen) return null;

  const isEn = language === 'EN';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'landmark':
        return <Landmark className="w-5 h-5 text-emerald-400" />;
      case 'users':
        return <Users className="w-5 h-5 text-blue-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-purple-400" />;
      case 'radio':
      default:
        return <Radio className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleActivate = (id: string) => {
    activateAdvisorDoctrine(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-4xl bg-slate-900 border-2 border-amber-800/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100 font-sans">
        
        {/* Header */}
        <div className="bg-amber-950/80 px-4 sm:px-6 py-3.5 border-b border-amber-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 text-slate-950 rounded-lg shadow">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide text-amber-100 font-serif">
                {isEn ? 'SHADOW CABINET & STRATEGIC ADVISORS' : 'GÖLGE KABİNE VE DANIŞMANLAR HEYETİ'}
              </h2>
              <p className="text-[11px] font-mono text-amber-300/70">
                {isEn
                  ? 'Active ministers provide permanent passive shields and deploy emergency doctrine actions.'
                  : 'Kabine üyeleri otonom sürüklenmeye karşı pasif kalkan sağlar ve acil durum doktrinleri icra eder.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisors Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advisors.map((adv) => {
              const isReady = adv.currentCooldown === 0;
              const roleTitle = isEn ? adv.roleEN : adv.role;
              const bioText = isEn ? adv.bioEN : adv.bio;
              const passiveText = isEn ? adv.passiveDescriptionEN : adv.passiveDescription;
              const docTitle = isEn ? adv.doctrineTitleEN : adv.doctrineTitle;
              const docDesc = isEn ? adv.doctrineDescEN : adv.doctrineDesc;

              return (
                <div
                  key={adv.id}
                  className="bg-slate-950/70 border border-amber-900/40 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:border-amber-700/70 transition-all relative overflow-hidden"
                >
                  {/* Advisor Bio Section */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 bg-slate-900 border border-slate-700 rounded-lg">
                          {getIcon(adv.iconName)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-amber-200">{adv.name}</h3>
                          <span className="text-[10px] font-mono text-amber-400/80 uppercase font-semibold">
                            {roleTitle}
                          </span>
                        </div>
                      </div>

                      {/* Cooldown Status Badge */}
                      {isReady ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" /> {isEn ? 'READY' : 'HAZIR'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-600/40 flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" /> {adv.currentCooldown} {isEn ? 'TURNS' : 'TUR'}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                      {bioText}
                    </p>

                    {/* Passive Shield Indicator */}
                    <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-[11px] font-mono mb-3">
                      <span className="text-indigo-400 font-bold block text-[10px] uppercase mb-0.5 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-indigo-400" /> {isEn ? 'PASSIVE DOCTRINE EFFECT:' : 'PASİF VEKTÖR KALKANI:'}
                      </span>
                      <span className="text-slate-300">{passiveText}</span>
                    </div>
                  </div>

                  {/* Active Doctrine Action Card */}
                  <div className="bg-amber-950/30 rounded-xl p-3 border border-amber-900/50 mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1 font-serif">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> {docTitle}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mb-2 leading-tight">
                      {docDesc}
                    </p>

                    {/* Vector Impact Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5 font-mono text-[10px]">
                      {Object.entries(adv.doctrineImpact).map(([k, v]) => (
                        <span
                          key={k}
                          className={`px-1.5 py-0.5 rounded border font-bold ${
                            (v ?? 0) > 0
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60'
                              : 'bg-red-950 text-red-300 border-red-700/60'
                          }`}
                        >
                          {k} {(v ?? 0) > 0 ? `+${v}` : v}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      disabled={!isReady}
                      onClick={() => handleActivate(adv.id)}
                      className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow ${
                        isReady
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 cursor-pointer shadow-amber-900/50'
                          : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {isReady
                        ? (isEn ? 'DEPLOY EMERGENCY DOCTRINE' : 'ACİL DOKTRİNİ DEVREYE SOK')
                        : (isEn ? `COOLING DOWN (${adv.currentCooldown} T)` : `BEKLEMEDE (${adv.currentCooldown} TUR)`)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            {isEn ? 'Advisors refresh their doctrine after cooldown.' : 'Doktrinler kullanıldıktan sonra soğuma süresine girer.'}
          </span>
          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all"
          >
            {isEn ? 'CLOSE' : 'KAPAT'}
          </button>
        </div>
      </div>
    </div>
  );
};
