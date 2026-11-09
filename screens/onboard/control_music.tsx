import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

interface ControlMusicOnboardProps {
  colors?: readonly [string, string, ...string[]];
}

export default function ControlMusicOnboard({ colors = ['#0b1320', '#101b2d', '#06B6D4'] }: ControlMusicOnboardProps) {
  const { isDark } = useTheme();
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );

    pulse.value = withRepeat(
      withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
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
        {/* Player UI Preview */}
        <View className="items-center mb-12">
          {/* Rotating vinyl disc */}
          <View className="relative mb-8">
            <Animated.View style={rotationStyle}>
              <LinearGradient
                colors={['#8b5cf6', '#6366f1', '#3b82f6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 128, height: 128, borderRadius: 9999 }}
                className="items-center justify-center"
              >
                <View className="w-20 h-20 rounded-full bg-black items-center justify-center">
                  <Image 
                    source={require('../../assets/logo.png')} 
                    style={{ width: 56, height: 56 }}
                    resizeMode="contain"
                  />
                </View>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Mini Player Controls */}
          <View className={`${isDark ? 'bg-gray-900/60' : 'bg-white/80'} rounded-3xl px-8 py-6 border ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
            {/* Progress bar */}
            <View className="mb-6">
              <View className={`h-1 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded-full w-64`}>
                <View className="h-1 bg-purple-500 rounded-full w-52" />
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>3:22</Text>
                <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>3:45</Text>
              </View>
            </View>

            {/* Control buttons */}
            <View className="flex-row items-center justify-between">
              <Shuffle size={20} color={isDark ? "#9ca3af" : "#6b7280"} strokeWidth={2} />
              <SkipBack size={24} color={isDark ? "#d1d5db" : "#9ca3af"} strokeWidth={2} />
              
              <Animated.View style={pulseStyle}>
                <View className="w-16 h-16 rounded-full bg-purple-600 items-center justify-center shadow-lg">
                  <Play size={28} color="#ffffff" strokeWidth={2} fill="#ffffff" />
                </View>
              </Animated.View>
              
              <SkipForward size={24} color={isDark ? "#d1d5db" : "#9ca3af"} strokeWidth={2} />
              <Repeat size={20} color={isDark ? "#9ca3af" : "#6b7280"} strokeWidth={2} />
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="items-center space-y-4 mb-8">
          <View className="flex-row items-center">
                                  
                                  <MaskedView
                                    maskElement={
                                      <Text className="text-3xl font-bold bg-transparent">
                                        Control
                                      </Text>
                                    }
                                  >
                                    <LinearGradient
                                      colors={['#a855f7', '#ec4899', '#3b82f6']}
                                      start={{ x: 0, y: 0 }}
                                      end={{ x: 1, y: 0 }}
                                    >
                                      <Text className="text-3xl font-bold opacity-0">
                                        Control
                                      </Text>
                                    </LinearGradient>
                                  </MaskedView>
                                  <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}> Your Music </Text>
                                </View>
          
          <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-base text-center leading-6 px-4`}>
            Play, pause, seek, repeat, shuffle — with a sleek mini-player and full-screen player.
          </Text>
          
          <Text className={`${isDark ? 'text-purple-400' : 'text-purple-600'} text-sm text-center font-medium mt-2`}>
            Total control. Smooth experience.
          </Text>
        </View>
      </View>
      </LinearGradient>
    </View>
  );
}
