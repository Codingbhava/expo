import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useTheme } from '../../lib/ThemeContext';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { Headphones } from 'lucide-react-native';

interface FeelTheVibeOnboardProps {
  colors?: readonly [string, string, ...string[]];
}

export default function FeelTheVibeOnboard({ colors = ['#000000', '#1a0b2e', '#EC4899'] }: FeelTheVibeOnboardProps) {
  const { isDark } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
    opacity.value = withRepeat(
      withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View className="flex-1">
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        {/* Main Container */}
        <View className="relative flex-1 w-full items-center justify-center px-8 pb-40">
          {/* Icon Container with Concentric Circles */}
          <View className="items-center mb-16">
            <View className="relative items-center justify-center">
              {/* Outer ring 1 - Largest */}
              <View className={`absolute items-center justify-center w-64 h-64 rounded-full border ${isDark ? 'border-purple-900/30' : 'border-purple-300/50'}`} />

              {/* Outer ring 2 */}
              <View className={`absolute items-center justify-center w-56 h-56 rounded-full border ${isDark ? 'border-purple-800/40' : 'border-purple-400/60'}`} />

              {/* Outer ring 3 */}
              <View className={`absolute items-center justify-center w-48 h-48 rounded-full border ${isDark ? 'border-purple-700/50' : 'border-purple-500/70'}`} />

              {/* Main gradient circle */}
              <View className={`items-center justify-center w-40 h-40 rounded-full ${isDark ? 'bg-purple-900/40' : 'bg-purple-200/60'}`}>
                <LinearGradient
                  colors={isDark ? ['rgba(168, 85, 247, 0.6)', 'rgba(236, 72, 153, 0.4)'] : ['rgba(168, 85, 247, 0.8)', 'rgba(236, 72, 153, 0.6)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ width: 160, height: 160, borderRadius: 9999 }}
                  className="items-center justify-center"
                >
                  {/* Inner purple circle */}
                  <View className={`w-28 h-28 rounded-full ${isDark ? 'bg-purple-600/80' : 'bg-purple-500/90'} items-center justify-center`}>
                    {/* Icon */}
                    <Headphones size={64} color={isDark ? "#ffffff" : "#ffffff"} strokeWidth={1.5} />
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="items-center space-y-4">
            <View className="flex-row items-center">
              <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>Feel the </Text>
              <MaskedView
                maskElement={
                  <Text className="text-3xl font-bold bg-transparent">
                    Vibe
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#a855f7', '#ec4899', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="text-3xl font-bold opacity-0">
                    Vibe
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>

            <Text className={`${isDark ? 'text-gray-500' : 'text-gray-700'} text-sm text-center font-semibold mt-2`}>
              Your music. Your mood. Your vibe.
            </Text>

            <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm text-center leading-6 px-6 mt-4`}>
              Discover millions of songs, trending tracks, and your favorite music — all in one place.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
