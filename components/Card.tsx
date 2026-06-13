import React from 'react';
import { View, ViewStyle } from 'react-native';
import { THEME } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'compact' | 'normal' | 'spacious';
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'normal',
  style,
  onPress,
}) => {
  const getPaddingValue = () => {
    const paddingMap = {
      compact: THEME.spacingPresets.padding.compact,
      normal: THEME.spacingPresets.padding.normal,
      spacious: THEME.spacingPresets.padding.spacious,
    };
    const p = paddingMap[padding];
    return {
      paddingVertical: p.vertical,
      paddingHorizontal: p.horizontal,
    };
  };

  const getVariantStyle = () => {
    const variantMap = {
      default: {
        backgroundColor: THEME.colors.background.secondary,
        borderWidth: 0,
      },
      bordered: {
        backgroundColor: THEME.colors.background.secondary,
        borderWidth: 2,
        borderColor: THEME.colors.primary.main,
      },
      elevated: {
        backgroundColor: THEME.colors.background.secondary,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    };
    return variantMap[variant];
  };

  const cardStyle = {
    borderRadius: THEME.spacingPresets.radius.lg,
    ...getPaddingValue(),
    ...getVariantStyle(),
    ...style,
  };

  return (
    <View style={cardStyle} onTouchEnd={onPress}>
      {children}
    </View>
  );
};
