import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAppAuth();
  const { isLoading: languageLoading } = useLanguage();
  const { colors } = useThemedStyles();

  useEffect(() => {
    if (!isLoaded || languageLoading) return;

    if (isSignedIn) {
      router.replace('/(root)/dashboard');
    } else {
      router.replace('/(auth)/welcome');
    }
  }, [isLoaded, languageLoading, isSignedIn]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ActivityIndicator size="large" color={colors.text.primary} />
    </View>
  );
}
