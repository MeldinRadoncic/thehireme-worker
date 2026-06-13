import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth as useClerkAuth } from '@clerk/expo';
import { useRouter, useSegments } from 'expo-router';

type AuthContextType = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: any;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user, signOut } = useClerkAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    setIsNavigationReady(true);
  }, [isLoaded]);

  useEffect(() => {
    if (!isNavigationReady) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';

    if (!isSignedIn && !inAuthGroup && !inOnboardingGroup) {
      router.replace('/(auth)/welcome');
    } else if (isSignedIn && (inAuthGroup || inOnboardingGroup)) {
      router.replace('/(root)');
    }
  }, [isSignedIn, isNavigationReady, segments]);

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoaded,
        isSignedIn: !!isSignedIn,
        user,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAppAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within AuthProvider');
  }
  return context;
}
