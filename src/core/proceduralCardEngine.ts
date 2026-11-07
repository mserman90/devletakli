import { DecisionCard, StateVector } from '../types/game';

/**
 * PROSEDÜREL VE DURUMSAL KRİZ KARTI MOTORU
 * Kart destesi tükendiğinde veya belirli vektör uçurumlarında
 * oyuncunun mevcut durumuna (%TP, %KP, %PID, %GB, %OH, %KD) göre
 * sonsuz sayıda dinamik, dengeli ve gerçekçi strateji kartı üretir.
 */

export function generateProceduralCard(
  state: StateVector,
  turn: number,
  language: 'TR' | 'EN' = 'TR'
): DecisionCard {
  const isEn = language === 'EN';
  const phase = Math.min(4, Math.max(1, Math.ceil(turn / 6)));

  // Durum vektöründeki en kritik dengesizliği tespit et
  const tpLow = state.TP <= 25;
  const kdHigh = state.KD >= 65;
  const kpHigh = state.KP >= 65;
  const pidLow = state.PID <= 30;
  const gbLow = state.GB <= 30;
  const ohLow = state.OH <= 35;

  if (kdHigh || (tpLow && Math.random() > 0.5)) {
    // FİNANSAL KRİZ VE LİKİDİTE SIKIŞIKLIĞI KARTI
    return {
      id: `proc_fin_${turn}_${Date.now()}`,
      title: isEn
        ? `Emergency Liquidity Crunch & Speculative Pressure (Turn ${turn})`
        : `Acil Likidite Darboğazı ve Spekülatif Baskı (Tur ${turn})`,
      phase,
      category: 'FINANCE',
      source: isEn ? 'Treasury & Financial Markets Observatory' : 'Hazine ve Finansal Piyasalar Masası',
      narrative: isEn
        ? `Foreign exchange volatility (KD: ${state.KD.toFixed(0)}) is putting immense pressure on sovereign reserves (TP: ${state.TP.toFixed(0)}). Speculative short positions in offshore markets are destabilizing price tags. The economic council demands an immediate counter-strategy.`
        : `Kur dağınıklığı (KD: ${state.KD.toFixed(0)}) ve azalan temiz rezervler (TP: ${state.TP.toFixed(0)}) nedeniyle spekülatif baskı tırmanıyor. Yurtdışı piyasalarda ulusal tahvillere açığa satış dalgası başlatıldı. Kriz masası acil müdahale seçenekleri sunuyor.`,
      options: [
        {
          id: `opt_proc_fin_${turn}_1`,
          label: isEn
            ? 'Mobilize Grassroots Solidarity Bonds & Domestic Production Shield'
            : 'Milli Dayanışma Tahvili Çıkar ve Yerel Üretim Kalkanını Devreye Sok',
          description: isEn
            ? 'Rely on citizen savings and independent domestic resources.'
            : 'Yurttaş dayanışmasına güven, dış piyasalara boyun eğme.',
          stateDelta: { TP: +18, KD: -15, KP: -10, PID: +8 },
          riskFactor: 20,
          consequenceText: isEn
            ? 'Grassroots funds poured in, breaking the speculative siege without foreign tutelage.'
            : 'Halk dayanışmasıyla spekülatif abluka kırıldı, döviz ateşi düşürüldü.',
        },
        {
          id: `opt_proc_fin_${turn}_2`,
          label: isEn
            ? 'Borrow from Oligarchic Holding Consortia with Interest Concessions'
            : 'Holding Konsorsiyumlarından İmtiyazlı Kredi Alarak Piyasayı Rahatlat',
          description: isEn
            ? 'Attract domestic dark capital quickly to stabilize exchange rates.'
            : 'Kirli sermayeye vergi kolaylığı sağla, nakit akışı sağla.',
          stateDelta: { KD: -22, KP: +25, TP: -10, PID: -15 },
          riskFactor: 50,
          consequenceText: isEn
            ? 'Exchange rate stabilized quickly, but holding oligarchs demanded board seats.'
            : 'Kurlar hızla yatıştı fakat holding baronları karar mekanizmalarına ortak oldu.',
        },
      ],
    };
  }

  if (kpHigh || pidLow) {
    // SİYASİ MEŞRUİYET VE PARTİ İÇİ VESAYET KRİZİ KARTI
    return {
      id: `proc_pol_${turn}_${Date.now()}`,
      title: isEn
        ? `Grassroots Integrity & Oligarchic Infiltration Crisis (Turn ${turn})`
        : `Parti İçi Oligarşi ve Taban Demokrasisi İsyanı (Tur ${turn})`,
      phase,
      category: 'POLITICS',
      source: isEn ? 'Party Discipline & Regional Organization Council' : 'Merkez Disiplin ve Bölge Teşkilatları Raporu',
      narrative: isEn
        ? `Rising dark capital (KP: ${state.KP.toFixed(0)}) has caused deep friction with the organizational base (PID: ${state.PID.toFixed(0)}). Grassroots delegate representatives allege that corporate donors are buying out district congresses and dictate policy resolutions.`
        : `Parti içindeki kirli para nüfuzu (KP: ${state.KP.toFixed(0)}) taban demokrasisinde (PID: ${state.PID.toFixed(0)}) ciddi çatlaklar oluşturdu. Teşkilat tabanı, holding destekli il başkanlarının delegeleri yönlendirdiğini belirterek acil olağanüstü kongre talep ediyor.`,
      options: [
        {
          id: `opt_proc_pol_${turn}_1`,
          label: isEn
            ? 'Call Extraordinary Grassroots Congress & Purge Corrupt Delegations'
            : 'Olağanüstü Taban Kurultayı Topla ve Şüpheli Delegeleri İhraç Et',
          description: isEn
            ? 'Enforce absolute party democracy, expelling moneyed cliques.'
            : 'Demokrasiyi tabana yay, paranın gücünü teşkilattan söküp at.',
          stateDelta: { PID: +25, KP: -25, TP: +10, OH: +12 },
          riskFactor: 25,
          consequenceText: isEn
            ? 'Grassroots enthusiasm roared back. Party democracy restored its pristine integrity.'
            : 'Taban salona sığmadı; oligarşik klikler tasfiye edilerek partinin özü korundu.',
        },
        {
          id: `opt_proc_pol_${turn}_2`,
          label: isEn
            ? 'Reinforce Central Executive Authority and Postpone Party Congresses'
            : 'Genel Merkez Vesayetini Artır ve İl Kongrelerini Dondur',
          description: isEn
            ? 'Maintain iron discipline and top-down control to prevent open factionalism.'
            : 'Hizipleşmeyi önlemek için merkezden sert disiplin kararları al.',
          stateDelta: { PID: -25, GB: +15, KP: +15, OH: -10 },
          riskFactor: 55,
          consequenceText: isEn
            ? 'Central control was preserved, but party rank-and-file morale disintegrated.'
            : 'Merkez hakimiyeti sağlandı fakat taban sandıktan ve partiden soğudu.',
        },
      ],
    };
  }

  if (gbLow) {
    // BÜROKRASİ VE DEVLET HAFIZASI ERİMESİ KARTI
    return {
      id: `proc_bur_${turn}_${Date.now()}`,
      title: isEn
        ? `Administrative Memory Loss & Technocratic Stalemate (Turn ${turn})`
        : `Bürokratik Hafıza Kaybı ve İdari Tıkanıklık (Tur ${turn})`,
      phase,
      category: 'BUREAUCRACY',
      source: isEn ? 'Prime Administrative Oversight Council' : 'Başbakanlık İdari Teftiş Kurulu',
      narrative: isEn
        ? `Shadow Bureaucracy memory (GB: ${state.GB.toFixed(0)}) has eroded to dangerous levels. State ministries are failing to execute cabinet directives due to lack of senior institutional expertise and resistance from deep cliques.`
        : `Gölge Bürokrasi ve kurumsal hafıza (GB: ${state.GB.toFixed(0)}) kritik eşiğe geriledi. Bakanlıklarda yetişmiş liyakatli teknokrat eksikliği nedeniyle reform kararları alt bürokraside takılıyor ve evraklar imzasız bekletiliyor.`,
      options: [
        {
          id: `opt_proc_bur_${turn}_1`,
          label: isEn
            ? 'Institute Civil Service Meritocracy Academy & Transparent Fast-Track Exams'
            : 'Kamu Liyakat Akademisi Kur ve Şeffaf Görevde Yükselme Sınavları Aç',
          description: isEn
            ? 'Recruit independent experts strictly based on academic competence.'
            : 'Sadakat değil liyakat esaslı yeni nesil kamu yöneticileri yetiştir.',
          stateDelta: { GB: +22, PID: +10, TP: -5, KD: -5 },
          riskFactor: 15,
          consequenceText: isEn
            ? 'Young competent civil servants revitalized ministries with stellar institutional efficiency.'
            : 'Kamu daireleri liyakatle yeniden canlandı, bürokratik vesayet direnci kırıldı.',
        },
        {
          id: `opt_proc_bur_${turn}_2`,
          label: isEn
            ? 'Make Concessions to Traditional Deep State Secretariats for Guidance'
            : 'Eski Kıdemli Müsteşarlık Kliklerine İmtiyaz Vererek İşleyişi Kurtar',
          description: isEn
            ? 'Trade political autonomy for seasoned bureaucratic veteran guidance.'
            : 'Eski bürokrasi elitleriyle örtülü anlaşma yaparak çarkları döndür.',
          stateDelta: { GB: +20, KP: +15, PID: -18, OH: -8 },
          riskFactor: 45,
          consequenceText: isEn
            ? 'Files started moving again, but ancient administrative cliques regained veto power.'
            : 'Devlet çarkları dönmeye başladı fakat eski vesayet odakları geri döndü.',
        },
      ],
    };
  }

  if (ohLow) {
    // MEDYA VE BİLİŞSEL ALGI SAVAŞI KARTI
    return {
      id: `proc_med_${turn}_${Date.now()}`,
      title: isEn
        ? `Discourse Embargo & Media Blackout Counter-Offensive (Turn ${turn})`
        : `Söylem Ambargosu ve Medya Karartmasına Karşı Hamle (Tur ${turn})`,
      phase,
      category: 'MEDIA',
      source: isEn ? 'Strategic Communications Center' : 'Stratejik İletişim ve Kamuoyu Masası',
      narrative: isEn
        ? `Mainstream television monopolies and foreign social media platforms have throttled your public reach (OH: ${state.OH.toFixed(0)}). Your policy proposals are being systematically distorted as extremist propaganda.`
        : `Ana akım medya ve yabancı dijital platformlar partinize karşı örtülü karartma uyguluyor (OH: ${state.OH.toFixed(0)}). Reform paketleriniz kamuoyuna çarpıtılarak aktarılıyor. Danışmanlarınız acil bir iletişim atılımı öneriyor.`,
      options: [
        {
          id: `opt_proc_med_${turn}_1`,
          label: isEn
            ? 'Launch Decentralized Town-Hall Tour & Citizen Podcast Broadcaster Alliance'
            : 'Meydan Buluşmaları ve Bağımsız Mahalle Yayıncıları Ağı Başlat',
          description: isEn
            ? 'Bypass corporate TV channels by speaking directly to citizens face-to-face.'
            : 'Televizyon ambargosunu meydanlarda ve sokak yayıncılarıyla parçala.',
          stateDelta: { OH: +22, TP: +8, PID: +12, GB: -5 },
          riskFactor: 15,
          consequenceText: isEn
            ? 'Direct town halls broke the media blockade; viral live feeds reached millions organically.'
            : 'Halkla kurulan doğrudan temas medya sansürünü tuzla buz etti!',
        },
        {
          id: `opt_proc_med_${turn}_2`,
          label: isEn
            ? 'Subsidize Private Television Moguls with Public Advertising Contracts'
            : 'Kamu İlanlarıyla Özel Televizyon Patronlarına Reklam Fonu Akıt',
          description: isEn
            ? 'Pay television barons to secure favorable primetime coverage.'
            : 'Medyayı finanse ederek canlı yayın saatlerini satın al.',
          stateDelta: { OH: +15, KP: +20, TP: -18, PID: -12 },
          riskFactor: 50,
          consequenceText: isEn
            ? 'Prime time access was granted, but public distrusted the obviously bought puff pieces.'
            : 'Ekranlar açıldı fakat halk sipariş üzerine yapılan yayınlara prim vermedi.',
        },
      ],
    };
  }

  // GENEL DENGE VE İKTİDAR VİZYONU KARTI (Dengeli durumlarda)
  return {
    id: `proc_bal_${turn}_${Date.now()}`,
    title: isEn
      ? `National Sovereignty Initiative & Strategic Balance (Turn ${turn})`
      : `Ulusal Strateji ve Egemenlik İnisiyatifi (Tur ${turn})`,
    phase,
    category: 'POLITICS',
    source: isEn ? 'National Security & Grand Statecraft Council' : 'Milli Güvenlik ve Yüksek Devlet Aklı Kurulu',
    narrative: isEn
      ? `State metrics have reached a pivotal juncture. As the administration prepares for sovereign transition, global powers and internal factions await your decisive long-term structural orientation.`
      : `Devlet yönetimi tarihi bir kavşakta. Milli egemenliği tahkim etmek ve halk iradesini kurumsallaştırmak için yeni bir stratejik doktrin belirlenmesi gerekiyor.`,
    options: [
      {
        id: `opt_proc_bal_${turn}_1`,
        label: isEn
          ? 'Deepen Grassroots Economy & Expand Strategic National Production'
          : 'Taban Ekonomisini Derinleştir ve Stratejik Milli Üretime Yönel',
        description: isEn
          ? 'Channel public wealth directly into cooperatives and key technology industries.'
          : 'Halk tasarruflarını doğrudan kooperatiflere ve milli Ar-Ge’ye aktar.',
        stateDelta: { TP: +15, PID: +12, GB: +10, KD: -10, KP: -15 },
        riskFactor: 20,
        consequenceText: isEn
          ? 'Self-reliant economic foundations were firmly cemented across the nation.'
          : 'Öz kaynaklara dayalı kalkınma modeli milli egemenliği perçinledi.',
      },
      {
        id: `opt_proc_bal_${turn}_2`,
        label: isEn
          ? 'Consolidate Sovereign Bureaucracy & Establish Institutional Stability Pact'
          : 'Gölge Bürokrasiyi Tahkim Et ve Kurumsal İstikrar Paktı İmzala',
        description: isEn
          ? 'Unify civil and security statecraft around a unified constitutional mandate.'
          : 'Devlet kurumlarını anayasal çerçevede kenetle, yönetim zafiyetini bitir.',
        stateDelta: { GB: +20, KD: -15, TP: +5, KP: +5, PID: -5 },
        riskFactor: 25,
        consequenceText: isEn
          ? 'State apparatus demonstrated unbreakable institutional discipline.'
          : 'Devlet mekanizması kusursuz bir kurumsal disipline kavuştu.',
      },
    ],
  };
}
