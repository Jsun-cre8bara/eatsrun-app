// src/api/events.ts
// 행사 관련 API

import { api } from './client';

// ============================================
// 타입 정의
// ============================================
export interface Event {
  id: string;
  name: string;
  description: string;
  type: 'running' | 'festival' | 'single';
  status: 'upcoming' | 'active' | 'ended';
  startDate: string;
  endDate: string;
  location: string;
  imageUrl?: string;
  postCount: number;
  participantCount: number;
}

export interface EventDetail extends Event {
  posts: Post[];
  myStatus?: {
    isJoined: boolean;
    visitedPosts: number;
    totalPosts: number;
    stamps: number;
    isFinished: boolean;
  };
}

export interface Post {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  imageUrl?: string;
  merchantId?: string;
  merchantName?: string;
  isVisited?: boolean;
}

export interface MyEventStatus {
  isJoined: boolean;
  visitedPosts: number;
  totalPosts: number;
  stamps: number;
  isFinished: boolean;
  rewards: Reward[];
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredStamps: number;
  isClaimed: boolean;
  isRedeemed: boolean;
}

// ============================================
// 행사 API 함수들
// ============================================

/**
 * 행사 목록 조회
 */
export async function getEvents(status?: 'upcoming' | 'active' | 'ended') {
  const query = status ? `?status=${status}` : '';
  return api.get<Event[]>(`/v1/events${query}`);
}

/**
 * 행사 상세 조회
 */
export async function getEventDetail(eventId: string) {
  return api.get<EventDetail>(`/v1/events/${eventId}`);
}

/**
 * 행사 참여하기
 */
export async function joinEvent(eventId: string) {
  return api.post<{ success: boolean; message: string }>(
    `/v1/events/${eventId}/join`,
    {}
  );
}

/**
 * 내 행사 참여 현황
 */
export async function getMyEventStatus(eventId: string) {
  return api.get<MyEventStatus>(`/v1/events/${eventId}/my-status`);
}

/**
 * 완주 인증
 */
export async function finishEvent(eventId: string, finishCode?: string) {
  return api.post<{ success: boolean; rewards: Reward[] }>(
    `/v1/events/${eventId}/finish`,
    { finishCode }
  );
}

// ============================================
// 포스트 API 함수들
// ============================================

/**
 * 포스트 상세 조회
 */
export async function getPostDetail(postId: string) {
  return api.get<Post>(`/v1/posts/${postId}`);
}

/**
 * 포스트 방문 (QR 스캔)
 */
export async function visitPost(postId: string, qrCode: string) {
  return api.post<{ 
    success: boolean; 
    game?: { id: string; type: string };
    stamp?: boolean;
  }>(
    `/v1/posts/${postId}/visit`,
    { qrCode }
  );
}

/**
 * 근처 포스트 조회
 */
export async function getNearbyPosts(latitude: number, longitude: number, radius?: number) {
  const query = `?lat=${latitude}&lng=${longitude}${radius ? `&radius=${radius}` : ''}`;
  return api.get<Post[]>(`/v1/posts/nearby${query}`);
}