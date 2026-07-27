import { IntelligenceFeedItem, ApiRateLimitStatus } from '../types/game';

/**
 * INTELLIGENCE SERVICE (İSTİHBARAT SERVİSİ)
 * Kural 1: Güvenli Simülasyon Veri Katmanı (Gerçek dış haber bağımlılığı kaldırılmış, kurgusal devlet istihbarat akışı)
 * Kural 2: Bütüncül Oyun Evreni Senkronizasyonu
 * Kural 3: API Kota Takibi & %80 Uyarı Eşiği
 * Kural 4: IETF RFC 6585 HTTP 429 & Üstel Geri Çekilme Simülasyonu
 */

const SIMULATED_SOURCES = [
  'KODLEKS İSTİHBARAT BÜLTENİ',
  'DEVLET MİMARİSİ TELGRAF SERVİSİ',
  'FİNANSAL DENETİM VE PİYASA RASYOSU',
  'ÖRGÜTSEL ŞEFFAFLIK MECLİSİ',
  'SÖYLEM VE OVERTON ANALİZ MERKEZİ',
];

const INTELLIGENCE_POOL = [
  {
    title: 'Uluslararası Tahvil Piyasalarında Kirli Para Operasyonları Hız Kazandı: Faiz Baskısı Tırmanıyor',
    titleEN: 'Dark Capital Operations Accelerate in International Bond Markets: Rate Pressures Mount',
    source: 'FİNANSAL DENETİM VE PİYASA RASYOSU',
    sourceEN: 'FINANCIAL AUDIT & MARKET RATIO',
    category: 'Makro Finans',
    categoryEN: 'Macro Finance',
    urgency: 'HIGH' as const,
  },
  {
    title: 'Gölge Bürokrasi Raporu: Kamu Kurumlarında Teknokrat Şebekeleri Yeniden Yapılandırılıyor',
    titleEN: 'Shadow Bureaucracy Report: Technocratic Networks Restructured in Public Institutions',
    source: 'DEVLET MİMARİSİ TELGRAF SERVİSİ',
    sourceEN: 'STATE ARCHITECTURE TELEGRAPH SERVICE',
    category: 'Kurumsal Vesayet',
    categoryEN: 'Institutional Guardianship',
    urgency: 'CRITICAL' as const,
  },
  {
    title: 'Taban Örgütlenme Raporu: Yerel Meclislerde Bağımsız Bağış Kampanyası %140 Rekora Ulaştı',
    titleEN: 'Grassroots Organization Report: Independent Fundraising Campaign Reaches 140% Record in Local Councils',
    source: 'ÖRGÜTSEL ŞEFFAFLIK MECLİSİ',
    sourceEN: 'ORGANIZATIONAL TRANSPARENCY COUNCIL',
    category: 'Sivil Özerklik',
    categoryEN: 'Civil Autonomy',
    urgency: 'NORMAL' as const,
  },
  {
    title: 'Kurgusal Medya Ağında Overton Pencereleri Genişliyor: Söylem Hegemonyası Kazanılıyor',
    titleEN: 'Overton Windows Expanding in Media Network: Discourse Hegemony Secured',
    source: 'SÖYLEM VE OVERTON ANALİZ MERKEZİ',
    sourceEN: 'DISCOURSE & OVERTON ANALYSIS CENTER',
    category: 'Kamuoyu & Medya',
    categoryEN: 'Public Opinion & Media',
    urgency: 'NORMAL' as const,
  },
  {
    title: 'Robert Michels Denetim Raporu: Parti İçi Demokrasi Rasyosu Tehdit Altında',
    titleEN: 'Robert Michels Audit Report: Internal Party Democracy Ratio Under Threat',
    source: 'KODLEKS İSTİHBARAT BÜLTENİ',
    sourceEN: 'KODLEKS INTELLIGENCE BULLETIN',
    category: 'Oligarşi Riski',
    categoryEN: 'Oligarchy Risk',
    urgency: 'HIGH' as const,
  },
  {
    title: 'Uluslararası Fon Konsorsiyumları Yasa Tasarılarına Lobi Müdahalesi Hazırlığında',
    titleEN: 'International Fund Consortia Preparing Lobbying Interventions on Legislative Drafts',
    source: 'FİNANSAL DENETİM VE PİYASA RASYOSU',
    sourceEN: 'FINANCIAL AUDIT & MARKET RATIO',
    category: 'Sermaye Baskısı',
    categoryEN: 'Capital Pressure',
    urgency: 'CRITICAL' as const,
  },
  {
    title: 'Bağımsız Teknokrat Kurulu: Yerli Sanayi ve Kamu Liyakat Projesi Onaylandı',
    titleEN: 'Independent Technocrat Board: Domestic Industry and Public Merit Project Approved',
    source: 'DEVLET MİMARİSİ TELGRAF SERVİSİ',
    sourceEN: 'STATE ARCHITECTURE TELEGRAPH SERVICE',
    category: 'Gölge Bürokrasi',
    categoryEN: 'Shadow Bureaucracy',
    urgency: 'NORMAL' as const,
  },
  {
    title: 'Uluslararası Derecelendirme Kuruluşlarından Siyasi İstikrar Uyarısı',
    titleEN: 'International Rating Agencies Issue Warning on Political Stability',
    source: 'FİNANSAL DENETİM VE PİYASA RASYOSU',
    sourceEN: 'FINANCIAL AUDIT & MARKET RATIO',
    category: 'Piyasa Şantajı',
    categoryEN: 'Market Pressure',
    urgency: 'HIGH' as const,
  },
];

