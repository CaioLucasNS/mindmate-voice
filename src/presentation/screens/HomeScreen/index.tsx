import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useThemeApp } from '@/shared/contexts/ThemeContext';

import { ThemeToggleButton } from '@/presentation/components/ThemeToggleButton';

export default function HomeScreen() {
    const { theme } = useThemeApp();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <Text variant="headlineMedium">MindMate Voice</Text>
            <ThemeToggleButton />
        </View>
    );
}
