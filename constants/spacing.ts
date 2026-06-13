/**
 * TheHireMe Spacing System
 * Consistent spacing values for padding, margins, and gaps
 * Uses 4px as base unit (Tailwind-compatible)
 */

export const SPACING = {
  // Extra small - 4px
  xs: 4,
  // Small - 8px
  sm: 8,
  // Medium - 12px
  md: 12,
  // Large - 16px
  lg: 16,
  // Extra Large - 20px
  xl: 20,
  // 2XL - 24px
  '2xl': 24,
  // 3XL - 32px
  '3xl': 32,
  // 4XL - 40px
  '4xl': 40,
  // 5XL - 48px
  '5xl': 48,
  // 6XL - 64px
  '6xl': 64,
};

// Common spacing combinations
export const SPACING_PRESETS = {
  // Padding presets
  padding: {
    // Compact - for small components
    compact: {
      vertical: SPACING.sm,
      horizontal: SPACING.md,
    },
    // Normal - for standard components
    normal: {
      vertical: SPACING.md,
      horizontal: SPACING.lg,
    },
    // Spacious - for premium cards
    spacious: {
      vertical: SPACING.lg,
      horizontal: SPACING.xl,
    },
  },

  // Margin presets
  margin: {
    // Tight spacing between elements
    tight: SPACING.xs,
    // Normal spacing between elements
    normal: SPACING.md,
    // Loose spacing between sections
    loose: SPACING.lg,
    // Very loose spacing between major sections
    veryLoose: SPACING.xl,
  },

  // Gap presets (for flex/grid)
  gap: {
    // Small gap between items
    small: SPACING.sm,
    // Medium gap between items
    medium: SPACING.md,
    // Large gap between items
    large: SPACING.lg,
  },

  // Border radius presets
  radius: {
    // Subtle rounding
    sm: 8,
    // Standard rounding
    md: 12,
    // Large rounding
    lg: 16,
    // Extra large rounding (cards)
    xl: 20,
    // Full circle
    full: 999,
  },
};

// Screen padding (horizontal edges)
export const SCREEN_PADDING = SPACING.lg; // 16px on each side

// Common component sizes
export const COMPONENT_SIZES = {
  // Icon button sizes
  iconButton: {
    small: 32,
    medium: 40,
    large: 48,
  },

  // Avatar sizes
  avatar: {
    small: 40,
    medium: 56,
    large: 80,
  },

  // Button heights
  button: {
    small: 36,
    medium: 44,
    large: 52,
  },

  // Input heights
  input: {
    small: 36,
    medium: 44,
    large: 52,
  },
};
