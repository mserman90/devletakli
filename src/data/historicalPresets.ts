export interface HistoricalScenarioData {
  title: string;
  era: string;
  description: string;
  stateVector: {
    TP: number;
    KP: number;
    PID: number;
    GB: number;
    OH: number;
    KD: number;
  };
  initialCard: {
    id: string;
    title: string;
    category: 'FINANCE' | 'POLITICS' | 'BUREAUCRACY' | 'MEDIA' | 'FOREIGN' | 'SECURITY';
    narrative: string;
    source: string;
    options: {
      id: string;
      label: string;
      description: string;
      stateDelta: {
        TP?: number;
        KP?: number;
        PID?: number;
        GB?: number;
        OH?: number;
        KD?: number;
      };
      riskFactor: number;
      consequenceText: string;
    }[];
  };
  historicalNotes: string[];
}

export const HISTORICAL_PRESETS: Record<string, Record<'TR' | 'EN', HistoricalScenarioData>> = {
  '1970s': {
    TR: {
      title: "1970'ler Petrol Şoku ve Karaborsa Krizi",
      era: '1977-1980',
      description: 'Küresel petrol ambargosu, döviz darlığı ve karaborsa kuyrukları eşliğinde sokak kutuplaşması tırmanıyor.',
      stateVector: { TP: 25, KP: 65, PID: 35, GB: 30, OH: 25, KD: 85 },
      initialCard: {
        id: 'hist_card_1970s',
        title: 'Döviz Darlığı ve Akaryakıt Ambargosu Yönetimi',
        category: 'FINANCE',
        source: 'Merkez Bankası ve İthalat Koordinasyon Kurulu',
        narrative: 'Merkez Bankası döviz rezervleri tükendi. Temel ithalat kilitlendi. İthalat kuyrukları toplumsal huzursuzluğu tetikliyor.',
        options: [
          {
            id: 'opt_1',
            label: 'Karaborsayı engellemek için fiyat sabitlemesi ve karne uygulamasına geçin.',
            description: 'Temel ihtiyaç maddelerine sıkı tavan fiyat uygulayın.',
            stateDelta: { TP: -5, KP: +15, PID: -10, GB: +10, OH: -15, KD: +15 },
            riskFactor: 30,
            consequenceText: 'Fiyat kontrolleri karaborsa rantını tırmandırdı.',
          },
          {
            id: 'opt_2',
            label: 'IMF ile acil standby anlaşması imzalayıp devalüasyon yapın.',
            description: 'IMF denetiminde acil döviz kredisini temine koyulun.',
            stateDelta: { TP: +20, KP: -10, PID: -5, GB: -10, OH: -20, KD: -15 },
            riskFactor: 35,
            consequenceText: 'IMF programı döviz sağladı fakat toplumsal tepki çekti.',
          },
          {
            id: 'opt_3',
            label: 'Sendikalar ve yerel kooperatiflerle dayanışma dağıtım ağı kurun.',
            description: 'Piyasa karaborsasını kooperatif dağıtım hatlarıyla aşın.',
            stateDelta: { TP: +15, KP: -20, PID: +20, GB: -5, OH: +15, KD: +5 },
            riskFactor: 20,
            consequenceText: 'Halk kooperatifleri oligarşik rantı geriletti.',
          },
        ],
      },
      historicalNotes: [
        '70 Sente Muhtaç Olunan Dış Borç Krizi Dönemi',
        'Koalisyon kilitlenmesi ve bürokratik çalkantılar',
      ],
    },
    EN: {
      title: '1970s Oil Shock & Hyperinflation Crisis',
      era: '1977-1980',
      description: 'Global oil embargo, severe foreign exchange shortages, and street-level polarization threaten national sovereignty.',
      stateVector: { TP: 25, KP: 65, PID: 35, GB: 30, OH: 25, KD: 85 },
      initialCard: {
        id: 'hist_card_1970s',
        title: 'Foreign Exchange Shortage & Fuel Embargo',
        category: 'FINANCE',
        source: 'Central Bank & Import Coordination Council',
        narrative: 'Central Bank foreign reserves depleted. Essential import supply chains broken. Rationing queues spark public unrest.',
        options: [
          {
            id: 'opt_1',
            label: 'Enforce price controls and fuel rationing cards.',
            description: 'Enforce strict price caps on essentials.',
            stateDelta: { TP: -5, KP: +15, PID: -10, GB: +10, OH: -15, KD: +15 },
            riskFactor: 30,
            consequenceText: 'Price controls fueled black market profits.',
          },
          {
            id: 'opt_2',
            label: 'Sign emergency IMF austerity standby agreement.',
            description: 'Secure foreign currency reserves under strict IMF supervision.',
            stateDelta: { TP: +20, KP: -10, PID: -5, GB: -10, OH: -20, KD: -15 },
            riskFactor: 35,
            consequenceText: 'Austerity plan brought short-term liquidity but public anger.',
          },
          {
            id: 'opt_3',
            label: 'Mobilize grassroots solidarity distribution networks.',
            description: 'Bypass market monopolies with cooperative networks.',
            stateDelta: { TP: +15, KP: -20, PID: +20, GB: -5, OH: +15, KD: +5 },
            riskFactor: 20,
            consequenceText: 'Grassroots networks reduced oligarchic market exploitation.',
          },
        ],
      },
      historicalNotes: [
        'Emergency Foreign Currency Reserve Depletion Era',
        'Deep coalition paralysis and bureaucratic deadlocks',
      ],
    },
  },
  '1980s': {
    TR: {
      title: "1980'ler Yapısal Uyum ve Vesayet Restorasyonu",
      era: '1980-1983',
      description: 'Askeri müdahale sonrası vesayet rejim restorasyonu, 24 Ocak kararları ve sendikal hakların askıya alınması.',
      stateVector: { TP: 35, KP: 50, PID: 15, GB: 75, OH: 60, KD: 40 },
      initialCard: {
        id: 'hist_card_1980s',
        title: '24 Ocak Kararları ve Serbest Piyasaya Geçiş',
        category: 'BUREAUCRACY',
        source: 'Milli Güvenlik Konseyi İktisadi Raporu',
        narrative: 'Uluslararası kreditörler serbest piyasa reformlarını dayatıyor. Sendikal faaliyetler askıya alınmış durumda.',
        options: [
          {
            id: 'opt_1',
            label: 'İhracata dayalı büyüme modelini pazarlıksız uygulayın.',
            description: 'Sermaye piyasalarını tam serbestleştirmeye açın.',
            stateDelta: { TP: +25, KP: +20, PID: -15, GB: +10, OH: +10, KD: -10 },
            riskFactor: 25,
            consequenceText: 'Deregülasyon holding sermayesini ihya etti.',
          },
          {
            id: 'opt_2',
            label: 'Milli sanayiyi koruyacak yerli teşvik maddeleri ekletin.',
            description: 'Seçici yerli sanayi koruma kalkanlarını sürdürün.',
            stateDelta: { TP: +10, KP: -10, PID: +10, GB: -10, OH: -5, KD: +5 },
            riskFactor: 20,
            consequenceText: 'Milli teşvikler sanayi çöküşünü frenledi.',
          },
        ],
      },
      historicalNotes: [
        'Sıkıyönetim ve Siyasatsizleştirilmiş Parti Mimarisi',
      ],
    },
    EN: {
      title: '1980s Structural Adjustment & Post-Coup Statecraft',
      era: '1980-1983',
      description: 'Post-coup military junta regime transition, market deregulation package, and depoliticized state apparatus.',
      stateVector: { TP: 35, KP: 50, PID: 15, GB: 75, OH: 60, KD: 40 },
      initialCard: {
        id: 'hist_card_1980s',
        title: 'Market Liberalization Directives & Deregulation',
        category: 'BUREAUCRACY',
        source: 'National Security Council Economic Brief',
        narrative: 'International creditor groups demand full market deregulation. Labor unions restricted under martial law.',
        options: [
          {
            id: 'opt_1',
            label: 'Implement full export-led growth deregulation.',
            description: 'Open capital markets completely.',
            stateDelta: { TP: +25, KP: +20, PID: -15, GB: +10, OH: +10, KD: -10 },
            riskFactor: 25,
            consequenceText: 'Deregulation attracted foreign funds but expanded oligarchic holding monopolies.',
          },
          {
            id: 'opt_2',
            label: 'Negotiate safeguards for national industries with the council.',
            description: 'Maintain selective industrial protections.',
            stateDelta: { TP: +10, KP: -10, PID: +10, GB: -10, OH: -5, KD: +5 },
            riskFactor: 20,
            consequenceText: 'National safeguards mitigated total industrial takeover.',
          },
        ],
      },
      historicalNotes: [
        'Martial Law & Depoliticized Party Architecture',
      ],
    },
  },
  '1990s': {
    TR: {
      title: "1990'lar Zayıf Koalisyonlar ve Banka Hortumlama Krizi",
      era: '1993-1999',
      description: 'Kırılgan koalisyonlar, devlet-sermaye-çete ilişkileri ve fon hesapları üzerinden banka içi boşaltma krizleri.',
      stateVector: { TP: 30, KP: 75, PID: 30, GB: 50, OH: 50, KD: 70 },
      initialCard: {
        id: 'hist_card_1990s',
        title: 'Örtülü Ödenek ve Hortumlanan Bankalar Soruşturması',
        category: 'FINANCE',
        source: 'Meclis Araştırma Komisyonu',
        narrative: 'Nüfuz ticareti yapan sermaye grupları bankaları boşalttı. Devlet garantisi kamu maliyesini çökertiyor.',
        options: [
          {
            id: 'opt_1',
            label: 'Batan bankalara el koyup varlıklarını kamulaştırın.',
            description: 'Hortumcu banka sahiplerinin varlıklarına kamu el koysun.',
            stateDelta: { TP: +20, KP: -25, PID: +10, GB: +15, OH: +15, KD: -15 },
            riskFactor: 25,
            consequenceText: 'Banka el koyma operasyonu kirli sermayeyi geriletti.',
          },
          {
            id: 'opt_2',
            label: 'Sistemik çöküşü önlemek için banka sahiplerine borç yapılandırması verin.',
            description: 'Mali borçları hazine garantisine alarak sistem çöküşünü önleyin.',
            stateDelta: { TP: -20, KP: +30, PID: -15, GB: -10, OH: -10, KD: +20 },
            riskFactor: 40,
            consequenceText: 'Kurtarma paketi kamu zararlarını tırmandırdı.',
          },
        ],
      },
      historicalNotes: [
        'Devlet-Sermaye-Çete Üçgeni Açığa Çıktı',
      ],
    },
    EN: {
      title: '1990s Fragile Coalitions & Bank Drain Crisis',
      era: '1993-1999',
      description: 'Unstable short-lived coalition governments, state-mafia-business triangle, and off-budget fund corruption scandals.',
      stateVector: { TP: 30, KP: 75, PID: 30, GB: 50, OH: 50, KD: 70 },
      initialCard: {
        id: 'hist_card_1990s',
        title: 'Off-Budget Fund & Offshore Banking Investigation',
        category: 'FINANCE',
        source: 'Parliamentary Inquiry Commission',
        narrative: 'Multiple private banks emptied by connected oligarchs. Public deficit exploding due to state guarantees.',
        options: [
          {
            id: 'opt_1',
            label: 'Seize insolvent banks under state audit council.',
            description: 'Confiscate assets of corrupt bank owners.',
            stateDelta: { TP: +20, KP: -25, PID: +10, GB: +15, OH: +15, KD: -15 },
            riskFactor: 25,
            consequenceText: 'State intervention dealt a heavy blow to offshore capital rings.',
          },
          {
            id: 'opt_2',
            label: 'Bailout bank owners to preserve financial system confidence.',
            description: 'Absorb financial debts through state treasury guarantees.',
            stateDelta: { TP: -20, KP: +30, PID: -15, GB: -10, OH: -10, KD: +20 },
            riskFactor: 40,
            consequenceText: 'Bailout deepened public deficit and oligarchic impunity.',
          },
        ],
      },
      historicalNotes: [
        'State-Capital-Mafia Triangle Disclosures',
      ],
    },
  },
  '2001': {
    TR: {
      title: '2001 Devalüasyon Şoku ve Kurumsal Kriz',
      era: '2001-2002',
      description: 'Gecelik faizlerin %7500e fırladığı, döviz çıpasının çöktüğü tarihi finansal kilitlenme.',
      stateVector: { TP: 20, KP: 70, PID: 40, GB: 30, OH: 35, KD: 95 },
      initialCard: {
        id: 'hist_card_2001',
        title: 'Gecelik Faiz Şoku ve Dalgalı Kur Kararı',
        category: 'FINANCE',
        source: 'Hazine Müsteşarlığı Kriz Masası',
        narrative: 'Bankacılık sistemi kilitlendi. Sabit kur terk edildi. Ulusal para birimi bir gecede %40 değer kaybetti.',
        options: [
          {
            id: 'opt_1',
            label: 'Bağımsız teknokrat bakan atayıp Güçlü Ekonomiye Geçiş Programı ilan edin.',
            description: 'Merkez bankası bağımsızlığı ve sıkı mali disiplin uygulayın.',
            stateDelta: { TP: +25, KP: -15, PID: -5, GB: +20, OH: +10, KD: -35 },
            riskFactor: 20,
            consequenceText: 'Teknokrat reform kuru dizginledi fakat idari vesayeti artırdı.',
          },
          {
            id: 'opt_2',
            label: 'Sermaye hareketlerini kısıtlayıp yerli kriz masası oluşturun.',
            description: 'Döviz çıkışlarını kısıtlayıp kuru sabitleyin.',
            stateDelta: { TP: -10, KP: -10, PID: +15, GB: -15, OH: -15, KD: +10 },
            riskFactor: 45,
            consequenceText: 'Sermaye kısıtı paniği yatıştırdı fakat kredi kanallarını daralttı.',
          },
        ],
      },
      historicalNotes: [
        'Gecelik Faiz Rekoru: %7500',
      ],
    },
    EN: {
      title: '2001 Devaluation Shock & IMF Rescue Program',
      era: '2001-2002',
      description: 'Overnight interest rates reach 7500%, institutional crisis triggers sudden currency devaluation.',
      stateVector: { TP: 20, KP: 70, PID: 40, GB: 30, OH: 35, KD: 95 },
      initialCard: {
        id: 'hist_card_2001',
        title: 'Overnight Rate Spike & Floating Exchange Rate Crisis',
        category: 'FINANCE',
        source: 'Treasury Secretariat Crisis Desk',
        narrative: 'Banking sector illiquid. Exchange rate peg abandoned. Middle-class savings wiped out.',
        options: [
          {
            id: 'opt_1',
            label: 'Appoint independent technocrat minister and pass emergency stabilization reforms.',
            description: 'Implement strict fiscal discipline and central bank independence.',
            stateDelta: { TP: +25, KP: -15, PID: -5, GB: +20, OH: +10, KD: -35 },
            riskFactor: 20,
            consequenceText: 'Technocratic reform stabilized currency but reduced political autonomy.',
          },
          {
            id: 'opt_2',
            label: 'Reject foreign dictates and impose emergency capital controls.',
            description: 'Restrict foreign exchange outflow and fix rates artificially.',
            stateDelta: { TP: -10, KP: -10, PID: +15, GB: -15, OH: -15, KD: +10 },
            riskFactor: 45,
            consequenceText: 'Capital controls slowed panic but isolated external credit.',
          },
        ],
      },
      historicalNotes: [
        'Overnight Interest Rate Peak: 7500%',
      ],
    },
  },
  '2008': {
    TR: {
      title: '2008 Küresel Kredi Darboğazı ve Çevresel Etki',
      era: '2008-2009',
      description: 'Lehman Brothers çöküşüyle küresel kredi muslukları kesildi. İhracat pazarlarında daralma.',
      stateVector: { TP: 45, KP: 50, PID: 55, GB: 55, OH: 60, KD: 50 },
      initialCard: {
        id: 'hist_card_2008',
        title: 'Küresel Kredi Bulaşması ve Reel Sektör Destek Paketi',
        category: 'FINANCE',
        source: 'Ekonomik Koordinasyon Kurulu',
        narrative: 'Dış borçlanma kanalları kapandı. İhracatçı firmalar sipariş iptalleriyle karşı karşıya.',
        options: [
          {
            id: 'opt_1',
            label: 'Kredi Garanti Fonu ve vergi indirim paketi açıklayın.',
            description: 'İhracatçı ve imalatçı sanayiyi kredi garanti kalkanıyla koruyun.',
            stateDelta: { TP: -10, KP: +10, PID: +5, GB: +10, OH: +15, KD: -10 },
            riskFactor: 15,
            consequenceText: 'Likidite desteği reel sektör iflaslarını engelledi.',
          },
          {
            id: 'opt_2',
            label: 'Önleyici IMF ihtiyati akdi imzalayın.',
            description: 'Uluslararası kurumlardan önleyici likidite kalkanı temin edin.',
            stateDelta: { TP: +20, KP: -15, PID: -10, GB: +10, OH: -10, KD: -15 },
            riskFactor: 30,
            consequenceText: 'IMF rezervi kredi derecelendirme notunu korudu.',
          },
        ],
      },
      historicalNotes: [
        'Küresel Likidite Kuruması Dalgası',
      ],
    },
    EN: {
      title: '2008 Global Credit Crunch & Liquidity Cushion',
      era: '2008-2009',
      description: 'Wall Street credit contagion threatens export markets and corporate debt rollover.',
      stateVector: { TP: 45, KP: 50, PID: 55, GB: 55, OH: 60, KD: 50 },
      initialCard: {
        id: 'hist_card_2008',
        title: 'Global Credit Contagion & Corporate Debt Rollover',
        category: 'FINANCE',
        source: 'Economic Coordination Council',
        narrative: 'International credit lines closed. Domestic exporters face order cancellations.',
        options: [
          {
            id: 'opt_1',
            label: 'Deploy public liquidity guarantees and tax credit incentives.',
            description: 'Support exporters and industrial manufacturers with credit funds.',
            stateDelta: { TP: -10, KP: +10, PID: +5, GB: +10, OH: +15, KD: -10 },
            riskFactor: 15,
            consequenceText: 'Liquidity guarantees prevented domestic industrial bankruptcies.',
          },
          {
            id: 'opt_2',
            label: 'Request preemptive IMF credit line.',
            description: 'Secure liquidity buffer from international institutions.',
            stateDelta: { TP: +20, KP: -15, PID: -10, GB: +10, OH: -10, KD: -15 },
            riskFactor: 30,
            consequenceText: 'IMF buffer reassured rating agencies.',
          },
        ],
      },
      historicalNotes: [
        'Global Credit Contagion Wave',
      ],
    },
  },
};
