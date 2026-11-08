import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import {
  BookOpen,
  X,
  Shield,
  Cpu,
  Book,
  FileText,
  DollarSign,
  Users,
  Landmark,
  Globe,
  Activity,
  HelpCircle,
  Scale,
  Zap,
  CheckCircle2,
  Compass,
  Award,
  Sparkles,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { Tooltip } from './Tooltip';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'MANUAL' | 'MATH' | 'CABINET' | 'THEORY' | 'BIBLIO' | 'DISCLAIMER';

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({ isOpen, onClose }) => {
  const { language } = useGameStore();
  const [activeTab, setActiveTab] = useState<TabType>('MANUAL');

  if (!isOpen) return null;

  const isEn = language === 'EN';

  const handleTabChange = (tab: TabType) => {
    soundEngine.playUI('HOVER');
    setActiveTab(tab);
  };

  const handleClose = () => {
    soundEngine.playUI('SELECT');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="w-full max-w-5xl h-[94vh] sm:h-[90vh] flex flex-col rounded-xl sm:rounded-2xl border-2 border-amber-900/60 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden relative font-sans">
        
        {/* Header */}
        <div className="bg-amber-950/80 px-4 sm:px-6 py-3.5 border-b border-amber-900/60 flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-amber-800 text-slate-950 rounded-xl shadow-md shrink-0">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xs sm:text-base font-bold text-amber-100 tracking-wider flex flex-wrap items-center gap-1.5 sm:gap-2 font-serif">
                {isEn ? 'KODLEKS: STATECRAFT MANUAL & ACADEMIC CANON' : 'KODLEKS: KULLANIM KILAVUZU & AKADEMİK KÜLLİYAT'}
                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono border border-amber-700/60 flex items-center gap-1 font-bold">
                  <Sparkles className="w-2.5 h-2.5" /> v3.0 {language}
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-amber-300/70 hidden sm:block font-mono">
                {isEn
                  ? 'Official Operating Doctrine, Non-Linear Mathematical Model & Political Sociology Treatise'
                  : 'Resmi Sevk Doktrini, Doğrusal Olmayan Matematiksel Model ve Siyaset Sosyolojisi Külliyatı'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-knowledge-base"
            onClick={handleClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all shrink-0 cursor-pointer"
            title={isEn ? 'Close' : 'Kapat'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex space-x-2 font-mono text-xs overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => handleTabChange('MANUAL')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'MANUAL'
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{isEn ? '1. USER MANUAL & STRATEGY' : '1. KULLANIM KILAVUZU'}</span>
          </button>

          <button
            onClick={() => handleTabChange('MATH')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'MATH'
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{isEn ? '2. MATHEMATICAL MODEL' : '2. MATEMATİKSEL MODEL'}</span>
          </button>

          <button
            onClick={() => handleTabChange('CABINET')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'CABINET'
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isEn ? '3. CABINET & DECREES' : '3. KABİNE & KHK SİSTEMİ'}</span>
          </button>

          <button
            onClick={() => handleTabChange('THEORY')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'THEORY'
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Book className="w-4 h-4" />
            <span>{isEn ? '4. ACADEMIC THEORIES' : '4. AKADEMİK KURAMLAR'}</span>
          </button>

          <button
            onClick={() => handleTabChange('BIBLIO')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'BIBLIO'
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isEn ? '5. BIBLIOGRAPHY & CITATION' : '5. KAYNAKÇA & ATIF'}</span>
          </button>

          <button
            onClick={() => handleTabChange('DISCLAIMER')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'DISCLAIMER'
                ? 'bg-red-700 text-white font-bold shadow-md'
                : 'bg-red-950/60 text-red-300 hover:bg-red-900/60 hover:text-white border border-red-800/60'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isEn ? '6. LEGAL DISCLAIMER' : '6. YASAL UYARI'}</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 select-text">
          
          {/* TAB 1: KULLANICI KILAVUZU & STRATEJİ DOKTRİNİ */}
          {activeTab === 'MANUAL' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-900/40">
                <h3 className="text-sm sm:text-base font-bold text-amber-400 mb-2 font-serif">
                  {isEn ? 'Command Desk Mission & Operational Doctrine' : 'Makam Misyonu ve Operasyonel Sevk Doktrini'}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {isEn
                    ? 'Devlet Aklı simulates the raw structural realities of modern state governance. Moving past superficial partisan slogans, your mandate as Chief Strategist is to guide your party movement through 4 historical phases, fending off oligarchic corporate capture and deep-state tutelage, while managing foreign currency volatility to establish genuine popular sovereignty.'
                    : 'Devlet Aklı, modern devlet yönetiminin yapısal ve ekonomi-politik gerçekliklerini simüle eder. Yüzeysel parti sloganlarını aşarak partinizi ulusal vesayet kliklerinin, holding oligarşisinin ve küresel sermaye spekülasyonlarının tuzaklarına düşürmeden 4 faz boyunca yönetmeli ve tam bağımsız bir halk egemenliği inşa etmelisiniz.'}
                </p>
              </div>

              {/* 6-Vectors Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  {isEn ? 'The 6-Dimensional State Vector Metrics' : '6-Boyutlu Durum Vektörü ve Kritik Eşikler'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <DollarSign className="w-4 h-4" /> [TP] {isEn ? 'Clean Capital (Grassroots Crowdfunding)' : 'Temiz Para (Taban Fonu)'}
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      {isEn
                        ? 'Independent popular funding. Crucial for sovereignty. If TP <= 5, immediate financial bankruptcy collapse occurs.'
                        : 'Yurttaş mikro bağışları ve finansal özerklik. TP <= 5 altına düştüğünde anında iflas ve hükümet çöküşü gerçekleşir.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-red-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <DollarSign className="w-4 h-4" /> [KP] {isEn ? 'Dark Capital (Corporate Holding Funds)' : 'Kirli Para (Holding Fonu)'}
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      {isEn
                        ? 'Fast cash from oligarchs, but triggers Michels Law democracy decay. If KP >= 90 & PID <= 15, party is permanently captured.'
                        : 'Holding ve lobi fonları. Kasayı hızlı doldurur fakat Michels Yasası uyarınca parti içi demokrasiyi eritir. KP >= 90 olursa oligarşi zafer kazanır.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-blue-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <Users className="w-4 h-4" /> [PID] {isEn ? 'Party Democracy (Oligarchy Resistance)' : 'Parti İçi Demokrasi (Oligarşi Direnci)'}
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      {isEn
                        ? 'Grassroots rank-and-file voting power, primary elections. High PID resists establishment takeovers.'
                        : 'Tabanın karar alma gücü, ön seçim ve çarşaf liste güvencesi. Yüksek PID vesayet odaklarını püskürtür.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-purple-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <Shield className="w-4 h-4" /> [GB] {isEn ? 'Shadow Bureaucracy (Institutional Memory)' : 'Gölge Bürokrasi & Devlet Hafızası'}
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      {isEn
                        ? 'Technocratic competence and ministry continuity. If GB <= 10, state apparatus is paralyzed, causing purge defeat.'
                        : 'Liyakatli teknokrat kadroları ve bürokratik hafıza. GB <= 10 altına düşerse devlet yönetilemez hale gelir ve tasfiye edilirsiniz.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <Landmark className="w-4 h-4" /> [OH] {isEn ? 'Overton Hegemony (Public Discourse Reach)' : 'Kamuoyu & Overton Hegemonyası'}
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      {isEn
                        ? 'Autonomous media reach and cultural legitimacy. High OH makes radical structural reforms acceptable to the masses.'
                        : 'Otonom medya gücü ve halk nezdinde rıza üretimi. Yüksek OH radikal kamusal reformları toplum nezdinde meşrulaştırır.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                    <span className="text-pink-400 font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <Globe className="w-4 h-4" /> [KD] {isEn ? 'Currency Volatility (Market Pressure)' : 'Kur Dağınıklığı (Piyasa Baskısı)'}
                    </span>
                    <p className="text-slate-400 text-xs font-sans">
                      {isEn
                        ? 'Offshore speculative pressure and inflation shock. If KD >= 95, economic gridlock triggers systemic bankruptcy.'
                        : 'Küresel spekülasyon ve döviz şoku. KD >= 95 seviyesine ulaştığında hiperenflasyon ve piyasa kilitlenmesiyle oyun biter.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Victory Conditions */}
              <div className="bg-emerald-950/30 border border-emerald-700/60 p-4 rounded-xl space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-300 font-serif flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  {isEn ? 'Supreme Victory Mandate (Grand Statecraft Realized)' : 'Büyük Zafer Şartnamesi (Devlet Aklı ve Tam Egemenlik)'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {isEn ? 'To achieve sovereign victory, survive to at least Turn #18 and fulfill all 5 strategic benchmarks simultaneously:' : 'Tarihi zafere ulaşmak için en az 18 tur hayatta kalmalı ve şu 5 kriteri aynı anda sağlamalısınız:'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <span className="p-1.5 bg-slate-900 border border-slate-800 rounded text-emerald-400">TP &gt;= 65 ({isEn ? 'Clean Capital' : 'Temiz Para'})</span>
                  <span className="p-1.5 bg-slate-900 border border-slate-800 rounded text-blue-400">PID &gt;= 50 ({isEn ? 'Democracy' : 'Demokrasi'})</span>
                  <span className="p-1.5 bg-slate-900 border border-slate-800 rounded text-purple-400">GB &gt;= 50 ({isEn ? 'Bureaucracy' : 'Bürokrasi'})</span>
                  <span className="p-1.5 bg-slate-900 border border-slate-800 rounded text-amber-400">OH &gt;= 55 ({isEn ? 'Overton' : 'Overton'})</span>
                  <span className="p-1.5 bg-slate-900 border border-slate-800 rounded text-pink-400">KD &lt;= 45 ({isEn ? 'Volatility' : 'Kur Dengesi'})</span>
                  <span className="p-1.5 bg-slate-900 border border-slate-800 rounded text-amber-300">Turn &gt;= 18 ({isEn ? 'Min. Duration' : 'Asgari Süre'})</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATEMATİKSEL MODEL */}
          {activeTab === 'MATH' && (
            <div className="space-y-6 animate-fadeIn font-sans">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-2 font-serif">
                  {isEn ? 'Non-Linear Discrete-Time Dynamical State Engine' : 'Doğrusal Olmayan Ayrık Zamanlı Durum Motoru'}
                </h3>
                <p className="text-slate-300 text-xs">
                  {isEn
                    ? 'The simulation engine is formulated as an autonomous non-linear discrete-time dynamical system with non-linear feedback coupling.'
                    : 'Devlet Aklı simülasyonu basit karar dallanmaları yerine, doğrusal olmayan geri beslemeli diferansiyel/ayrık zamanlı bir matematiksel dinamik sistem üzerine kuruludur.'}
                </p>
              </div>

              {/* State Transition Formula */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200 font-mono">
                  {isEn ? 'A. Global State Transition Equation' : 'A. Genel Durum Geçiş Denklemi'}
                </h4>
                <div className="p-3 bg-slate-900 rounded-lg border border-amber-600/50 font-mono text-center text-xs sm:text-sm text-amber-300 font-bold overflow-x-auto">
                  S_(t+1) = clamp( S_t + Delta_decision + Omega(S_t) + Psi_advisor, 0, 100 )
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {isEn
                    ? 'Where S_t is the 6D vector, Delta_decision is player directive impact, Omega(S_t) is autonomous structural drift, and Psi_advisor represents passive ministerial shields.'
                    : 'Burada S_t 6-boyutlu vektör, Delta_decision oyuncu kararı, Omega(S_t) içsel sosyolojik sürüklenme, Psi_advisor ise kabine kalkanlarıdır.'}
                </p>
              </div>

              {/* Omega Feedback Equations */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200 font-mono">
                  {isEn ? 'B. Autonomous Feedback Drift Equations (Omega Vector)' : 'B. Otonom Geri Besleme Sürüklenme Denklemleri (Omega Vektörü)'}
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-blue-400 font-mono">
                      1. {isEn ? 'Robert Michels Quadratic Oligarchization Velocity (Omega_PID):' : 'Robert Michels Karesel Oligarşileşme İvmesi (Omega_PID):'}
                    </span>
                    <div className="p-2 bg-slate-900 rounded font-mono text-center text-blue-300 font-bold overflow-x-auto">
                      KP &gt; 50 &amp;&amp; PID &lt; 50 ==&gt; Delta_PID = -8.5 * (KP / 100)^2 * (1 - PID / 100)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-pink-400 font-mono">
                      2. {isEn ? 'Thomas Friedman Golden Straitjacket & Volatility Shock (Omega_KD):' : 'Thomas Friedman Altın Düzgömlek ve Kur Şoku (Omega_KD):'}
                    </span>
                    <div className="p-2 bg-slate-900 rounded font-mono text-center text-pink-300 font-bold overflow-x-auto">
                      Delta_KD = 12.0 * max(0, (TP + OH) / 2 - KP) / 100 - 6.0 * (GB / 100)
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-400 font-mono">
                      3. {isEn ? 'Inflationary Clean Reserve Depreciation Velocity (Omega_TP):' : 'Enflasyonist Rezerv Aşınma Hızı (Omega_TP):'}
                    </span>
                    <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300 font-bold overflow-x-auto">
                      Delta_TP = -4.0 * (1 + (KD / 50)^2)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KABİNE VE KHK SİSTEMİ */}
          {activeTab === 'CABINET' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-2 font-serif">
                  {isEn ? 'Shadow Cabinet & Emergency Executive Decrees' : 'Gölge Kabine ve Olağanüstü Kararnameler (KHK)'}
                </h3>
                <p className="text-slate-300 text-xs">
                  {isEn
                    ? 'In v3.0, you are not merely a passive recipient of event cards. You possess an active toolbox: 4 Strategic Advisors providing permanent passive shields and cooldown-based doctrines, plus executive decrees for acute crisis management.'
                    : 'v3.0 sürümünde oyuncu sadece kartlara cevap veren pasif bir konumda değildir. Emrinde kalıcı pasif koruma ve acil durum doktrinleri sağlayan 4 Danışman ile doğrudan KHK çıkarma yetkisi bulunur.'}
                </p>
              </div>

              {/* Advisors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-amber-300 font-mono text-sm mb-1">Dr. Selim Aras (Hazine Koordinatörü)</h4>
                  <p className="text-slate-400 mb-2">{isEn ? 'Absorbs 20% of inflationary TP loss every turn.' : 'Her tur enflasyonist bütçe erimesini %20 oranında sönümler.'}</p>
                  <span className="text-emerald-400 font-mono font-bold block">{isEn ? 'Doctrine: Sovereign Liquidity Fortification (KD -18, TP +12, KP -10)' : 'Doktrin: Milli Rezerv ve Likidite Tahkimi (KD -18, TP +12, KP -10)'}</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-blue-300 font-mono text-sm mb-1">Emine Candan (Teşkilat & Taban)</h4>
                  <p className="text-slate-400 mb-2">{isEn ? 'Slows down Michels Law democracy decay by 25%.' : 'Michels Kanunu kaynaklı parti içi demokrasi kaybını %25 yavaşlatır.'}</p>
                  <span className="text-blue-400 font-mono font-bold block">{isEn ? 'Doctrine: Grassroots Solidarity Congress (PID +22, TP +10, KP -18)' : 'Doktrin: Taban Dayanışma Kurultayı (PID +22, TP +10, KP -18)'}</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-purple-300 font-mono text-sm mb-1">Albay Mete Demir (Devlet Hafızası & Güvenlik)</h4>
                  <p className="text-slate-400 mb-2">{isEn ? 'Prevents GB erosion, provides 35% chance to avert sabotage alerts.' : 'Gölge Bürokrasi erimesini durdurur, dış sabotaj riskini %35 savuşturur.'}</p>
                  <span className="text-purple-400 font-mono font-bold block">{isEn ? 'Doctrine: Counter-Intelligence Shield (GB +22, KP -15, KD -5)' : 'Doktrin: Bürokratik Tahkikat ve İstihbarat Kalkanı (GB +22, KP -15, KD -5)'}</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <h4 className="font-bold text-amber-300 font-mono text-sm mb-1">Deniz Yılmaz (Stratejik İletişim & Medya)</h4>
                  <p className="text-slate-400 mb-2">{isEn ? 'Halts Overton Window decay, boosts organic reach.' : 'Overton Penceresi erimesini engeller, organik halk desteğini besler.'}</p>
                  <span className="text-amber-400 font-mono font-bold block">{isEn ? 'Doctrine: National Truth Offensive (OH +22, PID +8, KD -5)' : 'Doktrin: Ulusal Hakikat ve Medya Taarruzu (OH +22, PID +8, KD -5)'}</span>
                </div>
              </div>

              {/* Decrees Summary */}
              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl space-y-2 text-xs">
                <h4 className="font-bold text-red-300 font-mono">{isEn ? 'Executive Decrees (KHK Masası):' : 'Olağanüstü Kararnameler Masası:'}</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>Kamusal Tasarruf &amp; Tavan Fiyat:</strong> Temel ihtiyaç maddelerinde spekülatif zamları önler ($TP +12, KD -12$).</li>
                  <li><strong>Dijital Halk Oylaması:</strong> Kararları doğrudan taban referandumuna sunar ($PID +18, OH +12, KP -15$).</li>
                  <li><strong>Şüpheli Varlıkların Kamulaştırılması:</strong> Offshore hortumlanan holding varlıklarına kamu adına el koyar ($TP +20, KP -25$).</li>
                  <li><strong>Milli Sermaye Çıkış Kalkanı:</strong> Ani spekülatif döviz kaçışını frenler ($KD -20, TP +8$).</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: AKADEMİK KURAMLAR */}
          {activeTab === 'THEORY' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-2 font-serif">
                  {isEn ? 'Theoretical Foundations: Political Sociology Canon' : 'Teorik Temeller: Siyaset Bilimi ve Sosyoloji Külliyatı'}
                </h3>
                <p className="text-slate-300 text-xs">
                  {isEn
                    ? 'Devlet Aklı grounds every mechanic in seminal treatises from modern political science, institutional economics, and power sociology.'
                    : 'Devlet Aklı simülasyonunun tüm mekanikleri, 20. ve 21. yüzyılın en etkili siyaset sosyolojisi, kurumsal iktisat ve güç analizi külliyatına dayanmaktadır.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">Robert Michels — "Oligarşinin Tunç Kanunu"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Tüm demokratik kitle örgütleri zaman içinde kaçınılmaz olarak kendi çıkarlarını koruyan bir yönetici elit azınlık (oligarşi) tarafından teslim alınır. Simülasyonda <strong>[KP] ve [PID] sönümleme dinamiği</strong> bu teorik yasayı işletir.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">Max Weber — "Rasyonel Bürokrasi & Demir Kafes"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Modern devlet aygıtının sürekliliği için liyakatli teknokrat kadroları ve kurumsal hafıza vazgeçilmezdir. İktidara gelenler bu hafızadan yoksunsa bürokrasinin demir kafesinde rehin kalırlar. <strong>[GB] metriği</strong> bu dengeyi temsil eder.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">C. Wright Mills — "İktidar Seçkinleri" (The Power Elite)</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Siyaset, büyük sanayi holdingleri ve askeri/güvenlik bürokrasisi arasında gayriresmi bir "döner kapı" ittifakı işler. Holding fonlarına teslim olmak partinin karar alma özerkliğini holding yönetim kurullarına devreder.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <h4 className="font-bold text-slate-100 text-sm">Thomas L. Friedman — "Altın Düzgömlek"</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Küresel sermaye piyasaları ulusal ekonomileri aynı serbest piyasa kurallarını giymeye zorlar. Bu kurallardan sapanlar spekülatif sermaye kaçışı ve kur saldırısıyla cezalandırılır. <strong>[KD] algoritması</strong> bu vesayeti simüle eder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KAYNAKÇA & AKADEMİK ATIF */}
          {activeTab === 'BIBLIO' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <h3 className="text-base font-bold text-amber-400 mb-1 font-serif">
                  {isEn ? 'Academic Bibliography & Research Citation' : 'Akademik Kaynakça ve Araştırma Atıfı'}
                </h3>
                <p className="text-slate-400 text-xs">
                  {isEn ? 'Referenced literature and BibTeX citation entry:' : 'Simülasyonun dayandığı akademik literatür ve araştırmacılar için BibTeX atıf kodu:'}
                </p>
              </div>

              {/* BibTeX Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                <pre>{`@software{devletakli2026,
  author = {Serman, M. and Contributor Community},
  title = {Devlet Aklı: Siyasi Strateji, Müesses Nizam ve Gölge Bürokrasi Simülasyonu},
  year = {2026},
  url = {https://github.com/mserman90/devletakli}
}`}</pre>
              </div>

              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  Bueno de Mesquita, B., &amp; Smith, A. (2011). <em>The dictator's handbook: Why bad behavior is almost always good politics</em>. PublicAffairs.
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  Friedman, T. L. (1999). <em>The Lexus and the olive tree: Understanding globalization</em>. Farrar, Straus and Giroux.
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  Michels, R. (1915). <em>Political parties: A sociological study of the oligarchical tendencies of modern democracy</em>. Hearst's International Library.
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  Mills, C. W. (1956). <em>The power elite</em>. Oxford University Press.
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  Weber, M. (1978). <em>Economy and society: An outline of interpretive sociology</em>. University of California Press.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: YASAL UYARI */}
          {activeTab === 'DISCLAIMER' && (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-800/80">
                <h3 className="text-sm sm:text-base font-bold text-amber-400 mb-1 flex items-center gap-2">
                  <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
                  {isEn ? 'Legal Disclaimer & Academic Fictional Declaration' : 'Yasal Uyarı, Hukuki Sorumluluk Sınırları ve Telif Hakları'}
                </h3>
                <p className="text-amber-200/90 text-xs">
                  {isEn
                    ? 'This software is an abstract educational simulation. All institutions, direct narratives, and scenarios are virtual.'
                    : 'Bu simülasyon tamamen kurgusal olup akademik siyaset modellerine dayanır. Gerçek kurum ve şahıslarla ilgisi yoktur.'}
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <h4 className="font-bold text-amber-300 font-mono text-xs">{isEn ? '1. Fictional Character' : '1. Kurgusal Nitelik Beyanı'}</h4>
                <p className="text-slate-400 leading-relaxed">
                  {isEn
                    ? 'Devlet Aklı is a non-commercial educational model. Directives, institutions, and narratives do not represent actual political organizations or public figures.'
                    : 'Devlet Aklı yazılımı tamamen soyut, stratejik ve akademik kurgusal bir oyundur. Oyundaki tüm kurum isimleri ve krizler sanal algoritmalardan ibarettir.'}
                </p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <h4 className="font-bold text-amber-300 font-mono text-xs">{isEn ? '2. No Financial Advice' : '2. Yatırım ve Hukuki Tavsiye Niteliği Taşımama'}</h4>
                <p className="text-slate-400 leading-relaxed">
                  {isEn
                    ? 'State variables, currency fluctuations, and policy outcomes are game constructs and should never be construed as real-world investment or legal advice.'
                    : 'Oyunda sunulan bütçe, kur oynaklığı ve lobi ilişkileri oyunsal dinamiklerdir. Gerçek dünyada yatırım veya hukuki mütalaa niteliği taşımaz.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {isEn ? 'System Canon & Doctrine Synchronized v3.0' : 'Sistem Dokümantasyonu & Doktrin Senkronize v3.0'}
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold font-mono text-xs transition-all cursor-pointer shadow"
          >
            {isEn ? 'RETURN TO DESK' : 'ANLAŞILDI, MAKAMA DÖN'}
          </button>
        </div>

      </div>
    </div>
  );
};
