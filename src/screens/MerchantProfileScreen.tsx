// src/screens/MerchantProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface MerchantProfileScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function MerchantProfileScreen({ onNavigate, onBack }: MerchantProfileScreenProps) {
  const merchant = {
    name: '맛있는 식당',
    category: 'RESTAURANT',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    businessNumber: '123-45-67890',
    ownerName: '김사장',
    status: 'APPROVED',
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => onNavigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>가맹점 정보</Text>
        <View style={{ width: 60 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.merchantIcon}>🏪</Text>
          <Text style={styles.merchantName}>{merchant.name}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>✅ 승인됨</Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>기본 정보</Text>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>업종</Text><Text style={styles.infoValue}>음식점</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>주소</Text><Text style={styles.infoValue}>{merchant.address}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>전화번호</Text><Text style={styles.infoValue}>{merchant.phone}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>사업자번호</Text><Text style={styles.infoValue}>{merchant.businessNumber}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>대표자</Text><Text style={styles.infoValue}>{merchant.ownerName}</Text></View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backText: { color: '#10B981', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  content: { flex: 1 },
  profileCard: { backgroundColor: '#FFFFFF', padding: 24, alignItems: 'center', marginBottom: 8 },
  merchantIcon: { fontSize: 64, marginBottom: 12 },
  merchantName: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  statusBadge: { marginTop: 8, backgroundColor: '#D1FAE5', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#047857', fontSize: 14, fontWeight: '500' },
  infoSection: { backgroundColor: '#FFFFFF', padding: 20, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  infoLabel: { fontSize: 14, color: '#6B7280' },
  infoValue: { fontSize: 14, color: '#111827', fontWeight: '500' },
  logoutButton: { marginHorizontal: 20, marginTop: 16, marginBottom: 40, paddingVertical: 14, borderRadius: 8, borderWidth: 1, borderColor: '#EF4444', alignItems: 'center' },
  logoutText: { fontSize: 16, color: '#EF4444', fontWeight: '500' },
});
