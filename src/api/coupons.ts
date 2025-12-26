// src/api/coupons.ts
// 쿠폰 관련 API

import { api } from './client';

// ============================================
// 타입 정의
// ============================================
export interface Coupon {
  id: string;
  name: string;
  description: string;
  discountType: 'percent' | 'amount';
  discountValue: number;
  merchantId: string;
  merchantName: string;
  status: 'available' | 'used' | 'expired';
  expiresAt: string;
  createdAt: string;
  qrCode?: string;
}

export interface CouponCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Game {
  id: string;
  type: 'roulette' | 'ladder' | 'card' | 'slot' | 'gacha';
  categories: CouponCategory[];
}

export interface GameResult {
  success: boolean;
  coupon?: Coupon;
  message?: string;
}

// ============================================
// 쿠폰 API 함수들
// ============================================

/**
 * 내 쿠폰 목록 조회
 */
export async function getMyCoupons(status?: 'available' | 'used' | 'expired') {
  const query = status ? `?status=${status}` : '';
  return api.get<Coupon[]>(`/v1/coupons${query}`);
}

/**
 * 쿠폰 상세 조회
 */
export async function getCouponDetail(couponId: string) {
  return api.get<Coupon>(`/v1/coupons/${couponId}`);
}

/**
 * 쿠폰 QR 코드 조회 (사용 시 보여줄 QR)
 */
export async function getCouponQR(couponId: string) {
  return api.get<{ qrCode: string; expiresAt: string }>(
    `/v1/coupons/${couponId}/qr`
  );
}

// ============================================
// 게임 API 함수들
// ============================================

/**
 * 게임 플레이 (룰렛, 사다리 등 결과 받기)
 */
export async function playGame(gameId: string) {
  return api.post<GameResult>(`/v1/games/${gameId}/play`, {});
}

/**
 * 카테고리 선택 후 쿠폰 발급
 */
export async function selectCategory(gameId: string, categoryId: string) {
  return api.post<{ coupon: Coupon }>(
    `/v1/games/${gameId}/select-category`,
    { categoryId }
  );
}

// ============================================
// 스탬프/교환권 API 함수들
// ============================================

export interface StampStatus {
  eventId: string;
  totalStamps: number;
  collectedStamps: number;
  rewards: {
    id: string;
    name: string;
    requiredStamps: number;
    isClaimed: boolean;
    isRedeemed: boolean;
  }[];
}

/**
 * 스탬프 현황 조회
 */
export async function getStampStatus(eventId: string) {
  return api.get<StampStatus>(`/v1/stamps/${eventId}`);
}

/**
 * 교환권 목록 조회
 */
export async function getRewards(eventId: string) {
  return api.get<StampStatus['rewards']>(`/v1/stamps/${eventId}/rewards`);
}

/**
 * 교환권 획득 (스탬프로 교환)
 */
export async function claimReward(rewardId: string) {
  return api.post<{ success: boolean; message: string }>(
    `/v1/stamps/rewards/${rewardId}/claim`,
    {}
  );
}

/**
 * 교환권 사용
 */
export async function redeemReward(rewardId: string) {
  return api.post<{ success: boolean; message: string }>(
    `/v1/stamps/rewards/${rewardId}/redeem`,
    {}
  );
}

// ============================================
// 상점용 쿠폰 검증/사용 API
// ============================================

/**
 * [상점용] 쿠폰 QR 검증
 */
export async function validateCoupon(qrCode: string) {
  return api.post<{ valid: boolean; coupon?: Coupon; message?: string }>(
    '/v1/coupons/validate',
    { qrCode }
  );
}

/**
 * [상점용] 쿠폰 사용 처리
 */
export async function useCoupon(couponId: string) {
  return api.post<{ success: boolean; message: string }>(
    `/v1/coupons/${couponId}/use`,
    {}
  );
}