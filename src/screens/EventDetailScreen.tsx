// src/screens/EventDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

interface EventDetailScreenProps {
  route?: { eventId?: string };
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export default function EventDetailScreen({
  route,
  onNavigate,
  onBack,
}: EventDetailScreenProps) {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setEvent({
        id: route?.eventId || '1',
        name: '2025 서울 마라톤',
        type: 'RUNNING',
        region: '서울',
        imageUrl: 'https://picsum.photos/800/400?random=1',
        startDate: '2025-03-15',
        endDate: '2025-03-15',
        status: 'UPCOMING',
        description:
          '서울 도심을 달리는 봄맞이 마라톤 대회입니다. 아름다운 서울의 봄 풍경을 즐기며 건강한 달리기를 즐겨보세요.',
        couponStartTime: '06:00',
        couponEndTime: '20:00',
        posts: [
          { id: '1', name: '출발점', category: 'BOOTH' },
          { id: '2', name: '맛있는 식당', category: 'RESTAURANT' },
          { id: '3', name: '커피숍', category: 'CAFE' },
        ],
        stats: {
          totalPosts: 15,
          totalParticipants: 1234,
          totalCoupons: 5000,
        },
      });
    } catch (error) {
      console.error('Load event failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async () => {
    setJoining(true);
    try {
      // TODO: API 호출
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsJoined(true);
      Alert.alert('참여 완료!', '행사에 성공적으로 참여했습니다.');
    } catch (error) {
      Alert.alert('오류', '참여에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 이미지 헤더 */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event?.imageUrl }} style={styles.headerImage} />
          <TouchableOpacity onPress={onBack} style={styles.backButtonOverlay}>
            <Text style={styles.backButtonText}>← 뒤로</Text>
          </TouchableOpacity>
          <View style={styles.statusOverlay}>
            <Text style={styles.statusText}>
              {event?.status === 'ACTIVE' ? '🟢 진행중' : '🔵 예정'}
            </Text>
          </View>
        </View>

        {/* 행사 정보 */}
        <View style={styles.content}>
          <Text style={styles.eventType}>
            {event?.type === 'RUNNING' ? '🏃 러닝' : '🎉 축제'}
          </Text>
          <Text style={styles.eventName}>{event?.name}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoItem}>📍 {event?.region}</Text>
            <Text style={styles.infoItem}>📅 {event?.startDate}</Text>
          </View>

          <Text style={styles.description}>{event?.description}</Text>

          {/* 통계 */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{event?.stats?.totalPosts}</Text>
              <Text style={styles.statLabel}>포스트</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {event?.stats?.totalParticipants?.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>참여자</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {event?.stats?.totalCoupons?.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>쿠폰 발급</Text>
            </View>
          </View>

          {/* 쿠폰 운영 시간 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⏰ 쿠폰 운영 시간</Text>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>
                {event?.couponStartTime} ~ {event?.couponEndTime}
              </Text>
            </View>
          </View>

          {/* 참여 포스트 미리보기 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 참여 포스트</Text>
            {event?.posts?.slice(0, 3).map((post: any) => (
              <View key={post.id} style={styles.postItem}>
                <Text style={styles.postName}>{post.name}</Text>
                <Text style={styles.postCategory}>{post.category}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => onNavigate('Map', { eventId: event?.id })}
            >
              <Text style={styles.viewAllText}>전체 포스트 보기 →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 참여 버튼 */}
      <View style={styles.footer}>
        {isJoined ? (
          <View style={styles.joinedContainer}>
            <Text style={styles.joinedText}>✅ 참여중</Text>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => onNavigate('QRScan', { eventId: event?.id })}
            >
              <Text style={styles.scanButtonText}>QR 스캔하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleJoinEvent}
            disabled={joining}
          >
            {joining ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.joinButtonText}>행사 참여하기</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#E5E7EB',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statusOverlay: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  eventType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  timeBox: {
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
  },
  postItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  postName: {
    fontSize: 14,
    color: '#111827',
  },
  postCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewAllButton: {
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  joinButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  joinedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#047857',
  },
  scanButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
