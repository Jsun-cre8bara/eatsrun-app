// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

// 임시 데이터 (나중에 API 연동)
const mockEvents = [
  {
    id: '1',
    name: '2025 서울 마라톤',
    type: 'RUNNING',
    region: '서울',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    startDate: '2025-03-15',
    endDate: '2025-03-15',
    status: 'UPCOMING',
  },
  {
    id: '2',
    name: '부산 불꽃축제',
    type: 'FESTIVAL',
    region: '부산',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    startDate: '2025-04-01',
    endDate: '2025-04-03',
    status: 'UPCOMING',
  },
];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState(mockEvents);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: API에서 이벤트 목록 가져오기
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getEventTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      RUNNING: '🏃 러닝',
      FESTIVAL: '🎉 축제',
      SINGLE: '🎪 단일행사',
    };
    return types[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; label: string }> = {
      UPCOMING: { bg: '#DBEAFE', text: '#1D4ED8', label: '예정' },
      ACTIVE: { bg: '#D1FAE5', text: '#047857', label: '진행중' },
      ENDED: { bg: '#F3F4F6', text: '#6B7280', label: '종료' },
    };
    return styles[status] || styles.ENDED;
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>안녕하세요! 👋</Text>
          <Text style={styles.headerTitle}>잇츠Run</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => onNavigate('MyPage')}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 퀵 액션 버튼들 */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('QRScan')}
          >
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionLabel}>QR 스캔</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('CouponList')}
          >
            <Text style={styles.actionIcon}>🎟️</Text>
            <Text style={styles.actionLabel}>내 쿠폰</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('Stamps')}
          >
            <Text style={styles.actionIcon}>💮</Text>
            <Text style={styles.actionLabel}>스탬프</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate('Map')}
          >
            <Text style={styles.actionIcon}>🗺️</Text>
            <Text style={styles.actionLabel}>지도</Text>
          </TouchableOpacity>
        </View>

        {/* 참여 가능한 행사 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>참여 가능한 행사</Text>
            <TouchableOpacity onPress={() => onNavigate('EventList')}>
              <Text style={styles.seeAll}>전체보기 →</Text>
            </TouchableOpacity>
          </View>

          {events.map(event => {
            const badge = getStatusBadge(event.status);
            return (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => onNavigate('EventDetail', { eventId: event.id })}
              >
                <Image
                  source={{ uri: event.imageUrl }}
                  style={styles.eventImage}
                />
                <View style={styles.eventContent}>
                  <View style={styles.eventMeta}>
                    <Text style={styles.eventType}>
                      {getEventTypeLabel(event.type)}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: badge.bg },
                      ]}
                    >
                      <Text style={[styles.statusText, { color: badge.text }]}>
                        {badge.label}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventInfo}>
                    📍 {event.region} · 📅 {event.startDate}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 하단 탭 바 */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabLabelActive}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onNavigate('EventList')}
        >
          <Text style={styles.tabIcon}>📅</Text>
          <Text style={styles.tabLabel}>행사</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onNavigate('QRScan')}
        >
          <View style={styles.qrButton}>
            <Text style={styles.qrIcon}>📷</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onNavigate('CouponList')}
        >
          <Text style={styles.tabIcon}>🎟️</Text>
          <Text style={styles.tabLabel}>쿠폰</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => onNavigate('MyPage')}
        >
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>MY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  seeAll: {
    fontSize: 14,
    color: '#4F46E5',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  eventImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E5E7EB',
  },
  eventContent: {
    padding: 16,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventType: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  tabIconActive: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  tabLabelActive: {
    fontSize: 10,
    color: '#4F46E5',
    fontWeight: '600',
  },
  qrButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  qrIcon: {
    fontSize: 28,
  },
});