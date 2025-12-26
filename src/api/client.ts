// src/api/client.ts
// API 클라이언트 - 서버와 통신하는 기본 설정

import { Platform } from 'react-native';

// ============================================
// 1. 서버 주소 설정
// ============================================
// 개발 중에는 DEV_MODE를 true로, 배포 시 false로 변경
const DEV_MODE = false;

// Railway에 배포된 실제 서버 주소
const PRODUCTION_URL = 'https://eatsrun-api-production.up.railway.app';

// 개발용 로컬 서버 주소 (필요시 사용)
const getDevUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000'; // Android 에뮬레이터
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:3000'; // iOS 시뮬레이터
  } else {
    return 'http://localhost:3000'; // 웹
  }
};

// 최종 API 기본 주소
export const API_BASE_URL = DEV_MODE ? getDevUrl() : PRODUCTION_URL;

// ============================================
// 2. 토큰 저장/불러오기 (로그인 상태 유지)
// ============================================
let accessToken: string | null = null;
let refreshToken: string | null = null;

// 토큰 저장
export const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
  
  // 웹에서는 localStorage에도 저장 (새로고침해도 유지)
  if (Platform.OS === 'web') {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  }
};

// 토큰 불러오기
export const getAccessToken = (): string | null => {
  if (accessToken) return accessToken;
  
  // 웹에서는 localStorage에서 복구
  if (Platform.OS === 'web') {
    accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }
  
  return null;
};

export const getRefreshToken = (): string | null => {
  if (refreshToken) return refreshToken;
  
  if (Platform.OS === 'web') {
    refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
  }
  
  return null;
};

// 토큰 삭제 (로그아웃 시)
export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  
  if (Platform.OS === 'web') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

// ============================================
// 3. API 요청 함수 (핵심!)
// ============================================
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  requireAuth?: boolean; // 로그인 필요한 API인지
}

export async function apiRequest<T>(
  endpoint: string,  // 예: '/v1/auth/social'
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, requireAuth = true } = options;
  
  // 요청 헤더 설정
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // 로그인이 필요한 API면 토큰 추가
  if (requireAuth) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  try {
    // 서버에 요청 보내기
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    
    // 응답 JSON으로 변환
    const data = await response.json();
    
    // 성공 여부 확인
    if (response.ok) {
      return { success: true, data };
    } else {
      // 토큰 만료 시 (401 에러)
      if (response.status === 401 && requireAuth) {
        // 토큰 갱신 시도
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          // 갱신 성공하면 원래 요청 다시 시도
          return apiRequest<T>(endpoint, options);
        }
      }
      
      return { 
        success: false, 
        error: data.message || '요청 실패',
        message: data.message 
      };
    }
  } catch (error) {
    // 네트워크 오류 등
    console.error('API 요청 오류:', error);
    return { 
      success: false, 
      error: '서버 연결에 실패했습니다. 네트워크를 확인해주세요.' 
    };
  }
}

// ============================================
// 4. 토큰 자동 갱신
// ============================================
async function tryRefreshToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;
  
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    
    if (response.ok) {
      const data = await response.json();
      setTokens(data.accessToken, data.refreshToken);
      return true;
    }
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
  }
  
  // 갱신 실패 시 토큰 삭제 (다시 로그인 필요)
  clearTokens();
  return false;
}

// ============================================
// 5. 편의 함수들 (GET, POST 등을 쉽게 사용)
// ============================================
export const api = {
  get: <T>(endpoint: string, requireAuth = true) => 
    apiRequest<T>(endpoint, { method: 'GET', requireAuth }),
    
  post: <T>(endpoint: string, body: any, requireAuth = true) => 
    apiRequest<T>(endpoint, { method: 'POST', body, requireAuth }),
    
  put: <T>(endpoint: string, body: any, requireAuth = true) => 
    apiRequest<T>(endpoint, { method: 'PUT', body, requireAuth }),
    
  patch: <T>(endpoint: string, body: any, requireAuth = true) => 
    apiRequest<T>(endpoint, { method: 'PATCH', body, requireAuth }),
    
  delete: <T>(endpoint: string, requireAuth = true) => 
    apiRequest<T>(endpoint, { method: 'DELETE', requireAuth }),
};