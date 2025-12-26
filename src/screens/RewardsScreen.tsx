// src/screens/RewardsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

interface RewardsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const mockRewards = [
  { id: '1', name: '아메리카노 무료', tier: 'TIER_3', status: 'AVAILABLE', eventName: '서울 마라톤' },
  { id: '2', name: '기념품 세트', tier: 'TIER_5', status: 'REDEEMED', eventName: '서울 마라톤', redeemedAt: '2025-01-15' },
];

export default function RewardsScreen({ onNavigate, onBack }: RewardsScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 교환권</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}
      >
        {mockRewards.map((reward) => (
          <View key={reward.id} style={[styles.rewardCard, reward.status === 'REDEEMED' && styles.rewardCardUsed]}>
            <View style={styles.rewardIcon}>
              <Text style={styles.rewardEmoji}>🎁</Text>
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>{reward.name}</Text>
              <Text style={styles.rewardEvent}>{reward.eventName}</Text>
              <Text style={[styles.rewardStatus, reward.status === 'AVAILABLE' ? styles.statusAvailable : styles.statusUsed]}>
                {reward.status === 'AVAILABLE' ? '사용 가능' : `사용완료 (${reward.redeemedAt})`}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backText: { color: '#4F46E5', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  content: { flex: 1, padding: 16 },
  rewardCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12 },
  rewardCardUsed: { opacity: 0.6 },
  rewardIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center' },
  rewardEmoji: { fontSize: 28 },
  rewardInfo: { flex: 1, marginLeft: 12 },
  rewardName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  rewardEvent: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  rewardStatus: { fontSize: 13, marginTop: 4 },
  statusAvailable: { color: '#047857', fontWeight: '500' },
  statusUsed: { color: '#9CA3AF' },
});
