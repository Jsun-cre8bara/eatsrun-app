// src/screens/AdminMerchantListScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface AdminMerchantListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminMerchantListScreen({ onNavigate, onBack }: AdminMerchantListScreenProps) {
  const merchants = [
    { id: '1', name: '맛있는 식당', category: 'RESTAURANT', status: 'APPROVED', address: '서울시 강남구' },
    { id: '2', name: '좋은 카페', category: 'CAFE', status: 'PENDING', address: '서울시 서초구' },
  ];

  const handleApprove = (id: string) => {
    Alert.alert('승인', '가맹점을 승인하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '승인', onPress: () => {} },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>가맹점 관리</Text>
        <View style={{width: 60}} />
      </View>
      <ScrollView style={styles.content}>
        {merchants.map((m) => (
          <View key={m.id} style={styles.merchantCard}>
            <View style={styles.merchantIcon}><Text style={styles.merchantEmoji}>🏪</Text></View>
            <View style={styles.merchantInfo}>
              <Text style={styles.merchantName}>{m.name}</Text>
              <Text style={styles.merchantAddress}>{m.address}</Text>
              <View style={[styles.statusBadge, m.status === 'APPROVED' ? styles.statusApproved : styles.statusPending]}>
                <Text style={styles.statusText}>{m.status === 'APPROVED' ? '승인됨' : '대기중'}</Text>
              </View>
            </View>
            {m.status === 'PENDING' && (
              <TouchableOpacity style={styles.approveButton} onPress={() => handleApprove(m.id)}>
                <Text style={styles.approveText}>승인</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#374151' },
  backText: { color: '#9CA3AF', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  content: { flex: 1, padding: 16 },
  merchantCard: { flexDirection: 'row', backgroundColor: '#1F2937', borderRadius: 8, padding: 16, marginBottom: 8, alignItems: 'center' },
  merchantIcon: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  merchantEmoji: { fontSize: 24 },
  merchantInfo: { flex: 1, marginLeft: 12 },
  merchantName: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  merchantAddress: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginTop: 4 },
  statusApproved: { backgroundColor: '#065F46' },
  statusPending: { backgroundColor: '#92400E' },
  statusText: { color: '#FFFFFF', fontSize: 11, fontWeight: '500' },
  approveButton: { backgroundColor: '#4F46E5', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  approveText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
});
