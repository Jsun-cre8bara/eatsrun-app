// src/screens/GameScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

interface GameScreenProps {
  route?: { qrData?: string; postId?: string; eventId?: string };
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'RESTAURANT', name: '맛집', emoji: '🍽️', color: '#EF4444' },
  { id: 'CAFE', name: '카페', emoji: '☕', color: '#F59E0B' },
  { id: 'ACCOMMODATION', name: '숙소', emoji: '🏨', color: '#10B981' },
  { id: 'PERFORMANCE', name: '공연', emoji: '🎭', color: '#8B5CF6' },
  { id: 'OTHER', name: '기타', emoji: '🎁', color: '#3B82F6' },
];

export default function GameScreen({ route, onNavigate, onBack }: GameScreenProps) {
  const [gameState, setGameState] = useState<'ready' | 'spinning' | 'result'>('ready');
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null);
  const [spinValue] = useState(new Animated.Value(0));

  const startGame = () => {
    setGameState('spinning');
    
    // 랜덤 결과 선택
    const randomIndex = Math.floor(Math.random() * CATEGORIES.length);
    const result = CATEGORIES[randomIndex];

    // 룰렛 애니메이션
    Animated.timing(spinValue, {
      toValue: 5 + randomIndex / CATEGORIES.length,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSelectedCategory(result);
      setGameState('result');
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSelectCategory = (category: typeof CATEGORIES[0]) => {
    // 쿠폰 발급 화면으로 이동
    onNavigate('CouponResult', {
      category: category.id,
      categoryName: category.name,
      eventId: route?.eventId,
    });
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🎰 행운의 룰렛</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        {gameState === 'ready' && (
          <>
            <Text style={styles.title}>방문을 축하합니다! 🎉</Text>
            <Text style={styles.subtitle}>
              룰렛을 돌려 할인 쿠폰을 받아보세요
            </Text>

            <View style={styles.rouletteContainer}>
              <View style={styles.roulette}>
                {CATEGORIES.map((cat, index) => (
                  <View
                    key={cat.id}
                    style={[
                      styles.rouletteItem,
                      {
                        transform: [
                          { rotate: `${(index * 360) / CATEGORIES.length}deg` },
                          { translateY: -80 },
                        ],
                      },
                    ]}
                  >
                    <Text style={styles.rouletteEmoji}>{cat.emoji}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.roulettePointer}>
                <Text style={styles.pointerText}>▼</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>룰렛 돌리기!</Text>
            </TouchableOpacity>
          </>
        )}

        {gameState === 'spinning' && (
          <>
            <Animated.View
              style={[
                styles.spinningRoulette,
                { transform: [{ rotate: spin }] },
              ]}
            >
              <Text style={styles.spinningEmoji}>🎯</Text>
            </Animated.View>
            <Text style={styles.spinningText}>룰렛이 돌아가는 중...</Text>
          </>
        )}

        {gameState === 'result' && selectedCategory && (
          <>
            <View style={styles.resultContainer}>
              <Text style={styles.resultEmoji}>{selectedCategory.emoji}</Text>
              <Text style={styles.resultTitle}>
                '{selectedCategory.name}' 당첨!
              </Text>
              <Text style={styles.resultSubtitle}>
                원하는 카테고리의 쿠폰을 선택하세요
              </Text>
            </View>

            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    { borderColor: cat.color },
                    cat.id === selectedCategory.id && {
                      backgroundColor: cat.color,
                    },
                  ]}
                  onPress={() => handleSelectCategory(cat)}
                >
                  <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      cat.id === selectedCategory.id && { color: '#FFFFFF' },
                    ]}
                  >
                    {cat.name}
                  </Text>
                  {cat.id === selectedCategory.id && (
                    <Text style={styles.recommendedBadge}>추천!</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  rouletteContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  roulette: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rouletteItem: {
    position: 'absolute',
  },
  rouletteEmoji: {
    fontSize: 32,
  },
  roulettePointer: {
    position: 'absolute',
    top: -10,
  },
  pointerText: {
    fontSize: 32,
    color: '#4F46E5',
  },
  startButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  spinningRoulette: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  spinningEmoji: {
    fontSize: 60,
  },
  spinningText: {
    fontSize: 18,
    color: '#6B7280',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  categoryButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
