import React from 'react';
import { IconButton } from 'react-native-paper';
import { useThemeApp } from '@/shared/contexts/ThemeContext';

export function ThemeToggleButton() {
    const { isDarkTheme, toggleTheme } = useThemeApp();

    return (
        <IconButton
            icon={isDarkTheme ? 'white-balance-sunny' : 'moon-waning-crescent'}
            selected={isDarkTheme}
            onPress={toggleTheme}
            accessibilityLabel="Alternar tema"
        />
    );
}
