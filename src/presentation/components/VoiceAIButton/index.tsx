/**
 * Voice AI Button Component
 *
 * A modern, accessible button component designed for voice recognition and AI applications.
 * Features calming colors, smooth animations, and proper touch feedback.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeColors } from '@/presentation/themes/useThemeColors';

interface VoiceAIButtonProps {
  /**
   * The text displayed on the button
   */
  title: string;

  /**
   * The type of button (affects colors and styling)
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'voice' | 'ai';

  /**
   * The size of the button
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Whether the button has a full width
   */
  fullWidth?: boolean;

  /**
   * Whether the button has an outline style
   */
  outlined?: boolean;

  /**
   * Callback function when button is pressed
   */
  onPress?: () => void;

  /**
   * Additional styles for the button container
   */
  style?: any;

  /**
   * Whether to show a subtle animation on press
   */
  animated?: boolean;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Icon component to display before the text
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon component to display after the text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Voice AI Button Component
 *
 * This component creates a visually appealing button with:
 * - Calming colors based on voice and AI themes
 * - Proper elevation and shadows
 * - Smooth animations and touch feedback
 * - Loading states and disabled states
 * - Accessibility support
 * - Responsive design that adapts to theme changes
 */
const VoiceAIButton: React.FC<VoiceAIButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  outlined = false,
  onPress,
  style,
  animated = true,
  accessibilityLabel,
  leftIcon,
  rightIcon,
}) => {
  const colors = useThemeColors();
  const spacing = colors.spacing;
  const shadows = colors.shadows;
  const borderRadius = colors.borderRadius;

  // Get button colors based on variant
  const getButtonColors = () => {
    if (disabled) {
      return {
        background: colors.text.disabled,
        text: colors.text.inverse,
        border: colors.border.secondary,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          background: outlined ? 'transparent' : colors.primary,
          text: outlined ? colors.primary : colors.onPrimary,
          border: colors.primary,
        };
      case 'secondary':
        return {
          background: outlined ? 'transparent' : colors.secondary,
          text: outlined ? colors.secondary : colors.onSecondary,
          border: colors.secondary,
        };
      case 'success':
        return {
          background: outlined ? 'transparent' : colors.success.main,
          text: outlined ? colors.success.main : colors.text.inverse,
          border: colors.success.main,
        };
      case 'warning':
        return {
          background: outlined ? 'transparent' : colors.warning.main,
          text: outlined ? colors.warning.main : colors.text.inverse,
          border: colors.warning.main,
        };
      case 'error':
        return {
          background: outlined ? 'transparent' : colors.error,
          text: outlined ? colors.error : colors.text.inverse,
          border: colors.error,
        };
      case 'voice':
        return {
          background: outlined ? 'transparent' : colors.voice.primary,
          text: outlined ? colors.voice.primary : colors.text.primary,
          border: colors.voice.primary,
        };
      case 'ai':
        return {
          background: outlined ? 'transparent' : colors.ai.primary,
          text: outlined ? colors.ai.primary : colors.text.primary,
          border: colors.ai.primary,
        };
      default:
        return {
          background: outlined ? 'transparent' : colors.primary,
          text: outlined ? colors.primary : colors.onPrimary,
          border: colors.primary,
        };
    }
  };

  // Get button size styles
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return {
          height: 32,
          paddingHorizontal: spacing.sm,
          fontSize: 12,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: spacing.lg,
          fontSize: 18,
        };
      default: // medium
        return {
          height: 48,
          paddingHorizontal: spacing.md,
          fontSize: 16,
        };
    }
  };

  const buttonColors = getButtonColors();
  const buttonSize = getButtonSize();

  const buttonStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: buttonColors.background,
      borderColor: buttonColors.border,
      borderRadius: borderRadius.md,
      borderWidth: outlined ? 2 : 0,
      flexDirection: 'row',
      height: buttonSize.height,
      justifyContent: 'center',
      paddingHorizontal: buttonSize.paddingHorizontal,
      width: fullWidth ? '100%' : 'auto',
      ...shadows.sm,
    },
    disabledContainer: {
      backgroundColor: colors.text.disabled,
      borderColor: colors.border.secondary,
      opacity: 0.6,
    },
    disabledText: {
      color: colors.text.disabled,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: spacing.xs,
    },
    leftIcon: {
      marginRight: spacing.xs,
    },
    rightIcon: {
      marginLeft: spacing.xs,
    },
    text: {
      color: buttonColors.text,
      fontSize: buttonSize.fontSize,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      accessibilityHint='Double tap to activate'
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole='button'
      accessibilityState={{ disabled, busy: loading }}
      activeOpacity={animated && !disabled ? 0.8 : 1}
      disabled={disabled || loading}
      style={[buttonStyles.container, disabled && buttonStyles.disabledContainer, style]}
      onPress={handlePress}
    >
      {loading ? (
        <ActivityIndicator color={buttonColors.text as string} size='small' />
      ) : (
        <>
          {leftIcon && (
            <View style={[buttonStyles.iconContainer, buttonStyles.leftIcon]}>{leftIcon}</View>
          )}

          <Text style={[buttonStyles.text, disabled && buttonStyles.disabledText]}>{title}</Text>

          {rightIcon && (
            <View style={[buttonStyles.iconContainer, buttonStyles.rightIcon]}>{rightIcon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export { VoiceAIButton };
export default VoiceAIButton;
