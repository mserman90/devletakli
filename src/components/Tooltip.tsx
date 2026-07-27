import React, { useState } from 'react';
import { getAcronymInfo, AcronymInfo } from '../utils/glossary';
import { useGameStore } from '../store/useGameStore';

interface TooltipProps {
  code: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  customTitle?: string;
  customDesc?: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  code,
  children,
  position = 'top',
  customTitle,
  customDesc,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const language = useGameStore((state) => state.language);
  const info: AcronymInfo | undefined = getAcronymInfo(code, language);

  const title = customTitle || info?.name || code;
  const description = customDesc || info?.description || '';

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position];


  return (
    <span
      className={`relative inline-flex items-center group cursor-help ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => e.stopPropagation()}
    >
      {children || <span className="underline decoration-dotted underline-offset-2 font-bold">{code}</span>}

      {isOpen && (
        <span
          className={`absolute z-50 ${positionClasses} w-56 p-2.5 bg-slate-950 border border-amber-500/80 text-slate-100 rounded-lg shadow-2xl text-xs font-sans pointer-events-none transition-all duration-200 animate-fadeIn block text-left`}
        >
          <span className="flex items-center justify-between gap-1 border-b border-amber-700/50 pb-1 mb-1 font-mono">
            <span className="font-black text-amber-400 text-xs tracking-wider">{code}</span>
            <span className="text-[10px] text-slate-300 font-semibold">{title}</span>
          </span>
          {description && (
            <span className="block text-[11px] text-slate-300 leading-tight font-sans">{description}</span>
          )}
          <span className="absolute w-2 h-2 bg-slate-950 border-r border-b border-amber-500/80 rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
        </span>
      )}
    </span>
  );
};
