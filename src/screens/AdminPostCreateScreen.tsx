// src/screens/AdminPostCreateScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';

interface AdminPostCreateScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function AdminPostCreateScreen({ onNavigate, onBack }: AdminPostCreateScreenProps) {
  const [formData, setFormData] = useState({ name: '', category: 'RESTAURANT', address: '' });

  const handleSubmit = () => {
    if (!formData.name) { Alert.alert('오류', '포스트명을 입력해주세요.'); return; }
    Alert.alert('성공', '포스트가 생성되었습니다.', [{ text: '확인', onPress: onBack }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.backText}>취소</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>포스트 생성</Text>
        <TouchableOpacity onPress={handleSubmit}><Text style={styles.saveText}>저장</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.label}>포스트명</Text>
        <TextInput style={styles.input} value={formData.name} onChangeText={(t) => setFormData({...formData, name: t})} placeholder="포스트명 입력" placeholderTextColor="#6B7280" />
        <Text style={styles.label}>주소</Text>
        <TextInput style={styles.input} value={formData.address} onChangeText={(t) => setFormData({...formData, address: t})} placeholder="주소 입력" placeholderTextColor="#6B7280" />
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
