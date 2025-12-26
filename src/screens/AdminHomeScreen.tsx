// src/screens/AdminHomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

interface AdminHomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export default function AdminHomeScreen({ onNavigate }: AdminHomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const stats = {
    totalUsers: 12345,
    totalEvents: 15,
    totalCoupons: 45678,
    todayVisits: 1234,
  };

  const menuItems = [
    { icon: '📅', label: '행사 관리', screen: 'AdminEventList', count: stats.totalEvents },
    { icon: '📝', label: '포스트 관리', screen: 'AdminPostList' },
    { icon: '🎟️', label: '쿠폰 템플릿', screen: 'AdminCouponTemplateList' },
    { icon: '👥', label: '사용자 관리', screen: 'AdminUserList', count: stats.totalUsers },
    { icon: '🏪', label: '가맹점 관리', screen: 'AdminMerchantList' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>관리자 대시보드</Text>
          <Text style={styles.title}>잇츠Run 운영위원회</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('Login')}>
          <Text style={styles.logoutIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}><Text style={styles.statValue}>{stats.totalUsers.toLocaleString()}</Text><Text style={styles.statLabel}>총 사용자</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>{stats.totalEvents}</Text><Text style={styles.statLabel}>진행 행사</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>{stats.totalCoupons.toLocaleString()}</Text><Text style={styles.statLabel}>발급 쿠폰</Text></View>
          <View style={styles.statCard}><Text style={styles.statValue}>{stats.todayVisits.toLocaleString()}</Text><Text style={styles.statLabel}>오늘 방문</Text></View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>관리 메뉴</Text>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuItem} onPress={() => onNavigate(item.screen)}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.count && <Text style={styles.menuCount}>{item.count.toLocaleString()}</Text>}
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  greeting: { fontSize: 14, color: '#9CA3AF' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  logoutIcon: { fontSize: 28 },
  content: { flex: 1 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { width: '47%', backgroundColor: '#1F2937', borderRadius: 12, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#4F46E5' },
  statLabel: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },
  menuSection: { backgroundColor: '#1F2937', marginHorizontal: 16, borderRadius: 12, padding: 8, marginBottom: 32 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#9CA3AF', padding: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 8 },
  menuIcon: { fontSize: 24, marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 16, color: '#FFFFFF' },
  menuCount: { fontSize: 14, color: '#4F46E5', marginRight: 8 },
  menuArrow: { fontSize: 16, color: '#6B7280' },
});
