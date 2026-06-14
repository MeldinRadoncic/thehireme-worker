import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Text } from './Text';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'large',
  color,
}) => {
  const { colors, spacing } = useThemedStyles();
  const spinnerColor = color || colors.primary.main;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.lg,
      }}
    >
      <ActivityIndicator size={size} color={spinnerColor} />
      {message && <Text variant="body">{message}</Text>}
    </View>
  );
};
