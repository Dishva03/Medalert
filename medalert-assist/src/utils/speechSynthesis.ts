/**
 * Speech Synthesis Utility
 * 
 * This utility provides functions for text-to-speech functionality
 * using the Web Speech API.
 */

/**
 * Speaks the provided text using the browser's speech synthesis API
 * @param text - The text to be spoken
 * @param options - Optional configuration for the speech
 */
export const speak = (text: string, options?: SpeechOptions): void => {
  // Check if speech synthesis is supported
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis is not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create a new speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Apply options if provided
  if (options) {
    if (options.rate) utterance.rate = options.rate;
    if (options.pitch) utterance.pitch = options.pitch;
    if (options.volume) utterance.volume = options.volume;
    if (options.voice) utterance.voice = options.voice;
    if (options.lang) utterance.lang = options.lang;
  }
  
  // Chrome requires user interaction before playing audio
  // This function attempts to work around autoplay restrictions
  const attemptSpeech = () => {
    try {
      window.speechSynthesis.speak(utterance);
      
      // Check if speech actually started
      setTimeout(() => {
        if (window.speechSynthesis.speaking === false && options?.fallbackMessage) {
          console.warn('Speech synthesis may be blocked by browser. Enable in browser settings.');
        }
      }, 100);
    } catch (error) {
      console.error('Error with speech synthesis:', error);
    }
  };
  
  // Attempt to speak
  attemptSpeech();
};

/**
 * Stops any ongoing speech
 */
export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Gets all available voices for speech synthesis
 * @returns Promise that resolves with an array of available voices
 */
export const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    // If voices are already loaded
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // If voices aren't loaded yet, wait for them
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    };
  });
};

/**
 * Options for speech synthesis
 */
export interface SpeechOptions {
  /** Speech rate (0.1 to 10) - default is 1 */
  rate?: number;
  /** Speech pitch (0 to 2) - default is 1 */
  pitch?: number;
  /** Speech volume (0 to 1) - default is 1 */
  volume?: number;
  /** Speech voice */
  voice?: SpeechSynthesisVoice;
  /** Speech language (e.g., 'en-US') */
  lang?: string;
  /** Whether to show a fallback message if speech fails */
  fallbackMessage?: boolean;
}