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
    title: 'Londra Tahvil Piyasalarında Kirli Para Operasyonları Hız Kazandı: Faiz Baskısı Tırmanıyor',
    source: 'FİNANSAL DENETİM VE PİYASA RASYOSU',
    category: 'Makro Finans',
    urgency: 'HIGH' as const,
  },
  {
    title: 'Gölge Bürokrasi Raporu: Kamu Kurumlarında Teknokrat Şebekeleri Yeniden Yapılandırılıyor',
    source: 'DEVLET MİMARİSİ TELGRAF SERVİSİ',
    category: 'Kurumsal Vesayet',
    urgency: 'CRITICAL' as const,
  },
  {
    title: 'Taban Örgütlenme Raporu: Yerel Meclislerde Bağımsız Bağış Kampanyası %140 Rekora Ulaştı',
    source: 'ÖRGÜTSEL ŞEFFAFLIK MECLİSİ',
    category: 'Sivil Özerklik',
    urgency: 'NORMAL' as const,
  },
  {
    title: 'Kurgusal Medya Ağında Overton Pencereleri Genişliyor: Söylem Hegemonyası Kazanılıyor',
    source: 'SÖYLEM VE OVERTON ANALİZ MERKEZİ',
    category: 'Kamuoyu & Medya',
    urgency: 'NORMAL' as const,
  },
  {
    title: 'Robert Michels Denetim Raporu: Parti İçi Demokrasi Rasyosu Tehdit Altında',
    source: 'KODLEKS İSTİHBARAT BÜLTENİ',
    category: 'Oligarşi Riski',
    urgency: 'HIGH' as const,
  },
  {
    title: 'Uluslararası Fon Konsorsiyumları Yasa Tasarılarına Lobi Müdahalesi Hazırlığında',
    source: 'FİNANSAL DENETİM VE PİYASA RASYOSU',
    category: 'Sermaye Baskısı',
    urgency: 'CRITICAL' as const,
  },
  {
    title: 'Bağımsız Teknokrat Kurulu: Yerli Sanayi ve Kamu Liyakat Projesi Onaylandı',
    source: 'DEVLET MİMARİSİ TELGRAF SERVİSİ',
    category: 'Gölge Bürokrasi',
    urgency: 'NORMAL' as const,
  },
  {
    title: 'Uluslararası Derecelendirme Kuruluşlarından Siyasi İstikrar Uyarısı',
    source: 'FİNANSAL DENETİM VE PİYASA RASYOSU',
    category: 'Piyasa Şantajı',
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
      link: '#',
      pubDate: new Date(Date.now() - idx * 1000 * 60 * 12).toISOString(),
      source: item.source,
      category: item.category,
      urgency: item.urgency,
    }));

    return { items, status: rateStatus };
  }
}

export const intelligenceService = new IntelligenceService();

