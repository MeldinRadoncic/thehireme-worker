/**
 * TheHireMe Theme System - Dark & Light Themes
 * Professional theme switching with persistence
 *
 * Usage:
 * import { THEMES } from '@/constants/themes';
 * const colors = THEMES.dark.colors; // or THEMES.light.colors
 */

import { COLORS as DARK_COLORS } from './colors';

// Light theme colors (inverted from dark)
export const LIGHT_THEME_COLORS = {
  // Primary Colors
  primary: {
    main: '#3b82f6',      // Blue (same for both)
    light: '#60a5fa',     // Lighter blue
    dark: '#1e40af',      // Darker blue
  },

  // Secondary Colors
  secondary: {
    cyan: '#06b6d4',
    yellow: '#facc15',
    purple: '#a78bfa',
  },

  // Neutral Colors (inverted)
  background: {
    primary: '#ffffff',   // White - main background
    secondary: '#f8f9fa', // Light gray - cards
    tertiary: '#e9ecef',  // Gray - hover states
  },

  text: {
    primary: '#1a202c',   // Dark text (was white)
    secondary: '#4a5568', // Dark gray text (was light gray)
    tertiary: '#718096',  // Medium gray text (was gray)
    muted: '#a0aec0',     // Light gray text (was dark gray)
    disabled: '#cbd5e0',  // Disabled text
  },

  borders: {
    light: '#e2e8f0',     // Light border
    medium: '#cbd5e0',    // Medium border
  },

  status: {
    error: '#ef4444',     // Red (same)
    errorLight: '#fee2e2', // Light red (same)
    success: '#10b981',   // Green (same)
    warning: '#f59e0b',   // Amber (same)
  },

  // Overlay & Transparency
  overlay: {
    dark: 'rgba(0, 0, 0, 0.1)',      // Lighter dark overlay
    light: 'rgba(255, 255, 255, 0.5)', // White overlay
  },
};

// Dark theme (original)
export const DARK_THEME_COLORS = DARK_COLORS;

// Theme type
export type ThemeType = 'dark' | 'light';

// Complete theme objects with all variations
export const THEMES = {
  dark: {
    type: 'dark' as ThemeType,
    colors: DARK_THEME_COLORS,
    isDark: true,
  },
  light: {
    type: 'light' as ThemeType,
    colors: LIGHT_THEME_COLORS,
    isDark: false,
  },
};

// Get theme by type
export const getTheme = (type: ThemeType) => THEMES[type];

// Color aliases for light theme
export const LIGHT_THEME_ALIASES = {
  bg: LIGHT_THEME_COLORS.background.primary,
  bgCard: LIGHT_THEME_COLORS.background.secondary,
  bgInput: LIGHT_THEME_COLORS.background.secondary,
  textPrimary: LIGHT_THEME_COLORS.text.primary,
  textSecondary: LIGHT_THEME_COLORS.text.tertiary,
  borderColor: LIGHT_THEME_COLORS.borders.light,
  accentBlue: LIGHT_THEME_COLORS.primary.main,
  accentCyan: LIGHT_THEME_COLORS.secondary.cyan,
  accentYellow: LIGHT_THEME_COLORS.secondary.yellow,
};
