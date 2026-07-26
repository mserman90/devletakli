import { DecisionCard } from '../types/game';

export const INITIAL_CARDS: DecisionCard[] = [
  // --- FAZ 1: TABANA İNME VE YEREL YAPILANMA ---
  {
    id: 'card_p1_1',
    title: 'Finansman Stratejisi: Taban Bağışları vs. Holding Sermayesi',
    phase: 1,
    category: 'FINANCE',
    source: 'Parti Mali İşler Başkanlığı Raporu',
    narrative: 'Yeni kurulan teşkilat ağının aylık kira, personel ve dijital yayın giderleri için acil nakit akışına ihtiyaç var. Büyük bir sanayi holdingi yetkilisi, yayın çizginizi hafif yumuşatmanız karşılığında örtülü 10 milyon TL fon teklif ediyor. Diğer seçenek ise mikro taban bağışlarıyla bağımsız ama yavaş ilerlemek.',
    options: [
      {
        id: 'opt_p1_1_a',
        label: 'Mikro Taban Bağış Kampanyası (Mobil İmece) Başlat',
        description: 'Vatandaştan 10 TL, 20 TL kitlesel fon topla. Tam finansal özerklik sağla.',
        stateDelta: { TP: +15, KP: -10, PID: +10, KD: -5 },
        riskFactor: 10,
        consequenceText: 'Bütçe kısıtlı kaldı ancak partinizin taban nezdindeki meşruiyeti ve bağımsızlığı tavan yaptı.',
      },
      {
        id: 'opt_p1_1_b',
        label: 'Holding Teklifini Örtülü Şekilde Kabul Et',
        description: 'Sanayi holdinginin fonunu al, hızlı teşkilatlanma binasını kur.',
        stateDelta: { TP: -10, KP: +25, PID: -15, OH: +5 },
        riskFactor: 40,
        consequenceText: 'Nakit akışı sağlandı fakat holding temsilcileri parti kurucular kuruluna müdahale etmeye başladı.',
      },
      {
        id: 'opt_p1_1_c',
        label: 'Tasarruf Rejimine Geç ve Yerel Esnaf Sendikalarıyla Ortaklaş',
        description: 'Giderleri kıs, esnaf odaları üzerinden ayni destek al.',
        stateDelta: { TP: +5, KP: +5, GB: +5, PID: +5 },
        riskFactor: 15,
        consequenceText: 'Dengeli ve ihtiyatlı bir büyüme sağlandı.',
      },
    ],
  },
  {
    id: 'card_p1_2',
    title: 'Tüzük Reformu: Ön Seçim vs. Genel Merkez Delegasyonu',
    phase: 1,
    category: 'POLITICS',
    source: 'Tüzük Hazırlık Komisyonu Draftı',
    narrative: 'Milletvekili ve il başkanı adaylarının nasıl belirleneceği tüzük maddesine geldi. Teşkilat tabanı doğrudan sandık konulup hakim denetiminde ön seçim yapılmasını istiyor. Eski tüfek parti bürokratları ise il kayyumlarının genel merkezce atanması gerektiğini savunuyor.',
    options: [
      {
        id: 'opt_p1_2_a',
        label: 'Tüm Adaylıklarda Çarşaf Liste ve Doğrudan Ön Seçim Koşulu Koy',
        description: 'Parti içi demokrasiyi anayasal güvenceye al, oligarşik vesayeti yık.',
        stateDelta: { PID: +25, KP: -15, GB: -10, OH: +10 },
        riskFactor: 20,
        consequenceText: 'Taban coşkuyla kenetlendi. Parti içi vesayet odağı kırıldı fakat disiplin denetimi zorlaştı.',
      },
      {
        id: 'opt_p1_2_b',
        label: 'Aday Belirleme Yetkisini Genel Başkan ve MKYK’ya Bağla',
        description: 'Disiplin ve dikey komuta zincirini koru, parti içi muhalefeti engelle.',
        stateDelta: { PID: -25, GB: +15, KP: +10 },
        riskFactor: 50,
        consequenceText: 'Genel merkez mutlak kontrol sağladı ancak parti oligarşileşme yoluna girdi (Michels Etkisi tetiklendi).',
      },
    ],
  },

  // --- FAZ 2: MEDYA VE SÖYLEM HEGEMONYASI ---
  {
    id: 'card_p2_1',
    title: 'Otonom Medya Ağı: Dijital Yayın Kanalı vs. Merkez Medya',
    phase: 2,
    category: 'MEDIA',
    source: 'İletişim ve Medya Politikaları Masası',
    narrative: 'Geleneksel ana akım televizyon kanalları partinize ambargo uyguluyor. Söyleminizi geniş kitlelere ulaştırmak için merkezi bir dijital yayın platformu kurma veya merkez medyadan hisse alarak içeriden sızma kararı eşiğindesiniz.',
    options: [
      {
        id: 'opt_p2_1_a',
        label: 'Açık Kaynak Bağımsız Dijital Medya & Podcasts Ağını Kur',
        description: 'Genç yayıncıları destekle, algoritmik ambargoları kıran otonom medya kur.',
        stateDelta: { OH: +20, TP: +10, KP: -10, GB: -5 },
        riskFactor: 15,
        consequenceText: 'Overton Penceresi partinizin lehine genişledi! Genç seçmende muazzam bir söylem üstünlüğü kuruldu.',
      },
      {
        id: 'opt_p2_1_b',
        label: 'Sistem Holdinginin Televizyon Kanalını Devral',
        description: 'Finansal taviz vererek ulusal kanalı satın al, geleneksel evlere gir.',
        stateDelta: { OH: +15, KP: +20, TP: -15, PID: -10 },
        riskFactor: 45,
        consequenceText: 'Geleneksel seçmene ulaşıldı ancak kanal sponsorlarının sansür talepleri parti söylemini törpüledi.',
      },
    ],
  },
  {
    id: 'card_p2_2',
    title: 'Algoritma Dalgası: Sosyal Medya Manipülasyonu & Troll Ağları',
    phase: 2,
    category: 'MEDIA',
    source: 'Dijital İstihbarat Birimi',
    narrative: 'Rakipleriniz yapay zeka destekli troll ordularıyla partiniz hakkında asılsız haberler yayıyor. Danışmanlarınız, aynı yöntemle dezenformasyon yapabilecek bir dijital savunma birimi kurulmasını öneriyor.',
    options: [
      {
        id: 'opt_p2_2_a',
        label: 'Şeffaflık Deklarasyonu ve Hakikat Doğrulama Ekibi Kur',
        description: 'Troll ağlarını ifşa et, organik doğru içerikle halkı bilgilendir.',
        stateDelta: { OH: +10, PID: +10, GB: +5, TP: +5 },
        riskFactor: 10,
        consequenceText: 'Organik güven halkası büyüdü. Bilişsel dezenformasyon dalgası püskürtüldü.',
      },
      {
        id: 'opt_p2_2_b',
        label: 'Gölge Psikolojik Operasyon & Bot Ağlarını Devreye Sok',
        description: 'Sert algı operasyonlarıyla rakipleri dijital alanda yıprat.',
        stateDelta: { OH: +15, KP: +15, PID: -15, KD: +5 },
        riskFactor: 55,
        consequenceText: 'Kısa vadede rakip algısı kırıldı fakat partinizin etik meşruiyeti sorgulanmaya başlandı.',
      },
    ],
  },

  // --- FAZ 3: BÜROKRASİ VE DEVLET HAFIZASI ---
  {
    id: 'card_p3_1',
    title: 'Gölge Bürokrasi ve Teknokrat Akademisi Kurulması',
    phase: 3,
    category: 'BUREAUCRACY',
    source: 'Stratejik İdari Araştırmalar Merkezi',
    narrative: 'İktidara geldiğiniz gün devlet mekanizmasının felç olmaması için bakanlıkların karşılığı olan gölge kadrolar hazırlamalısınız. Eski kıdemli bürokratlar ve emekli paşalar kurumsal hafızayı devretmek istiyor fakat kendilerine dokunulmazlık talep ediyor.',
    options: [
      {
        id: 'opt_p3_1_a',
        label: 'Akademisyen & Teknokrat Ağıyla "Gölge Kabine" Kur',
        description: 'Meritokrasiye dayalı, vesayete kapalılığını ilan etmiş liyakatli teknokrat kadrosu yetiştir.',
        stateDelta: { GB: +20, TP: +10, PID: +5, KD: -10 },
        riskFactor: 15,
        consequenceText: 'Devlet hafızası ve liyakat birleşti. Piyasalar partinizin yönetim kapasitesine güven duydu.',
      },
      {
        id: 'opt_p3_1_b',
        label: 'Eski Derin Bürokrasi Klikleri ile Gizli Pakt Yap',
        description: 'Eski devlet paşaları ve yüksek yargı emeklilerine kadro garantisi ver.',
        stateDelta: { GB: +25, KP: +15, PID: -20, OH: -5 },
        riskFactor: 50,
        consequenceText: 'Gölge bürokrasi tavan yaptı ancak parti kararları vesayet odatlarının onayına tabi hale geldi.',
      },
    ],
  },

  // --- FAZ 4: KÜRESEL FİNANS VE EGEMENLİK SINAVI ---
  {
    id: 'card_p4_1',
    title: 'Küresel Tahvil Piyasaları ve Ulusal Egemenlik Fonu',
    phase: 4,
    category: 'FOREIGN',
    source: 'Hazine ve Dış Finansal İlişkiler Raporu',
    narrative: 'Devlet borç çevirme dönemi geldi. Londra ve New York merkezli yatırım bankaları, Türkiye’nin cari açığını kapatmak için yüksek faizli sıcak para teklif ediyor. Şartları: Özelleştirmelerin hızlandırılması ve kamusal denetimlerin kaldırılması.',
    options: [
      {
        id: 'opt_p4_1_a',
        label: 'Uluslararası Sıcak Parayı Reddet; Yerli Üretim & Kaynak Paketi Aç',
        description: 'Dış borçlanmayı durdur, milli kaynak atılımı yap ve bağımsızlığı ilan et.',
        stateDelta: { TP: +20, KP: -25, KD: +15, OH: +15 },
        riskFactor: 35,
        consequenceText: 'Küresel finans çevreleri misilleme olarak kuru zıplattı fakat milli servet kamu elinde kaldı.',
      },
      {
        id: 'opt_p4_1_b',
        label: 'Küresel Konsorsiyum Şartlarını Kabul Et ve Sıcak Parayı Çek',
        description: 'Faizleri yükselt, uluslararası fonlara imtiyaz tanı.',
        stateDelta: { KD: -20, KP: +30, TP: -20, PID: -15 },
        riskFactor: 60,
        consequenceText: 'Kur dağınıklığı düştü fakat ülke finansal vesayet altına girdi.',
      },
    ],
  },
];
