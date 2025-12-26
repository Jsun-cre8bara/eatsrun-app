// src/screens/PostCreateScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

interface PostCreateScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function PostCreateScreen({ onNavigate, onBack }: PostCreateScreenProps) {
  const [formData, setFormData] = useState({ name: '', category: 'RESTAURANT', address: '', description: '' });

  const handleSubmit = () => {
    if (!formData.name || !formData.address) {
      Alert.alert('입력 오류', '필수 항목을 입력해주세요.');
      return;
    }
    Alert.alert('성공', '포스트가 생성되었습니다.', [{ text: '확인', onPress: onBack }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← 취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>포스트 추가</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveText}>저장</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>포스트명 *</Text>
          <TextInput style={styles.input} value={formData.name} onChangeText={(t) => setFormData({ ...formData, name: t })} placeholder="예: 맛있는 식당" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>주소 *</Text>
          <TextInput style={styles.input} value={formData.address} onChangeText={(t) => setFormData({ ...formData, address: t })} placeholder="상세 주소 입력" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>설명</Text>
          <TextInput style={[styles.input, styles.textArea]} value={formData.description} onChangeText={(t) => setFormData({ ...formData, description: t })} placeholder="포스트 설명" multiline numberOfLines={4} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backText: { color: '#6B7280', fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  saveText: { color: '#4F46E5', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
});
