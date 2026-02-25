class AudioControllerSingleton {
  private static instance: AudioControllerSingleton;
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private fadeInterval: number | null = null;
  private readonly MAX_VOLUME = 0.25;
  private onStateChangeCallback: ((isPlaying: boolean) => void) | null = null;

  private constructor() {}

  static getInstance() {
    if (!AudioControllerSingleton.instance) {
      AudioControllerSingleton.instance = new AudioControllerSingleton();
    }
    return AudioControllerSingleton.instance;
  }

  init() {
    if (this.audio) return;
    
    this.audio = new Audio('https://cdn.pixabay.com/download/audio/2022/11/22/audio_d1718ab41b.mp3?filename=ambient-classical-guitar-144998.mp3');
    this.audio.loop = true;
    this.audio.volume = 0;
  }

  onStateChange(callback: (isPlaying: boolean) => void) {
    this.onStateChangeCallback = callback;
    callback(this.isPlaying);
  }

  private notifyStateChange() {
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(this.isPlaying);
    }
  }

  async play() {
    if (!this.audio) this.init();
    
    try {
      this.isPlaying = true;
      localStorage.setItem('globalVoiceMusic', 'true');
      this.notifyStateChange();
      
      await this.audio!.play();
      this.fadeIn();
    } catch (error) {
      // Silently handle the error to avoid console warnings if possible
      this.isPlaying = false;
      localStorage.setItem('globalVoiceMusic', 'false');
      this.notifyStateChange();
    }
  }

  async playIfEnabled() {
    if (localStorage.getItem('globalVoiceMusic') === 'true') {
      await this.play();
    }
  }

  pause() {
    if (!this.audio) return;
    this.isPlaying = false;
    localStorage.setItem('globalVoiceMusic', 'false');
    this.notifyStateChange();
    this.fadeOut();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  private fadeIn() {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    
    // Fade in over 1.5 seconds (1500ms). 
    // 1500ms / 50ms interval = 30 steps.
    // MAX_VOLUME / 30 steps = volume increment per step.
    const steps = 30;
    const increment = this.MAX_VOLUME / steps;
    
    this.fadeInterval = window.setInterval(() => {
      if (this.audio!.volume < this.MAX_VOLUME) {
        this.audio!.volume = Math.min(this.audio!.volume + increment, this.MAX_VOLUME);
      } else {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, 50);
  }

  private fadeOut() {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    
    // Fade out over 1.0 seconds (1000ms).
    // 1000ms / 50ms interval = 20 steps.
    const steps = 20;
    const decrement = this.audio.volume / steps;
    
    this.fadeInterval = window.setInterval(() => {
      if (this.audio!.volume > 0) {
        this.audio!.volume = Math.max(this.audio!.volume - decrement, 0);
      } else {
        this.audio!.pause();
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, 50);
  }

  getState() {
    return this.isPlaying;
  }
}

export const audioController = AudioControllerSingleton.getInstance();
