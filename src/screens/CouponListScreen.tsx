// src/screens/CouponListScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

interface CouponListScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const CATEGORY_INFO: Record<string, { emoji: string; color: string }> = {
  RESTAURANT: { emoji: '🍽️', color: '#EF4444' },
  CAFE: { emoji: '☕', color: '#F59E0B' },
  ACCOMMODATION: { emoji: '🏨', color: '#10B981' },
  PERFORMANCE: { emoji: '🎭', color: '#8B5CF6' },
  OTHER: { emoji: '🎁', color: '#3B82F6' },
};

// 임시 쿠폰 데이터
const mockCoupons = [
  {
    id: '1',
    category: 'RESTAURANT',
    categoryName: '맛집',
    discountAmount: 5000,
    type: 'DISCOUNT_5000',
    status: 'ACTIVE',
    validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    eventName: '2025 서울 마라톤',
  },
  {
    id: '2',
    category: 'CAFE',
    categoryName: '카페',
    discountAmount: 3000,
    type: 'DISCOUNT_3000',
    status: 'ACTIVE',
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    eventName: '2025 서울 마라톤',
  },
  {
    id: '3',
    category: 'PERFORMANCE',
    categoryName: '공연',
    discountAmount: 10000,
    type: 'DISCOUNT_10000',
    status: 'USED',
    validUntil: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    eventName: '부산 불꽃축제',
    usedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

export default function CouponListScreen({ onNavigate, onBack }: CouponListScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'used'>('all');
  const [coupons, setCoupons] = useState(mockCoupons);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: API에서 쿠폰 목록 가져오기
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    if (filter === 'all') return true;
    if (filter === 'active') return coupon.status === 'ACTIVE';
    if (filter === 'used') return coupon.status === 'USED' || coupon.status === 'EXPIRED';
    return true;
  });

  const getTimeRemaining = (validUntil: string) => {
    const now = new Date();
    const end = new Date(validUntil);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return '만료됨';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 남음`;
    return `${hours}시간 남음`;
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 쿠폰</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* 필터 탭 */}
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: '전체' },
          { key: 'active', label: '사용 가능' },
          { key: 'used', label: '사용 완료' },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.filterTab,
              filter === item.key && styles.filterTabActive,
            ]}
            onPress={() => setFilter(item.key as any)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item.key && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 쿠폰 목록 */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredCoupons.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🎟️</Text>
            <Text style={styles.emptyText}>쿠폰이 없습니다</Text>
            <Text style={styles.emptySubtext}>
              QR 코드를 스캔하여 쿠폰을 받아보세요!
            </Text>
          </View>
        ) : (
          filteredCoupons.map((coupon) => {
            const categoryInfo = CATEGORY_INFO[coupon.category];
            const isExpired = coupon.status !== 'ACTIVE';

            return (
              <TouchableOpacity
                key={coupon.id}
                style={[styles.couponCard, isExpired && styles.couponCardDisabled]}
                onPress={() => onNavigate('CouponDetail', { couponId: coupon.id })}
                disabled={isExpired}
              >
                <View
                  style={[
                    styles.couponLeft,
                    { backgroundColor: isExpired ? '#9CA3AF' : categoryInfo.color },
                  ]}
                >
                  <Text style={styles.couponEmoji}>{categoryInfo.emoji}</Text>
                </View>

                <View style={styles.couponRight}>
                  <View style={styles.couponHeader}>
                    <Text style={styles.couponCategory}>{coupon.categoryName}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            coupon.status === 'ACTIVE' ? '#D1FAE5' : '#F3F4F6',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color: coupon.status === 'ACTIVE' ? '#047857' : '#6B7280',
                          },
                        ]}
                      >
                        {coupon.status === 'ACTIVE' ? '사용 가능' : '사용 완료'}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.discountAmount, isExpired && styles.textDisabled]}>
                    {coupon.discountAmount.toLocaleString()}원 할인
                  </Text>

                  <Text style={styles.eventName}>{coupon.eventName}</Text>

                  <Text
                    style={[
                      styles.validUntil,
                      !isExpired && new Date(coupon.validUntil).getTime() - Date.now() < 24 * 60 * 60 * 1000 && styles.urgentText,
                    ]}
                  >
                    {isExpired
                      ? `사용일: ${new Date(coupon.usedAt || '').toLocaleDateString('ko-KR')}`
                      : `⏰ ${getTimeRemaining(coupon.validUntil)}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
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
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterTabActive: {
    backgroundColor: '#4F46E5',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  couponCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  couponCardDisabled: {
    opacity: 0.7,
  },
  couponLeft: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponEmoji: {
    fontSize: 36,
  },
  couponRight: {
    flex: 1,
    padding: 16,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  couponCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  discountAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  textDisabled: {
    color: '#9CA3AF',
  },
  eventName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  validUntil: {
    fontSize: 13,
    color: '#6B7280',
  },
  urgentText: {
    color: '#EF4444',
    fontWeight: '600',
  },
});
