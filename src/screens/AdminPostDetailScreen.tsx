// src/screens/AdminPostDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface AdminPostDetailScreenProps {
  route?: { postId?: string };
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminPostDetailScreen({ route, onNavigate, onBack }: AdminPostDetailScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>포스트 상세</Text>
        <TouchableOpacity><Text style={styles.editText}>수정</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.postName}>맛있는 식당</Text>
          <Text style={styles.postInfo}>🍽️ RESTAURANT</Text>
          <Text style={styles.postAddress}>📍 서울시 중구 명동길 123</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#374151' },
  backText: { color: '#9CA3AF', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  editText: { color: '#4F46E5', fontSize: 16 },
  content: { flex: 1, padding: 16 },
  card: { backgroundColor: '#1F2937', borderRadius: 12, padding: 20 },
  postName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  postInfo: { fontSize: 14, color: '#9CA3AF', marginBottom: 4 },
  postAddress: { fontSize: 14, color: '#9CA3AF' },
});
