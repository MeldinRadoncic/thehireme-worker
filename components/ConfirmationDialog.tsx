import React from 'react';
import { View, Modal, TouchableOpacity, Alert } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Text } from './Text';
import { Button } from './Button';

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDangerous?: boolean; // Red color for dangerous actions
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Yes, Discard',
  cancelText = 'Keep Editing',
  onConfirm,
  onCancel,
  isDangerous = true,
}) => {
  const { colors, spacing, spacingPresets, shadows } = useThemedStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Overlay */}
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={1}
        onPress={onCancel}
      >
        {/* Dialog Box */}
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: colors.background.secondary,
            borderRadius: spacingPresets.radius.lg,
            padding: spacing.lg,
            marginHorizontal: spacing.lg,
            ...shadows.lg,
            maxWidth: 320,
          }}
        >
          {/* Title */}
          <Text
            variant="h3"
            style={{
              marginBottom: spacing.md,
              color: isDangerous ? colors.status.error : colors.text.primary,
            }}
          >
            {title}
          </Text>

          {/* Message */}
          <Text
            variant="body"
            color="secondary"
            style={{ marginBottom: spacing.lg, lineHeight: 22 }}
          >
            {message}
          </Text>

          {/* Buttons */}
          <View style={{ gap: spacing.md }}>
            {/* Confirm Button */}
            <Button
              title={confirmText}
              onPress={onConfirm}
              variant={isDangerous ? 'primary' : 'primary'}
              size="medium"
            />

            {/* Cancel Button */}
            <Button
              title={cancelText}
              onPress={onCancel}
              variant="ghost"
              size="medium"
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationDialog;
