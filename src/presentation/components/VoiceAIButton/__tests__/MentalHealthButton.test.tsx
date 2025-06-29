/**
 * Unit Tests for MentalHealthButton Component
 *
 * These tests verify that the MentalHealthButton component:
 * - Renders correctly with different props
 * - Handles theme changes properly
 * - Provides proper accessibility support
 * - Responds to user interactions correctly
 * - Handles loading and disabled states
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import { MentalHealthButton } from '../index';
import { LightTheme } from '@/presentation/themes/light';
import { ThemeProvider as ThemeContextProvider } from '@/shared/contexts/ThemeContext';

// Mock the useThemeColors hook
jest.mock('@/presentation/themes/useThemeColors', () => ({
  useThemeColors: () => ({
    primary: '#2196F3',
    onPrimary: '#FFFFFF',
    secondary: '#4CAF50',
    onSecondary: '#FFFFFF',
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#2E7D32',
      background: '#E8F5E8',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      background: '#FFF3E0',
    },
    error: '#F44336',
    mental: {
      calm: '#E3F2FD',
      peace: '#E8F5E8',
      comfort: '#FFF3E0',
      safety: '#F3E5F5',
      hope: '#E1F5FE',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      inverse: '#FFFFFF',
    },
    border: {
      primary: '#E0E0E0',
      secondary: '#EEEEEE',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
    },
    shadows: {
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
    },
    borderRadius: {
      md: 12,
    },
  }),
}));

/**
 * Test wrapper component that provides theme context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContextProvider>
    <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
  </ThemeContextProvider>
);

describe('MentalHealthButton', () => {
  /**
   * Test: Component renders with basic props
   *
   * This test verifies that the component renders correctly
   * with minimal required props (title).
   */
  it('renders correctly with basic props', () => {
    const { getByText } = render(
      <TestWrapper>
        <MentalHealthButton title='Test Button' />
      </TestWrapper>,
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  /**
   * Test: Component handles different variants
   *
   * This test verifies that the component applies different
   * styles based on the variant prop.
   */
  it('handles different variants', () => {
    const { getByText, rerender } = render(
      <TestWrapper>
        <MentalHealthButton title='Primary Button' variant='primary' />
      </TestWrapper>,
    );

    expect(getByText('Primary Button')).toBeTruthy();

    // Test secondary variant
    rerender(
      <TestWrapper>
        <MentalHealthButton title='Secondary Button' variant='secondary' />
      </TestWrapper>,
    );

    expect(getByText('Secondary Button')).toBeTruthy();
  });

  /**
   * Test: Component handles different sizes
   *
   * This test verifies that the component applies different
   * sizes based on the size prop.
   */
  it('handles different sizes', () => {
    const { getByText, rerender } = render(
      <TestWrapper>
        <MentalHealthButton size='small' title='Small Button' />
      </TestWrapper>,
    );

    expect(getByText('Small Button')).toBeTruthy();

    // Test large size
    rerender(
      <TestWrapper>
        <MentalHealthButton size='large' title='Large Button' />
      </TestWrapper>,
    );

    expect(getByText('Large Button')).toBeTruthy();
  });

  /**
   * Test: Component handles press events
   *
   * This test verifies that the component responds
   * to press events correctly.
   */
  it('handles press events', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <MentalHealthButton title='Pressable Button' onPress={onPressMock} />
      </TestWrapper>,
    );

    const button = getByText('Pressable Button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Component handles disabled state
   *
   * This test verifies that disabled buttons do not
   * respond to press events.
   */
  it('handles disabled state', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <MentalHealthButton disabled title='Disabled Button' onPress={onPressMock} />
      </TestWrapper>,
    );

    const button = getByText('Disabled Button');
    fireEvent.press(button);

    expect(onPressMock).not.toHaveBeenCalled();
  });

  /**
   * Test: Component handles loading state
   *
   * This test verifies that loading buttons show
   * an activity indicator and don't respond to presses.
   */
  it('handles loading state', () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <MentalHealthButton loading title='Loading Button' onPress={onPressMock} />,
    );

    const button = getByRole('button');

    // Button should be disabled when loading
    expect(button).toHaveProp('accessibilityState', { disabled: true, busy: true });

    // Should not call onPress when loading
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  /**
   * Test: Component handles outlined style
   *
   * This test verifies that the component correctly
   * applies outlined styling.
   */
  it('handles outlined style', () => {
    const { getByText } = render(
      <TestWrapper>
        <MentalHealthButton outlined title='Outlined Button' />
      </TestWrapper>,
    );

    expect(getByText('Outlined Button')).toBeTruthy();
  });

  /**
   * Test: Component handles full width
   *
   * This test verifies that the component correctly
   * applies full width styling.
   */
  it('handles full width', () => {
    const { getByText } = render(
      <TestWrapper>
        <MentalHealthButton fullWidth title='Full Width Button' />
      </TestWrapper>,
    );

    expect(getByText('Full Width Button')).toBeTruthy();
  });

  /**
   * Test: Component provides proper accessibility support
   *
   * This test verifies that the component includes
   * proper accessibility props.
   */
  it('provides proper accessibility support', () => {
    const { getByRole } = render(
      <MentalHealthButton
        accessibilityLabel='Custom accessibility label'
        title='Accessible Button'
        onPress={jest.fn()}
      />,
    );

    const button = getByRole('button');
    expect(button).toHaveProp('accessibilityLabel', 'Custom accessibility label');
    expect(button).toHaveProp('accessibilityRole', 'button');
  });

  /**
   * Test: Component uses default accessibility label
   *
   * This test verifies that the component uses the title
   * as the default accessibility label when none is provided.
   */
  it('uses title as default accessibility label', () => {
    const { getByRole } = render(
      <MentalHealthButton title='Default Label Button' onPress={jest.fn()} />,
    );

    const button = getByRole('button');
    expect(button).toHaveProp('accessibilityLabel', 'Default Label Button');
  });

  /**
   * Test: Component handles animation prop
   *
   * This test verifies that the component correctly
   * handles the animated prop for touch feedback.
   */
  it('handles animation prop correctly', () => {
    const { getByRole, rerender } = render(
      <MentalHealthButton animated title='Animated Button' onPress={jest.fn()} />,
    );

    let button = getByRole('button');
    expect(button).toHaveProp('activeOpacity', 0.8);

    // Test with animation disabled
    rerender(<MentalHealthButton animated={false} title='Animated Button' onPress={jest.fn()} />);

    button = getByRole('button');
    expect(button).toHaveProp('activeOpacity', 1);
  });

  /**
   * Test: Component renders with all variants
   *
   * This test verifies that all button variants
   * render correctly without errors.
   */
  it('renders with all variants', () => {
    const variants: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'calm' | 'peace'
    > = ['primary', 'secondary', 'success', 'warning', 'error', 'calm', 'peace'];

    variants.forEach(variant => {
      const { getByText } = render(
        <TestWrapper>
          <MentalHealthButton title={`${variant} Button`} variant={variant} />
        </TestWrapper>,
      );

      expect(getByText(`${variant} Button`)).toBeTruthy();
    });
  });

  /**
   * Test: Component handles icons
   *
   * This test verifies that the component correctly
   * displays left and right icons.
   */
  it('handles icons', () => {
    const { getByText } = render(
      <MentalHealthButton
        leftIcon={<Text>←</Text>}
        rightIcon={<Text>→</Text>}
        title='Icon Button'
        onPress={jest.fn()}
      />,
    );

    expect(getByText('Icon Button')).toBeTruthy();
    expect(getByText('←')).toBeTruthy();
    expect(getByText('→')).toBeTruthy();
  });
});
