import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step1Screen() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');

  const handleNext = () => {
    if (address.trim()) {
      router.push('/(onboarding)/step-2');
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
                step === 1 ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        <Text className="text-4xl font-black text-black mb-2">Your Location</Text>
        <Text className="text-base text-gray-500">Help clients find you locally</Text>
      </View>

      {/* Form */}
      <View className="px-6 gap-6 mb-8">
        <View>
          <Text className="text-sm font-semibold text-black mb-2">Address</Text>
          <TextInput
            placeholder="Street address"
            value={address}
            onChangeText={setAddress}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-black"
          />
        </View>

        <View>
          <Text className="text-sm font-semibold text-black mb-2">ZIP Code (Optional)</Text>
          <TextInput
            placeholder="ZIP code"
            value={zip}
            onChangeText={setZip}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-black"
          />
        </View>
      </View>

      {/* Navigation */}
      <View className="px-6 gap-3 pb-8">
        <TouchableOpacity
          onPress={handleNext}
          disabled={!address.trim()}
          className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${
            !address.trim() ? 'bg-gray-300' : 'bg-black'
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
