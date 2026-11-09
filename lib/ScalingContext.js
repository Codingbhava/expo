import React, { createContext, useContext } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';

const ScalingContext = createContext();

// Base dimensions - iPhone 14 Pro as reference
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate scale factors
const widthScale = SCREEN_WIDTH / BASE_WIDTH;
const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;

/**
 * Normalize size based on screen width
 * This ensures consistent sizing across different screen sizes
 * @param {number} size - The size to normalize
 * @returns {number} - Normalized size
 */
export const normalize = (size) => {
  const newSize = size * widthScale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

/**
 * Scale horizontally based on screen width
 */
export const scaleWidth = (size) => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Scale vertically based on screen height
 */
export const scaleHeight = (size) => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Scale based on smaller dimension to maintain aspect ratio
 */
export const scaleModerate = (size, factor = 0.5) => {
  return size + (normalize(size) - size) * factor;
};

/**
 * Get responsive font size that ignores system font scaling
 */
export const getFontSize = (size) => {
  const scale = Math.min(widthScale, heightScale);
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Get spacing value
 */
export const getSpacing = (size) => {
  return normalize(size);
};

/**
 * Get icon size
 */
export const getIconSize = (size) => {
  return normalize(size);
};

// Predefined sizes
export const spacing = {
  xs: getSpacing(4),
  sm: getSpacing(8),
  md: getSpacing(16),
  lg: getSpacing(24),
  xl: getSpacing(32),
  xxl: getSpacing(48),
};

export const fontSize = {
  xs: getFontSize(10),
  sm: getFontSize(12),
  base: getFontSize(14),
  md: getFontSize(16),
  lg: getFontSize(18),
  xl: getFontSize(20),
  '2xl': getFontSize(24),
  '3xl': getFontSize(30),
  '4xl': getFontSize(36),
  '5xl': getFontSize(48),
};

export const iconSize = {
  xs: getIconSize(16),
  sm: getIconSize(20),
  md: getIconSize(24),
  lg: getIconSize(32),
  xl: getIconSize(48),
  xxl: getIconSize(64),
  xxxl: getIconSize(96),
};

export function ScalingProvider({ children }) {
  const value = {
    normalize,
    scaleWidth,
    scaleHeight,
    scaleModerate,
    getFontSize,
    getSpacing,
    getIconSize,
    spacing,
    fontSize,
    iconSize,
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
  };

  return (
    <ScalingContext.Provider value={value}>
      {children}
    </ScalingContext.Provider>
  );
}

export function useScaling() {
  const context = useContext(ScalingContext);
  if (!context) {
    throw new Error('useScaling must be used within ScalingProvider');
  }
  return context;
}
