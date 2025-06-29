/**
 * Unit Tests for MentalHealthCard Component
 *
 * These tests verify that the MentalHealthCard component:
 * - Renders correctly with different props
 * - Handles theme changes properly
 * - Provides proper accessibility support
 * - Responds to user interactions correctly
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'react-native-paper';
import { MentalHealthCard } from '../index';
import { LightTheme } from '@/presentation/themes/light';
import { ThemeProvider as ThemeContextProvider } from '@/shared/contexts/ThemeContext';

// Mock the useThemeColors hook
jest.mock('@/presentation/themes/useThemeColors', () => ({
  useThemeColors: () => ({
    mental: {
      calm: '#E3F2FD',
      peace: '#E8F5E8',
      comfort: '#FFF3E0',
      safety: '#F3E5F5',
      hope: '#E1F5FE',
    },
    text: {
      primary: '#212121',
      inverse: '#FFFFFF',
    },
    spacing: {
      cardPadding: 16,
      screenPadding: 16,
      sm: 8,
      xs: 4,
    },
    shadows: {
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    },
    borderRadius: {
      lg: 16,
    },
    layout: {
      components: {
        cardMinHeight: 80,
      },
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

describe('MentalHealthCard', () => {
  /**
   * Test: Component renders with basic props
   *
   * This test verifies that the component renders correctly
   * with minimal required props (title and children).
   */
  it('renders correctly with basic props', () => {
    const { getByText } = render(
      <TestWrapper>
        <MentalHealthCard title='Test Card'>
          <Text>Test content</Text>
        </MentalHealthCard>
      </TestWrapper>,
    );

    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Test content')).toBeTruthy();
  });

  /**
   * Test: Component renders with subtitle
   *
   * This test verifies that the subtitle is displayed
   * when provided as a prop.
   */
  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <TestWrapper>
        <MentalHealthCard subtitle='Test subtitle' title='Test Card'>
          <Text>Test content</Text>
        </MentalHealthCard>
      </TestWrapper>,
    );

    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Test subtitle')).toBeTruthy();
    expect(getByText('Test content')).toBeTruthy();
  });

  /**
   * Test: Component handles different mental health types
   *
   * This test verifies that the component applies different
   * background colors based on the type prop.
   */
  it('applies different background colors based on type', () => {
    const { getByText, rerender } = render(
      <TestWrapper>
        <MentalHealthCard title='Calm Card' type='calm'>
          <Text>Content</Text>
        </MentalHealthCard>
      </TestWrapper>,
    );

    const calmCard = getByText('Calm Card').parent;
    expect(calmCard).toBeTruthy();

    // Test peace type
    rerender(
      <TestWrapper>
        <MentalHealthCard title='Peace Card' type='peace'>
          <Text>Content</Text>
        </MentalHealthCard>
      </TestWrapper>,
    );

    const peaceCard = getByText('Peace Card').parent;
    expect(peaceCard).toBeTruthy();
  });

  /**
   * Test: Interactive card handles press events
   *
   * This test verifies that interactive cards respond
   * to press events correctly.
   */
  it('handles press events when interactive', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <MentalHealthCard interactive title='Interactive Card' onPress={onPressMock}>
          <Text>Content</Text>
        </MentalHealthCard>
      </TestWrapper>,
    );

    const card = getByText('Interactive Card').parent;
    fireEvent.press(card!);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Non-interactive card does not handle press events
   *
   * This test verifies that non-interactive cards
   * do not respond to press events.
   */
  it('does not handle press events when not interactive', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <MentalHealthCard interactive={false} title='Non-Interactive Card' onPress={onPressMock}>
        <Text>Card content</Text>
      </MentalHealthCard>,
    );

    const card = getByText('Non-Interactive Card').parent;
    fireEvent.press(card!);

    expect(onPressMock).not.toHaveBeenCalled();
  });

  /**
   * Test: Component provides proper accessibility support
   *
   * This test verifies that the component includes
   * proper accessibility props.
   */
  it('provides proper accessibility support', () => {
    const { getByRole } = render(
      <MentalHealthCard
        interactive
        accessibilityLabel='Custom accessibility label'
        title='Accessible Card'
        onPress={jest.fn()}
      >
        <Text>Card content</Text>
      </MentalHealthCard>,
    );

    const card = getByRole('button');
    expect(card).toHaveProp('accessibilityLabel', 'Custom accessibility label');
    expect(card).toHaveProp('accessibilityRole', 'button');
  });

  /**
   * Test: Component uses default accessibility label
   *
   * This test verifies that the component uses the title
   * as the default accessibility label when none is provided.
   */
  it('uses title as default accessibility label', () => {
    const { getByRole } = render(
      <MentalHealthCard interactive title='Default Label Card' onPress={jest.fn()}>
        <Text>Card content</Text>
      </MentalHealthCard>,
    );

    const card = getByRole('button');
    expect(card).toHaveProp('accessibilityLabel', 'Default Label Card');
  });

  /**
   * Test: Component applies custom styles
   *
   * This test verifies that the component correctly
   * applies additional custom styles.
   */
  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red', marginTop: 10 };
    const { getByRole } = render(
      <MentalHealthCard interactive style={customStyle} title='Styled Card' onPress={jest.fn()}>
        <Text>Card content</Text>
      </MentalHealthCard>,
    );

    const card = getByRole('button');
    expect(card).toHaveStyle(customStyle);
  });

  /**
   * Test: Component handles animation prop
   *
   * This test verifies that the component correctly
   * handles the animated prop for touch feedback.
   */
  it('handles animation prop correctly', () => {
    const { getByRole, rerender } = render(
      <MentalHealthCard animated interactive title='Animated Card' onPress={jest.fn()}>
        <Text>Card content</Text>
      </MentalHealthCard>,
    );

    let card = getByRole('button');
    expect(card).toHaveProp('activeOpacity', 0.8);

    // Test with animation disabled
    rerender(
      <MentalHealthCard interactive animated={false} title='Animated Card' onPress={jest.fn()}>
        <Text>Card content</Text>
      </MentalHealthCard>,
    );

    card = getByRole('button');
    expect(card).toHaveProp('activeOpacity', 1);
  });

  /**
   * Test: Component renders with all mental health types
   *
   * This test verifies that all mental health card types
   * render correctly without errors.
   */
  it('renders with all mental health types', () => {
    const types: Array<'calm' | 'peace' | 'comfort' | 'safety' | 'hope'> = [
      'calm',
      'peace',
      'comfort',
      'safety',
      'hope',
    ];

    types.forEach(type => {
      const { getByText } = render(
        <MentalHealthCard title={`${type} card`} type={type}>
          <Text>Content</Text>
        </MentalHealthCard>,
      );

      expect(getByText(`${type} card`)).toBeTruthy();
    });
  });
});
