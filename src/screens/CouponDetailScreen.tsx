// src/screens/CouponDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

interface CouponDetailScreenProps {
  route?: { couponId?: string };
  onBack: () => void;
}

const CATEGORY_INFO: Record<string, { emoji: string; color: string; name: string }> = {
  RESTAURANT: { emoji: '🍽️', color: '#EF4444', name: '맛집' },
  CAFE: { emoji: '☕', color: '#F59E0B', name: '카페' },
  ACCOMMODATION: { emoji: '🏨', color: '#10B981', name: '숙소' },
  PERFORMANCE: { emoji: '🎭', color: '#8B5CF6', name: '공연' },
  OTHER: { emoji: '🎁', color: '#3B82F6', name: '기타' },
};

export default function CouponDetailScreen({ route, onBack }: CouponDetailScreenProps) {
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState<any>(null);

  useEffect(() => {
    loadCoupon();
  }, []);

  const loadCoupon = async () => {
    try {
      // TODO: API에서 쿠폰 상세 정보 가져오기
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 임시 데이터
      setCoupon({
        id: route?.couponId || '1',
        category: 'RESTAURANT',
        discountAmount: 5000,
        type: 'DISCOUNT_5000',
        status: 'ACTIVE',
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        qrCode: 'QR_CODE_DATA_HERE',
        eventName: '2025 서울 마라톤',
        eventRegion: '서울',
        usableMerchants: [
          { id: '1', name: '맛있는 식당', address: '서울시 강남구' },
          { id: '2', name: '좋은 레스토랑', address: '서울시 서초구' },
        ],
      });
    } catch (error) {
      console.error('Load coupon failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  const categoryInfo = CATEGORY_INFO[coupon?.category || 'OTHER'];
  const isActive = coupon?.status === 'ACTIVE';

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>쿠폰 상세</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* 쿠폰 카드 */}
        <View style={[styles.couponCard, { borderColor: categoryInfo.color }]}>
          <View style={[styles.couponBadge, { backgroundColor: categoryInfo.color }]}>
            <Text style={styles.couponEmoji}>{categoryInfo.emoji}</Text>
            <Text style={styles.couponBadgeText}>{categoryInfo.name}</Text>
          </View>

          <View style={styles.couponBody}>
            <Text style={styles.discountAmount}>
              {coupon?.discountAmount?.toLocaleString()}원
            </Text>
            <Text style={styles.discountLabel}>할인 쿠폰</Text>
          </View>

          {/* QR 코드 영역 */}
          {isActive && (
            <View style={styles.qrContainer}>
              <View style={styles.qrPlaceholder}>
                <Text style={styles.qrText}>QR</Text>
              </View>
              <Text style={styles.qrHint}>가맹점에서 이 QR코드를 보여주세요</Text>
            </View>
          )}

          {/* 유효기간 */}
          <View style={styles.validityContainer}>
            <Text style={styles.validityLabel}>유효기간</Text>
            <Text style={styles.validityValue}>
              {new Date(coupon?.validFrom).toLocaleDateString('ko-KR')} ~{' '}
              {new Date(coupon?.validUntil).toLocaleDateString('ko-KR')}
            </Text>
          </View>

          {/* 상태 */}
          <View
            style={[
              styles.statusBanner,
              { backgroundColor: isActive ? '#D1FAE5' : '#FEE2E2' },
            ]}
          >
            <Text
              style={[
                styles.statusBannerText,
                { color: isActive ? '#047857' : '#DC2626' },
              ]}
            >
              {isActive ? '✅ 사용 가능' : '❌ 사용 완료'}
            </Text>
          </View>

          {/* 장식 */}
          <View style={[styles.couponHole, styles.holeLeft]} />
          <View style={[styles.couponHole, styles.holeRight]} />
        </View>

        {/* 사용 가능 가맹점 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏪 사용 가능 가맹점</Text>
          {coupon?.usableMerchants?.map((merchant: any) => (
            <View key={merchant.id} style={styles.merchantItem}>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              <Text style={styles.merchantAddress}>{merchant.address}</Text>
            </View>
          ))}
        </View>

        {/* 유의사항 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 유의사항</Text>
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              • 본 쿠폰은 '{coupon?.eventName}' 행사 참여자 전용입니다.{'\n'}
              • 다른 할인/프로모션과 중복 사용이 불가합니다.{'\n'}
              • 유효기간이 지난 쿠폰은 사용할 수 없습니다.{'\n'}
              • 쿠폰 양도 및 현금 교환이 불가합니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  content: {
    flex: 1,
    padding: 16,
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  couponBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  couponEmoji: {
    fontSize: 24,
  },
  couponBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  couponBody: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  discountAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
  },
  discountLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  qrPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  qrText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  qrHint: {
    fontSize: 14,
    color: '#6B7280',
  },
  validityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  validityLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  validityValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  statusBanner: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  statusBannerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  couponHole: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    top: '45%',
  },
  holeLeft: {
    left: -12,
  },
  holeRight: {
    right: -12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  merchantItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  merchantAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  noticeBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
  },
  noticeText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});
