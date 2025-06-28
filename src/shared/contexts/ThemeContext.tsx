import React, { createContext, useContext, useState } from 'react';
import { DarkTheme, LightTheme } from '@/presentation/themes';

interface ThemeContextType {
    isDarkTheme: boolean;
    toggleTheme: () => void;
    theme: typeof DarkTheme | typeof LightTheme;
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkTheme: false,
    toggleTheme: () => { },
    theme: LightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => setIsDarkTheme(prev => !prev);

    const theme = isDarkTheme ? DarkTheme : LightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeApp = () => useContext(ThemeContext);
