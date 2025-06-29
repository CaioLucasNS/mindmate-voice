/**
 * Custom Hook for Theme Colors
 *
 * This hook provides type-safe access to all theme colors and design tokens,
 * including custom colors for voice recognition and AI applications.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import { useTheme } from 'react-native-paper';
import { useThemeApp } from '@/shared/contexts/ThemeContext';
import { lightColors, darkColors } from './colorPalettes';
import { designTokens } from './designTokens';

/**
 * Extended theme interface with custom colors
 */
interface ExtendedTheme {
  // Standard MD3 colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;

  // Custom voice and AI colors
  voice: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };

  ai: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };

  // Semantic colors
  success: {
    light: string;
    main: string;
    dark: string;
    background: string;
  };
  warning: {
    light: string;
    main: string;
    dark: string;
    background: string;
  };
  info: {
    light: string;
    main: string;
    dark: string;
    background: string;
  };

  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    link: string;
  };

  // Border colors
  border: {
    primary: string;
    secondary: string;
    focus: string;
    error: string;
    success: string;
  };

  // Design tokens
  designTokens: typeof designTokens;
  spacing: typeof designTokens.spacing;
  shadows: typeof designTokens.shadows;
  borderRadius: typeof designTokens.borderRadius;
  layout: typeof designTokens.layout;
  accessibility: typeof designTokens.accessibility;
}

/**
 * Custom hook to access theme colors and design tokens
 * @returns Extended theme with all colors and design tokens
 */
export const useThemeColors = (): ExtendedTheme => {
  const { isDarkTheme } = useThemeApp();
  const theme = useTheme();

  // Get the appropriate color palette based on theme
  const colorPalette = isDarkTheme ? darkColors : lightColors;

  return {
    // Standard MD3 colors from theme
    primary: theme.colors.primary,
    onPrimary: theme.colors.onPrimary,
    primaryContainer: theme.colors.primaryContainer,
    onPrimaryContainer: theme.colors.onPrimaryContainer,
    secondary: theme.colors.secondary,
    onSecondary: theme.colors.onSecondary,
    secondaryContainer: theme.colors.secondaryContainer,
    onSecondaryContainer: theme.colors.onSecondaryContainer,
    tertiary: theme.colors.tertiary,
    onTertiary: theme.colors.onTertiary,
    tertiaryContainer: theme.colors.tertiaryContainer,
    onTertiaryContainer: theme.colors.onTertiaryContainer,
    background: theme.colors.background,
    onBackground: theme.colors.onBackground,
    surface: theme.colors.surface,
    onSurface: theme.colors.onSurface,
    surfaceVariant: theme.colors.surfaceVariant,
    onSurfaceVariant: theme.colors.onSurfaceVariant,
    error: theme.colors.error,
    onError: theme.colors.onError,
    errorContainer: theme.colors.errorContainer,
    onErrorContainer: theme.colors.onErrorContainer,
    outline: theme.colors.outline,
    outlineVariant: theme.colors.outlineVariant,
    shadow: theme.colors.shadow,
    scrim: theme.colors.scrim,
    inverseSurface: theme.colors.inverseSurface,
    inverseOnSurface: theme.colors.inverseOnSurface,
    inversePrimary: theme.colors.inversePrimary,

    // Custom voice and AI colors
    voice: colorPalette.voice,
    ai: colorPalette.ai,

    // Semantic colors
    success: colorPalette.success,
    warning: colorPalette.warning,
    info: colorPalette.info,

    // Text colors
    text: colorPalette.text,

    // Border colors
    border: colorPalette.border,

    // Design tokens
    designTokens,
    spacing: designTokens.spacing,
    shadows: designTokens.shadows,
    borderRadius: designTokens.borderRadius,
    layout: designTokens.layout,
    accessibility: designTokens.accessibility,
  };
};

/**
 * Hook to get specific color shades
 * @param colorType - Type of color (primary, secondary, etc.)
 * @param shade - Shade number (50-900)
 * @returns Color value
 */
export const useColorShade = (
  colorType: 'primary' | 'secondary' | 'neutral',
  shade: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
) => {
  const { isDarkTheme } = useThemeApp();
  const colorPalette = isDarkTheme ? darkColors : lightColors;

  return colorPalette[colorType][shade];
};

/**
 * Hook to get semantic colors
 * @param semanticType - Type of semantic color
 * @param variant - Color variant (light, main, dark, background)
 * @returns Color value
 */
export const useSemanticColor = (
  semanticType: 'success' | 'warning' | 'error' | 'info',
  variant: 'light' | 'main' | 'dark' | 'background' = 'main',
) => {
  const { isDarkTheme } = useThemeApp();
  const colorPalette = isDarkTheme ? darkColors : lightColors;

  return colorPalette[semanticType][variant];
};

/**
 * Hook to get voice colors
 * @param voiceType - Type of voice color
 * @returns Color value
 */
export const useVoiceColor = (voiceType: 'primary' | 'secondary' | 'accent' | 'background') => {
  const { isDarkTheme } = useThemeApp();
  const colorPalette = isDarkTheme ? darkColors : lightColors;

  return colorPalette.voice[voiceType];
};

/**
 * Hook to get AI colors
 * @param aiType - Type of AI color
 * @returns Color value
 */
export const useAIColor = (aiType: 'primary' | 'secondary' | 'accent' | 'background') => {
  const { isDarkTheme } = useThemeApp();
  const colorPalette = isDarkTheme ? darkColors : lightColors;

  return colorPalette.ai[aiType];
};

/**
 * Hook to get spacing values
 * @param spacingKey - Spacing token key
 * @returns Spacing value
 */
export const useSpacing = (spacingKey: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[spacingKey];
};

/**
 * Hook to get shadow styles
 * @param shadowKey - Shadow token key
 * @returns Shadow style object
 */
export const useShadow = (shadowKey: keyof typeof designTokens.shadows) => {
  return designTokens.shadows[shadowKey];
};

/**
 * Hook to get border radius values
 * @param radiusKey - Border radius token key
 * @returns Border radius value
 */
export const useBorderRadius = (radiusKey: keyof typeof designTokens.borderRadius) => {
  return designTokens.borderRadius[radiusKey];
};
