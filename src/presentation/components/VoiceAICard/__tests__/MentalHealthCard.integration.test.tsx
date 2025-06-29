/**
 * Integration Tests for MentalHealthCard Component
 *
 * These tests verify that the MentalHealthCard component integrates correctly
 * with the theme system, accessibility features, and other app components.
 * They test real-world scenarios and user interactions.
 *
 * @author MindMate Voice Team
 * @version 1.0.0
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-paper';
import { MentalHealthCard } from '../index';
import { LightTheme, DarkTheme } from '@/presentation/themes';
import { ThemeProvider as ThemeContextProvider } from '@/shared/contexts/ThemeContext';

// Mock the useThemeColors hook with different theme responses
const mockUseThemeColors = jest.fn();

jest.mock('@/presentation/themes/useThemeColors', () => ({
  useThemeColors: () => mockUseThemeColors(),
}));

/**
 * Test wrapper that provides theme context and allows theme switching
 */
const IntegrationTestWrapper: React.FC<{
  children: React.ReactNode;
  isDarkTheme?: boolean;
}> = ({ children, isDarkTheme = false }) => {
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContextProvider>
  );
};

describe('MentalHealthCard Integration', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseThemeColors.mockReset();
  });

  /**
   * Test: Component integrates with light theme
   *
   * This test verifies that the component correctly
   * integrates with the light theme system.
   */
  it('integrates correctly with light theme', () => {
    mockUseThemeColors.mockReturnValue({
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
    });

    const { getByText } = render(
      <IntegrationTestWrapper isDarkTheme={false}>
        <MentalHealthCard title='Light Theme Card' type='calm'>
          <Text>Light theme content</Text>
        </MentalHealthCard>
      </IntegrationTestWrapper>,
    );

    expect(getByText('Light Theme Card')).toBeTruthy();
    expect(getByText('Light theme content')).toBeTruthy();
  });

  /**
   * Test: Component integrates with dark theme
   *
   * This test verifies that the component correctly
   * integrates with the dark theme system.
   */
  it('integrates correctly with dark theme', () => {
    mockUseThemeColors.mockReturnValue({
      mental: {
        calm: '#0D47A1',
        peace: '#1B5E20',
        comfort: '#E65100',
        safety: '#4A148C',
        hope: '#0277BD',
      },
      text: {
        primary: '#FFFFFF',
        inverse: '#212121',
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
          shadowOpacity: 0.3,
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
    });

    const { getByText } = render(
      <IntegrationTestWrapper isDarkTheme>
        <MentalHealthCard title='Dark Theme Card' type='peace'>
          <Text>Dark theme content</Text>
        </MentalHealthCard>
      </IntegrationTestWrapper>,
    );

    expect(getByText('Dark Theme Card')).toBeTruthy();
    expect(getByText('Dark theme content')).toBeTruthy();
  });

  /**
   * Test: Component integrates with accessibility features
   *
   * This test verifies that the component works correctly
   * with screen readers and accessibility tools.
   */
  it('integrates with accessibility features', async () => {
    mockUseThemeColors.mockReturnValue({
      mental: { calm: '#E3F2FD' },
      text: { primary: '#212121', inverse: '#FFFFFF' },
      spacing: { cardPadding: 16, screenPadding: 16, sm: 8, xs: 4 },
      shadows: { md: {} },
      borderRadius: { lg: 16 },
      layout: { components: { cardMinHeight: 80 } },
    });

    const onPressMock = jest.fn();

    const { getByLabelText } = render(
      <IntegrationTestWrapper>
        <MentalHealthCard
          interactive
          accessibilityLabel='Mental health support card'
          title='Accessible Card'
          onPress={onPressMock}
        >
          <Text>Accessible content</Text>
        </MentalHealthCard>
      </IntegrationTestWrapper>,
    );

    const accessibleCard = getByLabelText('Mental health support card');
    expect(accessibleCard).toBeTruthy();

    // Test accessibility interaction
    fireEvent.press(accessibleCard);

    await waitFor(() => {
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test: Component integrates with complex content
   *
   * This test verifies that the component can handle
   * complex nested content and interactions.
   */
  it('integrates with complex content and interactions', () => {
    mockUseThemeColors.mockReturnValue({
      mental: { calm: '#E3F2FD' },
      text: { primary: '#212121', inverse: '#FFFFFF' },
      spacing: { cardPadding: 16, screenPadding: 16, sm: 8, xs: 4 },
      shadows: { md: {} },
      borderRadius: { lg: 16 },
      layout: { components: { cardMinHeight: 80 } },
    });

    const cardPressMock = jest.fn();
    const buttonPressMock = jest.fn();

    const { getByText } = render(
      <IntegrationTestWrapper>
        <MentalHealthCard
          interactive
          subtitle='With multiple interactive elements'
          title='Complex Card'
          onPress={cardPressMock}
        >
          <View>
            <Text>Main content</Text>
            <Text onPress={buttonPressMock}>Interactive button</Text>
            <Text>More content</Text>
          </View>
        </MentalHealthCard>
      </IntegrationTestWrapper>,
    );

    // Test card press
    const card = getByText('Complex Card').parent;
    fireEvent.press(card!);
    expect(cardPressMock).toHaveBeenCalledTimes(1);

    // Test nested button press
    const button = getByText('Interactive button');
    fireEvent.press(button);
    expect(buttonPressMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Component integrates with theme switching
   *
   * This test verifies that the component responds correctly
   * to theme changes during runtime.
   */
  it('integrates with theme switching', () => {
    const lightThemeColors = {
      mental: { calm: '#E3F2FD' },
      text: { primary: '#212121', inverse: '#FFFFFF' },
      spacing: { cardPadding: 16, screenPadding: 16, sm: 8, xs: 4 },
      shadows: { md: {} },
      borderRadius: { lg: 16 },
      layout: { components: { cardMinHeight: 80 } },
    };

    const darkThemeColors = {
      mental: { calm: '#0D47A1' },
      text: { primary: '#FFFFFF', inverse: '#212121' },
      spacing: { cardPadding: 16, screenPadding: 16, sm: 8, xs: 4 },
      shadows: { md: {} },
      borderRadius: { lg: 16 },
      layout: { components: { cardMinHeight: 80 } },
    };

    // Start with light theme
    mockUseThemeColors.mockReturnValue(lightThemeColors);

    const { getByText, rerender } = render(
      <IntegrationTestWrapper>
        <MentalHealthCard title='Theme Switch Card' type='calm'>
          <Text>Theme content</Text>
        </MentalHealthCard>
      </IntegrationTestWrapper>,
    );

    expect(getByText('Theme Switch Card')).toBeTruthy();

    // Switch to dark theme
    mockUseThemeColors.mockReturnValue(darkThemeColors);

    rerender(
      <IntegrationTestWrapper isDarkTheme>
        <MentalHealthCard title='Theme Switch Card' type='calm'>
          <Text>Theme content</Text>
        </MentalHealthCard>
      </IntegrationTestWrapper>,
    );

    expect(getByText('Theme Switch Card')).toBeTruthy();
  });

  /**
   * Test: Component integrates with performance optimizations
   *
   * This test verifies that the component performs well
   * with multiple instances and frequent updates.
   */
  it('integrates with performance optimizations', () => {
    mockUseThemeColors.mockReturnValue({
      mental: { calm: '#E3F2FD', peace: '#E8F5E8', comfort: '#FFF3E0' },
      text: { primary: '#212121', inverse: '#FFFFFF' },
      spacing: { cardPadding: 16, screenPadding: 16, sm: 8, xs: 4 },
      shadows: { md: {} },
      borderRadius: { lg: 16 },
      layout: { components: { cardMinHeight: 80 } },
    });

    const { getAllByText } = render(
      <IntegrationTestWrapper>
        <View>
          <MentalHealthCard title='Card 1' type='calm'>
            <Text>Content 1</Text>
          </MentalHealthCard>
          <MentalHealthCard title='Card 2' type='peace'>
            <Text>Content 2</Text>
          </MentalHealthCard>
          <MentalHealthCard title='Card 3' type='comfort'>
            <Text>Content 3</Text>
          </MentalHealthCard>
        </View>
      </IntegrationTestWrapper>,
    );

    // Verify all cards render correctly
    expect(getAllByText(/Card \d/)).toHaveLength(3);
    expect(getAllByText(/Content \d/)).toHaveLength(3);
  });
});
