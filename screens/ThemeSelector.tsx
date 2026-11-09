import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { ChevronLeft, Check, Clock, Sparkles, TrendingUp, Trash2 } from 'lucide-react-native';
import { colorThemes, themeCategories, setColorHuntThemes, getAllThemes, ColorTheme } from '../lib/colorThemes';
import { 
  fetchColorHuntThemes, 
  getRecentThemes, 
  addRecentTheme,
  clearRecentThemes,
  ColorHuntTheme,
  COLORHUNT_TAGS 
} from '../lib/colorHuntAPI';

interface ThemeSelectorProps {
  onBack: () => void;
}

export default function ThemeSelector({ onBack }: ThemeSelectorProps) {
  const { isDark, colorScheme, changeColorScheme, themeColors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('classic');
  const [recentThemes, setRecentThemes] = useState<ColorTheme[]>([]);
  const [colorHuntThemesState, setColorHuntThemesState] = useState<ColorTheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'popular' | 'new' | 'random'>('popular');
  const [timeframe, setTimeframe] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadRecentThemes();
    if (selectedCategory === 'colorhunt') {
      // Reset and load first page
      setCurrentPage(0);
      setColorHuntThemesState([]);
      setHasMore(true);
      loadColorHuntThemes(0, true);
    }
  }, [selectedCategory, selectedTag, sortBy, timeframe]);

  const loadRecentThemes = async () => {
    const recent = await getRecentThemes();
    setRecentThemes(recent);
  };

  const loadColorHuntThemes = async (page: number = 0, reset: boolean = false) => {
    if (!hasMore && !reset) return;
    
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const themes: ColorHuntTheme[] = await fetchColorHuntThemes(
        page, 
        sortBy, 
        selectedTag as any, 
        timeframe
      );
      
      // If empty array, no more themes
      if (themes.length === 0) {
        setHasMore(false);
        return;
      }
      
      const convertedThemes = themes.map(t => ({
        ...t,
        category: 'colorhunt' as const,
      }));
      
      if (reset) {
        setColorHuntThemesState(convertedThemes);
      } else {
        setColorHuntThemesState(prev => [...prev, ...convertedThemes]);
      }
      
      setColorHuntThemes(convertedThemes);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to load ColorHunt themes:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreThemes = () => {
    if (!loadingMore && hasMore && selectedCategory === 'colorhunt') {
      loadColorHuntThemes(currentPage + 1, false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setCurrentPage(0);
    setHasMore(true);
    await loadColorHuntThemes(0, true);
    await loadRecentThemes();
    setRefreshing(false);
  };

  const handleThemeSelect = async (theme: ColorTheme) => {
    // Pass the full theme data for ColorHunt themes
    changeColorScheme(theme.id, theme.source === 'colorhunt' ? theme : null);
    await addRecentTheme(theme as any);
    await loadRecentThemes();
  };

  const handleClearRecent = async () => {
    await clearRecentThemes();
    await loadRecentThemes();
  };

  const filteredThemes = selectedCategory === 'colorhunt' 
    ? colorHuntThemesState 
    : colorThemes.filter(theme => theme.category === selectedCategory);

  const sortOptions = [
    { value: 'popular' as const, label: 'Popular', icon: '🔥' },
    { value: 'new' as const, label: 'New', icon: '✨' },
    { value: 'random' as const, label: 'Random', icon: '🎲' },
  ];

  const timeframeOptions = [
    { value: 7, label: 'This Week' },
    { value: 30, label: 'This Month' },
    { value: 90, label: '3 Months' },
    { value: 365, label: 'This Year' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onBack} style={{ marginRight: 16 }}>
            <ChevronLeft size={24} color={isDark ? '#ffffff' : '#000000'} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: isDark ? '#ffffff' : '#111827' }}>
            Color Themes
          </Text>
        </View>
        {selectedCategory === 'colorhunt' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Sparkles size={20} color={themeColors.primary} />
            <Text style={{ color: themeColors.primary, marginLeft: 4, fontWeight: '600' }}>
              {colorHuntThemesState.length}
            </Text>
          </View>
        )}
      </View>

      {/* Recent Themes Section */}
      {recentThemes.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Clock size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600',
                color: isDark ? '#9ca3af' : '#6b7280',
                marginLeft: 6
              }}>
                Recently Used
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClearRecent}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 5,
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
              }}
            >
              <Trash2 size={12} color="#ef4444" />
              <Text style={{ 
                fontSize: 12, 
                fontWeight: '600',
                color: '#ef4444',
                marginLeft: 4
              }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {recentThemes.slice(0, 10).map((theme) => (
              <TouchableOpacity
                key={theme.id}
                onPress={() => handleThemeSelect(theme)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  overflow: 'hidden',
                  borderWidth: colorScheme === theme.id ? 2 : 0,
                  borderColor: theme.colors.primary,
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '50%', height: '50%', backgroundColor: theme.colors.primary }} />
                  <View style={{ width: '50%', height: '50%', backgroundColor: theme.colors.secondary }} />
                  <View style={{ width: '50%', height: '50%', backgroundColor: theme.colors.accent }} />
                  <View style={{ width: '50%', height: '50%', backgroundColor: theme.colors.background.dark }} />
                </View>
                {colorScheme === theme.id && (
                  <View style={{
                    position: 'absolute',
                    top: 1,
                    right: 1,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 10,
                    padding: 4,
                  }}>
                    <Check size={10} color="#ffffff" strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Category Tabs */}
      <View style={{ marginBottom: 12 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 4 }}
        >
          {themeCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={{
                height: 32,
                paddingHorizontal: 12,
                borderRadius: 5,
                backgroundColor: selectedCategory === category.id ? themeColors.primary : (isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text 
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: selectedCategory === category.id ? '#ffffff' : (isDark ? '#ffffff' : '#111827')
                }}
              >
                {category.icon + ' ' + category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Theme Grid with Scrollable Filters */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={selectedCategory === 'colorhunt' ? [2] : undefined}
        onScroll={(e) => {
          if (selectedCategory === 'colorhunt') {
            const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
            if (isCloseToBottom) {
              loadMoreThemes();
            }
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          selectedCategory === 'colorhunt' ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={themeColors.primary} />
          ) : undefined
        }
      >
        {/* ColorHunt Filters - All Scrollable */}
        {selectedCategory === 'colorhunt' && (
          <View>
            {/* Sort Options */}
            <View style={{ marginBottom: 8 }}>
              <View style={{ paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: '600',
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}>
                  Sort By
                </Text>
              </View>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
              >
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setSortBy(option.value)}
                    style={{
                      height: 32,
                      paddingHorizontal: 12,
                      borderRadius: 5,
                      backgroundColor: sortBy === option.value 
                        ? themeColors.primary
                        : (isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text 
                      style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: sortBy === option.value ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280'),
                      }}
                    >
                      {option.icon + ' ' + option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Timeframe Options */}
            <View style={{ marginBottom: 8 }}>
              <View style={{ paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: '600',
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}>
                  Timeframe
                </Text>
              </View>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
              >
                {timeframeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setTimeframe(option.value)}
                    style={{
                      height: 32,
                      paddingHorizontal: 12,
                      borderRadius: 5,
                      backgroundColor: timeframe === option.value 
                        ? themeColors.primary + '40'
                        : (isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: timeframe === option.value ? 1 : 0,
                      borderColor: themeColors.primary,
                    }}
                  >
                    <Text 
                      style={{
                        fontSize: 12,
                        fontWeight: timeframe === option.value ? '600' : '500',
                        color: timeframe === option.value ? themeColors.primary : (isDark ? '#d1d5db' : '#6b7280'),
                      }}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Tags Filter - Scrollable */}
            <View style={{ marginBottom: 12 }}>
              <View style={{ paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: '600',
                  color: isDark ? '#9ca3af' : '#6b7280',
                }}>
                  Tags
                </Text>
                <TouchableOpacity 
                  onPress={() => setSelectedTag(undefined)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 5,
                    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                  }}
                >
                  <Trash2 size={12} color="#ef4444" />
                  <Text style={{ 
                    fontSize: 12, 
                    fontWeight: '600',
                    color: '#ef4444',
                    marginLeft: 4
                  }}>
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 4 }}
              >
                {COLORHUNT_TAGS.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    onPress={() => setSelectedTag(tag)}
                    style={{
                      height: 32,
                      paddingHorizontal: 12,
                      borderRadius: 5,
                      backgroundColor: selectedTag === tag 
                        ? themeColors.primary + '40'
                        : (isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: selectedTag === tag ? 1 : 0,
                      borderColor: themeColors.primary,
                    }}
                  >
                    <Text 
                      style={{
                        fontSize: 12,
                        fontWeight: selectedTag === tag ? '600' : '500',
                        color: selectedTag === tag ? themeColors.primary : (isDark ? '#d1d5db' : '#6b7280'),
                        textTransform: 'capitalize',
                      }}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Theme Grid Content */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        {loading ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={themeColors.primary} />
            <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', marginTop: 12 }}>
              Loading themes...
            </Text>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {filteredThemes.map((theme) => (
                <TouchableOpacity
                  key={theme.id}
                  activeOpacity={0.7}
                  onPress={() => handleThemeSelect(theme)}
                  style={{
                    width: '48%',
                    marginBottom: 16,
                    borderRadius: 5,
                    overflow: 'hidden',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#e5e7eb',
                    borderWidth: colorScheme === theme.id ? 2 : 0,
                    borderColor: theme.colors.primary,
                  }}
                >
                  {/* Color Preview */}
                  <View style={{ height: 100, flexDirection: 'row' }}>
                    <View 
                      style={{ 
                        flex: 1,
                        backgroundColor: theme.colors.primary 
                      }} 
                    />
                    <View 
                      style={{ 
                        flex: 1,
                        backgroundColor: theme.colors.secondary 
                      }} 
                    />
                    <View 
                      style={{ 
                        flex: 1,
                        backgroundColor: theme.colors.accent 
                      }} 
                    />
                    <View 
                      style={{ 
                        flex: 1,
                        backgroundColor: theme.colors.background.dark 
                      }} 
                    />
                  </View>

                  {/* Theme Info */}
                  <View style={{ padding: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text 
                        style={{
                          fontSize: 15,
                          fontWeight: '600',
                          color: isDark ? '#ffffff' : '#111827',
                          flex: 1,
                        }}
                        numberOfLines={1}
                      >
                        {theme.name}
                      </Text>
                      {colorScheme === theme.id && (
                        <View 
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: theme.colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 8,
                          }}
                        >
                          <Check size={14} color="#ffffff" strokeWidth={3} />
                        </View>
                      )}
                    </View>
                    <Text 
                      style={{
                        fontSize: 12,
                        color: isDark ? '#9ca3af' : '#6b7280',
                      }}
                      numberOfLines={2}
                    >
                      {theme.description}
                    </Text>
                    {theme.likes && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                        <TrendingUp size={12} color={themeColors.primary} />
                        <Text style={{ 
                          fontSize: 11, 
                          color: themeColors.primary, 
                          marginLeft: 4,
                          fontWeight: '600' 
                        }}>
                          {theme.likes.toLocaleString() + ' likes'}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
            ))}
          </View>
          
          {/* Loading More Indicator */}
          {loadingMore && selectedCategory === 'colorhunt' && (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={themeColors.primary} />
              <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', marginTop: 8, fontSize: 12 }}>
                Loading more themes...
              </Text>
            </View>
          )}
          
          {/* No More Themes */}
          {!hasMore && selectedCategory === 'colorhunt' && colorHuntThemesState.length > 0 && (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{ color: isDark ? '#6b7280' : '#9ca3af', fontSize: 12 }}>
                No more themes available
              </Text>
            </View>
          )}
          </>
        )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
