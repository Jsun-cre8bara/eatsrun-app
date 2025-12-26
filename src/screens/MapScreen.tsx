// src/screens/MapScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

interface MapScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const mockPosts = [
  { id: '1', name: '출발점', category: 'BOOTH', address: '서울시 중구 태평로', distance: '0.2km' },
  { id: '2', name: '맛있는 식당', category: 'RESTAURANT', address: '서울시 중구 명동길', distance: '0.5km' },
  { id: '3', name: '카페 거리', category: 'CAFE', address: '서울시 중구 을지로', distance: '0.8km' },
  { id: '4', name: '공연장', category: 'PERFORMANCE', address: '서울시 중구 세종대로', distance: '1.2km' },
  { id: '5', name: '전통시장', category: 'OTHER', address: '서울시 중구 남대문로', distance: '1.5km' },
];

const CATEGORY_INFO: Record<string, { emoji: string; color: string; name: string }> = {
  BOOTH: { emoji: '🎪', color: '#6366F1', name: '부스' },
  RESTAURANT: { emoji: '🍽️', color: '#EF4444', name: '맛집' },
  CAFE: { emoji: '☕', color: '#F59E0B', name: '카페' },
  PERFORMANCE: { emoji: '🎭', color: '#8B5CF6', name: '공연' },
  ACCOMMODATION: { emoji: '🏨', color: '#10B981', name: '숙소' },
  OTHER: { emoji: '📍', color: '#6B7280', name: '기타' },
};

export default function MapScreen({ onNavigate, onBack }: MapScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');

  const filteredPosts = selectedCategory
    ? mockPosts.filter((p) => p.category === selectedCategory)
    : mockPosts;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>주변 포스트</Text>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
        >
          <Text style={styles.viewModeText}>
            {viewMode === 'map' ? '📋 목록' : '🗺️ 지도'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryChipText,
              !selectedCategory && styles.categoryChipTextActive,
            ]}
          >
            전체
          </Text>
        </TouchableOpacity>
        {Object.entries(CATEGORY_INFO).map(([key, info]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryChip,
              selectedCategory === key && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(key)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === key && styles.categoryChipTextActive,
              ]}
            >
              {info.emoji} {info.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
            <Text style={styles.mapPlaceholderText}>
              {Platform.OS === 'web'
                ? '웹에서는 지도가 제한됩니다'
                : '지도 로딩 중...'}
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          {filteredPosts.map((post) => {
            const categoryInfo = CATEGORY_INFO[post.category] || CATEGORY_INFO.OTHER;
            return (
              <TouchableOpacity
                key={post.id}
                style={styles.postCard}
                onPress={() => onNavigate('QRScan', { postId: post.id })}
              >
                <View
                  style={[
                    styles.postIcon,
                    { backgroundColor: categoryInfo.color },
                  ]}
                >
                  <Text style={styles.postEmoji}>{categoryInfo.emoji}</Text>
                </View>
                <View style={styles.postInfo}>
                  <Text style={styles.postName}>{post.name}</Text>
                  <Text style={styles.postAddress}>{post.address}</Text>
                  <Text style={styles.postCategory}>{categoryInfo.name}</Text>
                </View>
                <View style={styles.postDistance}>
                  <Text style={styles.distanceText}>{post.distance}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => onNavigate('QRScan')}
      >
        <Text style={styles.scanButtonText}>📷 QR 스캔하기</Text>
      </TouchableOpacity>
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
  viewModeText: {
    color: '#4F46E5',
    fontSize: 14,
  },
  categoryFilter: {
    backgroundColor: '#FFFFFF',
    maxHeight: 60,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#4F46E5',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  mapPlaceholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#6B7280',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postEmoji: {
    fontSize: 24,
  },
  postInfo: {
    flex: 1,
    marginLeft: 12,
  },
  postName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  postAddress: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  postCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  postDistance: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  scanButton: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
