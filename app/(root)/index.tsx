import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useAppAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user } = useAppAuth();

  return (
    <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View className="px-6 pt-8 pb-6">
        <View className="flex-row items-center justify-between mb-12">
          <View className="flex-1">
            <Text className="text-sm font-bold text-slate-400 mb-2 tracking-widest uppercase">
              Welcome back
            </Text>
            <Text className="text-4xl font-black text-white tracking-tight">
              {user?.firstName}
            </Text>
          </View>
          <TouchableOpacity className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full items-center justify-center">
            <Ionicons name="settings-sharp" size={24} color="#10b981" />
          </TouchableOpacity>
        </View>

        {/* Premium Profile Card */}
        <View className="bg-slate-800 border-2 border-blue-500 rounded-2xl p-6 overflow-hidden">
          <View className="flex-row items-center gap-4 mb-6">
            <View className="w-16 h-16 bg-blue-500 rounded-2xl items-center justify-center">
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-black text-white mb-1">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-sm text-blue-400 font-semibold">Professional</Text>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center gap-2 mt-2">
            <Text className="text-white font-bold">View Profile</Text>
            <Ionicons name="arrow-forward" size={18} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View className="px-6 mb-10">
        <Text className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
          Your Performance
        </Text>
        <View className="gap-3">
          <StatCard
            icon="wallet"
            title="Credits Balance"
            value="0"
            subtext="Free tier"
            color="bg-slate-800"
            borderColor="border-blue-500"
            accentColor="#3b82f6"
          />
          <StatCard
            icon="eye"
            title="Profile Views"
            value="0"
            subtext="This week"
            color="bg-slate-800"
            borderColor="border-cyan-400"
            accentColor="#06b6d4"
          />
          <StatCard
            icon="star"
            title="Total Reviews"
            value="0"
            subtext="Build your reputation"
            color="bg-slate-800"
            borderColor="border-yellow-400"
            accentColor="#facc15"
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-10">
        <Text className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
          Quick Actions
        </Text>
        <View className="gap-3">
          <ActionCard
            icon="camera"
            title="Upload Photos"
            subtitle="Showcase your portfolio"
            accentColor="#3b82f6"
            onPress={() => {}}
          />
          <ActionCard
            icon="videocam"
            title="Upload Video"
            subtitle="Get promoted to feed"
            accentColor="#06b6d4"
            onPress={() => {}}
          />
          <ActionCard
            icon="briefcase"
            title="Add Services"
            subtitle="Expand your offerings"
            accentColor="#facc15"
            onPress={() => {}}
          />
          <ActionCard
            icon="trending-up"
            title="Buy Credits"
            subtitle="Boost your visibility"
            accentColor="#a78bfa"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Profile Setup Section */}
      <View className="px-6 pb-8">
        <Text className="text-xs font-bold text-gray-400 mb-4 tracking-widest uppercase">
          Complete Your Profile
        </Text>
        <View className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <SectionItem icon="map" title="Location" value="Set up" />
          <View className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <SectionItem icon="briefcase" title="Services" value="Add services" />
          <View className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <SectionItem icon="time" title="Availability" value="Set hours" />
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtext,
  color,
  borderColor,
  accentColor,
}: {
  icon: string;
  title: string;
  value: string;
  subtext: string;
  color: string;
  borderColor: string;
  accentColor: string;
}) {
  return (
    <View
      className={`${color} border-2 ${borderColor} rounded-2xl p-5 flex-row items-center justify-between`}
    >
      <View className="flex-1">
        <Text className="text-xs font-bold text-slate-300 mb-2 tracking-wider uppercase">
          {title}
        </Text>
        <Text className="text-3xl font-black text-white mb-1">{value}</Text>
        <Text className="text-xs text-slate-400 font-medium">{subtext}</Text>
      </View>
      <View className="w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm">
        <Ionicons name={icon as any} size={28} color={accentColor} />
      </View>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  accentColor,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex-row items-center justify-between overflow-hidden"
    >
      <View className="flex-row items-center gap-4 flex-1">
        <View
          className="w-14 h-14 rounded-xl items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: accentColor + '20',
          }}
        >
          <Ionicons name={icon as any} size={24} color={accentColor} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-white tracking-tight">{title}</Text>
          <Text className="text-sm text-slate-400 mt-1">{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#64748b" />
    </TouchableOpacity>
  );
}

function SectionItem({ icon, title, value }: { icon: string; title: string; value: string }) {
  return (
    <View className="px-5 py-4 flex-row items-center justify-between">
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-10 h-10 bg-blue-500/20 rounded-lg items-center justify-center">
          <Ionicons name={icon as any} size={20} color="#3b82f6" />
        </View>
        <Text className="text-base text-white font-semibold">{title}</Text>
      </View>
      <Text className="text-sm text-blue-400 font-bold">{value}</Text>
    </View>
  );
}
