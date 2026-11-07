# Devlet Aklı: Operasyon Sevk Masası Kullanım Kılavuzu & Strateji Doktrini

> **Belge No:** DA-OP-2026-v3  
> **Gizlilik Derecesi:** HİZMETE ÖZEL // RESMİ SEVK PROTOKOLÜ  
> **Hedef Kitle:** Devlet Aklı Başstratejisti ve Hükümet İcra Heyeti  

Bu kılavuz, **Devlet Aklı: Siyasi Strateji Simülasyonu** içerisinde karar alma mekanizmalarını yöneten oyuncular için hazırlanmış ayrıntılı bir taktik ve kuramsal el kitabıdır.

---

## 🧭 1. Temel Arayüz Mimarisi ve İstasyonlar

Operasyon Sevk Masası (`OperationCenter`), modern bir kriz koordinasyon merkezinin tüm unsurlarını tek bir panoramada toplar:

```
+-----------------------------------------------------------------------------------+
|                            BAŞKANLIK HEADER BARI                                  |
| [Logo] Tur: #X | Faz: Y | [Kabine] [KHK] [Senaryo] [Sicil] [Kayıt] [Ses] [TR/EN]  |
+-----------------------------------------------------------------------------------+
|                       KAYNAK GÖSTERGELERİ (DASHBOARD)                              |
|   [TP: Temiz Para]   [KP: Kirli Para]   [PID: Demokrasi]   [GB: Bürokrasi] ...    |
+-----------------------------------------+-----------------------------------------+
|        SOL/ORTA: KARAR MASASI           |         SAĞ: RESMİ TELEMETRİ           |
|                                         |                                         |
|  - Aktif Karar Kartı & Kaynak Raporu    |  - Resmi Vektör Değerleri & İlerleme    |
|  - Stratejik Alternatifler & Risk %     |  - 6-Boyutlu Taktik Güç Radarı          |
|  - Yansıma / Consequence Değerlendirme  |  - Siyasi Eğilim Zaman Grafiği (Turlar) |
|  - Otonom Strateji Aklı Danışmanı       |                                         |
+-----------------------------------------+-----------------------------------------+
|                  ALT PANEL: BİLGİ AKIŞI & SİSTEM GÜNLÜĞÜ (LOGS)                   |
|  - İhbar Teli & Dış Pazar Telgrafları   |  - Karar, Sapma ve Saldırı Kayıtları   |
+-----------------------------------------------------------------------------------+
```

---

## 📊 2. Durum Vektörleri ve Kritik Yönetim İlkeleri

Simülasyonda 6 durum metriği bulunur. Bu metriklerin her biri hem doğrudan kararlarla hem de matematiksel sürüklenme denklemleriyle tur bazında değişir:

### 1. Temiz Para (TP)
* **İdeal Aralık:** 65 - 85
* **Kritik Eşik:** $\le 15$ (İflas uyarısı), $\le 5$ (Oyun sonu iflas çöküşü).
* **Yönetim Taktikleri:**
  * Enflasyon ve yüksek kur volatilitesi (`KD`), her tur başında `TP` rezervlerini eritir.
  * `TP` rezervi azaldığında Hazine Danışmanı **Dr. Selim Aras**'ın `Milli Rezerv ve Likidite Tahkimi` doktrini veya `Kamusal Tasarruf Kararnamesi` acilen devreye sokulmalıdır.
  * Holdinglerin sunduğu kolay para teklifleri reddedilmeli; mobil taban kitle fonlaması teşvik edilmelidir.

### 2. Kirli Para (KP)
* **İdeal Aralık:** 15 - 35
* **Kritik Eşik:** $\ge 75$ (Oligarşik vesayet uyarısı), $\ge 90 \land PID \le 15$ (Partinin holdinglerce yutulması).
* **Yönetim Taktikleri:**
  * `KP` yükseldiğinde Robert Michels'in "Oligarşinin Tunç Kanunu" devreye girer ve Parti İçi Demokrasiyi (`PID`) hızla aşındırır.
  * `Şüpheli Varlıkların Kamulaştırılması Kararnamesi` veya Albay Mete Demir'in `Bürokratik Tahkikat` doktrini ile kirli fonlar sistemden tasfiye edilmelidir.

