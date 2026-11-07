# Devlet Aklı: Siyasi Strateji, Müesses Nizam ve Gölge Bürokrasi Simülasyonu

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Deploy to GitHub Pages](https://github.com/mserman90/devletakli/actions/workflows/deploy.yml/badge.svg)](https://github.com/mserman90/devletakli/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald.svg)](https://mserman90.github.io/devletakli/)
[![Version](https://img.shields.io/badge/Version-v3.0%20PROD-amber.svg)](https://github.com/mserman90/devletakli)

> **"Egemenlik, kayıtsız şartsız milletindir; ancak bürokrasi, sermaye ve söylem hegemonya ağlarının kuşatması altında bağımsız bir devlet aklı inşa etmek, en çetin strateji sınavıdır."**

**Devlet Aklı**, klasik siyasetin yüzeysel kutuplaşmalarının ötesine geçerek; ulusal müesses nizam, küresel sermaye konsorsiyumları, gölge bürokrasi ve halk tabanı arasındaki çok katmanlı güç mücadelelerini matematiksel ve sosyolojik modellerle simüle eden stratejik bir devlet yönetimi simülatörüdür.

🌐 **Canlı Simülasyonu Tarayıcınızda Oynayın:** [https://mserman90.github.io/devletakli/](https://mserman90.github.io/devletakli/)

---

## 📖 İçindekiler
- [1. Kuramsal ve Akademik Çerçeve](#1-kuramsal-ve-akademik-çerçeve)
- [2. Matematiksel Simülasyon Modeli](#2-matematiksel-simülasyon-modeli)
  - [2.1. 6-Boyutlu Durum Vektörü ($S$)](#21-6-boyutlu-durum-vektörü-s)
  - [2.2. Otonom Sürüklenme Matrisi ($\Omega$)](#22-otonom-sürüklenme-matrisi-omega)
  - [2.3. Dinamik Tur Geçiş Denklemi](#23-dinamik-tur-geçiş-denklemi)
- [3. Sistem ve Mekanik Mimarisi](#3-sistem-ve-mekanik-mimarisi)
  - [3.1. Gölge Kabine ve Stratejik Danışmanlar](#31-gölge-kabine-ve-stratejik-danışmanlar)
  - [3.2. Olağanüstü Kararnameler (KHK) Masası](#32-olağanüstü-kararnameler-khk-masası)
  - [3.3. Karşıt Yapay Zeka Tehdit Motoru (Adversarial AI)](#33-karşıt-yapay-zeka-tehdit-motoru-adversarial-ai)
  - [3.4. 6-Boyutlu Taktik Güç Radarı](#34-6-boyutlu-taktik-güç-radarı)
  - [3.5. Tarihsel Senaryo Laboratuvarı](#35-tarihsel-senaryo-laboratuvarı)
  - [3.6. Kalıcılık, JSON Aktarımı ve İktidar Sicili Arşivi](#36-kalıcılık-json-aktarımı-ve-iktidar-sicili-arşivi)
  - [3.7. Sıfır Bağımlılıklı Web Audio Sentezleyici](#37-sıfır-bağımlılıklı-web-audio-sentezleyici)
- [4. Kurulum ve Yerel Çalıştırma](#4-kurulum-ve-yerel-çalıştırma)
- [5. Kullanım Kılavuzu & Strateji Rehberi](#5-kullanım-kılavuzu--strateji-rehberi)
- [6. Atıf ve Telif Hakları](#6-atıf-ve-telif-hakları)

---

## 1. Kuramsal ve Akademik Çerçeve

Simülasyon motoru, siyaset bilimi, ekonomi-politik ve sosyolojinin kurucu teorisyenlerinin ortaya koyduğu yapısal yasaları algoritmik parametrelere dönüştürür:

1. **Robert Michels — Oligarşinin Tunç Kanunu (Iron Law of Oligarchy):**
   Demokratik ideallerle yola çıkan kitle örgütlerinin, zaman içinde mali kaynaklar ve dikey hiyerarşi nedeniyle kaçınılmaz olarak küçük bir oligarşik klik tarafından ele geçirilmesi dinamizmidir. Oyunda `KP > 50` ve `PID < 50` olduğunda partinin taban meşruiyeti exponansiyel hızla erir.
2. **Max Weber — Rasyonel-Yasal Bürokrasi & Karizmatik Otorite:**
   Modern devlet aygıtının sürekliliği için kurumsal hafıza ve liyakatli teknokrat kadrolarının hayati önemini modeller. `GB` (Gölge Bürokrasi) çöktüğünde devlet mekanizması işlevsizleşir.
3. **C. Wright Mills — İktidar Seçkinleri (The Power Elite):**
   Siyasi liderlik, askeri/güvenlik bürokrasisi ve büyük holding sermayesi arasındaki geçirgen ağları inceler. Holding fonlarına boyun eğmek kısa vadeli likidite sağlasa da karar alma özerkliğini holdinglerin vesayetine bırakır.
4. **Joseph Overton — Overton Penceresi (Kamuoyu ve Söylem Alanı):**
   Toplum nezdinde kabul edilebilir, düşünülebilir ve savunulabilir fikirlerin sınırlarını belirler. `OH` metriği yüksek olduğunda radikal reformlar meşruiyet kazanırken, düşük `OH` durumunda medya karartması ve dezenformasyon partiyi felç eder.
5. **Thomas Friedman — Altın Düzgömlek (The Golden Straitjacket):**
   Küresel sermaye piyasalarının, ulusal hükümetleri piyasa dostu politikalara zorlama mekanizmasıdır. Dış sermaye kurallarından sapıldığında `KD` (Kur Dağınıklığı) ve spekülatif sermaye saldırıları tırmanır.

---

## 2. Matematiksel Simülasyon Modeli

### 2.1. 6-Boyutlu Durum Vektörü ($S$)

Sistem her $t$ anında 6-boyutlu bir durum vektörü ile tanımlanır:

$$S_t = \begin{bmatrix} TP_t \\ KP_t \\ PID_t \\ GB_t \\ OH_t \\ KD_t \end{bmatrix} \in [0, 100]^6$$

| Sembol | Değişken Adı | Açıklama | Kritik Eşikler |
|---|---|---|---|
| **TP** | **Temiz Para** | Taban bağışları, mikro kitle fonlaması ve kamusal özerk kaynaklar. | $TP \le 5$: İflas Çöküşü |
| **KP** | **Kirli Para** | Holding bağışları, örtülü fonlar ve sisteme bağımlı sermaye. | $KP \ge 90$: Oligarşi Esareti |
| **PID** | **Parti İçi Demokrasi** | Çarşaf liste, ön seçim ve tabanın denetim direnci. | $PID \le 15$: Otokratik Tasfiye |
| **GB** | **Gölge Bürokrasi** | Devlet hafızası, teknokratik liyakat ve idari sevk kapasitesi. | $GB \le 10$: İdari Felç |
| **OH** | **Overton Hegemonyası** | Otonom medya, kamusal söylem üstünlüğü ve kültürel etki. | $OH \le 15$: Söylem Karartması |
| **KD** | **Kur Dağınıklığı** | Küresel piyasa oynaklığı, spekülatif kur baskısı ve enflasyon. | $KD \ge 95$: Finansal Kilitlenme |

---

### 2.2. Otonom Sürüklenme Matrisi ($\Omega$)

Her turun sonunda, oyuncunun kararlarından bağımsız olarak sistemin iç dengesizliklerinden kaynaklanan **otonom sürüklenme vektörü** $\Omega(S)$ hesaplanır:

1. **Michels İvmesi (Parti İçi Demokrasi Aşınması):**
   $$KP > 50 \land PID < 50 \implies \Delta PID = -8.5 \cdot \left(\frac{KP}{100}\right)^2 \cdot \left(1 - \frac{PID}{100}\right)$$
2. **Friedman Şoku (Piyasa Uyumsuzluğu ve Kur Dağınıklığı):**
   $$\Delta KD = 12.0 \cdot \frac{\max\left(0, \frac{TP + OH}{2} - KP\right)}{100} - 6.0 \cdot \left(\frac{GB}{100}\right)$$
3. **Enflasyonist Rezerv Aşınması:**
   $$\Delta TP = -4.0 \cdot \left(1 + \left(\frac{KD}{50}\right)^2\right)$$
4. **Kurumsal Hafıza ve Söylem Dinamikleri:**
   $$\Delta GB = \begin{cases} -1.5 & GB < 30 \\ +0.8 & GB > 70 \\ 0 & \text{diğer} \end{cases}, \quad \Delta OH = \begin{cases} -1.0 & OH < 30 \\ +1.2 & OH > 70 \land KP < 40 \\ 0 & \text{diğer} \end{cases}$$

---

### 2.3. Dinamik Tur Geçiş Denklemi

$$S_{t+1} = \text{clamp}\Big( S_t + \mathbf{\Delta}_{\text{karar}} + \mathbf{\Omega}(S_t) + \mathbf{\Psi}_{\text{danışman}}, 0, 100 \Big)$$

- **$\mathbf{\Delta}_{\text{karar}}$:** Oyuncunun seçtiği direktifin doğrudan durum etkisi.
- **$\mathbf{\Omega}(S_t)$:** Matematiksel otonom sürüklenme.
- **$\mathbf{\Psi}_{\text{danışman}}$:** Kabine üyelerinin sağladığı pasif sönümleme kalkanları (örn. Selim Aras enflasyonist TP kaybını %20 sönümler; Emine Candan Michels etkisini %25 zayıflatır).

#### Zafer Koşulu (Tam Bağımsız Devlet Aklı):
$$Turn \ge 18 \quad \land \quad TP \ge 65 \quad \land \quad PID \ge 50 \quad \land \quad GB \ge 50 \quad \land \quad OH \ge 55 \quad \land \quad KD \le 45$$

---

## 3. Sistem ve Mekanik Mimarisi

### 3.1. Gölge Kabine ve Stratejik Danışmanlar
Oyuncunun yönettiği 4 temel bakanlık/masanın her biri kalıcı pasif bonuslar ve taktiksel acil durum doktrinleri sağlar:
* **Dr. Selim Aras (Hazine & Makro İktisat):**
  * *Pasif:* Enflasyonist TP erimesini %20 sönümler.
  * *Doktrin:* `Milli Rezerv ve Likidite Tahkimi` ($KD -18, TP +12, KP -10$)
* **Emine Candan (Teşkilat & Taban Demokrasisi):**
  * *Pasif:* Michels Yasası kaynaklı PID kaybını %25 frenler.
  * *Doktrin:* `Taban Dayanışma Kurultayı` ($PID +22, TP +10, KP -18$)
* **Albay Mete Demir (Em.) (Devlet Hafızası & Kurumsal Güvenlik):**
  * *Pasif:* Kurumsal hafıza kaybını durdurur, dış sabotaj riskini %35 oranında savuşturur.
  * *Doktrin:* `Bürokratik Tahkikat ve İstihbarat Kalkanı` ($GB +22, KP -15, KD -5$)
* **Deniz Yılmaz (Stratejik İletişim & Kamuoyu):**
  * *Pasif:* Overton Penceresi gerilemesini engeller, organik halk desteğini besler.
  * *Doktrin:* `Ulusal Hakikat ve Medya Taarruzu` ($OH +22, PID +8, KD -5$)

### 3.2. Olağanüstü Kararnameler (KHK) Masası
Yürütme organının kritik kriz anlarında doğrudan yürürlüğe koyabileceği kararname araçları:
* **Kamusal Tasarruf ve Tavan Fiyat Kararnamesi:** Temel gıda/enerjide fiyat tavanı koyar ve kamu israfını kısar ($TP +12, KD -12, KP -8$).
* **Taban Katılımlı Dijital Halk Oylaması Kararnamesi:** Kritik devlet kararlarını doğrudan halk oyuna sunar ($PID +18, OH +12, KP -15$).
* **Şüpheli Varlıkların Kamulaştırılması ve Sayıştay Teftişi:** Hortumlanan offshore fonlarına kamu adına el koyar ($TP +20, KP -25, GB +10$).
* **Milli Rezerv ve Sermaye Çıkış Kalkanı:** Ani kur saldırılarına karşı geçici stopaj ve zorunlu rezerv koruması getirir ($KD -20, TP +8$).

### 3.3. Karşıt Yapay Zeka Tehdit Motoru (Adversarial AI)
Sistem dengesi bozulduğunda ve tehlikeli eşiklere ulaşıldığında iki karşıt tehdit aktörü acil sabotaj interrupt kartları tetikler:
1. **Küresel Sermaye Ağları (Global Capital):** Finansal bağımsızlık tırmandığında derecelendirme notu tenzili ve spekülatif kur taarruzu başlatır.
2. **Ulusal Müesses Nizam (Deep State Establishment):** Taban demokrasisi bürokratik vesayeti tehdit ettiğinde yargısal muhtıra ve parti kayyumu davası açar.

### 3.4. 6-Boyutlu Taktik Güç Radarı
[`TelemetryPanel`](src/components/TelemetryPanel.tsx) içerisinde yer alan askeri düzeydeki polar radar poligonu, anlık 6 eksenin ideal hegemonik dengeyle olan geometrik sapmasını anlık olarak görselleştirir.

### 3.5. Tarihsel Senaryo Laboratuvarı
Kullanıcılar klasik oyunun yanı sıra tarihin dönüm noktası olan krizleri birebir yaşayabilir:
* **1970'ler:** Petrol Şoku, 70 Sente Muhtaç Dış Borç Krizi ve Karaborsa
* **1980'ler:** Askeri Müdahale, 24 Ocak Kararları ve Vesayet Restorasyonu
* **1990'lar:** Zayıf Koalisyonlar, Susurluk Skandalları ve Batan Bankalar
* **2001:** %7500 Gecelik Faiz, Devalüasyon Şoku ve Teknokrat Kurtarma Paketi
* **2008:** Lehman Brothers Küresel Kredi Darboğazı ve İhracat Şoku

### 3.6. Kalıcılık, JSON Aktarımı ve İktidar Sicili Arşivi
* **Auto-Save:** Her turda oyun verisi tarayıcı `localStorage` hafızasına güvenle yazılır.
* **JSON State Transfer:** Oyun durumu tek tıkla kopyalanıp başka cihazlara aktarılabilir.
* **Geçmiş İktidar Sicili:** Tamamlanan her hükümet dönemi, aldığı liderlik notu (A+, A, B, C, F) ve liderlik arketipiyle ulusal arşive kaydedilir.

### 3.7. Sıfır Bağımlılıklı Web Audio Sentezleyici
Harici ses dosyası indirmeden, tarayıcının yerel **Web Audio API** osilatörleri üzerinden çalışan gerçek zamanlı ses sentezleyici:
* Taktik Sevk Odası düşük frekanslı synthesizer dronu
* Kalp atışı panik nabız simülatörü ($135\text{ BPM}$)
* Kararname mühürleme ve danışman telsiz doktrini tonları

---

## 4. Kurulum ve Yerel Çalıştırma

### Gereksinimler
* Node.js $\ge 18$
* npm $\ge 9$ veya yarn / pnpm

### Adım Adım Kurulum
```bash
# 1. Depoyu klonlayın
git clone https://github.com/mserman90/devletakli.git
cd devletakli

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

*Tarayıcınızda `http://localhost:3000` adresini açarak sevk masasına oturabilirsiniz.*

### Üretim Derlemesi (Production Build)
```bash
npm run build
npm run start
```

---

## 5. Kullanım Kılavuzu & Strateji Rehberi

Kapsamlı taktik rehber, mekanik analizleri ve zafer ipuçları için [KULLANIM KILAVUZU (MANUAL.md)](KULLANIM_KILAVUZU.md) dokümanını inceleyebilirsiniz.

---

## 6. Atıf ve Telif Hakları

Bu simülasyon projesi **Apache License 2.0** kapsamında açık kaynak olarak yayınlanmıştır.
Akademik çalışmalarda veya eğitim amaçlı kullanımlarda aşağıdaki şekilde atıfta bulunabilirsiniz:

```bibtex
@software{devletakli2026,
  author = {Serman, M. and Contributor Community},
  title = {Devlet Aklı: Siyasi Strateji, Müesses Nizam ve Gölge Bürokrasi Simülasyonu},
  year = {2026},
  url = {https://github.com/mserman90/devletakli}
}
```
