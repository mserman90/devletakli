export type Language = 'TR' | 'EN';

export interface CardTranslation {
  titleEn: string;
  narrativeEn: string;
  sourceEn: string;
  optionsEn: {
    id: string;
    labelEn: string;
    descriptionEn: string;
    consequenceTextEn: string;
  }[];
}

export const CARD_TRANSLATIONS: Record<string, CardTranslation> = {
  card_p1_1: {
    titleEn: 'Financing Strategy: Grassroots Donations vs. Conglomerate Capital',
    narrativeEn: 'Immediate cash flow is needed for monthly rent, personnel, and digital broadcasting expenses of the newly established organization network. An executive from a major industrial conglomerate offers a covert 10-million unit fund in exchange for softening your editorial stance. The alternative is to proceed independently but slowly via micro grassroots donations.',
    sourceEn: 'Party Financial Affairs Directorate Report',
    optionsEn: [
      {
        id: 'opt_p1_1_a',
        labelEn: 'Launch Grassroots Micro Donation Campaign (Mobile Solidarity)',
        descriptionEn: 'Collect mass crowdfunding from citizens in small amounts. Secure total financial autonomy.',
        consequenceTextEn: 'Budget remained tight, but your party legitimacy and independence among the grassroots skyrocketed.',
      },
      {
        id: 'opt_p1_1_b',
        labelEn: 'Covertly Accept Conglomerate Offer',
        descriptionEn: 'Take the industrial conglomerate fund and rapidly build organizational headquarters.',
        consequenceTextEn: 'Cash flow was secured, but conglomerate representatives started interfering in party founders council.',
      },
      {
        id: 'opt_p1_1_c',
        labelEn: 'Implement Austerity Regime & Partner with Local Trade Unions',
        descriptionEn: 'Cut expenses and secure in-kind support through local merchant chambers.',
        consequenceTextEn: 'Balanced and prudent growth was achieved.',
      },
    ],
  },
  card_p1_2: {
    titleEn: 'Bylaw Reform: Primary Elections vs. Central Executive Delegation',
    narrativeEn: 'The clause determining parliamentary and provincial candidate selection has arrived. The organizational base demands direct ballot boxes under judicial supervision. Veteran party bureaucrats argue that provincial trustees must be appointed directly by headquarters.',
    sourceEn: 'Bylaw Drafting Commission Draft',
    optionsEn: [
      {
        id: 'opt_p1_2_a',
        labelEn: 'Enforce Direct Primary Elections & Open List System in Bylaws',
        descriptionEn: 'Guarantee intra-party democracy constitutionally and break oligarchic guardianship.',
        consequenceTextEn: 'Grassroots united enthusiastically. Intra-party tutelage broke down, though discipline oversight became challenging.',
      },
      {
        id: 'opt_p1_2_b',
        labelEn: 'Bind Candidate Selection Authority to Party Chair & Executive Board',
        descriptionEn: 'Maintain discipline and vertical chain of command, curbing intra-party opposition.',
        consequenceTextEn: 'Headquarters gained total control, but the party entered an oligarchic path (Michels Effect triggered).',
      },
    ],
  },
  card_p2_1: {
    titleEn: 'Autonomous Media Network: Digital Broadcasting Channel vs. Mainstream Media',
    narrativeEn: 'Traditional mainstream television networks are imposing a media embargo on your party. To reach mass audiences, you stand on the threshold of building a centralized digital network or acquiring shares in mainstream media to infiltrate from within.',
    sourceEn: 'Communications & Media Policy Desk',
    optionsEn: [
      {
        id: 'opt_p2_1_a',
        labelEn: 'Establish Open-Source Independent Digital Media & Podcast Network',
        descriptionEn: 'Support young creators and build autonomous media breaking algorithmic embargoes.',
        consequenceTextEn: 'Overton Window shifted in your favor! Tremendous discourse dominance was established among youth voters.',
      },
      {
        id: 'opt_p2_1_b',
        labelEn: 'Acquire Television Channel from System Conglomerate',
        descriptionEn: 'Buy national channel through financial concessions, reaching traditional households.',
        consequenceTextEn: 'Traditional voters reached, but censorship demands from channel sponsors diluted party narrative.',
      },
    ],
  },
  card_p2_2: {
    titleEn: 'Algorithm Wave: Social Media Manipulation & Troll Networks',
    narrativeEn: 'Rival factions are spreading fake news about your party using AI-powered troll armies. Advisors suggest establishing a digital defense unit capable of counter-disinformation.',
    sourceEn: 'Digital Intelligence Unit',
    optionsEn: [
      {
        id: 'opt_p2_2_a',
        labelEn: 'Publish Transparency Declaration & Establish Fact-Checking Unit',
        descriptionEn: 'Expose troll networks and inform the public with organic factual content.',
        consequenceTextEn: 'Circle of organic trust expanded. Cognitive disinformation wave successfully repelled.',
      },
      {
        id: 'opt_p2_2_b',
        labelEn: 'Deploy Shadow Psychological Operations & Bot Networks',
        descriptionEn: 'Wear down rivals in digital space through aggressive perception operations.',
        consequenceTextEn: 'Rival perception broken in short term, but your party ethical legitimacy came under public scrutiny.',
      },
    ],
  },
  card_p3_1: {
    titleEn: 'Shadow Bureaucracy & Technocrat Academy Establishment',
    narrativeEn: 'To prevent state apparatus paralysis on inauguration day, shadow ministerial teams must be prepared. Retired senior bureaucrats and commanders offer institutional memory in exchange for immunity guarantees.',
    sourceEn: 'Strategic Administrative Studies Center',
    optionsEn: [
      {
        id: 'opt_p3_1_a',
        labelEn: 'Build Meritocratic "Shadow Cabinet" with Academics & Technocrats',
        descriptionEn: 'Train qualified technocrats committed to meritocracy and anti-guardianship.',
        consequenceTextEn: 'Institutional memory combined with meritocracy. Markets gained confidence in your governance capability.',
      },
      {
        id: 'opt_p3_1_b',
        labelEn: 'Sign Secret Pact with Deep Bureaucracy Cliques',
        descriptionEn: 'Guarantee posts to old state commanders and retired high judiciary members.',
        consequenceTextEn: 'Shadow bureaucracy peaked, but party decisions became subject to approval from guardianship hubs.',
      },
    ],
  },
  card_p4_1: {
    titleEn: 'Global Bond Markets & Sovereign Wealth Framework',
    narrativeEn: 'State debt rollover period has arrived. Investment banks based in international financial centers offer high-interest hot money to cover current account deficits. Terms: Accelerated privatizations and removal of public audits.',
    sourceEn: 'Treasury & External Financial Relations Report',
    optionsEn: [
      {
        id: 'opt_p4_1_a',
        labelEn: 'Reject Global Hot Money; Launch Domestic Production & Resource Package',
        descriptionEn: 'Halt external borrowing, initiate self-resource surge, and declare financial independence.',
        consequenceTextEn: 'Global financial circles retaliated by spiking currency rates, but public wealth remained in citizen hands.',
      },
      {
        id: 'opt_p4_1_b',
        labelEn: 'Accept Global Consortium Terms & Attract Hot Money Flow',
        descriptionEn: 'Raise interest rates and grant privileges to international capital funds.',
        consequenceTextEn: 'Exchange volatility decreased, but the country fell under external financial tutelage.',
      },
    ],
  },
};

