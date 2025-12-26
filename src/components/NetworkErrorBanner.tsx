// src/components/NetworkErrorBanner.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NetworkErrorBannerProps {
  visible: boolean;
  onRetry: () => void;
  onDismiss: () => void;
}

export default function NetworkErrorBanner({
  visible,
  onRetry,
  onDismiss,
}: NetworkErrorBannerProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>인터넷 연결이 불안정합니다</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>다시 시도</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EF4444',
    zIndex: 1000,
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  retryText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  dismissButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  dismissText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});