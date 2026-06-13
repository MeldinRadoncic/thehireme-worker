/**
 * TheHireMe Design System - Complete Theme & Tokens Export
 *
 * Single entry point for all design tokens and theme system.
 *
 * Usage:
 * import { THEME, COLORS, TYPOGRAPHY, SPACING, SHADOWS, MOTION, BREAKPOINTS, A11Y } from '@/constants';
 */

// Main theme (includes everything)
export { THEME } from './theme';

// Colors and styling
export { COLORS, COLOR_ALIASES } from './colors';
export type { ColorScheme } from './colors';

// Typography
export { FONTS, TYPOGRAPHY } from './typography';

// Spacing and layout
export {
  SPACING,
  SPACING_PRESETS,
  SCREEN_PADDING,
  COMPONENT_SIZES,
} from './spacing';

// Shadows and elevation
export { SHADOWS, SHADOW_ALIASES } from './shadows';

// Motion and animation
export { MOTION, OPACITY, Z_INDEX } from './motion';

// Responsive design
export {
  BREAKPOINTS,
  SCREEN_CONFIG,
  RESPONSIVE_FONT_SIZES,
  RESPONSIVE_SPACING,
  SAFE_AREA,
} from './responsive';
export type { ScreenSize } from './responsive';

// Accessibility
export {
  A11Y,
  ARIA_ROLES,
  ARIA_ATTRIBUTES,
  A11Y_TARGET,
} from './accessibility';

/**
 * Quick Reference Guide
 *
 * COLORS:
 * import { THEME } from '@/constants';
 * const primaryColor = THEME.colors.primary.main;
 *
 * TYPOGRAPHY:
 * const titleSize = THEME.typography.h1.fontSize;
 *
 * SPACING:
 * const padding = THEME.spacing.lg;
 * const radius = THEME.spacingPresets.radius.md;
 *
 * SHADOWS:
 * const cardShadow = THEME.shadows.sm;
 *
 * MOTION:
 * const duration = THEME.motion.duration.normal;
 *
 * RESPONSIVE:
 * const isMobile = width < THEME.breakpoints.md;
 *
 * ACCESSIBILITY:
 * const touchSize = THEME.a11y.touchTargetSize;
 */
