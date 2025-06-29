import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

import { DarkTheme, LightTheme } from '@/presentation/themes';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  theme: typeof DarkTheme | typeof LightTheme;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
  theme: LightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = useCallback(() => setIsDarkTheme(prev => !prev), []);

  const theme = isDarkTheme ? DarkTheme : LightTheme;

  const contextValue = useMemo(
    () => ({ isDarkTheme, toggleTheme, theme }),
    [isDarkTheme, toggleTheme, theme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useThemeApp = () => useContext(ThemeContext);
