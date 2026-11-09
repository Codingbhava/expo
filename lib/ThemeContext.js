import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeById, getAllThemes } from './colorThemes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('dark'); // 'light' or 'dark' only
  const [colorScheme, setColorScheme] = useState('purple'); // theme id
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme-preference');
      const savedColorScheme = await AsyncStorage.getItem('color-scheme');
      const savedColorHuntTheme = await AsyncStorage.getItem('colorhunt-theme-data');
      
      if (savedTheme) {
        setThemeMode(savedTheme);
      } else {
        // Set default to dark if no saved preference
        setThemeMode('dark');
      }
      
      if (savedColorScheme) {
        setColorScheme(savedColorScheme);
      }
      
      // Load saved ColorHunt theme data if exists
      if (savedColorHuntTheme) {
        try {
          const themeData = JSON.parse(savedColorHuntTheme);
          // Import dynamically to avoid circular dependency
          const { setColorHuntThemes, getColorHuntThemes } = require('./colorThemes');
          const existingThemes = getColorHuntThemes();
          // Add the saved theme if not already present
          if (!existingThemes.find(t => t.id === themeData.id)) {
            setColorHuntThemes([themeData, ...existingThemes]);
          }
        } catch (e) {
          console.error('Failed to parse saved ColorHunt theme:', e);
        }
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode, scheme, themeData = null) => {
    try {
      await AsyncStorage.setItem('theme-preference', mode);
      await AsyncStorage.setItem('color-scheme', scheme);
      
      // Save ColorHunt theme data if provided
      if (themeData && themeData.source === 'colorhunt') {
        await AsyncStorage.setItem('colorhunt-theme-data', JSON.stringify(themeData));
      }
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const setTheme = (mode) => {
    if (['light', 'dark'].includes(mode)) {
      setThemeMode(mode);
      saveThemePreference(mode, colorScheme);
    }
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setTheme(newMode);
  };

  const changeColorScheme = (schemeId, themeData = null) => {
    setColorScheme(schemeId);
    saveThemePreference(themeMode, schemeId, themeData);
  };

  const isDark = themeMode === 'dark';
  
  // Try to find theme from all available themes (custom + ColorHunt)
  let currentTheme = getThemeById(colorScheme);
  
  // If not found in static themes, try ColorHunt themes
  if (!currentTheme) {
    const allThemes = getAllThemes();
    currentTheme = allThemes.find(t => t.id === colorScheme);
  }
  
  // Get theme colors based on mode
  const themeColors = currentTheme ? {
    primary: currentTheme.colors.primary,
    secondary: currentTheme.colors.secondary,
    accent: currentTheme.colors.accent,
    background: isDark ? currentTheme.colors.background.dark : currentTheme.colors.background.light,
  } : {
    primary: '#a855f7',
    secondary: '#9333ea',
    accent: '#ec4899',
    background: isDark ? '#0a0e27' : '#ffffff',
  };

  const value = {
    themeMode, // 'light' or 'dark'
    isDark,
    isLight: !isDark,
    setTheme,
    toggleTheme,
    colorScheme,
    changeColorScheme,
    themeColors,
    currentTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
