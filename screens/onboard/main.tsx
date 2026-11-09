import React, { useState, useRef } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../lib/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import { Button } from '../../components/ui/button';
import ThemeToggle from '../../components/ThemeToggle';
import FeelTheVibeOnboard from './feel_the_vibe';
import StreamWithoutLimitsOnboard from './stream_without_limits';
import DownloadOfflineOnboard from './download_offline';
import MadeForYouOnboard from './made_for_you';
import ControlMusicOnboard from './control_music';
import GetStartedOnboard from './get_started';

interface OnBoardProps {
  onComplete?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnBoard({ onComplete }: OnBoardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const { isDark, themeColors } = useTheme();
  
  // Generate dynamic page colors based on theme
  const PAGE_COLORS_DARK = {
    control_music: [themeColors.background, themeColors.background, themeColors.primary + '30'] as const,
    download_offline: [themeColors.background, themeColors.background, themeColors.primary + '30'] as const,
    feel_the_vibe: [themeColors.background, themeColors.background, themeColors.primary + '30'] as const,
    get_started: [themeColors.background, themeColors.background, themeColors.primary + '30'] as const,
    made_for_you: [themeColors.background, themeColors.background, themeColors.primary + '30'] as const,
    stream_without_limits: [themeColors.background, themeColors.background, themeColors.primary + '30'] as const,
  };

  const PAGE_COLORS_LIGHT = {
    control_music: [themeColors.background, themeColors.background, themeColors.primary + '20'] as const,
    download_offline: [themeColors.background, themeColors.background, themeColors.primary + '20'] as const,
    feel_the_vibe: [themeColors.background, themeColors.background, themeColors.primary + '20'] as const,
    get_started: [themeColors.background, themeColors.background, themeColors.primary + '20'] as const,
    made_for_you: [themeColors.background, themeColors.background, themeColors.primary + '20'] as const,
    stream_without_limits: [themeColors.background, themeColors.background, themeColors.primary + '20'] as const,
  };

  const screens = [
    { component: FeelTheVibeOnboard, index: 0, colors: isDark ? PAGE_COLORS_DARK.feel_the_vibe : PAGE_COLORS_LIGHT.feel_the_vibe },
    { component: StreamWithoutLimitsOnboard, index: 1, colors: isDark ? PAGE_COLORS_DARK.stream_without_limits : PAGE_COLORS_LIGHT.stream_without_limits },
    { component: DownloadOfflineOnboard, index: 2, colors: isDark ? PAGE_COLORS_DARK.download_offline : PAGE_COLORS_LIGHT.download_offline },
    { component: MadeForYouOnboard, index: 3, colors: isDark ? PAGE_COLORS_DARK.made_for_you : PAGE_COLORS_LIGHT.made_for_you },
    { component: ControlMusicOnboard, index: 4, colors: isDark ? PAGE_COLORS_DARK.control_music : PAGE_COLORS_LIGHT.control_music },
    { component: GetStartedOnboard, index: 5, colors: isDark ? PAGE_COLORS_DARK.get_started : PAGE_COLORS_LIGHT.get_started },
  ];
  const currentColors = screens[currentIndex].colors;

  const updateIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const index = Math.round(event.contentOffset.x / SCREEN_WIDTH);
      runOnJS(updateIndex)(index);
    },
  });

  const handleNext = () => {
    if (currentIndex < 5) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    scrollViewRef.current?.scrollTo({
      x: 5 * SCREEN_WIDTH,
      animated: true,
    });
    setCurrentIndex(5);
  };

  const handleGetStarted = () => {
    onComplete?.();
  };

  return (
    <LinearGradient
      colors={currentColors}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1" edges={['top']}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Theme Toggle - Top Left */}
      <View className="absolute top-10 left-6 z-50">
        <ThemeToggle />
      </View>

      {/* Skip Button - Hidden on last screen */}
      {currentIndex < 5 && (
        <View className="absolute top-10 right-6 z-50">
          <Button
            onPress={handleSkip}
            variant="ghost"
            size="default"
            className=""
            textClassName="text-gray-400"
            disabled={false}
          >
            Skip
          </Button>
        </View>
      )}

      {/* Scrollable Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate="fast"
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="center"
        overScrollMode="never"
      >
        {screens.map((screen, index) => (
          <View key={index} style={{ width: SCREEN_WIDTH }}>
            <screen.component colors={screen.colors} />
          </View>
        ))}
      </Animated.ScrollView>

      {/* Bottom Section - Pagination & CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8">
        {/* Liquid Pagination Indicator */}
        <View className="flex-row justify-center items-center mb-6 h-8">
          <View className="flex-row relative" style={{ height: 8 }}>
            {/* Background dots */}
            {screens.map((_, index) => (
              <View
                key={`bg-${index}`}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#4b5563',
                  marginHorizontal: 4,
                  opacity: 0.3,
                }}
              />
            ))}

            {/* Animated liquid indicator */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  height: 8,
                  borderRadius: 4,
                },
                useAnimatedStyle(() => {
                  const inputRange = screens.map((_, i) => i * SCREEN_WIDTH);

                  const width = interpolate(
                    scrollX.value,
                    inputRange,
                    screens.map((_, i) => {
                      const progress = Math.abs(scrollX.value - i * SCREEN_WIDTH) / SCREEN_WIDTH;
                      if (progress < 1) {
                        return 32 - (24 * progress);
                      }
                      return 8;
                    }),
                    Extrapolate.CLAMP
                  );

                  const translateX = interpolate(
                    scrollX.value,
                    inputRange,
                    screens.map((_, i) => i * 16),
                    Extrapolate.CLAMP
                  );

                  return {
                    width: withSpring(width, {
                      damping: 15,
                      stiffness: 150,
                    }),
                    transform: [
                      {
                        translateX: withSpring(translateX, {
                          damping: 15,
                          stiffness: 150,
                        }),
                      },
                    ],
                    backgroundColor: themeColors.primary,
                    opacity: 1,
                  };
                }),
              ]}
            />
          </View>
        </View>

        {/* CTA Button */}
        <View className="w-full">
          <LinearGradient
            colors={
              currentIndex === 5
                ? [themeColors.primary, themeColors.accent, themeColors.secondary]
                : currentIndex === 0 || currentIndex === 3
                ? [themeColors.accent, themeColors.secondary]
                : currentIndex === 1 || currentIndex === 4
                ? [themeColors.secondary, themeColors.primary]
                : [themeColors.primary, themeColors.accent]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16 }}
          >
            <Button
              onPress={currentIndex === 5 ? handleGetStarted : handleNext}
              variant="ghost"
              className="w-full bg-transparent py-4 h-auto"
              textClassName="text-white text-lg font-bold"
              disabled={false}
            >
              {currentIndex === 5 ? 'Get Started' : 'Next'}
            </Button>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
}
