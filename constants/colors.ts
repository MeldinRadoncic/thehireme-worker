/**
 * TheHireMe Color Palette
 * Centralized color definitions for consistency across all screens
 */

export const COLORS = {
  // Primary Colors
  primary: {
    main: '#3b82f6',      // Blue-500
    light: '#60a5fa',     // Blue-400
    dark: '#1e40af',      // Blue-800
  },

  // Secondary Colors
  secondary: {
    cyan: '#06b6d4',      // Cyan-400
    yellow: '#facc15',    // Yellow-400
    purple: '#a78bfa',    // Purple-400
  },

  // Neutral Colors
  background: {
    primary: '#0f172a',   // Slate-900
    secondary: '#1e293b', // Slate-800
    tertiary: '#334155',  // Slate-700
  },

  text: {
    primary: '#ffffff',   // White - headings
    secondary: '#e5e7eb', // Gray-200 - secondary text
    tertiary: '#d1d5db',  // Gray-300 - body text
    muted: '#9ca3af',     // Gray-400 - placeholders
    disabled: '#6b7280',  // Gray-500 - disabled state
  },

  borders: {
    light: '#334155',     // Slate-700
    medium: '#475569',    // Slate-600
  },

  status: {
    error: '#ef4444',     // Red-500
    errorLight: '#fee2e2', // Red-50
    success: '#10b981',   // Green-500
    warning: '#f59e0b',   // Amber-500
  },

  // Overlay & Transparency
  overlay: {
    dark: 'rgba(0, 0, 0, 0.5)',
    light: 'rgba(255, 255, 255, 0.1)',
  },
};

// Color aliases for common use cases
export const COLOR_ALIASES = {
  bg: COLORS.background.primary,
  bgCard: COLORS.background.secondary,
  bgInput: COLORS.background.secondary,
  textPrimary: COLORS.text.primary,
  textSecondary: COLORS.text.tertiary,
  borderColor: COLORS.borders.light,
  accentBlue: COLORS.primary.main,
  accentCyan: COLORS.secondary.cyan,
  accentYellow: COLORS.secondary.yellow,
};
