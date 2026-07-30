export interface AcronymInfo {
  code: string;
  name: string;
  description: string;
  nameEn?: string;
  descriptionEn?: string;
}

export const ACRONYM_GLOSSARY: Record<string, AcronymInfo> = {
  TP: {
    code: 'TP',
    name: 'Temiz Para (Taban Bütçesi)',
    description: 'Halk bağışları ve mikro fonlamayla sağlanan tam bağımsız bütçe.',
    nameEn: 'Clean Capital (Grassroots Budget)',
    descriptionEn: 'Fully autonomous budget funded by public micro-donations.',
  },
  KP: {
    code: 'KP',
    name: 'Kirli Para (Holding Bütçesi)',
    description: 'Sermaye bağışları ve vesayet odaklarına bağımlılık bütçesi.',
    nameEn: 'Dark Capital (Corporate Budget)',
    descriptionEn: 'Capital donations creating dependency on corporate guardianship hubs.',
  },
  PID: {
    code: 'PID',
    name: 'Parti İçi Demokrasi',
    description: 'Taban meclisleri katılımı, şeffaflık ve oligarşileşme direnci.',
    nameEn: 'Party Democracy',
    descriptionEn: 'Grassroots council participation, transparency, and resistance to oligarchy.',
  },
  GB: {
    code: 'GB',
    name: 'Gölge Bürokrasi',
    description: 'Kamu kurumlarındaki vesayet ağları, kurumsal hafıza ve teknokratik güç dengesi.',
    nameEn: 'Shadow Bureaucracy',
    descriptionEn: 'Tutelage networks in state apparatus, institutional memory, and technocratic power balance.',
  },
  OH: {
    code: 'OH',
    name: 'Overton Hegemonyası',
    description: 'Kamuoyunu ve toplumsal algıyı yönlendiren medya, söylem ve meşruiyet hâkimiyeti.',
    nameEn: 'Overton Hegemony',
    descriptionEn: 'Media, discourse, and legitimacy dominance steering public opinion and perception.',
  },
  KD: {
    code: 'KD',
    name: 'Kur Dağınıklığı',
    description: 'Dış finansal şoklara kırılganlık ve kriz hassasiyet rasyosu.',
    nameEn: 'Exchange Volatility',
    descriptionEn: 'Vulnerability to external financial shocks and crisis sensitivity ratio.',
  },
  'BÜROKRATİK NÜFUZ': {
    code: 'GB / BÜROKRASİ',
    name: 'Bürokratik Nüfuz & Gölge Bürokrasi',
    description: 'Devlet aygıtındaki bürokratik vesayet, kurumsal hafıza ve teknokratik karar alma yetkisi.',
    nameEn: 'Bureaucratic Influence & Shadow Bureaucracy',
    descriptionEn: 'Bureaucratic tutelage in state apparatus, institutional memory, and technocratic decision authority.',
  },
  'KAMUOYU HEGEMONYASI': {
    code: 'OH / HEGEMONYA',
    name: 'Kamuoyu & Söylem Hegemonyası',
    description: 'Medya, kültür ve bilgi akışı üzerinde kamuoyunun algısını yönlendiren hegemoni gücü.',
    nameEn: 'Public Opinion & Discourse Hegemony',
    descriptionEn: 'Hegemonic control over media, culture, and information flow steering public perception.',
  },
  'SÖYLEM HEGEMONYASI': {
    code: 'OH / SÖYLEM',
    name: 'Söylem Hegemonyası (Overton Penceresi)',
    description: 'Siyasi gündemi belirleme, kamuoyu rızası üretme ve meşruluk sınırlarını çizme gücü.',
    nameEn: 'Discourse Hegemony (Overton Window)',
    descriptionEn: 'Power to set the political agenda, manufacture public consent, and define legitimacy boundaries.',
  },
  'BÜROKRASİ': {
    code: 'GB',
    name: 'Bürokrasi ve Kurumsal Hafıza',
    description: 'Kamu yönetim çarkları, kıdemli kadrolar ve devlet organlarının karar uygulama gücü.',
    nameEn: 'Bureaucracy & Institutional Memory',
    descriptionEn: 'State administrative apparatus, senior cadres, and executive decision implementation power.',
  },
  PROD: {
    code: 'PROD',
    name: 'Production (Canlı Sürüm)',
    description: 'Simülasyon motorunun aktif çalışan gerçek zamanlı üretim ortamı.',
    nameEn: 'Production (Live Runtime)',
    descriptionEn: 'Real-time production environment running the simulation engine.',
  },
  API: {
    code: 'API',
    name: 'Uygulama Programlama Arayüzü',
    description: 'Devlet ve istihbarat ağ katmanları arasındaki otomatik veri iletişim kanalı.',
    nameEn: 'Application Programming Interface',
    descriptionEn: 'Automated data communication channel between state and intelligence layers.',
  },
  'RFC 6585': {
    code: 'RFC 6585',
    name: 'IETF HTTP 429 Hız Sınırı Standartı',
    description: 'Aşırı istek durumunda üstel geri çekilme (exponential backoff) uygulayan uluslararası protokol.',
    nameEn: 'IETF HTTP 429 Rate Limit Standard',
    descriptionEn: 'International protocol applying exponential backoff during rate thresholds.',
  },
  RSS: {
    code: 'RSS',
    name: 'Zengin Site Özeti (Rich Site Summary)',
    description: 'Devlet ve kurum bültenlerinden gelen otomatik teleks haber akış formatı.',
    nameEn: 'Rich Site Summary (RSS Feed)',
    descriptionEn: 'Automated telex intelligence news feed format from state bulletins.',
  },
  AI: {
    code: 'AI',
    name: 'Tehdit ve Müdahale Yapay Zekâsı',
    description: 'Otonom olarak kriz ve sabotaj kartları üreten rakip simülasyon motoru.',
    nameEn: 'Adversarial Threat AI',
    descriptionEn: 'Adversarial simulation engine autonomously generating crisis and sabotage cards.',
  },
  KODLEKS: {
    code: 'KODLEKS',
    name: 'Anayasal Külliyat ve Kurallar Bankası',
    description: 'Siyasi teori, Weber, Mills ve Michels denklemlerini içeren akademik rehber.',
    nameEn: 'Constitutional Canon & Rule Book',
    descriptionEn: 'Academic manual containing political theory, Weber, Mills, and Michels equations.',
  },
};

