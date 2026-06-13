import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
  const router = useRouter();

  const handleDone = () => {
    router.replace('/(root)');
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      {/* Success Animation Container */}
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-6">
          <Ionicons name="checkmark" size={48} color="black" />
        </View>

        <Text className="text-5xl font-black text-white text-center mb-4">
          Welcome to{'\n'}TheHireMe!
        </Text>

        <Text className="text-lg text-gray-300 text-center mb-8">
          Your profile is live and ready to{'\n'}receive inquiries from clients.
        </Text>
      </View>

      {/* Benefits */}
      <View className="w-full gap-4 mb-12">
        <BenefitItem
          icon="eye"
          title="Get Discovered"
          subtitle="Clients can find and view your profile"
        />
        <BenefitItem
          icon="message"
          title="Receive Inquiries"
          subtitle="Connect directly with potential clients"
        />
        <BenefitItem
          icon="trending-up"
          title="Build Your Reputation"
          subtitle="Grow reviews and earn more credits"
        />
      </View>

      {/* Next Steps */}
      <View className="w-full bg-white/10 rounded-xl p-4 mb-8 border border-white/20">
        <Text className="text-sm font-bold text-white mb-3">NEXT STEPS</Text>
        <View className="gap-2">
          <Text className="text-sm text-gray-300">✓ Upload portfolio photos & videos</Text>
          <Text className="text-sm text-gray-300">✓ Buy credits to promote your profile</Text>
          <Text className="text-sm text-gray-300">✓ Respond quickly to client inquiries</Text>
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity
        onPress={handleDone}
        className="w-full bg-white py-4 rounded-xl flex-row items-center justify-center gap-2"
      >
        <Text className="text-black text-lg font-semibold">Go to Dashboard</Text>
        <Ionicons name="arrow-forward" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

function BenefitItem({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View className="flex-row items-center gap-4 bg-white/10 rounded-xl p-4 border border-white/20">
      <View className="w-12 h-12 bg-white rounded-lg items-center justify-center flex-shrink-0">
        <Ionicons name={icon as any} size={24} color="black" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-white mb-1">{title}</Text>
        <Text className="text-sm text-gray-300">{subtitle}</Text>
      </View>
    </View>
  );
}
