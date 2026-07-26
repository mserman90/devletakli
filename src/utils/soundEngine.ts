/**
 * SIFIR BAĞIMLILIKLI PROSEDÜREL SES MOTORU
 * Web Audio API kullanılarak osilatörler, ADSR zarfları ve filtrelerle
 * tüm arayüz sesleri, sabotaj sirenleri ve kalp atışı efektleri sentezlenir.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private heartbeatTimer: number | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazily initialized on user interaction
  }

  private initCtx(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stopHeartbeat();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * UI Ses Efektleri Sentezleyici
   */
  public playUI(type: 'SELECT' | 'HOVER' | 'CONFIRM' | 'VICTORY' | 'DEFEAT'): void {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;

    const now = ctx.currentTime;

    switch (type) {
      case 'HOVER': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'SELECT': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'CONFIRM': {
        // Çift tonlu onay sesi
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0.1, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.12);
        });
        break;
      }

      case 'VICTORY': {
        // Triumphant majör akor arpej
        const freqs = [440, 554.37, 659.25, 880, 1108.73];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);

          gain.gain.setValueAtTime(0.12, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.4);
        });
        break;
      }

      case 'DEFEAT': {
        // Kasvetli iniş tonu
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 1.2);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
        break;
      }
    }
  }

  /**
   * Testere dişi dalgalı Acil Durum Sabotaj Sireni
   */
  public playSabotageSiren(): void {
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const mainGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(4, now); // 4 Hz siren frekansı

    lfoGain.gain.setValueAtTime(300, now); // Pitch deviasyonu
    lfo.connect(osc.frequency);
    osc.frequency.setValueAtTime(600, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    mainGain.gain.setValueAtTime(0.18, now);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    lfo.start(now);
    osc.start(now);

    lfo.stop(now + 1.8);
    osc.stop(now + 1.8);
  }

  /**
   * BPM Uyarlamalı Kalp Atışı Efekti (BPM-driven "lub-dub")
   */
  public startHeartbeat(bpm = 120): void {
    this.stopHeartbeat();
    const ctx = this.initCtx();
    if (!ctx || this.isMuted) return;

    const intervalMs = (60 / bpm) * 1000;

    const triggerThump = () => {
      const c = this.initCtx();
      if (!c || this.isMuted) return;

      const now = c.currentTime;

      // First thump ("lub")
      const osc1 = c.createOscillator();
      const gain1 = c.createGain();
      const filter1 = c.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(70, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(120, now);

      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(c.destination);

      osc1.start(now);
      osc1.stop(now + 0.12);

      // Second thump ("dub") slightly delayed
      const osc2 = c.createOscillator();
      const gain2 = c.createGain();
      const filter2 = c.createBiquadFilter();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(60, now + 0.15);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(100, now + 0.15);

      gain2.gain.setValueAtTime(0.22, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.27);

      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(c.destination);

      osc2.start(now + 0.15);
      osc2.stop(now + 0.27);
    };

    triggerThump();
    this.heartbeatTimer = window.setInterval(triggerThump, intervalMs);
  }

  public stopHeartbeat(): void {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

export const soundEngine = new SoundEngine();
