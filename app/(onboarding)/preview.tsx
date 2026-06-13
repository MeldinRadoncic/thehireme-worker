import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PreviewScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/(onboarding)/success');
  };

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="pt-8 px-6 pb-8">
        <Text className="text-4xl font-black text-black mb-2">Review Your Profile</Text>
        <Text className="text-base text-gray-500">
          Make sure everything looks good before going live
        </Text>
      </View>

      {/* Profile Preview */}
      <View className="px-6 pb-8 gap-4">
        {/* Profile Card */}
        <View className="bg-gradient-to-b from-black to-gray-900 rounded-2xl p-6 overflow-hidden">
          <View className="flex-row items-end gap-4 mb-6">
            <View className="w-20 h-20 bg-gray-700 rounded-full items-center justify-center">
              <Ionicons name="person" size={40} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-black text-white">John Doe</Text>
              <View className="flex-row gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons key={i} name="star" size={16} color="#fbbf24" />
                ))}
              </View>
            </View>
          </View>

          <View className="gap-4">
            <View className="bg-black/50 rounded-lg p-3">
              <Text className="text-gray-300 text-xs mb-1">HOURLY RATE</Text>
              <Text className="text-2xl font-black text-white">€35/hour</Text>
            </View>

            <Text className="text-sm text-gray-300 leading-5">
              Experienced professional with 10+ years in the field. Passionate about delivering
              quality work and customer satisfaction.
            </Text>

            <View className="flex-row gap-2 mt-2">
              <View className="bg-white/20 rounded-full px-3 py-1">
                <Text className="text-white text-xs font-semibold">Cleaning</Text>
              </View>
              <View className="bg-white/20 rounded-full px-3 py-1">
                <Text className="text-white text-xs font-semibold">Home Care</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Details Sections */}
        <View className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="location" size={20} color="black" />
            <Text className="text-base font-semibold text-black">Location</Text>
          </View>
          <Text className="text-sm text-gray-600">123 Main Street, Berlin, Germany</Text>
        </View>

        <View className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="briefcase" size={20} color="black" />
            <Text className="text-base font-semibold text-black">Experience</Text>
          </View>
          <Text className="text-sm text-gray-600">Expert Level</Text>
        </View>

        <View className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="globe" size={20} color="black" />
            <Text className="text-base font-semibold text-black">Languages</Text>
          </View>
          <Text className="text-sm text-gray-600">English, German, Polish</Text>
        </View>

        <View className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="time" size={20} color="black" />
            <Text className="text-base font-semibold text-black">Availability</Text>
          </View>
          <Text className="text-sm text-gray-600">Full-time</Text>
        </View>
      </View>

      {/* Actions */}
      <View className="px-6 gap-3 pb-8">
        <TouchableOpacity
          onPress={handleComplete}
          className="bg-black py-4 rounded-xl flex-row items-center justify-center gap-2"
        >
          <Text className="text-white text-lg font-semibold">Looks Good!</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-center text-gray-500 text-base font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
