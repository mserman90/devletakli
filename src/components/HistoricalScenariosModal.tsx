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
      badge: 'MALT KİLİTLENME',
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
      } else {
        throw new Error('Failed to generate historical scenario');
      }
    } catch (err: any) {
      console.error('Error launching historical scenario:', err);
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
                  <Sparkles className="w-3 h-3 text-emerald-400" /> GEMINI AI
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'EN'
                  ? 'Select a historical decade or prompt Gemini to construct a custom political starting state'
                  : 'İstediğiniz tarihi dönemi seçin veya kendi özel kriz tanımınızı yapın'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playUI('SELECT');
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto font-mono">
          
          {error && (
            <div className="p-3.5 bg-red-950/80 border border-red-700 rounded-xl text-red-200 text-xs flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="px-2 py-1 bg-red-800 hover:bg-red-700 text-white rounded text-[10px] font-bold"
              >
                Tamam
              </button>
            </div>
          )}

          {/* Preset Eras Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                {language === 'EN' ? 'HAZIR TARİHSEL DÖNEM SENARYOLARI' : 'HAZIR TARİHSEL DÖNEM SENARYOLARI'}
              </h3>
              <span className="text-[10px] text-slate-400 font-sans">
                {language === 'EN' ? 'Pre-configured 6D State Vectors & Initial Cards' : 'Özel 6D Vektörler ve Başlangıç Karar Kartları'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {PRESETS.map((p) => {
                const isSelected = selectedScenarioId === p.id;
                const title = language === 'EN' ? p.titleEN : p.titleTR;
                const desc = language === 'EN' ? p.descEN : p.descTR;

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      soundEngine.playUI('HOVER');
                      setSelectedScenarioId(p.id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-700">
                            {p.icon}
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-200">{p.era}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${p.badgeColor}`}>
                          {p.badge}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-100 mb-1 leading-snug">{title}</h4>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">{desc}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchScenario(p.id);
                      }}
                      disabled={loading}
                      className={`w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      } disabled:opacity-50`}
                    >
                      {loading && selectedScenarioId === p.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                          <span>{language === 'EN' ? 'Generating...' : 'Üretiliyor...'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{language === 'EN' ? 'Launch Scenario' : 'Senaryoyu Başlat'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Prompt Generator Section */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-xs text-slate-200 tracking-wider uppercase">
                {language === 'EN' ? 'CUSTOM HISTORICAL / POLITICAL CRISIS PROMPT' : 'ÖZEL TARİHSEL VEYA SİYASİ KRİZ GİRDİSİ'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              {language === 'EN'
                ? 'Type any specific historical event, country crisis, or hypothetical political scenario (e.g. "1994 Sovereign currency devaluation", "1929 Great Depression", "2010 Eurozone crisis"). Gemini will construct a fully customized 6D starting vector and crisis card.'
                : 'İstediğiniz spesifik dönemi veya kurgusal krizi yazın (ör. "1994 Acil İstikrar Paketleri", "1960 Sıkıyönetim Sonrası Sivil Dönem", "1929 Büyük Buhranı"). Gemini AI özel durum vektörü ve karar kartı oluşturacaktır.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={
                  language === 'EN'
                    ? 'e.g., 1994 Emergency Economic Package & Devaluation Crisis...'
                    : 'ör., 1994 Acil Ekonomik Paketler ve Devalüasyon Krizi...'
                }
                className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
              />
              <button
                onClick={() => {
                  if (!customPrompt.trim()) return;
                  handleLaunchScenario('custom', customPrompt.trim());
                }}
                disabled={loading || !customPrompt.trim()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all disabled:text-slate-500 shrink-0"
              >
                {loading && selectedScenarioId === 'custom' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'EN' ? 'Generating AI Scenario...' : 'AI Senaryo Üretiliyor...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{language === 'EN' ? 'Generate & Launch' : 'Üret ve Başlat'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
