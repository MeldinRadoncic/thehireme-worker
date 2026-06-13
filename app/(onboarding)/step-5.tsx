import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'bs', name: 'Bosnian', flag: '🇧🇦' },
  { id: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { id: 'pl', name: 'Polish', flag: '🇵🇱' },
];

const AVAILABILITY = ['Part-time', 'Full-time', 'Flexible', 'Weekends Only'];

export default function Step5Screen() {
  const router = useRouter();
  const [languages, setLanguages] = useState<string[]>(['en']);
  const [availability, setAvailability] = useState('');

  const toggleLanguage = (id: string) => {
    setLanguages((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handlePreview = () => {
    if (languages.length > 0 && availability) {
      router.push('/(onboarding)/preview');
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
                step <= 5 ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        <Text className="text-4xl font-black text-black mb-2">Final Details</Text>
        <Text className="text-base text-gray-500">
          Languages you speak and your availability
        </Text>
      </View>

      {/* Languages */}
      <View className="px-6 pb-8">
        <Text className="text-sm font-semibold text-black mb-4">Languages (Select at least one)</Text>
        <View className="gap-2 mb-8">
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              onPress={() => toggleLanguage(lang.id)}
              className={`flex-row items-center gap-4 p-4 rounded-xl border-2 ${
                languages.includes(lang.id)
                  ? 'bg-black border-black'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Text className="text-2xl">{lang.flag}</Text>
              <Text
                className={`flex-1 text-lg font-semibold ${
                  languages.includes(lang.id) ? 'text-white' : 'text-black'
                }`}
              >
                {lang.name}
              </Text>
              {languages.includes(lang.id) && (
                <Ionicons name="checkmark" size={24} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Availability */}
        <Text className="text-sm font-semibold text-black mb-4">Availability</Text>
        <View className="gap-2">
          {AVAILABILITY.map((avail) => (
            <TouchableOpacity
              key={avail}
              onPress={() => setAvailability(avail)}
              className={`p-4 rounded-xl border-2 flex-row items-center justify-between ${
                availability === avail
                  ? 'bg-black border-black'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  availability === avail ? 'text-white' : 'text-black'
                }`}
              >
                {avail}
              </Text>
              {availability === avail && (
                <Ionicons name="checkmark-circle" size={24} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation */}
      <View className="px-6 gap-3 pb-8">
        <TouchableOpacity
          onPress={handlePreview}
          disabled={languages.length === 0 || !availability}
          className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${
            languages.length === 0 || !availability ? 'bg-gray-300' : 'bg-black'
          }`}
        >
          <Text className="text-white text-lg font-semibold">Preview Profile</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-center text-gray-500 text-base font-medium">Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
