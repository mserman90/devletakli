import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '../store/useGameStore';
import { ToastNotification } from '../types/game';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { Tooltip } from './Tooltip';

const METRIC_NAMES: Record<string, { nameTR: string; nameEN: string; badgeColor: string }> = {
  TP: { nameTR: 'Temiz Para', nameEN: 'Clean Capital', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/60' },
  KP: { nameTR: 'Kirli Para', nameEN: 'Dark Capital', badgeColor: 'bg-red-950 text-red-300 border-red-500/60' },
  PID: { nameTR: 'Parti İçi Demokrasi', nameEN: 'Internal Democracy', badgeColor: 'bg-blue-950 text-blue-300 border-blue-500/60' },
  GB: { nameTR: 'Gölge Bürokrasi', nameEN: 'Shadow Bureaucracy', badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/60' },
  OH: { nameTR: 'Overton Hegemonyası', nameEN: 'Overton Window', badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/60' },
  KD: { nameTR: 'Kur Dağınıklığı', nameEN: 'Currency Volatility', badgeColor: 'bg-pink-950 text-pink-300 border-pink-500/60' },
};

const ToastItem: React.FC<{ toast: ToastNotification }> = ({ toast }) => {
  const { removeToast, language } = useGameStore();
  const [progress, setProgress] = useState<number>(100);

  const duration = toast.autoCloseMs || 5000;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        removeToast(toast.id);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [toast.id, duration, removeToast]);

  const titleText = language === 'EN' ? (toast.titleEN || toast.title) : toast.title;
  const messageText = language === 'EN' ? (toast.messageEN || toast.message) : toast.message;

  // Type styling configuration
  const getTypeStyle = () => {
    switch (toast.type) {
      case 'DANGER':
        return {
          bg: 'bg-slate-950/95 border-red-500/80 text-red-100 shadow-red-950/50',
          headerBg: 'bg-red-950/80 border-red-800/80 text-red-300',
          icon: <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 animate-bounce" />,
          progressColor: 'bg-red-500',
        };
      case 'WARNING':
        return {
          bg: 'bg-slate-950/95 border-amber-500/80 text-amber-100 shadow-amber-950/50',
          headerBg: 'bg-amber-950/80 border-amber-800/80 text-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          progressColor: 'bg-amber-500',
        };
      case 'SUCCESS':
        return {
          bg: 'bg-slate-950/95 border-emerald-500/80 text-emerald-100 shadow-emerald-950/50',
          headerBg: 'bg-emerald-950/80 border-emerald-800/80 text-emerald-300',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          progressColor: 'bg-emerald-500',
        };
      case 'INFO':
      default:
        return {
          bg: 'bg-slate-950/95 border-cyan-500/80 text-cyan-100 shadow-cyan-950/50',
          headerBg: 'bg-cyan-950/80 border-cyan-800/80 text-cyan-300',
          icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
          progressColor: 'bg-cyan-500',
        };
    }
  };

  const style = getTypeStyle();
  const metricInfo = toast.metricCode ? METRIC_NAMES[toast.metricCode] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative overflow-hidden w-full sm:w-96 rounded-xl border ${style.bg} p-3 sm:p-3.5 shadow-2xl backdrop-blur-md font-mono text-xs mb-2.5 group`}
    >
      {/* Top Banner / Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {style.icon}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs uppercase tracking-wider">{titleText}</span>
              {toast.metricCode && metricInfo && (
                <Tooltip code={toast.metricCode} position="top">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono font-bold ${metricInfo.badgeColor}`}>
                    {toast.metricCode}
                  </span>
                </Tooltip>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-sans">{toast.timestamp}</span>
          </div>
        </div>

        <button
          onClick={() => removeToast(toast.id)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={language === 'EN' ? 'Dismiss' : 'Kapat'}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message Body */}
      <div className="mt-2 text-slate-200 font-sans text-xs leading-relaxed pl-7">
        {messageText}
      </div>

      {/* Auto-Dismiss Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 overflow-hidden">
        <div
          className={`h-full transition-all duration-75 ease-linear ${style.progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useGameStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-3 right-2 sm:right-4 left-2 sm:left-auto z-[100] max-w-full sm:max-w-md pointer-events-none flex flex-col items-end">
      <div className="pointer-events-auto w-full">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
