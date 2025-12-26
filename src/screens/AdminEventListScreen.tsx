// src/screens/AdminEventListScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

interface AdminEventListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const mockEvents = [
  { id: '1', name: '2025 서울 마라톤', type: 'RUNNING', status: 'ACTIVE', participants: 1234, startDate: '2025-01-15' },
  { id: '2', name: '부산 불꽃축제', type: 'FESTIVAL', status: 'UPCOMING', participants: 0, startDate: '2025-04-01' },
];

export default function AdminEventListScreen({ onNavigate, onBack }: AdminEventListScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>행사 관리</Text>
        <TouchableOpacity onPress={() => onNavigate('AdminEventCreate')}><Text style={styles.addText}>+ 추가</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}>
        {mockEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard} onPress={() => onNavigate('AdminEventDetail', { eventId: event.id })}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventType}>{event.type === 'RUNNING' ? '🏃' : '🎉'} {event.type}</Text>
              <View style={[styles.statusBadge, event.status === 'ACTIVE' ? styles.statusActive : styles.statusUpcoming]}>
                <Text style={styles.statusText}>{event.status}</Text>
              </View>
            </View>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventInfo}>📅 {event.startDate} · 👥 {event.participants}명</Text>
          </TouchableOpacity>
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
  addText: { color: '#4F46E5', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  eventCard: { backgroundColor: '#1F2937', borderRadius: 12, padding: 16, marginBottom: 12 },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  eventType: { fontSize: 12, color: '#9CA3AF' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusActive: { backgroundColor: '#065F46' },
  statusUpcoming: { backgroundColor: '#1E40AF' },
  statusText: { color: '#FFFFFF', fontSize: 12, fontWeight: '500' },
  eventName: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  eventInfo: { fontSize: 13, color: '#9CA3AF' },
});
