import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {Platform} from "react-native";
import Constants from "expo-constants";

// Configuration du gestionnaire de notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Fonction pour envoyer une notification push
export async function sendPushNotification(expoPushToken: string) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Notification Title",
        body: "Notification Body",
        data: { customData: "Some data" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

// Fonction pour s'inscrire aux notifications push
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            console.error("Permission non accordée pour les notifications.");
            return undefined;
        }

        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error("ID du projet introuvable.");
            }

            const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
            return tokenData.data;
        } catch (error) {
            console.error("Erreur lors de l'obtention du token :", error);
            throw error;
        }
    } else {
        console.error("Les notifications push nécessitent un appareil physique.");
        return undefined;
    }
}

// Initialiser le service de notification
export async function initializeNotificationService() {
    const token = await registerForPushNotificationsAsync();
    if (token) {
        console.log("Token de notification :", token);
    } else {
        console.warn("Aucun token de notification obtenu.");
    }
}

// Ajouter un listener pour les notifications reçues
export function addNotificationReceivedListener(callback: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(callback);
}

// Ajouter un listener pour les réponses aux notifications
export function addNotificationResponseListener(callback: (response: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(callback);
}
