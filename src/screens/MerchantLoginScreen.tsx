// src/screens/MerchantLoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

interface MerchantLoginScreenProps {
  onLoginSuccess: () => void;
  onBackToMenu: () => void;
}

export default function MerchantLoginScreen({ onLoginSuccess, onBackToMenu }: MerchantLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onLoginSuccess();
    } catch (error) {
      Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
        <Text style={styles.backText}>← 뒤로</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.logo}>🏪</Text>
        <Text style={styles.title}>가맹점 로그인</Text>
        <Text style={styles.subtitle}>등록된 가맹점 계정으로 로그인하세요</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.loginButtonText}>로그인</Text>}
          </TouchableOpacity>
        </View>
        <Text style={styles.helpText}>가맹점 등록 문의: support@eatsrun.kr</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  backButton: { position: 'absolute', top: 60, left: 16, zIndex: 10, padding: 8 },
  backText: { color: '#4F46E5', fontSize: 16 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logo: { fontSize: 64, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  form: { gap: 12 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 14, fontSize: 16 },
  loginButton: { backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  helpText: { textAlign: 'center', color: '#9CA3AF', fontSize: 14, marginTop: 24 },
});
