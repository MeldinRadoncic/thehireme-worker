import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '@/constants/theme';

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
    if (error) return THEME.colors.status.error;
    if (isFocused) return THEME.colors.primary.main;
    return THEME.colors.borders.light;
  };

  // Input background opacity based on state
  const getBackgroundOpacity = disabled ? THEME.opacity.disabled : 1;

  const inputId = testID || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <View style={{ marginBottom: THEME.spacing.lg }}>
      {label && (
        <View style={{ flexDirection: 'row', marginBottom: THEME.spacing.sm, alignItems: 'center' }}>
          <Text
            style={{
              color: THEME.colors.text.primary,
              fontSize: THEME.typography.label.fontSize,
              fontWeight: THEME.fonts.weight.bold,
              letterSpacing: 0.5,
            }}
            // Accessibility: label for screen readers
            accessible={true}
            accessibilityRole="text"
          >
            {label}
          </Text>
          {required && (
            <Text
              style={{
                color: THEME.colors.status.error,
                marginLeft: THEME.spacing.xs,
                fontWeight: THEME.fonts.weight.bold,
              }}
              // Accessibility: indicate required field
              aria-label="required"
            >
              *
            </Text>
          )}
        </View>
      )}

      {/* Input Container */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: multiline ? 'flex-start' : 'center',
          backgroundColor: THEME.colors.background.secondary,
          opacity: getBackgroundOpacity,
          borderWidth: 2,
          borderColor: getBorderColor(),
          borderRadius: THEME.spacingPresets.radius.md,
          paddingHorizontal: THEME.spacing.md,
          paddingVertical: multiline ? THEME.spacing.md : undefined,
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
            color={error ? THEME.colors.status.error : THEME.colors.text.muted}
            style={{ marginRight: THEME.spacing.sm }}
            // Accessibility: decorative icon
            accessible={false}
          />
        )}

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            color: THEME.colors.text.primary,
            fontSize: THEME.typography.body.fontSize,
            paddingVertical: multiline ? 0 : THEME.spacing.md,
            minHeight: multiline ? 100 : undefined,
            fontFamily: THEME.fonts.family.body,
          }}
          placeholder={placeholder}
          placeholderTextColor={THEME.colors.text.muted}
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
              padding: THEME.spacing.sm,
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
              color={THEME.colors.text.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message - linked with aria-describedby */}
      {error && (
        <View
          style={{
            flexDirection: 'row',
            marginTop: THEME.spacing.sm,
            alignItems: 'center',
            gap: THEME.spacing.xs,
          }}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          testID={errorId}
        >
          <Ionicons
            name="alert-circle"
            size={16}
            color={THEME.colors.status.error}
            accessible={false}
          />
          <Text
            style={{
              color: THEME.colors.status.error,
              fontSize: THEME.typography.bodySmall.fontSize,
              flex: 1,
            }}
          >
            {error}
          </Text>
        </View>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <Text
          style={{
            color: THEME.colors.text.muted,
            fontSize: THEME.typography.bodySmall.fontSize,
            marginTop: THEME.spacing.sm,
          }}
          testID={helperId}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};
