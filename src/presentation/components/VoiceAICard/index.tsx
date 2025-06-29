/**
 * Voice AI Card Component
 *
 * A modern, accessible card component designed for voice recognition and AI applications.
 * Features modern colors, proper elevation, and smooth animations.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeColors, useColorShade } from '@/presentation/themes/useThemeColors';

interface VoiceAICardProps {
  /**
   * The title displayed at the top of the card
   */
  title: string;

  /**
   * The subtitle displayed below the title
   */
  subtitle?: string;

  /**
   * The main content of the card
   */
  children: React.ReactNode;

  /**
   * The type of card (affects background color)
   */
  type?: 'voice' | 'ai' | 'primary' | 'secondary' | 'info';

  /**
   * Whether the card is interactive (clickable)
   */
  interactive?: boolean;

  /**
   * Callback function when card is pressed (only if interactive is true)
   */
  onPress?: () => void;

  /**
   * Additional styles for the card container
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
}

/**
 * Voice AI Card Component
 *
 * This component creates a visually appealing card with:
 * - Modern background colors based on voice and AI themes
 * - Proper elevation and shadows
 * - Smooth animations and touch feedback
 * - Accessibility support
 * - Responsive design that adapts to theme changes
 */
export const VoiceAICard: React.FC<VoiceAICardProps> = ({
  title,
  subtitle,
  children,
  type = 'voice',
  interactive = false,
  onPress,
  style,
  animated = true,
  accessibilityLabel,
}) => {
  const colors = useThemeColors();
  const spacing = colors.spacing;
  const shadows = colors.shadows;
  const borderRadius = colors.borderRadius;
  const primaryShade50 = useColorShade('primary', '50');
  const secondaryShade50 = useColorShade('secondary', '50');

  // Get the appropriate background color based on type
  const getBackgroundColor = () => {
    switch (type) {
      case 'voice':
        return colors.voice.background;
      case 'ai':
        return colors.ai.background;
      case 'primary':
        return primaryShade50;
      case 'secondary':
        return secondaryShade50;
      case 'info':
        return colors.info.background;
      default:
        return colors.voice.background;
    }
  };

  // Get the appropriate text color based on background
  const getTextColor = () => {
    const bgColor = getBackgroundColor();
    // Use a simple heuristic to determine if background is light or dark
    const isLight =
      bgColor.includes('EFF') ||
      bgColor.includes('F3F') ||
      bgColor.includes('E3F') ||
      bgColor.includes('E8F');
    return isLight ? colors.text.primary : colors.text.inverse;
  };

  const cardStyles = StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(),
      borderRadius: borderRadius.lg,
      marginHorizontal: spacing.screenPadding,
      marginVertical: spacing.sm,
      minHeight: colors.layout.components.cardMinHeight,
      padding: spacing.cardPadding,
      ...shadows.md,
    },
    content: {
      flex: 1,
    },
    interactiveContainer: {
      ...shadows.md,
    },
    subtitle: {
      color: getTextColor(),
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      marginBottom: spacing.sm,
      opacity: 0.8,
    },
    title: {
      color: getTextColor(),
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
      marginBottom: subtitle ? spacing.xs : spacing.sm,
    },
  });

  const CardContainer = interactive ? TouchableOpacity : View;

  return (
    <CardContainer
      accessibilityHint={interactive ? 'Double tap to activate' : undefined}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole={interactive ? 'button' : undefined}
      activeOpacity={animated && interactive ? 0.8 : 1}
      style={[cardStyles.container, interactive && cardStyles.interactiveContainer, style]}
      onPress={interactive ? onPress : undefined}
    >
      <Text style={cardStyles.title} variant='titleLarge'>
        {title}
      </Text>

      {subtitle && (
        <Text style={cardStyles.subtitle} variant='bodyMedium'>
          {subtitle}
        </Text>
      )}

      <View style={cardStyles.content}>{children}</View>
    </CardContainer>
  );
};

export default VoiceAICard;
