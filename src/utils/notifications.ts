// src/utils/notifications.ts
import { Platform } from 'react-native';

type NotificationListener = (notification: any) => void;
type ResponseListener = (response: any) => void;

export function setNotificationListener(
  onNotification: NotificationListener,
  onResponse: ResponseListener
): () => void {
  if (Platform.OS === 'web') {
    return () => {};
  }

  console.log('Notification listener registered');
  return () => {
    console.log('Notification listener removed');
  };
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return false;
  }
  return true;
}