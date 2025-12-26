// src/screens/AdminLoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
  onBackToMenu: () => void;
}

export default function AdminLoginScreen({ onLoginSuccess, onBackToMenu }: AdminLoginScreenProps) {
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
      Alert.alert('로그인 실패', '권한이 없거나 계정 정보가 올바르지 않습니다.');
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
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.title}>관리자 로그인</Text>
        <Text style={styles.subtitle}>잇츠Run 운영위원회 전용</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="관리자 이메일" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.loginButtonText}>로그인</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F2937' },
  backButton: { position: 'absolute', top: 60, left: 16, zIndex: 10, padding: 8 },
  backText: { color: '#9CA3AF', fontSize: 16 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logo: { fontSize: 64, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#9CA3AF', textAlign: 'center', marginBottom: 32 },
  form: { gap: 12 },
  input: { backgroundColor: '#374151', borderRadius: 8, padding: 14, fontSize: 16, color: '#FFFFFF' },
  loginButton: { backgroundColor: '#4F46E5', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
