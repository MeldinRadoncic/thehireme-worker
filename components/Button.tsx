import React, { useState } from 'react';
import { TouchableOpacity, Text as RNText, View, ActivityIndicator, AccessibilityRole } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface ButtonProps {
  // Content
  title: string;
  onPress: () => void;

  // Styling
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;

  // State
  disabled?: boolean;
  loading?: boolean;

  // Icons
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  // Use dynamic theme instead of static THEME
  const { colors, spacing, spacingPresets, shadows, opacity, typography, fonts, a11y } = useThemedStyles();

  const getButtonStyle = () => {
    const baseStyle: any = {
      borderRadius: spacingPresets.radius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      minHeight: a11y.touchTargetSize,
    };

    // Size variants
    const sizeStyles = {
      small: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        minHeight: 36,
      },
      medium: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        minHeight: 44,
      },
      large: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        minHeight: 52,
      },
    };

    // Color variants with state handling
    const getColorStyle = () => {
      // Disabled state
      if (disabled || loading) {
        return {
          primary: {
            backgroundColor: colors.background.tertiary,
            opacity: opacity.disabled,
          },
          secondary: {
            backgroundColor: colors.background.tertiary,
            opacity: opacity.disabled,
          },
          ghost: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: colors.borders.light,
            opacity: opacity.disabled,
          },
        };
      }

      // Pressed state
      if (isPressed) {
        return {
          primary: {
            backgroundColor: colors.primary.dark,
            ...shadows.md,
          },
          secondary: {
            backgroundColor: colors.background.secondary,
            ...shadows.md,
          },
          ghost: {
            backgroundColor: colors.primary.main,
            opacity: opacity.hover,
            borderWidth: 2,
            borderColor: colors.primary.main,
          },
        };
      }

      // Normal state
      return {
        primary: {
          backgroundColor: colors.primary.main,
          ...shadows.sm,
        },
        secondary: {
          backgroundColor: colors.background.tertiary,
          ...shadows.sm,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary.main,
        },
      };
    };

    const colorStyles = getColorStyle()[variant] || getColorStyle().primary;

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...colorStyles,
      width: fullWidth ? '100%' : 'auto',
    };
  };

  const getTextStyle = () => {
    const colorMap = {
      primary: colors.text.primary,
      secondary: colors.text.primary,
      ghost: disabled || loading ? colors.text.muted : colors.primary.main,
    };

    return {
      color: colorMap[variant],
      fontSize: typography.button.fontSize,
      fontWeight: fonts.weight.bold,
    };
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={getTextStyle().color} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <RNText style={getTextStyle()}>{title}</RNText>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </>
  );

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.9}
      // Accessibility (a11y)
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      testID={testID || `button-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {content}
    </TouchableOpacity>
  );
};
