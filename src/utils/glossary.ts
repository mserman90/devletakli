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
    description: 'Kamu kurumlarındaki vesayet ağları ve teknokratik güç dengesi.',
    nameEn: 'Shadow Bureaucracy',
    descriptionEn: 'Tutelage networks in state apparatus and technocratic power balance.',
  },
  OH: {
    code: 'OH',
    name: 'Overton Hegemonyası',
    description: 'Kamuoyunu yönlendiren medya, söylem ve meşruiyet hâkimiyeti.',
    nameEn: 'Overton Hegemony',
    descriptionEn: 'Media, discourse, and legitimacy dominance steering public opinion.',
  },
  KD: {
    code: 'KD',
    name: 'Kur Dağınıklığı',
    description: 'Dış finansal şoklara kırılganlık ve kriz hassasiyet rasyosu.',
    nameEn: 'Exchange Volatility',
    descriptionEn: 'Vulnerability to external financial shocks and crisis sensitivity ratio.',
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

export function getAcronymInfo(code: string, lang: 'TR' | 'EN'): AcronymInfo | undefined {
  const info = ACRONYM_GLOSSARY[code];
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

