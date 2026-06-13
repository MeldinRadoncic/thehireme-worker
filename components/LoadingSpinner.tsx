import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { THEME } from '@/constants/theme';
import { Text } from './Text';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = 'large',
  color = THEME.colors.primary.main,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: THEME.spacing.lg,
      }}
    >
      <ActivityIndicator size={size} color={color} />
      {message && <Text variant="body">{message}</Text>}
    </View>
  );
};
