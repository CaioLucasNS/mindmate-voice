/**
 * Light Theme for MindMate Voice
 *
 * This theme provides a calm, soothing light color scheme specifically designed
 * for mental health applications. All colors are WCAG AA compliant and optimized
 * for readability and reduced eye strain.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import { MD3LightTheme, MD3Theme } from 'react-native-paper';
import { lightColors } from './colorPalettes';
import { designTokens } from './designTokens';

export const LightTheme: MD3Theme = {
  ...MD3LightTheme,

  // ============================================================================
  // COLOR SCHEME
  // ============================================================================
  colors: {
    ...MD3LightTheme.colors,

    // Primary colors - Calming blue
    primary: lightColors.primary[500],
    onPrimary: '#FFFFFF',
    primaryContainer: lightColors.primary[100],
    onPrimaryContainer: lightColors.primary[900],

    // Secondary colors - Soothing green
    secondary: lightColors.secondary[500],
    onSecondary: '#FFFFFF',
    secondaryContainer: lightColors.secondary[100],
    onSecondaryContainer: lightColors.secondary[900],

    // Tertiary colors - Warm accent
    tertiary: lightColors.warning.main,
    onTertiary: '#FFFFFF',
    tertiaryContainer: lightColors.warning.background,
    onTertiaryContainer: lightColors.warning.dark,

    // Background colors
    background: lightColors.background.primary,
    onBackground: lightColors.text.primary,
    surface: lightColors.surface.primary,
    onSurface: lightColors.text.primary,
    surfaceVariant: lightColors.surface.secondary,
    onSurfaceVariant: lightColors.text.secondary,

    // Error colors
    error: lightColors.error.main,
    onError: '#FFFFFF',
    errorContainer: lightColors.error.background,
    onErrorContainer: lightColors.error.dark,

    // Success colors
    outline: lightColors.border.primary,
    outlineVariant: lightColors.border.secondary,

    // Shadow and elevation
    shadow: 'rgba(0, 0, 0, 0.1)',
    scrim: lightColors.background.overlay,

    // Inverse colors
    inverseSurface: lightColors.neutral[900],
    inverseOnSurface: lightColors.neutral[50],
    inversePrimary: lightColors.primary[100],
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  fonts: {
    ...MD3LightTheme.fonts,

    // Display styles
    displayLarge: {
      fontFamily: designTokens.typography.fontFamily.regular,
      fontSize: designTokens.typography.fontSize.display,
      fontWeight: designTokens.typography.fontWeight.light,
      letterSpacing: designTokens.typography.letterSpacing.tight,
      lineHeight:
        designTokens.typography.fontSize.display * designTokens.typography.lineHeight.tight,
    },

    displayMedium: {
      fontFamily: designTokens.typography.fontFamily.regular,
      fontSize: designTokens.typography.fontSize.xxxl,
      fontWeight: designTokens.typography.fontWeight.regular,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.xxxl * designTokens.typography.lineHeight.normal,
    },

    displaySmall: {
      fontFamily: designTokens.typography.fontFamily.regular,
      fontSize: designTokens.typography.fontSize.xxl,
      fontWeight: designTokens.typography.fontWeight.regular,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.xxl * designTokens.typography.lineHeight.normal,
    },

    // Headline styles
    headlineLarge: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.semibold,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.xl * designTokens.typography.lineHeight.normal,
    },

    headlineMedium: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.lg * designTokens.typography.lineHeight.normal,
    },

    headlineSmall: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.md,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.md * designTokens.typography.lineHeight.normal,
    },

    // Title styles
    titleLarge: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.md,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      lineHeight: designTokens.typography.fontSize.md * designTokens.typography.lineHeight.normal,
    },

    titleMedium: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      lineHeight: designTokens.typography.fontSize.sm * designTokens.typography.lineHeight.normal,
    },

    titleSmall: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      lineHeight: designTokens.typography.fontSize.xs * designTokens.typography.lineHeight.normal,
    },

    // Body styles
    bodyLarge: {
      fontFamily: designTokens.typography.fontFamily.regular,
      fontSize: designTokens.typography.fontSize.md,
      fontWeight: designTokens.typography.fontWeight.regular,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.md * designTokens.typography.lineHeight.relaxed,
    },

    bodyMedium: {
      fontFamily: designTokens.typography.fontFamily.regular,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.regular,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.sm * designTokens.typography.lineHeight.relaxed,
    },

    bodySmall: {
      fontFamily: designTokens.typography.fontFamily.regular,
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.regular,
      letterSpacing: designTokens.typography.letterSpacing.normal,
      lineHeight: designTokens.typography.fontSize.xs * designTokens.typography.lineHeight.relaxed,
    },

    // Label styles
    labelLarge: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      lineHeight: designTokens.typography.fontSize.sm * designTokens.typography.lineHeight.normal,
    },

    labelMedium: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wide,
      lineHeight: designTokens.typography.fontSize.xs * designTokens.typography.lineHeight.normal,
    },

    labelSmall: {
      fontFamily: designTokens.typography.fontFamily.medium,
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.medium,
      letterSpacing: designTokens.typography.letterSpacing.wider,
      lineHeight: designTokens.typography.fontSize.xs * designTokens.typography.lineHeight.normal,
    },
  },

  // ============================================================================
  // ROUNDED CORNERS
  // ============================================================================
  roundness: designTokens.borderRadius.md,

  // ============================================================================
  // ANIMATION
  // ============================================================================
  animation: {
    scale: 1.0,
  },
};
