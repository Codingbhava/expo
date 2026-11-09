import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Radio } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

interface StreamWithoutLimitsOnboardProps {
  colors?: readonly [string, string, ...string[]];
}

export default function StreamWithoutLimitsOnboard({ colors = ['#0f172a', '#16213e', '#06B6D4'] }: StreamWithoutLimitsOnboardProps) {
  const { isDark } = useTheme();
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);
  const wave3 = useSharedValue(0);

  useEffect(() => {
    wave1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    wave2.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    wave3.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const waveStyle1 = useAnimatedStyle(() => ({
    opacity: wave1.value * 0.3,
    transform: [{ scale: 1 + wave1.value * 0.3 }],
  }));

  const waveStyle2 = useAnimatedStyle(() => ({
    opacity: wave2.value * 0.2,
    transform: [{ scale: 1 + wave2.value * 0.5 }],
  }));

  const waveStyle3 = useAnimatedStyle(() => ({
    opacity: wave3.value * 0.15,
    transform: [{ scale: 1 + wave3.value * 0.7 }],
  }));

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
          {/* Icon Container with Waves */}
          <View className="items-center mb-12">
            <View className="relative items-center justify-center">
              {/* Animated waves */}
              <Animated.View style={[waveStyle3]} className="absolute">
                <View className={`w-40 h-40 rounded-full border-2 ${isDark ? 'border-blue-500/30' : 'border-blue-400/50'}`} />
              </Animated.View>
              <Animated.View style={[waveStyle2]} className="absolute">
                <View className={`w-36 h-36 rounded-full border-2 ${isDark ? 'border-blue-500/60' : 'border-blue-500/80'}`} />
              </Animated.View>
              <Animated.View style={[waveStyle1]} className="absolute">
                <View className={`w-32 h-32 rounded-full border-2 ${isDark ? 'border-blue-500/80' : 'border-blue-600/90'}`} />
              </Animated.View>

              {/* Icon background */}
              <View className={`w-28 h-28 rounded-full ${isDark ? 'bg-gray-900/50' : 'bg-white/80'} items-center justify-center border ${isDark ? 'border-cyan-500/30' : 'border-cyan-500/60'} z-10`}>
                <Radio size={56} color="#06b6d4" strokeWidth={1.5} />
              </View>
            </View>
          </View>

          {/* Content */}
          <View className="items-center space-y-4 mb-8">
            <View className="flex-row items-center">

              <MaskedView
                maskElement={
                  <Text className="text-3xl font-bold bg-transparent">
                    Stream
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#a855f7', '#ec4899', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="text-3xl font-bold opacity-0">
                    Stream
                  </Text>
                </LinearGradient>
              </MaskedView>
              <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}> Without Limits</Text>
            </View>

            <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base text-center leading-6 px-4`}>
              Enjoy smooth, high-quality music streaming with optimized data usage and zero interruptions.
            </Text>

            <Text className={`${isDark ? 'text-cyan-400' : 'text-cyan-600'} text-sm text-center font-medium mt-2`}>
              Choose audio quality that fits your network.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
