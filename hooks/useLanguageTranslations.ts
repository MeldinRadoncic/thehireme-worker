/**
 * useLanguageTranslations Hook
 *
 * Dynamically loads translations for a screen based on current language
 *
 * Usage:
 * const t = useLanguageTranslations('welcome-screen');
 * <Text>{t.welcomeTitle}</Text>
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

type Language = 'en' | 'bs' | 'hr' | 'me' | 'de' | 'fr' | 'nl' | 'pl';

interface TranslationFile {
  [key: string]: {
    [translationKey: string]: string;
  };
}

export const useLanguageTranslations = (screenName: string) => {
  const { language } = useLanguage();

  return useMemo(() => {
    try {
      // Dynamically import the JSON file for this screen
      const translationFile = require(`@/languages/${screenName}.json`) as TranslationFile;

      // Get translations for current language, fallback to English
      const translations = translationFile[language] || translationFile['en'] || {};

      // Create a proxy to warn about missing translations
      return new Proxy(translations, {
        get: (target, prop: string) => {
          const value = target[prop];

          if (!value) {
            console.warn(`Missing translation key: ${screenName}.${prop} for language: ${language}`);
            // Return the key name as fallback
            return prop;
          }

          return value;
        }
      }) as Record<string, string>;
    } catch (error) {
      console.warn(`Could not load translations for screen: ${screenName}`, error);
      // Return empty object with proxy to avoid crashes
      return new Proxy({}, {
        get: (target, prop: string) => {
          console.warn(`Missing translation file: ${screenName}.json`);
          return prop;
        }
      }) as Record<string, string>;
    }
  }, [language, screenName]);
};

export default useLanguageTranslations;
