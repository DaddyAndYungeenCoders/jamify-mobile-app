import { create } from "zustand";
import { NotificationTypes } from "@/types/notification.types";

interface NotificationStore {
    notifications: NotificationTypes[];
    // Actions
    addNotification: (notification: NotificationTypes) => void;
    clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],

    addNotification: (notification) => {
        console.log("New notification stored: " + JSON.stringify(notification));
        set((state) => ({
            notifications: [...state.notifications, notification],
        }));
    },
    clearNotifications: () => {
        set((state) => ({
            notifications: [],
        }));
    }
}));
