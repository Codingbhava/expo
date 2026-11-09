import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { Search, TrendingUp, Music, Mic } from 'lucide-react-native';

export default function SearchScreen() {
  const { isDark, themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const trendingSearches = [
    'Arijit Singh',
    'Latest Bollywood',
    'Workout Mix',
    'Chill Vibes',
    'Party Hits',
    'Romantic Songs',
  ];

  const genres = [
    { id: 1, name: 'Pop', useTheme: 'primary' },
    { id: 2, name: 'Rock', useTheme: 'secondary' },
    { id: 3, name: 'Hip Hop', useTheme: 'accent' },
    { id: 4, name: 'Classical', useTheme: 'primary' },
    { id: 5, name: 'Jazz', useTheme: 'secondary' },
    { id: 6, name: 'Electronic', useTheme: 'accent' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-4 pt-2 pb-4">
          <Text className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Search
          </Text>

          {/* Search Bar */}
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 9999,
              backgroundColor: isDark ? themeColors.primary + '20' : themeColors.primary + '10',
              borderWidth: 1,
              borderColor: isDark ? themeColors.primary + '30' : themeColors.primary + '20',
            }}
          >
            <Search size={20} color={themeColors.primary} />
            <TextInput
              placeholder="What do you want to listen to?"
              placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className={`flex-1 ml-3 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
            />
            <Mic size={20} color={themeColors.primary} />
          </View>
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Trending Searches */}
          <View className="mb-6">
            <View className="flex-row items-center mb-4">
              <TrendingUp size={20} color={themeColors.primary} />
              <Text className={`text-lg font-bold ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Trending Searches
              </Text>
            </View>
            {trendingSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                className="flex-row items-center py-3"
              >
                <Search size={18} color={themeColors.secondary} />
                <Text className={`ml-3 text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {search}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Browse Genres */}
          <View className="mb-6">
            <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Browse Genres
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {genres.map((genre) => {
                const genreColor = genre.useTheme === 'primary' ? themeColors.primary : genre.useTheme === 'secondary' ? themeColors.secondary : themeColors.accent;
                return (
                <TouchableOpacity
                  key={genre.id}
                  activeOpacity={0.8}
                  className="w-[48%] mb-4 rounded-xl overflow-hidden"
                  style={{ height: 100, backgroundColor: genreColor }}
                >
                  <View className="flex-1 p-4 justify-end">
                    <Music size={32} color="#ffffff" strokeWidth={2} />
                    <Text className="text-white text-lg font-bold mt-2">
                      {genre.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
