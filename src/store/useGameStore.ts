import { create } from 'zustand';
import { StateVector, DecisionCard, GameLog, IntelligenceFeedItem, ApiRateLimitStatus, ToastNotification } from '../types/game';
import { processTurn } from '../core/simulationEngine';
import { adversarialAIEngine } from '../core/adversarialAIEngine';
import { intelligenceService } from '../services/intelligenceService';
import { INITIAL_CARDS } from '../data/initialCards';
import { soundEngine } from '../utils/soundEngine';

interface GameState {
  stateVector: StateVector;
  turn: number;
  phase: number;
  activeCard: DecisionCard | null;
  cardQueue: DecisionCard[];
  history: { turn: number; state: StateVector; decisionTitle: string }[];
  logs: GameLog[];
  toasts: ToastNotification[];
  intelligenceFeed: IntelligenceFeedItem[];
  rateLimitStatus: ApiRateLimitStatus;
  isGameOver: boolean;
  gameOverReason: 'VICTORY' | 'OBLITERATED' | 'AUTOCRACY_DEFEAT' | 'BANKRUPT_DEFEAT' | 'DEEP_STATE_DEFEAT' | null;
  isInterruptActive: boolean;
  isSoundMuted: boolean;
  hasStartedGame: boolean;
  hasAcceptedLegalTerms: boolean;
  language: 'TR' | 'EN';

  // Eylemler
  selectOption: (optionId: string) => void;
  fetchIntelligence: () => Promise<void>;
  resetGame: () => void;
  toggleSound: () => void;
  toggleLanguage: () => void;
  startGame: () => void;
  setHasAcceptedLegalTerms: (accepted: boolean) => void;
  returnToHero: () => void;
  addToast: (toast: Omit<ToastNotification, 'id' | 'timestamp'> & { id?: string }) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  loadHistoricalScenario: (scenarioData: {
    stateVector: StateVector;
    initialCard: DecisionCard;
    title: string;
    era?: string;
    description: string;
    historicalNotes?: string[];
  }) => void;
}

const INITIAL_VECTOR: StateVector = {
  TP: 50, // Temiz Para
  KP: 40, // Kirli Para
  PID: 60, // Parti İçi Demokrasi
  GB: 40, // Gölge Bürokrasi
  OH: 45, // Overton Hegemonyası
  KD: 30, // Kur Dağınıklığı
};

