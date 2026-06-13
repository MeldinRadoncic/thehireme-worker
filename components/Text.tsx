import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { THEME } from '@/constants/theme';

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
  const getColorValue = () => {
    const colorMap = {
      primary: THEME.colors.text.primary,
      secondary: THEME.colors.text.secondary,
      tertiary: THEME.colors.text.tertiary,
      muted: THEME.colors.text.muted,
      error: THEME.colors.status.error,
      success: THEME.colors.status.success,
    };
    return colorMap[color];
  };

  const getWeightValue = () => {
    if (weight) {
      return THEME.fonts.weight[weight];
    }
    return THEME.typography[variant].fontWeight;
  };

  const textStyle = {
    fontSize: THEME.typography[variant].fontSize,
    fontWeight: getWeightValue(),
    lineHeight: THEME.typography[variant].lineHeight * THEME.typography[variant].fontSize,
    color: getColorValue(),
    textAlign: align as any,
    letterSpacing: THEME.typography[variant].letterSpacing,
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};