export const UI_TRANSLATIONS = {
  TR: {
    header: {
      title: 'MİLLİ HAKİMİYET VE VESAYET SİMÜLASYONU',
      subtitle: 'Devlet Aklı, Kamu Söylemi ve Gölge Bürokrasi Simülatörü',
      turn: 'TUR',
      phase: 'FAZ',
      alarm: 'ACİL SABOTAJ MÜDAHALESİ',
      homeTooltipTitle: 'Giriş Ekranı',
      homeTooltipDesc: 'Simülasyon karşılama ve başlangıç ekranına dön.',
      kodleksTooltipTitle: 'Kodleks El Kitabı',
      kodleksTooltipDesc: 'Teori, sosyoloji külliyatı ve simülasyon rehberi.',
      disclaimerTooltipTitle: 'Yasal Uyarı',
      disclaimerTooltipDesc: 'Hukuki sorumluluk reddi ve akademik çerçeve beyanı.',
      soundOn: 'Sesi Kapat',
      soundOff: 'Sesi Aç',
      soundDesc: 'Simülasyon daktilo ve arayüz ses efektlerini kontrol et.',
      resetTitle: 'Simülasyonu Sıfırla',
      resetDesc: 'Tüm tur ve durum vektörü verilerini ilk durumuna döndür.',
      langToggleTitle: 'English Language',
      langToggleDesc: 'Arayüz dilini İngilizce yapmak için tıkla (TR / EN).',
    },
    tabs: {
      DECISION: 'KARAR MASASI',
      TELEMETRY: 'TELEMETRİ',
      INTELLIGENCE: 'BİLGİ AKIŞI',
      LOGS: 'GÜNLÜK',
      ALL: 'TÜMÜ',
    },
    telemetry: {
      title: '6-BOYUTLU DURUM VEKTÖRÜ',
      formula: 'MATEMATİKSEL FORMÜL',
      systemStatus: 'SİSTEM DURUMU',
      matrixStatus: 'MATRİS DENGESİ',
      optimal: 'OPTİMAL',
      critical: 'KRİTİK',
      warning: 'HASSAS',
      TP: 'Temiz Para',
      KP: 'Kirli Para',
      PID: 'Parti İçi Demokrasi',
      GB: 'Gölge Bürokrasi',
      OH: 'Overton Hegemonyası',
      KD: 'Kur Dağınıklığı',
    },
    decision: {
      alarmBanner: 'ACİL SABOTAJ MÜDAHALESİ (INTERRUPT)',
      globalThreat: 'KÜRESEL SERMAYE AĞLARI SABOTAJI',
      nationalThreat: 'ULUSAL MÜESSES NİZAM SABOTAJI',
      directive: 'DİREKTİFİ',
      source: 'KAYNAK',
      risk: 'RİSK',
      outcomeTitle: 'KARAR VE SİMÜLASYON YANSIMASI',
      nextTurn: 'SONRAKİ TURA GEÇ',
      gameOverTitle: 'SİMÜLASYON TAMAMLANDI',
      gameOverDesc: 'Sonuç raporu ve durum analizi hazırlandı.',
      viewReport: 'RAPORU İNCELE',
    },
    intelligence: {
      title: 'BİLGİ AKIŞI',
      fetching: 'GÜNCELLENİYOR...',
      refresh: 'YENİLE',
      source: 'KAYNAK',
      high: 'YÜKSEK',
      critical: 'KRİTİK',
      normal: 'NORMAL',
      quotaRatio: 'KOTA RASYOSU (API)',
      quotaWarning: '[UYARI - KOTA EŞİĞİ] %80 Telgraf Limiti Doldu (RFC 6585)',
      noData: 'VERİ MEVCUT DEĞİL',
    },
    ticker: {
      title: 'BİLGİ AKIŞI',
      quotaRatio: 'KOTA RASYOSU (API)',
      quotaWarning: '[UYARI - KOTA EŞİĞİ] %80 Telgraf Limiti Doldu (RFC 6585)',
      noData: 'VERİ MEVCUT DEĞİL',
    },
    logs: {
      title: 'SİSTEM GÜNLÜĞÜ VE KÖK NEDEN ANALİZİ',
      ALL: 'TÜMÜ',
      DECISION: 'KARAR',
      DRIFT: 'SAPMA',
      AI_ATTACK: 'MÜDAHALE',
      WARNING: 'UYARI',
      SYSTEM: 'SİSTEM',
      noLogs: 'Bu kategoride henüz kayıtlı günlük girdisi bulunmuyor.',
    },
    hero: {
      title: 'MİLLİ HAKİMİYET VE VESAYET SİMÜLASYONU',
      subtitle: 'Siyasi Teori, Gölge Bürokrasi ve Kamu Söylemi Simülatörü',
      startBtn: 'SİMÜLASYONU BAŞLAT',
      kodleksBtn: 'KODLEKS EL KİTABI',
      disclaimerBtn: 'YASAL UYARI METNİ',
      academicTitle: 'Akademik Metodoloji & Kurgusal Çerçeve',
      academicDesc: 'Bu simülasyon; Robert Michels (Tunç Kanunu), Max Weber (Bürokrasi), C. Wright Mills (İktidar Seçkinleri) ve Joseph Overton (Overton Penceresi) kuramsal modelleri temel alınarak geliştirilmiş matematiksel bir oyun simülatörüdür.',
    },
    gameOver: {
      restartBtn: 'YENİ SİMÜLASYON BAŞLAT',
      telemetryTitle: 'SON SİMÜLASYON RAPORU:',
      totalTurn: 'TOPLAM TUR',
    },
  },
  EN: {
    header: {
      title: 'NATIONAL SOVEREIGNTY & GUARDIANSHIP SIMULATION',
      subtitle: 'State Reason, Public Discourse & Shadow Bureaucracy Simulator',
      turn: 'TURN',
      phase: 'PHASE',
      alarm: 'EMERGENCY SABOTAGE INTERVENTION',
      homeTooltipTitle: 'Landing Screen',
      homeTooltipDesc: 'Return to welcome and simulation starting page.',
      kodleksTooltipTitle: 'Kodleks Manual',
      kodleksTooltipDesc: 'Political theory, sociology canon, and system guide.',
      disclaimerTooltipTitle: 'Legal Disclaimer',
      disclaimerTooltipDesc: 'Legal liability waiver and academic framework declaration.',
      soundOn: 'Mute Sound',
      soundOff: 'Unmute Sound',
      soundDesc: 'Control simulation typewriter and audio effects.',
      resetTitle: 'Reset Simulation',
      resetDesc: 'Reset all turn logs and state vector parameters to initial state.',
      langToggleTitle: 'Türkçe Dil Seçeneği',
      langToggleDesc: 'Switch interface language to Turkish (TR / EN).',
    },
    tabs: {
      DECISION: 'DECISION DESK',
      TELEMETRY: 'TELEMETRY',
      INTELLIGENCE: 'INFORMATION FEED',
      LOGS: 'LOGS',
      ALL: 'ALL',
    },
    telemetry: {
      title: '6-DIMENSIONAL STATE VECTOR',
      formula: 'MATHEMATICAL FORMULA',
      systemStatus: 'SYSTEM STATUS',
      matrixStatus: 'MATRIX BALANCE',
      optimal: 'OPTIMAL',
      critical: 'CRITICAL',
      warning: 'SENSITIVE',
      TP: 'Clean Capital',
      KP: 'Dark Capital',
      PID: 'Party Democracy',
      GB: 'Shadow Bureaucracy',
      OH: 'Overton Hegemony',
      KD: 'Exchange Volatility',
    },
    decision: {
      alarmBanner: 'EMERGENCY SABOTAGE INTERVENTION (INTERRUPT)',
      globalThreat: 'GLOBAL CAPITAL NETWORKS SABOTAGE',
      nationalThreat: 'NATIONAL ESTABLISHMENT SABOTAGE',
      directive: 'DIRECTIVE',
      source: 'SOURCE',
      risk: 'RISK',
      outcomeTitle: 'DECISION & SIMULATION OUTCOME',
      nextTurn: 'PROCEED TO NEXT TURN',
      gameOverTitle: 'SIMULATION COMPLETED',
      gameOverDesc: 'Summary analysis report and state telemetry prepared.',
      viewReport: 'VIEW REPORT',
    },
    intelligence: {
      title: 'INFORMATION FEED',
      fetching: 'UPDATING...',
      refresh: 'REFRESH',
      source: 'SOURCE',
      high: 'HIGH',
      critical: 'CRITICAL',
      normal: 'NORMAL',
      quotaRatio: 'QUOTA RATIO (API)',
      quotaWarning: '[WARNING - QUOTA THRESHOLD] 80% Telegraph Limit Reached (RFC 6585)',
      noData: 'NO DATA AVAILABLE',
    },
    ticker: {
      title: 'INFORMATION FEED',
      quotaRatio: 'QUOTA RATIO (API)',
      quotaWarning: '[WARNING - QUOTA THRESHOLD] 80% Telegraph Limit Reached (RFC 6585)',
      noData: 'NO DATA AVAILABLE',
    },
    logs: {
      title: 'SYSTEM LOG & ROOT CAUSE ANALYSIS',
      ALL: 'ALL',
      DECISION: 'DECISION',
      DRIFT: 'DRIFT',
      AI_ATTACK: 'INTERVENTION',
      WARNING: 'WARNING',
      SYSTEM: 'SYSTEM',
      noLogs: 'No log entries found in this category yet.',
    },
    hero: {
      title: 'NATIONAL SOVEREIGNTY & GUARDIANSHIP SIMULATION',
      subtitle: 'Political Theory, Shadow Bureaucracy & Public Discourse Simulator',
      startBtn: 'START SIMULATION',
      kodleksBtn: 'KODLEKS MANUAL',
      disclaimerBtn: 'LEGAL DISCLAIMER',
      academicTitle: 'Academic Methodology & Fictional Framework',
      academicDesc: 'This simulation is a mathematical game simulator developed based on theoretical models by Robert Michels (Iron Law of Oligarchy), Max Weber (Bureaucracy), C. Wright Mills (The Power Elite), and Joseph Overton (Overton Window).',
    },
    gameOver: {
      restartBtn: 'START NEW SIMULATION',
      telemetryTitle: 'FINAL SIMULATION REPORT:',
      totalTurn: 'TOTAL TURNS',
    },
  },
};

