// src/screens/VerifyScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface VerifyScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function VerifyScreen({ onNavigate, onBack }: VerifyScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>인증</Text>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>본인 인증</Text>
        <Text style={styles.subtitle}>서비스 이용을 위해 본인 인증이 필요합니다</Text>
        <TouchableOpacity style={styles.button} onPress={() => onNavigate('Home')}>
          <Text style={styles.buttonText}>인증하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backText: { color: '#4F46E5', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  button: { backgroundColor: '#4F46E5', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
