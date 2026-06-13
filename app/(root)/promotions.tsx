import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PromotionsScreen() {
  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScreenIndicator={false}>
      {/* Header */}
      <View className="px-6 pt-6 pb-8">
        <Text className="text-3xl font-black text-black">Credits & Promotions</Text>
        <Text className="text-sm text-gray-500 mt-1">Boost your visibility and get more inquiries</Text>
      </View>

      {/* Credit Balance */}
      <View className="px-6 mb-8">
        <View className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-6">
          <View className="flex-row items-end justify-between mb-4">
            <View>
              <Text className="text-sm text-gray-300 mb-2">Your Credit Balance</Text>
              <Text className="text-5xl font-black text-white">0</Text>
            </View>
            <Ionicons name="wallet" size={48} color="#f3f4f6" />
          </View>
          <TouchableOpacity className="bg-white rounded-lg py-3 flex-row items-center justify-center gap-2 mt-4">
            <Ionicons name="add" size={20} color="black" />
            <Text className="text-black font-semibold">Buy Credits</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Credit Packages */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">CREDIT PACKAGES</Text>
        <View className="gap-3">
          <CreditPackage
            credits="10"
            price="€9.99"
            savings=""
            popular={false}
          />
          <CreditPackage
            credits="25"
            price="€19.99"
            savings="Save 20%"
            popular={true}
          />
          <CreditPackage
            credits="50"
            price="€34.99"
            savings="Save 30%"
            popular={false}
          />
        </View>
      </View>

      {/* Promotion Options */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">PROMOTION OPTIONS</Text>
        <View className="gap-3">
          <PromotionCard
            icon="star"
            title="Profile Boost"
            subtitle="Feature at top of search results"
            cost="5 credits"
            duration="24 hours"
          />
          <PromotionCard
            icon="trending-up"
            title="Premium Visibility"
            subtitle="Prioritized in client searches"
            cost="10 credits"
            duration="7 days"
          />
          <PromotionCard
            icon="flash"
            title="Hot Deal"
            subtitle="Highlighted with special badge"
            cost="3 credits"
            duration="12 hours"
          />
        </View>
      </View>

      {/* FAQs */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">HOW CREDITS WORK</Text>
        <View className="bg-gray-50 rounded-xl p-4 gap-4">
          <FAQItem
            question="What are credits?"
            answer="Credits are used to boost your profile visibility and attract more client inquiries."
          />
          <FAQItem
            question="How long do promotions last?"
            answer="Promotion duration varies by package - from 12 hours to 7 days."
          />
          <FAQItem
            question="Do unused credits expire?"
            answer="Credits never expire. Use them whenever you want to boost your profile."
          />
        </View>
      </View>
    </ScrollView>
  );
}

function CreditPackage({
  credits,
  price,
  savings,
  popular,
}: {
  credits: string;
  price: string;
  savings: string;
  popular: boolean;
}) {
  return (
    <TouchableOpacity
      className={`rounded-xl p-4 flex-row items-center justify-between border-2 ${
        popular ? 'bg-black border-black' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <View className="flex-1">
        <Text
          className={`text-lg font-black ${popular ? 'text-white' : 'text-black'}`}
        >
          {credits} Credits
        </Text>
        {savings && (
          <Text className={`text-xs font-semibold mt-1 ${
            popular ? 'text-green-300' : 'text-green-600'
          }`}>
            {savings}
          </Text>
        )}
      </View>
      <View className="items-end">
        <Text className={`text-2xl font-black ${popular ? 'text-white' : 'text-black'}`}>
          {price}
        </Text>
        {popular && (
          <View className="bg-white/20 rounded px-2 py-1 mt-1">
            <Text className="text-xs font-semibold text-white">Popular</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function PromotionCard({
  icon,
  title,
  subtitle,
  cost,
  duration,
}: {
  icon: string;
  title: string;
  subtitle: string;
  cost: string;
  duration: string;
}) {
  return (
    <TouchableOpacity className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <View className="flex-row items-start gap-3 mb-3">
        <View className="w-10 h-10 bg-black rounded-lg items-center justify-center">
          <Ionicons name={icon as any} size={20} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">{title}</Text>
          <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
        <View>
          <Text className="text-xs text-gray-500">Cost</Text>
          <Text className="text-sm font-bold text-black">{cost}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500">Duration</Text>
          <Text className="text-sm font-bold text-black">{duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <View>
      <View className="flex-row items-start gap-2 mb-1">
        <Text className="text-black font-semibold flex-1">{question}</Text>
      </View>
      <Text className="text-sm text-gray-600 ml-0">{answer}</Text>
    </View>
  );
}
