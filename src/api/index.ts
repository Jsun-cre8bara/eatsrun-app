// src/api/index.ts
// API 모듈 전체 내보내기 - 다른 파일에서 쉽게 import 하기 위함

// 클라이언트 기본 설정
export { 
    API_BASE_URL,
    api,
    apiRequest,
    setTokens,
    getAccessToken,
    getRefreshToken,
    clearTokens,
  } from './client';
  
  // 인증 API
  export {
    socialLogin,
    verifyRunner,
    getMyProfile,
    updateMyProfile,
    registerFcmToken,
    logout,
    merchantLogin,
    adminLogin,
  } from './auth';
  export type { User, LoginResponse } from './auth';
  
  // 행사 API
  export {
    getEvents,
    getEventDetail,
    joinEvent,
    getMyEventStatus,
    finishEvent,
    getPostDetail,
    visitPost,
    getNearbyPosts,
  } from './events';
  export type { Event, EventDetail, Post, MyEventStatus, Reward } from './events';
  
  // 쿠폰 API
  export {
    getMyCoupons,
    getCouponDetail,
    getCouponQR,
    playGame,
    selectCategory,
    getStampStatus,
    getRewards,
    claimReward,
    redeemReward,
    validateCoupon,
    useCoupon,
  } from './coupons';
  export type { Coupon, CouponCategory, Game, GameResult, StampStatus } from './coupons';