// src/utils/network.ts
import { Platform } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

let isConnected = true;

export function isOnline(): boolean {
  if (Platform.OS === 'web') {
    return navigator.onLine;
  }
  return isConnected;
}

export function addNetworkListener(
  callback: (state: NetInfoState) => void
): () => void {
  if (Platform.OS === 'web') {
    const handleOnline = () => {
      callback({
        isConnected: true,
        isInternetReachable: true,
        type: 'unknown',
        details: null,
      } as NetInfoState);
    };

    const handleOffline = () => {
      callback({
        isConnected: false,
        isInternetReachable: false,
        type: 'none',
        details: null,
      } as NetInfoState);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }

  const unsubscribe = NetInfo.addEventListener((state) => {
    isConnected = state.isConnected ?? false;
    callback(state);
  });

  return unsubscribe;
}