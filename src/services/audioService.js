class AudioService {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.isInitialized = false;
    this.isMuted = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      await this.loadSounds();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  async loadSounds() {
    const soundUrls = {
      click: this.generateTone(800, 0.1, 'sine'),
      bubble: this.generateBubbleSound(),
      flow: this.generateFlowSound(),
      success: this.generateSuccessSound(),
      transition: this.generateTransitionSound()
    };

    for (const [name, audioBuffer] of Object.entries(soundUrls)) {
      this.sounds[name] = audioBuffer;
    }

    // Generate welcome message
    this.generateWelcomeMessage();
  }

  generateTone(frequency, duration, type = 'sine') {
    if (!this.audioContext) return null;
    
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 3); // Soft decay
      data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.1;
    }

    return buffer;
  }

  generateBubbleSound() {
    if (!this.audioContext) return null;
    
    const duration = 0.3;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 8);
      const freq = 600 + Math.sin(t * 50) * 200;
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.08;
    }

    return buffer;
  }

  generateFlowSound() {
    if (!this.audioContext) return null;
    
    const duration = 1.5;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const envelope = Math.sin(Math.PI * t / duration);
      const noise = (Math.random() - 0.5) * 0.3;
      const freq = 200 + Math.sin(t * 3) * 50;
      data[i] = (Math.sin(2 * Math.PI * freq * t) * 0.5 + noise) * envelope * 0.06;
    }

    return buffer;
  }

  generateSuccessSound() {
    if (!this.audioContext) return null;
    
    const duration = 0.6;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    const notes = [523, 659, 784]; // C, E, G
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const noteIndex = Math.floor(t * 3);
      const freq = notes[Math.min(noteIndex, notes.length - 1)];
      const envelope = Math.exp(-t * 2);
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.12;
    }

    return buffer;
  }

  generateTransitionSound() {
    if (!this.audioContext) return null;
    
    const duration = 0.4;
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const envelope = 1 - t / duration;
      const freq = 400 + t * 300;
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.08;
    }

    return buffer;
  }

  generateWelcomeMessage() {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Welcome to the Flow Zone');
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.7;
      
      // Try to use a female voice
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.gender === 'female'
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      this.welcomeMessage = utterance;
    }
  }

  async playSound(soundName, volume = 1) {
    if (!this.isInitialized || this.isMuted || !this.audioContext || !this.sounds[soundName]) {
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = this.sounds[soundName];
      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  playWelcome() {
    if (this.welcomeMessage && !this.isMuted) {
      setTimeout(() => {
        speechSynthesis.speak(this.welcomeMessage);
      }, 1000);
    }
  }

  toggle() {
    this.isMuted = !this.isMuted;
    return !this.isMuted;
  }

  click() { this.playSound('click', 0.3); }
  bubble() { this.playSound('bubble', 0.4); }
  flow() { this.playSound('flow', 0.5); }
  success() { this.playSound('success', 0.6); }
  transition() { this.playSound('transition', 0.4); }
}

export default new AudioService();