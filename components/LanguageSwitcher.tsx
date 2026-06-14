/**
 * LanguageSwitcher Component
 *
 * Allows users to switch between supported languages
 * Shows current language and dropdown/modal to select new language
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { Text } from './Text';

type Language = 'en' | 'bs' | 'hr' | 'me' | 'de' | 'fr' | 'nl' | 'pl';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'me', name: 'Montenegrin', nativeName: 'Црногорски', flag: '🇲🇪' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
];

interface LanguageSwitcherProps {
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  showLabel = true,
  size = 'medium',
}) => {
  const { language, setLanguage } = useLanguage();
  const { colors, spacing, spacingPresets } = useThemedStyles();
  const [showModal, setShowModal] = useState(false);

  const currentLanguage = LANGUAGES.find((lang) => lang.code === language);

  const handleSelectLanguage = async (lang: Language) => {
    await setLanguage(lang);
    setShowModal(false);
  };

  const sizeConfig = {
    small: { padding: spacing.sm, fontSize: 12 },
    medium: { padding: spacing.md, fontSize: 14 },
    large: { padding: spacing.lg, fontSize: 16 },
  };

  const config = sizeConfig[size];

  return (
    <>
      {/* Language Selector Button */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: config.padding,
          paddingVertical: config.padding,
          backgroundColor: colors.background.secondary,
          borderRadius: spacingPresets.radius.md,
          gap: spacing.sm,
        }}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Select language: ${currentLanguage?.name}`}
      >
        <Text style={{ fontSize: 20 }}>{currentLanguage?.flag}</Text>
        {showLabel && (
          <Text variant="body" style={{ fontSize: config.fontSize }}>
            {currentLanguage?.nativeName}
          </Text>
        )}
        <Ionicons
          name="chevron-down"
          size={config.fontSize}
          color={colors.text.primary}
          style={{ marginLeft: spacing.xs }}
        />
      </TouchableOpacity>

      {/* Language Selection Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
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
          onPress={() => setShowModal(false)}
        >
          {/* Modal Content */}
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: colors.background.secondary,
              borderRadius: spacingPresets.radius.lg,
              maxWidth: 300,
              maxHeight: 400,
              marginHorizontal: spacing.lg,
            }}
          >
            {/* Modal Header */}
            <View
              style={{
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.borders.light,
              }}
            >
              <Text variant="h4" style={{ textAlign: 'center' }}>
                Select Language
              </Text>
            </View>

            {/* Languages List */}
            <ScrollView style={{ paddingVertical: spacing.md }}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleSelectLanguage(lang.code)}
                  style={{
                    paddingHorizontal: spacing.lg,
                    paddingVertical: spacing.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.md,
                    backgroundColor:
                      language === lang.code
                        ? colors.background.tertiary
                        : 'transparent',
                  }}
                  activeOpacity={0.6}
                >
                  {/* Flag */}
                  <Text style={{ fontSize: 24 }}>{lang.flag}</Text>

                  {/* Language Names */}
                  <View style={{ flex: 1 }}>
                    <Text
                      variant="label"
                      style={{
                        color:
                          language === lang.code
                            ? colors.primary.main
                            : colors.text.primary,
                      }}
                    >
                      {lang.name}
                    </Text>
                    <Text
                      variant="bodySmall"
                      color="secondary"
                    >
                      {lang.nativeName}
                    </Text>
                  </View>

                  {/* Checkmark if Selected */}
                  {language === lang.code && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.primary.main}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default LanguageSwitcher;
