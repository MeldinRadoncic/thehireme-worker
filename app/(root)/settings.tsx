/**
 * Settings Screen
 * User preferences including theme toggle
 */

import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/contexts/ThemeContext';
import { Text, ThemeToggle } from '@/components';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, spacing } = useThemedStyles();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.lg,
          paddingTop: spacing.xl,
          borderBottomWidth: 1,
          borderBottomColor: colors.borders.light,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text variant="h2">Settings</Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.xl, gap: spacing.xl }}>
        {/* Appearance Section */}
        <View>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            Appearance
          </Text>

          <View
            style={{
              backgroundColor: colors.background.secondary,
              borderRadius: spacing.spacingPresets.radius.lg,
              padding: spacing.lg,
              gap: spacing.lg,
            }}
          >
            <View>
              <Text variant="label" style={{ marginBottom: spacing.sm }}>
                Theme
              </Text>
              <Text variant="bodySmall" color="secondary" style={{ marginBottom: spacing.lg }}>
                Choose your preferred appearance
              </Text>
              <ThemeToggle size="medium" showLabel={true} />
            </View>

            {/* Current Theme Info */}
            <View
              style={{
                backgroundColor: colors.background.tertiary,
                borderRadius: spacing.spacingPresets.radius.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.sm,
              }}
            >
              <Ionicons
                name={theme === 'dark' ? 'moon' : 'sunny'}
                size={16}
                color={theme === 'dark' ? colors.secondary.yellow : colors.primary.main}
              />
              <Text variant="bodySmall" color="secondary">
                Currently using {theme} theme
              </Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View>
          <Text variant="h4" style={{ marginBottom: spacing.md }}>
            About
          </Text>

          <View
            style={{
              backgroundColor: colors.background.secondary,
              borderRadius: spacing.spacingPresets.radius.lg,
              padding: spacing.lg,
              gap: spacing.md,
            }}
          >
            <View>
              <Text variant="label">Version</Text>
              <Text variant="bodySmall" color="secondary">
                1.0.0
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: colors.borders.light,
              }}
            />

            <View>
              <Text variant="label">Theme System</Text>
              <Text variant="bodySmall" color="secondary">
                Professional dark/light theme with device persistence
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
