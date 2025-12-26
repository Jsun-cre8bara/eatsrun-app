// src/screens/QRScanScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

interface QRScanScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function QRScanScreen({ onNavigate, onBack }: QRScanScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if (Platform.OS === 'web') {
      setHasPermission(true);
      return;
    }
    
    try {
      const { Camera } = await import('expo-camera');
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error('Camera permission error:', error);
      setHasPermission(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    
    setScanned(true);
    console.log('QR Scanned:', data);
    
    // QR 데이터 파싱 및 처리
    // 예: POST_ID를 추출하여 게임 화면으로 이동
    Alert.alert(
      'QR 스캔 완료!',
      '포스트 방문이 확인되었습니다.',
      [
        {
          text: '게임 시작',
          onPress: () => onNavigate('Game', { qrData: data }),
        },
      ]
    );
  };

  // 웹에서는 카메라 대신 임시 UI 표시
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← 뒤로</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>QR 스캔</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.webPlaceholder}>
          <Text style={styles.placeholderIcon}>📷</Text>
          <Text style={styles.placeholderTitle}>QR 코드 스캔</Text>
          <Text style={styles.placeholderText}>
            웹에서는 카메라 기능이 제한됩니다.{'\n'}
            모바일 앱에서 QR 코드를 스캔해주세요.
          </Text>
          
          {/* 테스트용 버튼 */}
          <TouchableOpacity
            style={styles.testButton}
            onPress={() => handleBarCodeScanned({ type: 'qr', data: 'TEST_POST_001' })}
          >
            <Text style={styles.testButtonText}>테스트: QR 스캔 시뮬레이션</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>카메라 권한 확인 중...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>카메라 권한이 필요합니다.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={checkPermission}>
          <Text style={styles.permissionButtonText}>권한 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR 스캔</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.cameraContainer}>
        {/* 실제 앱에서는 expo-camera 사용 */}
        <View style={styles.cameraPlaceholder}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.scanText}>QR 코드를 프레임 안에 맞춰주세요</Text>
        </View>
      </View>

      {scanned && (
        <TouchableOpacity
          style={styles.rescanButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.rescanText}>다시 스캔하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  permissionButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#4F46E5',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },
  rescanButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  rescanText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#111827',
  },
  placeholderIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  testButton: {
    marginTop: 32,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
