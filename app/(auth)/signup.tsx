import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Input, ErrorMessage } from '@/components';
import { THEME } from '@/constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
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
    <ScrollView style={{ flex: 1, backgroundColor: THEME.colors.background.primary }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ paddingHorizontal: THEME.spacing.lg, paddingTop: THEME.spacing.lg, paddingBottom: THEME.spacing['4xl'] }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: THEME.spacing.lg, flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm }}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.colors.text.secondary} />
          <Text variant="body">Back</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text variant="h2" style={{ marginBottom: THEME.spacing.md }}>
          Get Started
        </Text>
        <Text variant="body" color="secondary">
          Create your TheHireMe profile and start connecting with clients
        </Text>
      </View>

      {/* Form Section */}
      <View style={{ paddingHorizontal: THEME.spacing.lg, paddingBottom: THEME.spacing.lg }}>
        <View style={{ gap: THEME.spacing.md, marginBottom: THEME.spacing.lg }}>
          {/* Name Fields */}
          <View style={{ flexDirection: 'row', gap: THEME.spacing.md }}>
            <View style={{ flex: 1 }}>
              <Input
                label="First Name"
                placeholder="John"
                value={firstName}
                onChangeText={setFirstName}
                disabled={loading}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChangeText={setLastName}
                disabled={loading}
              />
            </View>
          </View>

          {/* Email Input */}
          <Input
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChangeText={setEmail}
            disabled={loading}
          />

          {/* Password Input */}
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            disabled={loading}
          />

          {/* Terms Checkbox */}
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            style={{ flexDirection: 'row', alignItems: 'flex-start', gap: THEME.spacing.md, marginTop: THEME.spacing.md }}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: THEME.spacingPresets.radius.sm,
                borderWidth: 2,
                borderColor: termsAccepted ? THEME.colors.primary.main : THEME.colors.borders.light,
                backgroundColor: termsAccepted ? THEME.colors.primary.main : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: THEME.spacing.xs,
              }}
            >
              {termsAccepted && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
            <Text variant="bodySmall" color="secondary" style={{ flex: 1 }}>
              I agree to the{' '}
              <Text variant="bodySmall" color="primary">Terms of Service</Text> and understand I'll start with 100 free credits
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}
        </View>

        {/* Sign Up Button */}
        <Button
          title="Create Account"
          onPress={handleSignUp}
          disabled={loading || !firstName || !lastName || !email || !password || !termsAccepted}
          variant="primary"
          size="large"
          icon={!loading && <Ionicons name="arrow-forward" size={20} color="white" />}
          loading={loading}
        />

        {/* Sign In Link */}
        <View style={{ marginTop: THEME.spacing['4xl'], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: THEME.spacing.sm }}>
          <Text variant="body" color="secondary">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
            <Text variant="body" color="primary">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
