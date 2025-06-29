/**
 * Design Tokens for MindMate Voice
 *
 * This file contains all the foundational design tokens used throughout the app.
 * These tokens ensure consistency and maintainability across the entire design system.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

// ============================================================================
// SPACING TOKENS
// ============================================================================
export const spacing = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Component-specific spacing
  screenPadding: 16,
  cardPadding: 16,
  buttonPadding: 12,
  inputPadding: 12,

  // Layout spacing
  sectionSpacing: 24,
  itemSpacing: 12,
  groupSpacing: 8,
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================
export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'Courier',
  },

  // Font sizes (following 8pt grid)
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },

  // Line heights (for optimal readability)
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;

// ============================================================================
// BORDER RADIUS TOKENS
// ============================================================================
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================
export const shadows = {
  // Elevation levels for Material Design
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ============================================================================
// ANIMATION TOKENS
// ============================================================================
export const animation = {
  // Duration tokens
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  // Easing functions
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// ============================================================================
// LAYOUT TOKENS
// ============================================================================
export const layout = {
  // Screen dimensions
  screen: {
    minWidth: 320,
    maxWidth: 480,
  },

  // Component dimensions
  components: {
    buttonHeight: 48,
    inputHeight: 48,
    cardMinHeight: 80,
    avatarSize: 40,
    iconSize: 24,
  },

  // Z-index scale
  zIndex: {
    base: 0,
    card: 1,
    modal: 10,
    overlay: 100,
    tooltip: 200,
  },
} as const;

// ============================================================================
// ACCESSIBILITY TOKENS
// ============================================================================
export const accessibility = {
  // Minimum touch target size (44px for iOS, 48px for Android)
  minTouchTarget: 44,

  // Focus indicators
  focusRing: {
    width: 2,
    color: '#007AFF', // iOS blue
  },

  // High contrast mode support
  highContrast: {
    borderWidth: 2,
  },
} as const;

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================
export const designTokens = {
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
  layout,
  accessibility,
} as const;

export type SpacingToken = keyof typeof spacing;
export type TypographyToken = keyof typeof typography.fontSize;
export type BorderRadiusToken = keyof typeof borderRadius;
export type ShadowToken = keyof typeof shadows;
export type AnimationToken = keyof typeof animation.duration;
