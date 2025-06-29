import React from 'react';

import { IconButton } from 'react-native-paper';

import { useThemeApp } from '@/shared/contexts/ThemeContext';

export const ThemeToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useThemeApp();

  return (
    <IconButton
      accessibilityLabel='Alternar tema'
      icon={isDarkTheme ? 'white-balance-sunny' : 'moon-waning-crescent'}
      selected={isDarkTheme}
      onPress={toggleTheme}
    />
  );
};
