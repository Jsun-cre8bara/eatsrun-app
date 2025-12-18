import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setNotificationListener } from './src/utils/notifications';
import { addNetworkListener, isOnline } from './src/utils/network';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import QRScanScreen from './src/screens/QRScanScreen';
import GameScreen from './src/screens/GameScreen';
import CouponResultScreen from './src/screens/CouponResultScreen';
import CouponListScreen from './src/screens/CouponListScreen';
import CouponDetailScreen from './src/screens/CouponDetailScreen';
import EventListScreen from './src/screens/EventListScreen';
import EventCreateScreen from './src/screens/EventCreateScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import StampsScreen from './src/screens/StampsScreen';
import MapScreen from './src/screens/MapScreen';
import FinishScreen from './src/screens/FinishScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import PostCreateScreen from './src/screens/PostCreateScreen';
import MerchantLoginScreen from './src/screens/MerchantLoginScreen';
import MerchantHomeScreen from './src/screens/MerchantHomeScreen';
import MerchantCouponScanScreen from './src/screens/MerchantCouponScanScreen';
import MerchantCouponHistoryScreen from './src/screens/MerchantCouponHistoryScreen';
import MerchantProfileScreen from './src/screens/MerchantProfileScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import AdminEventListScreen from './src/screens/AdminEventListScreen';
import AdminEventDetailScreen from './src/screens/AdminEventDetailScreen';
import AdminEventCreateScreen from './src/screens/AdminEventCreateScreen';
import AdminPostListScreen from './src/screens/AdminPostListScreen';
import AdminPostDetailScreen from './src/screens/AdminPostDetailScreen';
import AdminPostCreateScreen from './src/screens/AdminPostCreateScreen';
import AdminCouponTemplateListScreen from './src/screens/AdminCouponTemplateListScreen';
import AdminUserListScreen from './src/screens/AdminUserListScreen';
import AdminMerchantListScreen from './src/screens/AdminMerchantListScreen';
import NetworkErrorBanner from './src/components/NetworkErrorBanner';

