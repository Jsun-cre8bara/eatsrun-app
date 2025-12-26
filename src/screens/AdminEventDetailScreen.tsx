// src/screens/AdminEventDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface AdminEventDetailScreenProps {
  route?: { eventId?: string };
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminEventDetailScreen({ route, onNavigate, onBack }: AdminEventDetailScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>행사 상세</Text>
        <TouchableOpacity><Text style={styles.editText}>수정</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.eventName}>2025 서울 마라톤</Text>
          <Text style={styles.eventInfo}>🏃 러닝 · 📍 서울</Text>
          <Text style={styles.eventDate}>📅 2025-01-15</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statValue}>1,234</Text><Text style={styles.statLabel}>참여자</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>15</Text><Text style={styles.statLabel}>포스트</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>5,678</Text><Text style={styles.statLabel}>쿠폰</Text></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#374151' },
  backText: { color: '#9CA3AF', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  editText: { color: '#4F46E5', fontSize: 16 },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#1F2937', borderRadius: 12, padding: 20, marginBottom: 16 },
  eventName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  eventInfo: { fontSize: 14, color: '#9CA3AF', marginBottom: 4 },
  eventDate: { fontSize: 14, color: '#9CA3AF' },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#1F2937', borderRadius: 8, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#4F46E5' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
});
