// src/screens/MerchantHomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

interface MerchantHomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function MerchantHomeScreen({ onNavigate }: MerchantHomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    todayCoupons: 15,
    todayAmount: 75000,
    monthCoupons: 234,
    monthAmount: 1170000,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>안녕하세요!</Text>
          <Text style={styles.merchantName}>맛있는 식당</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('MerchantProfile')}>
          <Text style={styles.profileIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>📊 오늘 현황</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.todayCoupons}</Text>
              <Text style={styles.statLabel}>처리 쿠폰</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.todayAmount.toLocaleString()}원</Text>
              <Text style={styles.statLabel}>할인 금액</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>📅 이번 달 현황</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.monthCoupons}</Text>
              <Text style={styles.statLabel}>처리 쿠폰</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.monthAmount.toLocaleString()}원</Text>
              <Text style={styles.statLabel}>정산 예정</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('MerchantCouponScan')}>
            <Text style={styles.menuIcon}>📷</Text>
            <Text style={styles.menuLabel}>쿠폰 스캔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('MerchantCouponHistory')}>
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuLabel}>처리 내역</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.scanFab} onPress={() => onNavigate('MerchantCouponScan')}>
        <Text style={styles.scanFabIcon}>📷</Text>
        <Text style={styles.scanFabText}>쿠폰 스캔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, backgroundColor: '#10B981' },
  greeting: { fontSize: 14, color: '#D1FAE5' },
  merchantName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  profileIcon: { fontSize: 28 },
  content: { flex: 1, padding: 16 },
  statsContainer: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 8, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#10B981' },
  statLabel: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  menuContainer: { flexDirection: 'row', gap: 12, marginBottom: 100 },
  menuButton: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, alignItems: 'center' },
  menuIcon: { fontSize: 40, marginBottom: 8 },
  menuLabel: { fontSize: 16, fontWeight: '500', color: '#111827' },
  scanFab: { position: 'absolute', bottom: 32, alignSelf: 'center', flexDirection: 'row', backgroundColor: '#10B981', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 30, alignItems: 'center', gap: 8, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  scanFabIcon: { fontSize: 24 },
  scanFabText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});
