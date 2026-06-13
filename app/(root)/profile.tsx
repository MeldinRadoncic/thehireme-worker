import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAppAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, signOut } = useAppAuth();

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScreenIndicator={false}>
      {/* Profile Header */}
      <View className="px-6 pt-6 pb-8">
        <View className="flex-row items-center gap-4 mb-8">
          <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center">
            <Ionicons name="person" size={40} color="black" />
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-black text-black mb-1">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className="text-sm text-gray-500">{user?.emailAddresses?.[0]?.emailAddress}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3">
          <StatBox label="Reviews" value="0" />
          <StatBox label="Visits" value="0" />
          <StatBox label="Inquiries" value="0" />
        </View>
      </View>

      {/* Account Settings */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">ACCOUNT</Text>
        <View className="bg-gray-50 rounded-xl gap-1 overflow-hidden border border-gray-200">
          <MenuItem
            icon="person-circle"
            title="Edit Profile"
            subtitle="Update your information"
          />
          <MenuItem
            icon="lock-closed"
            title="Change Password"
            subtitle="Update your password"
          />
          <MenuItem
            icon="notifications"
            title="Notifications"
            subtitle="Manage notification preferences"
          />
          <MenuItem
            icon="globe"
            title="Language & Region"
            subtitle="Change language and timezone"
          />
        </View>
      </View>

      {/* Services & Availability */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">SERVICES</Text>
        <View className="bg-gray-50 rounded-xl gap-1 overflow-hidden border border-gray-200">
          <MenuItem
            icon="briefcase"
            title="My Services"
            subtitle="Edit your service offerings"
          />
          <MenuItem
            icon="time"
            title="Availability"
            subtitle="Set your working hours"
          />
          <MenuItem
            icon="cash"
            title="Pricing"
            subtitle="Update your rates"
          />
        </View>
      </View>

      {/* Support & Legal */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">SUPPORT & LEGAL</Text>
        <View className="bg-gray-50 rounded-xl gap-1 overflow-hidden border border-gray-200">
          <MenuItem
            icon="help-circle"
            title="Help Center"
            subtitle="FAQ and support articles"
          />
          <MenuItem
            icon="document-text"
            title="Terms of Service"
            subtitle="Review our terms"
          />
          <MenuItem
            icon="shield-checkmark"
            title="Privacy Policy"
            subtitle="How we protect your data"
          />
        </View>
      </View>

      {/* Sign Out */}
      <View className="px-6 mb-8">
        <TouchableOpacity
          onPress={signOut}
          className="bg-red-50 border border-red-200 rounded-xl py-4 flex-row items-center justify-center gap-2"
        >
          <Ionicons name="log-out" size={20} color="#dc2626" />
          <Text className="text-red-600 font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View className="px-6 pb-8 items-center">
        <Text className="text-xs text-gray-400">TheHireMe v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 items-center">
      <Text className="text-2xl font-black text-black">{value}</Text>
      <Text className="text-xs text-gray-500 mt-1">{label}</Text>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
      <View className="flex-row items-center gap-3 flex-1">
        <Ionicons name={icon as any} size={24} color="black" />
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">{title}</Text>
          <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}
