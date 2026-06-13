/**
 * useThemedStyles Hook
 * Provides theme-aware styling utilities
 *
 * Usage:
 * const { colors, shadows, spacing } = useThemedStyles();
 * <View style={{ backgroundColor: colors.background.primary }} />
 */

import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getTheme } from '@/constants/themes';
import { SHADOWS } from '@/constants/shadows';
import { MOTION, OPACITY, Z_INDEX } from '@/constants/motion';
import { SPACING, SPACING_PRESETS, COMPONENT_SIZES } from '@/constants/spacing';
import { TYPOGRAPHY, FONTS } from '@/constants/typography';

export const useThemedStyles = () => {
  const { theme } = useTheme();

  return useMemo(() => {
    const themeData = getTheme(theme);

    return {
      // Colors - adapts based on theme
      colors: themeData.colors,
      isDark: themeData.isDark,

      // Static tokens (same in both themes)
      shadows: SHADOWS,
      motion: MOTION,
      opacity: OPACITY,
      zIndex: Z_INDEX,
      spacing: SPACING,
      spacingPresets: SPACING_PRESETS,
      componentSizes: COMPONENT_SIZES,
      typography: TYPOGRAPHY,
      fonts: FONTS,

      // Helpers
      getTheme: () => themeData,
    };
  }, [theme]);
};

/**
 * Simpler hook - just get colors
 */
export const useThemedColors = () => {
  const { theme } = useTheme();
  return useMemo(() => getTheme(theme).colors, [theme]);
};
