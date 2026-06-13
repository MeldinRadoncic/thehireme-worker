import React, { useState } from 'react';
import { TextInput, View, Text as RNText, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface InputProps {
  // Content
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;

  // Type and behavior
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  error?: string;
  helperText?: string;

  // State
  disabled?: boolean;
  required?: boolean;

  // Appearance
  icon?: string;
  multiline?: boolean;
  numberOfLines?: number;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  error,
  helperText,
  disabled = false,
  required = false,
  icon,
  multiline = false,
  numberOfLines = 1,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Use dynamic theme instead of static THEME
  const { colors, spacing, a11y, typography, fonts } = useThemedStyles();

  const getKeyboardType = (): KeyboardTypeOptions => {
    const keyboardMap: Record<string, KeyboardTypeOptions> = {
      text: 'default',
      email: 'email-address',
      password: 'default',
      phone: 'phone-pad',
      number: 'numeric',
    };
    return keyboardMap[type] || 'default';
  };

  // Border color based on state
  const getBorderColor = () => {
    if (error) return colors.status.error;
    if (isFocused) return colors.primary.main;
    return colors.borders.light;
  };

  // Input background opacity based on state
  const getBackgroundOpacity = disabled ? 0.5 : 1;

  const inputId = testID || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <View style={{ marginBottom: spacing.lg }}>
      {label && (
        <View style={{ flexDirection: 'row', marginBottom: spacing.sm, alignItems: 'center' }}>
          <RNText
            style={{
              color: colors.text.primary,
              fontSize: typography.label.fontSize,
              fontWeight: fonts.weight.bold,
              letterSpacing: 0.5,
            }}
            // Accessibility: label for screen readers
            accessible={true}
            accessibilityRole="text"
          >
            {label}
          </RNText>
          {required && (
            <RNText
              style={{
                color: colors.status.error,
                marginLeft: spacing.xs,
                fontWeight: fonts.weight.bold,
              }}
              // Accessibility: indicate required field
              aria-label="required"
            >
              *
            </RNText>
          )}
        </View>
      )}

      {/* Input Container */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: multiline ? 'flex-start' : 'center',
          backgroundColor: colors.background.secondary,
          opacity: getBackgroundOpacity,
          borderWidth: 2,
          borderColor: getBorderColor(),
          borderRadius: THEME.spacingPresets.radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: multiline ? spacing.md : undefined,
          minHeight: multiline ? 100 : THEME.a11y.touchTargetSize,
          // Accessibility: focus outline for keyboard navigation
          ...(isFocused && {
            outlineWidth: THEME.a11y.focus.outlineWidth,
            outlineColor: THEME.a11y.focus.outlineColor,
          }),
        }}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={error ? colors.status.error : colors.text.muted}
            style={{ marginRight: spacing.sm }}
            // Accessibility: decorative icon
            accessible={false}
          />
        )}

        {/* Text Input */}
        <RNTextInput
          style={{
            flex: 1,
            color: colors.text.primary,
            fontSize: typography.body.fontSize,
            paddingVertical: multiline ? 0 : spacing.md,
            minHeight: multiline ? 100 : undefined,
            fontFamily: fonts.family.body,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={getKeyboardType()}
          multiline={multiline}
          numberOfLines={numberOfLines}
          // Accessibility
          accessible={true}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={accessibilityHint || (required ? 'This field is required' : undefined)}
          accessibilityRole="adjustable"
          accessibilityState={{
            disabled: disabled,
            invalid: !!error,
          }}
          // Link error message for screen readers (accessibility)
          // Note: aria-* attributes are not direct RN props but work for a11y tools
          testID={inputId}
        />

        {/* Password visibility toggle */}
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              padding: spacing.sm,
              minWidth: THEME.a11y.touchTargetSize,
              minHeight: THEME.a11y.touchTargetSize,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityHint="Double tap to toggle password visibility"
            testID={`${inputId}-toggle-password`}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={colors.text.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message - linked with aria-describedby */}
      {error && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: spacing.sm,
            alignItems: 'center',
            gap: spacing.xs,
          }}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          testID={errorId}
        >
          <Ionicons
            name="alert-circle"
            size={16}
            color={colors.status.error}
            accessible={false}
          />
          <RNText
            style={{
              color: colors.status.error,
              fontSize: typography.bodySmall.fontSize,
              flex: 1,
            }}
          >
            {error}
          </RNText>
        </View>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <RNText
          style={{
            color: colors.text.muted,
            fontSize: typography.bodySmall.fontSize,
            marginTop: spacing.sm,
          }}
          testID={helperId}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};
