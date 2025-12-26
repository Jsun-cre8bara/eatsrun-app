// src/screens/MerchantCouponHistoryScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

interface MerchantCouponHistoryScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const mockHistory = [
  { id: '1', userName: '홍길동', category: '맛집', amount: 5000, usedAt: '2025-01-15 14:30' },
  { id: '2', userName: '김철수', category: '맛집', amount: 5000, usedAt: '2025-01-15 13:15' },
  { id: '3', userName: '이영희', category: '맛집', amount: 10000, usedAt: '2025-01-15 11:45' },
];

export default function MerchantCouponHistoryScreen({ onNavigate, onBack }: MerchantCouponHistoryScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>처리 내역</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>오늘 처리</Text>
          <Text style={styles.summaryValue}>{mockHistory.length}건 / {mockHistory.reduce((sum, h) => sum + h.amount, 0).toLocaleString()}원</Text>
        </View>
        {mockHistory.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <Text style={styles.historyEmoji}>🎟️</Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyUser}>{item.userName}</Text>
              <Text style={styles.historyTime}>{item.usedAt}</Text>
            </View>
            <Text style={styles.historyAmount}>-{item.amount.toLocaleString()}원</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backText: { color: '#10B981', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  content: { flex: 1, padding: 16 },
  summary: { backgroundColor: '#10B981', borderRadius: 12, padding: 20, marginBottom: 16 },
  summaryTitle: { color: '#D1FAE5', fontSize: 14 },
  summaryValue: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 4 },
  historyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginBottom: 8 },
  historyIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  historyEmoji: { fontSize: 20 },
  historyInfo: { flex: 1, marginLeft: 12 },
  historyUser: { fontSize: 16, fontWeight: '500', color: '#111827' },
  historyTime: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  historyAmount: { fontSize: 16, fontWeight: '600', color: '#EF4444' },
});