const MAX_SESSION_API_LIMIT = 20;

class IntelligenceService {
  private callCount = 0;
  private retryAttempt = 0;

  public getRateLimitStatus(): ApiRateLimitStatus {
    const limit = MAX_SESSION_API_LIMIT;
    const remaining = Math.max(0, limit - this.callCount);
    const usedPercentage = Math.min(100, (this.callCount / limit) * 100);
    const isWarningThreshold = usedPercentage >= 80;

    return {
      limit,
      remaining,
      usedPercentage: Number(usedPercentage.toFixed(1)),
      isWarningThreshold,
      isError: remaining === 0,
      errorMessage: remaining === 0 ? 'Veri mevcut değil (API kotası tükendi)' : undefined,
    };
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async fetchNews(): Promise<{ items: IntelligenceFeedItem[]; status: ApiRateLimitStatus }> {
    this.callCount++;

    const rateStatus = this.getRateLimitStatus();

    // Kota %80 limitine ulaştığında log ve uyarı üretimi
    if (rateStatus.isWarningThreshold) {
      console.warn(`[UYARI - KOTA EŞİĞİ] API kota kullanımınız %80 limitine ulaştı! (${rateStatus.usedPercentage}% kullanıldı)`);
    }

    if (rateStatus.remaining <= 0) {
      return {
        items: [],
        status: {
          ...rateStatus,
          isError: true,
          errorMessage: 'Veri mevcut değil',
        },
      };
    }

    // Kısa ağ simülasyon gecikmesi (simulated network latency + jitter)
    await this.sleep(300 + Math.random() * 200);

    // Bütüncül kurgusal istihbarat akışı üretimi
    const shuffled = [...INTELLIGENCE_POOL].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const items: IntelligenceFeedItem[] = selected.map((item, idx) => ({
      id: `sim_rss_${idx}_${Date.now()}`,
      title: item.title,
      titleEN: item.titleEN,
      link: '#',
      pubDate: new Date(Date.now() - idx * 1000 * 60 * 12).toISOString(),
      source: item.source,
      sourceEN: item.sourceEN,
      category: item.category,
      categoryEN: item.categoryEN,
      urgency: item.urgency,
    }));

    return { items, status: rateStatus };
  }
}

export const intelligenceService = new IntelligenceService();

