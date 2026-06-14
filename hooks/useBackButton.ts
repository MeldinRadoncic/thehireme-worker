import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScreenType =
  | 'welcome'
  | 'login'
  | 'signup'
  | 'verify-email'
  | 'onboarding-step-1'
  | 'onboarding-step-2'
  | 'onboarding-step-3'
  | 'onboarding-step-4'
  | 'onboarding-step-5'
  | 'onboarding-success'
  | 'dashboard'
  | 'profile'
  | 'settings'
  | 'media'
  | 'promotions'
  | 'other';

interface UseBackButtonOptions {
  screen: ScreenType;
  onBeforeBack?: () => Promise<boolean>; // Return false to prevent back
  hasUnsavedChanges?: boolean;
  showConfirmationOnBack?: boolean;
}

export const useBackButton = ({
  screen,
  onBeforeBack,
  hasUnsavedChanges = false,
  showConfirmationOnBack = false,
}: UseBackButtonOptions) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Determine if back button should be visible
  const shouldShowBack = useCallback(() => {
    const noBackScreens = [
      'welcome',
      'onboarding-step-1',
      'dashboard',
    ];
    return !noBackScreens.includes(screen);
  }, [screen]);

  // Handle back navigation
  const handleBack = useCallback(async () => {
    // Call custom hook if provided
    if (onBeforeBack) {
      const canGoBack = await onBeforeBack();
      if (!canGoBack) return;
    }

    // Show confirmation if needed
    if (showConfirmationOnBack && hasUnsavedChanges) {
      setShowConfirmation(true);
      return;
    }

    // Navigate back based on screen type
    switch (screen) {
      case 'login':
      case 'signup':
        router.back(); // Goes back to welcome
        break;

      case 'verify-email':
        router.back(); // Goes back to signup
        break;

      case 'onboarding-step-2':
      case 'onboarding-step-3':
      case 'onboarding-step-4':
      case 'onboarding-step-5':
        router.back(); // Goes back to previous step
        break;

      case 'onboarding-success':
        // Should not reach here (no back button on success)
        break;

      case 'profile':
      case 'settings':
      case 'media':
      case 'promotions':
        router.back(); // Goes back to dashboard or wherever user came from
        break;

      default:
        router.back();
    }
  }, [screen, onBeforeBack, showConfirmationOnBack, hasUnsavedChanges]);

  // Confirm and go back
  const confirmAndGoBack = useCallback(async () => {
    setShowConfirmation(false);

    // Save progress to local storage before going back
    if (screen.startsWith('onboarding-step')) {
      try {
        await AsyncStorage.setItem('onboarding_progress_saved', 'true');
      } catch (error) {
        console.warn('Failed to save onboarding progress:', error);
      }
    }

    // Actually navigate back
    switch (screen) {
      case 'onboarding-step-2':
      case 'onboarding-step-3':
      case 'onboarding-step-4':
      case 'onboarding-step-5':
        router.back();
        break;

      default:
        router.back();
    }
  }, [screen]);

  // Cancel going back
  const cancelBack = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  return {
    shouldShowBack: shouldShowBack(),
    handleBack,
    showConfirmation,
    confirmAndGoBack,
    cancelBack,
    screen,
  };
};

export default useBackButton;