### 3. Parti İçi Demokrasi (PID)
* **İdeal Aralık:** 55 - 80
* **Kritik Eşik:** $\le 20$ (Otokratik sapma uyarısı).
* **Yönetim Taktikleri:**
  * Çarşaf liste, ön seçim ve taban meclisleri kararları `PID`'yi yükseltir.
  * Eğer `PID` düşerse partinin sokak ve taban mobilizasyonu sıfırlanır, genel merkez binasına hapsolunur.
  * Teşkilat Masası Başkanı **Emine Candan**'ın `Taban Dayanışma Kurultayı` ve `Dijital Halk Oylaması KHK'sı` `PID`'yi hızla toparlar.

### 4. Gölge Bürokrasi & Kurumsal Hafıza (GB)
* **İdeal Aralık:** 50 - 75
* **Kritik Eşik:** $\le 15$ (İdari yönetim zafiyeti), $\le 10$ (Bürokratik tasfiye ve devlet dışına itilme).
* **Yönetim Taktikleri:**
  * Hükümet değiştiğinde devlet çarklarının durmaması için teknokrat kadrolar, Sayıştay denetçileri ve liyakat akademileri korunmalıdır.
  * Eski derin kliklerle gizli pazarlık yapmak yerine şeffaf meritokratik yapılar kurulmalıdır.

### 5. Overton Hegemonyası (OH)
* **İdeal Aralık:** 60 - 85
* **Kritik Eşik:** $\le 20$ (Medya karartması).
* **Yönetim Taktikleri:**
  * Ana akım televizyon kanallarının uyguladığı ambargolara karşı bağımsız dijital yayın hatları, podcast ağları ve doğrudan meydan buluşmaları organize edilmelidir.
  * Medya Direktörü **Deniz Yılmaz**'ın `Ulusal Hakikat ve Medya Taarruzu` dezenformasyon ağlarını ifşa ederek `OH` değerini hızla sıçratır.

### 6. Kur Dağınıklığı & Volatilite (KD)
* **İdeal Aralık:** 20 - 40
* **Kritik Eşik:** $\ge 75$ (Piyasa şoku uyarısı), $\ge 95$ (Sistem kilitlenmesi ve çöküş).
* **Yönetim Taktikleri:**
  * Sermaye piyasalarının manipülatif baskılarına karşı `Milli Rezerv ve Sermaye Çıkış Kalkanı` uygulanmalıdır.
  * Dış borçlanmada sıcak para yerine yerli üretim ve çok kutuplu ticaret (takas/swap) tercih edilmelidir.

---

## 🏛️ 3. Danışman Doktrinleri & Kararnamelerin Kullanım Rehberi

### Danışman Doktrinlerinin Zamanlaması:
1. **Erken Aşama (1-5. Turlar):**
   * Öncelik: `PID` ve `TP` tabanını sağlamlaştırmak.
   * Emine Candan'ın `Taban Dayanışma Kurultayı` kullanılmalıdır.
2. **Orta Aşama (6-12. Turlar):**
   * Öncelik: Medya ambargosunu kırmak ve bürokratik hafızayı kurumsallaştırmak.
   * Deniz Yılmaz'ın `Ulusal Hakikat Taarruzu` ve Albay Mete Demir'in `Bürokratik Tahkikatı` devreye sokulmalıdır.
3. **İleri Aşama (13-24. Turlar):**
   * Öncelik: Kur dalgalanmalarını dizginlemek ve zafer vektörünü korumak.
   * Dr. Selim Aras'ın `Milli Rezerv Tahkimi` ve `Sermaye Çıkış Kalkanı KHK'sı` eşzamanlı uygulanmalıdır.

