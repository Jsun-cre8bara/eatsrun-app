// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface SplashScreenProps {
  onFinish: (isLoggedIn: boolean) => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 2초 대기 (스플래시 표시)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 토큰 확인
      let token = null;
      if (Platform.OS === 'web') {
        token = localStorage.getItem('accessToken');
      } else {
        token = await SecureStore.getItemAsync('accessToken');
      }

      onFinish(!!token);
    } catch (error) {
      console.error('Auth check failed:', error);
      onFinish(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🏃</Text>
        <Text style={styles.title}>잇츠Run</Text>
        <Text style={styles.subtitle}>지역과 함께 달리는 즐거움</Text>
      </View>
      <ActivityIndicator size="large" color="#4F46E5" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  loader: {
    position: 'absolute',
    bottom: 100,
  },
});