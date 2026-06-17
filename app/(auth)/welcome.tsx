import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Card, BackButton, LanguageSwitcher } from '@/components';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useLanguageTranslations } from '@/hooks/useLanguageTranslations';
import { useBackButton } from '@/hooks/useBackButton';

export default function WelcomeScreen() {
  const router = useRouter();
  const themed = useThemedStyles();
  const { colors, spacing, spacingPresets } = themed;
  const { shouldShowBack, handleBack } = useBackButton({ screen: 'welcome' });
  const t = useLanguageTranslations('welcome-screen');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }} showsVerticalScrollIndicator={false}>
      {/* Header with Language Switcher */}
      <View style={{
        paddingHorizontal: spacing.lg,
        paddingTop: spacing['4xl'],
        paddingBottom: spacing.lg,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <LanguageSwitcher size="small" showLabel={false} />
      </View>

      {/* Content */}
      <View>
        {/* Hero Section */}
        <View style={{ paddingTop: spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
          {/* Logo/Branding */}
          <View style={{ marginBottom: spacing['4xl'] }}>
            <View style={{ marginBottom: spacing.xl, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: colors.primary.main,
                borderRadius: spacingPresets.radius.md,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name="briefcase" size={24} color="white" />
              </View>
              <Text variant="h2">{t.brandName}</Text>
            </View>
            <Text variant="body" color="secondary">
              {t.tagline}
            </Text>
          </View>

          {/* Hero Headline */}
          <View style={{ marginBottom: spacing['5xl'] }}>
            <Text variant="h1" style={{ marginBottom: spacing.md }}>
              {t.heroTitle}
            </Text>
            <Text variant="h1" color="secondary" style={{ marginBottom: spacing.lg }}>
              {t.heroSubtitle}
            </Text>
            <Text variant="body" color="secondary">
              {t.heroDescription}
            </Text>
          </View>

          {/* Feature Cards - Redesigned */}
          <View style={{ gap: spacing.md, marginBottom: spacing['5xl'] }}>
            <FeatureCard
              icon="person-circle"
              title={t.premiumProfileTitle}
              description={t.premiumProfileDescription}
              accentColor={colors.primary.main}
            />
            <FeatureCard
              icon="trending-up"
              title={t.growEarningsTitle}
              description={t.growEarningsDescription}
              accentColor={colors.secondary.cyan}
            />
            <FeatureCard
              icon="star"
              title={t.buildTrustTitle}
              description={t.buildTrustDescription}
              accentColor={colors.secondary.yellow}
            />
          </View>
        </View>

        {/* CTA Buttons Section */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing['4xl'] }}>
          <View style={{ gap: spacing.md }}>
            {/* Primary CTA */}
            <Button
              title={t.getStartedButton}
              onPress={() => router.push('/(auth)/signup')}
              variant="primary"
              size="large"
              icon={<Ionicons name="arrow-forward" size={20} color="white" />}
            />

            {/* Secondary CTA */}
            <Button
              title={t.signInButton}
              onPress={() => router.push('/(auth)/login')}
              variant="ghost"
              size="large"
            />

            {/* Trust Signal */}
            <View style={{ marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }}>
              <Ionicons name="shield-checkmark" size={16} color={colors.primary.main} />
              <Text variant="bodySmall" color="secondary">
                {t.trustSignal}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  accentColor,
}: {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
}) {
  const { colors, spacing, spacingPresets } = useThemedStyles();

  return (
    <View style={{
      backgroundColor: colors.background.secondary,
      borderRadius: spacingPresets.radius.lg,
      padding: spacing.md,
      flexDirection: 'row',
      gap: spacing.md,
      borderWidth: 2,
      borderColor: accentColor,
    }}>
      <View style={{
        width: 56,
        height: 56,
        backgroundColor: colors.background.tertiary,
        borderRadius: spacingPresets.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Ionicons name={icon as any} size={28} color={accentColor} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="label" style={{ marginBottom: spacing.xs }}>
          {title}
        </Text>
        <Text variant="bodySmall" color="secondary">
          {description}
        </Text>
      </View>
    </View>
  );
}
