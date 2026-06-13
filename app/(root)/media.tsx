import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MediaScreen() {
  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-6 pt-6 pb-8">
        <Text className="text-3xl font-black text-black">Your Portfolio</Text>
        <Text className="text-sm text-gray-500 mt-1">Photos & videos that showcase your work</Text>
      </View>

      {/* Upload Actions */}
      <View className="px-6 mb-8 gap-3">
        <UploadCard
          icon="camera"
          title="Upload Photos"
          subtitle="Add your best work (5 max)"
          color="bg-blue-50"
          textColor="text-blue-600"
          iconColor="#2563eb"
        />
        <UploadCard
          icon="videocam"
          title="Upload Video"
          subtitle="Showcase your skills (1 video)"
          color="bg-purple-50"
          textColor="text-purple-600"
          iconColor="#9333ea"
        />
      </View>

      {/* Portfolio Section */}
      <View className="px-6 mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-semibold text-gray-400">PORTFOLIO (0)</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="settings" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Empty State */}
        <View className="bg-gray-50 rounded-2xl p-12 items-center">
          <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mb-4">
            <Ionicons name="image" size={32} color="#999" />
          </View>
          <Text className="text-lg font-semibold text-gray-700 text-center mb-2">
            No photos yet
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-6">
            Upload your best work to attract clients
          </Text>
          <TouchableOpacity className="bg-black rounded-xl px-6 py-3 flex-row items-center gap-2">
            <Ionicons name="camera" size={20} color="white" />
            <Text className="text-white font-semibold">Upload First Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tips */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-semibold text-gray-400 mb-4">Portfolio Tips</Text>
        <View className="bg-gray-50 rounded-xl p-4 gap-3">
          <TipRow icon="checkmark" text="Use clear, well-lit photos" />
          <TipRow icon="checkmark" text="Show before/after when relevant" />
          <TipRow icon="checkmark" text="Include recent work" />
          <TipRow icon="checkmark" text="Make video engaging (15-60s)" />
        </View>
      </View>
    </ScrollView>
  );
}

function UploadCard({
  icon,
  title,
  subtitle,
  color,
  textColor,
  iconColor,
}: {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  textColor: string;
  iconColor: string;
}) {
  return (
    <TouchableOpacity className={`${color} rounded-xl p-4 flex-row items-center justify-between`}>
      <View className="flex-1">
        <Text className={`text-base font-semibold ${textColor} mb-1`}>{title}</Text>
        <Text className="text-sm text-gray-600">{subtitle}</Text>
      </View>
      <View className={`${color} opacity-50 p-3 rounded-lg`}>
        <Ionicons name={icon as any} size={24} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
}

function TipRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <Ionicons name={icon as any} size={18} color="#22c55e" />
      <Text className="text-sm text-gray-700 flex-1">{text}</Text>
    </View>
  );
}
