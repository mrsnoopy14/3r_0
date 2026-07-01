import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  bookingId?: string;
  timestamp: number;
  read: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (data: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markRead: () => {},
  markAllRead: () => {},
  clearAll: () => {},
});

const STORAGE_KEY = 'appNotifications';
const MAX_NOTIFICATIONS = 50;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) setNotifications(JSON.parse(raw));
    });
  }, []);

  const persist = (items: AppNotification[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addNotification = useCallback((data: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const notif: AppNotification = {
      ...data,
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications(prev => {
      const updated = [notif, ...prev].slice(0, MAX_NOTIFICATIONS);
      persist(updated);
      return updated;
    });
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      persist(updated);
      return updated;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      persist(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markRead, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
