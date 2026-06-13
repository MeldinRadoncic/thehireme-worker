import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSignUp } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, ErrorMessage } from '@/components';
import { THEME } from '@/constants/theme';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!isLoaded) return;
    if (code.length !== 6) {
      setError('Code must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/(onboarding)/location');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Unable to resend code');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.colors.background.primary }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ paddingHorizontal: THEME.spacing.lg, paddingTop: THEME.spacing['5xl'], paddingBottom: THEME.spacing['4xl'] }}>
        {/* Icon */}
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: THEME.colors.primary.main,
          borderRadius: THEME.spacingPresets.radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 'auto',
          alignSelf: 'center',
          marginBottom: THEME.spacing.lg,
        }}>
          <Ionicons name="mail" size={36} color="white" />
        </View>

        {/* Title */}
        <Text variant="h2" style={{ textAlign: 'center', marginBottom: THEME.spacing.md }}>
          Verify Email
        </Text>
        <Text variant="body" color="secondary" style={{ textAlign: 'center' }}>
          We sent a 6-digit code to your email. Enter it below to confirm your account.
        </Text>
      </View>

      {/* Form */}
      <View style={{ paddingHorizontal: THEME.spacing.lg, gap: THEME.spacing.xl, marginBottom: THEME.spacing.lg }}>
        {/* Code Input */}
        <View>
          <TextInput
            placeholder="000000"
            placeholderTextColor={THEME.colors.text.muted}
            value={code}
            onChangeText={(text) => setCode(text.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
            style={{
              backgroundColor: THEME.colors.background.secondary,
              borderWidth: 2,
              borderColor: THEME.colors.primary.main,
              borderRadius: THEME.spacingPresets.radius.lg,
              paddingHorizontal: THEME.spacing.lg,
              paddingVertical: THEME.spacing.lg,
              fontSize: 32,
              fontWeight: '900',
              textAlign: 'center',
              color: THEME.colors.text.primary,
              letterSpacing: 2,
            }}
          />

          {/* Progress */}
          <Text variant="bodySmall" color="secondary" style={{ textAlign: 'center', marginTop: THEME.spacing.md }}>
            {code.length} of 6 digits
          </Text>

          {/* Progress Bar */}
          <View style={{ marginTop: THEME.spacing.md, height: 4, backgroundColor: THEME.colors.background.tertiary, borderRadius: THEME.spacingPresets.radius.full, overflow: 'hidden' }}>
            <View
              style={{
                height: '100%',
                backgroundColor: THEME.colors.primary.main,
                width: `${(code.length / 6) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}
      </View>

      {/* Actions */}
      <View style={{ paddingHorizontal: THEME.spacing.lg, gap: THEME.spacing.md, marginBottom: THEME.spacing.lg }}>
        <Button
          title="Verify"
          onPress={handleVerify}
          disabled={loading || code.length !== 6}
          variant="primary"
          size="large"
          icon={!loading && <Ionicons name="arrow-forward" size={20} color="white" />}
          loading={loading}
        />

        {/* Resend */}
        <TouchableOpacity onPress={handleResend} disabled={loading} activeOpacity={0.7}>
          <Text variant="bodySmall" color="secondary" style={{ textAlign: 'center' }}>
            Didn't receive code?{' '}
            <Text variant="bodySmall" color="primary">Resend</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
