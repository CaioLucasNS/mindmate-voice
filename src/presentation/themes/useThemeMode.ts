import { useState, useCallback } from 'react';

import { ColorSchemeName, useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark';

export const useThemeMode = () => {
  const systemScheme: ColorSchemeName = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemScheme || 'light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
};