export function getTranslatedCard(card: any, lang: Language): any {
  if (!card) return card;
  if (lang === 'TR') return card;

  const translation = CARD_TRANSLATIONS[card.id];
  if (!translation) {
    // Handling dynamic / generated / sabotage cards for English
    if (card.isInterrupt) {
      if (card.threatActor === 'GLOBAL_CAPITAL') {
        return {
          ...card,
          title: 'EMERGENCY SABOTAGE: Credit Rating Downgrade & Speculative Attack',
          source: 'Global Capital & Rating Consortium',
          narrative: `[GLOBAL CAPITAL NETWORKS DEPLOYED]\n\nYour independent financial capital (TP: ${card.narrative.match(/TP: (\d+)/)?.[1] || 70}) and uncurbed discourse power (OH: ${card.narrative.match(/OH: (\d+)/)?.[1] || 65}) sounded red alarms in international capital corridors. International credit rating agencies downgraded the country rating directly to 'Junk'. Currency market liquidity was squeezed to launch a currency assault.`,
          options: [
            {
              id: 'opt_global_1',
              label: 'Accept IMF / International Consortium Conditions',
              description: 'Submit to global markets to stop capital flight, raise interest rates, and open budget to international oversight.',
              stateDelta: { TP: -20, KP: +25, KD: -15, PID: -10 },
              riskFactor: 15,
              consequenceText: 'Global financial circles retreated, but your system dependency (Dark Capital) peaked and public support eroded.',
            },
            {
              id: 'opt_global_2',
              label: 'Declare Capital Controls & Currency Nationalization',
              description: 'Ban foreign exchange outflow, safeguard financial autonomy, and launch investigations against global capital agents.',
              stateDelta: { TP: +15, KP: -20, KD: +25, OH: +10 },
              riskFactor: 65,
              consequenceText: 'Completely excommunicated from global capital markets. Exchange volatility spiked, but financial autonomy was preserved.',
            },
            {
              id: 'opt_global_3',
              label: 'Execute Emergency SWAP with Eastern/Eurasian Sovereign Funds',
              description: 'Establish a covert liquidity line with Eastern financial blocs against Western capital.',
              stateDelta: { TP: +5, KP: +10, GB: +10, KD: -10 },
              riskFactor: 35,
              consequenceText: 'A lifeline was opened, but Shadow Bureaucracy and new global actors placed new leverage over governance.',
            },
          ],
        };
      } else {
        return {
          ...card,
          title: 'EMERGENCY SABOTAGE: Judicial Injunction & Party Trustee Risk',
          source: 'High Judiciary & Deep Bureaucracy Security Council',
          narrative: `[NATIONAL ESTABLISHMENT DEPLOYED]\n\nThe unchecked surge in grassroots democracy (PID: ${card.narrative.match(/PID: (\d+)/)?.[1] || 65}) and refusal to yield to tutelage bureaucracy (GB: ${card.narrative.match(/GB: (\d+)/)?.[1] || 35}) crossed establishment red lines. The Chief Prosecutor opened closure proceedings alleging the party became a 'focal point against constitutional order'.`,
          options: [
            {
              id: 'opt_national_1',
              label: 'Sign Secret Reconciliation Protocol with Veteran Bureaucrats',
              description: 'Concede to state veterans, hand over ministerial posts to shadow bureaucracy, and halt dissolution.',
              stateDelta: { GB: +25, PID: -20, KP: +10, OH: -5 },
              riskFactor: 20,
              consequenceText: 'Dissolution lawsuit shelved, but Intra-Party Democracy suffered a heavy blow as executive leadership fell to technocrats.',
            },
            {
              id: 'opt_national_2',
              label: 'Mobilize Streets & Grassroots; Launch Civil Resistance',
              description: 'Reject establishment injunctions! Organize million-strong rallies, turning popular will into a democratic barricade.',
              stateDelta: { PID: +15, OH: +20, GB: -20, KD: +15 },
              riskFactor: 75,
              consequenceText: 'Unprecedented public support mobilized. Discourse hegemony peaked, but ties with state bureaucracy were completely severed.',
            },
            {
              id: 'opt_national_3',
              label: 'Deliver Supreme Defense at Constitutional Court & International Law',
              description: 'Defuse tactical tension, prolong process with legal arguments, and spread bureaucratic restructuring over time.',
              stateDelta: { PID: -5, GB: +5, OH: -10, TP: -10 },
              riskFactor: 40,
              consequenceText: 'Crisis extended over time and legal maneuverability gained, though party momentum temporarily slowed.',
            },
          ],
        };
      }
    }

    // Generated fallback card
    return {
      ...card,
      title: `State Reason & Will Trial (Phase ${card.phase})`,
      source: 'National Security & Strategy Board',
      narrative: 'The nation stands at a critical juncture. Radical decisions are expected to align security networks and executive bureaucracy.',
      options: card.options.map((opt: any, idx: number) => ({
        ...opt,
        label: idx === 0 ? 'Mobilize National Resources & Increase Transparency' : 'Strengthen Bureaucracy & Centralized Command',
        description: idx === 0 ? 'Inspire grassroots trust and reinforce public oversight.' : 'Fortify state memory and establish rapid decision mechanism.',
        consequenceText: idx === 0 ? 'Grassroots support and public transparency increased.' : 'Administrative mechanism accelerated, but tutelage risks rose.',
      })),
    };
  }

  return {
    ...card,
    title: translation.titleEn,
    narrative: translation.narrativeEn,
    source: translation.sourceEn,
    options: card.options.map((opt: any) => {
      const optTrans = translation.optionsEn.find((o) => o.id === opt.id);
      if (!optTrans) return opt;
      return {
        ...opt,
        label: optTrans.labelEn,
        description: optTrans.descriptionEn,
        consequenceText: optTrans.consequenceTextEn,
      };
    }),
  };
}