---

## 🏆 4. Zafer Şartnamesi & Liderlik Notu Hesaplama

Simülasyonda zafere ulaşmak için **en az 18 tur** hayatta kalınmalı ve aşağıdaki 6 şart aynı anda sağlanmalıdır:

$$\begin{cases}
TP \ge 65 & (\text{Mali Bağımsızlık}) \\
PID \ge 50 & (\text{Halk Meclisleri ve Taban Demokrasisi}) \\
GB \ge 50 & (\text{Liyakatli Devlet Hafızası}) \\
OH \ge 55 & (\text{Kamuoyu ve Söylem Üstünlüğü}) \\
KD \le 45 & (\text{Dengelenmiş Kur ve Fiyat İstikrarı}) \\
Turn \ge 18 & (\text{Kurumsal İstikrar Süresi})
\end{cases}$$

### Liderlik Notu Derecelendirmesi:
* **A+ (Kusursuz Devlet Aklı):** Zafer şartları sağlandı + $TP \ge 70$ ve $KD \le 35$.
* **A (Egemen İrade):** Zafer şartları sağlandı.
* **B+ (Dirençli Yönetim):** 18 tur tamamlandı ancak son anda eşiklerden biri kaçırıldı.
* **B (Milli Restorasyon):** 12-17 tur hayatta kalındı.
* **C (Kırılgan İktidar):** 6-11 tur hayatta kalındı.
* **F (Sistemik Dağılma):** İlk 5 turda iflas veya oligarşi ele geçirmesiyle çöktü.

---

## 💾 5. Veri Kayıt, Yedekleme ve Taşıma

1. **Otomatik Kayıt:** Her tur sonunda durum `localStorage`'a yazılır. Tarayıcıyı kapatsanız dahi kaldığınız yerden devam edebilirsiniz.
2. **JSON Durum Aktarımı:**
   * Üst bardaki **Kayıt ve Hafıza (Save)** butonuna tıklayın.
   * **Dışa Aktar ve Kopyala** seçeneği ile mevcut oyun durumunuzu panoya alın.
   * Başka bir tarayıcı veya bilgisayarda **JSON'dan İçe Aktar** kutusuna yapıştırarak aynı noktadan oyuna devam edin.
3. **Geçmiş İktidar Sicili:**
   * Oyun bittiğinde aldığınız not ve liderlik arketipi arşive eklenir. Üst bardaki **Sicil (Award)** butonundan geçmiş hükümetlerinizin bilançolarını inceleyebilirsiniz.

---

## ❓ 6. Sıkça Karşılaşılan Sorunlar ve Çözümleri

* **Soru: Kirli Para (KP) almadan partiyi büyütmek çok zor, ne yapmalıyım?**  
  * *Çözüm:* 1. turdan itibaren taban bağışlarına (`opt_p1_1_a`) yönelin ve tasarruf rejimine geçin. Erken aşamada bütçe dar kalabilir ancak ilerleyen turlarda taban meşruiyeti exponansiyel kaynak üretir.
* **Soru: Küresel Sermaye Ağları saldırısı (Sabotaj Sireni) çaldığında ne yapmalıyım?**  
  * *Çözüm:* IMF şartlarını kabul etmek geçici rahatlama sağlasa da ülkeyi vesayet altına sokar. Eğer `TP` rezerviniz güçlüyse `Sermaye Kontrolleri ve Yerel Para Savunması` seçeneğiyle dik durun; ardından Selim Aras'ın doktrini ile kuru sakinleştirin.
* **Soru: Oyun seslerini veya ambiyansı nasıl kapatabilirim?**  
  * *Çözüm:* Üst bardaki `Ses (Hoparlör)` simgesi tüm UI seslerini; yanındaki `Ambiyans (Radyo)` simgesi ise düşük frekanslı arka plan synthesizer dronunu sessize alır.
