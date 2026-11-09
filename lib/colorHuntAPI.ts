// ColorHunt API Service
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ColorHuntPalette {
  code: string;
  likes: string;
  date: string;
  colors: string[]; // Array of 4 hex colors
}

export interface ColorHuntTheme {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'neon' | 'cultural' | 'nature' | 'elegant' | 'minimal' | 'colorhunt';
  tag?: string;
  likes: number;
  date: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: {
      light: string;
      dark: string;
    };
  };
  source: 'colorhunt' | 'custom';
}

export type SortType = 'popular' | 'new' | 'random';

export const COLORHUNT_TAGS = [
  'pastel', 'vintage', 'retro', 'neon', 'gold', 'light', 'dark',
  'warm', 'cold', 'summer', 'fall', 'winter', 'spring', 'happy',
  'nature', 'earth', 'night', 'space', 'rainbow', 'gradient',
  'sunset', 'sky', 'sea', 'kids', 'skin', 'food', 'cream',
  'coffee', 'wedding', 'christmas', 'halloween',
  'blue', 'teal', 'mint', 'green', 'sage', 'yellow', 'beige',
  'brown', 'orange', 'peach', 'red', 'maroon', 'pink', 'purple',
  'navy', 'black', 'grey', 'white'
] as const;

export type ColorHuntTag = typeof COLORHUNT_TAGS[number];

const RECENT_THEMES_KEY = '@recent_themes';
const MAX_RECENT_THEMES = 20;

/**
 * Parse color code into 4 hex colors
 * Example: "222831393e4600adb5eeeeee" -> ["#222831", "#393E46", "#00ADB5", "#EEEEEE"]
 */
function parseColorCode(code: string): string[] {
  const colors: string[] = [];
  for (let i = 0; i < 24; i += 6) {
    colors.push(`#${code.substring(i, i + 6).toUpperCase()}`);
  }
  return colors;
}

/**
 * Check if all 4 colors are different from each other
 */
function areColorsUnique(colors: string[]): boolean {
  const uniqueColors = new Set(colors.map(c => c.toUpperCase()));
  return uniqueColors.size === colors.length;
}

/**
 * Generate background colors based on palette
 */
function generateBackgrounds(colors: string[]): { light: string; dark: string } {
  // Use the lightest color for light background, darkest for dark background
  const sortedByBrightness = colors.map(color => ({
    color,
    brightness: getBrightness(color)
  })).sort((a, b) => b.brightness - a.brightness);

  return {
    light: sortedByBrightness[0].color,
    dark: sortedByBrightness[sortedByBrightness.length - 1].color
  };
}

/**
 * Calculate brightness of a hex color
 */