const ALIAS_MAP: Record<string, string> = {
  'BUROKRATIK NUFUZ': 'BÜROKRATİK NÜFUZ',
  'BUROKRATIK': 'BÜROKRATİK NÜFUZ',
  'BÜROKRATİK': 'BÜROKRATİK NÜFUZ',
  'BUREAUCRATIC INFLUENCE': 'BÜROKRATİK NÜFUZ',
  'BUREAUCRACY': 'BÜROKRASİ',
  'BÜROKRASİ': 'BÜROKRASİ',
  'GÖLGE BÜROKRASİ': 'GB',
  'GOLGE BUROKRASI': 'GB',
  'SHADOW BUREAUCRACY': 'GB',
  'KAMUOYU HEGEMONYASI': 'KAMUOYU HEGEMONYASI',
  'KAMUOYU': 'KAMUOYU HEGEMONYASI',
  'PUBLIC OPINION HEGEMONY': 'KAMUOYU HEGEMONYASI',
  'PUBLIC OPINION': 'KAMUOYU HEGEMONYASI',
  'SÖYLEM HEGEMONYASI': 'SÖYLEM HEGEMONYASI',
  'SOYLEM HEGEMONYASI': 'SÖYLEM HEGEMONYASI',
  'DISCOURSE HEGEMONY': 'SÖYLEM HEGEMONYASI',
  'OVERTON HEGEMONYASI': 'OH',
  'OVERTON HEGEMONY': 'OH',
  'OVERTON WINDOW': 'OH',
  'TEMİZ PARA': 'TP',
  'CLEAN CAPITAL': 'TP',
  'KİRLİ PARA': 'KP',
  'DARK CAPITAL': 'KP',
  'PARTİ İÇİ DEMOKRASİ': 'PID',
  'PARTY DEMOCRACY': 'PID',
  'KUR DAĞINIKLIĞI': 'KD',
  'EXCHANGE VOLATILITY': 'KD',
  'CURRENCY VOLATILITY': 'KD',
};

export function getAcronymInfo(code: string, lang: 'TR' | 'EN'): AcronymInfo | undefined {
  if (!code) return undefined;
  const rawKey = code.trim();
  const upperKey = rawKey.toUpperCase();
  
  // Direct match or alias match
  const targetKey = ACRONYM_GLOSSARY[rawKey]
    ? rawKey
    : ACRONYM_GLOSSARY[upperKey]
    ? upperKey
    : ALIAS_MAP[upperKey] || ALIAS_MAP[rawKey];

  const info = ACRONYM_GLOSSARY[targetKey] || ACRONYM_GLOSSARY[upperKey];
  if (!info) return undefined;

  if (lang === 'EN') {
    return {
      code: info.code,
      name: info.nameEn || info.name,
      description: info.descriptionEn || info.description,
    };
  }
  return info;
}

