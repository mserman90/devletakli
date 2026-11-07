import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  History,
  Sparkles,
  Calendar,
  AlertTriangle,
  Play,
  X,
  Send,
  Loader2,
  TrendingDown,
  Building2,
  Landmark,
  Globe2,
  Flame,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { HISTORICAL_PRESETS } from '../data/historicalPresets';

interface HistoricalScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoricalScenariosModal: React.FC<HistoricalScenariosModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { loadHistoricalScenario, language } = useGameStore();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('1970s');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const PRESETS = [
    {
      id: '1970s',
      era: '1977-1980',
      titleTR: "1970'ler Petrol Şoku ve Karaborsa Krizi",
      titleEN: '1970s Oil Shock & Hyperinflation Crisis',
      descTR: 'Dış borç krizleri, akaryakıt ve yağ kuyrukları, karaborsa rantı ve sokak kutuplaşması.',
      descEN: 'Foreign exchange depletion, oil rationing queues, black market expansion, and street violence.',
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      badge: 'KRİTİK HİPERENFLASYON',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-600/60',
    },
    {
      id: '1980s',
      era: '1980-1983',
      titleTR: "1980'ler Yapısal Uyum ve Vesayet Restorasyonu",
      titleEN: '1980s Structural Adjustment & Post-Coup Statecraft',
      descTR: '24 Ocak serbest piyasa kararları, sendikal dondurma ve vesayet konseyi yönetimi.',
      descEN: '24 January deregulation package, martial law restrictions, and junta statecraft.',
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      badge: 'KURUMSAL VESAYET',
      badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-600/60',
    },
    {
      id: '1990s',
      era: '1993-1999',
      titleTR: "1990'lar Koalisyonlar ve Banka Hortumlamaları",
      titleEN: '1990s Fragile Coalitions & Bank Drain Crisis',
      descTR: 'Sermaye-mafya-devlet ilişkileri, batan bankalar ve sürekli değişen hükümetler.',
      descEN: 'Short-lived coalition governments, state-mafia scandals, and offshore banking draining.',
      icon: <Landmark className="w-5 h-5 text-purple-400" />,
      badge: 'OLİGARŞİK VESAYET',
      badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-600/60',
    },
    {
      id: '2001',
      era: '2001-2002',
      titleTR: '2001 Devalüasyon Şoku ve Kurumsal Kriz',
      titleEN: '2001 Devaluation Shock & IMF Rescue Program',
      descTR: '%7500 gecelik faiz, çöken ulusal para birimi, bankacılık kilitlenmesi ve teknokrat reform ihtiyacı.',
      descEN: '7500% overnight interest, currency devaluation, and technocratic rescue reforms.',
      icon: <TrendingDown className="w-5 h-5 text-red-400" />,
      badge: 'MALİ KİLİTLENME',
      badgeColor: 'bg-red-950/80 text-red-300 border-red-600/60',
    },
    {
      id: '2008',
      era: '2008-2009',
      titleTR: '2008 Küresel Kredi Darboğazı',
      titleEN: '2008 Global Credit Crunch & Liquidity Cushion',
      descTR: 'Küresel finansal bulaşma, ihracat daralması ve reel sektör likidite sıkışması.',
      descEN: 'Wall Street credit freeze, export order declines, and corporate debt liquidity strain.',
      icon: <Globe2 className="w-5 h-5 text-emerald-400" />,
      badge: 'KÜRESEL ŞOK',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60',
    },
  ];

  const handleLaunchScenario = async (scenarioIdToUse: string, customPromptToUse?: string) => {
    soundEngine.playUI('CONFIRM');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/historical-scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: scenarioIdToUse,
          customPrompt: customPromptToUse,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.scenario) {
        loadHistoricalScenario({
          stateVector: data.scenario.stateVector,
          initialCard: data.scenario.initialCard,
          title: data.scenario.title,
          era: data.scenario.era,
          description: data.scenario.description,
          historicalNotes: data.scenario.historicalNotes,
        });
        onClose();
        return;
      } else {
        throw new Error('Failed to generate historical scenario');
      }
    } catch {
      // Client-side preset fallback (Static GitHub Pages resilience)
      const presetGroup = HISTORICAL_PRESETS[scenarioIdToUse] || HISTORICAL_PRESETS['1970s'];
      const preset = presetGroup[language === 'EN' ? 'EN' : 'TR'] || presetGroup['TR'];
      if (preset) {
        loadHistoricalScenario({
          stateVector: preset.stateVector,
          initialCard: preset.initialCard as any,
          title: preset.title,
          era: preset.era,
          description: preset.description,
          historicalNotes: preset.historicalNotes,
        });
        onClose();
        return;
      }
      setError(
        language === 'EN'
          ? 'Failed to load historical scenario parameters. Please try again.'
          : 'Tarihsel senaryo parametreleri yüklenirken hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 font-sans text-slate-100 select-none overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden relative my-auto">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-600/50">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2 font-mono">
                {language === 'EN' ? 'HISTORICAL SCENARIOS & CRISIS SIMULATOR' : 'TARİHSEL SENARYOLAR & KRİZ SİMÜLATÖRÜ'}
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" /> HISTORICAL ARCHIVE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'EN'
                  ? 'Select a historical decade or prompt Gemini to construct a custom political starting state'
                  : 'Tarihsel bir on yılı seçin veya özel bir siyasi kriz başlangıç durumunu yükleyin'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-950/80 border-b border-red-800 p-3 text-red-200 text-xs flex items-center gap-2 font-mono">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Preset Decades Selection */}
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              {language === 'EN' ? 'HISTORICAL DECADE SCENARIOS' : 'DÖNEMSEL TARİHİ SENARYOLAR'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PRESETS.map((preset) => {
                const isSelected = selectedScenarioId === preset.id;
                const title = language === 'EN' ? preset.titleEN : preset.titleTR;
                const desc = language === 'EN' ? preset.descEN : preset.descTR;

                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      soundEngine.playUI('SELECT');
                      setSelectedScenarioId(preset.id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-950/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {preset.icon}
                          <span className="font-bold text-xs sm:text-sm text-slate-100 font-mono">
                            {title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                          {preset.era}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${preset.badgeColor}`}>
                        {preset.badge}
                      </span>

                      <button
                        disabled={loading}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchScenario(preset.id);
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 text-xs font-bold font-mono rounded-lg transition-all flex items-center gap-1.5 shadow"
                      >
                        {loading && selectedScenarioId === preset.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3 fill-slate-950" />
                        )}
                        <span>{language === 'EN' ? 'LAUNCH' : 'BAŞLAT'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Historical Scenario Generator */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono uppercase text-amber-300 font-bold">
                {language === 'EN' ? 'CUSTOM HISTORICAL SCENARIO (GEMINI PROMPT)' : 'ÖZEL TARİHSEL SENARYO OLUŞTURUCU'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              {language === 'EN'
                ? 'Prompt Gemini to construct an alternate historical crisis starting point, custom political coalition, or real-world crisis event.'
                : 'Yapay zekaya tarihsel bir kriz, koalisyon senaryosu veya hayali bir siyasi çalkantı yazarak simülasyonu o şartlarda başlatın.'}
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={
                  language === 'EN'
                    ? 'e.g., 1994 Currency Collapse with high foreign debt and sudden devaluation...'
                    : 'Örnek: 1994 döviz krizi ve yüksek kamu açığı eşliğinde acil istikrar paketi...'
                }
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                disabled={loading || !customPrompt.trim()}
                onClick={() => handleLaunchScenario('custom', customPrompt)}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 text-slate-950 font-bold font-mono text-xs rounded-xl flex items-center gap-1.5 transition-all shadow"
              >
                {loading && selectedScenarioId === 'custom' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{language === 'EN' ? 'GENERATE' : 'OLUŞTUR'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            {language === 'EN'
              ? '* Presets configure unique starting 6D vector & initial crisis card'
              : '* Senaryolar başlangıç 6D durum vektörünü ve ilk kriz kartını otomatik ayarlar'}
          </span>
          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all"
          >
            {language === 'EN' ? 'CLOSE' : 'KAPAT'}
          </button>
        </div>
      </div>
    </div>
  );
};
