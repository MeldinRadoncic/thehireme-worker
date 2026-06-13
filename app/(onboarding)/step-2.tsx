import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SERVICES = [
  { id: 1, name: 'Cleaning', icon: 'water' },
  { id: 2, name: 'Plumbing', icon: 'water-outline' },
  { id: 3, name: 'Electrical', icon: 'flash' },
  { id: 4, name: 'Carpentry', icon: 'hammer' },
  { id: 5, name: 'Painting', icon: 'brush' },
  { id: 6, name: 'Landscaping', icon: 'leaf' },
  { id: 7, name: 'Handyman', icon: 'wrench' },
  { id: 8, name: 'Appliance Repair', icon: 'settings' },
];

export default function Step2Screen() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  const toggleService = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      router.push('/(onboarding)/step-3');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="pt-8 px-6 pb-8">
        {/* Progress Bar */}
        <View className="flex-row gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <View
              key={step}
              className={`flex-1 h-1 rounded-full ${
                step <= 2 ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        <Text className="text-4xl font-black text-black mb-2">Services</Text>
        <Text className="text-base text-gray-500">What do you offer? (Select at least one)</Text>
      </View>

      {/* Services Grid */}
      <View className="px-6 pb-8">
        <View className="gap-3">
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              onPress={() => toggleService(service.id)}
              className={`flex-row items-center gap-4 p-4 rounded-xl border-2 ${
                selected.includes(service.id)
                  ? 'bg-black border-black'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <View
                className={`w-12 h-12 rounded-lg items-center justify-center ${
                  selected.includes(service.id) ? 'bg-white' : 'bg-gray-200'
                }`}
              >
                <Ionicons
                  name={service.icon as any}
                  size={24}
                  color={selected.includes(service.id) ? 'black' : '#999'}
                />
              </View>
              <Text
                className={`flex-1 text-lg font-semibold ${
                  selected.includes(service.id) ? 'text-white' : 'text-black'
                }`}
              >
                {service.name}
              </Text>
              {selected.includes(service.id) && (
                <Ionicons name="checkmark" size={24} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation */}
      <View className="px-6 gap-3 pb-8">
        <TouchableOpacity
          onPress={handleNext}
          disabled={selected.length === 0}
          className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${
            selected.length === 0 ? 'bg-gray-300' : 'bg-black'
          }`}
        >
          <Text className="text-white text-lg font-semibold">Next</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-center text-gray-500 text-base font-medium">Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
