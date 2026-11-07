import { StateVector, DecisionCard, AIThreatAgent } from '../types/game';

interface AIThreatState {
  nationalEstablishmentCooldown: number;
  globalCapitalCooldown: number;
}

export class AdversarialAIEngine {
  private state: AIThreatState = {
    nationalEstablishmentCooldown: 0,
    globalCapitalCooldown: 0,
  };

  public tickCooldowns(): void {
    if (this.state.nationalEstablishmentCooldown > 0) {
      this.state.nationalEstablishmentCooldown--;
    }
    if (this.state.globalCapitalCooldown > 0) {
      this.state.globalCapitalCooldown--;
    }
  }

  public getCooldowns(): AIThreatState {
    return { ...this.state };
  }

  public reset(): void {
    this.state = {
      nationalEstablishmentCooldown: 0,
      globalCapitalCooldown: 0,
    };
  }

  /**
   * Tehdit Aktörlerinin Durum Vektörünü Değerlendirmesi
   * Tehlikeli sınırlara ulaşıldığında acil durum sabotaj kartı üretir.
   */
  public evaluateThreats(
    stateVector: StateVector,
    currentTurn: number,
    threatResistance: boolean = false
  ): DecisionCard | null {
    this.tickCooldowns();

    // Güvenlik Danışmanı kalkanı varsa %35 olasılıkla tehdit savuşturulur
    if (threatResistance && Math.random() < 0.35) {
      return null;
    }

    // 1. KÜRESEL SERMAYE AĞLARI TAARRUZU
    // Eşik: TP > 70 && OH > 65 && KP < 30 (Finansal ve söylemsel özerklik küresel sermayeyi tehdit ediyor)
    if (
      this.state.globalCapitalCooldown === 0 &&
      ((stateVector.TP > 70 && stateVector.OH > 65 && stateVector.KP < 30) || stateVector.KD > 75)
    ) {
      this.state.globalCapitalCooldown = threatResistance ? 4 : 3; // kalkanlı durumda daha uzun soğuma
      return this.generateGlobalCapitalSabotage(stateVector, currentTurn);
    }

    // 2. ULUSAL MÜESSES NİZAM (DERİN BÜROKRASİ) MÜDAHALESİ
    // Eşik: PID > 65 && GB < 35 (Yüksek taban demokrasisi ve düşük vesayet müesses nizamı ürkütüyor)
    if (
      this.state.nationalEstablishmentCooldown === 0 &&
      ((stateVector.PID > 65 && stateVector.GB < 35) || (stateVector.OH > 70 && stateVector.GB < 40))
    ) {
      this.state.nationalEstablishmentCooldown = threatResistance ? 4 : 3;
      return this.generateNationalEstablishmentSabotage(stateVector, currentTurn);
    }

    return null;
  }

  private generateGlobalCapitalSabotage(S: StateVector, turn: number): DecisionCard {
    return {
      id: `interrupt_global_${turn}_${Date.now()}`,
      title: 'ACİL SABOTAJ: Kredi Notu Tenzili ve Spekülatif Kur Saldırısı',
      phase: Math.ceil(turn / 5),
      category: 'FINANCE',
      isInterrupt: true,
      threatActor: 'GLOBAL_CAPITAL',
      source: 'Küresel Sermaye ve Derecelendirme Konsorsiyumu',
      narrative: `[KÜRESEL SERMAYE AĞLARI HAREKETE GEÇTİ]\n\nBağımsız finansal kaynağınız (TP: ${S.TP.toFixed(0)}) ve kontrolsüz söylem gücünüz (OH: ${S.OH.toFixed(0)}) uluslararası sermaye koridorlarında kırmızı alarm verdirdi. Uluslararası kredi derecelendirme kuruluşları ülke notunu doğrudan 'Yatırım Yapılamaz' seviyesine indirdi. Döviz piyasasında yapay likidite sıkışıklığı yaratılarak kur taarruzu başlatıldı.`,
      options: [
        {
          id: 'opt_global_1',
          label: 'IMF / Uluslararası Konsorsiyum Şartlarını Kabul Et',
          description: 'Sermaye akışını durdurmak için küresel piyasalara boyun eğ, faiz artır ve bütçeyi uluslararası denetime aç.',
          stateDelta: { TP: -20, KP: +25, KD: -15, PID: -10 },
          riskFactor: 15,
          consequenceText: 'Küresel finans çevreleri saldırıyı geri çekti, ancak sistem bağımlılığınız (KP) tavan yaptı ve halk desteğiniz zedelendi.',
        },
        {
          id: 'opt_global_2',
          label: 'Sermaye Kontrolleri ve Yerel Para Kamulaştırması İlan Et',
          description: 'Döviz çıkışını yasakla, bağımsız finansal özerkliği koru ve küresel finans ajanlarına karşı cezai soruşturma aç.',
          stateDelta: { TP: +15, KP: -20, KD: +25, OH: +10 },
          riskFactor: 65,
          consequenceText: 'Küresel sermaye piyasalarından tamamen aforoz edildiniz. Kur dağınıklığı (KD) fırladı fakat finansal özerkliğinizi korudunuz.',
        },
        {
          id: 'opt_global_3',
          label: 'Alternatif Doğu/Avrasya Varlık Fonlarıyla Acil Takas (SWAP) Yap',
          description: 'Batı merkezli sermayeye karşı Doğu finans bloklarıyla örtülü likidite hattı kur.',
          stateDelta: { TP: +5, KP: +10, GB: +10, KD: -10 },
          riskFactor: 35,
          consequenceText: 'Nefes borusu açıldı ancak Gölge Bürokrasi ve yeni küresel aktörler yönetim üzerinde yeni bir ipotek kurdu.',
        },
      ],
    };
  }

