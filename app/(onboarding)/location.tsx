import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocation } from '@/contexts/LocationContext';
import { getCountries } from '@/services/supabase';
import { Ionicons } from '@expo/vector-icons';

type Country = {
  id: string;
  code: string;
  name_en: string;
};

const COUNTRIES_DATA = [
  { code: 'DE', name: 'Germany' },
  { code: 'BA', name: 'Bosnia' },
  { code: 'HR', name: 'Croatia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'RS', name: 'Serbia' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'XK', name: 'Kosovo' },
  { code: 'FR', name: 'France' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'AT', name: 'Austria' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'HU', name: 'Hungary' },
];

export default function LocationScreen() {
  const router = useRouter();
  const { setLocation } = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedCountry) return;

    setLoading(true);
    await setLocation({
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
      city: '',
    });
    setLoading(false);
    router.push('/(onboarding)/step-1');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-8 px-6 pb-6">
        <Text className="text-4xl font-black text-black mb-2">Select Your Location</Text>
        <Text className="text-base text-gray-500">Where are you based?</Text>
      </View>

      {/* Countries Grid */}
      <ScrollView className="flex-1 px-6 pb-8" showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          {COUNTRIES_DATA.map((country) => (
            <TouchableOpacity
              key={country.code}
              onPress={() => setSelectedCountry(country as Country)}
              className={`flex-row items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selectedCountry?.code === country.code
                  ? 'bg-black border-black'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <View
                className={`w-6 h-6 rounded-lg border-2 items-center justify-center ${
                  selectedCountry?.code === country.code
                    ? 'bg-white border-white'
                    : 'border-gray-300'
                }`}
              >
                {selectedCountry?.code === country.code && (
                  <Ionicons name="checkmark" size={16} color="black" />
                )}
              </View>
              <Text
                className={`text-lg font-semibold ${
                  selectedCountry?.code === country.code ? 'text-white' : 'text-black'
                }`}
              >
                {country.name}
              </Text>
              <View className="flex-1" />
              <Ionicons
                name="chevron-forward"
                size={20}
                color={selectedCountry?.code === country.code ? 'white' : '#999'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedCountry || loading}
          className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${
            !selectedCountry || loading ? 'bg-gray-300' : 'bg-black'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white text-lg font-semibold">Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
