import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step4Screen() {
  const router = useRouter();
  const [bio, setBio] = useState('');

  const handleNext = () => {
    if (bio.trim()) {
      router.push('/(onboarding)/step-5');
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
                step <= 4 ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        <Text className="text-4xl font-black text-black mb-2">Tell Your Story</Text>
        <Text className="text-base text-gray-500">
          Write a short bio about yourself and your work
        </Text>
      </View>

      {/* Form */}
      <View className="px-6 gap-4 mb-8">
        <TextInput
          placeholder="Share your expertise, what makes you unique, your passion for your work..."
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={6}
          maxLength={500}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-black"
        />

        <View className="flex-row justify-between items-center">
          <Text className="text-xs text-gray-400">
            {bio.length > 480 && (
              <Text className="text-orange-500 font-semibold">{500 - bio.length} chars left</Text>
            )}
            {bio.length <= 480 && bio.length > 0 && (
              <Text className="text-gray-400">{500 - bio.length} chars left</Text>
            )}
          </Text>
        </View>
      </View>

      {/* Tips */}
      <View className="px-6 mb-8 bg-gray-50 rounded-xl p-4">
        <Text className="text-sm font-semibold text-black mb-2">✨ Tips for a great bio:</Text>
        <Text className="text-xs text-gray-600 mb-1">• Keep it authentic and personal</Text>
        <Text className="text-xs text-gray-600 mb-1">• Mention your specializations</Text>
        <Text className="text-xs text-gray-600">• Show enthusiasm for your work</Text>
      </View>

      {/* Navigation */}
      <View className="px-6 gap-3 pb-8">
        <TouchableOpacity
          onPress={handleNext}
          disabled={!bio.trim()}
          className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${
            !bio.trim() ? 'bg-gray-300' : 'bg-black'
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
