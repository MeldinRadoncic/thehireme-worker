import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAppAuth();

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header with Profile */}
      <View className="px-6 pt-6 pb-8">
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-sm text-gray-500 mb-1">Welcome back</Text>
            <Text className="text-3xl font-black text-black">{user?.firstName}</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
            <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-gradient-to-b from-black to-gray-900 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center gap-4 mb-6">
            <View className="w-16 h-16 bg-gray-700 rounded-full items-center justify-center">
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white mb-1">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-sm text-gray-300">Your Profile</Text>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-white font-semibold">View Profile</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View className="px-6 mb-8">
        <View className="gap-3">
          <StatCard
            icon="wallet"
            title="Credits Balance"
            value="0"
            color="bg-blue-50"
            textColor="text-blue-600"
          />
          <StatCard
            icon="eye"
            title="Profile Views"
            value="0"
            color="bg-purple-50"
            textColor="text-purple-600"
          />
          <StatCard
            icon="star"
            title="Reviews"
            value="0"
            color="bg-amber-50"
            textColor="text-amber-600"
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">QUICK ACTIONS</Text>
        <View className="gap-3">
          <ActionCard
            icon="camera"
            title="Upload Photos"
            subtitle="Add portfolio images"
            onPress={() => {}}
          />
          <ActionCard
            icon="videocam"
            title="Upload Video"
            subtitle="Showcase your work"
            onPress={() => {}}
          />
          <ActionCard
            icon="briefcase"
            title="Add Services"
            subtitle="Update your offerings"
            onPress={() => {}}
          />
          <ActionCard
            icon="trending-up"
            title="Buy Credits"
            subtitle="Promote your profile"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Sections */}
      <View className="px-6 pb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">PROFILE</Text>
        <View className="gap-2">
          <SectionItem icon="map" title="Location" value="Not set" />
          <SectionItem icon="briefcase" title="Services" value="0 added" />
          <SectionItem icon="time" title="Availability" value="Not set" />
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
  textColor,
}: {
  icon: string;
  title: string;
  value: string;
  color: string;
  textColor: string;
}) {
  return (
    <View className={`${color} rounded-xl p-4 flex-row items-center justify-between`}>
      <View className="flex-1">
        <Text className="text-sm text-gray-600 mb-1">{title}</Text>
        <Text className={`text-2xl font-black ${textColor}`}>{value}</Text>
      </View>
      <View className={`${color} opacity-50 p-3 rounded-lg`}>
        <Ionicons name={icon as any} size={24} color={textColor.split('-')[1]} />
      </View>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-50 rounded-xl p-4 flex-row items-center justify-between border border-gray-200"
    >
      <View className="flex-row items-center gap-4 flex-1">
        <View className="w-12 h-12 bg-black rounded-lg items-center justify-center">
          <Ionicons name={icon as any} size={24} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">{title}</Text>
          <Text className="text-sm text-gray-500">{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

function SectionItem({ icon, title, value }: { icon: string; title: string; value: string }) {
  return (
    <View className="bg-gray-50 rounded-lg p-3 flex-row items-center justify-between border border-gray-200">
      <View className="flex-row items-center gap-3 flex-1">
        <Ionicons name={icon as any} size={20} color="black" />
        <Text className="text-base text-black font-medium">{title}</Text>
      </View>
      <Text className="text-sm text-gray-500">{value}</Text>
    </View>
  );
}
