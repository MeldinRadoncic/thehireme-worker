/**
 * Theme Toggle Component
 * Professional dark/light theme switcher
 *
 * Usage:
 * <ThemeToggle />
 */

import React from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Text } from './Text';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = true,
  size = 'medium',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { colors, spacing } = useThemedStyles();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: {
            paddingHorizontal: spacing.sm,
            paddingVertical: spacing.xs,
            gap: spacing.sm,
          },
          icon: 20,
        };
      case 'large':
        return {
          container: {
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            gap: spacing.md,
          },
          icon: 28,
        };
      default:
        return {
          container: {
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            gap: spacing.sm,
          },
          icon: 24,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.spacingPresets.radius.md,
        borderWidth: 1,
        borderColor: colors.borders.light,
        minHeight: 44,
        ...sizeStyles.container,
      }}
      accessible={true}
      accessibilityRole="switch"
      accessibilityLabel={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
      accessibilityHint={`Currently in ${theme} mode. Double tap to switch.`}
      accessibilityState={{ checked: theme === 'dark' }}
      testID="theme-toggle"
    >
      <Ionicons
        name={theme === 'dark' ? 'moon' : 'sunny'}
        size={sizeStyles.icon}
        color={theme === 'dark' ? colors.secondary.yellow : colors.primary.main}
      />

      {showLabel && (
        <Text
          variant={size === 'small' ? 'bodySmall' : 'body'}
          color="primary"
          style={{ textTransform: 'capitalize' }}
        >
          {theme} Mode
        </Text>
      )}
    </TouchableOpacity>
  );
};
