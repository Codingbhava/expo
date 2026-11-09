import React from 'react';
import { Text, View, Pressable, Animated } from 'react-native';
import { useTheme } from '../lib/ThemeContext';
import { Sun, Moon } from 'lucide-react-native';

export default function ThemeToggle() {
  const { isDark, setTheme, themeColors } = useTheme();
  const slideAnim = React.useRef(new Animated.Value(isDark ? 0 : 1)).current;

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isDark ? 0 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [isDark]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });

  return (
    <View
      style={{
        backgroundColor: isDark ? themeColors.primary + '20' : themeColors.primary + '15',
        borderWidth: 1,
        borderColor: isDark ? themeColors.primary + '30' : themeColors.primary + '20',
      }}
      className="relative h-8 w-24 flex-row items-center rounded-full p-0.5"
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          backgroundColor: themeColors.primary,
        }}
        className="absolute left-0.5 h-7 w-[52px] rounded-full shadow-lg"
      />

      <Pressable
        onPress={() => setTheme('dark')}
        className="z-10 flex-1 flex-row items-center justify-center gap-1"
      >
        {isDark && (
          <Moon size={14} color='#ffffff' />
        )}
        {!isDark && (
          <Text style={{ color: isDark ? themeColors.accent : themeColors.secondary }} className="text-xs font-medium">
          Dark
        </Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => setTheme('light')}
        className="z-10 flex-1 flex-row items-center justify-center gap-1"
      >
        {!isDark && (
          <Sun size={14} color='#ffffff' />
        )}
        {isDark && (
          <Text
            style={{ color: isDark ? themeColors.secondary : themeColors.accent }}
            className="text-xs font-medium"
          >
            Light
          </Text>
        )}
      </Pressable>
    </View>
  );
}
