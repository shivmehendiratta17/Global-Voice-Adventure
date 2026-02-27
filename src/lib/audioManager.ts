class AudioManager {
  private audioContext: AudioContext | null = null;
  private musicElement: HTMLAudioElement | null = null;
  
  public customMusicUrl: string | null = null;
  public musicVolume: number = 0.5;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.stopMusic();
      });
    }
  }

  public initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public playMusic(volume: number = 0.5) {
    this.initAudioContext();
    this.musicVolume = volume;
    
    if (!this.musicElement) {
      this.musicElement = new Audio();
      this.musicElement.loop = true;
    }
    
    this.musicElement.volume = volume;
    
    const src = this.customMusicUrl || 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3';
    
    if (this.musicElement.src !== src) {
      this.musicElement.src = src;
    }
    
    this.musicElement.play().catch(e => console.warn('Audio play failed:', e));
  }

  public stopMusic() {
    if (this.musicElement) {
      this.musicElement.pause();
    }
  }

  public setMusicVolume(volume: number) {
    this.musicVolume = volume;
    if (this.musicElement) {
      this.musicElement.volume = volume;
    }
  }

  public setCustomMusic(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("File size exceeds 10MB limit.");
    }
    if (this.customMusicUrl) {
      URL.revokeObjectURL(this.customMusicUrl);
    }
    this.customMusicUrl = URL.createObjectURL(file);
    
    if (this.musicElement && !this.musicElement.paused) {
      this.playMusic(this.musicVolume);
    }
  }
}

export const audioManager = new AudioManager();
