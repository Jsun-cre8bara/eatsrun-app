// src/screens/AdminPostListScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface AdminPostListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminPostListScreen({ onNavigate, onBack }: AdminPostListScreenProps) {
  const posts = [
    { id: '1', name: '출발점', category: 'BOOTH', eventName: '서울 마라톤' },
    { id: '2', name: '맛있는 식당', category: 'RESTAURANT', eventName: '서울 마라톤' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>포스트 관리</Text>
        <TouchableOpacity onPress={() => onNavigate('AdminPostCreate')}><Text style={styles.addText}>+ 추가</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postCard} onPress={() => onNavigate('AdminPostDetail', { postId: post.id })}>
            <Text style={styles.postName}>{post.name}</Text>
            <Text style={styles.postInfo}>{post.category} · {post.eventName}</Text>
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
  postCard: { backgroundColor: '#1F2937', borderRadius: 8, padding: 16, marginBottom: 8 },
  postName: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  postInfo: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },
});
