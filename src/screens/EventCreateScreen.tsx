// src/screens/EventCreateScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

interface EventCreateScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function EventCreateScreen({ onNavigate, onBack }: EventCreateScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'RUNNING',
    region: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.region || !formData.startDate) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      // TODO: API 호출
      Alert.alert('성공', '행사가 생성되었습니다.', [
        { text: '확인', onPress: onBack },
      ]);
    } catch (error) {
      Alert.alert('오류', '행사 생성에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>행사 생성</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveText}>저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>행사명 *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="행사명을 입력하세요"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>행사 유형 *</Text>
          <View style={styles.typeButtons}>
            {[
              { key: 'RUNNING', label: '🏃 러닝' },
              { key: 'FESTIVAL', label: '🎉 축제' },
              { key: 'SINGLE', label: '🎪 단일행사' },
            ].map((type) => (
              <TouchableOpacity
                key={type.key}
                style={[
                  styles.typeButton,
                  formData.type === type.key && styles.typeButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, type: type.key })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    formData.type === type.key && styles.typeButtonTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>지역 *</Text>
          <TextInput
            style={styles.input}
            value={formData.region}
            onChangeText={(text) => setFormData({ ...formData, region: text })}
            placeholder="예: 서울, 부산, 제주"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>시작일 *</Text>
          <TextInput
            style={styles.input}
            value={formData.startDate}
            onChangeText={(text) => setFormData({ ...formData, startDate: text })}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>종료일</Text>
          <TextInput
            style={styles.input}
            value={formData.endDate}
            onChangeText={(text) => setFormData({ ...formData, endDate: text })}
            placeholder="YYYY-MM-DD (단일 행사면 비워두세요)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>설명</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="행사 설명을 입력하세요"
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#6B7280',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  saveText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
