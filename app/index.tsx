import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SplashScreen() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAppAuth();
  const { isLoading: languageLoading } = useLanguage();

  useEffect(() => {
    if (!isLoaded || languageLoading) return;

    if (isSignedIn) {
      router.replace('/(root)/dashboard');
    } else {
      router.replace('/(auth)/welcome');
    }
  }, [isLoaded, languageLoading, isSignedIn]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}
