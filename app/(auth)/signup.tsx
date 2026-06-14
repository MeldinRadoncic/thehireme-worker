import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Input, ErrorMessage, BackButton } from '@/components';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useLanguageTranslations } from '@/hooks/useLanguageTranslations';
import { useBackButton } from '@/hooks/useBackButton';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const { colors, spacing, spacingPresets } = useThemedStyles();
  const { shouldShowBack, handleBack } = useBackButton({ screen: 'signup' });
  const t = useLanguageTranslations('signup-screen');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded) return;
    if (!firstName || !lastName || !email || !password || !termsAccepted) {
      setError('All fields required and terms must be accepted');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      router.push('/(auth)/verify-email');
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Unable to create account.');
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
          {t.getStartedTitle}
        </Text>
        <Text variant="body" color="secondary">
          {t.getStartedSubtitle}
        </Text>
      </View>

      {/* Form Section */}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
        <View style={{ gap: spacing.md, marginBottom: spacing.lg }}>
          {/* Name Fields */}
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <View style={{ flex: 1 }}>
              <Input
                label={t.firstNameLabel}
                placeholder={t.firstNamePlaceholder}
                value={firstName}
                onChangeText={setFirstName}
                disabled={loading}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label={t.lastNameLabel}
                placeholder={t.lastNamePlaceholder}
                value={lastName}
                onChangeText={setLastName}
                disabled={loading}
              />
            </View>
          </View>

          {/* Email Input */}
          <Input
            type="email"
            label={t.emailLabel}
            placeholder={t.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            disabled={loading}
          />

          {/* Password Input */}
          <Input
            type="password"
            label={t.passwordLabel}
            placeholder={t.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            disabled={loading}
          />

          {/* Terms Checkbox */}
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginTop: spacing.md }}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: spacingPresets.radius.sm,
                borderWidth: 2,
                borderColor: termsAccepted ? colors.primary.main : colors.borders.light,
                backgroundColor: termsAccepted ? colors.primary.main : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: spacing.xs,
              }}
            >
              {termsAccepted && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
            <Text variant="bodySmall" color="secondary" style={{ flex: 1 }}>
              {t.termsCheckbox}
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}
        </View>

        {/* Sign Up Button */}
        <Button
          title={t.createAccountButton}
          onPress={handleSignUp}
          disabled={loading || !firstName || !lastName || !email || !password || !termsAccepted}
          variant="primary"
          size="large"
          icon={!loading && <Ionicons name="arrow-forward" size={20} color="white" />}
          loading={loading}
        />

        {/* Sign In Link */}
        <View style={{ marginTop: spacing['4xl'], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }}>
          <Text variant="body" color="secondary">{t.haveAccountText}</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
            <Text variant="body" color="primary">{t.signUpLink}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
