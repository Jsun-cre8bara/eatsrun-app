// src/screens/StampsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';

interface StampsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const mockStampData = {
  eventId: '1',
  eventName: '2025 서울 마라톤',
  totalPosts: 10,
  collectedStamps: 4,
  stamps: [
    { id: '1', postName: '출발점', collected: true, collectedAt: '2025-01-15 09:30' },
    { id: '2', postName: '맛있는 식당', collected: true, collectedAt: '2025-01-15 10:15' },
    { id: '3', postName: '카페 거리', collected: true, collectedAt: '2025-01-15 11:00' },
    { id: '4', postName: '공연장', collected: true, collectedAt: '2025-01-15 12:30' },
    { id: '5', postName: '전통시장', collected: false },
    { id: '6', postName: '관광명소', collected: false },
    { id: '7', postName: '숙박거리', collected: false },
    { id: '8', postName: '먹거리촌', collected: false },
    { id: '9', postName: '포토존', collected: false },
    { id: '10', postName: '도착점', collected: false },
  ],
  rewards: [
    { tier: 'TIER_1', name: '참여 기념 스티커', required: 1, claimed: true },
    { tier: 'TIER_3', name: '음료 무료 쿠폰', required: 3, claimed: true },
    { tier: 'TIER_5', name: '기념품 세트', required: 5, claimed: false },
    { tier: 'TIER_10', name: '특별 경품', required: 10, claimed: false },
  ],
};

export default function StampsScreen({ onNavigate, onBack }: StampsScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(mockStampData);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleClaimReward = (reward: any) => {
    if (data.collectedStamps >= reward.required && !reward.claimed) {
      Alert.alert('교환권 획득!', `${reward.name}을(를) 획득했습니다.`);
    }
  };

  const progress = (data.collectedStamps / data.totalPosts) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>스탬프</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{data.eventName}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {data.collectedStamps} / {data.totalPosts}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎁 교환권</Text>
          <View style={styles.rewardsGrid}>
            {data.rewards.map((reward) => {
              const canClaim = data.collectedStamps >= reward.required && !reward.claimed;
              const isClaimed = reward.claimed;
              
              return (
                <TouchableOpacity
                  key={reward.tier}
                  style={[
                    styles.rewardCard,
                    isClaimed && styles.rewardCardClaimed,
                    canClaim && styles.rewardCardAvailable,
                  ]}
                  onPress={() => handleClaimReward(reward)}
                  disabled={isClaimed || !canClaim}
                >
                  <Text style={styles.rewardRequired}>{reward.required}개</Text>
                  <Text style={styles.rewardName}>{reward.name}</Text>
                  {isClaimed && <Text style={styles.claimedBadge}>획득완료</Text>}
                  {canClaim && <Text style={styles.availableBadge}>획득가능!</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💮 스탬프 현황</Text>
          <View style={styles.stampsGrid}>
            {data.stamps.map((stamp, index) => (
              <View
                key={stamp.id}
                style={[
                  styles.stampItem,
                  stamp.collected && styles.stampItemCollected,
                ]}
              >
                <Text style={styles.stampNumber}>{index + 1}</Text>
                {stamp.collected ? (
                  <Text style={styles.stampIcon}>✅</Text>
                ) : (
                  <Text style={styles.stampIconEmpty}>○</Text>
                )}
                <Text style={styles.stampName} numberOfLines={1}>
                  {stamp.postName}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
  eventInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rewardCard: {
    width: '47%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  rewardCardClaimed: {
    backgroundColor: '#D1FAE5',
  },
  rewardCardAvailable: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  rewardRequired: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  rewardName: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },
  claimedBadge: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '600',
    marginTop: 8,
  },
  availableBadge: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 8,
  },
  stampsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stampItem: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  stampItemCollected: {
    backgroundColor: '#D1FAE5',
  },
  stampNumber: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  stampIcon: {
    fontSize: 20,
  },
  stampIconEmpty: {
    fontSize: 20,
    color: '#D1D5DB',
  },
  stampName: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
});
