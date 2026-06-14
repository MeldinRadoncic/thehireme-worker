import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSignIn } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Input, ErrorMessage, BackButton } from '@/components';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useLanguageTranslations } from '@/hooks/useLanguageTranslations';
import { useBackButton } from '@/hooks/useBackButton';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { colors, spacing } = useThemedStyles();
  const { shouldShowBack, handleBack } = useBackButton({ screen: 'login' });
  const t = useLanguageTranslations('login-screen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!isLoaded) return;
    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/(root)');
      } else {
        setError('Sign in failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button at Top Left - Safe Area */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing['4xl'] }}>
        {/* Back Button - Top Left (Safe Area, below status bar) */}
        <BackButton
          onPress={handleBack}
          showButton={shouldShowBack}
          size="medium"
          style={{ marginBottom: spacing.lg, alignSelf: 'flex-start' }}
        />

        {/* Title */}
        <Text variant="h2" style={{ marginBottom: spacing.md }}>
          {t.welcomeBackTitle}
        </Text>
        <Text variant="body" color="secondary">
          {t.welcomeBackSubtitle}
        </Text>
      </View>

      {/* Form Section */}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
        <View style={{ gap: spacing.lg, marginBottom: spacing.lg }}>
          {/* Email Input */}
          <Input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            disabled={loading}
            label={t.emailLabel}
          />

          {/* Password Input */}
          <Input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            disabled={loading}
            label={t.passwordLabel}
          />

          {/* Forgot Password */}
          <TouchableOpacity activeOpacity={0.7}>
            <Text variant="body" color="primary">
              {t.forgotPasswordButton}
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}
        </View>

        {/* Sign In Button */}
        <Button
          title={t.signInButton}
          onPress={handleSignIn}
          disabled={loading || !email || !password}
          variant="primary"
          size="large"
          icon={!loading && <Ionicons name="arrow-forward" size={20} color="white" />}
          loading={loading}
        />

        {/* Sign Up Link */}
        <View style={{ marginTop: spacing['4xl'], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }}>
          <Text variant="body" color="secondary">{t.noAccountText}</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')} activeOpacity={0.7}>
            <Text variant="body" color="primary">{t.signUpLink}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
