import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface LabelProps {
  text: string;
  required?: boolean;
  color?: string;
}

export const Label: React.FC<LabelProps> = ({
  text,
  required = false,
  color,
}) => {
  const { colors, spacing, typography, fonts } = useThemedStyles();
  const labelColor = color || colors.text.primary;

  return (
    <View style={{ flexDirection: 'row', marginBottom: spacing.sm, alignItems: 'center' }}>
      <Text
        style={{
          color: labelColor,
          fontSize: typography.label.fontSize,
          fontWeight: fonts.weight.bold,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
      {required && (
        <Text
          style={{
            color: colors.status.error,
            marginLeft: spacing.xs,
            fontWeight: fonts.weight.bold,
          }}
        >
          *
        </Text>
      )}
    </View>
  );
};
