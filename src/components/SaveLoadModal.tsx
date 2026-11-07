import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Save, Download, Upload, Copy, Check, X, FileCode, AlertCircle } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({ isOpen, onClose }) => {
  const { saveGameToStorage, loadGameFromStorage, exportStateToJson, importStateFromJson, turn, language } = useGameStore();
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'SUCCESS' | 'ERROR'; text: string } | null>(null);

  if (!isOpen) return null;

  const isEn = language === 'EN';

  const handleSave = () => {
    saveGameToStorage();
    setStatusMsg({
      type: 'SUCCESS',
      text: isEn ? `Game state at Turn #${turn} saved to browser storage.` : `Tur #${turn} konumu tarayıcı hafızasına kaydedildi.`,
    });
  };

  const handleLoad = () => {
    const ok = loadGameFromStorage();
    if (ok) {
      setStatusMsg({
        type: 'SUCCESS',
        text: isEn ? 'Saved game successfully restored!' : 'Kayıtlı simülasyon başarıyla yüklendi!',
      });
      setTimeout(() => onClose(), 1000);
    } else {
      setStatusMsg({
        type: 'ERROR',
        text: isEn ? 'No saved game found in local storage.' : 'Hafızada kayıtlı oyun bulunamadı.',
      });
    }
  };

  const handleExport = () => {
    soundEngine.playUI('SELECT');
    const json = exportStateToJson();
    setJsonText(json);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  const handleImport = () => {
    if (!jsonText.trim()) return;
    const ok = importStateFromJson(jsonText.trim());
    if (ok) {
      soundEngine.playUI('CONFIRM');
      setStatusMsg({
        type: 'SUCCESS',
        text: isEn ? 'JSON state imported successfully!' : 'JSON durumu başarıyla içe aktarıldı!',
      });
      setTimeout(() => onClose(), 1000);
    } else {
      soundEngine.playUI('HOVER');
      setStatusMsg({
        type: 'ERROR',
        text: isEn ? 'Invalid JSON format or corrupted state data.' : 'Geçersiz JSON biçimi veya bozuk veri yapısı.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-800/80 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100 font-sans">
        
        {/* Header */}
        <div className="bg-amber-950/80 px-4 sm:px-6 py-3.5 border-b border-amber-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 text-slate-950 rounded-lg shadow">
              <Save className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black tracking-wide text-amber-100 font-serif">
                {isEn ? 'SIMULATION DATA PERSISTENCE & MEMORY' : 'SİMÜLASYON KAYIT VE HAFIZA YÖNETİMİ'}
              </h2>
              <p className="text-[11px] font-mono text-amber-300/70">
                {isEn ? 'Save, load, or export/import simulation states via JSON.' : 'Simülasyon durumunu tarayıcıya kaydet, yükle veya JSON ile dışa aktar.'}
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {statusMsg && (
            <div
              className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2 ${
                statusMsg.type === 'SUCCESS'
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                  : 'bg-red-950/80 border-red-600 text-red-300'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Quick Storage Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold font-mono text-amber-400 uppercase mb-1 flex items-center gap-1.5">
                  <Save className="w-4 h-4 text-emerald-400" /> {isEn ? 'QUICK SAVE' : 'HIZLI KAYDET'}
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">
                  {isEn ? 'Saves current vector, active card, advisors and logs to browser.' : 'Mevcut vektör, danışmanlar ve logları tarayıcı yerel hafızasına kaydeder.'}
                </p>
              </div>
              <button
                onClick={handleSave}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
              >
                <Save className="w-4 h-4" /> {isEn ? 'SAVE CURRENT STATE' : 'DURUMU KAYDET'}
              </button>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold font-mono text-amber-400 uppercase mb-1 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-indigo-400" /> {isEn ? 'RESTORE SAVE' : 'KAYITTAN DEVAM ET'}
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">
                  {isEn ? 'Restores previously saved state from browser storage.' : 'Tarayıcıda kayıtlı olan son oyunu ve durumu yükler.'}
                </p>
              </div>
              <button
                onClick={handleLoad}
                className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
              >
                <Download className="w-4 h-4" /> {isEn ? 'LOAD SAVED STATE' : 'KAYITLI OYUNU YÜKLE'}
              </button>
            </div>
          </div>

          {/* JSON Export / Import */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold font-mono text-amber-400 uppercase flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-amber-400" /> {isEn ? 'JSON STATE TRANSFER' : 'JSON DURUM DOSYASI AKTARIMI'}
              </h3>
              <button
                onClick={handleExport}
                className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700/60 font-mono text-[10px] font-bold flex items-center gap-1 hover:bg-amber-900 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? (isEn ? 'COPIED!' : 'KOPYALANDI!') : (isEn ? 'EXPORT & COPY' : 'DIŞA AKTAR VE KOPYALA')}
              </button>
            </div>

            <textarea
              rows={4}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder={isEn ? 'Paste JSON state here or click Export & Copy above...' : 'JSON durum kodunu buraya yapıştırın veya yukarıdan Dışa Aktar\'a tıklayın...'}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-amber-500/80 select-text"
            />

            <div className="flex justify-end mt-2">
              <button
                disabled={!jsonText.trim()}
                onClick={handleImport}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
                  jsonText.trim()
                    ? 'bg-amber-600 hover:bg-amber-500 text-slate-950 cursor-pointer shadow'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <Upload className="w-3.5 h-3.5" /> {isEn ? 'IMPORT JSON STATE' : 'JSON\'DAN İÇE AKTAR'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>{isEn ? 'Auto-saves at every turn.' : 'Her turda otomatik olarak kaydedilir.'}</span>
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
