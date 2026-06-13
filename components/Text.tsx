import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'error' | 'success';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align = 'left',
  children,
  style,
  ...props
}) => {
  // Use dynamic theme instead of static THEME
  const { colors, typography, fonts } = useThemedStyles();

  const getColorValue = () => {
    const colorMap = {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      tertiary: colors.text.tertiary,
      muted: colors.text.muted,
      error: colors.status.error,
      success: colors.status.success,
    };
    return colorMap[color];
  };

  const getWeightValue = () => {
    if (weight) {
      return fonts.weight[weight];
    }
    return typography[variant].fontWeight;
  };

  const textStyle = {
    fontSize: typography[variant].fontSize,
    fontWeight: getWeightValue(),
    lineHeight: typography[variant].lineHeight * typography[variant].fontSize,
    color: getColorValue(),
    textAlign: align as any,
    letterSpacing: typography[variant].letterSpacing,
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};
