export interface StateVector {
  TP: number; // Temiz Para (Tabandan Kitlesel Fonlama)
  KP: number; // Kirli Para (Holding Bağışları ve Sistem Fonları)
  PID: number; // Parti İçi Demokrasi (Oligarşileşme Direnci)
  GB: number; // Gölge Bürokrasi (Kurumsal Hafıza ve Teknokrat Gücü)
  OH: number; // Overton Hegemonyası (Otonom Medya ve Söylem Gücü)
  KD: number; // Kur Dağınıklığı (Küresel Piyasa Baskısı ve Volatilite)
}

export type AIThreatAgent = 'NATIONAL_ESTABLISHMENT' | 'GLOBAL_CAPITAL';

export interface CardOption {
  id: string;
  label: string;
  description: string;
  stateDelta: Partial<StateVector>;
  riskFactor?: number; // 0 to 100 percentage
  consequenceText: string;
}

export interface DecisionCard {
  id: string;
  title: string;
  phase: number; // 1, 2, 3, 4
  category: 'FINANCE' | 'POLITICS' | 'BUREAUCRACY' | 'MEDIA' | 'FOREIGN' | 'SECURITY';
  narrative: string;
  source: string;
  options: CardOption[];
  isInterrupt?: boolean;
  threatActor?: AIThreatAgent;
}

export interface InterruptEvent {
  id: string;
  triggerCondition: string;
  card: DecisionCard;
  threatActor: AIThreatAgent;
}

export interface IntelligenceFeedItem {
  id: string;
  title: string;
  titleEN?: string;
  link: string;
  pubDate: string;
  source: string;
  sourceEN?: string;
  category: string;
  categoryEN?: string;
  urgency: 'NORMAL' | 'HIGH' | 'CRITICAL';
}

export interface ApiRateLimitStatus {
  limit: number;
  remaining: number;
  usedPercentage: number;
  isWarningThreshold: boolean; // >= 80% usage
  isError: boolean;
  errorMessage?: string;
}

export interface GameLog {
  id: string;
  timestamp: string;
  turn: number;
  type: 'DECISION' | 'DRIFT' | 'AI_ATTACK' | 'INTELLIGENCE' | 'SYSTEM' | 'WARNING' | 'DECREE' | 'ADVISOR';
  message: string;
  impact?: string;
}

export interface ToastNotification {
  id: string;
  type: 'DANGER' | 'WARNING' | 'INFO' | 'SUCCESS';
  title: string;
  titleEN?: string;
  message: string;
  messageEN?: string;
  timestamp: string;
  metricCode?: 'TP' | 'KP' | 'PID' | 'GB' | 'OH' | 'KD';
  autoCloseMs?: number;
}

export interface Advisor {
  id: string;
  name: string;
  role: string;
  roleEN: string;
  bio: string;
  bioEN: string;
  passiveDescription: string;
  passiveDescriptionEN: string;
  iconName: 'landmark' | 'users' | 'shield' | 'radio';
  doctrineTitle: string;
  doctrineTitleEN: string;
  doctrineDesc: string;
  doctrineDescEN: string;
  doctrineImpact: Partial<StateVector>;
  cooldownMax: number;
  currentCooldown: number;
}

export interface EmergencyDecree {
  id: string;
  title: string;
  titleEN: string;
  description: string;
  descriptionEN: string;
  stateDelta: Partial<StateVector>;
  cooldownMax: number;
  currentCooldown: number;
}

export interface PastRunRecord {
  id: string;
  date: string;
  turn: number;
  outcome: 'VICTORY' | 'OBLITERATED' | 'AUTOCRACY_DEFEAT' | 'BANKRUPT_DEFEAT' | 'DEEP_STATE_DEFEAT';
  finalState: StateVector;
  grade: string;
  archetype: string;
  archetypeEN: string;
}
