// contex/NotificationsContext.js
import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Create context
const NotificationsContext = createContext(null);

// Provider component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a notification
  const addNotification = useCallback((text) => {
    setNotifications((prev) => [...prev, { id: Date.now(), text }]);
  }, []);

  // Remove a notification by ID
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Memoized context value
  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      clearNotifications,
    }),
    [notifications, addNotification, removeNotification, clearNotifications]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook for using notifications
export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  }
  return ctx;
};
