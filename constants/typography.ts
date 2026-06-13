/**
 * TheHireMe Typography System
 * Font families, sizes, weights, and line heights
 */

// Font Families
export const FONTS = {
  family: {
    // Primary font for headings - bold, modern
    heading: 'System',
    // Body font - clean, readable
    body: 'System',
  },

  weight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },

  size: {
    // Extra small
    xs: 12,
    // Small
    sm: 14,
    // Base/Normal
    base: 16,
    // Large
    lg: 18,
    // Extra Large
    xl: 20,
    // 2xl
    '2xl': 24,
    // 3xl
    '3xl': 28,
    // 4xl
    '4xl': 32,
    // 5xl
    '5xl': 40,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// Typography presets for consistent text styling
export const TYPOGRAPHY = {
  // Heading 1 - Hero/Page titles
  h1: {
    fontSize: FONTS.size['5xl'],
    fontWeight: FONTS.weight.black,
    lineHeight: FONTS.lineHeight.tight,
    letterSpacing: -0.5,
  },

  // Heading 2 - Section titles
  h2: {
    fontSize: FONTS.size['4xl'],
    fontWeight: FONTS.weight.black,
    lineHeight: FONTS.lineHeight.tight,
    letterSpacing: -0.3,
  },

  // Heading 3 - Card titles, major labels
  h3: {
    fontSize: FONTS.size['2xl'],
    fontWeight: FONTS.weight.black,
    lineHeight: FONTS.lineHeight.tight,
    letterSpacing: -0.2,
  },

  // Heading 4 - Form labels, subheadings
  h4: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: 0,
  },

  // Body - Regular text
  body: {
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.normal,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: 0,
  },

  // Body Secondary - Smaller body text
  bodySmall: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.normal,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: 0,
  },

  // Caption - Very small text
  caption: {
    fontSize: FONTS.size.xs,
    fontWeight: FONTS.weight.medium,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: 0.5,
  },

  // Button text
  button: {
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.bold,
    lineHeight: FONTS.lineHeight.tight,
    letterSpacing: -0.1,
  },

  // Input label
  label: {
    fontSize: FONTS.size.xs,
    fontWeight: FONTS.weight.bold,
    lineHeight: FONTS.lineHeight.normal,
    letterSpacing: 0.5,
  },
};
