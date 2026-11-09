import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../lib/ThemeContext';
import { User, Moon, Bell, Download, Wifi, Lock, HelpCircle, Info, ChevronRight, Palette } from 'lucide-react-native';
import ThemeSelector from './ThemeSelector';
import ThemeToggle from '../components/ThemeToggle';
import { getThemeById, getAllThemes } from '../lib/colorThemes';

export default function SettingsScreen() {
  const { isDark, toggleTheme, colorScheme, themeColors, currentTheme: contextTheme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Try to find theme from static themes first, then from all themes (including ColorHunt)
  const currentTheme = contextTheme || getThemeById(colorScheme) || getAllThemes().find(t => t.id === colorScheme);
  const isColorHuntTheme = currentTheme?.source === 'colorhunt';
  
  // Extract code from ColorHunt theme ID (format: colorhunt-{code})
  const themeCode = isColorHuntTheme && currentTheme?.id?.startsWith('colorhunt-') 
    ? currentTheme.id.replace('colorhunt-', '').toUpperCase()
    : null;

  if (showThemeSelector) {
    return <ThemeSelector onBack={() => setShowThemeSelector(false)} />;
  }

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 1, icon: User, title: 'Profile', subtitle: 'Manage your profile', hasToggle: false },
        { id: 2, icon: Bell, title: 'Notifications', subtitle: 'Manage notifications', hasToggle: false },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 3, icon: Moon, title: 'Dark Mode', subtitle: isDark ? 'Dark theme enabled' : 'Light theme enabled', hasToggle: true, value: isDark, useCustomToggle: true },
        { id: 9, icon: Palette, title: 'Color Theme', subtitle: currentTheme?.name || 'Purple Classic', subtitle2: themeCode ? `Code: ${themeCode}` : undefined, hasToggle: false, isTheme: true },
        { id: 4, icon: Download, title: 'Download Quality', subtitle: 'High', hasToggle: false },
        { id: 5, icon: Wifi, title: 'Stream Quality', subtitle: 'Auto', hasToggle: false },
      ]
    },
    {
      title: 'Security',
      items: [
        { id: 6, icon: Lock, title: 'Privacy', subtitle: 'Manage privacy settings', hasToggle: false },
      ]
    },
    {
      title: 'About',
      items: [
        { id: 7, icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help', hasToggle: false },
        { id: 8, icon: Info, title: 'About', subtitle: 'Version 1.0.0', hasToggle: false },
      ]
    }
  ];
  const handleToggle = (itemId: number) => {
    if (itemId === 3) {
      toggleTheme();
    }
  };

  const handlePress = (item: any) => {
    if (item.isTheme) {
      setShowThemeSelector(true);
    } else if (!item.hasToggle) {
      console.log(`Navigate to ${item.title}`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="px-4 pt-2 pb-4">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </Text>
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-6">
              <Text className={`text-xs font-semibold mb-3 px-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {section.title}
              </Text>
              <View 
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  backgroundColor: isDark ? themeColors.primary + '10' : themeColors.primary + '08',
                  borderWidth: 1,
                  borderColor: isDark ? themeColors.primary + '20' : themeColors.primary + '15',
                }}
              >
                {section.items.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={0.7}
                      onPress={() => handlePress(item)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        borderBottomWidth: index !== section.items.length - 1 ? 1 : 0,
                        borderBottomColor: isDark ? themeColors.primary + '15' : themeColors.primary + '10',
                      }}
                    >
                      <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: themeColors.primary + (isDark ? '26' : '1A') }}>
                        <IconComponent size={20} color={themeColors.primary} strokeWidth={2} />
                      </View>
                      <View className="flex-1">
                        <Text className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </Text>
                        <Text className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.subtitle}
                        </Text>
                        {item.subtitle2 && (
                          <Text className={`text-xs mt-1 font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {item.subtitle2}
                          </Text>
                        )}
                      </View>
                      {item.hasToggle ? (
                        item.useCustomToggle ? (
                          <ThemeToggle />
                        ) : (
                          <Switch
                            value={item.value}
                            onValueChange={() => handleToggle(item.id)}
                            trackColor={{ false: '#767577', true: themeColors.primary }}
                            thumbColor={item.value ? '#ffffff' : '#f4f3f4'}
                          />
                        )
                      ) : (
                        <ChevronRight size={20} color={themeColors.secondary} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
