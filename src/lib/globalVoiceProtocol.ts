export class GlobalVoiceProtocol {
  private synthesis: SpeechSynthesis | null = null;
  private recognition: any = null;
  private voice: SpeechSynthesisVoice | null = null;
  
  public isVoiceEnabled: boolean = true;
  public isInputEnabled: boolean = false;
  public volume: number = 0.8;
  
  private onResultCallback: ((text: string) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.initRecognition();
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

  private initRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (this.onResultCallback) {
          this.onResultCallback(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Voice Protocol Recognition Error:', event.error);
        if (this.onErrorCallback) {
          this.onErrorCallback(event.error);
        }
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }
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

  public startListening(onResult: (text: string) => void, onError?: (error: string) => void) {
    if (!this.isInputEnabled || !this.recognition) {
      if (onError) onError('Voice input is disabled or not supported.');
      return;
    }
    
    this.onResultCallback = onResult;
    this.onErrorCallback = onError || null;
    
    try {
      this.recognition.start();
    } catch (e) {
      console.warn('Recognition already started or failed to start:', e);
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
  }
}

export const globalVoice = new GlobalVoiceProtocol();
