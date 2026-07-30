import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side Gemini Client Lazy Initialization
let genAIClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Strategy Tips API Endpoint
app.post("/api/strategy-tips", async (req, res) => {
  try {
    const { stateVector, turn, phase, activeCardTitle, language } = req.body || {};

    if (!stateVector) {
      return res.status(400).json({ error: "Missing stateVector parameter" });
    }

    const lang = language === "EN" ? "EN" : "TR";

    // Build Context Description
    const contextPrompt = `
You are the Chief Political Strategist (Devlet Aklı Başdanışmanı) analyzing a high-stakes national political strategy simulation game.
Current Game Status:
- Turn: ${turn || 1} (Phase: ${phase || 1})
- Active Decision Card: "${activeCardTitle || "General Directive"}"
- 6-Dimensional State Vector (0-100 scale):
  * TP (Clean Capital / Grassroots Funds): ${stateVector.TP ?? 50} (Depletion risk < 10)
  * KP (Dark Capital / Oligarchic Funds): ${stateVector.KP ?? 40} (Oligarchy capture risk > 85)
  * PID (Internal Party Democracy): ${stateVector.PID ?? 60} (Autocracy risk < 20)
  * GB (Shadow Bureaucracy / Deep State Memory): ${stateVector.GB ?? 40} (Purge collapse risk < 15)
  * OH (Overton Hegemony / Media Control): ${stateVector.OH ?? 45} (Public discourse)
  * KD (Currency Volatility / Market Instability): ${stateVector.KD ?? 30} (Economic crash > 90)

Goal for Victory: Turn >= 18, TP >= 65, PID >= 50, GB >= 50, OH >= 55, KD <= 45.

Provide a concise, highly insightful, tactical strategy briefing for the player in ${lang === "EN" ? "English" : "Turkish"}.
    `;

    const systemInstruction = lang === "EN"
      ? "You are an elite political strategist and game theory advisor. Analyze resource levels, pinpoint immediate danger metrics, and give direct tactical recommendations."
      : "Sen duayen bir siyaset sosyologu, oyun teorisyeni ve Devlet Aklı stratejistisin. Mevcut 6-boyutlu durum vektörünü analiz ederek oyuncunun kaçınması gereken tuzakları ve öncelikli yapması gereken stratejik hamleyi söyle.";

    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contextPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: {
                type: Type.STRING,
                description: "Short 1-line headline summarizing strategic posture",
              },
              recommendation: {
                type: Type.STRING,
                description: "2-3 sentences of direct tactical advice for current situation",
              },
              keyRisks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "1-3 bullet points of high-priority risks based on current metrics",
              },
              recommendedFocusMetric: {
                type: Type.STRING,
                description: "Metric code requiring urgent player focus, e.g., TP, KP, PID, GB, OH, or KD",
              },
            },
            required: ["headline", "recommendation", "keyRisks", "recommendedFocusMetric"],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, tip: parsed });
      } else {
        throw new Error("Empty response from Gemini API");
      }
    } catch (apiError: any) {
      console.warn("Gemini API call failed, generating heuristic fallback:", apiError?.message || apiError);

      // Fallback Strategy Generator if API key missing or network fails
      const tp = stateVector.TP ?? 50;
      const kp = stateVector.KP ?? 40;
      const pid = stateVector.PID ?? 60;
      const gb = stateVector.GB ?? 40;
      const kd = stateVector.KD ?? 30;

      let headline = lang === "EN" ? "STRATEGIC POSTURE BALANCE" : "STRATEJİK DENGELENME POZİSYONU";
      let rec = lang === "EN" 
        ? "Maintain balance between Grassroots Funds and Shadow Bureaucracy while keeping Currency Volatility controlled."
        : "Temiz Para rezervlerini korurken Gölge Bürokrasi ve Kur Dağınıklığı arasındaki hassas dengeyi muhafaza edin.";
      let focus = "TP";
      const keyRisks: string[] = [];

      if (tp <= 20) {
        headline = lang === "EN" ? "CRITICAL ALERT: CLEAN CAPITAL DEPLETION" : "KRİTİK UYARI: TEMİZ PARA TÜKENMEK ÜZERE";
        rec = lang === "EN"
          ? "Your grassroots capital is dangerously low. Prioritize directives that generate TP or lower expenses immediately."
          : "Temiz Para rezervleriniz tükenme eşiğinde. Acilen TP artıran ve maliyeti düşüren kararları önceliklendirin.";
        focus = "TP";
        keyRisks.push(lang === "EN" ? "Imminent insolvency collapse" : "Finansal çöküş riski yüksek");
      } else if (kd >= 70) {
        headline = lang === "EN" ? "HIGH VOLATILITY: CURRENCY SHOCK THREAT" : "YÜKSEK RİSK: KUR ŞOKU SIKILAŞMASI";
        rec = lang === "EN"
          ? "Currency volatility is escalating. Avoid high-risk financial decisions and stabilize market expectations."
          : "Kur dağınıklığı kritik seviyelerde. Piyasayı sarsacak yüksek riskli kararlardan kaçının.";
        focus = "KD";
        keyRisks.push(lang === "EN" ? "Market shock threshold approaching" : "Piyasa kilitlenme riski artıyor");
      } else if (gb <= 20) {
        headline = lang === "EN" ? "INSTITUTIONAL RISK: BUREAUCRACY EROSION" : "KURUMSAL RİSK: BÜROKRATİK ERİME";
        rec = lang === "EN"
          ? "Shadow Bureaucracy memory is fading. Strengthen institutional state apparatus before administrative collapse."
          : "Gölge Bürokrasi hafızası zayıflıyor. Devlet aygıtını destekleyecek idari adımlara odaklanın.";
        focus = "GB";
        keyRisks.push(lang === "EN" ? "Deep state memory loss" : "Devlet yönetilemez hale gelebilir");
      } else if (kp >= 75 && pid <= 25) {
        headline = lang === "EN" ? "OLIGARCHY RISK: DARK CAPITAL INFILTRATION" : "OLİGARŞİ TEHDİDİ: KİRLİ PARA VESAYETİ";
        rec = lang === "EN"
          ? "Dark capital dominance threatens internal party democracy. Reinforce PID to prevent oligarchic takeover."
          : "Kirli Para parti içi demokrasiyi esir alma noktasında. PID metriğini yükseltecek demokratik hamleler yapın.";
        focus = "PID";
        keyRisks.push(lang === "EN" ? "Oligarchic capture imminent" : "Parti içi vesayet kilitlenmesi");
      }

      return res.json({
        success: true,
        fallback: true,
        tip: {
          headline,
          recommendation: rec,
          keyRisks: keyRisks.length ? keyRisks : [lang === "EN" ? "Maintain strategic equilibrium" : "Stratejik dengeyi koruyun"],
          recommendedFocusMetric: focus,
        },
      });
    }
  } catch (err: any) {
    console.error("Strategy tips handler error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Historical Scenarios API Endpoint
app.post("/api/historical-scenarios", async (req, res) => {
  try {
    const { scenarioId, customPrompt, language } = req.body || {};
    const lang = language === "EN" ? "EN" : "TR";

    const PRESET_FALLBACKS: Record<string, any> = {
      "1970s": {
        title: lang === "EN" ? "1970s Oil Shock & Hyperinflation Crisis" : "1970'ler Petrol Şoku ve Karaborsa Krizi",
        era: "1977-1980",
        description: lang === "EN"
          ? "Global oil embargo, severe foreign exchange shortages, and street-level polarization threaten national sovereignty."
          : "Küresel petrol ambargosu, şiddetli döviz darlığı ve karaborsa kuyrukları eşliğinde sokak kutuplaşması tırmanıyor.",
        stateVector: { TP: 25, KP: 65, PID: 35, GB: 30, OH: 25, KD: 85 },
        initialCard: {
          id: "hist_card_1970s",
          title: lang === "EN" ? "Foreign Exchange Shortage & Fuel Embargo" : "Döviz Darlığı ve Akaryakıt Ambargosu Yönetimi",
          category: lang === "EN" ? "Macro Finance" : "Makro Finans",
          description: lang === "EN"
            ? "Central Bank foreign reserves depleted. Essential import supply chains broken. Rationing queues spark public unrest."
            : "Merkez Bankası döviz rezervleri tamamen tükendi. Temel ithalat kilitlendi. İthalat kuyrukları toplumsal huzursuzluğu tetikliyor.",
          options: [
            {
              id: "opt_1",
              label: lang === "EN" ? "Enforce price controls and fuel rationing cards." : "Karaborsayı engellemek için fiyat sabitlemesi ve karne uygulamasına geçin.",
              description: lang === "EN" ? "Enforce strict price caps on essentials." : "Temel ihtiyaç maddelerine sıkı tavan fiyat uygulayın.",
              stateDelta: { TP: -5, KP: +15, PID: -10, GB: +10, OH: -15, KD: +15 },
              consequenceText: lang === "EN" ? "Price controls fueled black market profits." : "Fiyat kontrolleri karaborsa rantını tırmandırdı.",
              text: lang === "EN" ? "Enforce price controls and fuel rationing cards." : "Karaborsayı engellemek için fiyat sabitlemesi ve karne uygulamasına geçin.",
              impact: { TP: -5, KP: +15, PID: -10, GB: +10, OH: -15, KD: +15 },
              logMessage: lang === "EN" ? "Price controls fueled black market profits." : "Fiyat kontrolleri karaborsa rantını tırmandırdı.",
            },
            {
              id: "opt_2",
              label: lang === "EN" ? "Sign emergency IMF austerity standby agreement." : "IMF ile acil standby anlaşması imzalayıp devalüasyon yapın.",
              description: lang === "EN" ? "Secure foreign currency reserves under strict IMF supervision." : "IMF denetiminde acil döviz kredisini temine koyulun.",
              stateDelta: { TP: +20, KP: -10, PID: -5, GB: -10, OH: -20, KD: -15 },
              consequenceText: lang === "EN" ? "Austerity plan brought short-term liquidity but public anger." : "IMF programı döviz sağladı fakat toplumsal tepki çekti.",
              text: lang === "EN" ? "Sign emergency IMF austerity standby agreement." : "IMF ile acil standby anlaşması imzalayıp devalüasyon yapın.",
              impact: { TP: +20, KP: -10, PID: -5, GB: -10, OH: -20, KD: -15 },
              logMessage: lang === "EN" ? "Austerity plan brought short-term liquidity but public anger." : "IMF programı döviz sağladı fakat toplumsal tepki çekti.",
            },
            {
              id: "opt_3",
              label: lang === "EN" ? "Mobilize grassroots solidarity distribution networks." : "Sendikalar ve yerel kooperatiflerle dayanışma dağıtım ağı kurun.",
              description: lang === "EN" ? "Bypass market monopolies with cooperative networks." : "Piyasa karaborsasını kooperatif dağıtım hatlarıyla aşın.",
              stateDelta: { TP: +15, KP: -20, PID: +20, GB: -5, OH: +15, KD: +5 },
              consequenceText: lang === "EN" ? "Grassroots networks reduced oligarchic market exploitation." : "Halk kooperatifleri oligarşik rantı geriletti.",
              text: lang === "EN" ? "Mobilize grassroots solidarity distribution networks." : "Sendikalar ve yerel kooperatiflerle dayanışma dağıtım ağı kurun.",
              impact: { TP: +15, KP: -20, PID: +20, GB: -5, OH: +15, KD: +5 },
              logMessage: lang === "EN" ? "Grassroots networks reduced oligarchic market exploitation." : "Halk kooperatifleri oligarşik rantı geriletti.",
            },
          ],
        },
        historicalNotes: [
          lang === "EN" ? "70 Cent Foreign Reserve Emergency Era" : "70 Sente Muhtaç Olunan Dış Borç Krizi Dönemi",
          lang === "EN" ? "Deep coalition paralysis and bureaucratic deadlocks" : "Koalisyon kilitlenmesi ve bürokratik çalkantılar",
        ],
      },
      "1980s": {
        title: lang === "EN" ? "1980s Structural Adjustment & Post-Coup Statecraft" : "1980'ler Yapısal Uyum ve Vesayet Restorasyonu",
        era: "1980-1983",
        description: lang === "EN"
          ? "Post-coup military junta regime transition, January 24 liberal economic reform package, and political ban restructuring."
          : "Askeri müdahale sonrası vesayet rejim restorasyonu, 24 Ocak kararları ve siyasi yasakların gölgesinde devlet aygıtı.",
        stateVector: { TP: 35, KP: 50, PID: 15, GB: 75, OH: 60, KD: 40 },
        initialCard: {
          id: "hist_card_1980s",
          title: lang === "EN" ? "24 January Market Liberalization Directives" : "24 Ocak Kararları ve Serbest Piyasaya Geçiş Directifi",
          category: lang === "EN" ? "Institutional Guardianship" : "Kurumsal Vesayet",
          description: lang === "EN"
            ? "International creditor groups demand full market deregulation. Labor unions restricted under martial law."
            : "Uluslararası konsorsiyumlar serbest piyasa reformlarını dayatıyor. Sendikal haklar dondurulmuş durumda.",
          options: [
            {
              id: "opt_1",
              label: lang === "EN" ? "Implement full privatization and export-led growth deregulation." : "İhracata dayalı büyüme modelini pazarlıksız uygulayın.",
              description: lang === "EN" ? "Open capital markets completely." : "Sermaye piyasalarını tam serbestleştirmeye açın.",
              stateDelta: { TP: +25, KP: +20, PID: -15, GB: +10, OH: +10, KD: -10 },
              consequenceText: lang === "EN" ? "Deregulation attracted foreign funds but expanded oligarchic holding monopolies." : "Deregülasyon holding sermayesini ihya etti.",
              text: lang === "EN" ? "Implement full privatization and export-led growth deregulation." : "İhracata dayalı büyüme modelini pazarlıksız uygulayın.",
              impact: { TP: +25, KP: +20, PID: -15, GB: +10, OH: +10, KD: -10 },
              logMessage: lang === "EN" ? "Deregulation attracted foreign funds but expanded oligarchic holding monopolies." : "Deregülasyon holding sermayesini ihya etti.",
            },
            {
              id: "opt_2",
              label: lang === "EN" ? "Negotiate safeguards for national industries with the junta council." : "Milli sanayiyi koruyacak yerli teşvik maddeleri ekletin.",
              description: lang === "EN" ? "Maintain selective industrial protections." : "Seçici yerli sanayi koruma kalkanlarını sürdürün.",
              stateDelta: { TP: +10, KP: -10, PID: +10, GB: -10, OH: -5, KD: +5 },
              consequenceText: lang === "EN" ? "National safeguards mitigated total industrial takeover." : "Milli teşvikler sanayi çöküşünü frenledi.",
              text: lang === "EN" ? "Negotiate safeguards for national industries with the junta council." : "Milli sanayiyi koruyacak yerli teşvik maddeleri ekletin.",
              impact: { TP: +10, KP: -10, PID: +10, GB: -10, OH: -5, KD: +5 },
              logMessage: lang === "EN" ? "National safeguards mitigated total industrial takeover." : "Milli teşvikler sanayi çöküşünü frenledi.",
            },
          ],
        },
        historicalNotes: [
          lang === "EN" ? "Martial Law & Depoliticized Party Architecture" : "Sıkıyönetim ve Siyasatsizleştirilmiş Parti Mimarisi",
        ],
      },
      "1990s": {
        title: lang === "EN" ? "1990s Fragile Coalitions & Bank Drain Crisis" : "1990'lar Zayıf Koalisyonlar ve Banka Hortumlama Krizi",
        era: "1993-1999",
        description: lang === "EN"
          ? "Unstable short-lived coalition governments, state-mafia-business triangle, and off-budget fund corruption scandals."
          : "Kırılgan koalisyonlar, devlet-sermaye-çete ilişkileri ve fon hesapları üzerinden banka içi boşaltma krizleri.",
        stateVector: { TP: 30, KP: 75, PID: 30, GB: 50, OH: 50, KD: 70 },
        initialCard: {
          id: "hist_card_1990s",
          title: lang === "EN" ? "Off-Budget Fund & Offshore Banking Investigation" : "Örtülü Ödenek ve Hortumlanan Bankalar Soruşturması",
          category: lang === "EN" ? "Oligarchy Risk" : "Oligarşi Riski",
          description: lang === "EN"
            ? "Multiple private banks emptied by connected oligarchs. Public deficit exploding due to state guarantees."
            : "Nüfuz ticareti yapan sermaye grupları bankaları boşalttı. Devlet garantisi kamu maliyesini çökertiyor.",
          options: [
            {
              id: "opt_1",
              label: lang === "EN" ? "Seize insolvent banks under TMSF state audit council." : "TMSF el koyma kararıyla batan bankalara el koyup varlıklarına el koyun.",
              description: lang === "EN" ? "Confiscate assets of corrupt bank owners." : "Hortumcu banka sahiplerinin varlıklarına kamu el koysun.",
              stateDelta: { TP: +20, KP: -25, PID: +10, GB: +15, OH: +15, KD: -15 },
              consequenceText: lang === "EN" ? "TMSF intervention dealt a heavy blow to offshore capital rings." : "TMSF operasyonu kirli sermayeyi geriletti.",
              text: lang === "EN" ? "Seize insolvent banks under TMSF state audit council." : "TMSF el koyma kararıyla batan bankalara el koyup varlıklarına el koyun.",
              impact: { TP: +20, KP: -25, PID: +10, GB: +15, OH: +15, KD: -15 },
              logMessage: lang === "EN" ? "TMSF intervention dealt a heavy blow to offshore capital rings." : "TMSF operasyonu kirli sermayeyi geriletti.",
            },
            {
              id: "opt_2",
              label: lang === "EN" ? "Bailout bank owners to preserve financial system confidence." : "Sistemik çöküşü önlemek için banka sahiplerine borç yapılandırması verin.",
              description: lang === "EN" ? "Absorb financial debts through state treasury guarantees." : "Mali borçları hazine garantisine alarak sistem çöküşünü önleyin.",
              stateDelta: { TP: -20, KP: +30, PID: -15, GB: -10, OH: -10, KD: +20 },
              consequenceText: lang === "EN" ? "Bailout deepened public deficit and oligarchic impunity." : "Kurtarma paketi kamu zararlarını tırmandırdı.",
              text: lang === "EN" ? "Bailout bank owners to preserve financial system confidence." : "Sistemik çöküşü önlemek için banka sahiplerine borç yapılandırması verin.",
              impact: { TP: -20, KP: +30, PID: -15, GB: -10, OH: -10, KD: +20 },
              logMessage: lang === "EN" ? "Bailout deepened public deficit and oligarchic impunity." : "Kurtarma paketi kamu zararlarını tırmandırdı.",
            },
          ],
        },
        historicalNotes: [
          lang === "EN" ? "State-Capital-Mafia Triangle Disclosures" : "Devlet-Sermaye-Çete Üçgeni Açığa Çıktı",
        ],
      },
      "2001": {
        title: lang === "EN" ? "2001 Devaluation Shock & IMF Rescue Program" : "2001 Kara Çarşamba ve Anayasa Kitapçığı Krizi",
        era: "2001-2002",
        description: lang === "EN"
          ? "Overnight interest rates reach 7500%, constitutional booklet crisis triggers sudden currency devaluation and banking system crash."
          : "Gecelik faizlerin %7500'e fırladığı, Anayasa kitapçığı kriziyle döviz çıpasının çöktüğü tarihi finansal kilitlenme.",
        stateVector: { TP: 20, KP: 70, PID: 40, GB: 30, OH: 35, KD: 95 },
        initialCard: {
          id: "hist_card_2001",
          title: lang === "EN" ? "Overnight Rate Spike & Floating Exchange Rate Crisis" : "Gecelik Faiz Şoku ve Dalgalı Kur Kararı",
          category: lang === "EN" ? "Macro Finance" : "Makro Finans",
          description: lang === "EN"
            ? "Banking sector illiquid. Exchange rate peg abandoned. Middle-class savings wiped out in 24 hours."
            : "Bankacılık sistemi kilitlendi. Sabit kur terk edildi. TL bir gecede %40 değer kaybetti.",
          options: [
            {
              id: "opt_1",
              label: lang === "EN" ? "Appoint independent technocrat minister and pass Kemal Derviş reforms." : "Bağımsız teknokrat bakan atayıp Güçlü Ekonomiye Geçiş Programı ilan edin.",
              description: lang === "EN" ? "Implement strict fiscal discipline and central bank independence." : "Merkez bankası bağımsızlığı ve sıkı mali disiplin uygulayın.",
              stateDelta: { TP: +25, KP: -15, PID: -5, GB: +20, OH: +10, KD: -35 },
              consequenceText: lang === "EN" ? "Technocratic reform stabilized currency but reduced political autonomy." : "Teknokrat reform kuru dizginledi fakat idari vesayeti artırdı.",
              text: lang === "EN" ? "Appoint independent technocrat minister and pass Kemal Derviş reforms." : "Bağımsız teknokrat bakan atayıp Güçlü Ekonomiye Geçiş Programı ilan edin.",
              impact: { TP: +25, KP: -15, PID: -5, GB: +20, OH: +10, KD: -35 },
              logMessage: lang === "EN" ? "Technocratic reform stabilized currency but reduced political autonomy." : "Teknokrat reform kuru dizginledi fakat idari vesayeti artırdı.",
            },
            {
              id: "opt_2",
              label: lang === "EN" ? "Reject foreign dictates and impose emergency capital controls." : "Sermaye hareketlerini kısıtlayıp yerli kriz masası oluşturun.",
              description: lang === "EN" ? "Restrict foreign exchange outflow and fix rates artificially." : "Döviz çıkışlarını kısıtlayıp kuru sabitleyin.",
              stateDelta: { TP: -10, KP: -10, PID: +15, GB: -15, OH: -15, KD: +10 },
              consequenceText: lang === "EN" ? "Capital controls slowed panic but isolated external credit." : "Sermaye kısıtı paniği yatıştırdı fakat kredi kanallarını daralttı.",
              text: lang === "EN" ? "Reject foreign dictates and impose emergency capital controls." : "Sermaye hareketlerini kısıtlayıp yerli kriz masası oluşturun.",
              impact: { TP: -10, KP: -10, PID: +15, GB: -15, OH: -15, KD: +10 },
              logMessage: lang === "EN" ? "Capital controls slowed panic but isolated external credit." : "Sermaye kısıtı paniği yatıştırdı fakat kredi kanallarını daralttı.",
            },
          ],
        },
        historicalNotes: [
          lang === "EN" ? "Overnight Interest Rate Peak: 7500%" : "Gecelik Faiz Rekoru: %7500",
        ],
      },
      "2008": {
        title: lang === "EN" ? "2008 Global Credit Crunch & Liquidity Cushion" : "2008 Küresel Kredi Darboğazı ve Çevresel Etki",
        era: "2008-2009",
        description: lang === "EN"
          ? "Wall Street credit contagion threatens export markets and corporate debt rollover."
          : "Lehman Brothers çöküşüyle küresel kredi muslukları kesildi. İhracat pazarlarında daralma ve reel sektör kriz tehdidi.",
        stateVector: { TP: 45, KP: 50, PID: 55, GB: 55, OH: 60, KD: 50 },
        initialCard: {
          id: "hist_card_2008",
          title: lang === "EN" ? "Global Credit Contagion & Corporate Debt Rollover" : "Küresel Kredi Bulaşması ve Reel Sektör Destek Paketi",
          category: lang === "EN" ? "Macro Finance" : "Makro Finans",
          description: lang === "EN"
            ? "International credit lines closed. Domestic exporters face order cancellations and working capital drain."
            : "Dış borçlanma kanalları kapandı. İhracatçı firmalar sipariş iptalleriyle karşı karşıya.",
          options: [
            {
              id: "opt_1",
              label: lang === "EN" ? "Deploy public liquidity guarantees and tax credit incentives." : "Kredi Garanti Fonu ve vergi indirim paketi açıklayın.",
              description: lang === "EN" ? "Support exporters and industrial manufacturers with credit funds." : "İhracatçı ve imalatçı sanayiyi kredi garanti kalkanıyla koruyun.",
              stateDelta: { TP: -10, KP: +10, PID: +5, GB: +10, OH: +15, KD: -10 },
              consequenceText: lang === "EN" ? "Liquidity guarantees prevented domestic industrial bankruptcies." : "Likidite desteği reel sektör iflaslarını engelledi.",
              text: lang === "EN" ? "Deploy public liquidity guarantees and tax credit incentives." : "Kredi Garanti Fonu ve vergi indirim paketi açıklayın.",
              impact: { TP: -10, KP: +10, PID: +5, GB: +10, OH: +15, KD: -10 },
              logMessage: lang === "EN" ? "Liquidity guarantees prevented domestic industrial bankruptcies." : "Likidite desteği reel sektör iflaslarını engelledi.",
            },
            {
              id: "opt_2",
              label: lang === "EN" ? "Request preemptive IMF credit line." : "Önleyici IMF ihtiyati akdi imzalayın.",
              description: lang === "EN" ? "Secure liquidity buffer from international institutions." : "Uluslararası kurumlardan önleyici likidite kalkanı temin edin.",
              stateDelta: { TP: +20, KP: -15, PID: -10, GB: +10, OH: -10, KD: -15 },
              consequenceText: lang === "EN" ? "IMF buffer reassured rating agencies." : "IMF rezervi kredi derecelendirme notunu korudu.",
              text: lang === "EN" ? "Request preemptive IMF credit line." : "Önleyici IMF ihtiyati akdi imzalayın.",
              impact: { TP: +20, KP: -15, PID: -10, GB: +10, OH: -10, KD: -15 },
              logMessage: lang === "EN" ? "IMF buffer reassured rating agencies." : "IMF rezervi kredi derecelendirme notunu korudu.",
            },
          ],
        },
        historicalNotes: [
          lang === "EN" ? "Global Credit Contagion Wave" : "Küresel Likidite Kuruması Dalgası",
        ],
      },
    };

    // If preset ID exists and customPrompt is empty, check if we can generate via Gemini or use fallback
    let promptText = "";
    if (scenarioId === "custom" || customPrompt) {
      promptText = `Generate a realistic political strategy simulation starting scenario for: "${customPrompt || "Custom Political Crisis"}". Language: ${lang}.`;
    } else if (PRESET_FALLBACKS[scenarioId]) {
      promptText = `Generate a high-stakes historical political simulation scenario for the preset era: "${scenarioId}". Era title: "${PRESET_FALLBACKS[scenarioId].title}". Language: ${lang}.`;
    } else {
      promptText = `Generate a dramatic political strategy crisis starting scenario in ${lang}.`;
    }

    try {
      const ai = getGeminiClient();
      const systemInstruction = lang === "EN"
        ? "You are a master political historian and game designer. Create a rich historical or political crisis starting scenario with balanced 6D State Vector values (TP, KP, PID, GB, OH, KD) and a compelling initial decision card."
        : "Sen usta bir siyaset tarihçisi ve oyun tasarımcısısın. 6-boyutlu kaynak vektörü (TP, KP, PID, GB, OH, KD) ve sürükleyici bir başlangıç karar kartı içeren tarihi/siyasi kriz senaryosu üret.";

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Scenario Title" },
              era: { type: Type.STRING, description: "Historical Era or Year range, e.g. 1977-1980" },
              description: { type: Type.STRING, description: "Detailed 2-3 sentence historical background context" },
              stateVector: {
                type: Type.OBJECT,
                properties: {
                  TP: { type: Type.INTEGER, description: "Clean Capital (0-100)" },
                  KP: { type: Type.INTEGER, description: "Dark Capital (0-100)" },
                  PID: { type: Type.INTEGER, description: "Party Democracy (0-100)" },
                  GB: { type: Type.INTEGER, description: "Shadow Bureaucracy (0-100)" },
                  OH: { type: Type.INTEGER, description: "Overton Window (0-100)" },
                  KD: { type: Type.INTEGER, description: "Currency Volatility (0-100)" },
                },
                required: ["TP", "KP", "PID", "GB", "OH", "KD"],
              },
              initialCard: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        label: { type: Type.STRING },
                        description: { type: Type.STRING },
                        consequenceText: { type: Type.STRING },
                        stateDelta: {
                          type: Type.OBJECT,
                          properties: {
                            TP: { type: Type.INTEGER },
                            KP: { type: Type.INTEGER },
                            PID: { type: Type.INTEGER },
                            GB: { type: Type.INTEGER },
                            OH: { type: Type.INTEGER },
                            KD: { type: Type.INTEGER },
                          },
                        },
                      },
                      required: ["id", "label", "description", "consequenceText", "stateDelta"],
                    },
                  },
                },
                required: ["id", "title", "category", "description", "options"],
              },
              historicalNotes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["title", "era", "description", "stateVector", "initialCard", "historicalNotes"],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, scenario: parsed });
      } else {
        throw new Error("Empty Gemini API response");
      }
    } catch (apiError: any) {
      console.warn("Gemini API call failed for scenario, using fallback:", apiError?.message || apiError);
      
      const fallback = PRESET_FALLBACKS[scenarioId] || PRESET_FALLBACKS["1970s"];
      return res.json({
        success: true,
        fallback: true,
        scenario: fallback,
      });
    }
  } catch (err: any) {
    console.error("Historical scenarios error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Vite middleware for dev / express static for prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
