/**
 * TheHireMe Comprehensive Theme System
 * Enterprise-grade design tokens for professional, scalable development
 *
 * This is the single source of truth for all design decisions.
 * All screens, components, and styles reference this file.
 * Update design tokens here and they apply everywhere automatically.
 *
 * Usage:
 * import { THEME } from '@/constants/theme';
 *
 * Includes:
 * - Colors & contrast (WCAG AA compliant)
 * - Typography & readability
 * - Spacing & layout
 * - Shadows & elevation
 * - Motion & animations
 * - Responsive design
 * - Accessibility (a11y)
 */

import { COLORS, COLOR_ALIASES } from './colors';
import { FONTS, TYPOGRAPHY } from './typography';
import { SPACING, SPACING_PRESETS, SCREEN_PADDING, COMPONENT_SIZES } from './spacing';
import { SHADOWS, SHADOW_ALIASES } from './shadows';
import { MOTION, OPACITY, Z_INDEX } from './motion';
import { BREAKPOINTS, SCREEN_CONFIG, RESPONSIVE_FONT_SIZES, RESPONSIVE_SPACING, SAFE_AREA } from './responsive';
import { A11Y, ARIA_ROLES, ARIA_ATTRIBUTES, A11Y_TARGET } from './accessibility';

export const THEME = {
  // ============================================================
  // COLORS - WCAG AA compliant color system
  // ============================================================
  colors: COLORS,
  colorAliases: COLOR_ALIASES,

  // ============================================================
  // TYPOGRAPHY - Professional typography scale
  // ============================================================
  fonts: FONTS,
  typography: TYPOGRAPHY,

  // ============================================================
  // SPACING - Consistent spacing system
  // ============================================================
  spacing: SPACING,
  spacingPresets: SPACING_PRESETS,
  screenPadding: SCREEN_PADDING,
  componentSizes: COMPONENT_SIZES,

  // ============================================================
  // SHADOWS & ELEVATION - Material Design elevation system
  // ============================================================
  shadows: SHADOWS,
  shadowAliases: SHADOW_ALIASES,

  // ============================================================
  // MOTION & ANIMATIONS - Micro-interactions & transitions
  // ============================================================
  motion: MOTION,
  opacity: OPACITY,
  zIndex: Z_INDEX,

  // ============================================================
  // RESPONSIVE DESIGN - Mobile-first breakpoints
  // ============================================================
  breakpoints: BREAKPOINTS,
  screenConfig: SCREEN_CONFIG,
  responsiveFontSizes: RESPONSIVE_FONT_SIZES,
  responsiveSpacing: RESPONSIVE_SPACING,
  safeArea: SAFE_AREA,

  // ============================================================
  // ACCESSIBILITY - WCAG 2.1 Level AA compliance
  // ============================================================
  a11y: A11Y,
  ariaRoles: ARIA_ROLES,
  ariaAttributes: ARIA_ATTRIBUTES,
  a11yTarget: A11Y_TARGET,

  // ============================================================
  // DEPRECATED - Legacy className helpers (use style objects instead)
  // ============================================================
  classNames: {
    // Background colors
    bg: {
      primary: 'bg-slate-900',
      secondary: 'bg-slate-800',
      tertiary: 'bg-slate-700',
      input: 'bg-slate-800',
      card: 'bg-slate-800',
    },

    // Text colors
    text: {
      primary: 'text-white',
      secondary: 'text-gray-200',
      tertiary: 'text-gray-300',
      muted: 'text-gray-400',
    },

    // Border colors
    border: {
      light: 'border-slate-700',
      medium: 'border-slate-600',
      accent: 'border-blue-500',
    },

    // Accent colors
    accent: {
      blue: 'text-blue-400',
      cyan: 'text-cyan-400',
      yellow: 'text-yellow-400',
    },

    // Button styles
    button: {
      primary: 'bg-blue-500 rounded-xl py-4 flex-row items-center justify-center',
      secondary: 'bg-slate-700 rounded-xl py-4 flex-row items-center justify-center',
      ghost: 'bg-transparent border-2 border-blue-500 rounded-xl py-4 flex-row items-center justify-center',
    },

    // Input styles
    input: {
      base: 'bg-slate-800 border border-slate-600 rounded-xl px-4 py-4 text-base text-white placeholder:text-gray-400',
    },

    // Card styles
    card: {
      base: 'bg-slate-800 border border-slate-700 rounded-2xl p-6',
      bordered: 'bg-slate-800 border-2 border-blue-500 rounded-2xl p-6',
    },
  },
};

// Export individual modules for direct imports if needed
export { COLORS, COLOR_ALIASES } from './colors';
export { FONTS, TYPOGRAPHY } from './typography';
export { SPACING, SPACING_PRESETS, SCREEN_PADDING, COMPONENT_SIZES } from './spacing';
export { SHADOWS, SHADOW_ALIASES } from './shadows';
export { MOTION, OPACITY, Z_INDEX } from './motion';
export { BREAKPOINTS, SCREEN_CONFIG, RESPONSIVE_FONT_SIZES, RESPONSIVE_SPACING, SAFE_AREA } from './responsive';
export { A11Y, ARIA_ROLES, ARIA_ATTRIBUTES, A11Y_TARGET } from './accessibility';
