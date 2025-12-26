// src/screens/AdminEventCreateScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';

interface AdminEventCreateScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminEventCreateScreen({ onNavigate, onBack }: AdminEventCreateScreenProps) {
  const [formData, setFormData] = useState({ name: '', type: 'RUNNING', region: '', startDate: '' });

  const handleSubmit = () => {
    if (!formData.name) { Alert.alert('오류', '행사명을 입력해주세요.'); return; }
    Alert.alert('성공', '행사가 생성되었습니다.', [{ text: '확인', onPress: onBack }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>취소</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>행사 생성</Text>
        <TouchableOpacity onPress={handleSubmit}><Text style={styles.saveText}>저장</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.label}>행사명</Text>
        <TextInput style={styles.input} value={formData.name} onChangeText={(t) => setFormData({...formData, name: t})} placeholder="행사명 입력" placeholderTextColor="#6B7280" />
        <Text style={styles.label}>지역</Text>
        <TextInput style={styles.input} value={formData.region} onChangeText={(t) => setFormData({...formData, region: t})} placeholder="예: 서울" placeholderTextColor="#6B7280" />
        <Text style={styles.label}>시작일</Text>
        <TextInput style={styles.input} value={formData.startDate} onChangeText={(t) => setFormData({...formData, startDate: t})} placeholder="YYYY-MM-DD" placeholderTextColor="#6B7280" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#374151' },
  backText: { color: '#9CA3AF', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  saveText: { color: '#4F46E5', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  label: { color: '#9CA3AF', fontSize: 14, marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#1F2937', borderRadius: 8, padding: 14, color: '#FFFFFF', fontSize: 16 },
});
