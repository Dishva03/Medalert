import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { speak as speakUtil, SpeechOptions } from '@/utils/speechSynthesis';

interface SpeechContextType {
  playWelcomeMessage: () => void;
  speak: (text: string, options?: SpeechOptions) => void;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export const SpeechProvider = ({ children }: { children: ReactNode }) => {
  // Track if user has interacted with the page
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Play welcome message function
  const playWelcomeMessage = () => {
    speakUtil("WELCOME TO MEDALERT", { rate: 0.9, pitch: 1.1, fallbackMessage: true });
  };
  
  // Wrapper for speak function to be exposed in context
  const handleSpeak = (text: string, options?: SpeechOptions) => {
    speakUtil(text, options);
  };

  // Set up event listeners for user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        playWelcomeMessage();
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };
    
    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    // Attempt to play welcome message after a delay
    // This may work in browsers without strict autoplay policies
    const timer = setTimeout(() => {
      if (!userInteracted) {
        playWelcomeMessage();
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [userInteracted]);

  return (
    <SpeechContext.Provider
      value={{
        playWelcomeMessage,
        speak: handleSpeak,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};