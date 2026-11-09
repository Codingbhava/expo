import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

interface GetStartedOnboardProps {
  colors?: readonly [string, string, ...string[]];
}

export default function GetStartedOnboard({ colors = ['#141414', '#191919', '#A855F7'] }: GetStartedOnboardProps) {
  const { isDark } = useTheme();
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);
  const sparkle3 = useSharedValue(0);
  const sparkle4 = useSharedValue(0);
  const glow = useSharedValue(1);

  useEffect(() => {
    // Sparkle animations with different delays
    sparkle1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }),
        withDelay(400, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );

    sparkle2.value = withRepeat(
      withSequence(
        withDelay(200, withTiming(0, { duration: 0 })),
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }),
        withDelay(200, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );

    sparkle3.value = withRepeat(
      withSequence(
        withDelay(400, withTiming(0, { duration: 0 })),
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }))
      ,
      -1,
      false
    );

    sparkle4.value = withRepeat(
      withSequence(
        withDelay(600, withTiming(0, { duration: 0 })),
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }),
        withDelay(600, withTiming(0, { duration: 0 }))
      ),
      -1,
      false
    );

    glow.value = withRepeat(
      withTiming(1.3, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const sparkleStyle1 = useAnimatedStyle(() => ({
    opacity: sparkle1.value,
    transform: [
      { scale: sparkle1.value },
      { rotate: `${sparkle1.value * 180}deg` }
    ] as any,
  }));

  const sparkleStyle2 = useAnimatedStyle(() => ({
    opacity: sparkle2.value,
    transform: [
      { scale: sparkle2.value },
      { rotate: `${sparkle2.value * -180}deg` }
    ] as any,
  }));

  const sparkleStyle3 = useAnimatedStyle(() => ({
    opacity: sparkle3.value,
    transform: [
      { scale: sparkle3.value },
      { rotate: `${sparkle3.value * 180}deg` }
    ] as any,
  }));

  const sparkleStyle4 = useAnimatedStyle(() => ({
    opacity: sparkle4.value,
    transform: [
      { scale: sparkle4.value },
      { rotate: `${sparkle4.value * -180}deg` }
    ] as any,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
    opacity: 0.4,
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
          {/* Animated sparkles and icon */}
          <View className="items-center mb-12 relative h-48">
            {/* Background glow */}
            <Animated.View style={glowStyle} className="absolute top-8">
              <LinearGradient
                colors={['#a855f7', '#ec4899', '#f59e0b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 160, height: 160, borderRadius: 9999, opacity: 0.2 }}
              />
            </Animated.View>

            {/* Floating sparkles */}
            <Animated.View style={sparkleStyle1} className="absolute top-4 left-8">
              <Sparkles size={24} color="#fbbf24" fill="#fbbf24" />
            </Animated.View>

            <Animated.View style={sparkleStyle2} className="absolute top-4 right-8">
              <Sparkles size={20} color="#a855f7" fill="#a855f7" />
            </Animated.View>

            <Animated.View style={sparkleStyle3} className="absolute bottom-8 left-12">
              <Sparkles size={28} color="#ec4899" fill="#ec4899" />
            </Animated.View>

            <Animated.View style={sparkleStyle4} className="absolute bottom-8 right-12">
              <Sparkles size={22} color="#06b6d4" fill="#06b6d4" />
            </Animated.View>

            {/* Center icon */}
            <View className="absolute top-12">
              <LinearGradient
                colors={['#a855f7', '#ec4899', '#f59e0b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 112, height: 112, borderRadius: 9999 }}
                className="items-center justify-center shadow-2xl"
              >
                <View className={`w-24 h-24 rounded-full ${isDark ? 'bg-black' : 'bg-white'} items-center justify-center`}>
                  <Sparkles size={48} color="#fbbf24" strokeWidth={1.5} />
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Content */}
          <View className="items-center space-y-4 mb-8 mt-8">
            <View className="flex-row items-center">

              <MaskedView
                maskElement={
                  <Text className="text-3xl font-bold bg-transparent">
                    Let's Get Started
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#a855f7', '#ec4899', '#3b82f6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="text-3xl font-bold opacity-0">
                    Let's Get Started
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>

            <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base text-center leading-6 px-4`}>
              Sign in and start vibing with your music world.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
