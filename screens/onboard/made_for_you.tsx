import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';
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

interface MadeForYouOnboardProps {
  colors?: readonly [string, string, ...string[]];
}

export default function MadeForYouOnboard({ colors = ['#1a1a1a', '#2a0f1f', '#EC4899'] }: MadeForYouOnboardProps) {
  const { isDark } = useTheme();
  const heartbeat = useSharedValue(1);
  const album1 = useSharedValue(0);
  const album2 = useSharedValue(0);
  const album3 = useSharedValue(0);
  const glowOpacity = useSharedValue(0.3);
  const ring1 = useSharedValue(1);
  const ring2 = useSharedValue(1);
  const ring3 = useSharedValue(1);

  useEffect(() => {
    heartbeat.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(1, { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1,
      false
    );

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(0.3, { duration: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1,
      false
    );

    // Pulsing rings
    ring1.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(1, { duration: 2000, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );

    ring2.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 2500, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(1, { duration: 2500, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );

    ring3.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 3000, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(1, { duration: 3000, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );

    // Smooth continuous floating animations
    album1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(0, { duration: 2000, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );

    album2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(0, { duration: 2500, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );

    album3.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
        withTiming(0, { duration: 3000, easing: Easing.bezier(0.42, 0, 0.58, 1) })
      ),
      -1,
      true
    );
  }, []);

  const heartbeatStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartbeat.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const ringStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: ring1.value }],
    opacity: 0.4,
  }));

  const ringStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: ring2.value }],
    opacity: 0.3,
  }));

  const ringStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: ring3.value }],
    opacity: 0.2,
  }));

  const albumStyle1 = useAnimatedStyle(() => ({
    opacity: 0.7,
    transform: [
      { translateY: -15 * Math.sin(album1.value * Math.PI) },
      { scale: 0.9 + 0.1 * Math.sin(album1.value * Math.PI) },
      { rotate: `${5 * Math.sin(album1.value * Math.PI)}deg` }
    ] as any,
  }));

  const albumStyle2 = useAnimatedStyle(() => ({
    opacity: 0.6,
    transform: [
      { translateY: -12 * Math.sin(album2.value * Math.PI) },
      { translateX: 35 + 5 * Math.sin(album2.value * Math.PI) },
      { rotate: `${-8 * Math.sin(album2.value * Math.PI)}deg` }
    ] as any,
  }));

  const albumStyle3 = useAnimatedStyle(() => ({
    opacity: 0.6,
    transform: [
      { translateY: -12 * Math.sin(album3.value * Math.PI) },
      { translateX: -35 - 5 * Math.sin(album3.value * Math.PI) },
      { rotate: `${8 * Math.sin(album3.value * Math.PI)}deg` }
    ] as any,
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
        {/* Icon Container with floating albums */}
        <View className="items-center mb-12 relative h-48">
          {/* Floating album covers */}
          <Animated.View style={albumStyle1} className="absolute top-0">
            <View className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 opacity-60" />
          </Animated.View>
          
          <Animated.View style={albumStyle2} className="absolute top-8">
            <View className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 opacity-50" />
          </Animated.View>

          <Animated.View style={albumStyle3} className="absolute top-8">
            <View className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 opacity-50" />
          </Animated.View>

          {/* Heart icon with beat animation */}
          <View className="absolute top-16 items-center justify-center">
            <View className="relative items-center justify-center">
              {/* Pulsing rings */}
              <Animated.View style={ringStyle3} className="absolute">
                <View className={`w-56 h-56 rounded-full border-2 ${isDark ? 'border-pink-500/20' : 'border-pink-400/40'}`} />
              </Animated.View>

              <Animated.View style={ringStyle2} className="absolute">
                <View className={`w-44 h-44 rounded-full border-2 ${isDark ? 'border-pink-500/30' : 'border-pink-500/50'}`} />
              </Animated.View>

              <Animated.View style={ringStyle1} className="absolute">
                <View className={`w-36 h-36 rounded-full border-2 ${isDark ? 'border-pink-500/40' : 'border-pink-600/60'}`} />
              </Animated.View>

              <Animated.View style={glowStyle} className="absolute">
                <LinearGradient
                  colors={isDark ? ['rgba(236, 72, 153, 0.5)', 'rgba(219, 39, 119, 0.5)'] : ['rgba(236, 72, 153, 0.7)', 'rgba(219, 39, 119, 0.7)']}
                  style={{ width: 140, height: 140, borderRadius: 9999 }}
                />
              </Animated.View>
              
              <Animated.View style={heartbeatStyle}>
          <View className={`w-28 h-28 rounded-full ${isDark ? 'bg-gray-900/50' : 'bg-white/80'} items-center justify-center border ${isDark ? 'border-pink-500/30' : 'border-pink-500/60'}`}>
            <Heart size={56} color="#ec4899" strokeWidth={1.5} fill="#ec4899" />
          </View>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="items-center space-y-4 mb-8 mt-8">
          <View className="flex-row items-center">
                        <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}> Made Just for </Text>
                        <MaskedView
                          maskElement={
                            <Text className="text-3xl font-bold bg-transparent">
                              You
                            </Text>
                          }
                        >
                          <LinearGradient
                            colors={['#a855f7', '#ec4899', '#3b82f6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          >
                            <Text className="text-3xl font-bold opacity-0">
                              You
                            </Text>
                          </LinearGradient>
                        </MaskedView>
                      </View>
          
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base text-center leading-6 px-4`}>
            Get personalized recommendations based on what you love to listen to.
          </Text>
          
          <Text className={`${isDark ? 'text-pink-400' : 'text-pink-600'} text-sm text-center font-medium mt-2`}>
            Your taste. Your playlist.
          </Text>
        </View>
      </View>
      </LinearGradient>
    </View>
  );
}
