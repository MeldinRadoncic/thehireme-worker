import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Expert', 'Master'];

export default function Step3Screen() {
  const router = useRouter();
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const handleNext = () => {
    if (experience && hourlyRate) {
      router.push('/(onboarding)/step-4');
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
                step <= 3 ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        <Text className="text-4xl font-black text-black mb-2">Experience & Rates</Text>
        <Text className="text-base text-gray-500">
          Help clients understand your expertise
        </Text>
      </View>

      {/* Form */}
      <View className="px-6 gap-6 mb-8">
        {/* Experience Level */}
        <View>
          <Text className="text-sm font-semibold text-black mb-3">Experience Level</Text>
          <View className="gap-2">
            {EXPERIENCE_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setExperience(level)}
                className={`p-4 rounded-xl border-2 flex-row items-center justify-between ${
                  experience === level
                    ? 'bg-black border-black'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <Text
                  className={`text-lg font-semibold ${
                    experience === level ? 'text-white' : 'text-black'
                  }`}
                >
                  {level}
                </Text>
                {experience === level && (
                  <Ionicons name="checkmark-circle" size={24} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hourly Rate */}
        <View>
          <Text className="text-sm font-semibold text-black mb-2">Hourly Rate (€)</Text>
          <View className="flex-row items-center gap-2">
            <TextInput
              placeholder="e.g., 35"
              value={hourlyRate}
              onChangeText={setHourlyRate}
              keyboardType="decimal-pad"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base text-black"
            />
            <Text className="text-lg font-semibold text-gray-700">/hour</Text>
          </View>
        </View>
      </View>

      {/* Navigation */}
      <View className="px-6 gap-3 pb-8">
        <TouchableOpacity
          onPress={handleNext}
          disabled={!experience || !hourlyRate}
          className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${
            !experience || !hourlyRate ? 'bg-gray-300' : 'bg-black'
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
