import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useThemeApp } from '@/shared/contexts/ThemeContext';
import { StatusBar } from 'react-native';
import HomeScreen from '@/presentation/screens/HomeScreen';

const Main = () => {
  const { theme, isDarkTheme } = useThemeApp();

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <HomeScreen />
    </PaperProvider>
  );
};

export default function Root() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
