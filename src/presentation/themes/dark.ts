/**
 * Dark Theme for MindMate Voice
 *
 * This theme provides a calm, soothing dark color scheme specifically designed
 * for mental health applications. All colors are WCAG AA compliant and optimized
 * for readability and reduced eye strain in low-light conditions.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import { MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { darkColors } from './colorPalettes';
import { designTokens } from './designTokens';

export const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,

  // ============================================================================
  // COLOR SCHEME
  // ============================================================================
  colors: {
    ...MD3DarkTheme.colors,

    // Primary colors - Softer blue for dark mode
    primary: darkColors.primary[500],
    onPrimary: '#FFFFFF',
    primaryContainer: darkColors.primary[100],
    onPrimaryContainer: darkColors.primary[900],

    // Secondary colors - Softer green for dark mode
    secondary: darkColors.secondary[500],
    onSecondary: '#FFFFFF',
    secondaryContainer: darkColors.secondary[100],
    onSecondaryContainer: darkColors.secondary[900],

    // Tertiary colors - Warm accent
    tertiary: darkColors.warning.main,
    onTertiary: '#FFFFFF',
    tertiaryContainer: darkColors.warning.background,
    onTertiaryContainer: darkColors.warning.dark,

    // Background colors
    background: darkColors.background.primary,
    onBackground: darkColors.text.primary,
    surface: darkColors.surface.primary,
    onSurface: darkColors.text.primary,
    surfaceVariant: darkColors.surface.secondary,
    onSurfaceVariant: darkColors.text.secondary,

    // Error colors
    error: darkColors.error.main,
    onError: '#FFFFFF',
    errorContainer: darkColors.error.background,
    onErrorContainer: darkColors.error.dark,

    // Success colors
    outline: darkColors.border.primary,
    outlineVariant: darkColors.border.secondary,

    // Shadow and elevation
    shadow: 'rgba(0, 0, 0, 0.3)',
    scrim: darkColors.background.overlay,

    // Inverse colors
    inverseSurface: darkColors.neutral[50],
    inverseOnSurface: darkColors.neutral[900],
    inversePrimary: darkColors.primary[900],
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  fonts: {
    ...MD3DarkTheme.fonts,

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
