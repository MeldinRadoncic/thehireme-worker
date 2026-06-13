/**
 * TheHireMe Theme Context
 * Global theme management with persistence
 *
 * Usage:
 * const { theme, isDark, toggleTheme, setTheme } = useTheme();
 */

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { THEMES, ThemeType, getTheme } from '@/constants/themes';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
  isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theHireMe_theme';
const THEME_AUTO = 'auto';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [storageTheme, setStorageTheme] = useState<string | null>(null);

  // Load theme preference from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        setIsLoading(true);
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        setStorageTheme(savedTheme);

        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          setThemeState(savedTheme as ThemeType);
        } else if (savedTheme === THEME_AUTO) {
          // Use system preference
          const systemTheme = systemColorScheme === 'dark' ? 'dark' : 'light';
          setThemeState(systemTheme);
        } else {
          // Default to dark if nothing saved
          setThemeState('dark');
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
        setThemeState('dark');
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [systemColorScheme]);

  // Save theme to AsyncStorage
  const saveTheme = useCallback(async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  // Toggle between dark and light
  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    await saveTheme(newTheme);
  }, [theme, saveTheme]);

  // Set specific theme
  const setTheme = useCallback(
    async (newTheme: ThemeType) => {
      await saveTheme(newTheme);
    },
    [saveTheme]
  );

  const value: ThemeContextType = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
    isLoading,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to use theme context
 * Must be used inside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};

/**
 * Get theme colors from context
 */
export const useThemeColors = () => {
  const { theme } = useTheme();
  return getTheme(theme).colors;
};