function getBrightness(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Calculate saturation of a hex color
 */
function getSaturation(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  return max === 0 ? 0 : delta / max;
}

/**
 * Generate appropriate light background based on primary color
 * Creates a very light, low-saturation version of the color
 */
function generateLightBackground(primaryColor: string): string {
  const hex = primaryColor.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Convert to HSL for better manipulation
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  // Create light background: very light (95-97%) and low saturation (5-15%)
  l = 0.96;
  s = Math.min(s * 0.15, 0.15);
  
  // Convert back to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };
  
  const [red, green, blue] = hslToRgb(h, s, l);
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`.toUpperCase();
}

/**
 * Generate appropriate dark background based on primary color
 * Creates a very dark, desaturated version with subtle hint of the color
 */
function generateDarkBackground(primaryColor: string): string {
  const hex = primaryColor.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Convert to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  // Create dark background: very dark (5-8%) and low saturation (10-20%)
  l = 0.06;
  s = Math.min(s * 0.3, 0.2);
  
  // Convert back to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };
  
  const [red, green, blue] = hslToRgb(h, s, l);
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`.toUpperCase();
}

/**
 * Generate a readable name based on colors
 */
function generateThemeName(colors: string[], tag?: string): string {
  const colorNames = colors.map(getColorName);
  if (tag) {
    return `${tag.charAt(0).toUpperCase() + tag.slice(1)} ${colorNames[0]}`;
  }
  return `${colorNames[0]} ${colorNames[1]}`;
}

/**
 * Get a simple color name from hex
 */
function getColorName(hex: string): string {
  const colorMap: { [key: string]: string } = {
    'FF': 'Red', 'F0': 'Red', 'E0': 'Orange', 'FF8': 'Orange',
    'FFA': 'Yellow', 'FFD': 'Yellow', 'FF0': 'Yellow',
    '0F0': 'Green', '0E0': 'Green', '0D0': 'Green',
    '00F': 'Blue', '00A': 'Blue', '008': 'Blue',
    'F0F': 'Purple', 'E0E': 'Purple', 'D0D': 'Purple',
    'FFF': 'White', 'EEE': 'White', 'DDD': 'Gray',
    '000': 'Black', '111': 'Black', '222': 'Dark',
  };

  const shortened = hex.substring(1, 4).toUpperCase();
  return colorMap[shortened] || 'Color';
}

/**
 * Convert ColorHunt palette to our theme format
 */
function convertToTheme(palette: ColorHuntPalette, tag?: string, sort?: SortType): ColorHuntTheme {
  const rawColors = parseColorCode(palette.code);
  
  // Sort colors by brightness (light to dark)
  const sortedColors = rawColors.map(color => ({
    color,
    brightness: getBrightness(color)
  })).sort((a, b) => b.brightness - a.brightness).map(item => item.color);
  
  // Assign colors based on brightness and suitability:
  // We want vibrant, mid-tone colors for primary/secondary/accent
  // Find the most suitable colors (not too light, not too dark)
  const colorAnalysis = sortedColors.map(color => ({
    color,
    brightness: getBrightness(color),
    saturation: getSaturation(color)
  }));
  
  // Filter colors suitable for UI elements (brightness between 30-220, good saturation)
  const suitableForUI = colorAnalysis
    .filter(c => c.brightness >= 30 && c.brightness <= 220)
    .sort((a, b) => b.saturation - a.saturation); // Prefer more saturated colors
  
  // Assign colors
  const primary = suitableForUI[0]?.color || sortedColors[1]; // Most saturated suitable color
  const secondary = suitableForUI[1]?.color || sortedColors[2]; // Second most saturated
  const accent = suitableForUI[2]?.color || sortedColors[0]; // Third, or fallback to lightest
  
  // Generate appropriate light and dark backgrounds based on primary color
  const lightBg = generateLightBackground(primary);
  const darkBg = generateDarkBackground(primary);
  
  const colors = {
    primary,
    secondary,
    accent,
    background: {
      light: lightBg,
      dark: darkBg,
    },
  };

  return {
    id: `ch_${palette.code}`,
    name: generateThemeName(sortedColors, tag),
    description: `${palette.likes} likes • ${palette.date}`,
    category: 'colorhunt',
    tag,
    likes: parseInt(palette.likes.replace(/,/g, '')),
    date: palette.date,
    colors,
    source: 'colorhunt',
  };
}

/**
 * Fetch themes from ColorHunt API
 */
export async function fetchColorHuntThemes(
  page: number = 1,
  sort: SortType = 'popular',
  tag?: ColorHuntTag,
  timeframe: number = 30
): Promise<ColorHuntTheme[]> {
  try {
    const formData = new URLSearchParams();
    formData.append('step', page.toString());
    formData.append('sort', sort);
    if (tag) {
      formData.append('tags', tag);
    }
    formData.append('timeframe', timeframe.toString());

    const response = await fetch('https://colorhunt.co/php/feed.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ColorHuntPalette[] = await response.json();
    
    // Filter to only include themes with unique colors
    return data
      .filter(palette => {
        const colors = parseColorCode(palette.code);
        return areColorsUnique(colors);
      })
      .map(palette => convertToTheme(palette, tag, sort));
  } catch (error) {
    console.error('Error fetching ColorHunt themes:', error);
    return [];
  }
}

/**
 * Fetch themes by multiple tags
 */
export async function fetchThemesByTags(
  tags: ColorHuntTag[],
  sort: SortType = 'popular',
  limit: number = 10
): Promise<ColorHuntTheme[]> {
  try {
    const promises = tags.map(tag => 
      fetchColorHuntThemes(1, sort, tag, 30)
    );
    
    const results = await Promise.all(promises);
    const allThemes = results.flat();
    
    // Remove duplicates and sort by likes
    const uniqueThemes = Array.from(
      new Map(allThemes.map(theme => [theme.id, theme])).values()
    );
    
    return uniqueThemes
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching themes by tags:', error);
    return [];
  }
}

/**
 * Get recent themes from storage
 */
export async function getRecentThemes(): Promise<ColorHuntTheme[]> {
  try {
    const data = await AsyncStorage.getItem(RECENT_THEMES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading recent themes:', error);
    return [];
  }
}

/**
 * Add theme to recent themes
 */
export async function addRecentTheme(theme: ColorHuntTheme): Promise<void> {
  try {
    const recent = await getRecentThemes();
    
    // Remove if already exists
    const filtered = recent.filter(t => t.id !== theme.id);
    
    // Add to beginning
    const updated = [theme, ...filtered].slice(0, MAX_RECENT_THEMES);
    
    await AsyncStorage.setItem(RECENT_THEMES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recent theme:', error);
  }
}

/**
 * Clear recent themes
 */
export async function clearRecentThemes(): Promise<void> {
  try {
    await AsyncStorage.removeItem(RECENT_THEMES_KEY);
  } catch (error) {
    console.error('Error clearing recent themes:', error);
  }
}

/**
 * Get curated theme collections
 */
export async function getCuratedCollections() {
  return {
    trending: await fetchColorHuntThemes(1, 'popular', undefined, 7),
    pastel: await fetchColorHuntThemes(1, 'popular', 'pastel', 30),
    dark: await fetchColorHuntThemes(1, 'popular', 'dark', 30),
    neon: await fetchColorHuntThemes(1, 'popular', 'neon', 30),
    nature: await fetchColorHuntThemes(1, 'popular', 'nature', 30),
    sunset: await fetchColorHuntThemes(1, 'popular', 'sunset', 30),
    winter: await fetchColorHuntThemes(1, 'popular', 'winter', 30),
  };
}

/**
 * Search themes by keyword (searches multiple tags)
 */
export async function searchThemes(keyword: string): Promise<ColorHuntTheme[]> {
  const matchingTags = COLORHUNT_TAGS.filter(tag => 
    tag.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (matchingTags.length === 0) {
    return [];
  }
  
  return fetchThemesByTags(matchingTags.slice(0, 3), 'popular', 20);
}
