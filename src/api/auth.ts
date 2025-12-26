// src/api/auth.ts
// 인증 관련 API (로그인, 로그아웃, 회원정보)

import { api, setTokens, clearTokens } from './client';

// ============================================
// 타입 정의 (서버에서 받는 데이터 형태)
// ============================================
export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  provider: 'kakao' | 'naver';
  role: 'user' | 'merchant' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// ============================================
// 인증 API 함수들
// ============================================

/**
 * 소셜 로그인 (카카오/네이버)
 * @param provider - 'kakao' 또는 'naver'
 * @param accessToken - 소셜 로그인에서 받은 토큰
 */
export async function socialLogin(
  provider: 'kakao' | 'naver',
  socialAccessToken: string
) {
  const response = await api.post<LoginResponse>(
    '/v1/auth/social',
    { provider, accessToken: socialAccessToken },
    false // 로그인 API는 인증 불필요
  );

  // 로그인 성공 시 토큰 저장
  if (response.success && response.data) {
    setTokens(response.data.accessToken, response.data.refreshToken);
  }

  return response;
}

/**
 * 러너 본인 인증 (이름, 전화번호)
 */
export async function verifyRunner(name: string, phone: string) {
  return api.post<{ verified: boolean; user: User }>(
    '/v1/auth/verify-runner',
    { name, phone }
  );
}

/**
 * 내 정보 조회
 */
export async function getMyProfile() {
  return api.get<User>('/v1/users/me');
}

/**
 * 내 정보 수정
 */
export async function updateMyProfile(data: { name?: string; phone?: string }) {
  return api.patch<User>('/v1/users/me', data);
}

/**
 * FCM 푸시 토큰 등록 (알림 받기 위해)
 */
export async function registerFcmToken(fcmToken: string) {
  return api.put<{ success: boolean }>(
    '/v1/users/me/fcm-token',
    { fcmToken }
  );
}

/**
 * 로그아웃
 */
export function logout() {
  clearTokens();
}

// ============================================
// 상점주/관리자 로그인 (이메일/비밀번호)
// ============================================

/**
 * 상점주 로그인
 */
export async function merchantLogin(email: string, password: string) {
  const response = await api.post<LoginResponse>(
    '/v1/merchants/auth/login',
    { email, password },
    false
  );

  if (response.success && response.data) {
    setTokens(response.data.accessToken, response.data.refreshToken);
  }

  return response;
}

/**
 * 관리자 로그인
 */
export async function adminLogin(email: string, password: string) {
  const response = await api.post<LoginResponse>(
    '/v1/admin/auth/login',
    { email, password },
    false
  );

  if (response.success && response.data) {
    setTokens(response.data.accessToken, response.data.refreshToken);
  }

  return response;
}