/**
 * TheHireMe Shadow System
 * Elevation and depth for consistent visual hierarchy
 * Based on Material Design elevation system
 */

export const SHADOWS = {
  // No shadow - flat design
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Level 1 - subtle elevation (cards, buttons on hover)
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },

  // Level 2 - small elevation (modals, dropdown menus)
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  // Level 3 - medium elevation (floating action buttons)
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },

  // Level 4 - large elevation (dialogs, popups)
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 16,
  },

  // Level 5 - extra large elevation (modals, full-screen overlays)
  '2xl': {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 24,
  },
};

// Shadow aliases for common use cases
export const SHADOW_ALIASES = {
  // Subtle shadows for cards and containers
  card: SHADOWS.sm,
  // Pressed/active state shadows
  active: SHADOWS.md,
  // Floating elements
  floating: SHADOWS.lg,
  // Modal/dialog shadows
  modal: SHADOWS.xl,
  // Full screen overlays
  overlay: SHADOWS['2xl'],
};
