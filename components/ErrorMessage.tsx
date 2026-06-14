import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface ErrorMessageProps {
  message: string;
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  showIcon = true,
}) => {
  const { colors, spacing, spacingPresets, typography } = useThemedStyles();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.sm,
        backgroundColor: colors.status.errorLight,
        borderWidth: 1,
        borderColor: colors.status.error,
        borderRadius: spacingPresets.radius.md,
        padding: spacing.md,
        marginVertical: spacing.md,
      }}
    >
      {showIcon && (
        <Ionicons
          name="alert-circle"
          size={20}
          color={colors.status.error}
          style={{ marginTop: spacing.xs }}
        />
      )}
      <Text
        style={{
          color: colors.status.error,
          fontSize: typography.bodySmall.fontSize,
          flex: 1,
          lineHeight: typography.bodySmall.lineHeight * typography.bodySmall.fontSize,
        }}
      >
        {message}
      </Text>
    </View>
  );
};
