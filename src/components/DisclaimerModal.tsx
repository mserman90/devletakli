import React from 'react';
import { ShieldAlert, X, FileCheck, AlertOctagon, Scale } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useGameStore } from '../store/useGameStore';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  const language = useGameStore((state) => state.language);

  if (!isOpen) return null;

  const handleClose = () => {
    soundEngine.playUI('SELECT');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-xl sm:rounded-2xl border border-amber-600/50 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-950 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-amber-950 text-amber-400 rounded-lg border border-amber-700/60 shrink-0">
              <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-base font-bold text-slate-100 tracking-wider flex flex-wrap items-center gap-1.5 sm:gap-2">
                {language === 'EN' ? 'LEGAL DISCLAIMER & LIABILITY WAIVER' : 'YASAL UYARI & SORUMLULUK REDDİ'}
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-mono border border-amber-800">
                  LEGAL DISCLAIMER
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                {language === 'EN' ? 'Terms of Use, Limitations of Liability, and Copyright Notice' : 'Kullanım Şartları, Hukuki Sorumluluk Sınırları ve Telif Hakları'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-disclaimer"
            onClick={handleClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all shrink-0"
            title={language === 'EN' ? 'Close' : 'Kapat'}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Legal Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 text-slate-300 text-xs md:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
          
          <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-xl flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-normal">
              <strong>{language === 'EN' ? 'Important Notice:' : 'Önemli Duyuru:'}</strong> {language === 'EN' ? 'Every user accessing or using this software is deemed to have fully read, understood, and accepted the terms, limitations, and disclaimers below.' : 'Bu yazılımı kullanan veya erişim sağlayan her kullanıcı, aşağıda yer alan şartları, sınırlamaları ve yasal uyarıları eksiksiz olarak okumuş, anlamış ve kabul etmiş sayılır.'}
            </div>
          </div>

          {/* Article 1 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">{language === 'EN' ? 'Article 1.' : 'Madde 1.'}</span> {language === 'EN' ? 'Fictional Nature' : 'Tam Kurgusal Nitelik (Fictional Nature)'}
            </h3>
            <p className="text-slate-400 text-xs">
              {language === 'EN'
                ? '"Devlet Aklı" (Statecraft) is an educational and strategic fictional game designed to simulate political sociology, public administration theories, and game theory principles. All scenarios, decisions, party names, titles, and events are abstract mathematical models with no relation to real-world persons, institutions, or political parties.'
                : '"Devlet Aklı" yazılımı; tamamen siyaset sosyolojisi, kamu yönetimi teorileri ve oyun teorisi prensiplerini simüle etmek üzere tasarlanmış eğitici ve stratejik bir kurgusal oyundur. Oyunda yer alan tüm senaryolar, kararlar, parti isimleri, unvanlar, olaylar ve kriz durumları soyut ve sanal matematiksel modellerden ibarettir. Gerçek yaşamda var olan veya geçmişte yaşamış herhangi bir gerçek kişi, kurum, siyasi parti veya devlet organı ile hiçbir ilintisi ve benzerlik kastı bulunmamaktadır.'}
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">{language === 'EN' ? 'Article 2.' : 'Madde 2.'}</span> {language === 'EN' ? 'Fictional Intelligence Feeds' : 'Kurgusal İstihbarat Akışları ve İçerik Güvenliği'}
            </h3>
            <p className="text-slate-400 text-xs">
              {language === 'EN'
                ? 'The real-time intelligence feeds shown on the interface do NOT pull data from external real news sites. All ticker items and notifications are 100% fictional state and academic bulletins generated by game algorithms.'
                : 'Arayüzde gösterilen canlı istihbarat akışları (Intelligence Ticker); harici gerçek haber sitelerinden veya dış kaynaklardan veri ÇEKMEMEKTEDİR. Tüm akış başlıkları ve bildirimler; tamamen oyun simülasyonu ve matematiksel algoritma tarafından üretilen %100 kurgusal devlet ve akademi istihbarat duyurularıdır. Gerçek dünya haberleri veya üçüncü taraf medya içerikleriyle hiçbir ilgisi bulunmamaktadır.'}
            </p>
          </div>

          {/* Article 3 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">{language === 'EN' ? 'Article 3.' : 'Madde 3.'}</span> {language === 'EN' ? 'Financial & Political Advice Disclaimer' : 'Yatırım, Finans ve Siyasi Tavsiye Sorumluluk Reddi'}
            </h3>
            <p className="text-slate-400 text-xs">
              {language === 'EN'
                ? 'Variables such as "Exchange Volatility", "Clean Capital", and "Dark Capital" are strictly game mechanics and do not constitute financial, legal, or political advice.'
                : 'Uygulamada yer alan "Kur Dağınıklığı", "Temiz Para", "Kirli Para" gibi ekonomik/finansal simülasyon değişkenleri ve oyun metinleri; hiçbir şekilde gerçek finansal yatırım tavsiyesi, hukuki mütalaa veya siyasi eylem çağrısı niteliği taşımaz. Bu bilgiler doğrultusunda hareket edilmesi sonucu doğabilecek herhangi bir maddi/manevi zarardan yazılım geliştiricileri sorumlu tutulamaz.'}
            </p>
          </div>

          {/* Article 4 */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">{language === 'EN' ? 'Article 4.' : 'Madde 4.'}</span> {language === 'EN' ? 'Limitation of Liability' : 'Sorumluluğun Sınırlandırılması (Limitation of Liability)'}
            </h3>
            <p className="text-slate-400 text-xs">
              {language === 'EN'
                ? 'Developers shall not be held liable for any direct, indirect, or incidental damages resulting from the use or inability to use this software. The software is provided "AS IS".'
                : 'Geliştiriciler; uygulamanın kullanımı, kullanılamaması veya uygulamadaki herhangi bir veriye güvenilmesi sonucu meydana gelebilecek doğrudan, dolaylı, arızi, cezai veya netice kabilinden doğan hiçbir zarardan (maddi kayıp, veri kaybı, iş kesintisi vb.) sorumlu tutulamaz. Yazılım "OLDUĞU GİBİ" (AS IS) esasına göre sunulmaktadır.'}
            </p>
          </div>

          {/* Article 5 */}
          <div className="space-y-1.5 pb-2">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 font-mono">
              <span className="text-amber-400">{language === 'EN' ? 'Article 5.' : 'Madde 5.'}</span> {language === 'EN' ? 'Intellectual Property' : 'Fikri Mülkiyet ve Akademik Atıflar'}
            </h3>
            <p className="text-slate-400 text-xs">
              {language === 'EN'
                ? 'Academic works by scholars such as Robert Michels, Max Weber, Thomas Friedman, and C. Wright Mills are cited purely for academic and educational modeling in full compliance with copyright laws.'
                : 'Simülasyonun arka planında atıfta bulunulan Robert Michels, Max Weber, Thomas Friedman ve C. Wright Mills gibi bilim insanlarının eserleri; tamamen telif haklarına uygun olarak akademik alıntı ve eğitimsel modelleme amacıyla kaynak gösterilmiştir. Tüm marka ve isim hakları ilgili akademik sahiplerine aittir.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <FileCheck className="w-4 h-4" />
            {language === 'EN' ? 'All Rights Reserved / Legal Text Active' : 'Tüm Hakları Saklıdır / Yasal Metin Aktif'}
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold transition-all shadow-md"
          >
            {language === 'EN' ? 'Read, Understood & Accepted' : 'Okudum, Anladım ve Kabul Ediyorum'}
          </button>
        </div>

      </div>
    </div>
  );
};
