/**
 * TheHireMe Responsive Design System
 * Breakpoints and responsive utilities for all screen sizes
 * Mobile-first approach
 */

export const BREAKPOINTS = {
  // Mobile phones (320px - 479px)
  xs: 320,
  // Mobile phones landscape / small tablets (480px - 599px)
  sm: 480,
  // Tablets (600px - 839px)
  md: 600,
  // Large tablets / small laptops (840px - 1119px)
  lg: 840,
  // Desktop (1120px and up)
  xl: 1120,
  // Large desktop (1440px and up)
  '2xl': 1440,
};

// Screen size categories for conditional logic
export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const SCREEN_CONFIG = {
  // Small phones (like iPhone SE)
  xs: {
    name: 'Extra Small',
    minWidth: BREAKPOINTS.xs,
    maxWidth: BREAKPOINTS.sm - 1,
    gridColumns: 4,
    padding: 12,
    spacing: 'compact',
  },
  // Standard phones (most common)
  sm: {
    name: 'Small',
    minWidth: BREAKPOINTS.sm,
    maxWidth: BREAKPOINTS.md - 1,
    gridColumns: 4,
    padding: 16,
    spacing: 'normal',
  },
  // Tablets
  md: {
    name: 'Medium',
    minWidth: BREAKPOINTS.md,
    maxWidth: BREAKPOINTS.lg - 1,
    gridColumns: 8,
    padding: 20,
    spacing: 'normal',
  },
  // Large tablets / small desktop
  lg: {
    name: 'Large',
    minWidth: BREAKPOINTS.lg,
    maxWidth: BREAKPOINTS.xl - 1,
    gridColumns: 12,
    padding: 24,
    spacing: 'spacious',
  },
  // Desktop
  xl: {
    name: 'Extra Large',
    minWidth: BREAKPOINTS.xl,
    maxWidth: BREAKPOINTS['2xl'] - 1,
    gridColumns: 12,
    padding: 32,
    spacing: 'spacious',
  },
  // Large desktop
  '2xl': {
    name: 'Extra Extra Large',
    minWidth: BREAKPOINTS['2xl'],
    maxWidth: Infinity,
    gridColumns: 12,
    padding: 40,
    spacing: 'spacious',
  },
};

// Responsive typography scale
export const RESPONSIVE_FONT_SIZES = {
  h1: {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40,
  },
  h2: {
    xs: 20,
    sm: 24,
    md: 28,
    lg: 32,
    xl: 36,
  },
  h3: {
    xs: 18,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },
  h4: {
    xs: 16,
    sm: 18,
    md: 20,
    lg: 24,
    xl: 28,
  },
  body: {
    xs: 14,
    sm: 14,
    md: 16,
    lg: 16,
    xl: 16,
  },
  bodySmall: {
    xs: 12,
    sm: 12,
    md: 13,
    lg: 14,
    xl: 14,
  },
};

// Responsive spacing scale
export const RESPONSIVE_SPACING = {
  xs: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  sm: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  md: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  lg: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },
  xl: {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
};

// Safe area considerations for mobile apps
export const SAFE_AREA = {
  // Notched phones (iPhone X and newer)
  notch: {
    top: 44,
    bottom: 34,
  },
  // Standard phones
  standard: {
    top: 0,
    bottom: 0,
  },
};
