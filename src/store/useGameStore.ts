import { create } from 'zustand';
import { StateVector, DecisionCard, GameLog, IntelligenceFeedItem, ApiRateLimitStatus } from '../types/game';
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
  intelligenceFeed: IntelligenceFeedItem[];
  rateLimitStatus: ApiRateLimitStatus;
  isGameOver: boolean;
  gameOverReason: 'VICTORY' | 'OBLITERATED' | 'AUTOCRACY_DEFEAT' | 'BANKRUPT_DEFEAT' | 'DEEP_STATE_DEFEAT' | null;
  isInterruptActive: boolean;
  isSoundMuted: boolean;
  hasStartedGame: boolean;
  hasAcceptedLegalTerms: boolean;

  // Eylemler
  selectOption: (optionId: string) => void;
  fetchIntelligence: () => Promise<void>;
  resetGame: () => void;
  toggleSound: () => void;
  startGame: () => void;
  setHasAcceptedLegalTerms: (accepted: boolean) => void;
  returnToHero: () => void;
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
  intelligenceFeed: [],
  rateLimitStatus: intelligenceService.getRateLimitStatus(),
  isGameOver: false,
  gameOverReason: null,
  isInterruptActive: false,
  isSoundMuted: false,
  hasStartedGame: false,
  hasAcceptedLegalTerms: false,

  selectOption: (optionId: string) => {
    const { stateVector, turn, activeCard, cardQueue, history, logs } = get();
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

    if (gameOver) {
      soundEngine.stopHeartbeat();
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
          source: 'Milli Güvenlik ve Strateji Kurulu',
          narrative: 'Ülke kritik bir dönemeçten geçiyor. Teşkilatların ve bürokrasinin uyumu için radikal bir karar alınması bekleniyor.',
          options: [
            {
              id: `opt_gen_${nextTurn}_1`,
              label: 'Milli Kaynakları Seferber Et ve Şeffaflığı Artır',
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
}));