  private generateNationalEstablishmentSabotage(S: StateVector, turn: number): DecisionCard {
    return {
      id: `interrupt_national_${turn}_${Date.now()}`,
      title: 'ACİL SABOTAJ: Yargısal Muhtıra ve Partiye Kayyum İhtimali',
      phase: Math.ceil(turn / 5),
      category: 'BUREAUCRACY',
      isInterrupt: true,
      threatActor: 'NATIONAL_ESTABLISHMENT',
      source: 'Yüksek Yargı ve Derin Bürokrasi Güvenlik Kurulu',
      narrative: `[ULUSAL MÜESSES NİZAM HAREKETE GEÇTİ]\n\nTaban demokrasinizdeki kontrolsüz tırmanış (PID: ${S.PID.toFixed(0)}) ve vesayet bürokrasisine (GB: ${S.GB.toFixed(0)}) boyun eğmeyişiniz müesses nizamın kırmızı çizgilerini aştı. Yargıtay Başsavcılığı, partinizin 'Anayasal düzene karşı odak haline geldiği' iddiasıyla kapatılma davası ve genel merkeze kayyum atanması sürecini başlattı.`,
      options: [
        {
          id: 'opt_national_1',
          label: 'Eski Kıdemli Bürokratlarla Gizli Uzlaşı Protokolü İmzala',
          description: 'Devletin eski tüfeklerine taviz ver, bakanlık kadrolarını gölge bürokrasiye devret ve tasfiyeyi durdur.',
          stateDelta: { GB: +25, PID: -20, KP: +10, OH: -5 },
          riskFactor: 20,
          consequenceText: 'Kapatılma davası rafa kaldırıldı ancak Parti İçi Demokrasi ağır bir darbe aldı ve parti üst yönetimi teknokratların eline geçti.',
        },
        {
          id: 'opt_national_2',
          label: 'Sokağı ve Tabanı Seferber Et, Sivil Direniş Başlat',
          description: 'Müesses nizamın muhtırasını tanıma! Meydanlarda milyonluk mitingler düzenleyerek halk iradesini barikata dönüştür.',
          stateDelta: { PID: +15, OH: +20, GB: -20, KD: +15 },
          riskFactor: 75,
          consequenceText: 'Görülmemiş bir halk desteği sağlandı. Söylem hegemonyanız tavan yaptı fakat bürokrasi ile ipler tamamen koptu.',
        },
        {
          id: 'opt_national_3',
          label: 'Anayasa Mahkemesi ve Uluslararası Hukuk Yollarında Zirve Savunma Yap',
          description: 'Taktiksel gerilimi düşür, hukuki argümanlarla süreci uzat ve bürokratik tasfiyeyi zamana yay.',
          stateDelta: { PID: -5, GB: +5, OH: -10, TP: -10 },
          riskFactor: 40,
          consequenceText: 'Kriz zamana yayıldı, hukuki manevra alanı kazanıldı ancak partinin ivmesi geçici olarak yavaşladı.',
        },
      ],
    };
  }
}

export const adversarialAIEngine = new AdversarialAIEngine();
