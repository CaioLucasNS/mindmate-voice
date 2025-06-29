import React from 'react';

import { StatusBar } from 'react-native';

import { PaperProvider } from 'react-native-paper';

import HomeScreen from '@/presentation/screens/HomeScreen';
import { ThemeProvider, useThemeApp } from '@/shared/contexts/ThemeContext';

const Main = () => {
  const { theme, isDarkTheme } = useThemeApp();

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <HomeScreen />
    </PaperProvider>
  );
};

const Root = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

export default Root;
