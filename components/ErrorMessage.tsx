import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '@/constants/theme';

interface ErrorMessageProps {
  message: string;
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  showIcon = true,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: THEME.spacing.sm,
        backgroundColor: THEME.colors.status.errorLight,
        borderWidth: 1,
        borderColor: THEME.colors.status.error,
        borderRadius: THEME.spacingPresets.radius.md,
        padding: THEME.spacing.md,
        marginVertical: THEME.spacing.md,
      }}
    >
      {showIcon && (
        <Ionicons
          name="alert-circle"
          size={20}
          color={THEME.colors.status.error}
          style={{ marginTop: THEME.spacing.xs }}
        />
      )}
      <Text
        style={{
          color: THEME.colors.status.error,
          fontSize: THEME.typography.bodySmall.fontSize,
          flex: 1,
          lineHeight: THEME.typography.bodySmall.lineHeight * THEME.typography.bodySmall.fontSize,
        }}
      >
        {message}
      </Text>
    </View>
  );
};
