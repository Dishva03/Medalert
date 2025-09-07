import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Bell } from 'lucide-react';
import { useSpeech } from '@/contexts/SpeechContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'medicine-added' | 'medicine-reminder' | 'medicine-taken';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  speechEnabled: boolean;
  toggleSpeechNotifications: () => void;
  addNotification: (title: string, message: string, type: Notification['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const { toast } = useToast();
  const { speak } = useSpeech();
  
  // Toggle speech notifications
  const toggleSpeechNotifications = () => {
    setSpeechEnabled(prev => !prev);
    // Store preference in localStorage
    localStorage.setItem('medalert-speech-enabled', (!speechEnabled).toString());
  };
  
  // Load speech preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('medalert-speech-enabled');
    if (savedPreference !== null) {
      setSpeechEnabled(savedPreference === 'true');
    }
  }, []);
  
  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Add a new notification
  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      timestamp: new Date(),
      read: false,
      type,
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast({
      title,
      description: message,
    });

    // Speak the notification if speech is enabled
    if (speechEnabled) {
      speak(`${title}. ${message}`);
    }

    // Show browser notification if permission is granted
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico'
      });
    }
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        speechEnabled,
        toggleSpeechNotifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};