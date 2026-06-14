import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';

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
  const { colors, spacingPresets } = useThemedStyles();

  const getPaddingValue = () => {
    const paddingMap = {
      compact: spacingPresets.padding.compact,
      normal: spacingPresets.padding.normal,
      spacious: spacingPresets.padding.spacious,
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
        backgroundColor: colors.background.secondary,
        borderWidth: 0,
      },
      bordered: {
        backgroundColor: colors.background.secondary,
        borderWidth: 2,
        borderColor: colors.primary.main,
      },
      elevated: {
        backgroundColor: colors.background.secondary,
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
    borderRadius: spacingPresets.radius.lg,
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
