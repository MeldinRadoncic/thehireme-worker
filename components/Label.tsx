import React from 'react';
import { View, Text } from 'react-native';
import { THEME } from '@/constants/theme';

interface LabelProps {
  text: string;
  required?: boolean;
  color?: string;
}

export const Label: React.FC<LabelProps> = ({
  text,
  required = false,
  color = THEME.colors.text.primary,
}) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: THEME.spacing.sm, alignItems: 'center' }}>
      <Text
        style={{
          color,
          fontSize: THEME.typography.label.fontSize,
          fontWeight: THEME.fonts.weight.bold,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
      {required && (
        <Text
          style={{
            color: THEME.colors.status.error,
            marginLeft: THEME.spacing.xs,
            fontWeight: THEME.fonts.weight.bold,
          }}
        >
          *
        </Text>
      )}
    </View>
  );
};
