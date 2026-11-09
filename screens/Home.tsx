import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { Bell, Search, Music, Play, MoreVertical, Home as HomeIcon, Library, Settings } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import SearchScreen from './SearchScreen';
import LibraryScreen from './LibraryScreen';
import SettingsScreen from './SettingsScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Home() {
  const { isDark, themeColors } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  const musicChips = [
    { id: 1, title: 'Podcasts' },
    { id: 2, title: 'Relax' },
    { id: 3, title: 'Sleep' },
    { id: 4, title: 'Feel good' },
    { id: 5, title: 'Sad' },
    { id: 6, title: 'Romance' },
    { id: 7, title: 'Workout' },
    { id: 8, title: 'Party' },
    { id: 9, title: 'Focus' },
    { id: 10, title: 'Chill' },
    { id: 11, title: 'Energize' },
    { id: 12, title: 'Commute' },
  ];

  const quickPicks = [
    {
      id: 1,
      title: 'Shararat (From "Dhurandhar")',
      artist: 'Shashwat Sachdev, Madhubanti B...',
      thumbnail: 'https://picsum.photos/120/120?random=1',
    },
    {
      id: 2,
      title: 'Aaja Hulchal Karenge (From the M...',
      artist: 'Afsana Khan & Ajay Kumar • 2.3M...',
      thumbnail: 'https://picsum.photos/120/120?random=2',
    },
    {
      id: 3,
      title: 'Rehman Dakait Entry (Balochi Ara...',
      artist: 'VDJ Mahe • 2.1M plays',
      thumbnail: 'https://picsum.photos/120/120?random=3',
    },
    {
      id: 4,
      title: 'Pal Pal (with Talwinder)',
      artist: 'Afsafe, Talwinder & AliSoomroMu...',
      thumbnail: 'https://picsum.photos/120/120?random=4',
    },
    {
      id: 5,
      title: 'Kesariya (From "Brahmastra")',
      artist: 'Arijit Singh • 5.2M plays',
      thumbnail: 'https://picsum.photos/120/120?random=5',
    },
    {
      id: 6,
      title: 'Apna Bana Le',
      artist: 'Arijit Singh • 3.8M plays',
      thumbnail: 'https://picsum.photos/120/120?random=6',
    },
    {
      id: 7,
      title: 'Tum Se Hi',
      artist: 'Mohit Chauhan • 4.5M plays',
      thumbnail: 'https://picsum.photos/120/120?random=7',
    },
    {
      id: 8,
      title: 'Chaleya (From "Jawan")',
      artist: 'Arijit Singh • 6.1M plays',
      thumbnail: 'https://picsum.photos/120/120?random=8',
    },
    {
      id: 9,
      title: 'Tere Vaaste',
      artist: 'Varun Jain • 2.9M plays',
      thumbnail: 'https://picsum.photos/120/120?random=9',
    },
    {
      id: 10,
      title: 'Raataan Lambiyan',
      artist: 'Tanishk Bagchi • 7.3M plays',
      thumbnail: 'https://picsum.photos/120/120?random=10',
    },
    {
      id: 11,
      title: 'Satranga',
      artist: 'Arijit Singh • 4.7M plays',
      thumbnail: 'https://picsum.photos/120/120?random=11',
    },
    {
      id: 12,
      title: 'Ve Kamleya',
      artist: 'Arijit Singh • 5.5M plays',
      thumbnail: 'https://picsum.photos/120/120?random=12',
    },
  ];

  const speedDial = [
    {
      id: 1,
      title: 'gravero',
      thumbnail: 'https://picsum.photos/150/150?random=5',
    },
    {
      id: 2,
      title: 'ANIMAL - Hi...',
      thumbnail: 'https://picsum.photos/150/150?random=6',
    },
    {
      id: 3,
      title: 'mix 1 2023',
      thumbnail: 'https://picsum.photos/150/150?random=7',
    },
    {
      id: 4,
      title: 'Chill Mix',
      thumbnail: 'https://picsum.photos/150/150?random=8',
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      {/* Render active screen based on tab */}
      {activeTab === 'home' && (
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-4 pt-2 pb-3">
          <View className="flex-row justify-between items-center">
            {/* Logo */}
            <View className="flex-row items-center">
              <Image 
                source={require('../assets/logo.png')} 
                style={{ width: 32, height: 32, marginRight: 8, tintColor: isDark ? undefined : '#000000' }}
                resizeMode="contain"
              />
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vibe
              </Text>
            </View>

            {/* Right Icons */}
            <View className="flex-row items-center gap-4">
              <TouchableOpacity activeOpacity={0.7}>
                <View className="relative">
                  <Bell size={24} color={isDark ? '#ffffff' : '#000000'} />
                  <View className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveTab('search')}>
                <Search size={24} color={isDark ? '#ffffff' : '#000000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Music Chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
            contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 32, gap: 8 }}
          >
            {musicChips.map((chip) => (
              <TouchableOpacity
                key={chip.id}
                activeOpacity={0.8}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: isDark ? themeColors.primary + '20' : themeColors.primary + '15',
                  borderWidth: 1,
                  borderColor: isDark ? themeColors.primary + '40' : themeColors.primary + '30',
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '500', color: isDark ? '#ffffff' : themeColors.primary }}>
                  {chip.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Picks Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center px-4 mb-4">
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick picks
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: '500', color: themeColors.primary }}>
                  Play all
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={SCREEN_WIDTH * 0.9}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {[0, 1, 2].map((colIndex) => (
                  <View key={colIndex} style={{ gap: 12, width: SCREEN_WIDTH * 0.9 }}>
                    {quickPicks.slice(colIndex * 4, colIndex * 4 + 4).map((song) => (
                      <TouchableOpacity
                        key={song.id}
                        activeOpacity={0.7}
                        style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center',
                        }}
                      >
                        {/* Thumbnail */}
                        <View className="w-14 h-14 rounded-md mr-3 overflow-hidden" style={{ backgroundColor: isDark ? themeColors.primary + '30' : themeColors.primary + '20' }}>
                          <View className="w-full h-full" style={{ backgroundColor: isDark ? themeColors.secondary + '40' : themeColors.secondary + '25' }} />
                        </View>

                        {/* Song Info */}
                        <View className="flex-1">
                          <Text 
                            className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            numberOfLines={1}
                          >
                            {song.title}
                          </Text>
                          <Text 
                            className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                            numberOfLines={1}
                          >
                            {song.artist}
                          </Text>
                        </View>

                        {/* More Options */}
                        <TouchableOpacity activeOpacity={0.7} className="p-2">
                          <MoreVertical size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Speed Dial Section */}
          <View className="mb-6">
            <View className="px-4 mb-4">
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Speed dial
              </Text>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="px-4"
              contentContainerStyle={{ gap: 12 }}
            >
              {speedDial.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  style={{ width: 120 }}
                >
                  <View className="w-full aspect-square rounded-md mb-2 overflow-hidden" style={{ backgroundColor: isDark ? themeColors.primary + '30' : themeColors.primary + '20' }}>
                    <View className="w-full h-full" style={{ backgroundColor: isDark ? themeColors.secondary + '40' : themeColors.secondary + '25' }} />
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text 
                      className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
                      numberOfLines={1}
                      style={{ flex: 1 }}
                    >
                      {item.title}
                    </Text>
                    <Play size={12} color={themeColors.primary} fill={themeColors.primary} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Additional Sections Placeholder */}
          <View className="px-4 mb-6">
            <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recommended for you
            </Text>
            <View 
              className={`rounded-2xl p-8 items-center justify-center ${
                isDark ? 'bg-white/5' : 'bg-gray-100'
              }`}
              style={{ minHeight: 150 }}
            >
              <Music size={40} color={themeColors.primary} strokeWidth={1.5} />
              <Text 
                className={`text-sm font-medium mt-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                More content loading...
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      )}

      {/* Search Screen */}
      {activeTab === 'search' && <SearchScreen />}

      {/* Library Screen */}
      {activeTab === 'library' && <LibraryScreen />}

      {/* Settings Screen */}
      {activeTab === 'settings' && <SettingsScreen />}

        {/* Bottom Navigation Bar */}
        <View 
          style={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: themeColors.background,
            borderTopWidth: 1,
            borderTopColor: isDark ? themeColors.primary + '20' : themeColors.primary + '15',
            paddingBottom: 8,
            paddingTop: 8,
          }}
        >
          <View className="flex-row justify-around items-center px-4">
            {/* Home */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('home')}
              className="items-center justify-center py-2 px-4"
            >
              <HomeIcon 
                size={24} 
                color={activeTab === 'home' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af')}
                fill={activeTab === 'home' ? themeColors.primary : 'none'}
              />
              <Text 
                className={`text-xs mt-1 font-medium`}
                style={{ color: activeTab === 'home' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af') }}
              >
                Home
              </Text>
            </TouchableOpacity>

            {/* Search */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('search')}
              className="items-center justify-center py-2 px-4"
            >
              <Search 
                size={24} 
                color={activeTab === 'search' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af')}
              />
              <Text 
                className={`text-xs mt-1 font-medium`}
                style={{ color: activeTab === 'search' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af') }}
              >
                Search
              </Text>
            </TouchableOpacity>

            {/* Library */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('library')}
              className="items-center justify-center py-2 px-4"
            >
              <Library 
                size={24} 
                color={activeTab === 'library' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af')}
              />
              <Text 
                className={`text-xs mt-1 font-medium`}
                style={{ color: activeTab === 'library' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af') }}
              >
                Library
              </Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setActiveTab('settings')}
              className="items-center justify-center py-2 px-4"
            >
              <Settings 
                size={24} 
                color={activeTab === 'settings' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af')}
              />
              <Text 
                className={`text-xs mt-1 font-medium`}
                style={{ color: activeTab === 'settings' ? themeColors.primary : (isDark ? '#6b7280' : '#9ca3af') }}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}
