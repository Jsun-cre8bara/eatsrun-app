// src/screens/CouponResultScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface CouponResultScreenProps {
  route?: {
    category?: string;
    categoryName?: string;
    eventId?: string;
  };
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

export default function CouponResultScreen({
  route,
  onNavigate,
  onBack,
}: CouponResultScreenProps) {
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState<any>(null);

  const categoryInfo = CATEGORY_INFO[route?.category || 'OTHER'];

  useEffect(() => {
    issueCoupon();
  }, []);

  const issueCoupon = async () => {
    try {
      // TODO: API 호출로 실제 쿠폰 발급
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 임시 쿠폰 데이터
      setCoupon({
        id: 'COUPON_' + Date.now(),
        category: route?.category,
        categoryName: route?.categoryName,
        discountAmount: 5000,
        type: 'DISCOUNT_5000',
        validUntil: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        qrCode: 'QR_' + Date.now(),
      });
    } catch (error) {
      console.error('Coupon issue failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>쿠폰 발급 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 축하 메시지 */}
        <View style={styles.celebrationContainer}>
          <Text style={styles.celebrationEmoji}>🎊</Text>
          <Text style={styles.celebrationTitle}>쿠폰 발급 완료!</Text>
        </View>

        {/* 쿠폰 카드 */}
        <View style={[styles.couponCard, { borderColor: categoryInfo.color }]}>
          <View style={styles.couponHeader}>
            <Text style={styles.couponEmoji}>{categoryInfo.emoji}</Text>
            <Text style={styles.couponCategory}>{route?.categoryName} 할인</Text>
          </View>

          <View style={styles.couponBody}>
            <Text style={styles.discountAmount}>
              {coupon?.discountAmount?.toLocaleString()}원
            </Text>
            <Text style={styles.discountLabel}>할인</Text>
          </View>

          <View style={styles.couponFooter}>
            <Text style={styles.validUntil}>
              유효기간: {new Date(coupon?.validUntil).toLocaleDateString('ko-KR')}까지
            </Text>
          </View>

          {/* 쿠폰 장식 */}
          <View style={[styles.couponHole, styles.holeLeft]} />
          <View style={[styles.couponHole, styles.holeRight]} />
        </View>

        {/* 안내 메시지 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 사용 방법</Text>
          <Text style={styles.infoText}>
            1. 참여 가맹점을 방문하세요{'\n'}
            2. 결제 전 쿠폰 QR 코드를 보여주세요{'\n'}
            3. 할인된 금액으로 결제하세요
          </Text>
        </View>
      </View>

      {/* 버튼들 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => onNavigate('CouponDetail', { couponId: coupon?.id })}
        >
          <Text style={styles.primaryButtonText}>쿠폰 확인하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => onNavigate('Home')}
        >
          <Text style={styles.secondaryButtonText}>홈으로 가기</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  celebrationEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  celebrationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  couponCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    padding: 24,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  couponEmoji: {
    fontSize: 28,
  },
  couponCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  couponBody: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  discountAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  discountLabel: {
    fontSize: 18,
    color: '#6B7280',
  },
  couponFooter: {
    marginTop: 16,
    alignItems: 'center',
  },
  validUntil: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  couponHole: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    top: '50%',
    marginTop: -12,
  },
  holeLeft: {
    left: -12,
  },
  holeRight: {
    right: -12,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});
