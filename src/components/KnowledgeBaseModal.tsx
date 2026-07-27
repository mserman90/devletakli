import React, { useState } from 'react';
import { BookOpen, X, Shield, Cpu, Book, FileText, AlertTriangle, CheckCircle2, DollarSign, Users, Landmark, Globe, Activity, HelpCircle, Scale } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'MATH' | 'THEORY' | 'BIBLIO' | 'DISCLAIMER'>('GUIDE');

  if (!isOpen) return null;

  const handleTabChange = (tab: 'GUIDE' | 'MATH' | 'THEORY' | 'BIBLIO' | 'DISCLAIMER') => {
    soundEngine.playUI('HOVER');
    setActiveTab(tab);
  };

  const handleClose = () => {
    soundEngine.playUI('SELECT');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl h-[92vh] sm:h-[90vh] flex flex-col rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-950 px-3 sm:px-5 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800/60 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-base font-bold text-slate-100 tracking-wider flex flex-wrap items-center gap-1.5 sm:gap-2">
                BİLGİ BANKASI / KODLEKS
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-800">
                  TEORİ &amp; MİMARİ
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">Simülasyon Kullanım Kılavuzu, Sistem Mimarisi ve Sosyoloji Külliyatı</p>
            </div>
          </div>

          <button
            id="btn-close-knowledge-base"
            onClick={handleClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all shrink-0"
            title="Kapat"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800/80 flex space-x-2 font-mono text-xs overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => handleTabChange('GUIDE')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'GUIDE'
                ? 'bg-emerald-600 text-white font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>1. OYUNCU KILAVUZU</span>
          </button>

          <button
            onClick={() => handleTabChange('MATH')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'MATH'
                ? 'bg-emerald-600 text-white font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>2. MATEMATİKSEL MODEL</span>
          </button>

          <button
            onClick={() => handleTabChange('THEORY')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'THEORY'
                ? 'bg-emerald-600 text-white font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Book className="w-4 h-4" />
            <span>3. TEORİK ARKA PLAN</span>
          </button>

          <button
            onClick={() => handleTabChange('BIBLIO')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'BIBLIO'
                ? 'bg-emerald-600 text-white font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>4. KAYNAKÇA</span>
          </button>

          <button
            onClick={() => handleTabChange('DISCLAIMER')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'DISCLAIMER'
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                : 'bg-amber-950/60 text-amber-400 hover:bg-amber-900/60 hover:text-amber-200 border border-amber-800/60'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>5. YASAL UYARI &amp; SORUMLULUK REDDİ</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 text-slate-300 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* TAB 1: OYUNCU KILAVUZU */}
          {activeTab === 'GUIDE' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-emerald-400 mb-2">Giriş & Oyun Amacı</h3>
                <p className="text-slate-300 text-xs md:text-sm">
                  Bu simülasyon, geleneksel siyasetin "sağ-sol" veya "iktidar-muhalefet" gibi sahte ikiliklerini aşarak, modern bir devlette <strong>gerçek iktidarın (tahakkümün) kimin elinde olduğunu</strong> sorgulayan stratejik bir karar alma oyunudur. Amacınız, partinizi ulusal vesayet odaklarının (bürokrasi/derin devlet) ve küresel sermaye ağlarının tuzaklarına düşürmeden <strong>tam bağımsız bir halk hareketine</strong> dönüştürmektir.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Gösterge Paneli: 6 Temel Kaynak
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <DollarSign className="w-4 h-4" /> [TP] Temiz Para (Finansal Özerklik)
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      Tabandan gelen kitlesel fonlamayı (crowdfunding) temsil eder. Bu puan ne kadar yüksekse, küresel şantajlara karşı dayanıklılığınız ve bağımsız karar alma esnekliğiniz o kadar artar.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-red-400 font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <DollarSign className="w-4 h-4" /> [KP] Kirli Para (Sistem Bağımlılığı)
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      Holding bağışları, lobi fonları ve imtiyazlı kredilerdir. Kasanızı hızla doldurur ancak parti içindeki yozlaşmayı tetikler. <strong>70'in üzerine çıkması</strong> partinin elitler tarafından ele geçirilme riskini başlatır.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-blue-400 font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <Users className="w-4 h-4" /> [PID] Parti İçi Demokrasi (Oligarşi Direnci)
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      Örgütün taban kontrolü ve şeffaflık düzeyidir. <strong>30'un altına düşmesi</strong>, partinizin geleneksel bir statüko partisine dönüştüğü anlamına gelir.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-purple-400 font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <Shield className="w-4 h-4" /> [GB] Gölge Bürokrasi (Kurumsal Hafıza)
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      Kendi yetiştirdiğiniz bağımsız teknokratlar, düşünce kuruluşları (think-tank) ve alternatif devlet hafızanızdır. İktidara geldiğinizde bürokratik sabotajları engellemek için <strong>kalkan görevi</strong> görür.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <Landmark className="w-4 h-4" /> [OH] Overton Hegemonyası (Söylem Gücü)
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      Kendi bağımsız medya ağınızın gücü ve halkın ne düşüneceğini belirleme kapasitenizdir. Bu puan düşükse, en iyi reform kararlarınız bile halkta karşılık bulmaz.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-pink-400 font-bold flex items-center gap-1.5 mb-1 text-sm">
                      <Globe className="w-4 h-4" /> [KD] Kur Dağınıklığı (Piyasa Baskısı)
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      Küresel finans kartellerinin açtığı ekonomik savaştır. <strong>70'in üzerine çıktığında</strong> hiperenflasyon başlar, ekranda kırmızı uyarılar yanar ve kalp atışı gerilim sesleri tetiklenir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-200">Temel Oyun Mekanikleri ve İpuçları</h3>
                <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-300">
                  <li>
                    <strong>Kolay Yol Tuzağı:</strong> "Kirli Para" öneren seçenekler caziptir ve kısa vadede krizleri çözer; ancak arka planda Michels'in "Oligarşi Sayacı"nı hızlandırır.
                  </li>
                  <li>
                    <strong>Çarpan Kuralı (Modifiers):</strong> Söylem gücünüz (<code className="text-amber-400">OH</code>) düşükken bağış toplamaya çalışırsanız kartların verimi %50 düşer. İktidara geçmeden önce mutlaka medyanızı ve gölge bürokrasinizi (<code className="text-purple-400">GB</code>) güçlendirin.
                  </li>
                  <li>
                    <strong>Sabotaj Kesintileri (Interrupts):</strong> Ekran aniden kırmızıya dönerse ve testere dişi siren çalarsa, sistem yapay zekası sıradaki kartı keserek araya bir <strong>"Sabotaj Kartı"</strong> fırlatmış demektir. Bu anlarda normal stratejinizi bırakıp acil durum kriz yönetimine odaklanmalısınız.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200">Oyun Sonu (Endgame) Senaryoları</h3>
                <div className="overflow-x-auto border border-slate-800 rounded-lg">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-950 font-mono text-slate-400 uppercase">
                      <tr>
                        <th className="p-2.5 border-b border-slate-800">Senaryo</th>
                        <th className="p-2.5 border-b border-slate-800">Tetikleme Koşulu</th>
                        <th className="p-2.5 border-b border-slate-800">Akıbetiniz</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                      <tr>
                        <td className="p-2.5 font-bold text-amber-400">Oligarşi Zaferi (Kooptasyon)</td>
                        <td className="p-2.5 font-mono text-slate-300">KP &gt; 80 VE PID &lt; 20 (3 tur)</td>
                        <td className="p-2.5 text-slate-400"><strong>Sisteme Emildiniz:</strong> Michels kanunu işledi. Parti tabanı tasfiye edildi; sistemin yeni vitrin yöneticisi oldunuz.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-red-400">Finansal Çöküş (Syriza Sendromu)</td>
                        <td className="p-2.5 font-mono text-slate-300">KD &gt; 90 VE GB &lt; 30</td>
                        <td className="p-2.5 text-slate-400"><strong>İflas ve Darbe:</strong> Kur patlaması ve bürokratik sabotajlar nedeniyle hükümet düştü ya da küresel fonlara teslim olundu.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-purple-400">Yeni Leviathan (Buyurganlaşma)</td>
                        <td className="p-2.5 font-mono text-slate-300">Final evresinde OHAL ilanı</td>
                        <td className="p-2.5 text-slate-400"><strong>Düşmanınıza Dönüştünüz:</strong> Eski sistemi yendiniz ama kendi sarsılmaz müesses nizamınızı kurdunuz.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-emerald-400">Sistemin Yıkılışı (Hegemonik Zafer)</td>
                        <td className="p-2.5 font-mono text-slate-300">TP, PID, GB, OH &gt; 75 VE KD &lt; 60</td>
                        <td className="p-2.5 text-slate-400"><strong>Yurttaş Egemenliği:</strong> Altın deli gömleği parçalandı. Karar mekanizması kalıcı olarak taban meclislerine geçti!</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATEMATİKSEL MODEL */}
          {activeTab === 'MATH' && (
            <div className="space-y-6 animate-fadeIn font-sans">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-emerald-400 mb-2">Sistem Mimarisi ve Matematiksel Çekirdek</h3>
                <p className="text-slate-300 text-xs md:text-sm">
                  Simülasyon motoru, basit "if-else" ağaçları yerine <strong>doğrusal olmayan ayrık zamanlı bir dinamik sistem</strong> (non-linear discrete-time dynamical system) üzerinde çalışır.
                </p>
              </div>

              {/* Formula A */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-slate-200 font-mono">A. Durum Geçiş Denklemi</h4>
                <p className="text-xs text-slate-400">
                  Her turdaki yeni durum vektörü (<code className="text-emerald-400">S_(t+1)</code>), oyuncunun ham kararı (<code className="text-emerald-400 font-mono font-bold">Delta</code>), altyapı kapasitesini ölçen çarpan matrisi (<code className="text-emerald-400">M</code>) ve sistemin sosyolojik yerçekimi vektörü (<code className="text-emerald-400 font-mono font-bold">Omega</code>) toplanarak [0, 100] aralığına hapseder (clamping):
                </p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-700/80 font-mono text-center text-xs md:text-sm text-emerald-300 font-bold">
                  S_(t+1) = clamp( S_t + M(S_t) * Delta + Omega(S_t), 0, 100 )
                </div>
              </div>

              {/* Formula B */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200 font-mono">B. Otonom Geri Besleme Denklemleri (Omega)</h4>
                <p className="text-xs text-slate-400">
                  Oyuncu hiçbir hamle yapmasa dahi arka planda çalışan üç temel sosyo-matematiksel yasa bulunmaktadır:
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-blue-400 font-mono text-xs">
                      1. Robert Michels Oligarşileşme İvmesi (Omega_PID):
                    </span>
                    <p className="text-slate-400">
                      Kirli para bağımlılığı arttığında parti içi demokrasi doğrusal değil, üstel (karesel) bir hızla çürür:
                    </p>
                    <div className="p-2 bg-slate-900 rounded font-mono text-center text-blue-300">
                      Omega_PID(t) = -8.5 * (KP_t / 100)^2 * (1 - PID_t / 100)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-pink-400 font-mono text-xs">
                      2. Thomas Friedman Kur Taarruzu ve Altın Deli Gömleği (Omega_KD):
                    </span>
                    <p className="text-slate-400">
                      Finansal özerklik ve söylem gücünüz artarken sistemle uzlaşınız düşükse, küresel piyasalar kur saldırısı başlatır. Bu saldırıyı yalnızca teknokratik liyakatiniz (GB) sönümleyebilir:
                    </p>
                    <div className="p-2 bg-slate-900 rounded font-mono text-center text-pink-300">
                      Omega_KD(t) = 12.0 * max(0, (TP_t + OH_t)/2 - KP_t) / 100 - 6.0 * (GB_t / 100)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-400 font-mono text-xs">
                      3. Enflasyonist Bütçe Eriyik Hızı (Omega_TP):
                    </span>
                    <p className="text-slate-400">
                      Piyasa baskısı (KD) 50 seviyesini aştığında, toplanan temiz paranın satın alma gücü karesel bir hızla erir:
                    </p>
                    <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300">
                      Omega_TP(t) = -4.0 * (1 + (KD_t / 50)^2)
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Stack */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-slate-200 font-mono">C. Teknik Altyapı ve Ağ Güvenliği</h4>
                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
                  <li>
                    <strong>IETF RFC 6585 Uyumlu Ağ Katmanı:</strong> İstihbarat Ticker'ı harici RSS verilerini çekerken <code className="text-emerald-400 font-mono">X-RateLimit-Remaining</code> başlıklarını izler. Kota <strong>%80 limitine ulaştığında</strong> arayüzde önleyici uyarı verir. Kota aşımı durumunda <code className="text-emerald-400 font-mono">429 Too Many Requests</code> hatasını yakalayarak rastgelelik (jitter) eklenmiş <strong>Üstel Geri Çekilme</strong> (Exponential Backoff: 1s, 2s, 4s...) uygular.
                  </li>
                  <li>
                    <strong>Sıfır Kurgusal Veri (No Mock Data) Politikası:</strong> Harici kaynaklardan veri çekilemezse sistem asla uydurma veri üretmez; arayüze dürüstçe <code className="text-red-400 font-mono">"Veri mevcut değil"</code> hatasını iletir.
                  </li>
                  <li>
                    <strong>Prosedürel Ses Sentezi (Zero-Asset Audio):</strong> Uygulama hiçbir <code className="text-slate-400 font-mono">.mp3</code> veya <code className="text-slate-400 font-mono">.wav</code> dosyası indirmez. Tüm arayüz pingleri, ADSR zarflı DEFCON sirenleri ve 45Hz sub-bass kalp atışı gerilimi, tarayıcının <strong>Web Audio API</strong> osilatörleri üzerinden matematiksel olarak anlık üretilir.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: TEORİK ARKA PLAN */}
          {activeTab === 'THEORY' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-emerald-400 mb-2">Teorik Arka Plan: Siyaset Bilimi ve Sosyoloji Külliyatı</h3>
                <p className="text-slate-300 text-xs md:text-sm">
                  Bu simülasyonun oyun mekanikleri, 20. ve 21. yüzyılın en etkili siyaset sosyolojisi ve ekonomi politiği teorilerine dayanmaktadır (Bueno de Mesquita &amp; Smith, 2011).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">Robert Michels ve "Oligarşinin Tunç Kanunu"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Siyaset bilimci Robert Michels, ne kadar demokratik veya radikal amaçlarla kurulmuş olursa olsun, tüm siyasi partilerin zamanla kendi ayrıcalıklarını koruyan bir elit azınlık (oligarşi) tarafından yönetilmeye mahkum olduğunu savunur (Michels, 1915). Oyundaki <strong>[PID] (Parti İçi Demokrasi) sönümleme denklemi</strong>, yöneticilerin tabandan koparak statükoya uzlaşma eğilimini mekanize eder.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">Thomas L. Friedman ve "Altın Deli Gömleği"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Friedman’a göre küreselleşme, iktidara gelen her partiye ideolojisinden bağımsız olarak aynı finansal kuralları giymeyi dayatır (Friedman, 1999). Kurallardan sapanlar sermaye kaçışı ve enflasyonla cezalandırılır. Oyundaki <strong>[KD] (Kur Dağınıklığı) otonom artış algoritmaları</strong>, ulusal hükümetlerin üzerinde sallanan bu küresel piyasa vesayetini simüle eder.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">Max Weber ve "Bürokratik Demir Kafes"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Weber, modern devlet bürokrasisinin siyasetçileri sarmalayan devasa, rasyonel ve aşılmaz bir demir kafes olduğunu belirtir (Weber, 1922/1978). İktidara gelen siyasiler, kurum hafızasından yoksunsa bürokrasinin esiri olurlar. Oyundaki <strong>[GB] (Gölge Bürokrasi) kaynağının</strong> bürokratik muhtıraları sönümleyen tek kalkan olarak tasarlanması bu teze dayanır.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">C. Wright Mills ve "İktidar Elitleri"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Mills, siyaset, ordu ve büyük şirket liderlerinin birbirine geçmiş bir güç ağı oluşturduğunu ve aralarında bir <strong>"döner kapı" (revolving door)</strong> sistemi çalıştığını ortaya koyar (Mills, 1956). Parti yönetim kadrolarının fonlar (KP) karşılığında küresel elitlerle yer değiştirmesi, bu kurumsal tahakküm mekanizmasının bir yansımasıdır.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 md:col-span-2">
                  <h4 className="font-bold text-slate-100 text-sm">Kopenhag Okulu ve "Güvenlikleştirme" (Securitization)</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Barry Buzan ve Kopenhag Okulu teorisyenlerine göre, iktidar odakları bir konuyu "ulusal beka" veya "güvenlik tehdidi" olarak tanımladığında olağan demokratik siyaset durdurulur ve tüm partiler aynı çizgide hizalanmaya zorlanır (Buzan et al., 1998). Oyunda araya giren <strong>Acil Durum Sabotaj Kartları (Interrupts)</strong>, sistemin bu güvenlikleştirme silahını temsil eder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KAYNAKÇA */}
          {activeTab === 'BIBLIO' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-emerald-400 mb-2">Akademik Kaynakça</h3>
                <p className="text-slate-400 text-xs">
                  Simülasyonun dayandığı akademik literatür ve kaynak listesi:
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Bueno de Mesquita, B., &amp; Smith, A. (2011). <em>The dictator's handbook: Why bad behavior is almost always good politics</em>. PublicAffairs.
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Buzan, B., Wæver, O., &amp; de Wilde, J. (1998). <em>Security: A new framework for analysis</em>. Lynne Rienner Publishers.
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Friedman, T. L. (1999). <em>The Lexus and the olive tree: Understanding globalization</em>. Farrar, Straus and Giroux.
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Michels, R. (1915). <em>Political parties: A sociological study of the oligarchical tendencies of modern democracy</em> (E. ve C. Paul, Çev.). Hearst's International Library Company. (Orijinal eser 1911 yılında yayımlanmıştır).
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Mills, C. W. (1956). <em>The power elite</em>. Oxford University Press.
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Salen, K., &amp; Zimmerman, E. (2004). <em>Rules of play: Game design fundamentals</em>. MIT Press.
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  Weber, M. (1978). <em>Economy and society: An outline of interpretive sociology</em> (G. Roth &amp; C. Wittich, Dü.). University of California Press. (Orijinal eser 1922 yılında yayımlanmıştır).
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: YASAL UYARI & SORUMLULUK REDDİ */}
          {activeTab === 'DISCLAIMER' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-800/80">
                <h3 className="text-base font-bold text-amber-400 mb-1 flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Yasal Uyarı, Hukuki Sorumluluk Sınırları ve Telif Hakkı Beyanı
                </h3>
                <p className="text-amber-200/90 text-xs">
                  Bu simülasyonu çalıştıran, erişen veya içeriğini inceleyen her kullanıcı, aşağıdaki hukuki koşul ve sınırlamaları kayıtsız şartsız kabul etmiş sayılır.
                </p>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-300">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-100 font-mono text-xs text-amber-400">1. Kurgusal Nitelik Beyanı (Fictional Character)</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    "Devlet Aklı" yazılımı; tamamen siyaset bilimi, kamu yönetimi teorileri ve oyun teorisi dinamiklerini simüle eden soyut, stratejik ve akademik kurgusal bir oyundur. Oyundaki tüm kurum isimleri, kriz senaryoları, kararlar ve unvanlar tamamen sanal kod dizilimlerinden ibarettir. Gerçek hayattaki hiçbir kişi, kurum, devlet organı, siyasi parti veya uluslararası kuruluş ile doğrudan veya dolaylı bağı yoktur.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-100 font-mono text-xs text-amber-400">2. Kurgusal İstihbarat Akışı ve İçerik Güvenliği</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Uygulamadaki istihbarat paneli (Intelligence Ticker); harici canlı haber sitelerinden veri çekmek yerine tamamen simülasyon evrenine uygun kurgusal algoritmayla çalışır. Gerçek kişi, kurum veya haber kaynaklarıyla ilgisi yoktur.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-100 font-mono text-xs text-amber-400">3. Finansal, Hukuki ve Siyasi Tavsiye Niteliği Taşımama</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Oyunda sunulan bütçe, piyasa baskısı (Kur Dağınıklığı), lobi ilişkileri ve siyasi söylem değişkenleri tamamen oyunsal mekaniklerdir. Gerçek dünyada herhangi bir yatırım tavsiyesi, hukuki mütalaa veya siyasi eylem çağrısı teşkil etmez.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-100 font-mono text-xs text-amber-400">4. Sorumluluğun Tamamen Sınırlandırılması</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Yazılımın kullanımı veya kullanılamaması neticesinde doğabilecek doğrudan, dolaylı veya arizi zararlardan, veri kayıplarından veya üçüncü şahıs iddialarından geliştirici taraf hiçbir surette sorumlu tutulamaz. Yazılım "Olduğu Gibi" (As-Is) esasıyla sunulmaktadır.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Sistem Dokümantasyonu Senkronize
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
          >
            Anlaşıldı, Makama Dön
          </button>
        </div>

      </div>
    </div>
  );
};