type Screen =
  | 'Splash'
  | 'Login'
  | 'Verify'
  | 'Home'
  | 'QRScan'
  | 'Game'
  | 'CouponResult'
  | 'CouponList'
  | 'CouponDetail'
  | 'EventList'
  | 'EventCreate'
  | 'EventDetail'
  | 'Stamps'
  | 'Rewards'
  | 'Map'
  | 'PostCreate'
  | 'Finish'
  | 'MyPage'
  | 'MerchantLogin'
  | 'MerchantHome'
  | 'MerchantCouponScan'
  | 'MerchantCouponHistory'
  | 'MerchantProfile'
  | 'AdminLogin'
  | 'AdminHome'
  | 'AdminEventList'
  | 'AdminEventDetail'
  | 'AdminEventCreate'
  | 'AdminPostList'
  | 'AdminPostDetail'
  | 'AdminPostCreate'
  | 'AdminCouponTemplateList'
  | 'AdminUserList'
  | 'AdminMerchantList';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Splash');
  const [screenParams, setScreenParams] = useState<any>(null);
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);

  // 푸시 알림 리스너 설정 (웹 제외)
  useEffect(() => {
    if (Platform.OS === 'web') {
      return; // 웹에서는 푸시 알림 미지원
    }

    const removeListener = setNotificationListener(
      (notification) => {
        console.log('알림 수신:', notification);
      },
      (response) => {
        console.log('알림 탭:', response);
        const data = response.notification.request.content.data;
        
        // 알림 데이터에 따라 화면 이동
        if (data?.screen) {
          setCurrentScreen(data.screen as Screen);
          if (data.params) {
            setScreenParams(data.params);
          }
        }
      }
    );

    return removeListener;
  }, []);

  const navigate = (screen: Screen | string, params?: any) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen as Screen);
    setScreenParams(params || null);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prevScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(prevScreen);
      setScreenParams(null);
      return true; // 뒤로가기 성공
    }
    
    // 히스토리가 없을 때의 기본 동작
    // 로그인 화면이면 앱 종료
    if (currentScreen === 'Login' || currentScreen === 'MerchantLogin' || currentScreen === 'AdminLogin') {
      // 로그인 화면에서는 앱 종료 (Android)
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
        return true;
      }
      return false;
    }
    
    // 상점주 홈에서 다른 화면으로 갔다가 돌아올 때
    if (currentScreen === 'MerchantCouponHistory' || currentScreen === 'MerchantCouponScan' || currentScreen === 'MerchantProfile') {
      setCurrentScreen('MerchantHome');
      setScreenHistory([]);
      setScreenParams(null);
      return true;
    }
    
    // 관리자 홈에서 다른 화면으로 갔다가 돌아올 때
    if (currentScreen.startsWith('Admin') && currentScreen !== 'AdminHome' && currentScreen !== 'AdminLogin') {
      setCurrentScreen('AdminHome');
      setScreenHistory([]);
      setScreenParams(null);
      return true;
    }
    
    // 참여자 홈에서 다른 화면으로 갔다가 돌아올 때
    if (currentScreen !== 'Splash' && currentScreen !== 'Home' && currentScreen !== 'Login' && 
        !currentScreen.startsWith('Merchant') && !currentScreen.startsWith('Admin')) {
      setCurrentScreen('Home');
      setScreenHistory([]);
      setScreenParams(null);
      return true;
    }
    
    return false;
  };

  // Android 하드웨어 백 버튼 처리
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        return goBack();
      });

      return () => backHandler.remove();
    }
  }, [currentScreen, screenHistory]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return (
          <SplashScreen
            onFinish={(isLoggedIn) => {
              setCurrentScreen(isLoggedIn ? 'Home' : 'Login');
            }}
          />
        );

      case 'Login':
        return (
          <LoginScreen
            onLoginSuccess={() => {
              setCurrentScreen('Home');
              setScreenHistory([]);
            }}
            onMerchantLogin={() => {
              setCurrentScreen('MerchantLogin');
            }}
            onAdminLogin={() => {
              setCurrentScreen('AdminLogin');
            }}
            onBackToMenu={() => {
              // 이미 Login 화면이므로 아무 동작 안 함
            }}
          />
        );

      case 'Verify':
        return <VerifyScreen onNavigate={navigate} onBack={goBack} />;

      case 'Home':
        return <HomeScreen onNavigate={navigate} />;

      case 'QRScan':
        return <QRScanScreen onNavigate={navigate} onBack={goBack} />;

      case 'Game':
        return (
          <GameScreen
            route={screenParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'CouponResult':
        return <CouponResultScreen route={screenParams} onNavigate={navigate} onBack={goBack} />;

      case 'CouponList':
        return <CouponListScreen onNavigate={navigate} onBack={goBack} />;

      case 'CouponDetail':
        return <CouponDetailScreen route={screenParams} onBack={goBack} />;

      case 'EventList':
        return <EventListScreen onNavigate={navigate} onBack={goBack} />;

      case 'EventCreate':
        return <EventCreateScreen onNavigate={navigate} onBack={goBack} />;

      case 'EventDetail':
        return (
          <EventDetailScreen
            route={screenParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'Stamps':
        return <StampsScreen onNavigate={navigate} onBack={goBack} />;

      case 'Rewards':
        return <RewardsScreen onNavigate={navigate} onBack={goBack} />;

      case 'Map':
        return <MapScreen onNavigate={navigate} onBack={goBack} />;

      case 'PostCreate':
        return <PostCreateScreen onNavigate={navigate} onBack={goBack} />;

      case 'Finish':
        return <FinishScreen onNavigate={navigate} onBack={goBack} />;

      case 'MyPage':
        return <MyPageScreen onNavigate={navigate} onBack={goBack} />;

      case 'MerchantLogin':
        return (
          <MerchantLoginScreen
            onLoginSuccess={() => {
              setCurrentScreen('MerchantHome');
              setScreenHistory([]);
            }}
            onBackToMenu={() => {
              setCurrentScreen('Login');
              setScreenHistory([]);
            }}
          />
        );

      case 'MerchantHome':
        return <MerchantHomeScreen onNavigate={navigate} />;

      case 'MerchantCouponScan':
        return <MerchantCouponScanScreen onNavigate={navigate} onBack={goBack} />;

      case 'MerchantCouponHistory':
        return <MerchantCouponHistoryScreen onNavigate={navigate} onBack={goBack} />;

      case 'MerchantProfile':
        return <MerchantProfileScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminLogin':
        return (
          <AdminLoginScreen
            onLoginSuccess={() => {
              setCurrentScreen('AdminHome');
              setScreenHistory([]);
            }}
            onBackToMenu={() => {
              setCurrentScreen('Login');
              setScreenHistory([]);
            }}
          />
        );

      case 'AdminHome':
        return <AdminHomeScreen onNavigate={navigate} />;

      case 'AdminEventList':
        return <AdminEventListScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminEventDetail':
        return (
          <AdminEventDetailScreen
            route={screenParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'AdminEventCreate':
        return <AdminEventCreateScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminPostList':
        return <AdminPostListScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminPostDetail':
        return (
          <AdminPostDetailScreen
            route={screenParams}
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case 'AdminPostCreate':
        return <AdminPostCreateScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminCouponTemplateList':
        return <AdminCouponTemplateListScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminUserList':
        return <AdminUserListScreen onNavigate={navigate} onBack={goBack} />;

      case 'AdminMerchantList':
        return <AdminMerchantListScreen onNavigate={navigate} onBack={goBack} />;

      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  const [showNetworkError, setShowNetworkError] = React.useState(false);

  // 네트워크 상태 모니터링
  useEffect(() => {
    // 초기 상태 확인
    setShowNetworkError(!isOnline());

    // 네트워크 상태 변경 리스너 등록
    const removeListener = addNetworkListener((state) => {
      const online = state.isConnected && 
                     (state.isInternetReachable === null || state.isInternetReachable === true);
      setShowNetworkError(!online);
    });

    return removeListener;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NetworkErrorBanner
        visible={showNetworkError}
        onRetry={() => {
          // 네트워크 상태 다시 확인
          setShowNetworkError(!isOnline());
        }}
        onDismiss={() => setShowNetworkError(false)}
      />
      {renderScreen()}
    </SafeAreaProvider>
  );
}
