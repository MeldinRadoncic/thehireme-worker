import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, AccessibilityRole } from 'react-native';
import { THEME } from '@/constants/theme';

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

  const getButtonStyle = () => {
    const baseStyle: any = {
      borderRadius: THEME.spacingPresets.radius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: THEME.spacing.sm,
      minHeight: THEME.a11y.touchTargetSize,
    };

    // Size variants
    const sizeStyles = {
      small: {
        paddingVertical: THEME.spacing.sm,
        paddingHorizontal: THEME.spacing.md,
        minHeight: 36,
      },
      medium: {
        paddingVertical: THEME.spacing.md,
        paddingHorizontal: THEME.spacing.lg,
        minHeight: 44,
      },
      large: {
        paddingVertical: THEME.spacing.lg,
        paddingHorizontal: THEME.spacing.xl,
        minHeight: 52,
      },
    };

    // Color variants with state handling
    const getColorStyle = () => {
      // Disabled state
      if (disabled || loading) {
        return {
          primary: {
            backgroundColor: THEME.colors.background.tertiary,
            opacity: THEME.opacity.disabled,
          },
          secondary: {
            backgroundColor: THEME.colors.background.tertiary,
            opacity: THEME.opacity.disabled,
          },
          ghost: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: THEME.colors.borders.light,
            opacity: THEME.opacity.disabled,
          },
        };
      }

      // Pressed state
      if (isPressed) {
        return {
          primary: {
            backgroundColor: THEME.colors.primary.dark,
            ...THEME.shadows.md,
          },
          secondary: {
            backgroundColor: THEME.colors.background.secondary,
            ...THEME.shadows.md,
          },
          ghost: {
            backgroundColor: THEME.colors.primary.main,
            opacity: THEME.opacity.hover,
            borderWidth: 2,
            borderColor: THEME.colors.primary.main,
          },
        };
      }

      // Normal state
      return {
        primary: {
          backgroundColor: THEME.colors.primary.main,
          ...THEME.shadows.sm,
        },
        secondary: {
          backgroundColor: THEME.colors.background.tertiary,
          ...THEME.shadows.sm,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: THEME.colors.primary.main,
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
      primary: THEME.colors.text.primary,
      secondary: THEME.colors.text.primary,
      ghost: disabled || loading ? THEME.colors.text.muted : THEME.colors.primary.main,
    };

    return {
      color: colorMap[variant],
      fontSize: THEME.typography.button.fontSize,
      fontWeight: THEME.fonts.weight.bold,
    };
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={getTextStyle().color} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={getTextStyle()}>{title}</Text>
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
