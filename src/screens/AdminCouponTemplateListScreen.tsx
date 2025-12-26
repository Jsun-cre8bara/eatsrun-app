// src/screens/AdminCouponTemplateListScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface AdminCouponTemplateListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminCouponTemplateListScreen({ onNavigate, onBack }: AdminCouponTemplateListScreenProps) {
  const templates = [
    { id: '1', name: '맛집 5000원 할인', category: 'RESTAURANT', discountAmount: 5000, issuedCount: 234 },
    { id: '2', name: '카페 3000원 할인', category: 'CAFE', discountAmount: 3000, issuedCount: 156 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← 뒤로</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>쿠폰 템플릿</Text>
        <TouchableOpacity><Text style={styles.addText}>+ 추가</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {templates.map((t) => (
          <View key={t.id} style={styles.templateCard}>
            <Text style={styles.templateName}>{t.name}</Text>
            <Text style={styles.templateInfo}>{t.category} · {t.discountAmount.toLocaleString()}원</Text>
            <Text style={styles.templateIssued}>발급: {t.issuedCount}건</Text>
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
  addText: { color: '#4F46E5', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  templateCard: { backgroundColor: '#1F2937', borderRadius: 8, padding: 16, marginBottom: 8 },
  templateName: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  templateInfo: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },
  templateIssued: { fontSize: 12, color: '#4F46E5', marginTop: 4 },
});
