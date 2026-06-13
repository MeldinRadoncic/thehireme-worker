import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, Card } from '@/components';
import { THEME } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.colors.background.primary }} showsVerticalScrollIndicator={false}>
      {/* Content */}
      <View>
        {/* Hero Section */}
        <View style={{ paddingTop: THEME.spacing['5xl'], paddingHorizontal: THEME.spacing.lg, paddingBottom: THEME.spacing.lg }}>
          {/* Logo/Branding */}
          <View style={{ marginBottom: THEME.spacing['4xl'] }}>
            <View style={{ marginBottom: THEME.spacing.xl, flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.md }}>
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: THEME.colors.primary.main,
                borderRadius: THEME.spacingPresets.radius.md,
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
          <View style={{ marginBottom: THEME.spacing['5xl'] }}>
            <Text variant="h1" style={{ marginBottom: THEME.spacing.md }}>
              Build Your Reputation
            </Text>
            <Text variant="h1" color="secondary" style={{ marginBottom: THEME.spacing.lg }}>
              Earn More
            </Text>
            <Text variant="body" color="secondary">
              Connect with local clients, showcase your expertise, and grow your business across Europe
            </Text>
          </View>

          {/* Feature Cards - Redesigned */}
          <View style={{ gap: THEME.spacing.md, marginBottom: THEME.spacing['5xl'] }}>
            <FeatureCard
              icon="person-circle"
              title="Premium Profile"
              description="Build a stunning professional profile with portfolio, videos, and verified reviews"
              accentColor={THEME.colors.primary.main}
            />
            <FeatureCard
              icon="trending-up"
              title="Grow Your Earnings"
              description="Unlock credit-based promotions and boost visibility to thousands of local clients"
              accentColor={THEME.colors.secondary.cyan}
            />
            <FeatureCard
              icon="star"
              title="Build Trust"
              description="Earn verified reviews and ratings that showcase your expertise and reliability"
              accentColor={THEME.colors.secondary.yellow}
            />
          </View>
        </View>

        {/* CTA Buttons Section */}
        <View style={{ paddingHorizontal: THEME.spacing.lg, paddingBottom: THEME.spacing['4xl'] }}>
          <View style={{ gap: THEME.spacing.md }}>
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
            <View style={{ marginTop: THEME.spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: THEME.spacing.sm }}>
              <Ionicons name="shield-checkmark" size={16} color={THEME.colors.primary.main} />
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
  return (
    <View style={{
      backgroundColor: THEME.colors.background.secondary,
      borderRadius: THEME.spacingPresets.radius.lg,
      padding: THEME.spacing.md,
      flexDirection: 'row',
      gap: THEME.spacing.md,
      borderWidth: 2,
      borderColor: accentColor,
    }}>
      <View style={{
        width: 56,
        height: 56,
        backgroundColor: THEME.colors.background.tertiary,
        borderRadius: THEME.spacingPresets.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Ionicons name={icon as any} size={28} color={accentColor} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="label" style={{ marginBottom: THEME.spacing.xs }}>
          {title}
        </Text>
        <Text variant="bodySmall" color="secondary">
          {description}
        </Text>
      </View>
    </View>
  );
}
