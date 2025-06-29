import { MD3DarkTheme, MD3Theme } from 'react-native-paper';

export const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    secondary: '#03dac6',
    background: '#121212',
    surface: '#1F1B24',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
  },
};
