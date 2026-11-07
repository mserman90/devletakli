import { StateVector } from '../types/game';

/**
 * MATEMATİKSEL SİMÜLASYON ÇEKİRDEĞİ
 * 6 boyutlu durum vektörünü [0, 100] aralığında sınırlar ve
 * doğrusal olmayan otonom sürüklenme (Omega) vektörünü hesaplar.
 */

export function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export interface DriftResult {
  deltaTP: number;
  deltaKP: number;
  deltaPID: number;
  deltaGB: number;
  deltaOH: number;
  deltaKD: number;
  summaryText: string[];
}

export interface AdvisorModifiers {
  tpInflationDampener?: number; // e.g. 0.20 for 20% dampening
  pidMichelsDampener?: number; // e.g. 0.25 for 25% dampening
  gbProtection?: boolean; // prevents GB natural decay
  ohProtection?: boolean; // prevents OH natural decay
}

/**
 * Otonom Sürüklenme Vektörü (Omega) Hesaplama
 */
export function calculateDrift(S: StateVector, modifiers?: AdvisorModifiers): DriftResult {
  const summaryText: string[] = [];

  // 1. Robert Michels Oligarşileşme İvmesi
  // Eğer KP > 50 ve PID < 50 ise, her tur PID kaybı: -8.5 * (KP/100)^2 * (1 - PID/100)
  let deltaPID = 0;
  if (S.KP > 50 && S.PID < 50) {
    let rawPID = -8.5 * Math.pow(S.KP / 100, 2) * (1 - S.PID / 100);
    if (modifiers?.pidMichelsDampener) {
      rawPID *= (1 - modifiers.pidMichelsDampener);
      summaryText.push(
        `[Michels Yasası - Danışman Kalkanı] Kirli Para etkisi sınırlandırıldı (PID: ${rawPID.toFixed(1)})`
      );
    } else {
      summaryText.push(
        `[Michels Yasası] Kirli Para egemenliği Parti İçi Demokrasiyi zayıflatıyor (PID: ${rawPID.toFixed(1)})`
      );
    }
    deltaPID = rawPID;
  }

  // 2. Thomas Friedman Kur Dağınıklığı
  // KD değişimi: 12.0 * max(0, (TP + OH)/2 - KP)/100 - 6.0 * (GB/100)
  const structuralMismatch = Math.max(0, (S.TP + S.OH) / 2 - S.KP);
  const deltaKD = 12.0 * (structuralMismatch / 100) - 6.0 * (S.GB / 100);
  if (Math.abs(deltaKD) > 0.5) {
    if (deltaKD > 0) {
      summaryText.push(
        `[Friedman Şoku] Piyasa dengesizliği Kur Dağınıklığını tetikliyor (KD: +${deltaKD.toFixed(1)})`
      );
    } else {
      summaryText.push(
        `[Teknokrat Denge] Gölge Bürokrasi Kur Dağınıklığını bastırıyor (KD: ${deltaKD.toFixed(1)})`
      );
    }
  }

  // 3. Enflasyonist Bütçe Eriyik Hızı
  // TP kaybı: -4.0 * (1 + (KD/50)^2)
  let rawTP = -4.0 * (1 + Math.pow(S.KD / 50, 2));
  if (modifiers?.tpInflationDampener) {
    rawTP *= (1 - modifiers.tpInflationDampener);
    summaryText.push(
      `[Enflasyon Baskısı - Hazine Kalkanı] Rezerv erimesi hafifletildi (TP: ${rawTP.toFixed(1)})`
    );
  } else {
    summaryText.push(
      `[Enflasyon Baskısı] Yüksek Kur Volatilitesi Temiz Parayı eritiyor (TP: ${rawTP.toFixed(1)})`
    );
  }
  const deltaTP = rawTP;

  // 4. Doğal Otonom Etkileşimler (Gölge Bürokrasi ve Overton Sürüklenmeleri)
  let deltaGB = 0;
  if (S.GB < 30) {
    deltaGB = modifiers?.gbProtection ? 0 : -1.5;
  } else if (S.GB > 70) {
    deltaGB = 0.8;
  }

  // Overton Penceresi Medya gücü (OH) ile beslenir veya yıpranır
  let deltaOH = 0;
  if (S.OH < 30) {
    deltaOH = modifiers?.ohProtection ? 0 : -1.0;
  } else if (S.OH > 70 && S.KP < 40) {
    deltaOH = 1.2;
  }

  // Kirli Para (KP) yüksek kaldıkça otomasyondan %1.0 artış eğilimi taşır
  let deltaKP = 0;
  if (S.KP > 60) {
    deltaKP = 1.0;
  }

  return {
    deltaTP: Number(deltaTP.toFixed(2)),
    deltaKP: Number(deltaKP.toFixed(2)),
    deltaPID: Number(deltaPID.toFixed(2)),
    deltaGB: Number(deltaGB.toFixed(2)),
    deltaOH: Number(deltaOH.toFixed(2)),
    deltaKD: Number(deltaKD.toFixed(2)),
    summaryText,
  };
}

/**
 * Tur Geçiş İşleyicisi
 * S_(t+1) = clamp( S_t + M(S_t) * Delta + Omega(S_t), 0, 100 )
 */
export function processTurn(
  currentState: StateVector,
  decisionDelta: Partial<StateVector>,
  modifiers?: AdvisorModifiers
): { nextState: StateVector; drift: DriftResult } {
  const drift = calculateDrift(currentState, modifiers);

  const nextState: StateVector = {
    TP: clamp(currentState.TP + (decisionDelta.TP || 0) + drift.deltaTP),
    KP: clamp(currentState.KP + (decisionDelta.KP || 0) + drift.deltaKP),
    PID: clamp(currentState.PID + (decisionDelta.PID || 0) + drift.deltaPID),
    GB: clamp(currentState.GB + (decisionDelta.GB || 0) + drift.deltaGB),
    OH: clamp(currentState.OH + (decisionDelta.OH || 0) + drift.deltaOH),
    KD: clamp(currentState.KD + (decisionDelta.KD || 0) + drift.deltaKD),
  };

  return { nextState, drift };
}
