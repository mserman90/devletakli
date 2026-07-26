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
  link: string;
  pubDate: string;
  source: string;
  category: string;
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
  type: 'DECISION' | 'DRIFT' | 'AI_ATTACK' | 'INTELLIGENCE' | 'SYSTEM' | 'WARNING';
  message: string;
  impact?: string;
}
