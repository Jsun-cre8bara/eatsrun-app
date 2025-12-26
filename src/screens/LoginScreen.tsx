// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onMerchantLogin: () => void;
  onAdminLogin: () => void;
  onBackToMenu: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
  onMerchantLogin,
  onAdminLogin,
}: LoginScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    setLoading(true);
    try {
      // TODO: 카카오 로그인 구현
      // 임시로 3초 후 로그인 성공 처리
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (Platform.OS === 'web') {
        localStorage.setItem('accessToken', 'temp_token');
      }
      
      onLoginSuccess();
    } catch (error) {
      Alert.alert('로그인 실패', '다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleNaverLogin = async () => {
    setLoading(true);
    try {
      // TODO: 네이버 로그인 구현
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (Platform.OS === 'web') {
        localStorage.setItem('accessToken', 'temp_token');
      }
      
      onLoginSuccess();
    } catch (error) {
      Alert.alert('로그인 실패', '다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏃</Text>
        <Text style={styles.title}>잇츠Run</Text>
        <Text style={styles.subtitle}>소셜 로그인으로 시작하세요</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.kakaoButton]}
          onPress={handleKakaoLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <>
              <Text style={styles.kakaoIcon}>💬</Text>
              <Text style={styles.kakaoText}>카카오로 시작하기</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.naverButton]}
          onPress={handleNaverLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.naverIcon}>N</Text>
              <Text style={styles.naverText}>네이버로 시작하기</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onMerchantLogin}>
          <Text style={styles.footerLink}>가맹점 로그인</Text>
        </TouchableOpacity>
        <Text style={styles.footerDivider}>|</Text>
        <TouchableOpacity onPress={onAdminLogin}>
          <Text style={styles.footerLink}>관리자 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoIcon: {
    fontSize: 20,
  },
  kakaoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  naverIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  naverText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
    gap: 12,
  },
  footerLink: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerDivider: {
    fontSize: 14,
    color: '#D1D5DB',
  },
});