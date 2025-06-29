import React from 'react';

import { View } from 'react-native';

import { Text } from 'react-native-paper';

import { ThemeToggleButton } from '@/presentation/components/ThemeToggleButton';
import { useThemeApp } from '@/shared/contexts/ThemeContext';

import { styles } from './styles';

const HomeScreen = () => {
  const { theme } = useThemeApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium">MindMate Voice</Text>
      <ThemeToggleButton />
    </View>
  );
};

export default HomeScreen;
