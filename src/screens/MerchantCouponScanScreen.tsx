// src/screens/MerchantCouponScanScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';

interface MerchantCouponScanScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function MerchantCouponScanScreen({ onNavigate, onBack }: MerchantCouponScanScreenProps) {
  const [scannedCoupon, setScannedCoupon] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const handleScan = async (data: string) => {
    // 쿠폰 정보 조회 시뮬레이션
    setScannedCoupon({
      id: data,
      category: '맛집',
      discountAmount: 5000,
      userName: '홍길동',
      validUntil: '2025-01-20',
      status: 'ACTIVE',
    });
  };

  const handleUseCoupon = async () => {
    setProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert('처리 완료', '쿠폰이 사용 처리되었습니다.', [{ text: '확인', onPress: () => setScannedCoupon(null) }]);
    } catch (error) {
      Alert.alert('오류', '쿠폰 처리에 실패했습니다.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>쿠폰 스캔</Text>
        <View style={{ width: 60 }} />
      </View>

      {!scannedCoupon ? (
        <View style={styles.scanArea}>
          <View style={styles.scanPlaceholder}>
            <Text style={styles.scanIcon}>📷</Text>
            <Text style={styles.scanText}>고객의 쿠폰 QR 코드를 스캔하세요</Text>
            {Platform.OS === 'web' && (
              <TouchableOpacity style={styles.testButton} onPress={() => handleScan('TEST_COUPON_001')}>
                <Text style={styles.testButtonText}>테스트: 쿠폰 스캔</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.couponInfo}>
          <View style={styles.couponCard}>
            <Text style={styles.couponEmoji}>🎟️</Text>
            <Text style={styles.couponCategory}>{scannedCoupon.category} 할인 쿠폰</Text>
            <Text style={styles.couponAmount}>{scannedCoupon.discountAmount.toLocaleString()}원</Text>
            <View style={styles.couponDetails}>
              <Text style={styles.detailRow}>고객: {scannedCoupon.userName}</Text>
              <Text style={styles.detailRow}>유효기간: {scannedCoupon.validUntil}</Text>
            </View>
            <View style={[styles.statusBadge, scannedCoupon.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{scannedCoupon.status === 'ACTIVE' ? '✅ 사용 가능' : '❌ 사용 불가'}</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setScannedCoupon(null)}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.confirmButton, scannedCoupon.status !== 'ACTIVE' && styles.buttonDisabled]} onPress={handleUseCoupon} disabled={scannedCoupon.status !== 'ACTIVE' || processing}>
              <Text style={styles.confirmButtonText}>{processing ? '처리중...' : '사용 처리'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16 },
  backText: { color: '#FFFFFF', fontSize: 16 },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  scanArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  scanPlaceholder: { alignItems: 'center' },
  scanIcon: { fontSize: 80, marginBottom: 24 },
  scanText: { fontSize: 18, color: '#9CA3AF', textAlign: 'center' },
  testButton: { marginTop: 32, backgroundColor: '#10B981', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8 },
  testButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  couponInfo: { flex: 1, padding: 24 },
  couponCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center' },
  couponEmoji: { fontSize: 48, marginBottom: 12 },
  couponCategory: { fontSize: 16, color: '#6B7280' },
  couponAmount: { fontSize: 36, fontWeight: 'bold', color: '#10B981', marginVertical: 8 },
  couponDetails: { marginTop: 16, alignItems: 'center' },
  detailRow: { fontSize: 14, color: '#6B7280', marginVertical: 2 },
  statusBadge: { marginTop: 16, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  statusActive: { backgroundColor: '#D1FAE5' },
  statusInactive: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 14, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 24 },
  cancelButton: { flex: 1, paddingVertical: 16, borderRadius: 8, borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center' },
  cancelButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  confirmButton: { flex: 2, backgroundColor: '#10B981', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  buttonDisabled: { backgroundColor: '#6B7280' },
});
