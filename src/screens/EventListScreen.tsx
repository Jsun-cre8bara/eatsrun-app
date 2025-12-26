// src/screens/EventListScreen.tsx
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

interface EventListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

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
    description: '서울 도심을 달리는 봄맞이 마라톤 대회',
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
    description: '광안리 해변에서 펼쳐지는 화려한 불꽃 축제',
  },
  {
    id: '3',
    name: '제주 감귤 마라톤',
    type: 'RUNNING',
    region: '제주',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    status: 'ACTIVE',
    description: '감귤밭 사이를 달리는 겨울 마라톤',
  },
];

export default function EventListScreen({ onNavigate, onBack }: EventListScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'running' | 'festival'>('all');
  const [events, setEvents] = useState(mockEvents);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true;
    if (filter === 'running') return event.type === 'RUNNING';
    if (filter === 'festival') return event.type === 'FESTIVAL';
    return true;
  });

  const getEventTypeLabel = (type: string) => {
    const types: Record<string, { label: string; emoji: string }> = {
      RUNNING: { label: '러닝', emoji: '🏃' },
      FESTIVAL: { label: '축제', emoji: '🎉' },
      SINGLE: { label: '단일행사', emoji: '🎪' },
    };
    return types[type] || { label: type, emoji: '📅' };
  };

  const getStatusInfo = (status: string) => {
    const statuses: Record<string, { label: string; bg: string; text: string }> = {
      UPCOMING: { label: '예정', bg: '#DBEAFE', text: '#1D4ED8' },
      ACTIVE: { label: '진행중', bg: '#D1FAE5', text: '#047857' },
      ENDED: { label: '종료', bg: '#F3F4F6', text: '#6B7280' },
    };
    return statuses[status] || statuses.ENDED;
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>행사 목록</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* 필터 탭 */}
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: '전체' },
          { key: 'running', label: '🏃 러닝' },
          { key: 'festival', label: '🎉 축제' },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.filterTab,
              filter === item.key && styles.filterTabActive,
            ]}
            onPress={() => setFilter(item.key as any)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item.key && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 행사 목록 */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyText}>행사가 없습니다</Text>
          </View>
        ) : (
          filteredEvents.map((event) => {
            const typeInfo = getEventTypeLabel(event.type);
            const statusInfo = getStatusInfo(event.status);

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
                      {typeInfo.emoji} {typeInfo.label}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                      <Text style={[styles.statusText, { color: statusInfo.text }]}>
                        {statusInfo.label}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventDescription} numberOfLines={2}>
                    {event.description}
                  </Text>
                  <Text style={styles.eventInfo}>
                    📍 {event.region} · 📅 {event.startDate}
                    {event.startDate !== event.endDate && ` ~ ${event.endDate}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#4F46E5',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterTabActive: {
    backgroundColor: '#4F46E5',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  eventInfo: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});
