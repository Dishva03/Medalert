import { useEffect, useState } from 'react';
import { useSpeech } from '@/contexts/SpeechContext';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WelcomeMessage() {
  const { playWelcomeMessage } = useSpeech();
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return visible ? (
    <div 
      className={cn(
        "fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-lg shadow-lg",
        "flex items-center gap-2 cursor-pointer transition-opacity duration-500",
        "hover:opacity-90 z-50"
      )}
      onClick={() => {
        playWelcomeMessage();
        setVisible(false);
      }}
    >
      <Volume2 className="h-5 w-5" />
      <span>Click to hear welcome message</span>
    </div>
  ) : null;
}