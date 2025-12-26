// src/screens/AdminUserListScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface AdminUserListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminUserListScreen({ onNavigate, onBack }: AdminUserListScreenProps) {
  const users = [
    { id: '1', name: '홍길동', phone: '010-1234-5678', provider: 'KAKAO', eventsJoined: 3 },
    { id: '2', name: '김철수', phone: '010-9876-5432', provider: 'NAVER', eventsJoined: 5 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>사용자 관리</Text>
        <View style={{width: 60}} />
      </View>
      <ScrollView style={styles.content}>
        {users.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{user.name.charAt(0)}</Text></View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userPhone}>{user.phone}</Text>
              <Text style={styles.userMeta}>{user.provider} · {user.eventsJoined}개 행사 참여</Text>
            </View>
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
  userCard: { flexDirection: 'row', backgroundColor: '#1F2937', borderRadius: 8, padding: 16, marginBottom: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#4F46E5', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  userInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  userPhone: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  userMeta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
