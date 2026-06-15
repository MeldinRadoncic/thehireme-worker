/**
 * useLanguageTranslations Hook
 *
 * Loads translations for a screen based on current language
 *
 * Usage:
 * const t = useLanguageTranslations('welcome-screen');
 * <Text>{t.welcomeTitle}</Text>
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

import { welcomeScreenTranslations } from '@/languages/welcome-screen';
import { loginScreenTranslations } from '@/languages/login-screen';
import { signupScreenTranslations } from '@/languages/signup-screen';
import { verifyEmailScreenTranslations } from '@/languages/verify-email-screen';

type Language = 'en' | 'bs' | 'hr' | 'me' | 'de' | 'fr' | 'nl' | 'pl';

interface TranslationFile {
  [key: string]: Record<string, string>;
}

const translationMap: Record<string, TranslationFile> = {
  'welcome-screen': welcomeScreenTranslations,
  'login-screen': loginScreenTranslations,
  'signup-screen': signupScreenTranslations,
  'verify-email-screen': verifyEmailScreenTranslations,
};

export const useLanguageTranslations = (screenName: string): Record<string, string> => {
  const { language } = useLanguage();

  return useMemo(() => {
    const translationFile = translationMap[screenName];

    if (!translationFile) {
      console.warn(`Translation file not found for screen: ${screenName}`);
      return {};
    }

    // Get translations for current language, fallback to English
    const translations = translationFile[language] || translationFile.en || {};

    // Log if using fallback
    if (!translationFile[language] && translationFile.en) {
      console.warn(`No translations found for language: ${language}, using English fallback for ${screenName}`);
    }

    return translations;
  }, [language, screenName]);
};

export default useLanguageTranslations;
