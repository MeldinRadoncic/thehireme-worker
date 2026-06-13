import { useEffect } from 'react';
import '../global.css';
import { ClerkProvider } from '@clerk/expo';
import * as SecureStore from 'expo-secure-store';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LocationProvider } from '@/contexts/LocationContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function RootLayoutContent() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: { backgroundColor: isDark ? '#0f172a' : '#ffffff' }, // Light by default
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="(onboarding)"
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="(root)"
        options={{ animationEnabled: false }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ClerkProvider
            tokenCache={tokenCache}
            publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
          >
            <LanguageProvider>
              <LocationProvider>
                <AuthProvider>
                  <RootLayoutContent />
                </AuthProvider>
              </LocationProvider>
            </LanguageProvider>
          </ClerkProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
