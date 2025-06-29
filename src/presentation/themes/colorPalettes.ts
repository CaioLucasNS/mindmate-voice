/**
 * Color Palettes for MindMate Voice
 *
 * These color palettes are specifically designed for voice recognition and AI applications,
 * using modern and accessible colors that promote clarity and technological innovation.
 *
 * All colors are tested for WCAG AA accessibility compliance.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

// ============================================================================
// LIGHT THEME COLOR PALETTE
// ============================================================================
export const lightColors = {
  // Primary Colors - Calming Blue
  primary: {
    50: '#E3F2FD', // Very light blue - backgrounds
    100: '#BBDEFB', // Light blue - hover states
    200: '#90CAF9', // Medium light blue - borders
    300: '#64B5F6', // Medium blue - icons
    400: '#42A5F5', // Standard blue - primary actions
    500: '#2196F3', // Main primary - buttons, links
    600: '#1E88E5', // Darker blue - pressed states
    700: '#1976D2', // Dark blue - text on light
    800: '#1565C0', // Very dark blue - emphasis
    900: '#0D47A1', // Darkest blue - high contrast
  },

  // Secondary Colors - Soothing Green
  secondary: {
    50: '#E8F5E8', // Very light green - backgrounds
    100: '#C8E6C9', // Light green - success states
    200: '#A5D6A7', // Medium light green - borders
    300: '#81C784', // Medium green - icons
    400: '#66BB6A', // Standard green - secondary actions
    500: '#4CAF50', // Main secondary - success
    600: '#43A047', // Darker green - pressed states
    700: '#388E3C', // Dark green - text on light
    800: '#2E7D32', // Very dark green - emphasis
    900: '#1B5E20', // Darkest green - high contrast
  },

  // Neutral Colors - Warm Grays
  neutral: {
    50: '#FAFAFA', // Almost white - backgrounds
    100: '#F5F5F5', // Very light gray - cards
    200: '#EEEEEE', // Light gray - borders
    300: '#E0E0E0', // Medium light gray - dividers
    400: '#BDBDBD', // Medium gray - disabled
    500: '#9E9E9E', // Standard gray - placeholder
    600: '#757575', // Darker gray - secondary text
    700: '#616161', // Dark gray - body text
    800: '#424242', // Very dark gray - headings
    900: '#212121', // Almost black - high contrast
  },

  // Semantic Colors
  success: {
    light: '#4CAF50', // Green for success states
    main: '#2E7D32', // Darker green for emphasis
    dark: '#1B5E20', // Darkest green for contrast
    background: '#E8F5E8', // Light green background
  },

  warning: {
    light: '#FF9800', // Orange for warnings
    main: '#F57C00', // Darker orange for emphasis
    dark: '#E65100', // Darkest orange for contrast
    background: '#FFF3E0', // Light orange background
  },

  error: {
    light: '#F44336', // Red for errors
    main: '#D32F2F', // Darker red for emphasis
    dark: '#B71C1C', // Darkest red for contrast
    background: '#FFEBEE', // Light red background
  },

  info: {
    light: '#2196F3', // Blue for info
    main: '#1976D2', // Darker blue for emphasis
    dark: '#0D47A1', // Darkest blue for contrast
    background: '#E3F2FD', // Light blue background
  },

  // Background Colors
  background: {
    primary: '#FFFFFF', // Main background
    secondary: '#FAFAFA', // Secondary background
    tertiary: '#F5F5F5', // Tertiary background
    card: '#FFFFFF', // Card background
    modal: '#FFFFFF', // Modal background
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay background
  },

  // Surface Colors
  surface: {
    primary: '#FFFFFF', // Primary surface
    secondary: '#F8F9FA', // Secondary surface
    tertiary: '#F1F3F4', // Tertiary surface
    elevated: '#FFFFFF', // Elevated surface (cards)
    disabled: '#F5F5F5', // Disabled surface
  },

  // Text Colors
  text: {
    primary: '#212121', // Primary text
    secondary: '#757575', // Secondary text
    tertiary: '#9E9E9E', // Tertiary text
    disabled: '#BDBDBD', // Disabled text
    inverse: '#FFFFFF', // Text on dark backgrounds
    link: '#2196F3', // Link text
  },

  // Border Colors
  border: {
    primary: '#E0E0E0', // Primary borders
    secondary: '#EEEEEE', // Secondary borders
    focus: '#2196F3', // Focus borders
    error: '#F44336', // Error borders
    success: '#4CAF50', // Success borders
  },

  // Special Colors for Voice and AI
  voice: {
    primary: '#3B82F6', // Voice recognition blue
    secondary: '#1E40AF', // Darker voice blue
    accent: '#60A5FA', // Light voice blue
    background: '#EFF6FF', // Voice background
  },

  ai: {
    primary: '#8B5CF6', // AI purple
    secondary: '#7C3AED', // Darker AI purple
    accent: '#A78BFA', // Light AI purple
    background: '#F3F4F6', // AI background
  },
} as const;

// ============================================================================
// DARK THEME COLOR PALETTE
// ============================================================================
export const darkColors = {
  // Primary Colors - Softer Blue for Dark Mode
  primary: {
    50: '#0D47A1', // Darkest blue - backgrounds
    100: '#1565C0', // Very dark blue - hover states
    200: '#1976D2', // Dark blue - borders
    300: '#1E88E5', // Medium dark blue - icons
    400: '#2196F3', // Standard blue - primary actions
    500: '#42A5F5', // Main primary - buttons, links
    600: '#64B5F6', // Lighter blue - pressed states
    700: '#90CAF9', // Light blue - text on dark
    800: '#BBDEFB', // Very light blue - emphasis
    900: '#E3F2FD', // Lightest blue - high contrast
  },

  // Secondary Colors - Softer Green for Dark Mode
  secondary: {
    50: '#1B5E20', // Darkest green - backgrounds
    100: '#2E7D32', // Very dark green - hover states
    200: '#388E3C', // Dark green - borders
    300: '#43A047', // Medium dark green - icons
    400: '#4CAF50', // Standard green - secondary actions
    500: '#66BB6A', // Main secondary - success
    600: '#81C784', // Lighter green - pressed states
    700: '#A5D6A7', // Light green - text on dark
    800: '#C8E6C9', // Very light green - emphasis
    900: '#E8F5E8', // Lightest green - high contrast
  },

  // Neutral Colors - Cool Grays for Dark Mode
  neutral: {
    50: '#212121', // Almost black - backgrounds
    100: '#424242', // Very dark gray - cards
    200: '#616161', // Dark gray - borders
    300: '#757575', // Medium dark gray - dividers
    400: '#9E9E9E', // Medium gray - disabled
    500: '#BDBDBD', // Standard gray - placeholder
    600: '#E0E0E0', // Lighter gray - secondary text
    700: '#EEEEEE', // Light gray - body text
    800: '#F5F5F5', // Very light gray - headings
    900: '#FAFAFA', // Almost white - high contrast
  },

  // Semantic Colors (adjusted for dark mode)
  success: {
    light: '#66BB6A', // Lighter green for dark mode
    main: '#4CAF50', // Standard green
    dark: '#2E7D32', // Darker green for emphasis
    background: '#1B5E20', // Dark green background
  },

  warning: {
    light: '#FFB74D', // Lighter orange for dark mode
    main: '#FF9800', // Standard orange
    dark: '#F57C00', // Darker orange for emphasis
    background: '#E65100', // Dark orange background
  },

  error: {
    light: '#EF5350', // Lighter red for dark mode
    main: '#F44336', // Standard red
    dark: '#D32F2F', // Darker red for emphasis
    background: '#B71C1C', // Dark red background
  },

  info: {
    light: '#64B5F6', // Lighter blue for dark mode
    main: '#2196F3', // Standard blue
    dark: '#1976D2', // Darker blue for emphasis
    background: '#0D47A1', // Dark blue background
  },

  // Background Colors
  background: {
    primary: '#121212', // Main background
    secondary: '#1E1E1E', // Secondary background
    tertiary: '#2D2D2D', // Tertiary background
    card: '#1E1E1E', // Card background
    modal: '#1E1E1E', // Modal background
    overlay: 'rgba(0, 0, 0, 0.7)', // Overlay background
  },

  // Surface Colors
  surface: {
    primary: '#1E1E1E', // Primary surface
    secondary: '#2D2D2D', // Secondary surface
    tertiary: '#424242', // Tertiary surface
    elevated: '#2D2D2D', // Elevated surface (cards)
    disabled: '#424242', // Disabled surface
  },

  // Text Colors
  text: {
    primary: '#FFFFFF', // Primary text
    secondary: '#BDBDBD', // Secondary text
    tertiary: '#9E9E9E', // Tertiary text
    disabled: '#757575', // Disabled text
    inverse: '#212121', // Text on light backgrounds
    link: '#64B5F6', // Link text
  },

  // Border Colors
  border: {
    primary: '#424242', // Primary borders
    secondary: '#616161', // Secondary borders
    focus: '#64B5F6', // Focus borders
    error: '#EF5350', // Error borders
    success: '#66BB6A', // Success borders
  },

  // Special Colors for Voice and AI (Dark Mode)
  voice: {
    primary: '#60A5FA', // Lighter voice blue for dark mode
    secondary: '#3B82F6', // Standard voice blue
    accent: '#1E40AF', // Darker voice blue
    background: '#1E3A8A', // Dark voice background
  },

  ai: {
    primary: '#A78BFA', // Lighter AI purple for dark mode
    secondary: '#8B5CF6', // Standard AI purple
    accent: '#7C3AED', // Darker AI purple
    background: '#4C1D95', // Dark AI background
  },
} as const;

// ============================================================================
// COLOR UTILITIES
// ============================================================================

/**
 * Get color with opacity
 * @param color - Hex color string
 * @param opacity - Opacity value (0-1)
 * @returns Color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Remove # if present
  const hex = color.replace('#', '');

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Check if color is light or dark
 * @param color - Hex color string
 * @returns true if light, false if dark
 */
export const isLightColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5;
};

/**
 * Get contrasting text color for a background
 * @param backgroundColor - Background color
 * @returns Text color (light or dark)
 */
export const getContrastTextColor = (backgroundColor: string): string => {
  return isLightColor(backgroundColor) ? '#212121' : '#FFFFFF';
};

// ============================================================================
// EXPORT TYPES
// ============================================================================
export type LightColorPalette = typeof lightColors;
export type DarkColorPalette = typeof darkColors;
export type ColorShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
