import { create } from 'zustand';
import {
  StateVector,
  DecisionCard,
  GameLog,
  IntelligenceFeedItem,
  ApiRateLimitStatus,
  ToastNotification,
  Advisor,
  EmergencyDecree,
  PastRunRecord,
} from '../types/game';
import { processTurn, clamp, AdvisorModifiers } from '../core/simulationEngine';
import { adversarialAIEngine } from '../core/adversarialAIEngine';
import { intelligenceService } from '../services/intelligenceService';
import { INITIAL_CARDS } from '../data/initialCards';
import { INITIAL_ADVISORS, INITIAL_DECREES } from '../data/cabinetAndDecrees';
import { generateProceduralCard } from '../core/proceduralCardEngine';
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
  isAmbientPlaying: boolean;
  hasStartedGame: boolean;
  hasAcceptedLegalTerms: boolean;
  language: 'TR' | 'EN';

  // Kabine ve Kararnameler
  advisors: Advisor[];
  decrees: EmergencyDecree[];
  pastRuns: PastRunRecord[];

  // Eylemler
  selectOption: (optionId: string) => void;
  activateAdvisorDoctrine: (advisorId: string) => void;
  enactEmergencyDecree: (decreeId: string) => void;
  fetchIntelligence: () => Promise<void>;
  resetGame: () => void;
  toggleSound: () => void;
  toggleAmbient: () => void;
  toggleLanguage: () => void;
  startGame: () => void;
  setHasAcceptedLegalTerms: (accepted: boolean) => void;
  returnToHero: () => void;
  addToast: (toast: Omit<ToastNotification, 'id' | 'timestamp'> & { id?: string }) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  saveGameToStorage: () => void;
  loadGameFromStorage: () => boolean;
  exportStateToJson: () => string;
  importStateFromJson: (jsonStr: string) => boolean;
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

const STORAGE_KEY_SAVE = 'devletakli_savegame_v2';
const STORAGE_KEY_PAST_RUNS = 'devletakli_past_runs_v2';

function loadPastRunsFromStorage(): PastRunRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PAST_RUNS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Past runs could not be loaded:', e);
  }
  return [];
}

