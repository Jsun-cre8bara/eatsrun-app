// src/screens/FinishScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface FinishScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function FinishScreen({ onNavigate, onBack }: FinishScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🏆</Text>
        <Text style={styles.title}>축하합니다!</Text>
        <Text style={styles.subtitle}>행사를 성공적으로 완료했습니다</Text>
        <View style={styles.statsBox}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>방문 포스트</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>획득 쿠폰</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>교환권</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onNavigate('Home')}>
          <Text style={styles.buttonText}>홈으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4F46E5' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emoji: { fontSize: 80, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#C7D2FE', marginBottom: 40 },
  statsBox: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: 24, gap: 32, marginBottom: 40 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  statLabel: { fontSize: 14, color: '#C7D2FE', marginTop: 4 },
  button: { backgroundColor: '#FFFFFF', paddingHorizontal: 48, paddingVertical: 16, borderRadius: 12 },
  buttonText: { color: '#4F46E5', fontSize: 18, fontWeight: '600' },
});
