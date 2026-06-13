import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Card } from '@/components';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export default function WelcomeScreen() {
  const router = useRouter();
  const themed = useThemedStyles();
  const { colors, spacing, spacingPresets } = themed;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }} showsVerticalScrollIndicator={false}>
      {/* Content */}
      <View>
        {/* Hero Section */}
        <View style={{ paddingTop: spacing['5xl'], paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
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
              <Text variant="h2">TheHireMe</Text>
            </View>
            <Text variant="body" color="secondary">
              Where skilled professionals meet local clients seeking excellence
            </Text>
          </View>

          {/* Hero Headline */}
          <View style={{ marginBottom: spacing['5xl'] }}>
            <Text variant="h1" style={{ marginBottom: spacing.md }}>
              Build Your Reputation
            </Text>
            <Text variant="h1" color="secondary" style={{ marginBottom: spacing.lg }}>
              Earn More
            </Text>
            <Text variant="body" color="secondary">
              Connect with local clients, showcase your expertise, and grow your business across Europe
            </Text>
          </View>

          {/* Feature Cards - Redesigned */}
          <View style={{ gap: spacing.md, marginBottom: spacing['5xl'] }}>
            <FeatureCard
              icon="person-circle"
              title="Premium Profile"
              description="Build a stunning professional profile with portfolio, videos, and verified reviews"
              accentColor={colors.primary.main}
            />
            <FeatureCard
              icon="trending-up"
              title="Grow Your Earnings"
              description="Unlock credit-based promotions and boost visibility to thousands of local clients"
              accentColor={colors.secondary.cyan}
            />
            <FeatureCard
              icon="star"
              title="Build Trust"
              description="Earn verified reviews and ratings that showcase your expertise and reliability"
              accentColor={colors.secondary.yellow}
            />
          </View>
        </View>

        {/* CTA Buttons Section */}
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing['4xl'] }}>
          <View style={{ gap: spacing.md }}>
            {/* Primary CTA */}
            <Button
              title="Get Started"
              onPress={() => router.push('/(auth)/signup')}
              variant="primary"
              size="large"
              icon={<Ionicons name="arrow-forward" size={20} color="white" />}
            />

            {/* Secondary CTA */}
            <Button
              title="Sign In"
              onPress={() => router.push('/(auth)/login')}
              variant="ghost"
              size="large"
            />

            {/* Trust Signal */}
            <View style={{ marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }}>
              <Ionicons name="shield-checkmark" size={16} color={colors.primary.main} />
              <Text variant="bodySmall" color="secondary">
                Trusted by 5,000+ service professionals
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