function calculateGradeAndArchetype(
  state: StateVector,
  turn: number,
  reason: GameState['gameOverReason'],
  lang: 'TR' | 'EN'
) {
  let grade = 'B';
  if (reason === 'VICTORY') {
    grade = state.TP >= 70 && state.KD <= 35 ? 'A+' : 'A';
  } else if (turn >= 18) {
    grade = 'B+';
  } else if (turn >= 12) {
    grade = 'B';
  } else if (turn >= 6) {
    grade = 'C';
  } else {
    grade = 'F';
  }

  let archetype = lang === 'EN' ? 'Prudent Strategist' : 'İhtiyatlı Denge Stratejisti';
  let archetypeEN = 'Prudent Equilibrium Strategist';

  if (state.TP >= 65 && state.PID >= 60) {
    archetype = lang === 'EN' ? 'Grassroots Sovereign Democrat' : 'Demokratik Halk Egemeni';
    archetypeEN = 'Grassroots Sovereign Democrat';
  } else if (state.GB >= 65) {
    archetype = lang === 'EN' ? 'Technocratic Institutionalist' : 'Teknokratik Restorasyoncu';
    archetypeEN = 'Technocratic Institutionalist';
  } else if (state.OH >= 65) {
    archetype = lang === 'EN' ? 'Media Hegemon' : 'Söylem ve Kamuoyu Lideri';
    archetypeEN = 'Media Hegemon';
  } else if (state.KP >= 65) {
    archetype = lang === 'EN' ? 'Oligarchic Negotiator' : 'Holding ve Sermaye Dengecisi';
    archetypeEN = 'Oligarchic Negotiator';
  } else if (state.KD >= 75) {
    archetype = lang === 'EN' ? 'Market Shock Casualty' : 'Piyasa Çalkantısı Kurbanı';
    archetypeEN = 'Market Shock Casualty';
  }

  return { grade, archetype, archetypeEN };
}

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
  isAmbientPlaying: false,
  hasStartedGame: false,
  hasAcceptedLegalTerms: false,
  language: 'TR',

  advisors: JSON.parse(JSON.stringify(INITIAL_ADVISORS)),
  decrees: JSON.parse(JSON.stringify(INITIAL_DECREES)),
  pastRuns: loadPastRunsFromStorage(),

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
      toasts: [newToast, ...state.toasts].slice(0, 5),
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
    const { stateVector, turn, activeCard, cardQueue, history, logs, toasts, advisors, decrees, pastRuns, language } = get();
    if (!activeCard) return;

    const selectedOption = activeCard.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    // Danışman pasif bonuslarını hesapla
    const modifiers: AdvisorModifiers = {
      tpInflationDampener: 0.20, // Dr. Selim Aras
      pidMichelsDampener: 0.25, // Emine Candan
      gbProtection: true, // Albay Mete Demir
      ohProtection: true, // Deniz Yılmaz
    };

    // 1. Simülasyon Çekirdeğinde Tur İşleme ve Otonom Sürüklenme Hesabı
    const { nextState, drift } = processTurn(stateVector, selectedOption.stateDelta, modifiers);
    const nextTurn = turn + 1;
    const nextPhase = Math.min(4, Math.max(1, Math.ceil(nextTurn / 6)));

    // Ses Efekti
    soundEngine.playUI('CONFIRM');

    // Soğuma Sürelerini (Cooldown) İlerlet
    const updatedAdvisors = advisors.map((adv) => ({
      ...adv,
      currentCooldown: Math.max(0, adv.currentCooldown - 1),
    }));

    const updatedDecrees = decrees.map((dec) => ({
      ...dec,
      currentCooldown: Math.max(0, dec.currentCooldown - 1),
    }));

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
    } else if (
      nextTurn >= 18 &&
      nextState.TP >= 65 &&
      nextState.PID >= 50 &&
      nextState.GB >= 50 &&
      nextState.OH >= 55 &&
      nextState.KD <= 45
    ) {
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

      // Geçmiş İktidar Siciline Kaydet
      const { grade, archetype, archetypeEN } = calculateGradeAndArchetype(nextState, nextTurn, reason, language);
      const newPastRun: PastRunRecord = {
        id: `run_${Date.now()}`,
        date: new Date().toLocaleDateString('tr-TR'),
        turn: nextTurn,
        outcome: reason || 'OBLITERATED',
        finalState: nextState,
        grade,
        archetype,
        archetypeEN,
      };

      const updatedPastRuns = [newPastRun, ...pastRuns].slice(0, 15);
      try {
        localStorage.setItem(STORAGE_KEY_PAST_RUNS, JSON.stringify(updatedPastRuns));
      } catch (err) {
        console.warn('Past runs save error:', err);
      }

      set({
        stateVector: nextState,
        turn: nextTurn,
        advisors: updatedAdvisors,
        decrees: updatedDecrees,
        pastRuns: updatedPastRuns,
        history: [...history, { turn: nextTurn, state: nextState, decisionTitle: activeCard.title }],
        logs: [
          ...newLogs,
          {
            id: `log_gameover_${Date.now()}`,
            timestamp: nowTime,
            turn: nextTurn,
            type: 'SYSTEM',
            message: `[OYUN SONU] Simülasyon Tamamlandı. Sonuç: ${reason} - Not: ${grade} (${archetype})`,
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
    const threatCard = adversarialAIEngine.evaluateThreats(nextState, nextTurn, true);

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
        // Kart destesi bittiğinde PROSEDÜREL DİNAMİK KART MOTORU DEVREYE GİRER
        nextActiveCard = generateProceduralCard(nextState, nextTurn, language);
      }
    }

    // Otomatik Durum Kaydı (Auto-Save)
    const newStateData = {
      stateVector: nextState,
      turn: nextTurn,
      phase: nextPhase,
      advisors: updatedAdvisors,
      decrees: updatedDecrees,
      history: [...history, { turn: nextTurn, state: nextState, decisionTitle: activeCard.title }],
      logs: newLogs,
    };

    try {
      localStorage.setItem(STORAGE_KEY_SAVE, JSON.stringify(newStateData));
    } catch {}

    set({
      stateVector: nextState,
      turn: nextTurn,
      phase: nextPhase,
      advisors: updatedAdvisors,
      decrees: updatedDecrees,
      activeCard: nextActiveCard,
      cardQueue: nextQueue,
      history: newStateData.history,
      logs: newLogs,
      toasts: generatedToasts.slice(0, 5),
      isInterruptActive: isInterrupt,
    });
  },

  activateAdvisorDoctrine: (advisorId: string) => {
    const { advisors, stateVector, turn, logs, language } = get();
    const advisor = advisors.find((a) => a.id === advisorId);
    if (!advisor || advisor.currentCooldown > 0) return;

    soundEngine.playUI('DOCTRINE');

    const nextState: StateVector = {
      TP: clamp(stateVector.TP + (advisor.doctrineImpact.TP || 0)),
      KP: clamp(stateVector.KP + (advisor.doctrineImpact.KP || 0)),
      PID: clamp(stateVector.PID + (advisor.doctrineImpact.PID || 0)),
      GB: clamp(stateVector.GB + (advisor.doctrineImpact.GB || 0)),
      OH: clamp(stateVector.OH + (advisor.doctrineImpact.OH || 0)),
      KD: clamp(stateVector.KD + (advisor.doctrineImpact.KD || 0)),
    };

    const updatedAdvisors = advisors.map((a) =>
      a.id === advisorId ? { ...a, currentCooldown: a.cooldownMax } : a
    );

    const nowTime = new Date().toLocaleTimeString('tr-TR');
    const docTitle = language === 'EN' ? advisor.doctrineTitleEN : advisor.doctrineTitle;

    const newLogs: GameLog[] = [
      ...logs,
      {
        id: `log_adv_${Date.now()}`,
        timestamp: nowTime,
        turn,
        type: 'ADVISOR',
        message: `[DANIŞMAN DOKTRİNİ] ${advisor.name} -> "${docTitle}" devreye sokuldu!`,
        impact: language === 'EN' ? advisor.doctrineDescEN : advisor.doctrineDesc,
      },
    ];

    get().addToast({
      type: 'SUCCESS',
      title: language === 'EN' ? 'ADVISOR DOCTRINE ENACTED' : 'DANIŞMAN DOKTRİNİ İCRA EDİLDİ',
      message: `${advisor.name}: "${docTitle}"`,
      autoCloseMs: 5000,
    });

    set({
      stateVector: nextState,
      advisors: updatedAdvisors,
      logs: newLogs,
    });
  },

  enactEmergencyDecree: (decreeId: string) => {
    const { decrees, stateVector, turn, logs, language } = get();
    const decree = decrees.find((d) => d.id === decreeId);
    if (!decree || decree.currentCooldown > 0) return;

    soundEngine.playUI('DECREE');

    const nextState: StateVector = {
      TP: clamp(stateVector.TP + (decree.stateDelta.TP || 0)),
      KP: clamp(stateVector.KP + (decree.stateDelta.KP || 0)),
      PID: clamp(stateVector.PID + (decree.stateDelta.PID || 0)),
      GB: clamp(stateVector.GB + (decree.stateDelta.GB || 0)),
      OH: clamp(stateVector.OH + (decree.stateDelta.OH || 0)),
      KD: clamp(stateVector.KD + (decree.stateDelta.KD || 0)),
    };

    const updatedDecrees = decrees.map((d) =>
      d.id === decreeId ? { ...d, currentCooldown: d.cooldownMax } : d
    );

    const nowTime = new Date().toLocaleTimeString('tr-TR');
    const decreeTitle = language === 'EN' ? decree.titleEN : decree.title;

    const newLogs: GameLog[] = [
      ...logs,
      {
        id: `log_decree_${Date.now()}`,
        timestamp: nowTime,
        turn,
        type: 'DECREE',
        message: `[OLAĞANÜSTÜ KARARNAME] "${decreeTitle}" yürürlüğe girdi.`,
        impact: language === 'EN' ? decree.descriptionEN : decree.description,
      },
    ];

    get().addToast({
      type: 'WARNING',
      title: language === 'EN' ? 'EMERGENCY DECREE ENACTED' : 'OLAĞANÜSTÜ KARARNAME YÜRÜRLÜKTE',
      message: `"${decreeTitle}"`,
      autoCloseMs: 5000,
    });

    set({
      stateVector: nextState,
      decrees: updatedDecrees,
      logs: newLogs,
    });
  },

  saveGameToStorage: () => {
    const { stateVector, turn, phase, activeCard, cardQueue, history, logs, advisors, decrees, language } = get();
    const saveData = {
      stateVector,
      turn,
      phase,
      activeCard,
      cardQueue,
      history,
      logs,
      advisors,
      decrees,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY_SAVE, JSON.stringify(saveData));
      soundEngine.playUI('CONFIRM');
      get().addToast({
        type: 'SUCCESS',
        title: language === 'EN' ? 'SIMULATION SAVED' : 'SİMÜLASYON KAYDEDİLDİ',
        message: language === 'EN' ? `State saved at Turn #${turn}` : `Tur #${turn} itibarıyla durum hafızaya kaydedildi.`,
        autoCloseMs: 4000,
      });
    } catch (e) {
      console.error('Save failed:', e);
    }
  },

  loadGameFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVE);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.stateVector || !data.turn) return false;

      soundEngine.playUI('CONFIRM');
      set({
        stateVector: data.stateVector,
        turn: data.turn,
        phase: data.phase || Math.min(4, Math.ceil(data.turn / 6)),
        activeCard: data.activeCard || INITIAL_CARDS[0],
        cardQueue: data.cardQueue || [],
        history: data.history || [{ turn: data.turn, state: data.stateVector, decisionTitle: 'Kayıt Yüklendi' }],
        logs: data.logs || [],
        advisors: data.advisors || JSON.parse(JSON.stringify(INITIAL_ADVISORS)),
        decrees: data.decrees || JSON.parse(JSON.stringify(INITIAL_DECREES)),
        isGameOver: false,
        gameOverReason: null,
        isInterruptActive: false,
        hasStartedGame: true,
      });

      get().addToast({
        type: 'INFO',
        title: get().language === 'EN' ? 'SIMULATION LOADED' : 'KAYITLI SİMÜLASYON YÜKLENDİ',
        message: get().language === 'EN' ? `Resumed from Turn #${data.turn}` : `Tur #${data.turn} konumundan devam ediliyor.`,
        autoCloseMs: 4000,
      });
      return true;
    } catch (e) {
      console.error('Load failed:', e);
      return false;
    }
  },

  exportStateToJson: () => {
    const { stateVector, turn, phase, history, logs, advisors, decrees } = get();
    return JSON.stringify({ stateVector, turn, phase, history, logs, advisors, decrees, exportedAt: new Date().toISOString() }, null, 2);
  },

  importStateFromJson: (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.stateVector || !data.turn) return false;
      set({
        stateVector: data.stateVector,
        turn: data.turn,
        phase: data.phase || 1,
        history: data.history || [],
        logs: data.logs || [],
        advisors: data.advisors || JSON.parse(JSON.stringify(INITIAL_ADVISORS)),
        decrees: data.decrees || JSON.parse(JSON.stringify(INITIAL_DECREES)),
        isGameOver: false,
        gameOverReason: null,
        hasStartedGame: true,
      });
      return true;
    } catch {
      return false;
    }
  },

  fetchIntelligence: async () => {
    const { logs } = get();

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
      advisors: JSON.parse(JSON.stringify(INITIAL_ADVISORS)),
      decrees: JSON.parse(JSON.stringify(INITIAL_DECREES)),
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

  toggleAmbient: () => {
    const isPlaying = soundEngine.toggleAmbient();
    set({ isAmbientPlaying: isPlaying });
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

    const rawCard = data.initialCard || ({} as any);
    const normalizedCard: DecisionCard = {
      id: rawCard.id || `hist_card_${Date.now()}`,
      title: rawCard.title || data.title,
      phase: 1,
      category: (rawCard.category as any) || 'FINANCE',
      narrative: rawCard.narrative || rawCard.description || data.description || '',
      source: rawCard.source || 'Tarihsel Arşiv',
      options: (rawCard.options || []).map((opt: any, idx: number) => ({
        id: opt.id || `opt_${idx + 1}`,
        label: opt.label || opt.text || `Direktif ${idx + 1}`,
        description: opt.description || opt.text || opt.logMessage || '',
        stateDelta: opt.stateDelta || opt.impact || {},
        riskFactor: opt.riskFactor ?? Math.floor(Math.random() * 40 + 20),
        consequenceText: opt.consequenceText || opt.logMessage || 'Tarihsel karar kayda geçti.',
      })),
    };

    set({
      stateVector: { ...data.stateVector },
      turn: 1,
      phase: 1,
      activeCard: normalizedCard,
      cardQueue: INITIAL_CARDS.slice(1),
      advisors: JSON.parse(JSON.stringify(INITIAL_ADVISORS)),
      decrees: JSON.parse(JSON.stringify(INITIAL_DECREES)),
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
