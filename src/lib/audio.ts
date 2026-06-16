"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("terminal_sound_enabled_v2");
      // Default to enabled (true) if not set, letting user hear clacks on gesture keydown
      this.enabled = saved !== null ? saved === "true" : true;

      // Unblock and resume AudioContext on first page interaction
      const resumeOnInteraction = () => {
        this.initCtx();
        window.removeEventListener("click", resumeOnInteraction);
        window.removeEventListener("keydown", resumeOnInteraction);
      };
      window.addEventListener("click", resumeOnInteraction);
      window.addEventListener("keydown", resumeOnInteraction);
    }
  }

  public toggleSound(state?: boolean): boolean {
    this.enabled = state !== undefined ? state : !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("terminal_sound_enabled_v2", String(this.enabled));
      // Notify other parts of the application
      window.dispatchEvent(new CustomEvent("terminal-sound-toggle", { detail: this.enabled }));
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public playKey(key: string) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      if (key === " " || key === "Spacebar") {
        // Spacebar: deeper thud + stabilizer clack
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, now);

        gainNode.gain.setValueAtTime(0.35, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.08);

        // Metallic stabilizer tick
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.connect(clickGain);
        clickGain.connect(this.ctx.destination);
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(620, now);
        clickGain.gain.setValueAtTime(0.04, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
        clickOsc.start(now);
        clickOsc.stop(now + 0.015);
      } else if (key === "Enter") {
        // Enter: mechanical double clack
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);

        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(170, now);
        osc1.frequency.exponentialRampToValueAtTime(125, now + 0.05);
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc1.start(now);
        osc1.stop(now + 0.05);

        // Secondary switch release click
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(750, now + 0.02);
        gain2.gain.setValueAtTime(0.1, now + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc2.start(now + 0.02);
        osc2.stop(now + 0.045);
      } else if (key === "Backspace") {
        // Backspace: slightly heavier low frequency clack
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(155, now);
        osc.frequency.exponentialRampToValueAtTime(95, now + 0.06);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        gainNode.gain.setValueAtTime(0.28, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

        osc.start(now);
        osc.stop(now + 0.06);
      } else {
        // Standard tactile switch click (Brown/Blue switch style clack)
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.type = "triangle";
        const pitch = 300 + Math.random() * 80;
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(pitch / 2, now + 0.035);

        gainNode.gain.setValueAtTime(0.24, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.start(now);
        osc.stop(now + 0.035);

        // High frequency metal switch contacts tick
        const tickOsc = this.ctx.createOscillator();
        const tickGain = this.ctx.createGain();
        
        tickOsc.connect(tickGain);
        tickGain.connect(this.ctx.destination);
        
        tickOsc.type = "sine";
        tickOsc.frequency.setValueAtTime(2000 + Math.random() * 300, now);
        tickGain.gain.setValueAtTime(0.045, now);
        tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
        
        tickOsc.start(now);
        tickOsc.stop(now + 0.01);
      }
    } catch (e) {
      console.warn("Audio Context playback error:", e);
    }
  }
}

export const audio = typeof window !== "undefined" ? new AudioEngine() : null;
