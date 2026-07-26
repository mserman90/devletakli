import React from 'react';
import { ShieldAlert, X, FileCheck, AlertOctagon, Scale, ExternalLink } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundEngine.playUI('SELECT');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-amber-600/50 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-950 text-amber-400 rounded-lg border border-amber-700/60">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 tracking-wider flex items-center gap-2">
                YASAL UYARI &amp; SORUMLULUK REDDİ BEYANI
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-mono border border-amber-800">
                  LEGAL DISCLAIMER
                </span>
              </h2>
              <p className="text-xs text-slate-400">Kullanım Şartları, Hukuki Sorumluluk Sınırları ve Telif Hakları</p>
            </div>
          </div>

          <button
            id="btn-close-disclaimer"
            onClick={handleClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 text-slate-300 text-xs md:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
          
          <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-xl flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-normal">
              <strong>Önemli Duyuru:</strong> Bu yazılımı kullanan veya erişim sağlayan her kullanıcı, aşağıda yer alan şartları, sınırlamaları ve yasal uyarıları eksiksiz olarak okumuş, anlamış ve kabul etmiş sayılır.
            </div>
          </div>

          {/* Article 1 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">Madde 1.</span> Tam Kurgusal Nitelik (Fictional Nature)
            </h3>
            <p className="text-slate-400 text-xs">
              "Devlet Aklı" yazılımı; tamamen siyaset sosyolojisi, kamu yönetimi teorileri ve oyun teorisi prensiplerini simüle etmek üzere tasarlanmış <strong>eğitici ve stratejik bir kurgusal oyun</strong>dur. Oyunda yer alan tüm senaryolar, kararlar, parti isimleri, unvanlar, olaylar ve kriz durumları soyut ve sanal matematiksel modellerden ibarettir. Gerçek yaşamda var olan veya geçmişte yaşamış herhangi bir gerçek kişi, kurum, siyasi parti veya devlet organı ile hiçbir ilintisi ve benzerlik kastı bulunmamaktadır.
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">Madde 2.</span> Kurgusal İstihbarat Akışları ve İçerik Güvenliği
            </h3>
            <p className="text-slate-400 text-xs">
              Arayüzde gösterilen canlı istihbarat akışları (Intelligence Ticker); harici gerçek haber sitelerinden veya dış kaynaklardan veri ÇEKMEMEKTEDİR. Tüm akış başlıkları ve bildirimler; tamamen oyun simülasyonu ve matematiksel algoritma tarafından üretilen <strong>%100 kurgusal devlet ve akademi istihbarat duyuruları</strong>dır. Gerçek dünya haberleri veya üçüncü taraf medya içerikleriyle hiçbir ilgisi bulunmamaktadır.
            </p>
          </div>

          {/* Article 3 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">Madde 3.</span> Yatırım, Finans ve Siyasi Tavsiye Sorumluluk Reddi
            </h3>
            <p className="text-slate-400 text-xs">
              Uygulamada yer alan "Kur Dağınıklığı", "Temiz Para", "Kirli Para" gibi ekonomik/finansal simülasyon değişkenleri ve oyun metinleri; hiçbir şekilde gerçek finansal yatırım tavsiyesi, hukuki mütalaa veya siyasi eylem çağrısı niteliği taşımaz. Bu bilgiler doğrultusunda hareket edilmesi sonucu doğabilecek herhangi bir maddi/manevi zarardan yazılım geliştiricileri sorumlu tutulamaz.
            </p>
          </div>

          {/* Article 4 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">Madde 4.</span> Sorumluluğun Sınırlandırılması (Limitation of Liability)
            </h3>
            <p className="text-slate-400 text-xs">
              Geliştiriciler; uygulamanın kullanımı, kullanılamaması veya uygulamadaki herhangi bir veriye güvenilmesi sonucu meydana gelebilecek doğrudan, dolaylı, arızi, cezai veya netice kabilinden doğan hiçbir zarardan (maddi kayıp, veri kaybı, iş kesintisi vb.) sorumlu tutulamaz. Yazılım "OLDUĞU GİBİ" (AS IS) esasına göre sunulmaktadır.
            </p>
          </div>

          {/* Article 5 */}
          <div className="space-y-1.5 pb-2">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">Madde 5.</span> Fikri Mülkiyet ve Akademik Atıflar
            </h3>
            <p className="text-slate-400 text-xs">
              Simülasyonun arka planında atıfta bulunulan Robert Michels, Max Weber, Thomas Friedman ve C. Wright Mills gibi bilim insanlarının eserleri; tamamen telif haklarına uygun olarak akademik alıntı ve eğitimsel modelleme amacıyla kaynak gösterilmiştir. Tüm marka ve isim hakları ilgili akademik sahiplerine aittir.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <FileCheck className="w-4 h-4" />
            Tüm Hakları Saklıdır / Yasal Metin Aktif
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold transition-all shadow-md"
          >
            Okudum, Anladım ve Kabul Ediyorum
          </button>
        </div>

      </div>
    </div>
  );
};
