import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { Heart, Music, Clock, ListMusic, Plus, Download } from 'lucide-react-native';

export default function LibraryScreen() {
  const { isDark, themeColors } = useTheme();

  const libraryItems = [
    { id: 1, icon: Heart, title: 'Liked Songs', count: '247 songs', color: themeColors.primary },
    { id: 2, icon: Clock, title: 'Recently Played', count: '86 songs', color: themeColors.secondary },
    { id: 3, icon: Download, title: 'Downloads', count: '124 songs', color: themeColors.accent },
    { id: 4, icon: ListMusic, title: 'Playlists', count: '12 playlists', color: themeColors.primary },
  ];

  const playlists = [
    { id: 1, name: 'My Favorites', songs: 45, color: themeColors.primary },
    { id: 2, name: 'Chill Vibes', songs: 32, color: themeColors.secondary },
    { id: 3, name: 'Workout Mix', songs: 28, color: themeColors.accent },
    { id: 4, name: 'Study Sessions', songs: 56, color: themeColors.primary },
    { id: 5, name: 'Party Time', songs: 41, color: themeColors.accent },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-4 pt-2 pb-4">
          <View className="flex-row justify-between items-center">
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Library
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                padding: 8,
                borderRadius: 9999,
                backgroundColor: isDark ? themeColors.primary + '20' : themeColors.primary + '15',
              }}
            >
              <Plus size={24} color={themeColors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Quick Access */}
          <View className="mb-6">
            {libraryItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  className="flex-row items-center mb-4"
                >
                  <View
                    className="w-14 h-14 rounded-lg items-center justify-center mr-4"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent size={28} color="#ffffff" strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </Text>
                    <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Playlists */}
          <View className="mb-6">
            <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Playlists
            </Text>
            {playlists.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                activeOpacity={0.7}
                className="flex-row items-center mb-4"
              >
                <View
                  className="w-14 h-14 rounded-lg items-center justify-center mr-4"
                  style={{ backgroundColor: playlist.color }}
                >
                  <Music size={24} color="#ffffff" strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {playlist.name}
                  </Text>
                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {playlist.songs} songs
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
