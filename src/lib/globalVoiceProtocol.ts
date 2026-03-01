export class GlobalVoiceProtocol {
  private synthesis: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  
  public isVoiceEnabled: boolean = true;
  public volume: number = 0.8;
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.loadVoices();
      
      if (this.synthesis && this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = this.loadVoices.bind(this);
      }
    }
  }

  private loadVoices() {
    if (!this.synthesis) return;
    const voices = this.synthesis.getVoices();
    this.voice = voices.find(v => 
      v.name.includes('Google UK English Male') || 
      v.name.includes('Daniel') || 
      v.name.includes('Samantha') || 
      v.lang === 'en-GB'
    ) || voices[0] || null;
  }

  public speak(text: string, priority: boolean = false) {
    if (!this.isVoiceEnabled || !this.synthesis) return;
    
    if (priority) {
      this.synthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.volume = this.volume;
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    
    this.synthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

export const globalVoice = new GlobalVoiceProtocol();
