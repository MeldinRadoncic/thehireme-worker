import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/contexts/ThemeContext';
import { Text } from './Text';

interface BackButtonProps {
  onPress: () => void;
  showButton: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: any;
  accessibilityLabel?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  showButton,
  size = 'medium',
  style,
  accessibilityLabel = 'Go back',
}) => {
  const { spacing, a11y } = useThemedStyles();
  const { isDark } = useTheme();

  if (!showButton) {
    return null;
  }

  const sizeMap = {
    small: { icon: 16, padding: spacing.sm },
    medium: { icon: 24, padding: spacing.md },
    large: { icon: 28, padding: spacing.lg },
  };

  const config = sizeMap[size];

  // Theme-aware icon color: white on dark mode, black on light mode
  const iconColor = isDark ? '#ffffff' : '#1a202c';

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={{
        padding: config.padding,
        minWidth: a11y.touchTargetSize,
        minHeight: a11y.touchTargetSize,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Double tap to go back to the previous screen"
      activeOpacity={0.7}
    >
      <Ionicons
        name="chevron-back"
        size={config.icon}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
