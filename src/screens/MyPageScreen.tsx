// src/screens/MyPageScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

interface MyPageScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function MyPageScreen({ onNavigate, onBack }: MyPageScreenProps) {
  const [user, setUser] = useState({
    name: '홍길동',
    phone: '010-1234-5678',
    provider: 'KAKAO',
    isVerified: true,
  });

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => {
          if (Platform.OS === 'web') {
            localStorage.removeItem('accessToken');
          }
          onNavigate('Login');
        },
      },
    ]);
  };

  const menuItems = [
    {
      section: '내 활동',
      items: [
        { icon: '🎟️', label: '내 쿠폰', screen: 'CouponList' },
        { icon: '💮', label: '스탬프 현황', screen: 'Stamps' },
        { icon: '🎁', label: '교환권', screen: 'Rewards' },
        { icon: '📅', label: '참여 행사', screen: 'EventList' },
      ],
    },
    {
      section: '설정',
      items: [
        { icon: '🔔', label: '알림 설정', screen: null },
        { icon: '📍', label: '위치 서비스', screen: null },
        { icon: '📞', label: '고객센터', screen: null },
        { icon: '📄', label: '이용약관', screen: null },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name?.charAt(0) || '?'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name || '이름 없음'}</Text>
            <Text style={styles.userPhone}>{user.phone || '전화번호 미등록'}</Text>
            <View style={styles.providerBadge}>
              <Text style={styles.providerText}>
                {user.provider === 'KAKAO' ? '💬 카카오' : '🟢 네이버'} 로그인
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>쿠폰</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>참여행사</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>스탬프</Text>
          </View>
        </View>

        {menuItems.map((section) => (
          <View key={section.section} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                onPress={() => item.screen && onNavigate(item.screen)}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        <Text style={styles.version}>버전 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  userPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  providerBadge: {
    marginTop: 4,
  },
  providerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  editButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  menuArrow: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 24,
    marginBottom: 40,
  },
});