export const useGameStore = create<GameState>((set, get) => ({
  stateVector: { ...INITIAL_VECTOR },
  turn: 1,
  phase: 1,
  activeCard: INITIAL_CARDS[0],
  cardQueue: INITIAL_CARDS.slice(1),
  history: [{ turn: 1, state: { ...INITIAL_VECTOR }, decisionTitle: 'Başlangıç Konumu' }],
  logs: [
    {
      id: 'log_init',
      timestamp: new Date().toLocaleTimeString('tr-TR'),
      turn: 1,
      type: 'SYSTEM',
      message: 'Devlet Aklı Simülasyon Çekirdeği Başlatıldı. 6-Boyutlu Durum Vektörü Senkronize Edildi.',
    },
  ],
  toasts: [],
  intelligenceFeed: [],
  rateLimitStatus: intelligenceService.getRateLimitStatus(),
  isGameOver: false,
  gameOverReason: null,
  isInterruptActive: false,
  isSoundMuted: false,
  hasStartedGame: false,
  hasAcceptedLegalTerms: false,
  language: 'TR',

  addToast: (toast) => {
    const nowTime = new Date().toLocaleTimeString('tr-TR');
    const newToast: ToastNotification = {
      id: toast.id || `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type: toast.type,
      title: toast.title,
      titleEN: toast.titleEN,
      message: toast.message,
      messageEN: toast.messageEN,
      metricCode: toast.metricCode,
      timestamp: nowTime,
      autoCloseMs: toast.autoCloseMs ?? 5000,
    };

    set((state) => ({
      toasts: [newToast, ...state.toasts].slice(0, 5), // Maximum 5 toasts at once
    }));
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },

  selectOption: (optionId: string) => {
    const { stateVector, turn, activeCard, cardQueue, history, logs, toasts } = get();
    if (!activeCard) return;

    const selectedOption = activeCard.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    // 1. Simülasyon Çekirdeğinde Tur İşleme ve Otonom Sürüklenme Hesabı
    const { nextState, drift } = processTurn(stateVector, selectedOption.stateDelta);
    const nextTurn = turn + 1;
    const nextPhase = Math.min(4, Math.ceil(nextTurn / 5));

    // Ses Efekti
    soundEngine.playUI('CONFIRM');

    // Günlük Kaydı (Log) Oluşturma
    const nowTime = new Date().toLocaleTimeString('tr-TR');
    const newLogs: GameLog[] = [
      ...logs,
      {
        id: `log_dec_${nextTurn}_${Date.now()}`,
        timestamp: nowTime,
        turn,
        type: activeCard.isInterrupt ? 'AI_ATTACK' : 'DECISION',
        message: `[KAPALI ODA KARARI] "${activeCard.title}" -> "${selectedOption.label}" seçildi.`,
        impact: selectedOption.consequenceText,
      },
    ];

    // Otonom sürüklenme loglarını ekle
    drift.summaryText.forEach((driftMsg, idx) => {
      newLogs.push({
        id: `log_drift_${nextTurn}_${idx}_${Date.now()}`,
        timestamp: nowTime,
        turn,
        type: 'DRIFT',
        message: driftMsg,
      });
    });

    // 2. Zafer / Yenilgi Koşulları Kontrolü
    let gameOver: boolean = false;
    let reason: GameState['gameOverReason'] = null;

    if (nextState.TP <= 5 || nextState.KD >= 95) {
      gameOver = true;
      reason = 'BANKRUPT_DEFEAT';
      soundEngine.playUI('DEFEAT');
    } else if (nextState.KP >= 90 && nextState.PID <= 15) {
      gameOver = true;
      reason = 'AUTOCRACY_DEFEAT';
      soundEngine.playUI('DEFEAT');
    } else if (nextState.GB <= 10) {
      gameOver = true;
      reason = 'DEEP_STATE_DEFEAT';
      soundEngine.playUI('DEFEAT');
    } else if (nextTurn >= 18 && nextState.TP >= 65 && nextState.PID >= 50 && nextState.GB >= 50 && nextState.OH >= 55 && nextState.KD <= 45) {
      gameOver = true;
      reason = 'VICTORY';
      soundEngine.playUI('VICTORY');
    }

    const generatedToasts: ToastNotification[] = [...toasts];

    // Evaluate Danger & Warning Resource Thresholds
    if (nextState.TP <= 15) {
      generatedToasts.unshift({
        id: `toast_tp_${nextTurn}_${Date.now()}`,
        type: 'DANGER',
        title: 'KRİTİK EŞİK: TEMİZ PARA',
        titleEN: 'CRITICAL THRESHOLD: CLEAN CAPITAL',
        message: 'Temiz Para rezervleri %15 seviyesine geriledi. İflas riski yüksek!',
        messageEN: 'Clean Capital reserves dropped to 15%. High risk of financial collapse!',
        metricCode: 'TP',
        timestamp: nowTime,
        autoCloseMs: 6000,
      });
    }

    if (nextState.KD >= 75) {
      generatedToasts.unshift({
        id: `toast_kd_${nextTurn}_${Date.now()}`,
        type: 'DANGER',
        title: 'KRİTİK EŞİK: KUR VOLATİLİTESİ',
        titleEN: 'CRITICAL THRESHOLD: CURRENCY VOLATILITY',
        message: 'Kur Dağınıklığı (KD) %75 seviyesine tırmandı. Piyasa kilitlenme riski!',
        messageEN: 'Currency Volatility (KD) spiked to 75%. High risk of market shock!',
        metricCode: 'KD',
        timestamp: nowTime,
        autoCloseMs: 6000,
      });
    }

    if (nextState.GB <= 15) {
      generatedToasts.unshift({
        id: `toast_gb_${nextTurn}_${Date.now()}`,
        type: 'WARNING',
        title: 'UYARI: GÖLGE BÜROKRASİ ERİMESİ',
        titleEN: 'WARNING: BUREAUCRACY EROSION',
        message: 'Gölge Bürokrasi %15 altına geriledi. İdari yönetim zafiyeti!',
        messageEN: 'Shadow Bureaucracy fell below 15%. Administrative weakness!',
        metricCode: 'GB',
        timestamp: nowTime,
        autoCloseMs: 5000,
      });
    }

    if (nextState.KP >= 75) {
      generatedToasts.unshift({
        id: `toast_kp_${nextTurn}_${Date.now()}`,
        type: 'WARNING',
        title: 'UYARI: KİRLİ PARA VESAYETİ',
        titleEN: 'WARNING: DARK CAPITAL INFILTRATION',
        message: 'Kirli Para %75 üzerine çıktı. Oligarşik esaret tehdidi!',
        messageEN: 'Dark Capital rose above 75%. Threat of oligarchic capture!',
        metricCode: 'KP',
        timestamp: nowTime,
        autoCloseMs: 5000,
      });
    }

    if (nextState.PID <= 20) {
      generatedToasts.unshift({
        id: `toast_pid_${nextTurn}_${Date.now()}`,
        type: 'WARNING',
        title: 'UYARI: DEMOKRASİ AŞINMASI',
        titleEN: 'WARNING: DEMOCRACY EROSION',
        message: 'Parti İçi Demokrasi %20 altına indi. Otoriter sapma riski!',
        messageEN: 'Internal Party Democracy fell below 20%. Risk of autocracy!',
        metricCode: 'PID',
        timestamp: nowTime,
        autoCloseMs: 5000,
      });
    }

    if (gameOver) {
      soundEngine.stopHeartbeat();
      generatedToasts.unshift({
        id: `toast_gameover_${Date.now()}`,
        type: reason === 'VICTORY' ? 'SUCCESS' : 'DANGER',
        title: reason === 'VICTORY' ? 'ZAFER: DEVLET AKLI KURULDU' : 'SİMÜLASYON ÇÖKÜŞÜ!',
        titleEN: reason === 'VICTORY' ? 'VICTORY: STATECRAFT ESTABLISHED' : 'SIMULATION COLLAPSE!',
        message: reason === 'VICTORY' ? 'Ulusal egemenlik zafer kazandı.' : 'Gölge mekanizmalar veya finansal çöküş gerçekleşti.',
        messageEN: reason === 'VICTORY' ? 'National sovereignty triumphed.' : 'Oligarchic capture or financial collapse occurred.',
        timestamp: nowTime,
        autoCloseMs: 8000,
      });

      set({
        stateVector: nextState,
        turn: nextTurn,
        history: [...history, { turn: nextTurn, state: nextState, decisionTitle: activeCard.title }],
        logs: [
          ...newLogs,
          {
            id: `log_gameover_${Date.now()}`,
            timestamp: nowTime,
            turn: nextTurn,
            type: 'SYSTEM',
            message: `[OYUN SONU] Simülasyon Tamamlandı. Sonuç: ${reason}`,
          },
        ],
        toasts: generatedToasts.slice(0, 5),
        isGameOver: true,
        gameOverReason: reason,
        isInterruptActive: false,
      });
      return;
    }

    // 3. Tehdit Motoru (Adversarial AI Engine) Değerlendirmesi
    const threatCard = adversarialAIEngine.evaluateThreats(nextState, nextTurn);

    let nextActiveCard: DecisionCard | null = null;
    let nextQueue = [...cardQueue];
    let isInterrupt = false;

    if (threatCard) {
      // ACİL SABOTAJ MÜDAHALESİ
      nextActiveCard = threatCard;
      isInterrupt = true;
      soundEngine.playSabotageSiren();
      soundEngine.startHeartbeat(135);

      newLogs.push({
        id: `log_threat_${Date.now()}`,
        timestamp: nowTime,
        turn: nextTurn,
        type: 'AI_ATTACK',
        message: `[TEHDİT SİRENİ] ${threatCard.title} devreye girdi!`,
      });

      generatedToasts.unshift({
        id: `toast_threat_${Date.now()}`,
        type: 'DANGER',
        title: 'ACİL SABOTAJ VE SİREN!',
        titleEN: 'EMERGENCY SABOTAGE ALERT!',
        message: `"${threatCard.title}" krizi tetiklendi! Acil müdahale gerekiyor.`,
        messageEN: `"${threatCard.title}" crisis triggered! Immediate action required.`,
        timestamp: nowTime,
        autoCloseMs: 7000,
      });
    } else {
      // Normal Sıradaki Kart
      soundEngine.stopHeartbeat();
      isInterrupt = false;

      if (nextQueue.length > 0) {
        nextActiveCard = nextQueue[0];
        nextQueue = nextQueue.slice(1);
      } else {
        // Döngüsel Kart Haznesi veya Faz Kartları Bittiğinde Yeni Kart Üretimi
        const fallbackCard: DecisionCard = {
          id: `card_gen_${nextTurn}`,
          title: `Devlet Aklı ve İrade Sınavı (Faz ${nextPhase})`,
          phase: nextPhase,
          category: 'POLITICS',
          source: 'Ulusal Güvenlik ve Strateji Kurulu',
          narrative: 'Ülke kritik bir dönemeçten geçiyor. Teşkilatların ve bürokrasinin uyumu için radikal bir karar alınması bekleniyor.',
          options: [
            {
              id: `opt_gen_${nextTurn}_1`,
              label: 'Ulusal Kaynakları Seferber Et ve Şeffaflığı Artır',
              description: 'Tabana güven ver, kamu denetimini güçlendir.',
              stateDelta: { TP: +10, PID: +10, KD: -5 },
              riskFactor: 15,
              consequenceText: 'Taban desteği ve kamu şeffaflığı arttı.',
            },
            {
              id: `opt_gen_${nextTurn}_2`,
              label: 'Bürokrasi ve Merkezleşmeyi Güçlendir',
              description: 'Devlet hafızasını tahkim et, hızlı karar mekanizması kur.',
              stateDelta: { GB: +15, KP: +10, PID: -10 },
              riskFactor: 25,
              consequenceText: 'İdari mekanizma hızlandı ancak vesayet riski arttı.',
            },
          ],
        };
        nextActiveCard = fallbackCard;
      }
    }

    set({
      stateVector: nextState,
      turn: nextTurn,
      phase: nextPhase,
      activeCard: nextActiveCard,
      cardQueue: nextQueue,
      history: [...history, { turn: nextTurn, state: nextState, decisionTitle: activeCard.title }],
      logs: newLogs,
      toasts: generatedToasts.slice(0, 5),
      isInterruptActive: isInterrupt,
    });
  },

  fetchIntelligence: async () => {
    const { rateLimitStatus, logs } = get();

    try {
      const res = await intelligenceService.fetchNews();
      const nowTime = new Date().toLocaleTimeString('tr-TR');

      const updatedLogs = [...logs];
      if (res.status.isWarningThreshold) {
        updatedLogs.push({
          id: `log_warn_${Date.now()}`,
          timestamp: nowTime,
          turn: get().turn,
          type: 'WARNING',
          message: `[UYARI - KOTA EŞİĞİ] API kota kullanımınız %80 limitine ulaştı! (${res.status.usedPercentage}% kullanıldı)`,
        });

        get().addToast({
          type: 'WARNING',
          title: 'KOTA EŞİĞİ UYARISI (API)',
          titleEN: 'QUOTA THRESHOLD WARNING (API)',
          message: `%80 Telgraf Limiti Doldu! (${res.status.usedPercentage}% kullanıldı)`,
          messageEN: `80% Telegraph Limit Reached! (${res.status.usedPercentage}% used)`,
          autoCloseMs: 5000,
        });
      }

      set({
        intelligenceFeed: res.items,
        rateLimitStatus: res.status,
        logs: updatedLogs,
      });
    } catch (err) {
      console.error('İstihbarat çekilemedi:', err);
      set({
        rateLimitStatus: intelligenceService.getRateLimitStatus(),
      });
    }
  },

  resetGame: () => {
    soundEngine.stopHeartbeat();
    adversarialAIEngine.reset();

    set({
      stateVector: { ...INITIAL_VECTOR },
      turn: 1,
      phase: 1,
      activeCard: INITIAL_CARDS[0],
      cardQueue: INITIAL_CARDS.slice(1),
      history: [{ turn: 1, state: { ...INITIAL_VECTOR }, decisionTitle: 'Başlangıç Konumu' }],
      logs: [
        {
          id: `log_reset_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('tr-TR'),
          turn: 1,
          type: 'SYSTEM',
          message: 'Sistem Sıfırlandı. Yeni Simülasyon Oturumu Başlatıldı.',
        },
      ],
      isGameOver: false,
      gameOverReason: null,
      isInterruptActive: false,
    });
  },

  toggleSound: () => {
    const newMute = !get().isSoundMuted;
    soundEngine.setMuted(newMute);
    set({ isSoundMuted: newMute });
  },

  toggleLanguage: () => {
    const newLang = get().language === 'TR' ? 'EN' : 'TR';
    soundEngine.playUI('SELECT');
    set({ language: newLang });
  },

  startGame: () => {
    soundEngine.playUI('CONFIRM');
    set({ hasStartedGame: true });
  },

  setHasAcceptedLegalTerms: (accepted: boolean) => {
    set({ hasAcceptedLegalTerms: accepted });
  },

  returnToHero: () => {
    soundEngine.playUI('SELECT');
    set({ hasStartedGame: false });
  },

  loadHistoricalScenario: (data) => {
    soundEngine.stopHeartbeat();
    adversarialAIEngine.reset();
    soundEngine.playUI('CONFIRM');

    const nowTime = new Date().toLocaleTimeString('tr-TR');

    set({
      stateVector: { ...data.stateVector },
      turn: 1,
      phase: 1,
      activeCard: data.initialCard,
      cardQueue: INITIAL_CARDS.slice(1),
      history: [{ turn: 1, state: { ...data.stateVector }, decisionTitle: `Tarihsel Senaryo: ${data.title}` }],
      logs: [
        {
          id: `log_scenario_${Date.now()}`,
          timestamp: nowTime,
          turn: 1,
          type: 'SYSTEM',
          message: `[TARİHSEL SENARYO YÜKLENDİ] Dönem: ${data.era || 'Özel'} - ${data.title}. ${data.description}`,
        },
        ...(data.historicalNotes || []).map((note, idx) => ({
          id: `log_note_${idx}_${Date.now()}`,
          timestamp: nowTime,
          turn: 1,
          type: 'INTELLIGENCE' as const,
          message: `[TARİHSEL NOT] ${note}`,
        })),
      ],
      isGameOver: false,
      gameOverReason: null,
      isInterruptActive: false,
      hasStartedGame: true,
      hasAcceptedLegalTerms: true,
    });

    get().addToast({
      type: 'INFO',
      title: 'TARİHSEL SENARYO YÜKLENDİ',
      titleEN: 'HISTORICAL SCENARIO LOADED',
      message: `${data.title} (${data.era || 'Dönem'}) simülasyonu başlatıldı.`,
      messageEN: `${data.title} (${data.era || 'Era'}) simulation initialized.`,
      autoCloseMs: 6000,
    });
  },
}));
