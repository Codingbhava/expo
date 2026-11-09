import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

interface DownloadOfflineOnboardProps {
  colors?: readonly [string, string, ...string[]];
}

export default function DownloadOfflineOnboard({ colors = ['#111111', '#1f1b2e', '#A855F7'] }: DownloadOfflineOnboardProps) {
  const { isDark } = useTheme();
  const progress = useSharedValue(0);
  const glow = useSharedValue(0.5);

  // React state used only for display
  const [progressLabel, setProgressLabel] = useState('0%');

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      false
    );

    glow.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value * 0.6,
  }));

  // Mirror shared value -> React state, on UI thread
  useDerivedValue(() => {
    const pct = Math.round(progress.value * 100);
    // Only update when it actually changes to avoid too many JS updates
    runOnJS(setProgressLabel)(`${pct}%`);
  }, []);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        {/* Main Container */}
        <View className="relative flex-1 w-full items-center justify-center px-6 pb-32">
          {/* Icon Container */}
          <View className="items-center mb-12">
            <View className="relative items-center justify-center">
              {/* Glow effect - centered */}
              <Animated.View style={glowStyle} className="absolute">
                <LinearGradient
                  colors={['#10b981', '#06b6d4', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ width: 144, height: 144, borderRadius: 9999, opacity: 0.3 }}
                />
              </Animated.View>

              {/* Icon background */}
              <View
                className={`w-28 h-28 rounded-full ${isDark ? 'bg-gray-900/50' : 'bg-white/80'} items-center justify-center border ${isDark ? 'border-emerald-500/30' : 'border-emerald-500/60'}`}
                style={{ zIndex: 10 }}
              >
                <Download size={56} color="#10b981" strokeWidth={1.5} />
              </View>
            </View>

            {/* Download progress bar */}
            <View className="mt-8 w-64">
              <View className={`h-2 ${isDark ? 'bg-gray-800' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                <Animated.View style={progressStyle}>
                  <LinearGradient
                    colors={['#10b981', '#06b6d4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: '100%', borderRadius: 9999 }}
                  />
                </Animated.View>
              </View>

              <View className="flex-row justify-between items-center mt-2">
                <Text className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} text-xs font-medium`}>
                  Downloading...
                </Text>
                {/* Now driven from React state, not progress.value directly */}
                <Text className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} text-xs font-bold`}>
                  {progressLabel}
                </Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="items-center space-y-4 mb-8">
            <View className="flex-row items-center">
              <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>Download & Listen </Text>
              <MaskedView
                maskElement={
                  <Text className="text-3xl font-bold bg-transparent">
                    Offline
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#a855f7', '#ec4899', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="text-3xl font-bold opacity-0">
                    Offline
                  </Text>
                </LinearGradient>
              </MaskedView>

            </View>

            <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base text-center leading-6 px-4`}>
              Save your favorite songs and playlists to enjoy music anytime, anywhere — even without internet.
            </Text>

            <Text className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} text-sm text-center font-medium mt-2`}>
              Music that moves with you.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
